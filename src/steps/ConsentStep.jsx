import React from "react";
import { Info } from "lucide-react";

const ConsentStep = ({ agreed, setAgreed }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        <Info className="w-6 h-6" /> Informacja dla uczestnika badania
      </h2>
      <div className="text-sm text-gray-700 space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        <p>Szanowna Pani/Szanowny Panie,</p>
        <p>
          Nazywam się Mateusz Staszków i jestem studentem Informatyki
          Stosowanej na Politechnice Wrocławskiej. Zapraszam do udziału
          w badaniu naukowym, które stanowi część mojej pracy
          magisterskiej, realizowanej pod opieką dr inż. Bernadetty
          Maleszki.
        </p>
        <h3 className="font-bold text-gray-900 mt-4">
          1. Cel i przebieg badania
        </h3>
        <p>
          Celem badania jest ocena trafności i użyteczności różnych
          metod rekomendacji podróżniczych w opinii użytkowników.
          Badanie realizowane jest w formie interaktywnej sesji, a jej
          wypełnienie zajmie około 5-10 minut.
        </p>
        <h3 className="font-bold text-gray-900 mt-4">
          2. Dobrowolność i anonimowość
        </h3>
        <p>
          Udział w badaniu jest w pełni dobrowolny. Badanie jest w pełni
          anonimowe. Nie zbieramy żadnych danych, które mogłyby pozwolić
          na Pana/Pani identyfikację (takich jak imię, nazwisko, adres
          e-mail czy adres IP urządzenia).
        </p>
        <h3 className="font-bold text-gray-900 mt-4">
          3. Przetwarzanie danych
        </h3>
        <p>
          Administratorem danych jest Politechnika Wrocławska.
          Zanonimizowane dane zostaną wykorzystane wyłącznie do celów
          naukowych i analizy statystycznej.
        </p>
      </div>
    </div>

    <label className="flex items-start gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        className="mt-1 w-6 h-6 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
      />
      <span className="text-sm font-medium text-gray-800 pt-1">
        Oświadczam, że zapoznałem/am się z informacją o badaniu, mam
        ukończone 18 lat i wyrażam dobrowolną zgodę na udział w badaniu
        naukowym.
      </span>
    </label>
  </div>
);

export default ConsentStep;

