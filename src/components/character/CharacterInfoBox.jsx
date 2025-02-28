export default function CharacterInfoBox({ id, title, children }) {
  return (
    <div
      id={id}
      className="charInfoBox flex flex-col bg-blue-50 rounded-md p-3 pb-5"
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
}
