import { useSelector } from "react-redux";
import { useState } from "react";
import { Form } from "react-router";

import FeatureTab from "./FeatureTab";
import Input from "../../../Input";
import Button from "../../../Button";

export default function CustomFeatures() {
  const features = useSelector((state) => state.characterCreation.features);
  const [featureAdderOpen, setFeatureAdderOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section id="character-creation-features">
      <div className="flex flex-row justify-between items-end">
        <p className="mb-0 text-black text-[2.5rem] font-[500]">Features</p>
        <Button
          onClick={() => setFeatureAdderOpen((currState) => !currState)}
          padding="p-1"
          className="size-12 duration-1000"
          rounded={featureAdderOpen ? "rounded-t-sm rounded-b-0" : "rounded-sm"}
        >
          {featureAdderOpen ? "-" : "+"}
        </Button>
      </div>
      <Form
        onSubmit={handleSubmit}
        className={`${featureAdderOpen ? "h-fit" : "h-0"} transition-all transition-discrete duration-300 ease-in-out overflow-hidden bg-black ${featureAdderOpen ? "p-10" : "px-10 py-0"} rounded-b-sm rounded-tl-sm rounded-tr-0 mb-5`}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="character-feature-name"
              className="text-[#eeeeee] text-[1.75rem] font-[500]"
            >
              Feature Name
            </label>
            <Input
              id="character-feature-name"
              name="character-feature-name"
              type="text"
              className="text-[1.5rem] p-1"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="character-feature-desc"
              className="text-[#eeeeee] text-[1.75rem] font-[500] mr-10"
            >
              Feature Description
            </label>
            <textarea
              id="character-feature-desc"
              name="character-feature-desc"
              className="bg-white text-[1.5rem] p-1 rounded-lg"
              required
            />
          </div>
          <Button type="submit" className="self-end">
            Add
          </Button>
        </div>
      </Form>
      <div className="max-h-[25vh] bg-gray-50 flex flex-col gap-1 overflow-y-scroll rounded-md p-1 px-3">
        {features.length !== 0 ? (
          features.map((feature, index) => (
            <FeatureTab featureData={feature} key={"featureTab" + index} />
          ))
        ) : (
          <p>Currently, this character doesn't possess any features.</p>
        )}
      </div>
    </section>
  );
}
