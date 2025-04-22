import styles from "./Home.module.css";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    return () => {
      document.body.style.backgroundColor = "#f8eedf";
      document.body.style.color = "black";
    };
  }, []);

  return (
    <div
      id={styles.homepage}
      className="flex flex-col grow text-center justify-center gap-3 mx-32"
    >
      <h1>A web application that lets you play dnd together with friends!</h1>
      <p>Hopefully it works lol</p>
    </div>
  );
}

export async function clientLoader() {
  return {
    title: "Home Page",
  };
}
