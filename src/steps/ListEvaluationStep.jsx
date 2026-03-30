import React from "react";
import CountryList from "../components/CountryList.jsx";
import RatingScale from "../components/RatingScale.jsx";

const ListEvaluationStep = ({
  currentStep,
  evaluations,
  setEvaluations,
  lists,
}) => {
  const listLetter = currentStep === 2 ? "A" : currentStep === 3 ? "B" : "C";
  const currentList = lists[listLetter];

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
