import { capitalize } from "../../../util/util";

export default function Header({ selectedCharacter }) {
  return (
    <div className="flex flex-row gap-10 items-center">
      <div className="w-30 h-30 bg-white rounded-2xl"></div>
      <div className="flex flex-col">
        <h1>{selectedCharacter.name}</h1>
        <div className="flex flex-row gap-24">
          <h3>{capitalize(selectedCharacter.race)}</h3>
          <h3>{`${capitalize(selectedCharacter.characterClass)} ${
            selectedCharacter.lvl
          }`}</h3>
        </div>
      </div>
    </div>
  );
}
