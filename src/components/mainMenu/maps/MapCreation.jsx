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
      <div className="w-full flex flex-col xl:flex-row xl:items-center flex-wrap gap-15 xl:gap-x-[10vw]">
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
            required
          />
        </div>
        <div className="flex flex-row gap-20 xl:gap-x-[10vw]">
          <div className="flex flex-col items-start">
            <label
              htmlFor="map-width"
              className="text-black text-[2.5rem] font-[500] mr-10"
            >
              Width
            </label>
            <p className="mb-5">(Optional Cell Count)</p>
            <Input
              id="map-width"
              name="map-width"
              type="number"
              className="text-[2rem]"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="map-height"
              className="text-black text-[2.5rem] font-[500] mr-10"
            >
              Height
            </label>
            <p className="mb-5">(Optional Cell Count)</p>
            <Input
              id="map-height"
              name="map-height"
              type="number"
              className="text-[2rem]"
            />
          </div>
        </div>
        <div className="w-full">
          <p className="text-[2.5rem] font-semibold text-black">Notes</p>
          <p>(Optional)</p>
          <textarea
            id="map-notes"
            name="map-notes"
            className="bg-white rounded-md text-[1.5rem] w-full h-50 p-1 mt-5"
          />
        </div>

        <Button type="submit" className="self-end xl:ml-auto">
          Submit
        </Button>
      </div>
    </Form>
  );
}
