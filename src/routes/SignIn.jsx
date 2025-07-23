import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, NavLink, useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  increment,
} from "firebase/database";

import { userActions } from "../store/user-slice";
import { basicEmailCheck, validPassword } from "../util/util";
import { v4 as uuidv4 } from "uuid";

import Input from "../components/Input";
import Button from "../components/Button";

export default function SignInPage() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();

  useEffect(() => {
    dispatch(userActions.startSignIn());
    return () => {
      dispatch(userActions.stopSignIn());
    };
  }, [dispatch]);

  const cryptoAPI = window.crypto.subtle || window.crypto.webkitSubtle;
  if (!cryptoAPI) {
    console.log("no web crypto api on this browser");
  } else {
    console.log("there's web crypto api YIPPEE");
  }

  async function createKeyPair() {
    const keyPair = await cryptoAPI.generateKey(
      { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["sign", "verify"]
    );
    return keyPair;
  }

  async function exportCryptoKey(key) {
    const exported = await cryptoAPI.exportKey("jwk", key);
    return exported;
  }

  async function handleSignIn(event) {
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
        const userID = user.uid;

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

              console.log("error signing out");
              console.log(errorCode, errorMessage);
            });
        } else {
          // console.log("user successfully signed in");
          dispatch(userActions.signInUser());

          // Create a user in the db if no data exists yet
          const userRef = ref(db, "users/users/" + userID);
          get(userRef).then((snapshot) => {
            if (!snapshot.exists()) {
              createKeyPair().then((keyPair) => {
                // console.log("keyPair:", keyPair);
                exportCryptoKey(keyPair.publicKey).then((exportedPub) => {
                  exportCryptoKey(keyPair.privateKey).then((exportedPriv) => {
                    // console.log("exported public:", exportedPub);
                    // console.log("exported private:", exportedPriv);

                    if (keyPair) {
                      set(userRef, {
                        public: {
                          key: exportedPub,
                          username: "",
                        },
                        private: {
                          characters: {
                            characterIDs: {},
                            numberOfCharacters: 0,
                          },
                          games: {
                            gameIDs: {},
                            numberOfGames: 0,
                          },
                          key: exportedPriv,
                          maps: {
                            mapIDs: {},
                            numberOfMaps: 0,
                          },
                        },
                      })
                        .then(() => {
                          // console.log("user created successfully in the db");
                          update(ref(db), {
                            "users/numberOfUsers": increment(1),
                          });
                        })
                        .catch((error) => {
                          console.log("error creating the user in the db");
                          console.log(error.message);
                        });
                    }
                  });
                });
              });
            }
          });

          // TODO: if there are errors, display them to the user instead of automatically navigating
          navigate("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("error trying to sign in");
        console.log(errorCode, errorMessage);
      });
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
              type="password"
              className="w-100 text-md"
              required
            />
          </div>
          <div className="flex flex-row w-full justify-between gap-20 mt-10">
            <NavLink to="/account-creation">
              <Button type="button">Create account</Button>
            </NavLink>
            <div className="flex gap-5">
              <NavLink to="/">
                <Button type="button">Cancel</Button>
              </NavLink>
              <Button>Enter</Button>
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
