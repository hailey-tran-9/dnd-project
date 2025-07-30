import { createBrowserRouter, RouterProvider } from "react-router";

function convert(page) {
  let { clientLoader, clientAction, default: Component, ...rest } = page;
  return {
    ...rest,
    loader: clientLoader,
    action: clientAction,
    Component,
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./routes/Root.jsx").then(convert),
    children: [
      { index: true, lazy: () => import("./routes/Home.jsx").then(convert) },
      {
        path: "account-creation",
        lazy: () => import("./routes/AccountCreation.jsx").then(convert),
      },
      {
        path: "characters",
        lazy: () => import("./routes/Characters.jsx").then(convert),
      },
      {
        path: "games",
        children: [
          {
            index: true,
            lazy: () => import("./routes/Games.jsx").then(convert),
          },
          // { path: ":gameID", Component: Game },
          {
            path: "invite/:gameID",
            lazy: () => import("./routes/Invite.jsx").then(convert),
          },
        ],
      },
      {
        path: "help",
        lazy: () => import("./routes/Help.jsx").then(convert),
      },
      {
        path: "maps",
        lazy: () => import("./routes/Maps.jsx").then(convert),
      },
      {
        path: "settings",
        lazy: () => import("./routes/Settings.jsx").then(convert),
      },
      {
        path: "signin",
        lazy: () => import("./routes/SignIn.jsx").then(convert),
      },
      {
        path: "user",
        children: [
          {
            index: ":userID",
            lazy: () => import("./routes/UserProfile.jsx").then(convert),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
