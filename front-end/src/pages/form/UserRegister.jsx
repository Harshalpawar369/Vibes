import React, { use, useEffect, useRef, useState } from "react";
import formvideoBackground from "../../assets/video/formvideoBackground.mp4";
import "../../utils/stylesheet/formstyle.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import view from "../../assets/icons/view.png";
import hide from "../../assets/icons/hide.png";


const UserRegister = () => {
  const videoRef = useRef(null);
  const containerform = useRef(null);

  const [show, setShow] = useState(0);
  const [hidepassword, setHidepassword] = useState(false);

  


  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  useGSAP(() => {
    const video = videoRef.current;

    gsap.delayedCall(5, () => {
      if (video) {
        video.pause();
        video.currentTime = 5;
      }

      setShow(true);

      gsap.from(".pop", {
        scale: 0,
        opacity: 0,
        y: -40,
        rotate: -10,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
    });
  });

 



  return (
    <>
      <div className="w-full h-screen video-container">
        <video
          autoPlay
          muted
          src={formvideoBackground}
          ref={videoRef}
          className="bg-video w-full h-screen fixed top-0 left-0 z-0 overflow-hidden"
          width={100}
          height={100}
        ></video>

        <div
          className={`${
            show ? "flex" : "hidden"
          } items-center justify-center h-screen px-4`}
          ref={containerform}
        >
          <div className="pop">
            <div className=" pop-inner bg-white/10 backdrop-blur-xl p-8 rounded-4xl border-4 border-black funky-shadow w-full max-w-md animate-[wiggle_3s_ease-in-out_infinite]">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none text-orange-500">
                  Join<br></br>Club
                </h1>
                <span className="bg-emerald-400 text-black px-3 py-1 font-bold text-xs -rotate-12 rounded-sm">
                  Vibe fill
                </span>
              </div>

              <form action="create" method="post" className="space-y-4" onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="username"
                  placeholder="USERNAME"
                  required
                  className="w-full bg-black/40 border-2 border-black p-4 rounded-xl font-bold placeholder:text-zinc-600 outline-none focus:bg-white focus:text-black transition-all"
                ></input>

                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  required
                  className="w-full bg-black/40 border-2 border-black p-4 rounded-xl font-bold placeholder:text-zinc-600 outline-none focus:bg-white focus:text-black transition-all"
                ></input>

                <div className="relative w-full">
                  <input
                    type={hidepassword ? "text" : "password"}
                    name="password"
                    placeholder="PASSWORD"
                    required
                    className="w-full bg-black/40 border-2 border-black p-4 pr-12 rounded-xl font-bold placeholder:text-zinc-600 outline-none focus:bg-white focus:text-black transition-all"
                  />
                  <img
                    src={hidepassword ? hide : view}
                    alt="Toggle Password Visibility"
                    onClick={() => setHidepassword(!hidepassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-6 h-6 opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>

                <input
                  type="number"
                  name="contactNo"
                  placeholder="CONTACT NO"
                  required
                  className="w-full bg-black/40 border-2 border-black p-4 rounded-xl font-bold placeholder:text-zinc-600 outline-none focus:bg-white focus:text-black transition-all"
                ></input>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 border-4 border-black py-4 rounded-2xl font-black text-xl hover:bg-yellow-400 hover:text-black transition-all active:scale-95 uppercase"
                >
                  Ignition →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
