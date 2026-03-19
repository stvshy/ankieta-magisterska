import React from "react";

const RatingScale = ({ value, onChange, label }) => (
  <div className="mb-6">
    <p className="font-medium text-gray-800 mb-3">{label}</p>
    <div className="flex justify-between items-center gap-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`flex-1 py-3 rounded-lg border-2 transition-all font-bold text-lg
            ${
              value === num
                ? "bg-blue-600 border-blue-600 text-white shadow-md"
                : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
            }`}
        >
          {num}
        </button>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
      <span>1 - Zdecydowanie nie</span>
      <span>5 - Zdecydowanie tak</span>
    </div>
  </div>
);

export default RatingScale;

