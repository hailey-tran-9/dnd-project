import { capitalize } from "../../../util/util";
import InventoryItem from "./InventoryItem";

export default function Inventory({ characterID, inventory }) {
  return (
    <div className="flex flex-col">
      <h2>Inventory</h2>
      <div className="flex flex-col gap-24">
        {Object.keys(inventory).map((categoryName) => (
          <div
            className="flex flex-col gap-5"
            key={characterID + "-inventory-" + categoryName}
          >
            <h3>{capitalize(categoryName)}</h3>
            {inventory[categoryName].map((item, index) => (
              <InventoryItem
                item={item}
                key={characterID + "-inventory-" + categoryName + "-" + index}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
