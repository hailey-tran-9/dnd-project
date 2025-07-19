import { useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update, increment } from "firebase/database";

import { v4 as uuidv4 } from "uuid";

import Button from "../components/Button";
import Info from "../components/Info";
import Selection from "../components/Selection";
import MapCreation from "../components/mainMenu/maps/MapCreation";

// TODO: expand map functionality
// TODO: create page content

export default function Maps() {
  const [isCreatingMap, setIsCreatingMap] = useState(false);
  const [selectedMap, setSelectedMap] = useState();

  const maps = useSelector((state) => state.maps.maps);
  // console.log("maps", maps);
  const db = getDatabase();

  const auth = getAuth();
  const user = auth.currentUser;
  let userID = null;
  if (user) {
    userID = user.uid;
  }

  function handleStartCreatingMap() {
    if (!isCreatingMap) {
      setIsCreatingMap(true);
    }
  }

  function handleStopCreatingMap() {
    setIsCreatingMap(false);
  }

  function handleSelectMap(map) {
    if (isCreatingMap) {
      handleStopCreatingMap();
    }
    if (selectedMap !== map) {
      setSelectedMap(map);
    }
  }

  function handleSelectionClick(event) {
    if (event.target.localName === "button") return;
    if (isCreatingMap) {
      handleStopCreatingMap();
    }
    setSelectedMap(undefined);
  }

  function handleDeleteMap(mapID) {
    setSelectedMap(undefined);
    const userPath = "users/users/" + userID;

    update(ref(db), {
      ["maps/maps/" + mapID]: null,
      "maps/numberOfMaps": increment(-1),
      [userPath + "/maps/mapIDs/" + mapID]: null,
      [userPath + "/maps/numberOfMaps"]: increment(-1),
    })
      .then(() => {
        // console.log("map successfully deleted");
      })
      .catch((error) => {
        console.log("error deleting map");
        console.log(error.message);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const mapData = {
      image: data["map-image"],
      inGames: [],
      mapID: uuidv4(),
      name: data["map-name"],
      size: { width: data["map-width"], height: data["map-height"] },
      userID,
    };
    // console.log(mapData);

    const userPath = "users/users/" + userID;
    update(ref(db), {
      ["maps/maps/" + mapData.mapID]: mapData,
      "maps/numberOfMaps": increment(1),
      [userPath + "/maps/mapIDs/" + mapData.mapID]: mapData.name,
      [userPath + "/maps/numberOfMaps"]: increment(1),
    })
      .then(() => {
        // console.log("map created successfully");
      })
      .catch((error) => {
        console.log("error writing the new map into the db");
        console.log(error.message);
      });

    handleStopCreatingMap();
  }

  let content;

  if (isCreatingMap) {
    content = (
      <MapCreation cancelFn={handleStopCreatingMap} submitFn={handleSubmit} />
    );
  } else if (selectedMap == undefined) {
    content = (
      <div className="h-[75vh] text-center content-center">
        <h2>A map hasn't been selected yet.</h2>
        <p>Select a map or create a new one!</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex flex-col text-center gap-15">
          <div className="flex flex-col text-center gap-5">
            <h1>{selectedMap.name}</h1>
            <div className="h-[40vh] bg-white rounded-xl"></div>
            <div className="flex flex-row justify-between self-end">
              <div>
                <Button className="mr-5">Expand Map</Button>
                <Button onClick={() => handleDeleteMap(selectedMap.mapID)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row text-start gap-20">
            <div className="flex flex-col gap-1">
              <h3>Dimensions</h3>
              <p>
                w x h (in pixels)<br></br>
                {selectedMap.size.width} x {selectedMap.size.height} (map tiles)
              </p>
            </div>
            <div className="flex flex-col grow gap-2">
              <h3>Notes</h3>
              <div className="h-25 bg-white rounded-xl"></div>
            </div>
          </div>
          <div className="flex flex-row gap-20">
            <h3>Appears In</h3>
            <p>Strahd, ...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <section id="user-maps" className="flex flex-row grow">
      <Selection onClick={(event) => handleSelectionClick(event)}>
        <Button onClick={handleStartCreatingMap}>+ Create Map</Button>
        <ul className="flex flex-col mt-10 gap-5">
          {Object.entries(maps).map(([mapID, map]) => (
            <Button
              key={map.name}
              onClick={() => handleSelectMap(map)}
              hasImage={true}
            >
              {map.name}
            </Button>
          ))}
        </ul>
      </Selection>
      <Info>{content}</Info>
    </section>
  );
}

export async function clientLoader() {
  return {
    title: "Maps",
  };
}
