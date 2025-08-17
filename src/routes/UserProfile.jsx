import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { Form, useLocation } from "react-router";
import { ref, getDatabase, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { userActions } from "../store/user-slice.js";

import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";

export default function UserProfile() {
  const auth = getAuth();
  const db = getDatabase();
  const storage = getStorage();
  const location = useLocation();
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.user);
  const [userAuth, setUserAuth] = useState(false);
  const [userID, setUserID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputFileName, setInputFileName] = useState("Profile Pic");

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

  function handleStopEditing() {
    if (isEditing) {
      setIsEditing(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("editing user:", data);

    const publicPath = "users/users/" + userID + "/public";
    update(ref(db), {
      [publicPath + "/username"]: data["user-profile-username"],
      [publicPath + "/statusMessage"]: data["user-profile-status-message"],
    }).catch((error) => {
      console.log("error updating user's information");
      console.log(error.message);
      return;
    });

    updateProfile(auth.currentUser, {
      displayName: data["user-profile-username"],
    }).catch((error) => {
      console.log("error updating the user's display name");
      console.log(error.message);
    });

    const pfp = data["user-pfp"];
    if (pfp.size > 0) {
      const pfpRef = storageRef(storage, `users/${userID}/pfp`);
      uploadBytes(pfpRef, pfp)
        .then((snapshot) => {
          getDownloadURL(pfpRef).then((url) => {
            // console.log("url:", url);
            updateProfile(auth.currentUser, { photoURL: url })
              .then(() => {
                dispatch(userActions.updatePfpURL(url));
                handleStopEditing();
              })
              .catch((error) => {
                console.log("error updating the user's pfp");
                console.log(error.message);
              });
          });
        })
        .catch((error) => {
          console.log("error uploading pfp image");
          console.log(error.message);
        });
    }

    handleStopEditing();
  }

  let content = (
    <div className="w-full flex flex-col gap-30">
      <div className="w-[60vw] flex flex-row gap-10 items-center">
        {currUser.pfpURL ? (
          <img
            src={currUser.pfpURL}
            className="size-[150px] xl:size-[200px] object-cover object-center rounded-xl"
          />
        ) : (
          <div className="flex size-[150px] xl:size-[200px] bg-white text-neutral-500 justify-center items-center text-center break-all overflow-hidden p-3 rounded-xl">
            Empty pfp
          </div>
        )}
        <div className="grow flex flex-col gap-2">
          <h2>{currUser.username || "No username has been set"}</h2>
          <div className="bg-white px-3 py-1 rounded-md">
            <p>{currUser.statusMessage || "No status message has been set"}</p>
          </div>
        </div>
      </div>
      {/* <h2>User Stats</h2> */}
    </div>
  );

  if (isEditing) {
    content = (
      <Form onSubmit={(event) => handleSubmit(event)}>
        <div className="w-full flex flex-col gap-30">
          <div className="w-[60vw] flex flex-row gap-10 items-center">
            <input
              type="file"
              name="user-pfp"
              id="user-pfp"
              className="inputFile"
              onChange={(event) => {
                let fileName = event.target.value.split("\\").pop();
                setInputFileName(fileName);
              }}
            />
            <label
              htmlFor="user-pfp"
              className="flex size-[150px] xl:size-[200px] bg-white text-neutral-500 justify-center items-center text-center break-all overflow-hidden p-3 rounded-xl hover:bg-neutral-50 focus:ring"
            >
              {inputFileName}
            </label>
            <div className="grow flex flex-col gap-2">
              <Input
                id="user-profile-username"
                name="user-profile-username"
                type="text"
                className="text-[2rem] cursor-pointer hover:bg-neutral-50"
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
                className="py-1 cursor-pointer hover:bg-neutral-50"
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
            {!isEditing ? "Edit" : "Cancel"}
          </Button>
        )}
      </div>

      {content}
    </div>
  );
}
