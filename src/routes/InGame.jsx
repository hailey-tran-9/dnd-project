import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_SKILLS } from "../util/graphql";
import { abilityScoreIndexes } from "../components/contexts/AbilityScoreContext";

import Button from "../components/Button";

export default function InGame() {
  const { loading, error, data } = useQuery(GET_SKILLS);

  let skillCheckContent;
  if (!loading && !error && data) {
    skillCheckContent = data.skills.map((skill) => (
      <Button
        key={`inGame-${skill["index"]}-check`}
        className="w-full text-start text-[1.2rem]"
        rounded=""
      >
        {`${skill["name"]} (__)`}
      </Button>
    ));
  }

  // TODO: add the modifiers to the check buttons
  return (
    <div className="flex flex-row grow">
      <div className="w-sm flex flex-col gap-y-10 px-8 py-10 items-center bg-red-800 text-white">
        <section id="inGameCharHeader" className="text-center">
          <h3>Character Name</h3>
          <div className="flex flex-row flex-wrap gap-3">
            <p>Race</p>
            <p>|</p>
            <p>Class</p>
            <p>|</p>
            <p>Lvl</p>
          </div>
        </section>
        <section id="abilityChecks" className="w-full">
          <h4>Ability Checks</h4>
          <div className="flex flex-col gap-0.5 mt-2 rounded-lg overflow-clip">
            {abilityScoreIndexes.map((ability) => (
              <Button
                key={`inGame-${ability}-check`}
                className="text-start text-[1.2rem]"
                rounded=""
              >
                {`${ability.toUpperCase()} (__)`}
              </Button>
            ))}
          </div>
        </section>
        <section id="skillChecks" className="w-full">
          <h4>Skill Checks</h4>
          <div className="h-[40%] overflow-y-auto mt-2 rounded-lg">
            {skillCheckContent}
          </div>
        </section>
      </div>
      <div></div>
    </div>
  );
}

export async function clientLoader() {
  return {
    title: "In Game",
  };
}
