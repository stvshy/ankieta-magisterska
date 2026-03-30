import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

const CountryList = ({ list }) => (
  <div className="grid grid-cols-2 gap-3 mb-6 w-full">
    {list.map((country, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2.5 bg-gray-50 h-12 px-3.5 rounded-lg border border-gray-100 shadow-sm"
      >
        {Flags[country.code] ? (
          React.createElement(Flags[country.code], {
            title: country.name,
            className:
              "w-[27.5px] h-[19.5px] rounded-sm object-cover shrink-0 border border-gray-200",
          })
        ) : country.flag ? (
          <span className="text-[24.5px] leading-none shrink-0">{country.flag}</span>
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

