import { useSelector, useDispatch } from "react-redux";
import { Form, NavLink, redirect } from "react-router";
import { userActions } from "../store/user-slice";
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { basicEmailCheck, validPassword } from "../util/util";

import Input from "../components/Input";
import Button from "../components/Button";

export default function AccountCreation() {
  const dispatch = useDispatch();
  const isCreatingAccount = useSelector(
    (state) => state.user.isCreatingAccount
  );
  const auth = getAuth();

  function handleCreateAccount(event) {
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
    } else if (password !== data["confirm-password"]) {
      console.log(
        "passwords do not match. make sure the entered password matches the confirmation."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("user account has been created");

        sendEmailVerification(user)
          .then(() => {
            // Email verification sent!
            console.log("email verification sent");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
            console.log("error sending verification email");
            console.log(errorCode, errorMessage);
          });

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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log("error creating account");
        console.log(errorCode, errorMessage);
      });

    dispatch(userActions.stopCreatingAccount());
    return redirect("/signin");
  }

  function cancelCreatingAccount() {
    if (isCreatingAccount) {
      dispatch(userActions.stopCreatingAccount());
      dispatch(userActions.startSignIn());
    }
  }

  return (
    <div className="flex flex-grow bg-[#f8eedf] text-center justify-center items-center">
      <Form onSubmit={(event) => handleCreateAccount(event)}>
        <div className="flex flex-col items-start gap-5">
          <h1>Create Account</h1>
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
          <div className="flex flex-col text-start gap-1">
            <label
              htmlFor="confirm-password"
              className="text-black text-[1.6rem] font-semibold"
            >
              Confirm Password
            </label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="text"
              className="w-100 text-md"
              required
            />
          </div>
          <div className="flex flex-row self-end gap-5 mt-10">
            <NavLink to="/signin">
              <Button type="button" onClick={cancelCreatingAccount}>
                Cancel
              </Button>
            </NavLink>
            <Button>Create</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
