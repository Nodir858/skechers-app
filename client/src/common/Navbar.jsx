import React, { useEffect, useState, useRef } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import ResponsiveMenu from "./ResponsiveMenu";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { userLogoutAction } from "../Redux/Actions/User";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Checkout from "../pages/Checkout";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let menuRef = useRef();
  // if you want to safely interact with a DOM element, you should usually do that inside useEffect
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const logOutHandler = () => {
    dispatch(userLogoutAction());
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const qty = useSelector((state) =>
    state.cart.cartItems.reduce((total, current) => total + current.qty, 0)
  );
  return (
    <>
      <nav className="w-full lg:w-3/4  lg:m-auto">
        <div className="main-container">
          <Link to="/" className="flex items-center">
            <AiOutlineProduct className="text-3xl" />
            <span className="text-xl ml-2">Skechers</span>
          </Link>
          {/*Menu Section */}
          <div className="hidden w-1/2 sm:flex text-center justify-center items-center">
            <li className="flex space-x-5 list-none flex-wrap list-section">
              <Link to="/">
                <ul>Home</ul>
              </Link>
              <ul>About</ul>
              <ul>Services</ul>
              <ul>Contact</ul>
            </li>
          </div>
          {!userInfo ? (
            <Link to="/register">
              <div className="sm:visible text-xl font-bold get-started-text">
                <button>Get started</button>
              </div>
            </Link>
          ) : (
            // <div>
            //   <button>Logout</button>
            // </div>
            <div className="flex w-30 justify-between">
              <div className="menu-container" ref={menuRef}>
                <div
                  className="menu-trigger bg-emerald-700"
                  onClick={() => setOpen(!open)}
                >
                  {/* <IoMdMenu className="text-3xl" /> */}
                  <p>User</p>
                  <MdKeyboardArrowDown />
                </div>
                {/*Mobile Sidebar Section*/}
                <div
                  className={`dropdown-menu ${open ? "active" : "inactive"}`}
                >
                  <ul>
                    <DropdownItem logOutHandler={logOutHandler}></DropdownItem>
                  </ul>
                </div>
              </div>
              <Link onClick={toggleSidebar}>
                <div className=" w-9  h-full flex justify-center items-center text-2xl cursor-pointer relative">
                  <FaShoppingCart />
                  <div className="absolute text-fuchsia-500 top-[-5px] right-[-5px] font-bold">
                    <span>{qty}</span>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
        <div>
          <Checkout
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => toggleSidebar()}
          ></Checkout>
        </div>
      </nav>
    </>
  );
};
///Mobile sidebar section
function DropdownItem({ logOutHandler }) {
  const arr = ["Home", "About", "Services", "Contact"];
  return (
    <>
      <li className="dropDownItem">
        <Link to="/order-history">
          <p className="cursor-pointer text-base hover:bg-neutral-400 duration-300 rounded-t-xl px-2 py-1">
            Order-History
          </p>
        </Link>
        <p
          className="cursor-pointer hover:bg-neutral-400 duration-300 rounded-b-xl px-2 py-1"
          onClick={logOutHandler}
        >
          Sign out
        </p>
      </li>
    </>
  );
}

export default Navbar;
