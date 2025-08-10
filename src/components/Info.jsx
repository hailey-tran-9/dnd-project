import styles from "./Info.module.css";

export default function Info({ gap="gap-12", children }) {
  const classes = [styles.info, gap, "flex flex-col px-[15vw] py-[10vh] overflow-hidden"];
  return <div className={classes.join(" ")}>{children}</div>;
}
