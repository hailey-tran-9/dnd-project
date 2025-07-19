import { Form } from "react-router";

import Button from "../../Button";
import Input from "../../Input";

// TODO: make the image input required later

export default function MapCreation({ cancelFn, submitFn }) {
  return (
    <Form onSubmit={submitFn}>
      <div className="flex flex-row justify-between mb-10">
        <h1>Map Creation</h1>
        <Button type="button" onClick={cancelFn}>
          Cancel
        </Button>
      </div>
      <div className="flex flex-col w-full gap-15">
        <div className="flex flex-col items-start gap-3">
          <label
            htmlFor="map-name"
            className="text-black text-[2.5rem] font-[500] mr-10"
          >
            Map name
          </label>
          <Input
            id="map-name"
            name="map-name"
            type="text"
            className="text-[2rem]"
            required
          />
        </div>
        <div>
          <label
            htmlFor="map-image"
            className="text-black text-[2.5rem] font-[500] mr-10"
          >
            Image
          </label>
          <Input
            id="map-image"
            name="map-image"
            type="file"
            accept="image/png, image/jpeg"
            className="text-[2rem] rounded-4xl file:bg-[#8E1616] file:text-white file:px-5 file:py-1 file:mr-5"
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col items-start gap-3">
            <label
              htmlFor="map-width"
              className="text-black text-[2.5rem] font-[500] mr-10"
            >
              Width (cell count)
            </label>
            <Input
              id="map-width"
              name="map-width"
              type="number"
              className="text-[2rem]"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <label
              htmlFor="map-height"
              className="text-black text-[2.5rem] font-[500] mr-10"
            >
              Height (cell count)
            </label>
            <Input
              id="map-height"
              name="map-height"
              type="number"
              className="text-[2rem]"
              required
            />
          </div>
        </div>
        <div className="mt-10">
          <h2>Notes</h2>
          <textarea
            id="map-notes"
            name="map-notes"
            className="bg-white rounded-md text-[1.5rem] w-full h-50 p-1"
          />
        </div>

        <Button type="submit" className="self-end">
          Submit
        </Button>
      </div>
    </Form>
  );
}
