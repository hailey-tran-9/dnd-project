import Actionbar from "../components/inGame/Actionbar";
import Sidebar from "../components/inGame/Sidebar";

export default function InGame() {
  

  // TODO: add the modifiers to the check buttons
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Actionbar />
    </div>
  );
}

export async function clientLoader() {
  return {
    title: "In Game",
  };
}
