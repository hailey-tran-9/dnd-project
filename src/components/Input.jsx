export default function Input({ name, className, ...props }) {
  let classes = ["bg-white rounded-sm px-3", className].join(" ");
  return <input name={name} className={classes} {...props}></input>;
}
