export default function Button({
  className,
  bgColor = "bg-[#8E1616]",
  hoverColor = "hover:bg-[#B91C1C]",
  textColor = "text-white",
  padding = "px-6 pt-1 pb-2",
  rounded = "rounded-xl",
  children,
  ...props
}) {
  let classes = [
    "h-fit justify-center align-middle",
    bgColor,
    hoverColor,
    textColor,
    padding,
    rounded,
    className,
  ];

  return (
    <button className={classes.join(" ")} {...props}>
      {children}
    </button>
  );
}
