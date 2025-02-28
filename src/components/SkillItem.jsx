import SkillButton from "./SkillButton.jsx";
import ProficiencyBox from "./ProficiencyBox.jsx";

export default function SkillItem({ skill, ability, modifier }) {
  return (
    <div className="flex flex-row gap-3 justify-between">
      <div className="flex flex-row gap-2 items-center">
        <ProficiencyBox ability={ability} />
        <p className="text-center">
          {`${skill}: (${modifier})`}
        </p>
      </div>
      <SkillButton skill={skill} modifier={modifier} />
    </div>
  );
}
