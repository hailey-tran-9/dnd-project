import { useState } from "react";

export default function FeatureTab({ featureData, ...props }) {
  const [showInfo, setShowInfo] = useState(false);

  let tabClassname;
  let infoClassname;
  if (showInfo) {
    tabClassname =
      "w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-t-md";
    infoClassname = "bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md";
  } else {
    tabClassname =
      "w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-md";
    infoClassname = "bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md hidden";
  }

  function handleTabClick() {
    setShowInfo((prevState) => !prevState);
  }

  return (
    <div {...props}>
      <div className={tabClassname} onClick={handleTabClick}>
        <p>{featureData.name}</p>
      </div>
      <div className={infoClassname}>
        {featureData.desc.map((chunk, index) => (
          <div key={"feature" + index}>
            <p>{chunk}</p>
            {index < featureData.desc.length - 1 && <br />}
          </div>
        ))}
      </div>
    </div>
  );
}
