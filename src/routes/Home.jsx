import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-router";
import { userActions } from "../store/user-slice";
import Input from "../components/Input";
import Button from "../components/Button";

export default function HomePage() {
  const dispatch = useDispatch();
  const isSigningIn = useSelector((state) => state.user.isSigningIn);

  function handleSignIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("submitted data:", data);

    dispatch(userActions.signInUser());
  }

  return isSigningIn ? (
    <div className="flex flex-grow bg-[#f8eedf] text-center justify-center items-center">
      <Form onSubmit={(event) => handleSignIn(event)}>
        <div className="flex flex-col items-start gap-3">
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
          <Button className="self-end mt-10">Enter</Button>
        </div>
      </Form>
    </div>
  ) : (
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
