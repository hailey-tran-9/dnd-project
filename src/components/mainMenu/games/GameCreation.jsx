import { Form } from "react-router";

import Button from "../../Button";
import Input from "../../Input";

export default function GameCreation({ cancelFn, submitFn }) {
  return (
    <Form onSubmit={submitFn}>
      <div className="flex flex-row justify-between items-center flex-wrap gap-y-3 mb-10">
        <h1>Game Creation</h1>
        <Button type="button" onClick={cancelFn}>
          Cancel
        </Button>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <label
            htmlFor="game-name"
            className="text-black text-[2.5rem] font-[500] mr-10"
          >
            Game name
          </label>
          <Input
            id="game-name"
            name="game-name"
            type="text"
            className="text-[2rem]"
            required
          />
        </div>
        <p>Map Selection is under construction.</p>
        {/* <div className="flex flex-row justify-between">
          <h2>Maps</h2>
          <Button type="button" disabled>
            Select Maps
          </Button>
        </div> */}
      </div>

      <Button type="submit" className="mt-15 float-right">
        Submit
      </Button>
    </Form>
  );
}
