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

const ProfilingStep = ({
  demographics,
  setDemographics,
  preferences,
  setPreferences,
}) => (
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
      <div className="profiling-preferences-intro rounded-xl p-[15.9px] md:p-[19.5px] lg:p-[20.9px] mb-5 md:mb-8">
        <p
          className="sm:text-[14.1px] lg:text-[15.1px] text-[13.6px] text-gray-700 mb-3.5 md:mb-4 text-justify  [word-spacing:0.04em] tracking-[-0.049em] [hyphens:auto] [-webkit-hyphens:auto]"
          lang="pl"
        >
          {hyphenatePl("Proszę określić ")}{" "}
          <span className="font-medium">{hyphenatePl("ważność")}</span>
          {hyphenatePl(
            " poniższych czynników przy wyborze destynacji turystycznej, gdzie ",
          )}{" "}
          <span className="font-medium">{hyphenatePl("0")}</span>
          {hyphenatePl(" oznacza wartość ")}{" "}
          <span className="font-medium">
            {hyphenatePl("„zupełnie nieważne”")}
          </span>
          {hyphenatePl(", a ")}{" "}
          <span className="font-medium">{hyphenatePl("10 – „kluczowe”")}</span>
          {hyphenatePl(".")}
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
          {hyphenatePl('. Ustawienie takich samych ocen (np. samych "')}
          <span className="font-medium">{hyphenatePl("10")}</span>
          {hyphenatePl('") dla wszystkich czynników ')}{" "}
          <span className="font-medium">{hyphenatePl("obniży precyzję")}</span>
          {hyphenatePl(" dopasowania do Twoich preferencji.")}
        </p>
      </div>

      <div className="space-y-6 md:space-y-8 pb-3 md:pb-4">
        {[
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
        ].map(({ key, label, icon, colorClass }) => (
          <div
            key={key}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-3">
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
                  {preferences[key]}
                </span>
                <span className="text-xs lg:text-[13px] text-black font-medium">
                  / 10
                </span>
              </div>
            </div>

            <CustomSlider
              value={preferences[key]}
              onChange={(val) => setPreferences({ ...preferences, [key]: val })}
              colorClass={colorClass}
            />

            <div className="flex justify-between text-[12px] lg:text-[13px] text-gray-400 mt-3 font-medium px-1">
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
