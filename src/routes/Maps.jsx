import { useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update, increment } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

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
  const storage = getStorage();

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
    const userPath = "users/users/" + userID + "/private";

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

    const mapImageRef = storageRef(
      storage,
      "users/" + userID + "/maps/" + mapID
    );
    if (mapImageRef) {
      deleteObject(mapImageRef)
        .then(() => {
          // console.log("map's image was deleted successfully");
        })
        .catch((error) => {
          console.log("error deleting the map's image");
          console.log(error.message);
        });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // console.log("submitted map data");
    // console.log(data);

    const img = new Image();
    const objURL = URL.createObjectURL(data["map-image"]);
    img.src = objURL;
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      console.log("width: " + width);
      console.log("height: " + height);

      const mapData = {
        image: data["map-image"],
        inGames: [],
        mapID: uuidv4(),
        name: data["map-name"],
        size: { width, height },
        // size: { width: data["map-width"], height: data["map-height"] },
        src: "",
        userID,
      };
      console.log(mapData);

      URL.revokeObjectURL(objURL);
    };

    // const userPath = "users/users/" + userID + "/private";
    // update(ref(db), {
    //   ["maps/maps/" + mapData.mapID]: mapData,
    //   "maps/numberOfMaps": increment(1),
    //   [userPath + "/maps/mapIDs/" + mapData.mapID]: mapData.name,
    //   [userPath + "/maps/numberOfMaps"]: increment(1),
    // })
    //   .then(() => {
    //     // console.log("map created successfully");
    //   })
    //   .catch((error) => {
    //     console.log("error writing the new map into the db");
    //     console.log(error.message);
    //   });

    // if (mapData.image) {
    //   // console.log(mapData.image);
    //   const mapImageRef = storageRef(
    //     storage,
    //     "users/" + userID + "/maps/" + mapData.mapID
    //   );
    //   uploadBytes(mapImageRef, mapData.image)
    //     .then((snapshot) => {
    //       // console.log("uploaded map file");
    //       // console.log(snapshot.metadata);
    //       getDownloadURL(mapImageRef).then((url) => {
    //         // console.log("url:", url);
    //         mapData.src = url;
    //         update(ref(db), {
    //           ["maps/maps/" + mapData.mapID]: mapData,
    //         })
    //           .then(() => {
    //             // console.log("map url updated successfully");
    //           })
    //           .catch((error) => {
    //             console.log("error updating the map's src url in the db");
    //             console.log(error.message);
    //           });
    //       });
    //     })
    //     .catch((error) => {
    //       console.log("error uploading map image");
    //       console.log(error.message);
    //     });
    // }

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
            {selectedMap && selectedMap.src && (
              <img
                src={selectedMap.src}
                className="self-center rounded-4xl max-w-full h-[40vh] object-contain"
              />
            )}
            <div className="flex flex-row justify-between self-end">
              <div>
                <Button className="mr-5" disabled>
                  Expand Map
                </Button>
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
          {Object.entries(maps).map(([mapID, map]) => {
            if (map.src) {
              return (
                <Button
                  key={map.name}
                  onClick={() => handleSelectMap(map)}
                  imgSrc={map.src}
                >
                  {map.name}
                </Button>
              );
            } else {
              return (
                <Button key={map.name} onClick={() => handleSelectMap(map)}>
                  {map.name}
                </Button>
              );
            }
          })}
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
