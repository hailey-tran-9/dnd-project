import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";

import { GET_RACE } from "../../../../util/graphql";
import { characterCreationActions } from "../../../../store/character-creation-slice";

export default function RaceSelection({ enteredRace }) {
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_RACE, {
    variables: { index: enteredRace },
  });

  useEffect(() => {
    if (data && data.race) {
      dispatch(
        characterCreationActions.setRace({
          race: data.race.index,
          raceData: data.race,
        })
      );
    }
    console.log(dataToPrint);
  }, [data, enteredRace]);

  let dataToPrint;
  if (loading) {
    dataToPrint = "still loading race data";
  }
  if (error) {
    dataToPrint =
      "an error occurred when trying to fetch race data \nerror message: " +
      error.message;
  }
  if (data) {
    dataToPrint = data.race;
  }
}
