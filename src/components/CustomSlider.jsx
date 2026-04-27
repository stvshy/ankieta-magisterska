import React, { memo, useMemo, useState } from "react";

const COLOR_HEX_MAP = {
  "text-amber-600": "#d97706",
  "text-cyan-500": "#06b6d4",
  "text-emerald-600": "#059669",
  "text-slate-600": "#475569",
  "text-yellow-500": "#eab308",
  "text-indigo-600": "#4f46e5",
};

const CustomSlider = memo(function CustomSlider({
  value,
  onChange,
  colorClass,
  max = 10,
  marks,
  desktopMarks,
  desktopMinorMarks,
  maxSelectable = max,
}) {
  const [hoveredMark, setHoveredMark] = useState(null);
  const visibleMarks = useMemo(
    () => marks || Array.from({ length: max + 1 }, (_, index) => index),
    [marks, max],
  );
  const visibleDesktopMarks = desktopMarks || visibleMarks;
  const visibleDesktopMinorMarks = desktopMinorMarks || [];
  const thumbSizePx = 16;
  const thumbRadiusPx = thumbSizePx / 2;
  const percentage = (value / max) * 100;
  const sliderColor = COLOR_HEX_MAP[colorClass] || "#3b82f6"; // domyślnie niebieski
  const getMarkLeftPosition = (mark) => {
    const percent = (mark / max) * 100;
    return `calc(${percent}% - (${percent} * ${thumbSizePx}px / 100) + ${thumbRadiusPx}px)`;
  };
  const renderMinorMarks = (markValues) => (
    <div className="absolute inset-0 pointer-events-none">
      {markValues.map((mark) => {
        const isSelectable = mark <= maxSelectable;

        return (
          <span
            key={mark}
            className={`absolute bottom-0 w-px rounded-full ${
              isSelectable ? "h-1 bg-gray-300" : "h-1 bg-gray-200"
            }`}
            style={{
              left: getMarkLeftPosition(mark),
              transform: "translateX(-50%)",
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
  const renderMarks = (markValues, className) => (
    <div className={className}>
      {markValues.map((mark) => {
        const isActive = value === mark;
        const isSelectable = mark <= maxSelectable;
        const isHovered = hoveredMark === mark && isSelectable;

        return (
          <div
            key={mark}
            className={`absolute bottom-0 flex flex-col items-center pointer-events-auto ${
              isSelectable ? "cursor-pointer" : "cursor-default"
            }`}
            style={{
              left: getMarkLeftPosition(mark),
              transform: "translateX(-50%)",
            }}
            onMouseEnter={() => setHoveredMark(mark)}
            onMouseLeave={() => setHoveredMark(null)}
            onClick={() => {
              if (isSelectable) onChange(mark);
            }}
            role="button"
            tabIndex={isSelectable ? 0 : -1}
            onKeyDown={(e) => {
              if (isSelectable && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onChange(mark);
              }
            }}
            aria-disabled={!isSelectable}
            aria-label={`Ustaw wartość ${mark}`}
          >
            <span
              className={`text-[11px] sm:text-[12.5px] lg:text-[12px] xl:text-[12.5px] font-bold mb-1 transition-all duration-150 ${
                isActive || isHovered
                  ? "text-gray-900 scale-125"
                  : isSelectable
                    ? "text-gray-400 scale-100"
                    : "text-gray-300 scale-100"
              }`}
            >
              {mark}
            </span>
            <div
              className={`w-px rounded-full transition-all ${
                isActive
                  ? "h-2.5 " + colorClass.replace("text-", "bg-")
                  : isSelectable
                    ? "h-1.5 bg-gray-300"
                    : "h-1.5 bg-gray-200"
              }`}
            ></div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="relative pt-1.5 pb-1.5">
      {renderMarks(visibleMarks, "relative h-[33px] w-full mb-1 lg:hidden")}
      <div className="relative hidden lg:block h-[38px] w-full mb-1.5">
        {renderMinorMarks(visibleDesktopMinorMarks)}
        {renderMarks(visibleDesktopMarks, "absolute inset-0")}
      </div>

      <input
        type="range"
        min="0"
        max={max}
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        onMouseLeave={() => setHoveredMark(null)}
        className={`custom-slider block w-full h-[8.8px] sm:h-[9.8px] lg:h-[10.8px] rounded-lg appearance-none cursor-pointer relative z-10 outline-none
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
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
});

export default CustomSlider;
