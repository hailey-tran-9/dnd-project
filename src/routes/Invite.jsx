import { useParams } from "react-router";
import Button from "../components/Button";

function InvitePage() {
  let params = useParams();

  let inviteTokenValid = true;
  let content;
  if (inviteTokenValid) {
    content = (
      <>
        <div>
          <h1>Invite to [Game Name]</h1>
          <h3>Would you like to join?</h3>
        </div>
        <div className="flex flex-row justify-around">
          <Button className="bg-green-600 hover:bg-green-400">Yes</Button>
          <Button>No</Button>
        </div>
      </>
    );
  } else {
    content = (
      <div>
        <h1>Invite has expired</h1>
        <h3>Ask the game owner for another link</h3>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col grow justify-center items-center text-center">
        <div className="w-[40vw] flex flex-col bg-white rounded-2xl p-15 gap-10">
          {content}
        </div>
      </div>
    </>
  );
}

export default InvitePage;

export async function clientLoader() {
  return {
    title: "Invite Page",
  };
}
