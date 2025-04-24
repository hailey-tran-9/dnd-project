import { calculateAbilityModifier } from "../../../../util/util.js";

export default function PointBuyBox({
  ability,
  score,
  proficient,
  incScore,
  decScore,
  ...props
}) {
  let classNames = "bg-white";
  if (proficient) {
    classNames = "bg-[#FFF8ED]";
  }
  classNames += " text-center px-[3vw] py-[3vh] md:px-[2vw] md:py-[2.5vh] rounded-md";

  let modifier = calculateAbilityModifier(score);

  let shouldDisableAdd = false;
  if (score >= 15) {
    shouldDisableAdd = true;
  }

  let shouldDisableSubstract = false;
  if (score <= 8) {
    shouldDisableSubstract = true;
  }

  return (
    <div className={classNames} {...props}>
      <p>{ability.toUpperCase()}</p>
      <p>
        <b>{score}</b>
      </p>
      <p>({modifier > 0 ? "+" + modifier : modifier})</p>
      <div className="flex flex-row gap-2 mt-3">
        <button
          type="button"
          className="bg-[#F5F5F5] hover:bg-[#e7e7e7] disabled:bg-[#8d8d8dc0] p-1 px-2 rounded-lg"
          onClick={decScore}
          disabled={shouldDisableSubstract}
        >
          -
        </button>
        <button
          type="button"
          className="bg-[#F5F5F5] hover:bg-[#e7e7e7] disabled:bg-[#8d8d8dc0] p-1 px-2 rounded-lg"
          onClick={incScore}
          disabled={shouldDisableAdd}
        >
          +
        </button>
      </div>
    </div>
  );
}
