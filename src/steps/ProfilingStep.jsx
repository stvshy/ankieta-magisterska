import React from "react";
import {
  Landmark,
  Umbrella,
  Tent,
  Building2,
  Coins,
  ShieldCheck,
} from "lucide-react";
import Hypher from "hypher";
import polish from "hyphenation.pl";
import CustomSlider from "../components/CustomSlider.jsx";

const plHypher = new Hypher(polish);
const hyphenatePl = (text) => plHypher.hyphenateText(text);

const ProfilingStep = ({
  demographics,
  setDemographics,
  preferences,
  setPreferences,
}) => (
  <div className="space-y-8 animate-fadeIn">
    <div>
      <h2 className="-mt-[13px] md:mt-0 text-[18.5px] md:text-[21.5px] font-bold text-[#316de5] mb-4 md:mb-6 ">
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
      <p
        className="sm:text-[14.5px] text-[14.0px] text-gray-600 mb-4 text-justify [hyphens:auto] [-webkit-hyphens:auto]"
        lang="pl"
      >
        {hyphenatePl(
          "Proszę określić ważność poniższych czynników przy wyborze destynacji turystycznej, gdzie 0 oznacza wartość „zupełnie nieważne”, a 10 – „kluczowe”.",
        )}
      </p>
      <p className="flex items-start text-[13.6px] sm:text-[14.2px] text-gray-600 mb-[20px] md:mb-8">
        <span className="-ml-[2.5px] sm:-ml-0 mr-1.5 sm:mr-2 flex h-[21px] items-center text-[9.9px] sm:text-[11.2px] leading-none">
          💡
        </span>
        <span
          className="block text-justify [hyphens:auto] [-webkit-hyphens:auto]"
          lang="pl"
        >
          <span className="font-semibold text-[#e6a715] mr-2">Wskazówka:</span>
          <span>
            {hyphenatePl(
              'Zastanów się, co jest dla Ciebie naprawdę najważniejsze. Ustawienie takich samych ocen (np. samych "10") dla wszystkich czynników obniży precyzję dopasowania do Twoich preferencji.',
            )}
          </span>
        </span>
      </p>

      <div className="space-y-6 md:space-y-8 pb-3 md:pb-4">
        {[
          {
            key: "monuments",
            label: "Zabytki i historia",
            icon: <Landmark className="w-[30px] h-[30px] text-amber-600" />,
            colorClass: "text-amber-600",
          },
          {
            key: "beaches",
            label: "Plaże i morze",
            icon: <Umbrella className="w-[30px] h-[30px]  text-cyan-500" />,
            colorClass: "text-cyan-500",
          },
          {
            key: "mountains",
            label: "Góry i natura",
            icon: <Tent className="w-[30px] h-[30px]  text-emerald-600" />,
            colorClass: "text-emerald-600",
          },
          {
            key: "infrastructure",
            label: "Infrastruktura",
            icon: <Building2 className="w-[30px] h-[30px]  text-slate-600" />,
            colorClass: "text-slate-600",
          },
          {
            key: "costs",
            label: "Niskie Koszty",
            icon: <Coins className="w-[30px] h-[30px]  text-yellow-500" />,
            colorClass: "text-yellow-500",
          },
          {
            key: "safety",
            label: "Bezpieczeństwo",
            icon: <ShieldCheck className="w-[31px] h-[31px] text-indigo-600" />,
            colorClass: "text-indigo-600",
          },
        ].map(({ key, label, icon, colorClass }) => (
          <div
            key={key}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2.5 font-semibold text-gray-800 text-base md:text-[17px]">
                <div className="p-1.5 rounded-md bg-gray-50 border border-gray-200">
                  {icon}
                </div>{" "}
                {label}
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`font-bold text-[24px] ${colorClass}`}>
                  {preferences[key]}
                </span>
                <span className="text-xs text-black font-medium">/ 10</span>
              </div>
            </div>

            <CustomSlider
              value={preferences[key]}
              onChange={(val) => setPreferences({ ...preferences, [key]: val })}
              colorClass={colorClass}
            />

            <div className="flex justify-between text-[12px] text-gray-400 mt-3 font-medium px-1">
              <span>Nieważne (0)</span>
              <span>Kluczowe (10)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProfilingStep;
