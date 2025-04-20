import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import Button from "./Button";

export default function Navbar() {
  // TODO: Implement the logout functionality

  return (
    <div
      className="flex flex-row justify-between px-10 py-5 items-center"
      id={styles.navbar}
    >
      <div className="flex flex-row gap-12 items-center">
        <h1 className="mr-10">dnd</h1>
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
      <Button>Logout</Button>
    </div>
  );
}
