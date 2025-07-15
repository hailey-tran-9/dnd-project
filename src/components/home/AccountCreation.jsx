import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-router";
import { userActions } from "../../store/user-slice";
import {
  getAuth,
  sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import Input from "../Input";
import Button from "../Button";

function basicEmailCheck(email) {
  const emailMatch = email.match(new RegExp("^w+@[a-zA-z]+.[a-zA-Z]{2,3}$"));
  return emailMatch != null;
}

function validPassword(password) {
  // Check the len is between 7-12 characters
  if (!(7 <= password.length <= 12)) {
    return false;
  }

  // Check that there's at least one lowercase letter, uppercase letter, number, and non-alphanumeric character
  const alphabet = password.match(new RegExp("[a-z]", "g"));
  const upperAlphabet = password.match(new RegExp("[A-Z]", "g"));
  const numbers = password.match(new RegExp("\\d", "g"));
  const nonAlphaNum = password.match(new RegExp("[\\W_]", "g"));

  // console.log(alphabet);
  // console.log(upperAlphabet);
  // console.log(numbers);
  // console.log(nonAlphaNum);

  if (
    alphabet == null ||
    upperAlphabet == null ||
    numbers == null ||
    nonAlphaNum == null
  ) {
    return false;
  }

  return true;
}

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

    const enteredPassword = data["entered-password"];

    if (!validPassword(enteredPassword)) {
      console.log("not a valid password");
      return;
    } else if (enteredPassword !== data["confirm-password"]) {
      console.log(
        "passwords do not match. make sure the entered password matches the confirmation."
      );
      return;
    }

    const actionCodeSettings = {
      url: "http://localhost:5173/",
      handleCodeInApp: true,
      linkDomain: "dnd-project-c6151.firebaseapp.com",
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

    dispatch(userActions.stopCreatingAccount());
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed up
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //   });
  }

  function cancelCreatingAccount() {
    if (isCreatingAccount) {
      dispatch(userActions.stopCreatingAccount());
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
            <Button type="button" onClick={cancelCreatingAccount}>
              Cancel
            </Button>
            <Button>Create</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
