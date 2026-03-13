import React, { useEffect, useRef, useState } from "react";
import formvideoBackground from "../../assets/video/formvideoBackground.mp4";
import "../../utils/stylesheet/formstyle.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import view from "../../assets/icons/view.png";
import hide from "../../assets/icons/hide.png";
import axiosuserapi from "../../api/axiosuserapi";
import { useNavigate } from "react-router-dom";

const UserLogin = ({ onAuthSuccess }) => {
  const videoRef = useRef(null);
  const containerform = useRef(null);
  const shardContainerRef = useRef(null);

  const [show, setShow] = useState(false);
  const [hidepassword, setHidepassword] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
    };

    try {
      const response = await axiosuserapi.post("/login", payload, {
        withCredentials: true,
      });
   

      if (onAuthSuccess) {
        onAuthSuccess(response.data?.user || null);
      }

     const t1 = gsap.timeline();


    t1.to(".pop", {
      y: -500,
      opacity: 0,
      scale: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
     

    setRefresh(true); 

    if (videoRef.current) {
      videoRef.current.play(); 
      videoRef.current.muted = false;
    }

   
   t1.fromTo(".shard-item", 
      { x: "-100%" }, 
      { 
        x: "0%",      
        duration: 2.2, 
        stagger: 0.15, 
        ease: "none",  
        onComplete: () => {
          gsap.to(shardContainerRef.current, {
            backgroundColor: "white",
            duration: 0.1,
           onComplete: () => {
  navigate("/", { replace: true });
}

          });
        }
      }, "-=0.2");
      
     
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      alert(errorMessage);

      console.error("Engine Stall:", errorMessage);

      gsap.to(".pop", {
        x: 10,
        scale: 0,
        duration: 0.1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 5,
      });
    }
  };

  const handleVideoEnd = () => {
   
    setRefresh(false);
  };

  return (
    <>
      <div className="relative w-full h-screen video-container">

       <div 
     ref={shardContainerRef} 
  className={`${refresh ? "fixed inset-0 z-50 pointer-events-none flex flex-col" : "hidden"}`}
>   
  {[...Array(6)].map((_, i) => (
    <div 
      key={i} 
      className="shard-item w-full h-[17vh] bg-white border-r border-zinc-200"
      style={{ transform: "translateX(-100%)" }} 
    />
  ))}
</div>
      

        <video
          autoPlay
          muted
          src={formvideoBackground}
          ref={videoRef}
          onEnded={handleVideoEnd}
          className="bg-video w-full h-screen fixed top-0 left-0 z-0 overflow-hidden object-cover"
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

              <form
                action="create"
                method="post"
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="EMAIL"
                  required
                  className="w-full bg-black/40 border-2 border-black p-4 rounded-xl font-bold placeholder:text-zinc-600 outline-none focus:bg-white focus:text-black transition-all"
                ></input>

                <div className="relative w-full">
                  <input
                    type={hidepassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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

                <button
                  type="submit"
                  className="w-full bg-yellow-600 border-4 border-black py-4 rounded-2xl font-black text-xl hover:bg-yellow-400 hover:text-black transition-all active:scale-95 uppercase"
                >
                  Ignition →
                </button>

                <div>
                  <p className="text-black font-bold text-center">
                    don't have an account?{" "}
                    <span
                      className="text-blue-600 cursor-pointer"
                      onClick={() => navigate("/vibe/register/")}
                    >
                      Register
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
