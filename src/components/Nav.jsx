import React from "react";
import Logo from "../assets/ReactStore2.png";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FaChevronDown } from "react-icons/fa";

const Nav = () => {
  return (
    <div className="border-b-2  bg-white flex justify-between sticky top-0 py-6 px-6 md:px-20">
      <div className="flex">
        <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
        <div className="text-2xl">React Store</div>
      </div>
      <div className="flex">
        <div className="relative mr-4">
          <LiaShoppingBagSolid className="h-8" size={"50px"} />
          <span className="absolute -top-3 -right-1 inline-flex items-center justify-center rounded-md bg-blue-100 px-2 py-1 text-sm font-medium text-blue-900 ring-1 ring-inset ring-blue-700/100 h-6 w-6">
            2
          </span>
        </div>
        <div className="relative">
          <div className="flex items-center cursor-pointer px-4">
            <span className="mr-2">SomeOne!</span>
            <FaChevronDown style={{ color: "gray" }} />
          </div>
            {/* <ul className="absolute px-2 py-2 rounded-md right-0 shadow-lg bg-white w-full z-100">
              <li className="p-2 hover:bg-white rounded-md cursor-pointer">Login</li>
              <li className="p-2 hover:bg-white rounded-md cursor-pointer">Sign Up</li>
            </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Nav;
