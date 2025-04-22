export default function Features({ selectedCharacter }) {
  return (
    <div className="flex flex-col">
      <h2>Class & Race Features</h2>
      <div className="flex flex-row gap-[40%]">
        <div className="flex flex-col">
          <h3>Languages</h3>
          <ul>
            {selectedCharacter.features.languages &&
              selectedCharacter.features.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h3>Traits</h3>
          <ul>
            {selectedCharacter.features.traits &&
              selectedCharacter.features.traits.map((trait) => (
                <li key={trait}>{trait}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
