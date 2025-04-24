import { useQuery } from "@apollo/client";
import { GET_RACE } from "../../../../util/graphql";

import LoadingIndicator from "../../../LoadingIndicator";
import ErrorIndicator from "../../../ErrorIndicator";

import { capitalize } from "../../../../util/util";
import { raceIndexes } from "../../../contexts/RaceContext";

export default function RaceSelection({ enteredRace, handleRaceChange }) {
  let raceContent;

  const { loading, error, data } = useQuery(GET_RACE, {
    variables: { index: enteredRace },
  });

  let dataToPrint;
  if (loading) {
    dataToPrint = "still loading race data";
    raceContent = <LoadingIndicator />;
  }
  if (error) {
    dataToPrint = "an error occurred when trying to fetch race data";
    raceContent = <ErrorIndicator />;
  }
  if (data) {
    dataToPrint = data.race;
    raceContent = (
      <div>
        <label
          htmlFor="character-race"
          className="text-black text-[2.5rem] font-[500] mr-10"
        >
          Race
        </label>
        <select
          name={"character-race"}
          id={"character-race"}
          onChange={handleRaceChange}
          className="bg-white rounded-md text-[2rem] pl-3 pr-15"
          required
        >
          {raceIndexes.map((raceName) => (
            <option key={raceName + "Option"} value={raceName}>
              {capitalize(raceName)}
            </option>
          ))}
        </select>
      </div>
    );
  }
  // console.log(dataToPrint);

  return raceContent;
}
