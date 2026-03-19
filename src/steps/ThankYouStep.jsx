import React from "react";
import { CheckCircle } from "lucide-react";

const ThankYouStep = () => (
  <div className="text-center py-12 animate-fadeIn space-y-6">
    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle className="w-12 h-12" />
    </div>
    <h2 className="text-3xl font-bold text-gray-900">
      Dziękuję za udział!
    </h2>
    <p className="text-gray-600 max-w-md mx-auto">
      Twoje odpowiedzi zostały anonimowo zapisane. Pomogą one w
      badaniach nad zjawiskiem luki decyzyjnej w systemach
      rekomendacyjnych turystyki w ramach mojej pracy magisterskiej.
    </p>
    <div className="mt-8 p-4 bg-gray-50 rounded-lg inline-block text-sm text-gray-500">
      Możesz teraz bezpiecznie zamknąć tę kartę przeglądarki.
    </div>
  </div>
);

export default ThankYouStep;

