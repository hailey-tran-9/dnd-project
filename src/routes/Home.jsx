import { useEffect } from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAdditionalUserInfo,
} from "firebase/auth";

export default function HomePage() {
  const auth = getAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again.
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user by importing getAdditionalUserInfo
          // and calling it with result:
          // getAdditionalUserInfo(result)
          // You can access the user's profile via:
          // getAdditionalUserInfo(result)?.profile
          // You can check if the user is new or existing:
          // getAdditionalUserInfo(result)?.isNewUser

          console.log("is new user?", getAdditionalUserInfo(result)?.isNewUser);
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
          console.log("error completing the sign in");
          console.log(errorCode, errorMessage);
        });
    }
  }, []);

  return (
    <div className="flex flex-col flex-grow bg-black text-white text-center justify-center gap-3 p-32">
      <p className="text-[3rem] font-[650]">
        A web application that lets you play dnd together with friends!
      </p>
      <p className="text-[1rem] font-[400]">Hopefully it works lol</p>
    </div>
  );
}

export async function clientLoader() {
  return {
    title: "Home Page",
  };
}
