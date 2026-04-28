import { supabase, isSupabaseConfigured } from "./supabaseClient.js";
import { buildWeights, formatRankingText } from "./wsm.js";

const SURVEY_TABLE = "survey_results";

// Dozwolone wartosci pola personalization_useful w bazie.
const USEFUL_VALUES = new Set(["tak", "nie", "trudno_powiedziec"]);

/**
 * Buduje payload do tabeli `survey_results`.
 *
 * Mapuje oceny z literek (A/B/C) na typy list (wsm / aspirations / reality)
 * w oparciu o zapisane mapowanie listMapping. Dzieki temu nawet gdy losowanie
 * przesunie ranking spersonalizowany pod inna literke, w bazie wyladuje on
 * zawsze pod kolumnami wsm_*.
 *
 * @param {object} input
 * @param {object} input.demographics      - { gender, age, frequency }
 * @param {object} input.preferences       - { monuments, beaches, mountains, infrastructure, costs, safety } (0..100)
 * @param {object} input.evaluations       - { A: {relevance, achievable, inspiring}, B: {...}, C: {...} } (1..5)
 * @param {string} input.finalChoice       - 'A' | 'B' | 'C' | 'none' | ''
 * @param {string} [input.justification]   - otwarte uzasadnienie wyboru (opcjonalne)
 * @param {string} [input.personalizationUseful] - 'tak' | 'nie' | 'trudno_powiedziec' | ''
 * @param {Array}  input.wsmTop10          - Top 10 z calculateWsmTopN() [{name, code, score, matchPct}]
 * @param {object} input.listMapping       - { A, B, C } => 'wsm' | 'aspirations' | 'reality'
 * @param {boolean}[input.isSynthetic]     - flaga rekordu testowego
 */
export const buildSurveyPayload = ({
  demographics,
  preferences,
  evaluations,
  finalChoice,
  justification = "",
  personalizationUseful = "",
  wsmTop10,
  listMapping,
  isSynthetic = false,
}) => {
  const weights = buildWeights(preferences);

  const evalFor = (type) => {
    const letter = Object.keys(listMapping).find(
      (k) => listMapping[k] === type,
    );
    return letter ? evaluations[letter] : {};
  };

  const wsmEval = evalFor("wsm");
  const aspEval = evalFor("aspirations");
  const realEval = evalFor("reality");

  // finalChoice z UI: 'A' | 'B' | 'C' | 'none' | '' (puste niemozliwe na tym etapie - walidacja blokuje).
  const isLetterChoice = ["A", "B", "C"].includes(finalChoice);
  const finalLetter = isLetterChoice
    ? finalChoice
    : finalChoice === "none"
      ? "none"
      : null;
  const finalType = isLetterChoice ? listMapping[finalChoice] : "none";

  const trimmedJustification =
    typeof justification === "string" ? justification.trim() : "";

  const usefulValue = USEFUL_VALUES.has(personalizationUseful)
    ? personalizationUseful
    : null;

  return {
    gender: demographics.gender || null,
    age: demographics.age || null,
    travel_frequency: demographics.frequency || null,

    weight_monuments: weights.monuments,
    weight_beaches: weights.beaches,
    weight_mountains: weights.mountains,
    weight_infrastructure: weights.infrastructure,
    weight_costs: weights.costs,
    weight_safety: weights.safety,

    wsm_ranking_text: formatRankingText(wsmTop10),
    wsm_ranking: wsmTop10, // jsonb: [{name, code, score, matchPct}, ...]

    list_a_type: listMapping.A ?? null,
    list_b_type: listMapping.B ?? null,
    list_c_type: listMapping.C ?? null,

    wsm_relevance: wsmEval.relevance ?? null,
    wsm_achievable: wsmEval.achievable ?? null,
    wsm_inspiring: wsmEval.inspiring ?? null,

    asp_relevance: aspEval.relevance ?? null,
    asp_achievable: aspEval.achievable ?? null,
    asp_inspiring: aspEval.inspiring ?? null,

    real_relevance: realEval.relevance ?? null,
    real_achievable: realEval.achievable ?? null,
    real_inspiring: realEval.inspiring ?? null,

    final_choice_letter: finalLetter,
    final_choice_type: finalType,

    justification_text: trimmedJustification ? trimmedJustification : null,
    personalization_useful: usefulValue,

    is_synthetic: isSynthetic,
  };
};

/**
 * Wstawia wynik ankiety do Supabase. Rzuca bledem jesli nie skonfigurowano lub insert sie nie powiedzie.
 */
export const submitSurveyResult = async (input) => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase nie jest skonfigurowany. Uzupelnij VITE_SUPABASE_URL i VITE_SUPABASE_PUBLISHABLE_KEY w pliku .env.",
    );
  }

  const payload = buildSurveyPayload(input);
  const { error } = await supabase.from(SURVEY_TABLE).insert([payload]);
  if (error) throw error;
  return payload;
};
