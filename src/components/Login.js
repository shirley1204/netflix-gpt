import { checkValidDat } from "../utils/Validate";
import Header from "./Header";
import { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage]=useState(null)
  const email=useRef(null);
  const passward=useRef(null);
  const name =useRef(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () =>{
    //validate the form data
   const message= isSignInForm ? checkValidDat(email.current.value,passward.current.value) : checkValidDat(email.current.value,passward.current.value,name.current.value);
   setErrorMessage(message);
   if(message) return //if message is there then thos function will return from here
   //Sign In /Sign Up 
   if(!isSignInForm){
    createUserWithEmailAndPassword(auth, email.current.value, passward.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // console.log("user",user);
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
    }).then(() => {
      const {uid,email,displayName,photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
      navigate("/browse")
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
    // ..
  });

   }else{
    //Sign In Logic
    signInWithEmailAndPassword(auth, email.current.value, passward.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // console.log("user",user);
    navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)

  });


   }

  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="
         https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/e90516bd-6925-4341-a6cf-0b9f3d0c140a/IN-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34324b52-d094-482b-8c2a-708dc64c9065_large.jpg"
          alt="bg-img"
        />
      </div>
      <form onSubmit={(e) =>e.preventDefault() }className=" w-3/12 absolute p-12 bg-black my-36 m-auto right-0 left-1 text-white bg-opacity-80">
        <h1 className="font-bold font-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm &&  <input
          type="text"
          ref={name}
          placeholder="Full Name"
          className="p-4 my-2 w-full bg-gray-700"
        />}
        <input
        ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <input
        ref={passward}
          type="passward"
          placeholder="Passward"
          className="p-4 my-2 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer"
        onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
