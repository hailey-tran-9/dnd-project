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
        path: "signin",
        lazy: () => import("./routes/SignIn.jsx").then(convert),
      },
      {
        path: "games",
        children: [
          {
            index: true,
            lazy: () => import("./routes/Games.jsx").then(convert),
          },
          // { path: ":gameID", Component: Game },
          // {
          //   path: "invite/:gameID",
          //   Component: InvitePage,
          //   loader: inviteLoader,
          // },
        ],
      },
      {
        path: "characters",
        lazy: () => import("./routes/Characters.jsx").then(convert),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
