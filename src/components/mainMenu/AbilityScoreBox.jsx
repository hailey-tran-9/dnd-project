export default function AbilityScoreBox({
  ability,
  score,
  modifier,
  proficient,
  ...props
}) {
  let classNames = "bg-white";
  if (proficient) {
    classNames = "bg-fuchsia-100";
  }
  classNames += " text-center p-5 rounded-full";

  return (
    <div className={classNames} {...props}>
      <p>{ability.toUpperCase()}</p>
      <p>
        <b>{score}</b>
      </p>
      <p>({modifier > 0 ? "+" + modifier : modifier})</p>
    </div>
  );
}
