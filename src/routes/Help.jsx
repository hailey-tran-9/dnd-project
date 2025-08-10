import Details from "../components/Details";

export default function Help() {
  return (
    <div className="p-32 xl:px-[20vw]">
      <h1 className="mb-10">Need Help?</h1>
      <div className="flex flex-col gap-30">
        <div>
          <h2 className="mb-5">How Games Work</h2>
          <ol className="flex flex-col gap-5">
            <li>
              <Details
                summary={"Creating a Game"}
                description={`On the Games Page, click the "Create Game +" button in the selection bar on the left-side of the screen. Then enter a name for the game and press submit.`}
              />
            </li>
            <li>
              <Details
                summary={"Viewing Game Details"}
                description={`Any games you've created or joined will appear under the selection bar. Clicking on them will reveal the players in the game and the game's session details. It'll also let game owners edit the game.`}
              />
            </li>
            <li>
              <Details
                summary={"Editing a Game"}
                description={[
                  `In Edit Mode, the user can create `,
                  <b key="editing-a-game-1">up to four</b>,
                  ` game invitation links at a time. Sending these links to another user will invite them to the game. Currently, game invites `,
                  <b key="editing-a-game-2">cannot be revoked</b>,
                  `.\n\nThe user can also delete the game.`,
                ]}
              />
            </li>
          </ol>
        </div>
        <div>
          <h2 className="mb-5">Site Construction</h2>
          <ol className="flex flex-col gap-5">
            <li>
              <Details
                summary={"Gameplay"}
                description={`Most disabled buttons and "under construction" components are being worked into the future gameplay feature! This will let players use their resources to play dnd with others.`}
              />
            </li>
            <li>
              <Details
                summary={"Fallbacks"}
                description={`A few sections take a moment to load in data before the content is displayed. Fallbacks are currently a work in progress.`}
              />
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export async function clientLoader() {
  return {
    title: "Help Page",
  };
}
