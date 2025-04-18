import Button from "../components/Button";
import Info from "../components/Info";
import Selection from "../components/Selection";
import Player from "../components/mainMenu/games/Player";
import Session from "../components/mainMenu/games/Session";

const TEST_GAMES = ["Strahd", "Witchlight", "Icewind Dale"];

export default function Games() {
  return (
    <section id="user-games" className="flex flex-row">
      <Selection>
        <Button>+ Create Game</Button>
        <ul className="flex flex-col mt-10">
          {TEST_GAMES.map((gameName) => (
            <Button key={gameName}>{gameName}</Button>
          ))}
        </ul>
      </Selection>

      <Info>
        <div className="flex flex-row justify-between mb-10">
          <h1>Strahd</h1>
          <div>
            <Button className="mr-5">Enter Game</Button>
            <Button>Delete</Button>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-10">
            <h2>Players</h2>
            <ul className="flex flex-col gap-10">
                <Player />
                <Player />
                <Player />
                <Player />
            </ul>
          </div>
          <div className="col-span-2 flex flex-col gap-10">
            <h2>Sessions</h2>
            <ul className="flex flex-col gap-5">
                <Session />
                <Session />
                <Session />
                <Session />
                <Session />
                <Session />
                <Session />
            </ul>
          </div>
        </div>
      </Info>
    </section>
  );
}
