import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Info,
  Star,
  ThumbsUp,
  Landmark,
  Umbrella,
  Tent,
  Building2,
  Coins,
  ShieldCheck,
  Check,
} from "lucide-react";

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

const STEPS = [
  { id: "consent", title: "Zgoda" },
  { id: "profiling", title: "Twój Profil" },
  { id: "evalA", title: "Lista A" },
  { id: "evalB", title: "Lista B" },
  { id: "evalC", title: "Lista C" },
  { id: "summary", title: "Wybór" },
  { id: "thanks", title: "Koniec" },
];

// --- KOMPONENTY POMOCNICZE (Przeniesione poza App, aby zapobiec gubieniu fokusu/przeciągania) ---
const RatingScale = ({ value, onChange, label }) => (
  <div className="mb-6">
    <p className="font-medium text-gray-800 mb-3">{label}</p>
    <div className="flex justify-between items-center gap-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`flex-1 py-3 rounded-lg border-2 transition-all font-bold text-lg
            ${
              value === num
                ? "bg-blue-600 border-blue-600 text-white shadow-md"
                : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
            }`}
        >
          {num}
        </button>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
      <span>1 - Zdecydowanie nie</span>
      <span>5 - Zdecydowanie tak</span>
    </div>
  </div>
);

const CountryList = ({ list }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
    {list.map((country, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm"
      >
        <span className="text-2xl">{country.flag}</span>
        <span className="text-sm font-medium text-gray-700 truncate">
          {country.name}
        </span>
      </div>
    ))}
  </div>
);

const CustomSlider = ({ value, onChange, colorClass }) => {
  const marks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="relative pt-2 pb-2">
      <div className="relative h-10 w-full pointer-events-none mb-1">
        {marks.map((mark) => {
          const percent = (mark / 10) * 100;
          // Kółko (thumb) ma 24px szerokości (w-6).
          // Matematyczne wyrównanie osi względem poruszającego się środka kółka suwaka:
          const leftPos = `calc(${percent}% + ${12 - (percent * 24) / 100}px)`;

          return (
            <div
              key={mark}
              className="absolute bottom-0 flex flex-col items-center"
              style={{ left: leftPos, transform: "translateX(-50%)" }}
            >
              <span
                className={`text-[11px] sm:text-xs font-bold mb-1 transition-all ${value === mark ? "text-gray-900 scale-125" : "text-gray-400"}`}
              >
                {mark}
              </span>
              <div
                className={`w-[2px] transition-all ${value === mark ? "h-3 " + colorClass.replace("text-", "bg-") : "h-2 bg-gray-300"}`}
              ></div>
            </div>
          );
        })}
      </div>

      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`block w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer relative z-10
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[4px] 
          [&::-webkit-slider-thumb]:shadow-md transition-all
          ${colorClass.replace("text-", "[&::-webkit-slider-thumb]:border-")}
          focus:outline-none focus:ring-4 focus:ring-opacity-30 ${colorClass.replace("text-", "focus:ring-")}
        `}
      />
    </div>
  );
};

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
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6" /> Informacja dla uczestnika badania
              </h2>
              <div className="text-sm text-gray-700 space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                <p>Szanowna Pani/Szanowny Panie,</p>
                <p>
                  Nazywam się Mateusz Staszków i jestem studentem Informatyki
                  Stosowanej na Politechnice Wrocławskiej. Zapraszam do udziału
                  w badaniu naukowym, które stanowi część mojej pracy
                  magisterskiej, realizowanej pod opieką dr inż. Bernadetty
                  Maleszki.
                </p>
                <h3 className="font-bold text-gray-900 mt-4">
                  1. Cel i przebieg badania
                </h3>
                <p>
                  Celem badania jest ocena trafności i użyteczności różnych
                  metod rekomendacji podróżniczych w opinii użytkowników.
                  Badanie realizowane jest w formie interaktywnej sesji, a jej
                  wypełnienie zajmie około 5-10 minut.
                </p>
                <h3 className="font-bold text-gray-900 mt-4">
                  2. Dobrowolność i anonimowość
                </h3>
                <p>
                  Udział w badaniu jest w pełni dobrowolny. Badanie jest w pełni
                  anonimowe. Nie zbieramy żadnych danych, które mogłyby pozwolić
                  na Pana/Pani identyfikację (takich jak imię, nazwisko, adres
                  e-mail czy adres IP urządzenia).
                </p>
                <h3 className="font-bold text-gray-900 mt-4">
                  3. Przetwarzanie danych
                </h3>
                <p>
                  Administratorem danych jest Politechnika Wrocławska.
                  Zanonimizowane dane zostaną wykorzystane wyłącznie do celów
                  naukowych i analizy statystycznej.
                </p>
              </div>
            </div>

            <label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-6 h-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-800 pt-1">
                Oświadczam, że zapoznałem/am się z informacją o badaniu, mam
                ukończone 18 lat i wyrażam dobrowolną zgodę na udział w badaniu
                naukowym.
              </span>
            </label>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Metryczka użytkownika
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="font-medium text-gray-800 mb-3">1. Płeć</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Kobieta", "Mężczyzna", "Inna", "Nie chcę podawać"].map(
                      (opt) => (
                        <button
                          key={opt}
                          onClick={() =>
                            setDemographics({ ...demographics, gender: opt })
                          }
                          className={`p-3 rounded-lg border text-sm font-medium transition-all
                          ${demographics.gender === opt ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                        >
                          {opt}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <p className="font-medium text-gray-800 mb-3">2. Wiek</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      "18-25 lat",
                      "26-35 lat",
                      "36-45 lat",
                      "46-60 lat",
                      "Powyżej 60 lat",
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          setDemographics({ ...demographics, age: opt })
                        }
                        className={`p-3 rounded-lg border text-sm font-medium transition-all
                          ${demographics.age === opt ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium text-gray-800 mb-3">
                    3. Częstotliwość podróży zagranicznych
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Raz na kilka lat",
                      "Raz w roku",
                      "2-3 razy w roku",
                      "Częściej niż 3 razy w roku",
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          setDemographics({ ...demographics, frequency: opt })
                        }
                        className={`p-3 rounded-lg border text-sm font-medium transition-all
                          ${demographics.frequency === opt ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Twoje preferencje podróżnicze
              </h2>
              <p className="text-sm text-gray-500 mb-10">
                Proszę określić ważność poniższych czynników przy wyborze
                destynacji turystycznej (0 - zupełnie nieważne, 10 - kluczowe).
              </p>

              <div className="space-y-8 pb-4">
                {[
                  {
                    key: "monuments",
                    label: "Zabytki i historia",
                    icon: <Landmark className="w-8 h-8 text-amber-600" />,
                    colorClass: "text-amber-600",
                  },
                  {
                    key: "beaches",
                    label: "Plaże i morze",
                    icon: <Umbrella className="w-8 h-8 text-cyan-500" />,
                    colorClass: "text-cyan-500",
                  },
                  {
                    key: "mountains",
                    label: "Góry i natura",
                    icon: <Tent className="w-8 h-8 text-emerald-600" />,
                    colorClass: "text-emerald-600",
                  },
                  {
                    key: "infrastructure",
                    label: "Infrastruktura turystyczna",
                    icon: <Building2 className="w-8 h-8 text-slate-600" />,
                    colorClass: "text-slate-600",
                  },
                  {
                    key: "costs",
                    label: "Niskie Koszty",
                    icon: <Coins className="w-8 h-8 text-yellow-500" />,
                    colorClass: "text-yellow-500",
                  },
                  {
                    key: "safety",
                    label: "Bezpieczeństwo",
                    icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
                    colorClass: "text-indigo-600",
                  },
                ].map(({ key, label, icon, colorClass }) => (
                  <div
                    key={key}
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3 font-semibold text-gray-800 text-lg">
                        <div className={`p-2 rounded-lg bg-gray-50 border`}>
                          {icon}
                        </div>{" "}
                        {label}
                      </div>
                      <span className={`font-bold text-2xl ${colorClass}`}>
                        {preferences[key]}
                      </span>
                    </div>

                    <CustomSlider
                      value={preferences[key]}
                      onChange={(val) =>
                        setPreferences({ ...preferences, [key]: val })
                      }
                      colorClass={colorClass}
                    />

                    <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium px-1">
                      <span>Nieważne (0)</span>
                      <span>Kluczowe (10)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
      case 3:
      case 4:
        const listLetter =
          currentStep === 2 ? "A" : currentStep === 3 ? "B" : "C";
        const currentList = MOCK_LISTS[listLetter];

        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Ranking {listLetter}</h2>
              <p className="text-blue-100 text-sm">
                Na podstawie Twoich preferencji (lub innych algorytmów)
                wygenerowaliśmy tę listę. Zapoznaj się z nią i oceń poniżej.
              </p>
            </div>

            <CountryList list={currentList} />

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                Twoja ocena Listy {listLetter}:
              </h3>

              <RatingScale
                label="1. Jak oceniasz trafność tej listy dla Ciebie?"
                value={evaluations[listLetter].relevance}
                onChange={(val) =>
                  setEvaluations({
                    ...evaluations,
                    [listLetter]: {
                      ...evaluations[listLetter],
                      relevance: val,
                    },
                  })
                }
              />
              <RatingScale
                label="2. Czy te kierunki są dla Ciebie osiągalne (finansowo/logistycznie)?"
                value={evaluations[listLetter].achievable}
                onChange={(val) =>
                  setEvaluations({
                    ...evaluations,
                    [listLetter]: {
                      ...evaluations[listLetter],
                      achievable: val,
                    },
                  })
                }
              />
              <RatingScale
                label="3. Czy ta lista Cię inspiruje?"
                value={evaluations[listLetter].inspiring}
                onChange={(val) =>
                  setEvaluations({
                    ...evaluations,
                    [listLetter]: {
                      ...evaluations[listLetter],
                      inspiring: val,
                    },
                  })
                }
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Podsumowanie i wybór
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-lg mx-auto">
              Zapoznałeś/aś się z trzema różnymi rankingami. Gdybyś miał(a)
              zaplanować kolejną podróż, którą z tych trzech list
              wykorzystał(a)byś jako <b>główną inspirację</b>?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Lista A", "Lista B", "Lista C", "Żadna z nich"].map(
                (choice) => (
                  <button
                    key={choice}
                    onClick={() => setFinalChoice(choice)}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3
                    ${
                      finalChoice === choice
                        ? "bg-blue-50 border-blue-600 text-blue-700 shadow-md transform scale-[1.02]"
                        : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    {choice === "Żadna z nich" ? (
                      <Star className="w-8 h-8 opacity-50" />
                    ) : (
                      <ThumbsUp className="w-8 h-8" />
                    )}
                    <span className="font-bold text-lg">{choice}</span>
                  </button>
                ),
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center py-12 animate-fadeIn space-y-6">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Dziękuję za udział!
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Twoje odpowiedzi zostały anonimowo zapisane. Pomogą one w
              badaniach nad zjawiskiem luki decyzyjnej w systemach
              rekomendacyjnych turystyki w ramach mojej pracy magisterskiej.
            </p>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg inline-block text-sm text-gray-500">
              Możesz teraz bezpiecznie zamknąć tę kartę przeglądarki.
            </div>
          </div>
        );
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
