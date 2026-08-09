export default function OptionButton({ text, selected, onClick }) {
  return (
    <button type="button" className={`option-btn${selected ? " selected" : ""}`} onClick={onClick}>
      <span>{text}</span>
      <span className="option-btn__dot" aria-hidden="true" />
    </button>
  );
}
