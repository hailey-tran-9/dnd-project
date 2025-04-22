import { route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  layout("./routes/Root.jsx", [
    index("./routes/Home.jsx"),
    route("games", "./routes/Games.jsx"),
    route("characters", "./routes/Characters.jsx"),
  ]),
];
