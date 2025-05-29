import { useSelector } from "react-redux";
import FeatureTab from "./FeatureTab";

export default function Features() {
  const features = useSelector((state) => state.characterCreation.features);

  return (
    <div>
      <h2>Features</h2>
      <div className="max-h-[25vh] bg-gray-50 flex flex-col gap-1 overflow-y-scroll rounded-md">
        {features.map((feature, index) => (
          <FeatureTab featureData={feature} key={"featureTab" + index} />
        ))}
      </div>
    </div>
  );
}
