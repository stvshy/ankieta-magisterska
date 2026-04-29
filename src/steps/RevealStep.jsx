import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Heart,
  BriefcaseBusiness,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import CountryList from "../components/CountryList.jsx";

// Definicje 3 typow rankingow - tytul, podtytul (zrodlo), opis,
// kolor naglowka karty oraz emoji-akcent. Te metadane sa wspolne
// dla animacji odslony niezaleznie od tego, pod ktora literke trafil
// dany typ rankingu (listMapping z App.jsx).
const RANKING_META = {
  wsm: {
    title: "Ranking spersonalizowany",
    sourceLabel: "Twoje preferencje",
    description:
      "Wyliczony w czasie rzeczywistym specjalnie dla Ciebie - na podstawie Twoich wcześniejszych wyborów.",
    accent: "from-blue-600 to-indigo-700 text-white",
    sourceGradient: "from-blue-600 to-indigo-700",
    coverGradient:
      "linear-gradient(135deg, #1e40af 0%, #4338ca 60%, #312e81 100%)",
    icon: <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />,
  },
  aspirations: {
    title: "Ranking marzeń",
    sourceLabel: "marzenia podróżnicze Polaków",
    description:
      "Zbudowany na podstawie analizy najczęściej wymarzonych kierunków podróży wśród Polaków.",
    accent: "from-fuchsia-500 to-rose-500 text-white",
    sourceGradient: "from-fuchsia-500 to-rose-500",
    coverGradient:
      "linear-gradient(135deg, #c026d3 0%, #db2777 60%, #be123c 100%)",
    icon: <Heart className="w-4 h-4 shrink-0" aria-hidden="true" />,
  },
  reality: {
    title: "Ranking rzeczywistości",
    sourceLabel: "rzeczywiste wybory Polaków",
    description:
      "Zbudowany w oparciu o twarde dane sprzedażowe biur podróży - czyli kierunki, które Polacy faktycznie najczęściej kupują.",
    accent: "from-emerald-600 to-teal-700 text-white",
    sourceGradient: "from-emerald-600 to-teal-700",
    coverGradient:
      "linear-gradient(135deg, #047857 0%, #0f766e 60%, #064e3b 100%)",
    icon: <BriefcaseBusiness className="w-4 h-4 shrink-0" aria-hidden="true" />,
  },
};

const USEFUL_OPTIONS = [
  {
    id: "tak",
    label: "Tak",
    icon: ThumbsUp,
    activeClass: "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md",
    iconActive: "text-emerald-600",
  },
  {
    id: "nie",
    label: "Nie",
    icon: ThumbsDown,
    activeClass: "bg-rose-50 border-rose-500 text-rose-700 shadow-md",
    iconActive: "text-rose-600",
  },
  {
    id: "trudno_powiedziec",
    label: "Trudno powiedzieć",
    icon: HelpCircle,
    activeClass: "bg-amber-50 border-amber-500 text-amber-700 shadow-md",
    iconActive: "text-amber-600",
  },
];

// Stagger-y animacji odslony (synchronizacja z keyframes w App.css).
const COVER_DURATION_MS = 850;
const STAGGER_MS = 220;
const QUESTION_DELAY_BUFFER_MS = 250;

