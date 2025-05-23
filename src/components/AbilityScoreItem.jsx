import AbilityScoreButton from "./AbilityScoreButton.jsx";
import ProficiencyBox from "./ProficiencyBox.jsx";

export default function AbilityScoreItem({
  ability,
  fullName,
  abilityScore,
  modifier,
  proficiencyBonus,
}) {
  return (
    <div className="flex flex-row gap-3 justify-between">
      <div className="flex flex-row gap-2 items-center">
        <ProficiencyBox ability={ability} />
        <p className="text-center">
          <b>{abilityScore}</b> ({modifier}) {fullName}
        </p>
        <p className="text-sm text-center">{`(${ability.toUpperCase()})`}</p>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <AbilityScoreButton
          label="CHECK"
          ability={ability}
          modifier={modifier}
          proficiencyBonus={proficiencyBonus}
        />
        <AbilityScoreButton
          label="SAVE"
          ability={ability}
          modifier={modifier}
          proficiencyBonus={proficiencyBonus}
        />
      </div>
    </div>
  );
}
