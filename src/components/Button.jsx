export default function Button({
  caption,
  bgColor = "bg-white",
  hoverColor = "hover:bg-gray-50",
  textColor = "text-black",
  padding = "p-2",
  pl = null,
  pr = null,
  rounded = "rounded-md",
  ...props
}) {
  let classes = bgColor + " " + hoverColor + " " + textColor + " " + padding;
  if (pl) {
    classes += " " + pl;
  }
  if (pr) {
    classes += " " + pr;
  }
  classes += " " + rounded;

  return <button className={classes} {...props}>{caption}</button>;
}