const RevealStep = ({
  finalChoice,
  listMapping,
  lists,
  personalizationUseful,
  setPersonalizationUseful,
}) => {
  const totalRevealMs =
    STAGGER_MS * 2 + COVER_DURATION_MS + QUESTION_DELAY_BUFFER_MS;
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowQuestion(true), totalRevealMs);
    return () => window.clearTimeout(t);
  }, [totalRevealMs]);

  const renderChoiceBadge = () => {
    if (!finalChoice) return null;
    const type = listMapping?.[finalChoice];
    const meta = type ? RANKING_META[type] : null;
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#2563eb] bg-white px-3.5 py-1.5 text-[12.5px] md:text-[13px] font-semibold shadow-[0_6px_16px_rgba(37,99,235,0.22)]">
        <CheckCircle2 className="w-4 h-4 text-[#2563eb]" aria-hidden="true" />
        <span className="text-[#2563eb]">Twój wybór:</span>
        {meta ? (
          <span
            className={`bg-gradient-to-r ${meta.sourceGradient} bg-clip-text text-transparent font-bold`}
          >
            Lista {finalChoice} — {meta.title}
          </span>
        ) : (
          <span className="text-[#2563eb]">Lista {finalChoice}</span>
        )}
      </span>
    );
  };

  return (
    <div className="space-y-7 animate-fadeIn">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 px-3.5 py-1.5 text-[12.5px] md:text-[13px] font-semibold text-blue-700">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          AHA! Moment
        </div>
        <h2 className="text-2xl md:text-[26px] font-bold text-gray-900">
          Oto co kryło się pod listami
        </h2>
        <p className="text-[14px] md:text-[15px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Każda z trzech list miała inne źródło. Poniżej odsłaniamy, czym
          naprawdę były Listy A, B i C.
        </p>
        <div className="pt-1">{renderChoiceBadge()}</div>
      </div>

      {/* 3 odslaniajace sie karty */}
      <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {["A", "B", "C"].map((letter, idx) => {
          const type = listMapping?.[letter];
          const meta = type ? RANKING_META[type] : null;
          const list = lists?.[letter] ?? [];
          const isPickedByUser = finalChoice === letter;

          if (!meta) return null;

          const animationDelay = `${idx * STAGGER_MS}ms`;

          return (
            <div
              key={letter}
              className={`relative bg-white transition-shadow ${
                isPickedByUser
                  ? "z-20 mt-5 md:mt-0 overflow-visible rounded-[1.25rem] rounded-tr-none ring-[2px] ring-[#2563eb] shadow-[0_6px_14px_#2563eb]"
                  : "z-10 rounded-2xl ring-1 ring-gray-200 shadow-sm"
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  isPickedByUser
                    ? "rounded-[1.25rem] rounded-tr-none"
                    : "rounded-2xl"
                }`}
              >
                {/* Zawartosc karty (zawsze wyrenderowana, ale pojawia sie z animacja) */}
                <div
                  className="reveal-card-content"
                  style={{
                    animationDelay,
                    animationDuration: "700ms",
                  }}
                >
                  <div
                    className={`px-4 py-3 bg-gradient-to-r ${meta.accent} flex items-center justify-between gap-2`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {meta.icon}
                      <h3 className="text-[15px] md:text-[14px] font-bold truncate">
                        {meta.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[11px] md:text-[11.5px] font-semibold tracking-wide">
                      Lista {letter}
                    </span>
                  </div>
                  <div className="px-4 pt-3 pb-4 space-y-3">
                    <div>
                    <p className="text-[12px] md:text-[11.5px] font-semibold uppercase tracking-[0.06em] text-gray-500">
                        <span
                          className={`bg-gradient-to-r ${meta.sourceGradient} bg-clip-text text-transparent`}
                        >
                          Źródło:
                        </span>{" "}
                        {meta.sourceLabel}
                      </p>
                    <p className="mt-1 text-[12.5px] md:text-[12px] leading-snug text-gray-600">
                        {meta.description}
                      </p>
                      {type === "wsm" && (
                        <p className="mt-1.5 -mb-2 text-right text-[10.5px] md:text-[9.8px] font-semibold text-blue-700">
                          % dopasowania
                        </p>
                      )}
                    </div>
                    <CountryList
                      list={list}
                      layout="list"
                      compact
                      showMatchPct={type === "wsm"}
                      sizeProfile="reveal"
                    />
                  </div>
                </div>

                {/* Zaslonka karty - sliduje w gore i znika */}
                <div
                  className="reveal-card-cover absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    animationDelay,
                    background: meta.coverGradient,
                  }}
                  aria-hidden="true"
                >
                  <span className="text-white text-[36px] md:text-[44px] font-extrabold tracking-tight drop-shadow-md select-none">
                    Lista {letter}
                  </span>
                </div>
              </div>
              {isPickedByUser && (
                <div className="absolute right-[-2.54px] top-[-21px] z-[60] rounded-t-md rounded-b-none bg-blue-600 px-2 py-[3px] text-[9.8px] font-extrabold tracking-wide text-white shadow-[0_8px_16px_rgba(37,99,235,0.38)]">
                  Twój wybór
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pytanie koncowe - pojawia sie po zakonczeniu animacji odslony */}
      {showQuestion && (
        <div
          className="reveal-question rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm space-y-4"
          style={{ animationDelay: "0ms" }}
        >
          <div>
            <p className="text-[12px] md:text-[12.5px] font-semibold uppercase tracking-[0.08em] text-blue-600 mb-1.5">
              Pytanie końcowe
            </p>
            <h3 className="text-[15.5px] md:text-[17px] font-bold text-gray-900 leading-snug">
              Czy po zapoznaniu się z tymi informacjami uważasz, że funkcja
              personalizowanych rekomendacji byłaby przydatna w aplikacjach
              turystycznych (np. na Booking.com)?
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3">
            {USEFUL_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = personalizationUseful === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPersonalizationUseful(opt.id)}
                  className={`flex items-center justify-center gap-2 p-3.5 md:p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? opt.activeClass
                      : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 md:w-5.5 md:h-5.5 shrink-0 ${
                      isSelected ? opt.iconActive : "text-gray-500"
                    }`}
                  />
                  <span className="font-semibold text-[14px] md:text-[15px]">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RevealStep;
