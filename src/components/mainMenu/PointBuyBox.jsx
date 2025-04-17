import { calculateAbilityModifier } from "../../util/util.js";

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
    classNames = "bg-fuchsia-100";
  }
  classNames += " text-center p-5 rounded-full";

  let modifier = calculateAbilityModifier(score);

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
          className="bg-gray-400 active:bg-gray-600 p-1 px-2 rounded-lg"
          onClick={decScore}
        >
          -
        </button>
        <button
          type="button"
          className="bg-gray-400 active:bg-gray-600 p-1 px-2 rounded-lg"
          onClick={incScore}
        >
          +
        </button>
      </div>
    </div>
  );
}
