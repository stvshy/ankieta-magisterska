import React from "react";

const CustomSlider = ({ value, onChange, colorClass }) => {
  const marks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="relative pt-2 pb-2">
      <div className="relative h-10 w-full pointer-events-none mb-1">
        {marks.map((mark) => {
          const percent = (mark / 10) * 100;
          const leftPos = `calc(${percent}% + ${
            12 - (percent * 24) / 100
          }px)`;

          return (
            <div
              key={mark}
              className="absolute bottom-0 flex flex-col items-center"
              style={{ left: leftPos, transform: "translateX(-50%)" }}
            >
              <span
                className={`text-[11px] sm:text-xs font-bold mb-1 transition-all ${
                  value === mark
                    ? "text-gray-900 scale-125"
                    : "text-gray-400"
                }`}
              >
                {mark}
              </span>
              <div
                className={`w-[2px] transition-all ${
                  value === mark
                    ? "h-3 " + colorClass.replace("text-", "bg-")
                    : "h-2 bg-gray-300"
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      <input
        type="range"
        min="0"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`block w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer relative z-10
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[4px] 
          [&::-webkit-slider-thumb]:shadow-md transition-all
          ${colorClass.replace("text-", "[&::-webkit-slider-thumb]:border-")}
          focus:outline-none focus:ring-4 focus:ring-opacity-30 ${colorClass.replace("text-", "focus:ring-")}
        `}
      />
    </div>
  );
};

export default CustomSlider;

