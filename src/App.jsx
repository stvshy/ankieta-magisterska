import React, { useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { IoCheckmarkSharp, IoCheckmarkDoneSharp } from "react-icons/io5";
import ConsentStep from "./steps/ConsentStep.jsx";
import ProfilingStep from "./steps/ProfilingStep.jsx";
import ListEvaluationStep from "./steps/ListEvaluationStep.jsx";
import SummaryStep from "./steps/SummaryStep.jsx";
import ThankYouStep from "./steps/ThankYouStep.jsx";
import "./App.css";

// --- MOCK DATA (PLACEHOLDERY DLA LIST) ---
const MOCK_LISTS = {
  A: [
    { name: "Nowa Zelandia", flag: "🇳🇿" },
    { name: "Islandia", flag: "🇮🇸" },
    { name: "Norwegia", flag: "🇳🇴" },
    { name: "Szwajcaria", flag: "🇨🇭" },
    { name: "Kanada", flag: "🇨🇦" },
    { name: "Japonia", flag: "🇯🇵" },
    { name: "Peru", flag: "🇵🇪" },
    { name: "Chile", flag: "🇨🇱" },
    { name: "Nepal", flag: "🇳🇵" },
    { name: "Szkocja", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  ],
  B: [
    { name: "Malediwy", flag: "🇲🇻" },
    { name: "ZEA (Dubaj)", flag: "🇦🇪" },
    { name: "Seszele", flag: "🇸🇨" },
    { name: "Bahamy", flag: "🇧🇸" },
    { name: "Bora Bora", flag: "🇵🇫" },
    { name: "Mauritius", flag: "🇲🇺" },
    { name: "Singapur", flag: "🇸🇬" },
    { name: "Hawaje (USA)", flag: "🇺🇸" },
    { name: "Fidżi", flag: "🇫🇯" },
    { name: "Katar", flag: "🇶🇦" },
  ],
  C: [
    { name: "Chorwacja", flag: "🇭🇷" },
    { name: "Grecja", flag: "🇬🇷" },
    { name: "Włochy", flag: "🇮🇹" },
    { name: "Hiszpania", flag: "🇪🇸" },
    { name: "Turcja", flag: "🇹🇷" },
    { name: "Bułgaria", flag: "🇧🇬" },
    { name: "Egipt", flag: "🇪🇬" },
    { name: "Tunezja", flag: "🇹🇳" },
    { name: "Czechy", flag: "🇨🇿" },
    { name: "Słowacja", flag: "🇸🇰" },
  ],
};

export const STEPS = [
  { id: "consent", title: "Zgoda" },
  { id: "profiling", title: "Twój Profil" },
  { id: "evalA", title: "Lista A" },
  { id: "evalB", title: "Lista B" },
  { id: "evalC", title: "Lista C" },
  { id: "summary", title: "Wybór" },
  { id: "thanks", title: "Koniec" },
];

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
    monuments: 5,
    beaches: 5,
    mountains: 5,
    infrastructure: 5,
    costs: 5,
    safety: 5,
  });
  const [evaluations, setEvaluations] = useState({
    A: { relevance: null, achievable: null, inspiring: null },
    B: { relevance: null, achievable: null, inspiring: null },
    C: { relevance: null, achievable: null, inspiring: null },
  });
  const [finalChoice, setFinalChoice] = useState("");

  // --- WALIDACJA KROKÓW ---
  const canProceed = useCallback(() => {
    if (currentStep === 0) return agreed;
    if (currentStep === 1)
      return demographics.gender && demographics.age && demographics.frequency;
    if (currentStep === 2)
      return (
        evaluations.A.relevance &&
        evaluations.A.achievable &&
        evaluations.A.inspiring
      );
    if (currentStep === 3)
      return (
        evaluations.B.relevance &&
        evaluations.B.achievable &&
        evaluations.B.inspiring
      );
    if (currentStep === 4)
      return (
        evaluations.C.relevance &&
        evaluations.C.achievable &&
        evaluations.C.inspiring
      );
    if (currentStep === 5) return finalChoice !== "";
    return true;
  }, [currentStep, agreed, demographics, evaluations, finalChoice]);

  const handleNext = useCallback(() => {
    if (canProceed() && currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  }, [canProceed, currentStep]);

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
      case 0:
        return <ConsentStep agreed={agreed} setAgreed={setAgreed} />;
      case 1:
        return (
          <ProfilingStep
            demographics={demographics}
            setDemographics={setDemographics}
            preferences={preferences}
            setPreferences={setPreferences}
          />
        );
      case 2:
      case 3:
      case 4:
        return (
          <ListEvaluationStep
            currentStep={currentStep}
            evaluations={evaluations}
            setEvaluations={setEvaluations}
            lists={MOCK_LISTS}
          />
        );
      case 5:
        return (
          <SummaryStep
            finalChoice={finalChoice}
            setFinalChoice={setFinalChoice}
          />
        );
      case 6:
        return <ThankYouStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-24">
      {/* HEADER & NEW STEPPER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-0 sm:px-4 py-4">
          <h1 className="text-lg font-bold text-blue-900 text-center mb-6">
            Badanie Naukowe PWr
          </h1>

          <div className="ankieta-stepper-shell mx-auto">
            <div className="relative">
              {/* Linia łącząca kroki */}
              <div className="absolute top-4 left-4 right-4 sm:left-2 sm:right-2 -translate-y-1/2 z-0">
                <div className="w-full h-0.5 sm:h-1 bg-gray-200 rounded-full"></div>
                <div
                  className="absolute top-0 left-0 h-0.5 sm:h-1 bg-blue-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Kropki kroków */}
              <div className="flex justify-between relative z-10 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 px-0 sm:px-0 scrollbar-hide">
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
                                  ? "translate(-0.2px, -0.6px)"
                                  : index === 1
                                    ? "translate(0.3px, -0.6px)"
                                    : index === 2
                                      ? "translateY(-0.6px)"
                                      : index === 3
                                        ? "translate(-0.6px, -0.5px)"
                                        : index === 4
                                          ? "translate(0.3px, -0.6px)"
                                          : index === 5
                                            ? "translate(-0.3px, -0.6px)"
                                            : "none",
                            }}
                          >
                            {index + 1}
                          </span>
                        )}
                      </span>
                      <span
                        className={`ankieta-stepper-label text-[10px] sm:text-xs font-semibold mt-2 text-center whitespace-nowrap
                      ${isCurrent ? "text-blue-700" : isCompleted ? "text-gray-800" : "text-gray-400"}`}
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
          <div className="max-w-4xl mx-auto flex justify-between items-center gap-4 px-0 sm:px-6 lg:px-10">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`w-[135px] sm:w-[150px] flex items-center justify-center gap-2 pl-4 pr-8 py-3 rounded-xl font-medium transition-all
                ${currentStep === 0 ? "opacity-0 cursor-default" : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
            >
              <ChevronLeft className="w-5 h-5" /> Wstecz
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`w-[130px] sm:w-[150px] flex items-center justify-center gap-2 pl-8 pr-4 py-3 rounded-xl font-bold transition-all shadow-sm
                ${
                  canProceed()
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    : "bg-blue-600 text-white opacity-40 cursor-not-allowed shadow-none ring-1 ring-blue-300"
                }`}
            >
              {currentStep === STEPS.length - 2 ? "Zakończ badanie" : "Dalej"}{" "}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
