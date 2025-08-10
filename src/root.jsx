import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Provider } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client/index.js";
import { initializeApp } from "firebase/app";

import "./index.css";
import store from "./store/index.js";
import Fallback from "./routes/Fallback.jsx";

const client = new ApolloClient({
  uri: "https://www.dnd5eapi.co/graphql/2014",
  cache: new InMemoryCache(),
});

const firebaseConfig = {
  apiKey: "AIzaSyBPxRT-yYw6KjS1LWeNoUqNi1SjguTKu3A",
  authDomain: "dnd-project-c6151.firebaseapp.com",
  databaseURL: "https://dnd-project-c6151-default-rtdb.firebaseio.com",
  projectId: "dnd-project-c6151",
  storageBucket: "dnd-project-c6151.firebasestorage.app",
  messagingSenderId: "819142704135",
  appId: "1:819142704135:web:b9c21f15f988db5f7abea2",
};
export const firebaseApp = initializeApp(firebaseConfig);

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>dnd</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// TODO: Create a fallback page that doesn't load at the beginning
// export function HydrateFallback() {
//   return <Fallback />;
// }

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </ApolloProvider>
  );
}
