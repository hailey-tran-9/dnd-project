import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-router";
import { userActions } from "../../store/user-slice";

import Input from "../Input";
import Button from "../Button";

export default function SignIn() {
  const dispatch = useDispatch();
  const isSigningIn = useSelector((state) => state.user.isSigningIn);

  function handleSignIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("submitted data:", data);

    dispatch(userActions.signInUser());
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
          <div className="flex flex-row w-full justify-between gap-5 mt-10">
            <Button type="button" onClick={handleCreateAccount}>
              Create account
            </Button>
            <div className="flex gap-5">
              <Button type="button" onClick={cancelSignIn}>
                Cancel
              </Button>
              <Button>Enter</Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
