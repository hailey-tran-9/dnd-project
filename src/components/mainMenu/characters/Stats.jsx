export default function Stats({ selectedCharacter }) {
  return (
    <div className="flex flex-col">
      <h2>Stats</h2>
      <div className="flex flex-row gap-5 items-center">
        <h3>Armor Class</h3>
        <p>{selectedCharacter.armorClass}</p>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <h3>Size</h3>
        <p>{selectedCharacter.size}</p>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <h3>Proficiency Bonus</h3>
        <p>{selectedCharacter.proficiencyBonus}</p>
      </div>
    </div>
  );
}
