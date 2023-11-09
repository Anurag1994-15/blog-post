import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import ChatModal from './ChatModal';

const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user = useSelector((store)=>store.user);
const handleSignOut=()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
   
  }).catch((error) => {
    // An error happened.
    navigate("/errorPage")
  });
}

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, eamil, displayName } = user;
      dispatch(addUser({ uid: uid, eamil: eamil, displayName: displayName }));
      navigate("/browse");
    } else {
      dispatch(removeUser());
      navigate("/");
    }
  });
}, []);

  return (
    // <div className=" w-screen px-4 py-2 bg-gradient-to-b from-black z-10 flex justify-between" >
     <div className={"px-4 py-2 bg-gradient-to-b from-black z-10 flex justify-between " + (user ? 'sticky-top' : 'absolute')}>
      <img
       className="w-32 "
       src="https://img.freepik.com/premium-vector/word-concept-color-geometric-shapes-blog_205544-13021.jpg"
       alt="logo"
       />
        {user &&(<div className="flex p-2 flex-col">
          <img
          className="w-12 h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOApFCSVByzhZorHUAP-J851JAYyOPtI1jdg&usqp=CAU"
          alt="userIcon"
          />
          <div className="font-bold text-yellow-50">{user.displayName}</div>
          
          <button onClick={handleSignOut} className="font-bold text-yellow-50">(Sign Out)</button>
          <ChatModal/>
        </div>
        )}
       
    </div>
   
  )
}

export default Header
