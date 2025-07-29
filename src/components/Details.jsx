export default function Details({ summary, description }) {
//   const boldRegExp = new RegExp("<b>.+</b>", "g");
//   const nonBold = description.split(boldRegExp);
//   console.log("nonBold:", nonBold);
//   const bold = description.match(boldRegExp);
//   console.log("bold:", bold);

  return (
    <details className="w-full bg-white rounded-b-md">
      <summary className="bg-[#8E1616] text-white rounded-md px-5 py-3">
        {summary}
      </summary>
      <p className="p-7 text-[1.3rem]">{description}</p>
    </details>
  );
}
