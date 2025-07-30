import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Form, useLocation } from "react-router";
import { ref, getDatabase, update } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";

import { userActions } from "../store/user-slice.js";

import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";

export default function UserProfile() {
  const auth = getAuth();
  const location = useLocation();
  const db = getDatabase();
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.user);
  const [userAuth, setUserAuth] = useState(false);
  const [userID, setUserID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userProfID = location.pathname.split("/").pop();
      setUserAuth(user.uid === userProfID);
      setUserID(user.uid);
    } else {
      setUserAuth(false);
      setUserID(null);
    }
  });

  useEffect(() => {
    return () => {
      handleStopEditing();
    };
  }, []);

  function handleToggleEditing() {
    setIsEditing((prevEditingState) => !prevEditingState);
  }

  function handleStartEditing() {
    if (!isEditing) {
      setIsEditing(true);
    }
  }

  function handleStopEditing() {
    if (isEditing) {
      setIsEditing(false);
    }
  }

  function handleTextSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // console.log("editing user:", data);

    const publicPath = "users/users/" + userID + "/public";
    update(ref(db), {
      [publicPath + "/username"]: data["user-profile-username"],
      [publicPath + "/statusMessage"]: data["user-profile-status-message"],
    });
  }

  let content = (
    <div className="w-full flex flex-col gap-30">
      <div className="w-[60vw] flex flex-row gap-10 items-center">
        <div className="size-35 bg-white rounded-xl"></div>
        <div className="grow flex flex-col gap-2">
          <h2>{currUser.username}</h2>
          <div className="bg-white px-3 py-1 rounded-md">
            <p>{currUser.statusMessage}</p>
          </div>
        </div>
      </div>
      {/* <h2>User Stats</h2> */}
    </div>
  );

  if (isEditing) {
    content = (
      <Form onSubmit={(event) => handleTextSubmit(event)}>
        <div className="w-full flex flex-col gap-30">
          <div className="w-[60vw] flex flex-row gap-10 items-center">
            <div className="size-35 bg-white rounded-xl"></div>
            <div className="grow flex flex-col gap-2">
              <Input
                id="user-profile-username"
                name="user-profile-username"
                type="text"
                className="text-[2rem] px-3"
                minLength={1}
                maxLength={12}
                pattern="[ -~]+"
                placeholder={"Username"}
                defaultValue={currUser.username}
              />
              <Input
                id="user-profile-status-message"
                name="user-profile-status-message"
                type="text"
                className="px-3"
                minLength={0}
                maxLength={50}
                pattern="[ -~]+"
                placeholder={"Status Message"}
                defaultValue={currUser.statusMessage}
              />
            </div>
          </div>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    );
  }

  return (
    <div className="p-32 xl:px-[20vw]">
      <div className="flex flex-row justify-between items-center mb-10">
        <h1>User Profile</h1>
        {userAuth && (
          <Button onClick={handleToggleEditing} type="button">
            {!isEditing ? "Edit" : "Stop Editing"}
          </Button>
        )}
      </div>

      {content}
    </div>
  );
}
