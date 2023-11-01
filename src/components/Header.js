import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate=useNavigate();
  const user = useSelector((store)=>store.user)
const handleSignOut=()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
    navigate("/")
  }).catch((error) => {
    // An error happened.
    navigate("/errorPage")
  });
}

  return (
    <div className="absolute w-screen px-4 py-2 bg-gradient-to-b from-black z-10 flex justify-between" >
      <img
       className="w-32 "
       src="https://img.freepik.com/premium-vector/word-concept-color-geometric-shapes-blog_205544-13021.jpg"
       alt="logo"
       />
        {user &&(<div className="flex p-2">
          <img
          className="w-12 h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOApFCSVByzhZorHUAP-J851JAYyOPtI1jdg&usqp=CAU"
          alt="userIcon"
          />
          <button onClick={handleSignOut} className="font-bold text-yellow-50">(Sign Out)</button>
        </div>
        )}
    </div>
   
  )
}

export default Header
