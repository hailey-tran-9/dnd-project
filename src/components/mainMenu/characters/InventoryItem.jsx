import Button from "../../Button";

export default function InventoryItem({ item }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <p>Item name</p>
        <div className="flex flex-row gap-5">
          <p className="mr-10">xQuantity</p>
          <Button>Equip</Button>
          <Button>Remove</Button>
        </div>
      </div>
      <div className="h-[2px] bg-[#4a4a4aad] mt-8" />
    </div>
  );
}
