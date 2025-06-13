export default function RadioGroup({
  nameForInputs,
  listOfInputs,
  purpose,
  optionIndex = 0,
  keyAdder,
  ...props
}) {
  return (
    <fieldset
      className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10"
      {...props}
    >
      {listOfInputs.map((element, index) => {
        let inputName;
        let inputValue;
        let equipmentCategory;

        // console.log("radio group element:", element);

        // console.log(element.item);
        if (element.item) {
          inputName = element.item.name;
          inputValue = element.item.index;
          if (element.item["equipment_category"]) {
            equipmentCategory = element.item["equipment_category"].index;
          }
        } else {
          inputName = element.name;
          inputValue = element.index;
          if (element["equipment_category"]) {
            equipmentCategory = element["equipment_category"].index;
          }
        }

        return (
          <div className="flex flex-row gap-3 flex-wrap" key={keyAdder + index}>
            <input
              type="radio"
              id={inputName + "-" + nameForInputs}
              name={nameForInputs}
              value={[
                purpose,
                "counted_reference",
                optionIndex,
                equipmentCategory,
                inputValue,
                inputName,
              ].join(":")}
              required
            />
            <label htmlFor={inputName + "-" + nameForInputs}>{inputName}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
