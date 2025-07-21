import { useState } from "react";
import { NavLink } from "react-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  query,
  equalTo,
  orderByChild,
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
  const [userActionBarOpen, setUserActionBarOpen] = useState(false);

  function handleUserActionBarToggle() {
    console.log("user circle clicked");
    setUserActionBarOpen((prevState) => !prevState);
  }

  let userButton = (
    <button onClick={handleUserActionBarToggle}>
      <div className="w-15 h-15 rounded-4xl bg-white"></div>
    </button>
  );

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

  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("user has been signed out");
      })
      .catch((error) => {
        console.log("error trying to sign the user out");
      });
  }

  function handleDeleteUser() {
    // TODO: insert a confirmation before deleting the user
    if (auth.currentUser) {
      const charactersQuery = query(
        ref(db, "characters/characters"),
        orderByChild("userID"),
        equalTo(userID)
      );
    }
  }

  let displayButton;
  if (loginStatus) {
    displayButton = (
      <NavLink to="/" onClick={handleLogout}>
        <Button>Sign Out</Button>
      </NavLink>
    );
  } else if (!isSigningIn && !isCreatingAccount) {
    displayButton = (
      <NavLink to="/signin">
        <Button>Sign In</Button>
      </NavLink>
    );
  }

  return (
    <div
      id={styles.navbar}
      className="flex flex-row justify-between px-10 py-5 items-center"
    >
      <div id="userActionsBarDiv" className="absolute inset-0 w-svw h-svh">
        <div className="w-full h-full bg-gray-500 opacity-40"></div>
        <div className="absolute w-[40vw] h-full inset-y-0 right-0 flex flex-col bg-white text-black text-[1.5rem] px-10 py-5 gap-10">
          <div className="flex flex-row justify-between">
            <h3 className="text-[2rem]">Username</h3>
            <Button>x</Button>
          </div>
          <Button>Delete User</Button>
        </div>
      </div>
      <div className="flex flex-row gap-12 items-center">
        <NavLink to="/">
          <h1 className="mr-10">dnd</h1>
        </NavLink>
        <NavLink to="/games">
          <h3>Games</h3>
        </NavLink>
        <NavLink to="/characters">
          <h3>Characters</h3>
        </NavLink>
        <NavLink to="/maps">
          <h3>Maps</h3>
        </NavLink>
      </div>
      {displayButton}
      {userButton}
    </div>
  );
}
