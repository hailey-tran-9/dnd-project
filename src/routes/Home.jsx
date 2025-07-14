import { useSelector } from "react-redux";
import SignIn from "../components/home/SignIn";
import AccountCreation from "../components/home/AccountCreation";

export default function HomePage() {
  const isSigningIn = useSelector((state) => state.user.isSigningIn);
  const isCreatingAccount = useSelector(
    (state) => state.user.isCreatingAccount
  );

  let content;
  if (isSigningIn) {
    content = <SignIn />;
  } else if (isCreatingAccount) {
    content = <AccountCreation />;
  } else {
    content = (
      <div className="flex flex-col flex-grow bg-black text-white text-center justify-center gap-3 p-32">
        <p className="text-[3rem] font-[650]">
          A web application that lets you play dnd together with friends!
        </p>
        <p className="text-[1rem] font-[400]">Hopefully it works lol</p>
      </div>
    );
  }

  return content;
}

export async function clientLoader() {
  return {
    title: "Home Page",
  };
}
