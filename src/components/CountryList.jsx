import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

/**
 * @param {object} props
 * @param {Array<{name: string, code?: string, flag?: string, matchPct?: number}>} props.list
 * @param {'grid' | 'list'} [props.layout='grid']  grid: 2 kolumny; list: 1 kolumna na pelnej szerokosci
 * @param {boolean} [props.showMatchPct=false]    pokaz badge z % dopasowania (tylko gdy item ma pole matchPct)
 * @param {boolean} [props.compact=false]         tryb kompaktowy (mniejsze flagi/text/padding) - dla widoku 3 list obok siebie
 * @param {'default' | 'reveal'} [props.sizeProfile='default'] wariant rozmiarow; reveal stroi mobile/desktop pod RevealStep
 */
const CountryList = ({
  list,
  layout = "grid",
  showMatchPct = false,
  compact = false,
  sizeProfile = "default",
}) => (
  <div
    className={`grid w-full [contain:layout] transition-[grid-template-columns] duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none ${
      compact ? "gap-2" : "gap-3.5 sm:mb-6 sm:gap-3"
    }`}
    style={{
      gridTemplateColumns:
        layout === "list" ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))",
    }}
  >
    {list.map((country, idx) => {
      const FlagComp = country.code ? Flags[country.code] : null;
      const showPct = showMatchPct && typeof country.matchPct === "number";

      return (
        <div
          key={`${country.name}-${idx}`}
          className={`flex items-center bg-gray-50 rounded-lg border border-gray-100 shadow-sm transition-[transform,opacity,box-shadow] duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
            compact
              ? sizeProfile === "reveal"
                ? "min-h-[41px] gap-2.5 px-2.5 py-1.5 md:min-h-[40px] md:gap-2.5 md:px-2.5 md:py-1"
                : "min-h-[39px] gap-2.5 px-2.5 py-1.5 sm:min-h-[34px] sm:gap-2 sm:px-2 sm:py-1"
              : "min-h-12 gap-2.5 px-3.5"
          }`}
        >
          {FlagComp ? (
            React.createElement(FlagComp, {
              title: country.name,
              className: compact
                ? sizeProfile === "reveal"
                  ? "w-[24px] h-[17px] rounded-[2px] object-cover shrink-0 border border-gray-200 md:w-[23.5px] md:h-[16.5px]"
                  : "w-[23px] h-[16px] rounded-[2px] object-cover shrink-0 border border-gray-200 sm:w-[20px] sm:h-[14px]"
                : "w-[27.5px] h-[19.5px] rounded-sm object-cover shrink-0 border border-gray-200",
            })
          ) : country.flag ? (
            <span
              className={`leading-none shrink-0 ${
                compact
                  ? sizeProfile === "reveal"
                    ? "text-[19px] md:text-[19px]"
                    : "text-[18px] sm:text-[16px]"
                  : "text-[24.5px]"
              }`}
            >
              {country.flag}
            </span>
          ) : (
            <span
              className={`rounded-sm bg-gray-300 shrink-0 ${
                compact
                  ? sizeProfile === "reveal"
                    ? "w-[24px] h-[17px] md:w-[23.5px] md:h-[16.5px]"
                    : "w-[23px] h-[16px] sm:w-[20px] sm:h-[14px]"
                  : "w-[29.5px] h-[19.5px]"
              }`}
            />
          )}

          <span
            className={`flex-1 min-w-0 font-medium text-gray-700 truncate leading-tight ${
              compact
                ? sizeProfile === "reveal"
                  ? "text-[13.3px] md:text-[12.7px]"
                  : "text-[12.8px] sm:text-[12px]"
                : "text-[14.5px]"
            }`}
          >
            <span
              className={`font-bold text-gray-600 ${
                compact ? "mr-1" : "mr-1.5"
              }`}
            >
              {idx + 1}.
            </span>
            {country.name}
          </span>

          {showPct && (
            <span
              className={`shrink-0 rounded-md bg-blue-200/35 text-blue-700 font-bold tabular-nums border border-blue-200/55 ${
                compact
                  ? sizeProfile === "reveal"
                    ? "px-1.5 py-[1px] text-[11.2px] md:px-1.5 md:py-[1px] md:text-[10.8px]"
                    : "px-1.5 py-[1px] text-[10.8px]"
                  : "px-2 py-0.5 text-[11.5px]"
              }`}
              aria-label={`Dopasowanie ${country.matchPct}%`}
            >
              {Math.round(country.matchPct)}%
            </span>
          )}
        </div>
      );
    })}
  </div>
);

export default CountryList;
