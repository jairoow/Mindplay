import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../hooks/useQuiz.js";
import { encodeStatValues } from "../../engines/scoring.js";
import QuestionCard from "./QuestionCard.jsx";
import ProgressBar from "../ui/ProgressBar.jsx";

/**
 * Motor genérico de tests: recibe cualquier objeto `test` (ver data/tests)
 * y gestiona toda la experiencia de preguntas -> resultado, sin conocer
 * el contenido concreto. Al terminar, navega a la URL compartible del
 * resultado, codificando las estadísticas reales calculadas (si las hay)
 * para que la página de resultado no dependa del estado del navegador.
 */
export default function QuizEngine({ test }) {
  const navigate = useNavigate();
  const { currentQuestion, currentIndex, totalQuestions, progress, selections, selectOption, goBack, result } =
    useQuiz(test);

  useEffect(() => {
    if (result) {
      const encoded = encodeStatValues(result.statValues);
      const query = encoded ? `?s=${encoded}` : "";
      navigate(`/resultado/${test.slug}/${result.resultKey}${query}`, { replace: true });
    }
  }, [result, navigate, test.slug]);

  if (!currentQuestion) return null;

  return (
    <div className="quiz">
      <div className="quiz__head">
        {currentIndex > 0 && (
          <button className="quiz__back" onClick={goBack} aria-label="Pregunta anterior">
            ←
          </button>
        )}
        <div className="quiz__progress-wrap">
          <div className="quiz__step">
            Pregunta {currentIndex + 1} de {totalQuestions}
          </div>
          <ProgressBar value={currentIndex + (selections[currentQuestion.id] ? 1 : 0)} max={totalQuestions} />
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedOptionId={selections[currentQuestion.id]}
        onSelect={selectOption}
      />
    </div>
  );
}
