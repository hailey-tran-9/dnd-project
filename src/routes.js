import { route, index, layout } from "@react-router/dev/routes";

export default [
  layout("./routes/Root.jsx", [
    index("./routes/Home.jsx"),
    route("account-creation", "./routes/AccountCreation.jsx"),
    route("characters", "./routes/Characters.jsx"),
    route("games", "./routes/Games.jsx"),
    route("games/invite/:gameID", "./routes/Invite.jsx"),
    route("help", "./routes/Help.jsx"),
    route("maps", "./routes/Maps.jsx"),
    route("settings", "./routes/Settings.jsx"),
    route("signin", "./routes/SignIn.jsx"),
    route("users/:userID", "./routes/UserProfile.jsx"),
  ]),
];
