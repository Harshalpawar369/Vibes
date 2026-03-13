import React from "react";
import shopingBag from "../../assets/icons/shopingBag.png";
import loupe from "../../assets/icons/loupe.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "../../utils/stylesheet/font.css";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useState,useContext } from "react";
import '../../utils/stylesheet/responsive.css';
import UserContext from "../../context/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user, isLoggedIn } = useContext(UserContext);
  return (
    <>
      <motion.nav 
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }} 

      className=" navsec w-full fixed z-[100] flex items-center justify-between flex-wrap px-3 py-1.5 bg-white shadow-md font-[poppins] text-zinc-950">
        <div className="ml-5 text-3xl font-bold font-[poppins] font-extrabold logo">
          Vibes
        </div>
        <div className="nav-mob space-x-8 navbar-links">
          {["Home", "About", "Shop"].map((item, index) => (
            <motion.button
              onClick={() => {
                if (item === "Shop") navigate("/shop");
                if (item === "Home") navigate("/");
                if (item === "About") navigate("/about");
              }}
              whileHover={{ scale: 1.15 }}
              key={index}
              className="font-semibold font-[poppins] text-[17px] hover:text-gray-600 transition-all border-none outline-none"
            >
              {item}
            </motion.button>
          ))}
        </div>
        <div className="relative flex flex-wrap justify-around items-center gap-4">
          <motion.div whileHover={{}} className="mb-0.5">
            {isLoggedIn && user ? (
              <div className="font-[poppins] font-semibold ">Hi! {user.userName}</div>
            ) : (
              <div>
                <motion.button 
                whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 0px 0px black",
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={() => {navigate('/vibe/login/')}}
                className="bg-emerald-400 border-3 border-black px-1.5 py-1 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm">
                  LogIn
                </motion.button>
              </div>
            )}
          </motion.div>
          <motion.div
            whileHover={{
              rotateZ: 20,
            }}
            onClick={() => {navigate('/cart')}}
            className=" bg-emerald-400 rounded-full border-2 border-black mr-1.5 uppercase shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)]"
          >
            <img src={shopingBag} alt="404" className=" p-1  " width={36} />
          </motion.div>
          <span className="absolute top-0 right-0  bg-gray-900 rounded-full text-white w-5 h-5 text-center flex items-center justify-center text-[13.5px]">
            {cartItems.length}
          </span>
        </div>
      </motion.nav>
    </>
  );
}

export default Navbar;
