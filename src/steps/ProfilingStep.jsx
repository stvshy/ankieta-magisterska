import React from "react";
import Hypher from "hypher";
import polish from "hyphenation.pl";
import CustomSlider from "../components/CustomSlider.jsx";
import zabytki1 from "../assets/zabytki1.svg";
import morza1 from "../assets/morza1.svg";
import gory1 from "../assets/gory3.svg";
import infrastruktura1 from "../assets/infrastruktura1.svg";
import koszty1 from "../assets/koszty1.svg";
import bezpieczenstwo1 from "../assets/bezpieczenstwo2.svg";

const plHypher = new Hypher(polish);
const hyphenatePl = (text) => plHypher.hyphenateText(text);
const PREFERENCE_BUDGET = 100;

const ProfilingStep = ({
  demographics,
  setDemographics,
  preferences,
  setPreferences,
}) => {
  const allocatedPoints = Object.values(preferences).reduce(
    (sum, value) => sum + value,
    0,
  );
  const remainingPoints = PREFERENCE_BUDGET - allocatedPoints;
  const remainingPercentage = (remainingPoints / PREFERENCE_BUDGET) * 100;
  const isBudgetComplete = remainingPoints === 0;

  const preferenceItems = [
    {
      key: "monuments",
      label: "Zabytki i historia",
      icon: (
        <img
          src={zabytki1}
          alt=""
          aria-hidden="true"
          className="block w-[29.5px] h-[29.5px] lg:w-[33px] lg:h-[33px]"
        />
      ),
      colorClass: "text-amber-600",
    },
    {
      key: "beaches",
      label: "Plaże i morze",
      icon: (
        <img
          src={morza1}
          alt=""
          aria-hidden="true"
          className="block w-[29.5px] h-[29.5px] lg:w-[33px] lg:h-[33px]"
        />
      ),
      colorClass: "text-cyan-500",
    },
    {
      key: "mountains",
      label: "Góry i natura",
      icon: (
        <img
          src={gory1}
          alt=""
          aria-hidden="true"
          className="block w-[29.5px] h-[29.5px] lg:w-[34px] lg:h-[34px] object-contain object-center translate-y-[2px] lg:translate-y-[2.0px]"
        />
      ),
      colorClass: "text-emerald-600",
    },
    {
      key: "infrastructure",
      label: "Infrastruktura",
      icon: (
        <img
          src={infrastruktura1}
          alt=""
          aria-hidden="true"
          className="block w-[29.5px] h-[29.5px] lg:w-[33px] lg:h-[33px]"
        />
      ),
      colorClass: "text-slate-600",
    },
    {
      key: "costs",
      label: "Niskie Koszty",
      icon: (
        <img
          src={koszty1}
          alt=""
          aria-hidden="true"
          className="block w-[29.5px] h-[29.5px] lg:w-[33px] lg:h-[33px]"
        />
      ),
      colorClass: "text-yellow-500",
    },
    {
      key: "safety",
      label: "Bezpieczeństwo",
      icon: (
        <img
          src={bezpieczenstwo1}
          alt=""
          aria-hidden="true"
          className="block w-[30.5px] h-[30.5px] lg:w-[34px] lg:h-[34px]"
        />
      ),
      colorClass: "text-indigo-600",
    },
  ];

  const handlePreferenceChange = (key, nextValue) => {
    const currentValue = preferences[key];
    const maxAvailableValue = currentValue + remainingPoints;
    const clampedValue = Math.min(
      Math.max(nextValue, 0),
      Math.min(PREFERENCE_BUDGET, maxAvailableValue),
    );

    setPreferences({ ...preferences, [key]: clampedValue });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="-mt-[14px] md:mt-0 text-[18.5px] md:text-[21.5px] font-bold text-[#316de5] mb-[18px] md:mb-7 ">
          Metryczka użytkownika
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-[15px] md:text-base font-semibold text-gray-800 mb-3">
              1. Płeć
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 tracking-wide text-[14px] sm:text-[14.8px] font-medium">
              {["Kobieta", "Mężczyzna", "Inna", "Nie chcę podawać"].map((opt) => (
                <button
                  key={opt}
                  onClick={() =>
                    setDemographics({ ...demographics, gender: opt })
                  }
                  className={`p-3 rounded-lg border text-sm font-medium transition-all
                            ${
                              demographics.gender === opt
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm"
                            }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[15px] md:text-base font-semibold text-gray-800 mb-3">
              2. Wiek
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 tracking-wide text-[14px] sm:text-[14.8px] font-medium">
              {[
                "18-25 lat",
                "26-35 lat",
                "36-45 lat",
                "46-60 lat",
                "Powyżej 60 lat",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setDemographics({ ...demographics, age: opt })}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all
                            ${
                              demographics.age === opt
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm"
                            }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[15px] md:text-base font-semibold text-gray-800 mb-3">
              3. Częstotliwość podróży zagranicznych
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 tracking-wide text-[14px] sm:text-[14.8px] font-medium">
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
                            ${
                              demographics.frequency === opt
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-sm"
                            }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 md:pt-7 border-t border-gray-300 mt-8 md:mt-11">
        <h2 className="text-[18.5px] md:text-[21.6px] font-bold text-[#316de5] mb-2.5 md:mb-3">
          Twoje preferencje podróżnicze
        </h2>
        <div className="profiling-preferences-intro rounded-xl p-[15.9px] md:p-[19.5px] lg:p-[20.9px] mb-5 md:mb-5">
          <p
            className="sm:text-[14.1px] lg:text-[15.1px] text-[13.6px] text-gray-700 mb-3.5 md:mb-4 text-justify  [word-spacing:0.04em] tracking-[-0.049em] [hyphens:auto] [-webkit-hyphens:auto]"
            lang="pl"
          >
            {hyphenatePl("Proszę określić ")}{" "}
            <span className="font-medium">{hyphenatePl("ważność")}</span>
            {hyphenatePl(
              " poniższych czynników przy wyborze destynacji turystycznej. Rozdziel dokładnie ",
            )}{" "}
            <span className="font-medium">{hyphenatePl("100 punktów")}</span>
            {hyphenatePl(
              " pomiędzy wszystkie czynniki: im więcej punktów przy danym atrybucie, tym większe ma on znaczenie w Twoich preferencjach.",
            )}
          </p>
          <p
            className="text-[13.2px] sm:text-[13.8px] lg:text-[14.8px] text-gray-600 text-justify [word-spacing:0.04em] tracking-[-0.049em] [hyphens:auto] [-webkit-hyphens:auto]"
            lang="pl"
          >
            <span className="font-semibold text-[#e6a715]">
              <span
                aria-hidden="true"
                className="inline-block align-baseline text-[9.3px] sm:text-[10.6px] lg:text-[12px]"
                style={{ transform: "translateY(-2.0px)" }}
              >
                💡
              </span>{" "}
              Wskazówka:
            </span>{" "}
            {hyphenatePl("Zastanów się, co jest dla Ciebie naprawdę ")}{" "}
            <span className="font-medium">{hyphenatePl("najważniejsze")}</span>
            {hyphenatePl(
              ". Przydzielaj więcej punktów czynnikom kluczowym i mniej tym, które są dla Ciebie drugorzędne. Aby przejść dalej, wykorzystaj cały budżet.",
            )}
          </p>
        </div>

        <div
          className={`rounded-2xl border p-4 md:p-5 mb-6 md:mb-8 shadow-sm transition-colors ${
            isBudgetComplete
              ? "bg-emerald-50 border-emerald-200"
              : "bg-blue-50 border-blue-200"
          }`}
          aria-live="polite"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-3">
            <div>
              <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                Pozostało do rozdysponowania
              </p>
              <p
                className={`text-[42px] leading-none md:text-[52px] font-extrabold tracking-tight ${
                  isBudgetComplete ? "text-emerald-700" : "text-blue-700"
                }`}
              >
                {remainingPoints}
                <span className="ml-2 text-[16px] md:text-[18px] font-bold text-gray-600">
                  pkt
                </span>
              </p>
            </div>
            <div className="text-[13px] md:text-[14px] font-medium text-gray-600 sm:text-right">
              Rozdysponowano{" "}
              <span className="font-bold text-gray-900">{allocatedPoints}</span>{" "}
              / {PREFERENCE_BUDGET} pkt
            </div>
          </div>

          <div
            className="h-3 md:h-3.5 rounded-full bg-white border border-gray-200 overflow-hidden"
            role="progressbar"
            aria-label="Pozostałe punkty do rozdysponowania"
            aria-valuemin={0}
            aria-valuemax={PREFERENCE_BUDGET}
            aria-valuenow={remainingPoints}
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isBudgetComplete ? "bg-emerald-500" : "bg-blue-500"
              }`}
              style={{ width: `${remainingPercentage}%` }}
            />
          </div>

          <p
            className={`mt-2.5 text-[12.5px] md:text-[13.5px] font-medium ${
              isBudgetComplete ? "text-emerald-700" : "text-blue-700"
            }`}
          >
            {isBudgetComplete
              ? "Budżet jest kompletny - możesz przejść dalej."
              : "Przesuwaj suwaki aż liczba pozostałych punktów spadnie do 0."}
          </p>
        </div>

        <div className="space-y-6 md:space-y-8 pb-3 md:pb-4">
          {preferenceItems.map(({ key, label, icon, colorClass }) => {
            const value = preferences[key];
            const maxAvailableValue = value + remainingPoints;

            return (
              <div
                key={key}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
                  <div className="flex items-center gap-2.5 lg:gap-3.5 font-semibold text-gray-800 text-[15.5px] md:text-[17px] lg:text-[17.5px]">
                    <div className="flex items-center justify-center p-[5.5px] lg:p-[8.5px] rounded-[5.5px] lg:rounded-[8px] bg-gray-50 border border-gray-200">
                      {icon}
                    </div>{" "}
                    {label}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-bold text-[23.5px] lg:text-[25px] ${colorClass}`}
                    >
                      {value}
                    </span>
                    <span className="text-xs lg:text-[13px] text-black font-medium">
                      / 100 pkt
                    </span>
                  </div>
                </div>

                <CustomSlider
                  value={value}
                  onChange={(val) => handlePreferenceChange(key, val)}
                  colorClass={colorClass}
                  max={PREFERENCE_BUDGET}
                  marks={[0, 25, 50, 75, 100]}
                />

                <div className="flex justify-between text-[12px] lg:text-[13px] text-gray-400 mt-3 font-medium px-1">
                  <span>0 pkt</span>
                  <span>100 pkt</span>
                </div>
                <p className="mt-2 text-[12px] md:text-[13px] text-gray-500 font-medium">
                  Maksymalnie teraz:{" "}
                  <span className="font-bold text-gray-700">
                    {maxAvailableValue} pkt
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilingStep;
