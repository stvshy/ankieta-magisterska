import React from "react";
import { Info } from "lucide-react";
import { IoCheckmarkSharp } from "react-icons/io5";
import Hypher from "hypher";
import polish from "hyphenation.pl";

const plHypher = new Hypher(polish);
const hyphenatePl = (text) => plHypher.hyphenateText(text);

const ConsentStep = ({ agreed, setAgreed }) => (
  <div className="consent-step-layout animate-fadeIn">
    <div className="consent-step-note bg-blue-50 p-6 rounded-xl border border-blue-100">
      <h2 className="text-[16.5px] font-semibold text-blue-900 mb-4 flex items-center gap-2">
        <Info className="w-4 h-4" /> Informacja dla uczestnika badania
      </h2>
      <div className="text-sm text-gray-700 overflow-y-auto pr-2 custom-scrollbar consent-step-note-content">
        <p className="mb-3 text-gray-800">Szanowna Pani/Szanowny Panie,</p>
        <p
          className="mb-4 text-justify [hyphens:auto] [-webkit-hyphens:auto]"
          lang="pl"
        >
          {hyphenatePl(
            "Nazywam się Mateusz Staszków i jestem studentem Informatyki Stosowanej na Politechnice Wrocławskiej. Zapraszam do udziału w badaniu naukowym, które stanowi część mojej pracy magisterskiej, realizowanej pod opieką dr inż. Bernadetty Maleszki.",
          )}
        </p>
        <h3 className="font-semibold text-gray-900 mt-4 mb-2">
          1. Cel i przebieg badania
        </h3>
        <p
          className="text-justify [hyphens:auto] [-webkit-hyphens:auto]"
          lang="pl"
        >
          {hyphenatePl(
            "Celem badania jest ocena trafności i użyteczności różnych metod rekomendacji podróżniczych w opinii użytkowników. Badanie realizowane jest w formie interaktywnej sesji, a jej wypełnienie zajmie około 5-10 minut.",
          )}
        </p>
        <h3 className="font-semibold text-gray-900 mt-4 mb-2">
          2. Dobrowolność i anonimowość
        </h3>
        <p
          className="text-justify [hyphens:auto] [-webkit-hyphens:auto]"
          lang="pl"
        >
          {hyphenatePl(
            "Udział w badaniu jest w pełni dobrowolny. Badanie jest w pełni anonimowe. Nie zbieramy żadnych danych, które mogłyby pozwolić na Pana/Pani identyfikację (takich jak imię, nazwisko, adres e-mail czy adres IP urządzenia).",
          )}
        </p>
        <h3 className="font-semibold text-gray-900 mt-4 mb-2">
          3. Przetwarzanie danych
        </h3>
        <p
          className="text-justify [hyphens:auto] [-webkit-hyphens:auto]"
          lang="pl"
        >
          {hyphenatePl(
            "Administratorem danych jest Politechnika Wrocławska. Zanonimizowane dane zostaną wykorzystane wyłącznie do celów naukowych i analizy statystycznej.",
          )}
        </p>
      </div>
    </div>

    <label
      className={`consent-step-checkbox ${agreed ? "consent-step-checkbox--checked" : "consent-step-checkbox--required"} flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors`}
    >
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        className="consent-step-checkbox-input"
      />
      <span className="consent-step-checkbox-circle" aria-hidden="true">
        <IoCheckmarkSharp className="consent-step-checkbox-icon" />
      </span>
      <span className="consent-step-checkbox-content">
        <span
          className="consent-step-checkbox-text text-sm font-medium text-gray-800 text-justify [hyphens:auto] [-webkit-hyphens:auto]"
          lang="pl"
        >
          {hyphenatePl(
            "Oświadczam, że zapoznałem/am się z informacją o badaniu, mam ukończone 18 lat i wyrażam dobrowolną zgodę na udział w badaniu naukowym.",
          )}
        </span>
        {!agreed && (
          <span className="consent-step-checkbox-required">Wymagane</span>
        )}
      </span>
    </label>
  </div>
);

export default ConsentStep;
