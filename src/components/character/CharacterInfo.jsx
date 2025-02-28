import CharacterStats from "./CharacterStats.jsx";
import CharacterSkills from "./CharacterSkills.jsx";
import CharacterFeatures from "./CharacterFeatures.jsx";
import CharacterInventory from "./CharacterInventory.jsx";

export default function CharacterInfo() {
  return (
    <section
      id="characterInfo"
      className="w-fit h-dvh flex flex-col bg-blue-300 p-5 gap-5 overflow-hidden overflow-y-scroll"
    >
      <header>
        <h1 className="text-center text-wrap">CHARACTER NAME</h1>
        <h2 className="text-center text-wrap">CLASS | LVL</h2>
      </header>
      <CharacterStats />
      <CharacterSkills />
      <CharacterFeatures />
      <CharacterInventory />
    </section>
  );
}
