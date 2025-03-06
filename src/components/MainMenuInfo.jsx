export default function MainMenuInfo({ selectedTab }) {
  let infoContent;
  if (selectedTab === "Games") {
    infoContent = (<>
        <h1>Game Title</h1>
        <p>Col with list of players in the game</p>
        <p>Col with tab list of sessions played</p>
        
    </>);
  } else if (selectedTab === "Characters") {
    infoContent = (<>
        <h1>Character Name</h1>
        <h2>Class | Lvl</h2>
        <h3>List of games this char is in or not currently active</h3>
        <p>Row of ability scores</p>
        <p>Col for class/race features, col for inventory, col for notes</p>
    </>);
  } else if (selectedTab === "Maps") {
    infoContent = (<>
        <h1>Map Name</h1>
        <h2>Game the map is in</h2>
        <p>Preview of the map</p>
    </>);
  }

  return (
    <div className="flex flex-col bg-amber-200 grow rounded-md p-10">
      {infoContent}
    </div>
  );
}
