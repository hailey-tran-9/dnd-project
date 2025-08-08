import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  ref,
  getDatabase,
  query,
  orderByChild,
  equalTo,
  get,
  update,
  increment,
} from "firebase/database";
import { useDispatch } from "react-redux";

import { userActions } from "../store/user-slice.js";

import Button from "../components/Button.jsx";

export default function Settings() {
  const auth = getAuth();
  const db = getDatabase();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalRef = useRef(null);
  const [dacOpen, setDACOpen] = useState(false);

  useEffect(() => {
    if (dacOpen) {
      handleDACToggle();
    }
  }, [location]);

  function handleDACToggle() {
    const nextState = !dacOpen;
    setDACOpen(nextState);
    if (nextState) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        modalRef.current.close();
        dispatch(userActions.signOutUser());
        console.log("user has been signed out FROM THE SETTINGS PAGE");
        navigate("/");
      })
      .catch((error) => {
        console.log("error trying to sign the user out");
      });
  }

  function handleDeleteUser() {
    // TODO: delete all data associated with the user
    const user = auth.currentUser;
    if (user) {
      const userID = user.uid;

      const charactersQuery = query(
        ref(db, "characters/characters"),
        orderByChild("userID"),
        equalTo(userID)
      );
      get(charactersQuery).then((snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          for (const [characterID, characterData] of Object.entries(data)) {
            // console.log(characterID);

            update(ref(db), {
              ["characters/characters/" + characterID]: null,
              "characters/numberOfCharacters": increment(-1),
            }).catch((error) => {
              console.log("error deleting the user's characters from the db");
              console.log(error.message);
              return;
            });
          }
        }
      });

      const gamesQuery = query(
        ref(db, "games/games"),
        orderByChild("userID"),
        equalTo(userID)
      );
      get(gamesQuery).then((snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          for (const [gameID, gameData] of Object.entries(data)) {
            console.log(gameID);

            update(ref(db), {
              ["games/games/" + gameID]: null,
              "games/numberOfGames": increment(-1),
            }).catch((error) => {
              console.log("error deleting the user's games from the db");
              console.log(error.message);
              return;
            });
          }
        }
      });

      const joinedGamesRef = ref(
        db,
        `users/users/${userID}/public/joinedGames`
      );
      get(joinedGamesRef).then((snapshot) => {
        const joinedGamesData = snapshot.val();
        console.log("joined games data");
        console.log(joinedGamesData);

        if (joinedGamesData) {
          Object.values(joinedGamesData).map((gameID) => {
            update(ref(db), {
              [`games/games/${gameID}/playersInGame/${userID}`]: null,
            }).catch((error) => {
              console.log(
                "error deleting a user and removing them from the games they joined"
              );
              console.log(error.message);
            });
          });
        }
      });

      const mapsQuery = query(
        ref(db, "maps/maps"),
        orderByChild("userID"),
        equalTo(userID)
      );
      get(mapsQuery).then((snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
          for (const [mapID, mapData] of Object.entries(data)) {
            // console.log(mapID);

            update(ref(db), {
              ["maps/maps/" + mapID]: null,
              "maps/numberOfMaps": increment(-1),
            }).catch((error) => {
              console.log("error deleting the user's maps from the db");
              console.log(error.message);
              return;
            });
          }
        }
      });

      update(ref(db), {
        ["users/users/" + userID]: null,
        "users/numberOfUsers": increment(-1),
      }).catch((error) => {
        console.log("error deleting the user's info from the db");
        console.log(error.message);
        return;
      });

      // TODO: actually delete the user from firebase auth and sign out, not doing that now for testing purposes
      handleSignOut();
    }
  }

  return (
    <>
      <dialog
        id="deleteAccountConfirmation"
        ref={modalRef}
        className="max-w-full max-h-full w-full h-full bg-black/40"
      >
        <div className="flex w-full h-full justify-center items-center text-center text-pretty">
          <div className="w-[40vw] h-fit bg-white px-5 py-10 rounded-2xl">
            <p className="mb-7">
              Are you sure you want to delete this account?
            </p>
            <div className="flex flex-row w-full justify-around">
              <Button onClick={handleDeleteUser} className="w-[30%]">
                Yes
              </Button>
              <Button onClick={handleDACToggle} className="w-[30%]">
                No
              </Button>
            </div>
          </div>
        </div>
      </dialog>
      <div className="p-32 xl:px-[20vw]">
        <h1 className="mb-10">Settings</h1>
        <div className="w-fit flex flex-col gap-30">
          <Button onClick={handleDACToggle}>Delete Account</Button>
        </div>
      </div>
    </>
  );
}
