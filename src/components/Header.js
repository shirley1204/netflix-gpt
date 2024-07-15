import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { Netfix_logo } from "../utils/constant";

const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user =useSelector(store => store.user)

  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
    return ()=> unsubscribe();
  },[])

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/")
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error")
        // An error happened.
      });
  };
  return (
    <div className="absolute  px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img
        className="w-44"
        src={Netfix_logo}
        alt="logo"
      />
      {user &&
      <div className="flex p-2">
        <img
          className="w-12 h-12"
          src={user.photoURL}
          // src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
          alt="user-icon"
        />
        <button onClick={handleSingOut} className="font-bold text-white">
          Sign Out
        </button>
      </div>}
    </div>
  );
};

export default Header;
