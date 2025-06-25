export default function Selection({ children, ...props }) {
  return (
    <div
      className="w-[24rem] grow bg-[#8E1616] flex flex-col px-10 py-20 justify-start overflow-clip"
      {...props}
    >
      {children}
    </div>
  );
}
