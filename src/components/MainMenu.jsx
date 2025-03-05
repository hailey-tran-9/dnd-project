import Selection from "./Selection.jsx";

export default function MainMenu() {
  return (
    <div className="h-dvh flex flex-row p-5 gap-10">
      <Selection />
      <div className="bg-amber-200 grow rounded-md p-10">
        <p>INFO</p>
      </div>
    </div>
  );
}
