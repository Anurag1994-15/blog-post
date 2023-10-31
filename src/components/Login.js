import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';


const Login = () => {
const[isSignInForm, setIsSignInForm] = useState(true);
const[errorMessage,setErrorMessage] = useState(null);

// const name=useRef(null);
const email=useRef(null);
const password=useRef(null);

const handleButtonClick =()=>{
   const message= checkValidData(email.current.value,password.current.value);
   setErrorMessage(message)
   if(message)return;

   if(!isSignInForm){
    //Sign Up Logic
    createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
  });

   }else{
    //Sign In Logic
    signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
  });

   }
}
const toggleSignInForm = ()=>{
    setIsSignInForm(!isSignInForm) ;
};


  return (
    <div>
      <Header />
      <div className="absolute" >
        <img 
        src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9naW58ZW58MHx8MHx8fDA%3D"
        alt="background logo"
       />
       </div>
       <form onSubmit={(e)=>e.preventDefault()} className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" :"Sign up"}</h1>
        {!isSignInForm &&(<input  type="text" placeholder="Full Name" className="p-1 my-2 w-full bg-gray-700"/>)}
        <input ref={email} type="text" placeholder="Email Address" className="p-1 my-2 w-full bg-gray-700"/>
        <input ref={password} type="password" placeholder="password" className="p-1 my-2 w-full bg-gray-700"/>
        <p className="text-red-700">{errorMessage}</p>
        <button className="p-2 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" :"Sign up"}</button>
        <p className="p-2 cursor-pointer" onClick={toggleSignInForm}> {isSignInForm ? "New to Blog Sign Up Now" :"Already registerd? Sign In"} </p>
       </form>
    </div>
  )
}

export default Login

