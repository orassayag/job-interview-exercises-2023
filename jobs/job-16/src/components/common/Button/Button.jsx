export default function Button({ title, onClick, disabled }) {
  return (
    <button
      type="button"
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
