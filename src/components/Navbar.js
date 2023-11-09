import React from 'react';

const style = {
    nav: `bg-gray-700 h-20 flex justify-between items-center p-4`,
    heading: ` text-white flex-1 flex justify-center ml-auto`
}

const Navbar = () => {
    
  return (
    <div className={style.nav}>
      <h1 className={style.heading}>BLOG CHAT</h1>
    </div>
  );
};

export default Navbar;