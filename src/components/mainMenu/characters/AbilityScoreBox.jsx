export default function AbilityScoreBox({
  ability,
  score,
  modifier,
  proficient,
  ...props
}) {
  let classes = [
    "flex flex-col text-[2rem] px-[3vw] py-[3vh] md:px-[2vw] md:py-[2.5vh] rounded-lg text-center justify-center",
  ];
  if (proficient) {
    classes.push("bg-[#FFF8ED]");
  } else {
    classes.push("bg-white");
  }
  return (
    <div className={classes.join(" ")} {...props}>
      <p className="mb-4">{ability.toUpperCase()}</p>
      <p className="font-bold">{score}</p>
      <p>{`(${modifier > 0 ? "+" + modifier : modifier})`}</p>
    </div>
  );
}
