export default function SelectionButton({ name, ...props }) {
  return (
    <button key={name} type="button" className="p-2" {...props}>
      {name}
    </button>
  );
}
