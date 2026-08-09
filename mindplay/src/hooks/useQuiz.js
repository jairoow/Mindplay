import { useMemo, useState } from "react";
import { calculateResult } from "../engines/scoring.js";

/**
 * Gestiona el estado de un test: pregunta actual, respuestas seleccionadas
 * y el cálculo del resultado final. No sabe nada de UI ni de rutas.
 */
export function useQuiz(test) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState({});

  const totalQuestions = test.questions.length;
  const currentQuestion = test.questions[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const progress = ((currentIndex + (selections[currentQuestion?.id] ? 1 : 0)) / totalQuestions) * 100;

  const result = useMemo(() => {
    if (Object.keys(selections).length < totalQuestions) return null;
    return calculateResult(test, selections);
  }, [selections, test, totalQuestions]);

  function selectOption(optionId) {
    setSelections((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
    if (!isLastQuestion) {
      setTimeout(() => setCurrentIndex((i) => i + 1), 180);
    }
  }

  function goBack() {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    isLastQuestion,
    progress,
    selections,
    selectOption,
    goBack,
    result,
  };
}
