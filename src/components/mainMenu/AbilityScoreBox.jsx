export default function AbilityScoreBox({ ability, proficient, ...props }) {
  let classNames = "bg-white";
  if (proficient) {
    classNames = "bg-fuchsia-100";
  }
  classNames += " text-center p-5 rounded-full";

  return (
    <div className={classNames} {...props}>
      <p>{ability.toUpperCase()}</p>
      <p>
        <b>8</b>
      </p>
      <p>(+0)</p>
    </div>
  );
}
