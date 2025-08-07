import { useState, useRef } from "react";
import { Form } from "react-router";

import Button from "../../Button";
import Input from "../../Input";

export default function MapCreation({ cancelFn, submitFn }) {
  const [selectedImgURL, setSelectedImgURL] = useState(null);
  const [imgSize, setImgSize] = useState([0, 0]);
  const canvasRef = useRef();

  function handleOnChangeImg(event) {
    event.preventDefault();

    if (selectedImgURL !== null) {
      URL.revokeObjectURL(selectedImgURL);
    }

    // const formData = new FormData(event.target);
    // const data = Object.fromEntries(formData);
    const imgFile = event.target.files[0];
    console.log("submitted img");
    // console.log(imgFile);

    const img = new Image();
    const objURL = URL.createObjectURL(imgFile);
    setSelectedImgURL(objURL);
    img.src = objURL;
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      console.log("width: " + width);
      console.log("height: " + height);

      setImgSize([width, height]);
      const canvasCtx = canvasRef.current.getContext("2d");

      canvasCtx.drawImage(img, 0, 0, 700, 500);

      let bw = 50;
      let bh = 50;
      let padding = 0;
      drawGrid(canvasCtx, bw, bh, padding);
    };
  }

  function drawGrid(ctx, bw, bh, padding) {
    for (let x = 0; x <= 700; x += bw) {
      ctx.moveTo(0.5 + x + padding, padding);
      ctx.lineTo(0.5 + x + padding, 500 + padding);
    }
    for (let x = 0; x <= 500; x += bh) {
      ctx.moveTo(padding, 0.5 + x + padding);
      ctx.lineTo(700 + padding, 0.5 + x + padding);
    }
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  return (
    <Form onSubmit={submitFn}>
      <div className="flex flex-row justify-between items-center flex-wrap gap-y-3 mb-10">
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
            onChange={(event) => handleOnChangeImg(event)}
            className="text-[2rem] rounded-4xl file:bg-[#8E1616] file:text-white file:px-5 file:py-1 file:mr-5"
            required
          />
        </div>
        {selectedImgURL && (
          <canvas
            ref={canvasRef}
            id="map-canvas"
            width={700}
            height={500}
            className="w-fit h-fit self-center"
          ></canvas>
        )}
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
