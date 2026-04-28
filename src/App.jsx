import React, { useState, useCallback, useEffect } from "react";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { IoCheckmarkSharp, IoCheckmarkDoneSharp } from "react-icons/io5";
import ConsentStep from "./steps/ConsentStep.jsx";
import ProfilingStep from "./steps/ProfilingStep.jsx";
import ListEvaluationStep from "./steps/ListEvaluationStep.jsx";
import SummaryStep from "./steps/SummaryStep.jsx";
import RevealStep from "./steps/RevealStep.jsx";
import ThankYouStep from "./steps/ThankYouStep.jsx";
import {
  LISTA_1_MARZENIA,
  LISTA_2_RZECZYWISTOSC,
} from "./data/staticRankings.js";
import KRAJE_DB from "./data/personalizedRanking.json";
import { calculateWsmTopN } from "./utils/wsm.js";
import { submitSurveyResult } from "./utils/surveyApi.js";
import "./App.css";

// Tasowanie Fisher-Yates (dla losowego przypisania list do literek A/B/C).
const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const STEPS = [
  { id: "consent", title: "Zgoda" },
  { id: "profiling", title: "Profil" },
  { id: "evalA", title: "Lista A" },
  { id: "evalB", title: "Lista B" },
  { id: "evalC", title: "Lista C" },
  { id: "summary", title: "Wybór" },
  { id: "reveal", title: "Wyniki" },
  { id: "thanks", title: "Koniec" },
];

// Indeksy krokow - latwiej sie czyta nawigacja niz porownania do magicznych liczb.
const STEP = {
  CONSENT: 0,
  PROFILING: 1,
  EVAL_A: 2,
  EVAL_B: 3,
  EVAL_C: 4,
  SUMMARY: 5,
  REVEAL: 6,
  THANKS: 7,
};

