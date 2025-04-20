export default function Input({ name, className, ...props }) {
  let classes = ["bg-white rounded-sm", className].join(" ");
  return <input name={name} className={classes} {...props}></input>;
}
