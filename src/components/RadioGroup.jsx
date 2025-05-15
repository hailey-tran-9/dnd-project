export default function RadioGroup({
  nameForInputs,
  listOfInputs,
  purpose,
  keyAdder,
}) {
  return (
    <fieldset className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10">
      {listOfInputs.map((element, index) => {
        let inputName = element.name;
        let inputValue = element.index;
        // console.log(element.item);

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
