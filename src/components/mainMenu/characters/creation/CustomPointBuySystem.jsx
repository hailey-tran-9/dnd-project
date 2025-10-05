import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { Form } from "react-router";

import { GET_SKILLS } from "../../../../util/graphql.jsx";
import { abilityScoreIndexes } from "../../../contexts/AbilityScoreContext.jsx";
import { skillIndexes } from "../../../contexts/SkillContext.jsx";
import { characterCreationActions } from "../../../../store/character-creation-slice.js";

import PointBuyBox from "./PointBuyBox.jsx";
import LoadingIndicator from "../../../LoadingIndicator.jsx";
import ErrorIndicator from "../../../ErrorIndicator.jsx";
import Button from "../../../Button.jsx";
import Input from "../../../Input.jsx";

export default function CustomPointBuySystem() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_SKILLS);
  const characterCreation = useSelector((state) => state.characterCreation);

  const [addedModifiersOpen, setAddedModifiersOpen] = useState(false);
  const [addModAbility, setAddModAbility] = useState("STR");

  useEffect(() => {
    let skillsContent;
    if (loading) {
      skillsContent = <LoadingIndicator />;
    }
    if (error) {
      skillsContent = <ErrorIndicator />;
    }
    if (data) {
      data.skills.map((skill) => {
        dispatch(
          characterCreationActions.updateSkillName({
            skill: skill.index,
            name: skill.name,
          })
        );
      });
    }
  }, [data]);

  function handleSubmit(event) {
    event.preventDefault();
    let ability = event.target[0].value;
    let modifier = event.target[1].value;
    let reason = event.target[2].value;
    console.log("ability:", ability);
    console.log("modifier:", modifier);
    console.log("reason:", reason);

    setAddedModifiersOpen((currState) => !currState);
  }

  function handleAddModAbilityChange(event) {
    let currAbility = event.target.value;
    if (currAbility !== addModAbility) {
      setAddModAbility(currAbility);
    }
  }

  return (
    <div className="flex flex-col gap-24">
      <div>
        <h2>Point-Buy System</h2>
        <h3>Points left to use: {characterCreation.points}</h3>
        <div className="flex flex-row justify-start xl:justify-center gap-[1vw] mt-3">
          {abilityScoreIndexes.map((ability) => (
            <PointBuyBox key={ability + "PointBuyBox"} ability={ability} />
          ))}
        </div>

        <div className="mt-5">
          <h3>Skills</h3>
          <div
            id="character-skills"
            className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10"
          >
            {skillIndexes.map((skill) => {
              let modifier = characterCreation.skills[skill].modifier;
              return (
                <div key={skill} className="flex flex-row gap-3 items-center">
                  <div
                    className={
                      characterCreation.skills[skill].proficient
                        ? "w-3 h-3 bg-black rounded-2xl"
                        : "w-3 h-3 bg-white rounded-2xl"
                    }
                  />
                  <p>{characterCreation.skills[skill].name}</p>
                  <p>{`(${modifier > 0 ? "+" + modifier : modifier})`}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section id="added-modifiers-section">
        <div className="flex flex-row justify-between items-end">
          <h3>Added Modifiers</h3>
          <Button
            onClick={() => setAddedModifiersOpen((currState) => !currState)}
            padding="p-1"
            className="size-12 duration-1000"
            rounded={
              addedModifiersOpen ? "rounded-t-sm rounded-b-0" : "rounded-sm"
            }
          >
            {addedModifiersOpen ? "-" : "+"}
          </Button>
        </div>
        <Form
          onSubmit={handleSubmit}
          className={`${addedModifiersOpen ? "h-fit" : "h-0"} transition-all transition-discrete duration-300 ease-in-out overflow-hidden bg-black ${addedModifiersOpen ? "p-5" : "px-5 py-0"} rounded-b-sm rounded-tl-sm rounded-tr-0 mb-5`}
        >
          <div className="flex flex-row justify-between flex-wrap gap-5">
            <div className="flex flex-row gap-x-8 gap-y-2 flex-wrap">
              <select
                name={"added-modifier-ability"}
                id={"added-modifier-ability"}
                onChange={handleAddModAbilityChange}
                className="w-50 bg-white rounded-md text-[2rem] pl-3"
                defaultValue={addModAbility}
                required
              >
                {abilityScoreIndexes.map((ability) => (
                  <option
                    key={`added-modifier-${ability}-option`}
                    value={ability.toUpperCase()}
                  >
                    {ability.toUpperCase()}
                  </option>
                ))}
              </select>

              <Input
                id="added-modifier-value"
                name="added-modifier-value"
                type="number"
                className="text-center text-[1.5rem] p-1"
                min="-10"
                max="10"
                required
              />

              <Input
                id="added-modifier-reason"
                name="added-modifier-reason"
                type="text"
                className="w-[25vw] text-[1.5rem] p-1"
                required
              />
            </div>

            <Button type="submit" className="self-end">
              Add
            </Button>
          </div>
        </Form>
        <div className="grid grid-cols-3 xl:grid-cols-4 bg-gray-100 p-5 pb-10 xl:p-8 xl:pb-12 gap-3 rounded-sm">
          <div className="flex flex-col bg-white px-5 pt-3 pb-8 gap-2 rounded-sm">
            <div className="flex flex-row justify-between">
              <p>STR</p>
              <p>5</p>
            </div>
            <div className="flex flex-row flex-wrap gap-3">
              <Button>2</Button>
              <Button>1</Button>
              <Button>2</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
