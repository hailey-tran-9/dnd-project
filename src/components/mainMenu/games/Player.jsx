export default function Player() {
  return (
    <div className="flex flex-row gap-8 items-center">
      <div className="w-25 h-25 bg-white rounded-md"></div>
      <div className="flex flex-col">
        <p>Player Name</p>
        <p>Class | Lvl</p>
      </div>
    </div>
  );
}
