import { route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  layout("./routes/Root.jsx", [
    index("./routes/Home.jsx"),
    route("games", "./routes/Games.jsx"),
  ]),
];

// export default [
//   // * matches all URLs, the ? makes it optional so it will match / as well
//   route("*?", "catchall.jsx"),
// ];
