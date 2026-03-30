import React from "react";
import Hypher from "hypher";
import polish from "hyphenation.pl";
import CountryList from "../components/CountryList.jsx";
import RatingScale from "../components/RatingScale.jsx";

const plHypher = new Hypher(polish);
const hyphenatePl = (text) => plHypher.hyphenateText(text);

const ListEvaluationStep = ({
  currentStep,
  evaluations,
  setEvaluations,
  lists,
}) => {
  const listLetter = currentStep === 2 ? "A" : currentStep === 3 ? "B" : "C";
  const currentList = lists[listLetter];
  const personalizedIntroText =
    "System przygotował dla Ciebie 3 zestawienia kierunków podróży. Dwa z nich oparto na trendach rynkowych (odzwierciedlających marzenia oraz faktyczne wybory Polaków), natomiast jedno zostało wygenerowane w sposób spersonalizowany, na podstawie udzielonych przez Ciebie w poprzednim kroku odpowiedzi. Źródła pochodzenia poszczególnych list nie są na tym etapie ujawniane. Zapoznaj się z rankingiem i oceń go poniżej.";

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Lista {listLetter}</h2>
        <p
          className="text-blue-100 text-[13px] tracking-[-0.03em] [word-spacing:0.05em] text-justify [hyphens:auto] [-webkit-hyphens:auto]"
          lang="pl"
        >
          {hyphenatePl(personalizedIntroText)}
        </p>
      </div>

      <CountryList list={currentList} />

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-400 pb-2">
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
};

export default ListEvaluationStep;
