export default function RadioGroup({
  nameForInputs,
  listOfInputs,
  purpose,
  keyAdder,
}) {
  return (
    <fieldset className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10">
      {listOfInputs.map((element, index) => {
        let inputName;
        let inputValue;

        // console.log(element.item);
        if (element.item) {
          inputName = element.item.name;
          inputValue = element.item.index;
        } else {
          inputName = element.name;
          inputValue = element.index;
        }

        return (
          <div className="flex flex-row gap-3 flex-wrap" key={keyAdder + index}>
            <input
              type="radio"
              id={inputName + "-" + nameForInputs}
              name={nameForInputs}
              value={inputValue}
              required
            />
            <label htmlFor={inputName + "-" + nameForInputs}>{inputName}</label>
          </div>
        );
      })}
    </fieldset>
  );
}
