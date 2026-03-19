import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import ConsentStep from "./steps/ConsentStep.jsx";
import ProfilingStep from "./steps/ProfilingStep.jsx";
import ListEvaluationStep from "./steps/ListEvaluationStep.jsx";
import SummaryStep from "./steps/SummaryStep.jsx";
import ThankYouStep from "./steps/ThankYouStep.jsx";

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
  const canProceed = () => {
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
  };

  const handleNext = () => {
    if (canProceed() && currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

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
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-lg font-bold text-blue-900 text-center mb-6">
            Badanie Naukowe PWr
          </h1>

          <div className="relative">
            {/* Linia łącząca kroki */}
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 hidden sm:block rounded-full"></div>
            <div
              className="absolute top-4 left-0 h-1 bg-blue-500 -translate-y-1/2 z-0 hidden sm:block rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            ></div>

            {/* Kropki kroków */}
            <div className="flex justify-between relative z-10 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 px-2 sm:px-0 scrollbar-hide">
              {STEPS.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center min-w-[60px] sm:min-w-0"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${
                          isCompleted
                            ? "bg-blue-600 border-blue-600 text-white"
                            : isCurrent
                              ? "bg-white border-blue-600 text-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
                              : "bg-white border-gray-300 text-gray-400"
                        }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-semibold mt-2 text-center whitespace-nowrap
                      ${isCurrent ? "text-blue-700" : isCompleted ? "text-gray-800" : "text-gray-400"}`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* GŁÓWNA ZAWARTOŚĆ */}
      <div className="max-w-3xl mx-auto px-4 py-8">{renderStep()}</div>

      {/* FOOTER Z PRZYCISKAMI NAWIGACJI */}
      {currentStep < STEPS.length - 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
          <div className="max-w-3xl mx-auto flex justify-between items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                ${currentStep === 0 ? "opacity-0 cursor-default" : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
            >
              <ChevronLeft className="w-5 h-5" /> Wstecz
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-sm
                ${
                  canProceed()
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
