import React, { useState } from "react";
import { CheckCircle, Copy, Check } from "lucide-react";

const SURVEY_URL = "https://ankieta.stvshy.com";

const ThankYouStep = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SURVEY_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="text-center py-12 animate-fadeIn space-y-6">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900">Dziękuję za udział!</h2>
      <p className="text-[15px] text-gray-600 max-w-md mx-auto leading-relaxed">
        Twoje odpowiedzi zostały pomyślnie zapisane. Z&nbsp;pewnością pomogą one
        w dalszych badaniach. Jeśli masz ochotę jeszcze jakoś pomóc, możesz
        udostępnić poniższy link swoim znajomym :)
      </p>
      <div className="max-w-[min(22rem,100%)] mx-auto w-full mt-2">
        <div className="flex gap-0 items-stretch rounded-xl border border-gray-200 bg-white shadow-sm">
          <input
            type="text"
            readOnly
            value={SURVEY_URL}
            className="flex-1 min-w-0 rounded-l-xl px-3 py-2.5 text-[15.5px] text-gray-800 bg-gray-50/80 border-0 focus:ring-0 focus:outline-none text-left font-mono"
            aria-label="Adres URL ankiety"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`shrink-0 rounded-r-xl px-3.5 sm:px-4 py-2.5 text-sm font-medium flex items-center gap-2 border-2 border-blue-600 transition-all duration-200 ${
              copied
                ? "bg-white text-blue-600 ring-4 ring-inset ring-blue-600/15"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                Skopiowano
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" />
                Kopiuj
              </>
            )}
          </button>
        </div>
      </div>
      <div className="mt-8 p-4 bg-gray-50 rounded-lg inline-block text-sm text-gray-500">
        Możesz teraz bezpiecznie zamknąć tę kartę przeglądarki.
      </div>
    </div>
  );
};

export default ThankYouStep;
