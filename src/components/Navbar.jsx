import { NavLink } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import { useSelector } from "react-redux";

import styles from "./Navbar.module.css";
import Button from "./Button";

export default function Navbar() {
  const dispatch = useDispatch();
  const isSigningIn = useSelector((state) => state.user.isSigningIn);
  const isCreatingAccount = useSelector((state) => state.user.isCreatingAccount);

  // TODO: Implement the logout functionality
  let isSignedIn;

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isSignedIn = true;
    } else {
      isSignedIn = false;
    }
  });

  function handleSignIn() {
    dispatch(userActions.startSignIn());
  }

  let displayButton;
  if (isSignedIn) {
    displayButton = <Button>Logout</Button>;
  } else if (!isSigningIn && !isCreatingAccount) {
    displayButton = <Button onClick={handleSignIn}>Sign In</Button>;
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
