import React, { useEffect, useRef, useState } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import CountryList from "../components/CountryList.jsx";

const LIST_LETTERS = ["A", "B", "C"];
const CHOICE_OPTIONS = [
  { id: "A", label: "Lista A" },
  { id: "B", label: "Lista B" },
  { id: "C", label: "Lista C" },
  { id: "none", label: "Żadna z nich" },
];

const JUSTIFICATION_LIMIT = 600;

const SummaryStep = ({
  finalChoice,
  setFinalChoice,
  justification,
  setJustification,
  lists,
}) => {
  const justificationRef = useRef(null);
  const previousChoiceRef = useRef(finalChoice);
  const [hasJustExpanded, setHasJustExpanded] = useState(false);

  // Po pierwszym wyborze: zauwaz, ze textarea sie pojawila (animacja).
  // Przy kolejnych zmianach wyboru NIE odpalaj animacji ponownie - drobny detal UX.
  useEffect(() => {
    if (!previousChoiceRef.current && finalChoice) {
      setHasJustExpanded(true);
    }
    previousChoiceRef.current = finalChoice;
  }, [finalChoice]);

  const showJustification = Boolean(finalChoice);
  const remainingChars = JUSTIFICATION_LIMIT - (justification?.length ?? 0);

  return (
    <div className="space-y-7 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Podsumowanie i wybór
        </h2>
        <p className="text-[14.5px] md:text-[15px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Poniżej raz jeszcze widzisz wszystkie trzy rankingi. Gdybyś miał(a)
          zaplanować kolejną podróż, którą z tych trzech list wykorzystał(a)byś
          jako <b>główną inspirację</b>?
        </p>
      </div>

      {/* 3 listy obok siebie - widok porownawczy */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {LIST_LETTERS.map((letter) => {
          const isPicked = finalChoice === letter;
          return (
            <div
              key={letter}
              className={`flex flex-col rounded-xl border bg-white shadow-sm overflow-hidden transition-all duration-200 ${
                isPicked
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200"
              }`}
            >
              <div
                className={`px-2 py-2 sm:px-3 sm:py-2.5 text-center font-bold tracking-wide border-b transition-colors ${
                  isPicked
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                <span className="text-[13px] sm:text-[14px] md:text-[15px]">
                  Lista {letter}
                </span>
              </div>
              <div className="p-1.5 sm:p-2 md:p-2.5">
                <CountryList list={lists[letter] ?? []} layout="list" compact />
              </div>
            </div>
          );
        })}
      </div>

      {/* Wybor jednokrotny */}
      <div className="space-y-3">
        <h3 className="text-[15.5px] md:text-[17px] font-bold text-gray-800 text-center">
          Twój wybór
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {CHOICE_OPTIONS.map((opt) => {
            const isSelected = finalChoice === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFinalChoice(opt.id)}
                className={`p-4 md:p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-blue-50 border-blue-600 text-blue-700 shadow-md scale-[1.015]"
                    : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                {opt.id === "none" ? (
                  <Star className="w-6 h-6 md:w-7 md:h-7 opacity-50" />
                ) : (
                  <ThumbsUp className="w-6 h-6 md:w-7 md:h-7" />
                )}
                <span className="font-bold text-[14px] md:text-[15.5px]">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Opcjonalne pytanie otwarte (pojawia sie po wyborze) */}
      <div
        className={
          showJustification
            ? hasJustExpanded
              ? ""
              : "summary-justification-enter"
            : "hidden"
        }
        aria-hidden={!showJustification}
      >
        <div className="bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
          <label
            htmlFor="summary-justification"
            className="flex items-start gap-2.5 text-[14.5px] md:text-[15.5px] font-semibold text-gray-800"
          >
            <MessageSquare
              className="w-4.5 h-4.5 mt-0.5 text-blue-600 shrink-0"
              aria-hidden="true"
            />
            <span>
              Dlaczego wybrałeś(aś) tę listę? Co o tym zadecydowało?{" "}
              <span className="font-normal text-gray-500">(opcjonalne)</span>
            </span>
          </label>
          <textarea
            id="summary-justification"
            ref={justificationRef}
            value={justification}
            maxLength={JUSTIFICATION_LIMIT}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Np. Lista X miała dla mnie zbyt drogie kierunki, a Lista Y była idealnym kompromisem między ceną a moimi preferencjami..."
            rows={3}
            className="w-full resize-y rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-[14px] md:text-[14.5px] leading-relaxed text-gray-800 placeholder:text-gray-400 outline-none transition-colors focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          <div className="flex justify-between text-[11.5px] md:text-[12px] text-gray-500">
            <span>Możesz pominąć to pytanie i przejść dalej.</span>
            <span
              className={`tabular-nums ${
                remainingChars < 50 ? "text-amber-600 font-medium" : ""
              }`}
            >
              {remainingChars} znaków
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
