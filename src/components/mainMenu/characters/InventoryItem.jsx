import Button from "../../Button";

export default function InventoryItem({ item, ...props }) {
  return (
    <div className="flex flex-col" {...props}>
      <div className="flex flex-row justify-between">
        <p>{item.name}</p>
        <div className="flex flex-row gap-5">
          <p className="mr-10">x{item.quantity}</p>
          {/* <Button>Equip</Button>
          <Button>Remove</Button> */}
        </div>
      </div>
      <div className="h-[2px] bg-[#4a4a4aad] mt-8" />
    </div>
  );
}
