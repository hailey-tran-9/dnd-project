export default function Actionbar() {
  return (
    <aside className="h-fit grow justify-items-center self-end">
      <div className="bg-red-800 text-[1.5rem] text-white px-13 pt-5 pb-15 rounded-t-lg">
        <div className="grid grid-cols-3 gap-32">
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Weapon Attacks</p>
            <div
              id="inGameWeaponAtks"
              className="flex flex-col gap-0.5 text-[1.3rem]"
            >
              <p>Unarmed Strike</p>
              <p>Bow</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-semibold">Cantrips</p>
            <div
              id="inGameCantrips"
              className="flex flex-col gap-0.5 text-[1.3rem]"
            >
              <p>Guidance</p>
              <p>Goodberry</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">Spells</p>
            <div
              id="inGameSpells"
              className="flex flex-col gap-0.5 text-[1.3rem]"
            >
              <p>True Strike</p>
              <p>Thunderclap</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
