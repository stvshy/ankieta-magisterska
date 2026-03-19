import React from "react";
import { Star, ThumbsUp } from "lucide-react";

const SummaryStep = ({ finalChoice, setFinalChoice }) => (
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
      {["Lista A", "Lista B", "Lista C", "Żadna z nich"].map((choice) => (
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
      ))}
    </div>
  </div>
);

export default SummaryStep;

