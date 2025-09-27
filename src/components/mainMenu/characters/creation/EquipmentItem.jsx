import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  GET_EQUIPMENT_INFO,
  GET_EQUIPMENT_CATEGORY_INFO,
} from "../../../../util/graphql";
import { characterCreationActions } from "../../../../store/character-creation-slice";

import RadioGroup from "../../../RadioGroup";

export default function EquipmentItem({ index, optionType }) {
  const dispatch = useDispatch();

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

  // useEffect(() => {
  //   console.log("data update:", data);
  //   if (data) {
  //     if (optionType === "counted_reference" || optionType === "multiple") {
  //       dispatch(characterCreationActions.editInventory(data.equipment));
  //     }

  //     return () => {
  //       if (optionType === "counted_reference" || optionType === "multiple") {
  //         // console.log("unmounting:", data.equipment);
  //         dispatch(
  //           characterCreationActions.removeFromInventory(data.equipment)
  //         );
  //       }
  //     };
  //   }
  // }, [data, dispatch]);

  if (loading) {
    // console.log("Loading...");
  } else if (error) {
    content = <p>Error</p>;
  } else {
    // console.log("data loaded for", index, optionType);
    // console.log("equipment data:", data.equipment);
    if (optionType === "counted_reference") {
      let itemInfo = data.equipment;
      // console.log("item data:", itemInfo);
      if (
        itemInfo["gear_category"] &&
        itemInfo["gear_category"].index === "equipment-packs"
      ) {
        content = (
          <p className="text-[1rem]">
            {`Includes:${itemInfo.contents.map((packItem, index) => {
              if (index < itemInfo.contents.length) {
                return ` ${packItem.item.name} (${packItem.quantity})`;
              } else {
                return `${packItem.item.name} (${packItem.quantity})`;
              }
            })}`}
          </p>
        );
      } else {
        content = (
          <>
            <p className="text-[1rem]">{itemInfo.desc}</p>
          </>
        );
      }
    } else if (optionType === "choice") {
      let equipmentCategory = data.equipmentCategory;
      // console.log("choice data:", equipmentCategory);
      content = (
        <RadioGroup
          nameForInputs={index + "RadioGroup"}
          listOfInputs={equipmentCategory.equipment}
          purpose={equipmentCategory.equipment[0]["equipment_category"].index}
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
