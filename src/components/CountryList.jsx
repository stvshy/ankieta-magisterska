import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

const CountryList = ({ list }) => (
  <div className="grid grid-cols-2 gap-3 mb-6 w-full">
    {list.map((country, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm"
      >
        {Flags[country.code] ? (
          React.createElement(Flags[country.code], {
            title: country.name,
            className: "w-7 h-5 rounded-sm object-cover shrink-0 border border-gray-200",
          })
        ) : country.flag ? (
          <span className="text-2xl shrink-0">{country.flag}</span>
        ) : (
          <span className="w-7 h-5 rounded-sm bg-gray-300 shrink-0" />
        )}
        <span className="text-sm font-medium text-gray-700 truncate">
          <span className="font-bold text-gray-600 mr-1">{idx + 1}.</span>
          {country.name}
        </span>
      </div>
    ))}
  </div>
);

export default CountryList;

