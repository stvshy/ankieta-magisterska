import React from "react";
import {
  Landmark,
  Umbrella,
  Tent,
  Building2,
  Coins,
  ShieldCheck,
} from "lucide-react";
import CustomSlider from "../components/CustomSlider.jsx";

const ProfilingStep = ({
  demographics,
  setDemographics,
  preferences,
  setPreferences,
}) => (
  <div className="space-y-8 animate-fadeIn">
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Metryczka użytkownika
      </h2>

      <div className="space-y-6">
        <div>
          <p className="font-medium text-gray-800 mb-3">1. Płeć</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

    <div className="pt-10 border-t mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Twoje preferencje podróżnicze
      </h2>
      <p className="text-sm text-gray-500 mb-10">
        Proszę określić ważność poniższych czynników przy wyborze destynacji
        turystycznej (0 - zupełnie nieważne, 10 - kluczowe).
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
                <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
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
              onChange={(val) => setPreferences({ ...preferences, [key]: val })}
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

export default ProfilingStep;
