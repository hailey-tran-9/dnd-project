import styles from "./Home.module.css";
import { useEffect } from "react";

export default function Fallback() {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    return () => {
      document.body.style.backgroundColor = "#f8eedf";
      document.body.style.color = "black";
    };
  }, []);

  let classes = [
    styles.homepage,
    "flex flex-col grow text-center justify-center gap-3 mx-32",
  ];

  return (
    <div className={classes.join(" ")}>
      <h1>A web application that lets you play dnd together with friends!</h1>
      <p>Hopefully it works lol</p>
    </div>
  );
}
