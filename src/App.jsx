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
    lazy: () => import("./pages/Root.jsx").then(convert),
    children: [
      { index: true, lazy: () => import("./pages/Home.jsx").then(convert), },
      {
        path: "games",
        children: [
          { index: true, lazy: () => import("./pages/Games.jsx").then(convert), },
          // { path: ":gameID", Component: Game },
          // {
          //   path: "invite/:gameID",
          //   Component: InvitePage,
          //   loader: inviteLoader,
          // },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
