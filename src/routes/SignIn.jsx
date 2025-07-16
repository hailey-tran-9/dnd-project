import { useSelector, useDispatch } from "react-redux";
import { Form, NavLink, redirect } from "react-router";
import { userActions } from "../store/user-slice";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { basicEmailCheck, validPassword } from "../util/util";

import Input from "../components/Input";
import Button from "../components/Button";

export default function SignInPage() {
  const dispatch = useDispatch();
  const isSigningIn = useSelector((state) => state.user.isSigningIn);
  const auth = getAuth();

  function handleSignIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("submitted data:", data);

    const email = data["entered-email"];
    if (!basicEmailCheck(email)) {
      console.log("make sure you've entered a valid email");
      return;
    }

    const password = data["entered-password"];
    if (!validPassword(password)) {
      console.log("not a valid password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (!user.emailVerified) {
          console.log("user email hasn't been verified");
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              console.log("successfully signed out");
            })
            .catch((error) => {
              // An error happened.
              const errorCode = error.code;
              const errorMessage = error.message;
              // ...
              console.log("error signing out");
              console.log(errorCode, errorMessage);
            });
        } else {
          console.log("user successfully signed in");
          dispatch(userActions.signInUser());
          return redirect("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log("error trying to sign in");
        console.log(errorCode, errorMessage);
      });
  }

  function cancelSignIn() {
    if (isSigningIn) {
      dispatch(userActions.stopSignIn());
    }
  }

  function handleCreateAccount() {
    dispatch(userActions.stopSignIn());
    dispatch(userActions.startCreatingAccount());
  }

  return (
    <div className="flex flex-grow bg-[#f8eedf] text-center justify-center items-center">
      <Form onSubmit={(event) => handleSignIn(event)}>
        <div className="flex flex-col items-start gap-5">
          <h1>Sign In</h1>
          <div className="flex flex-col text-start gap-1">
            <label
              htmlFor="entered-email"
              className="text-black text-[1.6rem] font-semibold"
            >
              Email
            </label>
            <Input
              id="entered-email"
              name="entered-email"
              type="text"
              className="w-100 text-md"
              required
            />
          </div>
          <div className="flex flex-col text-start gap-1">
            <label
              htmlFor="entered-password"
              className="text-black text-[1.6rem] font-semibold"
            >
              Password
            </label>
            <Input
              id="entered-password"
              name="entered-password"
              type="text"
              className="w-100 text-md"
              required
            />
          </div>
          <div className="flex flex-row w-full justify-between gap-20 mt-10">
            <NavLink to="/account-creation">
              <Button type="button" onClick={handleCreateAccount}>
                Create account
              </Button>
            </NavLink>
            <div className="flex gap-5">
              <NavLink to="/">
                <Button type="button" onClick={cancelSignIn}>
                  Cancel
                </Button>
              </NavLink>
              <NavLink to="/">
                <Button>Enter</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export async function clientLoader() {
  return {
    title: "Sign In Page",
  };
}
