import { useQuery } from "@apollo/client";
import {
  GET_EQUIPMENT_INFO,
  GET_EQUIPMENT_CATEGORY_INFO,
} from "../../../../util/graphql";

import RadioGroup from "../../../RadioGroup";

export default function EquipmentItem({ index, optionType }) {
  let loading;
  let error;
  let data;
  if (optionType === "counted_reference" || optionType === "multiple") {
    ({ loading, error, data } = useQuery(GET_EQUIPMENT_INFO, {
      variables: { index: index },
    }));
  } else if (optionType === "choice") {
    ({ loading, error, data } = useQuery(GET_EQUIPMENT_CATEGORY_INFO, {
      variables: { index: index },
    }));
  }

  let content;
  if (loading) {
    // console.log("Loading...");
  } else if (error) {
    content = <p>Error</p>;
  } else {
    if (optionType === "counted_reference") {
      let itemInfo = data.equipment;
      // console.log("item data:", itemInfo);
      content = (
        <>
          <p>{itemInfo.desc}</p>
        </>
      );
    } else if (optionType === "choice") {
      let equipmentCategory = data.equipmentCategory;
      // console.log("choice data:", equipmentCategory);
      content = (
        <RadioGroup
          nameForInputs={index + "RadioGroup"}
          listOfInputs={equipmentCategory.equipment}
          purpose="equipment"
          keyAdder={index + "RadioGroup"}
        />
      );
    } else if (optionType === "multiple") {
      let itemInfo = data.equipment;
      // console.log("item data:", itemInfo);
      // content = (
      //   <>
      //     <p>{itemInfo.desc}</p>
      //   </>
      // );
    }
  }

  return <div>{content}</div>;
}
