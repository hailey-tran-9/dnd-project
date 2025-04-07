export default function GameInfoBox({ classes, children, ...props }) {
  return <div className={"bg-white rounded-md " + classes} {...props}>{children}</div>;
}
