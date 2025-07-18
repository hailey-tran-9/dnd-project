import { useEffect } from "react";
import { NavLink } from "react-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useSelector } from "react-redux";

import styles from "./Navbar.module.css";
import Button from "./Button";

export default function Navbar() {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const isSigningIn = useSelector((state) => state.user.isSigningIn);
  const isCreatingAccount = useSelector(
    (state) => state.user.isCreatingAccount
  );

  const auth = getAuth();
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
    </div>
  );
}
