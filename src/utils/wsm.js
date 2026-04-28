// Algorytm Weighted Sum Model (WSM) dla rankingu spersonalizowanego.
//
// WEJSCIE:
//   countries  - tablica obiektow z baza krajow (src/data/personalizedRanking.json),
//                kazdy obiekt ma znormalizowane wartosci kryteriow w przedziale [0..1].
//   preferences - obiekt punktow (0..100) z ProfilingStep.jsx, klucze: monuments,
//                 beaches, mountains, infrastructure, costs, safety. Suma = 100.
//
// WYJSCIE: tablica obiektow { name, code, score, matchPct } posortowana malejaco po score.
//
// Wzor: score(c) = sum_i (w_i * v_i(c)),  gdzie w_i = preferences_i / 100 (suma w_i = 1)
// Poniewaz wszystkie v_i(c) ∈ [0..1] i sum w_i = 1 -> score(c) ∈ [0..1].
// matchPct = score * 100 (dopasowanie procentowe do uzytkownika).

import { getCountryCode } from "../data/countryFlags.js";

// Mapowanie kluczy preferencji uzytkownika na nazwy pol w bazie krajow.
const CRITERIA_FIELD_BY_PREFERENCE = {
  monuments: "Zabytki i historia",
  beaches: "Plaże i morza",
  mountains: "Góry i natura",
  infrastructure: "Infrastruktura",
  costs: "Niskie koszty",
  safety: "Bezpieczeństwo",
};

const PREFERENCE_BUDGET = 100;

const toNumber = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseFloat(value.replace(",", "."));
  return 0;
};

/**
 * Liczy znormalizowane wagi (sumujace sie do 1) z punktow uzytkownika (0..100).
 */
export const buildWeights = (preferences) => ({
  monuments: (preferences.monuments ?? 0) / PREFERENCE_BUDGET,
  beaches: (preferences.beaches ?? 0) / PREFERENCE_BUDGET,
  mountains: (preferences.mountains ?? 0) / PREFERENCE_BUDGET,
  infrastructure: (preferences.infrastructure ?? 0) / PREFERENCE_BUDGET,
  costs: (preferences.costs ?? 0) / PREFERENCE_BUDGET,
  safety: (preferences.safety ?? 0) / PREFERENCE_BUDGET,
});

/**
 * Liczy WSM score (0..1) dla pojedynczego kraju.
 */
const calculateScore = (country, weights) => {
  let score = 0;
  for (const [prefKey, fieldName] of Object.entries(
    CRITERIA_FIELD_BY_PREFERENCE,
  )) {
    score += (weights[prefKey] ?? 0) * toNumber(country[fieldName]);
  }
  return score;
};

/**
 * Buduje pelny ranking WSM (wszystkie kraje, posortowane malejaco po score).
 * @returns {{name: string, code: string|null, score: number, matchPct: number}[]}
 */
export const calculateWsmRanking = (countries, preferences) => {
  const weights = buildWeights(preferences);

  return countries
    .map((country) => {
      const name = country["Nazwa destynacji"];
      const score = calculateScore(country, weights);
      return {
        name,
        code: getCountryCode(name),
        score,
        matchPct: Math.round(score * 1000) / 10, // jedno miejsce po przecinku, 0..100
      };
    })
    .sort((a, b) => b.score - a.score);
};

/**
 * Top N rankingu WSM, gotowy do podania do <CountryList /> (pole 'code' = ISO 3166-1 alpha-2).
 */
export const calculateWsmTopN = (countries, preferences, n = 10) =>
  calculateWsmRanking(countries, preferences).slice(0, n);

/**
 * Format tekstowy rankingu, wygodny do eksportu CSV/Excel.
 * Np. "Hiszpania (87%), Włochy (85%), Grecja (82%)..."
 */
export const formatRankingText = (ranking) =>
  ranking.map((r) => `${r.name} (${r.matchPct}%)`).join(", ");
