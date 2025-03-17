export default function CreateButton({ onButtonClick, identifier, text }) {
  const key = identifier;
  return (
    <button
      id="button-new-hero"
      className="btn"
      onClick={() => onButtonClick(key)}
    >
      {text}
    </button>
  );
}
