import InventoryItem from "./InventoryItem";

export default function Inventory({ inventory }) {
  return (
    <div className="flex flex-col">
      <h2>Inventory</h2>
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-5">
          <h3>Weapons</h3>
          <InventoryItem />
          <InventoryItem />
          <InventoryItem />
        </div>
        <div>
          <h3>Equipment</h3>
        </div>
        <div>
          <h3>Tools</h3>
        </div>
      </div>
    </div>
  );
}