// (komponenty pomocnicze i widoki są teraz w osobnych plikach)

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  // --- STATE ANKIETY ---
  const [agreed, setAgreed] = useState(false);
  const [demographics, setDemographics] = useState({
    gender: "",
    age: "",
    frequency: "",
  });
  const [preferences, setPreferences] = useState({
    monuments: 0,
    beaches: 0,
    mountains: 0,
    infrastructure: 0,
    costs: 0,
    safety: 0,
  });
  const [evaluations, setEvaluations] = useState({
    A: { relevance: null, achievable: null, inspiring: null },
    B: { relevance: null, achievable: null, inspiring: null },
    C: { relevance: null, achievable: null, inspiring: null },
  });

  // finalChoice: 'A' | 'B' | 'C' | '' (brak wyboru)
  const [finalChoice, setFinalChoice] = useState("");
  // Otwarte uzasadnienie wyboru (krok 5, opcjonalne)
  const [justification, setJustification] = useState("");
  // Odpowiedz na pytanie o przydatnosc personalizacji (krok 6, wymagane)
  // 'tak' | 'nie' | 'trudno_powiedziec' | ''
  const [personalizationUseful, setPersonalizationUseful] = useState("");

  // --- WSM + losowe przypisanie list do literek A/B/C (order bias control) ---
  // wsmTop10        - pelne TOP 10 z polami { name, code, score, matchPct } (zapis do bazy)
  // randomizedLists - { A, B, C } => konkretne tablice krajow (do wyswietlenia w ListEvaluationStep)
  // listMapping     - { A, B, C } => 'wsm' | 'aspirations' | 'reality' (do mapowania ocen przy zapisie)
  const [wsmTop10, setWsmTop10] = useState([]);
  const [listMapping, setListMapping] = useState({ A: null, B: null, C: null });
  const [randomizedLists, setRandomizedLists] = useState({
    A: [],
    B: [],
    C: [],
  });

  // --- Stany wysylania do Supabase ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Czy na mobile pokazaliśmy już opis „Układ” obok przycisku zmiany widoku?
  const [showMobileLayoutLabel, setShowMobileLayoutLabel] = useState(true);

  /** Układ listy krajów: siatka 2× lub jedna kolumna — wspólny dla kroków A/B/C. Domyślnie: lista na mobile (< sm), siatka na szerszych ekranach. */
  const [countryListLayout, setCountryListLayout] = useState(() => {
    if (typeof window === "undefined") return "grid";
    try {
      const s = window.localStorage.getItem("ankieta-country-list-layout");
      if (s === "grid" || s === "list") return s;
    } catch {
      /* ignore */
    }
    try {
      return window.matchMedia("(min-width: 640px)").matches ? "grid" : "list";
    } catch {
      return "list";
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "ankieta-country-list-layout",
        countryListLayout,
      );
    } catch {
      /* ignore */
    }
  }, [countryListLayout]);

  // --- WALIDACJA KROKÓW ---
  const canProceed = useCallback(() => {
    if (currentStep === STEP.CONSENT) return agreed;
    if (currentStep === STEP.PROFILING)
      return (
        demographics.gender &&
        demographics.age &&
        demographics.frequency &&
        Object.values(preferences).reduce((sum, value) => sum + value, 0) ===
          100
      );
    if (currentStep === STEP.EVAL_A)
      return (
        evaluations.A.relevance &&
        evaluations.A.achievable &&
        evaluations.A.inspiring
      );
    if (currentStep === STEP.EVAL_B)
      return (
        evaluations.B.relevance &&
        evaluations.B.achievable &&
        evaluations.B.inspiring
      );
    if (currentStep === STEP.EVAL_C)
      return (
        evaluations.C.relevance &&
        evaluations.C.achievable &&
        evaluations.C.inspiring
      );
    if (currentStep === STEP.SUMMARY)
      return ["A", "B", "C"].includes(finalChoice);
    if (currentStep === STEP.REVEAL) return personalizationUseful !== "";
    return true;
  }, [
    currentStep,
    agreed,
    demographics,
    preferences,
    evaluations,
    finalChoice,
    personalizationUseful,
  ]);

  // Liczy WSM + losuje przypisanie list do literek A/B/C.
  // Wywolywane raz, przy przejsciu z Profilowania (krok 1) do Listy A (krok 2),
  // tak aby kolejne krotne klikniecia "Dalej/Wstecz" nie zmienialy tasowania.
  const generateRankingsAndShuffle = useCallback(() => {
    const top10 = calculateWsmTopN(KRAJE_DB, preferences, 10);
    setWsmTop10(top10);

    // 'wsm' -> Top 10 spersonalizowanego rankingu (z polami code do flag)
    // 'aspirations' -> Lista marzen Polakow (statyczna)
    // 'reality' -> Lista realnych wyborow Polakow (statyczna z PIT)
    const sources = [
      { id: "wsm", data: top10 },
      { id: "aspirations", data: LISTA_1_MARZENIA },
      { id: "reality", data: LISTA_2_RZECZYWISTOSC },
    ];

    const shuffled = shuffle(sources);
    setListMapping({
      A: shuffled[0].id,
      B: shuffled[1].id,
      C: shuffled[2].id,
    });
    setRandomizedLists({
      A: shuffled[0].data,
      B: shuffled[1].data,
      C: shuffled[2].data,
    });
  }, [preferences]);

  // Wysyla pelen rekord do Supabase i przechodzi do ekranu Dziekujemy.
  const submitToDatabase = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitSurveyResult({
        demographics,
        preferences,
        evaluations,
        finalChoice,
        justification,
        personalizationUseful,
        wsmTop10,
        listMapping,
        isSynthetic: false,
      });
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("[Supabase] Blad zapisu wyniku ankiety:", err);
      setSubmitError(
        err?.message ||
          "Wystapil blad podczas zapisu wynikow. Sprobuj ponownie.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    demographics,
    preferences,
    evaluations,
    finalChoice,
    justification,
    personalizationUseful,
    wsmTop10,
    listMapping,
    isSubmitting,
  ]);

  const handleNext = useCallback(() => {
    if (!canProceed() || isSubmitting) return;

    // Profilowanie -> Lista A: licz WSM i losuj literki przed wejsciem.
    if (currentStep === STEP.PROFILING) {
      generateRankingsAndShuffle();
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
      return;
    }

    // Z ekranu Reveal (ostatni przed Dziekujemy) wysylamy do Supabase
    // i dopiero po sukcesie przechodzimy na Dziekujemy.
    if (currentStep === STEP.REVEAL) {
      submitToDatabase();
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  }, [
    canProceed,
    currentStep,
    isSubmitting,
    generateRankingsAndShuffle,
    submitToDatabase,
  ]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  const handleStepClick = useCallback(
    (index) => {
      if (index < currentStep) {
        setCurrentStep(index);
        window.scrollTo(0, 0);
      }
    },
    [currentStep],
  );

  // --- RENDEROWANIE KROKÓW ---
  const renderStep = () => {
    switch (currentStep) {
      case STEP.CONSENT:
        return <ConsentStep agreed={agreed} setAgreed={setAgreed} />;
      case STEP.PROFILING:
        return (
          <ProfilingStep
            demographics={demographics}
            setDemographics={setDemographics}
            preferences={preferences}
            setPreferences={setPreferences}
          />
        );
      case STEP.EVAL_A:
      case STEP.EVAL_B:
      case STEP.EVAL_C:
        return (
          <ListEvaluationStep
            key={currentStep}
            currentStep={currentStep}
            evaluations={evaluations}
            setEvaluations={setEvaluations}
            countryListLayout={countryListLayout}
            setCountryListLayout={setCountryListLayout}
            showMobileLayoutLabel={showMobileLayoutLabel}
            onMobileLayoutLabelDismiss={() => setShowMobileLayoutLabel(false)}
            lists={randomizedLists}
          />
        );
      case STEP.SUMMARY:
        return (
          <SummaryStep
            finalChoice={finalChoice}
            setFinalChoice={setFinalChoice}
            justification={justification}
            setJustification={setJustification}
            lists={randomizedLists}
          />
        );
      case STEP.REVEAL:
        return (
          <RevealStep
            key={currentStep}
            finalChoice={finalChoice}
            listMapping={listMapping}
            lists={randomizedLists}
            personalizationUseful={personalizationUseful}
            setPersonalizationUseful={setPersonalizationUseful}
          />
        );
      case STEP.THANKS:
        return <ThankYouStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24">
      {/* HEADER & NEW STEPPER */}
      <div className="bg-white border-b border-gray-200 shadow-sm sm:sticky sm:top-0 sm:z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="ankieta-accent-text text-lg font-bold text-center mb-6">
            Badanie Naukowe PWr
          </h1>

          <div className="ankieta-stepper-shell mx-auto">
            <div className="relative">
              {/* Linia łącząca kroki */}
              <div className="ankieta-stepper-line absolute top-4 -translate-y-1/2 z-0">
                <div className="w-full h-0.5 sm:h-1 bg-gray-200 rounded-full"></div>
                <div
                  className="absolute top-0 left-0 h-0.5 sm:h-1 bg-blue-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Kropki kroków */}
              <div className="ankieta-stepper-track flex justify-between relative z-10 overflow-visible pb-2 sm:pb-0 px-0 sm:px-0">
                {STEPS.map((step, index) => {
                  const isCompleted = index < currentStep;
                  const isCurrent = index === currentStep;
                  const isFinalStep = index === STEPS.length - 1;
                  const showCheckIcon = isCompleted || isFinalStep;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleStepClick(index)}
                      disabled={!isCompleted}
                      className={`ankieta-stepper-item flex flex-col items-center min-w-[60px] sm:min-w-0 focus:outline-none transition-transform
                      ${
                        isCompleted
                          ? "cursor-pointer hover:scale-105 active:scale-95"
                          : "cursor-default"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${
                          isCompleted
                            ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 hover:shadow-md active:bg-blue-800"
                            : isCurrent
                              ? "bg-white border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
                              : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        {showCheckIcon ? (
                          isFinalStep ? (
                            <IoCheckmarkDoneSharp className="w-4 h-4" />
                          ) : (
                            <IoCheckmarkSharp className="w-4 h-4" />
                          )
                        ) : (
                          <span
                            className="text-sm font-bold"
                            style={{
                              transform:
                                index === 0
                                  ? "translateX(-0.2px)"
                                  : index === 1
                                    ? "translateX(0.2px)"
                                    : index === 2
                                      ? "translateX(0.5px)"
                                      : index === 3
                                        ? "translateX(-0.18px)"
                                        : index === 4
                                          ? "translateX(0.02px)"
                                          : index === 5
                                            ? "translateX(0.31px)"
                                            : index === 6
                                              ? "translateX(0.18px)"
                                              : "none",
                            }}
                          >
                            {index + 1}
                          </span>
                        )}
                      </span>
                      <span
                        className={`ankieta-stepper-label text-[10px] sm:text-xs font-medium mt-2 text-center whitespace-nowrap ${
                          isCurrent || isCompleted
                            ? "ankieta-accent-text"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GŁÓWNA ZAWARTOŚĆ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        {renderStep()}
      </div>

      {/* FOOTER Z PRZYCISKAMI NAWIGACJI */}
      {currentStep < STEPS.length - 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
          {submitError && currentStep === STEPS.length - 2 && (
            <div className="max-w-4xl mx-auto mb-2 px-0 sm:px-6 lg:px-10">
              <p className="text-center text-[12.5px] font-medium text-red-600">
                {submitError}
              </p>
            </div>
          )}
          <div className="max-w-4xl mx-auto flex justify-between items-center gap-4 px-0 sm:px-6 lg:px-10">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0 || isSubmitting}
              className={`w-[135px] sm:w-[150px] flex items-center justify-center gap-2 pl-4 pr-8 py-3 rounded-xl !font-medium transition-all
                ${currentStep === 0 ? "opacity-0 cursor-default" : "text-gray-600 bg-gray-100 hover:bg-gray-200"}
                ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <ChevronLeft className="w-5 h-5" /> Wstecz
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className={`w-[135px] sm:w-[150px] flex items-center justify-center gap-2 pl-8 pr-4 py-3 rounded-xl !font-medium transition-all shadow-sm
                ${
                  canProceed() && !isSubmitting
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    : "bg-blue-600 text-white opacity-40 cursor-not-allowed shadow-none ring-1 ring-blue-300"
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Zapisuję…
                </>
              ) : (
                <>
                  {currentStep === STEPS.length - 2
                    ? "Zakończ badanie"
                    : "Dalej"}{" "}
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
