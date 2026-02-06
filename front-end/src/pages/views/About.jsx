import React from "react";
import Footer from "../components/Footer";
import cool from "../../assets/images/cool.jpg";
import kiara from "../../assets/images/kiara.jpg";

function About() {
  return (
    <>
      <div className="w-full min-h-screen bg-white text-zinc-950 font-[poppins]">
        <div className="w-full min-h-screen bg-amber-400 flex flex-col md:flex-row justify-around items-center  px-10">
          <div className="md:w-1/2 w-full bg-emerald-400 rounded-lg shadow-lg flex justify-center items-center p-8">
            <p className="absolute left-[5rem] top-[34rem]  text-white font-extrabold text-[3vmax]">
              BOLDNESS IN FASHION
            </p>
            <img
              src={kiara}
              alt="Kiara"
              className="max-w-full h-auto rounded-lg ml-20 py-16 "
            />
          </div>

          <div className="md:w-1/2 w-full flex justify-center items-center relative ">
            <img
              src={cool}
              alt="Cool"
              className="w-full md:w-64 rounded-lg funky-shadow "
            />
            <p className="absolute right-[-0.5rem] text-white font-extrabold rotate-90 text-[8vmax]">
              GEN Z
            </p>
          </div>
        </div>

        <div className="py-5 px-10 w-full">
          <p className="font-semibold text-xl flex w-1/2 leading-tight text-justify">
            Vibes is the ultimate Gen Z fashion playground—a high-key,
            community-first platform where Y2K nostalgia meets streetwear edge.
            Moving beyond basic fast fashion it champions circular commerce
            and ethical thrifting for a generation that demands authenticity and
            sustainability. No Cap, Just Style A feed curated by AI-driven
            aesthetics, tailored to your specific core Cottagecore, Gorpcore,
            or Cyber-Y2K. Main Character Energy Built for resale and remixing,
            allowing you to flip pre-loved grails and keep the circular economy
            thriving. The Ultimate Flex: Unlike legacy apps, this platform is a
            vibe check for your closet connecting you with underground creators
            and eco-conscious sellers who actually get it.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
