import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, eamil, displayName } = auth.current.user;
              dispatch(
                addUser({ uid: uid, eamil: eamil, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          //const errorCode = error.code;
          //const errorMessage = error.message;
          setErrorMessage(
            "The password/Email you entered does not match to this user."
          );
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute w-full">
        <img
          className="absolute w-full"
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9naW58ZW58MHx8MHx8fDA%3D"
          alt="background logo"
          data-testid="bg-logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75"
      >
        <h1 id="sign-in" className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            id="full-name"
            placeholder="Full Name"
            className="p-1 my-2 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          id="email"
          data-testid="email"
          placeholder="Email Address"
          className="p-1 my-2 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          id="password"
          data-testid="password"
          placeholder="password"
          className="p-1 my-2 w-full bg-gray-700"
        />
        <p className="text-red-700">{errorMessage}</p>
        <button
          className="p-2 my-4 bg-red-700 w-full rounded-lg" data-testid="button"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign up"}
        </button>
        <p className="p-2 cursor-pointer" data-testid="form-type" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Blog Sign Up Now"
            : "Already registerd? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
