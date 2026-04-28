import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import Hypher from "hypher";
import polish from "hyphenation.pl";
import CountryList from "../components/CountryList.jsx";
import RatingScale from "../components/RatingScale.jsx";

const plHypher = new Hypher(polish);
const hyphenatePl = (text) => plHypher.hyphenateText(text);

const introHead =
  "System przygotował dla Ciebie 3 zestawienia kierunków podróży. ";
const introMiddle =
  "Dwa z nich oparto na trendach rynkowych (odzwierciedlających marzenia oraz faktyczne wybory Polaków), natomiast jedno zostało wygenerowane w sposób spersonalizowany, na podstawie udzielonych przez Ciebie w poprzednim kroku odpowiedzi. ";
const introTailA =
  "Kolejność poszczególnych list jest losowa, a ich źródło pochodzenia nie jest na tym etapie ujawniane. Zapoznaj się z rankingiem i oceń go poniżej.";
const introTailBC =
  "Źródła pochodzenia poszczególnych list nie są na tym etapie ujawniane. Zapoznaj się z rankingiem i oceń go poniżej.";

const shortIntroTextBC = introHead + introTailBC;

const introParagraphClass =
  "text-blue-100 text-[13px] font-normal tracking-[-0.03em] [word-spacing:0.05em] text-justify [hyphens:auto] [-webkit-hyphens:auto]";

const FullIntroParagraph = ({ listLetter, mobileBCTail = false }) => {
  const tail =
    listLetter === "A"
      ? introTailA
      : mobileBCTail
        ? introTailBC
        : introTailA;
  return (
    <p className={introParagraphClass} lang="pl">
      <span className="font-medium">{hyphenatePl(introHead)}</span>
      <span className="font-normal">{hyphenatePl(introMiddle)}</span>
      <span className="font-medium">{hyphenatePl(tail)}</span>
    </p>
  );
};

const ListEvaluationStep = ({
  currentStep,
  evaluations,
  setEvaluations,
  lists,
  countryListLayout,
  setCountryListLayout,
  showMobileLayoutLabel,
  onMobileLayoutLabelDismiss,
}) => {
  const listLetter = currentStep === 2 ? "A" : currentStep === 3 ? "B" : "C";
  const currentList = lists[listLetter];
  const [introExpanded, setIntroExpanded] = useState(false);
  const [isMobileLabelAnimatingOut, setIsMobileLabelAnimatingOut] =
    useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-1.5">
        <div
          className={`bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white shadow-lg overflow-hidden md:overflow-visible ${
            listLetter === "A"
              ? "p-6"
              : "p-6 pb-[calc(0.75rem+0.7px)] md:p-6"
          }`}
        >
          <h2 className="text-2xl font-bold mb-2">Lista {listLetter}</h2>

          <div className="hidden md:block">
            <FullIntroParagraph listLetter={listLetter} />
          </div>

          <div className="md:hidden">
            {listLetter === "A" ? (
              <FullIntroParagraph listLetter="A" />
            ) : (
              <>
                {introExpanded ? (
                  <FullIntroParagraph listLetter={listLetter} mobileBCTail />
                ) : (
                  <p className={`${introParagraphClass} font-medium`} lang="pl">
                    {hyphenatePl(shortIntroTextBC)}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setIntroExpanded((v) => !v)}
                  className="mt-[calc(0.25rem+0.7px)] flex w-full items-center justify-center rounded-lg py-0 text-blue-100/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
                  aria-expanded={introExpanded}
                  aria-label={
                    introExpanded
                      ? "Zwiń pełny opis listy"
                      : "Rozwiń pełny opis listy"
                  }
                >
                  {introExpanded ? (
                    <BsChevronCompactUp
                      className="h-[26.4px] w-[26.4px] shrink-0 opacity-69"
                      aria-hidden
                    />
                  ) : (
                    <BsChevronCompactDown
                      className="h-[26.4px] w-[26.4px] shrink-0 opacity-69"
                      aria-hidden
                    />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 sm:justify-between">
          <p className="text-xs font-medium leading-tight text-gray-500">
            {showMobileLayoutLabel && (
              <span
                className={`sm:hidden inline-block origin-right transition-all duration-200 ${
                  isMobileLabelAnimatingOut
                    ? "scale-x-0 opacity-0 translate-x-1"
                    : ""
                }`}
              >
                Układ
              </span>
            )}
            <span className="hidden sm:inline">Układ rankingu</span>
          </p>
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200/90 bg-transparent text-gray-700 shadow-none transition-colors hover:bg-gray-50/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:scale-[0.97] sm:hidden"
            onClick={() => {
              setCountryListLayout((prev) =>
                prev === "grid" ? "list" : "grid",
              );

              // Tylko pierwsze kliknięcie w danej sesji na mobile:
              if (
                showMobileLayoutLabel &&
                typeof window !== "undefined" &&
                window.innerWidth < 640
              ) {
                setIsMobileLabelAnimatingOut(true);
                window.setTimeout(() => {
                  onMobileLayoutLabelDismiss?.();
                }, 220);
              }
            }}
            aria-label={
              countryListLayout === "grid"
                ? "Przełącz na widok listy"
                : "Przełącz na widok siatki"
            }
          >
            {countryListLayout === "grid" ? (
              <LayoutGrid className="h-4 w-4" aria-hidden />
            ) : (
              <List className="h-4 w-4" aria-hidden />
            )}
          </button>
          <div
            className="hidden sm:inline-flex shrink-0 rounded-md border border-gray-200/90 bg-white p-0.5 shadow-sm"
            role="group"
            aria-label="Układ rankingu"
          >
            <button
              type="button"
              onClick={() => setCountryListLayout("grid")}
              aria-pressed={countryListLayout === "grid"}
              title="Dwie kolumny"
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium leading-tight transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 ${
                countryListLayout === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Siatka</span>
            </button>
            <button
              type="button"
              onClick={() => setCountryListLayout("list")}
              aria-pressed={countryListLayout === "list"}
              title="Lista w jednej kolumnie"
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium leading-tight transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 ${
                countryListLayout === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <List className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>Lista</span>
            </button>
          </div>
        </div>

        <CountryList list={currentList} layout={countryListLayout} />
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-400 pb-2">
          Twoja ocena Listy {listLetter}:
        </h3>

        <RatingScale
          label="1. Ta lista jest trafna dla Twoich potrzeb i upodobań."
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
          label="2. Wymienione kierunki są dla Ciebie osiągalne (finansowo/logistycznie)."
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
          label="3. Ta lista jest dla Ciebie inspirująca."
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
};

export default ListEvaluationStep;
