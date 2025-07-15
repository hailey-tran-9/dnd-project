import { useSelector, useDispatch } from "react-redux";
import { Form, NavLink } from "react-router";
import { userActions } from "../store/user-slice";
import {
  getAuth,
  sendSignInLinkToEmail,
} from "firebase/auth";

import Input from "../components/Input";
import Button from "../components/Button";

function basicEmailCheck(email) {
  const emailMatch = email.match(new RegExp("^.+@[a-zA-z]+\.[a-zA-Z]{2,3}$"));
  return emailMatch != null;
}

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

    const actionCodeSettings = {
      url: "http://localhost:5173/",
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        // ...
        console.log("auth email has been sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log("error trying to send an auth email");
        console.log(errorCode, errorMessage);
      });

    dispatch(userActions.signInUser());
  }

  function cancelSignIn() {
    if (isSigningIn) {
      dispatch(userActions.stopSignIn());
    }
  }

  return (
    <div className="flex flex-grow bg-[#f8eedf] text-center justify-center items-center">
      <Form onSubmit={(event) => handleSignIn(event)}>
        <div className="flex flex-col items-start gap-3">
          <h1>Sign In</h1>
          <div>
            <label
              htmlFor="entered-email"
              className="text-black text-[1.6rem] font-semibold mr-10"
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
          <div className="flex flex-row w-full justify-end gap-5 mt-10">
            <NavLink to="/">
              <Button type="button" onClick={cancelSignIn}>
                Cancel
              </Button>
            </NavLink>
            <Button>Enter</Button>
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
