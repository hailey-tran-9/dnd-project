import { Form, redirect } from "react-router";

import Button from "../../Button";
import Input from "../../Input";

export default function GameCreation({ cancelFn }) {

  return (
    <Form method="post">
      <div className="flex flex-row justify-between mb-10">
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
        <div className="flex flex-row justify-between mb-10">
          <h2>Maps</h2>
          <Button type="button">Select Maps</Button>
        </div>
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
