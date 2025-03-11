export default function SelectionButton({ name, ...props }) {
  return (
    <button
      key={name}
      type="button"
      className="bg-blue-50 hover:bg-sky-200 rounded-md p-0.5"
      {...props}
    >
      {name}
    </button>
  );
}
