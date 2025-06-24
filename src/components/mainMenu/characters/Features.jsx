export default function Features({ selectedCharacter }) {
  const characterID = selectedCharacter.characterID;

  return (
    <div className="flex flex-col">
      <h2>Class & Race Features</h2>
      <div className="flex flex-row gap-[40%]">
        <div className="flex flex-col">
          <h3>Languages</h3>
          <ul>
            {selectedCharacter.languages &&
              selectedCharacter.languages.map((language) => (
                <li key={characterID + "-language-" + language.index}>
                  {language.name}
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h3>Traits</h3>
          <ul>
            {/* TODO: If the user wants to see the description of the feature, have a pop up
            on mouse hover */}
            {selectedCharacter.features &&
              selectedCharacter.features.map((feature) => (
                <li key={characterID + "-feature-" + feature.index}>
                  {feature.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
