import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate=useNavigate();
  const user =useSelector(store => store.user)

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error")
        // An error happened.
      });
  };
  console.log(user)
  return (
    <div className="absolute  px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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
