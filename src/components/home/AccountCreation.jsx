import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-router";
import { userActions } from "../../store/user-slice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Input from "../Input";
import Button from "../Button";

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
        <div className="flex flex-col items-start gap-3">
          <h1>Create Account</h1>
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
          <div>
            <label
              htmlFor="entered-password"
              className="text-black text-[1.6rem] font-semibold mr-10"
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
