import { useLoaderData } from "react-router-dom";

function InvitePage() {
  const data = useLoaderData();

  return (
    <>
      <div className="flex flex-col">
        <h1>Invite to {data}</h1>
      </div>
    </>
  );
}

export default InvitePage;

export async function loader({ request, params }) {
  const gameID = params.gameID;

  // TODO: get the game associated with the gameID to check whether not the user already has a character in the game

  return gameID;
}
