import OptionButton from "./OptionButton.jsx";

export default function QuestionCard({ question, selectedOptionId, onSelect }) {
  return (
    <div className="question-card">
      <h2 className="question-card__text">{question.text}</h2>
      <div className="question-card__options">
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            text={option.text}
            selected={selectedOptionId === option.id}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
}
