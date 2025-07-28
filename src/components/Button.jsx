// TODO: replace the white bg placeholder with the actual image if it was provided

export default function Button({
  className,
  bgColor = "bg-[#8E1616]",
  hoverColor = "hover:bg-[#B91C1C]",
  textColor = "text-white",
  padding = "px-6 pt-1 pb-2",
  rounded = "rounded-xl",
  children,
  selected = false,
  selectedColor,
  imgSrc = "",
  ...props
}) {
  let classes = [];

  if (imgSrc !== "") {
    padding = "pb-2";
    classes.push("border border-white/25");
  }

  if (!selected) {
    classes.push(
      ...[
        "h-fit justify-center align-middle overflow-clip hover:overflow-x-auto disabled:bg-[#8d8d8dc0]",
        bgColor,
        hoverColor,
        textColor,
        padding,
        rounded,
        className,
      ]
    );
  } else {
    classes.push(
      ...[
        "h-fit justify-center align-middle overflow-clip hover:overflow-x-auto disabled:bg-[#8d8d8dc0]",
        bgColor,
        "hover:bg-" + selectedColor,
        textColor,
        padding,
        rounded,
        className,
      ]
    );
  }

  if (imgSrc !== "") {
    return (
      <button className={classes.join(" ")} {...props}>
        <div className="h-30 self-center overflow-hidden pointer-events-none">
          <img src={imgSrc} className="w-full object-cover object-center" />
        </div>
        <p className="px-6 py-0 truncate pointer-events-none">{children}</p>
      </button>
    );
  } else {
    return (
      <button className={classes.join(" ")} {...props}>
        {children}
      </button>
    );
  }
}
