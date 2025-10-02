import { useQuery } from "@apollo/client";
import { useState } from "react";

import { GET_SKILLS } from "../../util/graphql";
import { abilityScoreIndexes } from "../contexts/AbilityScoreContext";

import Button from "../Button";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

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

  return (
    <>
      <aside className="h-screen">
        <div className="h-full flex flex-row">
          <div
            className={`${expanded ? "w-sm" : "w-0"} overflow-hidden transition-all flex flex-col gap-y-10 ${expanded ? "px-8" : "px-0"} py-10 items-center bg-red-800 text-white`}
          >
            <section id="inGameCharHeader" className="text-center">
              <h3>Character Name</h3>
              <div className="flex flex-row flex-wrap gap-3 overflow-hidden">
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
            <section id="skillChecks" className="w-full overflow-hidden">
              <h4>Skill Checks</h4>
              <div className="max-h-[90%] overflow-y-auto mt-2 rounded-lg">
                {skillCheckContent}
              </div>
            </section>
          </div>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="size-12 cursor-pointer bg-red-800 hover:bg-[#B91C1C] mt-10 rounded-r-lg"
          ></button>
        </div>
      </aside>
    </>
  );
}
