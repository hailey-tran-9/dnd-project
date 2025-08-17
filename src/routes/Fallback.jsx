import homeStyles from "./Home.module.css";
import navbarStyles from "../components/Navbar.module.css";

export default function Fallback() {
  let classes = [
    homeStyles.homepage,
    "flex flex-col grow text-center justify-center gap-3 px-32 bg-black",
  ];

  return (
    <>
      <div
        id={navbarStyles.navbar}
        className="animate-pulse flex flex-row justify-between px-10 py-5 2xl:px-15 sm:py-2 md:py-3 items-center flex-wrap border-b border-b-white/20"
      >
        <h1 className="mr-10">dnd</h1>
        <div className="size-15 object-cover object-center rounded-full bg-gray-200" />
      </div>
      <div className={classes.join(" ")} />
    </>
  );
}
