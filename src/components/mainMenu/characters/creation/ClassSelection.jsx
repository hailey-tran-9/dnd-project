import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";

import { GET_CLASS } from "../../../../util/graphql";
import { characterCreationActions } from "../../../../store/character-creation-slice";

export default function ClassSelection({
  enteredClass,
}) {
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_CLASS, {
    variables: { index: enteredClass },
  });

  useEffect(() => {
    if (data && data.class) {
      dispatch(
        characterCreationActions.setClassAndLvl({
          class: data.class.index,
          lvl: 1,
          classData: data.class,
        })
      );
    }
  }, [data]);

  let dataToPrint;
  if (loading) {
    dataToPrint = "still loading class data";
  }
  if (error) {
    dataToPrint = "an error occurred when trying to fetch class data";
  }
  if (data) {
    dataToPrint = data.class;
    console.log(dataToPrint);
  }
}
