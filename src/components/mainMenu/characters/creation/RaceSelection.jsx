import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { createPortal } from "react-dom";
import { GET_RACE } from "../../../../util/graphql";
import { useDispatch } from "react-redux";

import LoadingIndicator from "../../../LoadingIndicator";
import ErrorIndicator from "../../../ErrorIndicator";

import { characterCreationActions } from "../../../../store/character-creation-slice";

export default function RaceSelection({
  enteredRace,
}) {
  let raceContent;
  let portalContent;

  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_RACE, {
    variables: { index: enteredRace },
  });

  useEffect(() => {
    if (data && data.race) {
      dispatch(characterCreationActions.setRace({
        race: data.race.index,
        raceData: data.race,
      }))
    }
  }, [data]);

  let dataToPrint;
  if (loading) {
    dataToPrint = "still loading race data";
    portalContent = <LoadingIndicator />;
  }
  if (error) {
    dataToPrint = "an error occurred when trying to fetch race data";
    portalContent = <ErrorIndicator />;
  }
  if (data) {
    dataToPrint = data.race;
    console.log(dataToPrint);
  }

  return;
}
