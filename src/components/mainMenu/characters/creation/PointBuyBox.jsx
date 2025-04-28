import { useSelector, useDispatch } from "react-redux";

import { characterCreationActions } from "../../../../store/character-creation-slice";

export default function PointBuyBox({ ability, ...props }) {
  const dispatch = useDispatch();
  const characterCreation = useSelector((state) => state.characterCreation);

  let classNames = "bg-white";
  if (characterCreation.abilityScores[ability].proficient) {
    classNames = "bg-[#FFF8ED]";
  }
  classNames +=
    " text-center px-[3vw] py-[3vh] md:px-[2vw] md:py-[2.5vh] rounded-md";

  let score =
    characterCreation.abilityScores[ability].score -
    characterCreation.abilityScores[ability].bonus;
  let totalScore = characterCreation.abilityScores[ability].score;
  let modifier = characterCreation.abilityScores[ability].modifier;

  let shouldDisableAdd = false;
  if (score >= 15) {
    shouldDisableAdd = true;
  }

  let shouldDisableSubstract = false;
  if (score <= 8) {
    shouldDisableSubstract = true;
  }

  function handleIncrScore() {
    dispatch(characterCreationActions.incrPoint(ability));
  }

  function handleDecrScore() {
    dispatch(characterCreationActions.decrPoint(ability));
  }

  return (
    <div className={classNames} {...props}>
      <p>{ability.toUpperCase()}</p>
      <p>
        <b>{totalScore}</b>
      </p>
      <p>({modifier > 0 ? "+" + modifier : modifier})</p>
      <div className="flex flex-row gap-2 mt-3">
        <button
          type="button"
          className="bg-[#F5F5F5] hover:bg-[#e7e7e7] disabled:bg-[#8d8d8dc0] p-1 px-2 rounded-lg"
          onClick={handleDecrScore}
          disabled={shouldDisableSubstract}
        >
          -
        </button>
        <button
          type="button"
          className="bg-[#F5F5F5] hover:bg-[#e7e7e7] disabled:bg-[#8d8d8dc0] p-1 px-2 rounded-lg"
          onClick={handleIncrScore}
          disabled={shouldDisableAdd}
        >
          +
        </button>
      </div>
    </div>
  );
}
