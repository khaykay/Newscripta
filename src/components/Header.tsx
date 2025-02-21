import React from 'react'

const Header = () => {
  return (
    <div className="min-h-30  mt-5 px-3 md:px-0 py-10 px-auto flex flex-col items-center gap-1.5 bg-gray-100 text-center">
      {" "}
      <h3 className="md:tracking-[0.3rem] font-light">WELCOME TO NEWSCIPTA</h3>
      <span className="text-xl md:text-2xl font-bold">
        All your favorite news,{" "}
        <span className="text-red-600 mx-2">from everywhere 🌍</span>, in one
        place.
      </span>
      <span className="text-xs capitalize font-medium flex gap-2 ">
        {" "}
        <span>Stay ahead.</span>
        <span>Stay informed.</span>
        <span>Stay inspired.</span>
      </span>
    </div>
  );
}

export default Header