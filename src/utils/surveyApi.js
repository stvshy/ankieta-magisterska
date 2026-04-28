import { supabase, isSupabaseConfigured } from "./supabaseClient.js";
import { buildWeights, formatRankingText } from "./wsm.js";

const SURVEY_TABLE = "survey_results";

/**
 * Konwersja "Lista A" -> "A".
 */
const letterFromFinalChoice = (finalChoice) => {
  if (!finalChoice) return null;
  if (finalChoice === "Żadna z nich") return "none";
  const m = /Lista\s+([ABC])/i.exec(finalChoice);
  return m ? m[1].toUpperCase() : null;
};

/**
 * Buduje payload do tabeli `survey_results`.
 * Mapuje oceny z literek (A/B/C) na typy list (wsm / aspirations / reality)
 * w oparciu o zapisane mapowanie listMapping.
 */
export const buildSurveyPayload = ({
  demographics,
  preferences,
  evaluations,
  finalChoice,
  wsmTop10,
  listMapping, // { A: 'wsm'|'aspirations'|'reality', B: ..., C: ... }
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

  const finalLetter = letterFromFinalChoice(finalChoice);
  const finalType =
    finalLetter && finalLetter !== "none" ? listMapping[finalLetter] : "none";

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
