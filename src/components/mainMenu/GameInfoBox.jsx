export default function GameInfoBox({ classes, children }) {
  return <div className={"bg-white rounded-md " + classes}>{children}</div>;
}
