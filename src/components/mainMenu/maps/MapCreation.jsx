import { useState, useRef } from "react";
import { Form } from "react-router";

import Button from "../../Button";
import Input from "../../Input";

// TODO: save the map image with the grid

export default function MapCreation({ cancelFn, submitFn }) {
  const canvasRef = useRef();
  const [selectedImgURL, setSelectedImgURL] = useState(null);
  const [cellSize, setCellSize] = useState(50);
  const [img, setImg] = useState(null);

  function handleOnChangeImg(event) {
    event.preventDefault();

    if (selectedImgURL !== null) {
      URL.revokeObjectURL(selectedImgURL);
    }

    const imgFile = event.target.files[0];
    // console.log("submitted img");
    // console.log(imgFile);

    const newImg = new Image();
    const objURL = URL.createObjectURL(imgFile);
    setSelectedImgURL(objURL);
    newImg.src = objURL;
    newImg.onload = () => {
      setImg(newImg);

      // Draw the img on the canvas
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(newImg, 0, 0, 700, 500);
      ctx.save();
      drawGrid(newImg, cellSize);
    };
  }

  function drawGrid(img, cellNum) {
    const ctx = canvasRef.current.getContext("2d");
    // console.log("new cell size: " + cellNum);

    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    const wRatio = canvasRef.current.width / img.width;
    const hRatio = canvasRef.current.height / img.height;
    const ratio = Math.min(wRatio, hRatio);
    const centerShiftX = (canvasRef.current.width - img.width * ratio) / 2;
    const centerShiftY = (canvasRef.current.height - img.height * ratio) / 2;

    // Clear the previous grid
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "rgb(0 0 0 / 75%)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShiftX,
      centerShiftY,
      img.width * ratio,
      img.height * ratio
    );
    ctx.restore();

    // Draw the grid lines
    ctx.beginPath();
    for (let x = 0; x <= canvasWidth; x += cellNum) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
    }
    for (let x = 0; x <= canvasHeight; x += cellNum) {
      ctx.moveTo(0, x);
      ctx.lineTo(canvasWidth, x);
    }
    ctx.strokeStyle = "rgb(255 255 255 / 30%)";
    ctx.stroke();
    ctx.closePath();
  }

  function handleOnChangeCellSize(event) {
    // console.log(event.target.value);
    const cellNum = Number(event.target.value);
    setCellSize(cellNum);
    drawGrid(img, cellNum);
  }

  return (
    <Form onSubmit={submitFn}>
      <div className="flex flex-row justify-between items-center flex-wrap gap-y-3 mb-10">
        <h1>Map Creation</h1>
        <Button type="button" onClick={cancelFn}>
          Cancel
        </Button>
      </div>
      <div className="w-full flex flex-col xl:flex-row xl:justify-around xl:items-center flex-wrap gap-15 xl:gap-x-[10vw]">
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
          <div className="max-w-full flex flex-col items-center gap-y-3 pb-3 overflow-x-auto">
            <canvas
              ref={canvasRef}
              id="map-canvas"
              width={1000}
              height={1000}
              className="w-fit h-fit mx-auto"
            ></canvas>
            <div>
              <input
                type="range"
                id="map-cell-size"
                name="map-cell-size"
                min="25"
                max="100"
                defaultValue="50"
                onChange={(event) => handleOnChangeCellSize(event)}
              />
              <label
                htmlFor="map-cell-size"
                className="ml-5"
              >{`Cell size (${cellSize})`}</label>
            </div>
          </div>
        )}
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
