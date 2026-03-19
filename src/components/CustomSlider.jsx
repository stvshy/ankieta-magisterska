import React, { useState } from "react";

const COLOR_HEX_MAP = {
  "text-amber-600": "#d97706",
  "text-cyan-500": "#06b6d4",
  "text-emerald-600": "#059669",
  "text-slate-600": "#475569",
  "text-yellow-500": "#eab308",
  "text-indigo-600": "#4f46e5",
};

const CustomSlider = ({ value, onChange, colorClass }) => {
  const [hoveredMark, setHoveredMark] = useState(null);
  const marks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const percentage = (value / 10) * 100;
  const sliderColor = COLOR_HEX_MAP[colorClass] || "#3b82f6"; // domyślnie niebieski
  const getHoveredMarkFromPointer = (clientX, target) => {
    const rect = target.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const ratio = Math.min(Math.max(relativeX / rect.width, 0), 1);
    return Math.round(ratio * 10);
  };

  return (
    <div className="relative pt-2 pb-2">
      <div className="relative h-10 w-full mb-1">
        {marks.map((mark) => {
          const percent = (mark / 10) * 100;
          const leftPos = `calc(${percent}% + ${
            12 - (percent * 24) / 100
          }px)`;
          const isActive = value === mark;
          const isHovered = hoveredMark === mark;

          return (
            <div
              key={mark}
              className="absolute bottom-0 flex flex-col items-center pointer-events-auto cursor-pointer"
              style={{ left: leftPos, transform: "translateX(-50%)" }}
              onMouseEnter={() => setHoveredMark(mark)}
              onMouseLeave={() => setHoveredMark(null)}
              onClick={() => onChange(mark)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(mark);
                }
              }}
              aria-label={`Ustaw wartość ${mark}`}
            >
              <span
                className={`text-[11px] sm:text-xs font-bold mb-1 transition-all duration-150 ${
                  isActive || isHovered
                    ? "text-gray-900 scale-125"
                    : "text-gray-400 scale-100"
                }`}
              >
                {mark}
              </span>
              <div
                className={`w-[2px] transition-all ${
                  isActive
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
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        onMouseMove={(e) =>
          setHoveredMark(getHoveredMarkFromPointer(e.clientX, e.currentTarget))
        }
        onMouseLeave={() => setHoveredMark(null)}
        className={`custom-slider block w-full h-3 rounded-lg appearance-none cursor-pointer relative z-10 outline-none
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300
          [&::-webkit-slider-thumb]:shadow-sm hover:[&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:border-gray-400
          transition-all
          focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-transparent
        `}
        style={{
          outline: "none",
          background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
        }}
      />
    </div>
  );
};

export default CustomSlider;

