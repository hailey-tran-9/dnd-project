import styles from "./Info.module.css";

export default function Info({ children }) {
  const classes = [styles.info, "flex flex-col px-24 py-20"];
  return <div className={classes.join(" ")}>{children}</div>;
}
