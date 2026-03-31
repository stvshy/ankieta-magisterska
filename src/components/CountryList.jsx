import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

/**
 * @param {'grid' | 'list'} layout — grid: 2 kolumny; list: jeden wiersz = cała szerokość (jak jedna komórka siatki).
 */
const CountryList = ({ list, layout = "grid" }) => (
  <div
    className="grid gap-3 mb-6 w-full [contain:layout] transition-[grid-template-columns] duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
    style={{
      gridTemplateColumns:
        layout === "list" ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))",
    }}
  >
    {list.map((country, idx) => (
      <div
        key={idx}
        className="flex min-h-12 items-center gap-2.5 bg-gray-50 px-3.5 rounded-lg border border-gray-100 shadow-sm transition-[transform,opacity,box-shadow] duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0"
      >
        {Flags[country.code] ? (
          React.createElement(Flags[country.code], {
            title: country.name,
            className:
              "w-[27.5px] h-[19.5px] rounded-sm object-cover shrink-0 border border-gray-200",
          })
        ) : country.flag ? (
          <span className="text-[24.5px] leading-none shrink-0">
            {country.flag}
          </span>
        ) : (
          <span className="w-[29.5px] h-[19.5px] rounded-sm bg-gray-300 shrink-0" />
        )}
        <span className="text-[14.5px] font-medium text-gray-700 truncate leading-tight">
          <span className="font-bold text-gray-600 mr-1.5">{idx + 1}.</span>
          {country.name}
        </span>
      </div>
    ))}
  </div>
);

export default CountryList;
