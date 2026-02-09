import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import yellowLady from "../../assets/images/yellowLady.jpg";
import { useSelector } from "react-redux";
import Footer from "../components/Footer.jsx";
import eye from "../../assets/images/eye.png";
import "../../utils/stylesheet/eye.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const pupilX = useSpring(mouseX, springConfig);
  const pupilY = useSpring(mouseY, springConfig);

  const x = useTransform(
    pupilX,
    (val) => (val / window.innerWidth - 0.5) * -16,
  );
  const y = useTransform(
    pupilY,
    (val) => (val / window.innerHeight - 0.5) * -16,
  );

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const { items, status } = useSelector((state) => state.products);

  const accessories =
    items && items.length > 0
      ? items
          .filter(
            (item) =>
              item.itemCategory &&
              item.itemCategory.toLowerCase() === "accessories",
          )
          .slice(0, 4)
      : [];

  if (status === "loading") return <p>Vibe is Loading...</p>;

  return (
    <div className="w-full h-screen bg-white text-zinc-900 overflow-x-hidden">
      <div className="w-full flex flex-wrap items-center justify-between">
        <div className="pt-[15vh] text-[7vw] font-extrabold ml-[2.5vw] m-5">
          {["MAIN", "AUTHENTIC", "CHARACTER", "ENERGY."].map((item, index) =>
            index === 1 ? (
              <motion.div
                key={item}
                animate={{
                  backgroundColor: "#e32b86",
                  rotate: 20,
                  transition: { duration: 1.3, delay: 0.5 },
                }}
                className={`bg-pink-600 w-[23.5vw] font-["Arial"] text-[4vw] border-3 border-zinc-800 text-white font-bold`}
              >
                {item}
              </motion.div>
            ) : (
              <motion.div
                key={item}
                className={`font-[poppins] leading-[6vw] ${index === 2 ? "text-sky-400" : ""}`}
              >
                {item}
              </motion.div>
            ),
          )}

          <div className="w-1/2 font-extralight text-[1.5vmax]  mt-[2vmin] leading-[4vmin] ">
            <p className="w-full">
              Stop scrolling. Start serving. The only fit you need for the
              digital age.
            </p>
          </div>
          <div className="w-1/2 font-bold font-[poppins] text-[1.3vmax] m-3">
            <motion.button
              onClick={() => navigate("/shop")}
              whileHover={{
                x: 4,
                y: 4,
                boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
              }}
              whileTap={{
                scale: 0.9,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              type="button"
              className="bg-emerald-400  border-4 border-black p-2 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Shop Now
            </motion.button>
          </div>
        </div>
        <div
          onMouseMove={handleMouseMove}
          className="w-full md:w-1/2 relative flex justify-center items-center  z-0 "
        >
          <img src={eye} alt="" className="w-full h-auto object-cover z-0 " />
          <div className=" flex items-center justify-between  absolute top-42 left-90 rotate-165 z-10 gap-12">
            <motion.div
              style={{ x, y }}
              className="relative bg-zinc-900 rounded-full w-full h-full p-2"
            ></motion.div>
            <motion.div
              style={{ x, y }}
              className="bg-zinc-900 rounded-full w-full h-full relative p-2 "
            ></motion.div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between bg-amber-400 p-8 gap-10 overflow-hidden">
        <div className="w-full md:w-1/2 space-y-4 font-[poppins]">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-zinc-900">
            Hi, We are the Vibe
          </h2>
          <p className="text-lg font-bold leading-tight text-zinc-800 text-justify">
            Welcome to the <span className="text-white italic">Vibe</span> of
            Gen-Z fashion. We blend Luminous style with the raw Rhythm of the
            underground, creating a Fusion of accessories that hit different.
            This is the Vibe Check—consider yourself verified.Fuel your
            aesthetic with the ultimate Ignition of street-style and high-speed
            Velocity. Vibe Check isn't just a shop it's a Cinematic movement
            designed for those who live life at full Throttle. We navigate the
            city Circuit with Kinetic energy, turning every Dispatch into a
            major moment. From Vivid accessories to the core pieces that define
            your Aura, we are the Catalyst for your next viral fit. Join the
            Unity, catch the Surge, and stay locked into the Pulse of the
            streets.
          </p>
          <motion.button
            onClick={() => navigate("/about")}
            whileHover={{
              x: 4,
              y: 4,
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
            }}
            whileTap={{
              scale: 0.9,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            type="button"
            className="bg-emerald-400 font-bold font-[poppins] border-4 p-2 border-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[1.3vmax]"
          >
            Know More →
          </motion.button>
        </div>

        <div className="w-full md:w-1/2">
          <motion.img
            whileHover={{
              scale: 1.05,
              rotate: -2,
            }}
            src={yellowLady}
            alt="fashionate"
            className="w-full object-cover grayscale hover:grayscale-0 transition duration-700 rounded-3xl border-4 border-black funky-shadow"
          />
        </div>
      </div>

      <div className="bg-white w-full py-10">
        <div className="w-full  bg-white text-zinc-950 -mt-10 mb-10 rounded-lg">
          <div className="py-10 border-t-2 border-b-2 border-white text-center flex whitespace-nowrap overflow-hidden -mb-5 pt-5 ">
            <motion.h1
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
              className="font-bold text-[8vmax] leading-none"
            >
              Match Your Vibe!
            </motion.h1>
            <motion.h1
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
              className="font-bold text-[8vmax] leading-none"
            >
              Match Your Vibe!
            </motion.h1>
          </div>
        </div>

        <div className="w-full mx-auto px-4 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-white">
          {accessories && accessories.length > 0 ? (
            accessories.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ y: -10 }}
                className="bg-white border-4 border-black p-4 rounded-2xl funky-shadow"
              >
                <div className="w-full h-64 overflow-hidden rounded-xl border-2 border-black bg-zinc-100 mb-4">
                  <img
                    src={item.image}
                    alt={item.brandName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-xl uppercase italic">
                    {item.brandName}
                  </h3>
                  <p className="text-3xl font-black ">${item.price}</p>
                  <motion.button
                    onClick={() => navigate("/shop")}
                    whileHover={{
                      x: 4,
                      y: 4,
                      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-full bg-emerald-400  border-4 border-black  uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]  py-2 text-md font-extrabold"
                  >
                    Buy
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-xl font-bold">
              No items available yet
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
