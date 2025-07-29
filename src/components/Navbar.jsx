import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  getDatabase,
  ref,
  query,
  equalTo,
  orderByChild,
  get,
  increment,
  update,
} from "firebase/database";

import { userActions } from "../store/user-slice";
import { useSelector } from "react-redux";

import styles from "./Navbar.module.css";
import Button from "./Button";

export default function Navbar() {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();

  const loginStatus = useSelector((state) => state.user.loginStatus);
  const isSigningIn = useSelector((state) => state.user.isSigningIn);
  const isCreatingAccount = useSelector(
    (state) => state.user.isCreatingAccount
  );

  const modalRef = useRef(null);
  const [userActionBarOpen, setUserActionBarOpen] = useState(false);
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    // Delay just to prevent the sign in/user button from blinking
    const timeout = setTimeout(() => setDelayed(false), 300);
    return () => clearTimeout(timeout);
  }, []);

  function handleUserActionBarToggle() {
    const nextState = !userActionBarOpen;
    setUserActionBarOpen(nextState);
    if (nextState) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!loginStatus) {
        // console.log("user is signed in");
        dispatch(userActions.signInUser());
      }
    } else {
      if (loginStatus) {
        // console.log("user is NOT signed in");
        dispatch(userActions.signOutUser());
      }
    }
  });

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        modalRef.current.close();
        console.log("user has been signed out");
      })
      .catch((error) => {
        console.log("error trying to sign the user out");
      });
  }

  function handleDeleteUser() {
    // TODO: insert a confirmation before deleting the user
    const user = auth.currentUser;
    if (user) {
      const userID = user.uid;
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
            }).catch((erorr) => {
              console.log("error deleting the user's games from the db");
              console.log(erorr.message);
              return;
            });
          }
        }
      });

      update(ref(db), {
        ["users/users/" + userID]: null,
        "users/numberOfUsers": increment(-1),
      }).catch((erorr) => {
        console.log("error deleting the user's info from the db");
        console.log(erorr.message);
        return;
      });

      // TODO: actually delete the user from firebase auth and sign out, not doing that now for testing purposes
      handleLogout();
    }
  }

  let userButton = (
    <button onClick={handleUserActionBarToggle} className="cursor-pointer">
      <div className="w-15 h-15 rounded-4xl bg-white"></div>
    </button>
  );

  let signInBtn = (
    <NavLink to="/signin">
      <Button>Sign In</Button>
    </NavLink>
  );

  return (
    <>
      <dialog
        id="userActionsBarDiv"
        ref={modalRef}
        className="max-w-full max-h-full w-full h-full bg-black/40"
      >
        <div className="fixed w-[60vw] lg:w-[30vw] xxl:w-[40vw] h-full inset-y-0 right-0 flex flex-col bg-white text-black text-[1.5rem] px-10 py-7">
          <div className="flex flex-row flex-wrap justify-between text-center mb-7">
            <h3 className="text-[2rem]">Username</h3>
            <Button
              onClick={handleUserActionBarToggle}
              bgColor="bg-none"
              hoverColor="hover:bg-none"
              textColor="text-gray-300 hover:text-gray-700"
              padding="p-0"
              className="text-4xl"
            >
              x
            </Button>
          </div>

          <NavLink to="/help" onClick={handleUserActionBarToggle}>
            <button className="w-full text-start hover:bg-neutral-50 px-5 py-1 rounded-md">
              Help
            </button>
          </NavLink>
          <button className="text-start hover:bg-neutral-50 px-5 py-1 rounded-md">
            Profile
          </button>
          <button className="text-start hover:bg-neutral-50 px-5 py-1 rounded-md">
            Settings
          </button>
          <hr className="border-neutral-300 mb-7 mt-auto"></hr>
          <NavLink to="/" onClick={handleSignOut}>
            <Button className="w-full">Sign Out</Button>
          </NavLink>

          {/* <NavLink to="/" onClick={handleLogout}>
            <Button>Sign Out</Button>
          </NavLink>
          <NavLink to="/" onClick={handleDeleteUser}>
            <Button>Delete User</Button>
          </NavLink> */}
        </div>
      </dialog>
      <div
        id={styles.navbar}
        className="flex flex-row justify-between px-10 py-5 md:px-7 sm:py-2 md:py-3 items-center flex-wrap border-b border-b-white/20"
      >
        <div className="flex flex-row gap-7 xl:gap-12 items-center">
          <NavLink to="/">
            <h1 className="mr-10">dnd</h1>
          </NavLink>
          <NavLink to="/characters" className="hover:text-neutral-200">
            <h3>Characters</h3>
          </NavLink>
          <NavLink to="/games" className="hover:text-neutral-200">
            <h3>Games</h3>
          </NavLink>
          <NavLink to="/maps" className="hover:text-neutral-200">
            <h3>Maps</h3>
          </NavLink>
        </div>
        {!delayed && (loginStatus ? userButton : signInBtn)}
      </div>
    </>
  );
}
