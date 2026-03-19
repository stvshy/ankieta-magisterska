import React from "react";

const CountryList = ({ list }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
    {list.map((country, idx) => (
      <div
        key={idx}
        className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm"
      >
        <span className="text-2xl">{country.flag}</span>
        <span className="text-sm font-medium text-gray-700 truncate">
          {country.name}
        </span>
      </div>
    ))}
  </div>
);

export default CountryList;

