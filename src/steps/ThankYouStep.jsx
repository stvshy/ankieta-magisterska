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
      <p className="text-gray-600 max-w-md mx-auto">
        Twoje odpowiedzi zostały pomyślnie zapisane. <br />Z pewnością pomogą
        one w dalszych badaniach. <br />
        Jeśli masz ochotę jeszcze jakoś pomóc, możesz udostępnić poniższy link
        swoim znajomym :)
      </p>
      <div className="max-w-md mx-auto w-full mt-2">
        {/* <p className="text-sm font-medium text-gray-700 mb-2">
          Link do ankiety (np. do udostępnienia):
        </p> */}
        <div className="flex gap-2 items-stretch rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <input
            type="text"
            readOnly
            value={SURVEY_URL}
            className="flex-1 min-w-0 px-3 py-2.5 text-sm text-gray-800 bg-gray-50/80 border-0 focus:ring-0 focus:outline-none text-left font-mono"
            aria-label="Adres URL ankiety"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium flex items-center gap-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Skopiowano
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
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
