import React from 'react'
import Footer from "../components/Footer.jsx" 
import cool from "../../assets/images/cool.jpg"

function About() {
  return (
    <>
    <div className='w-full h-screen bg-white font-[poppins]  bg-white'>
      <div className='flex flex-wrap items-center justify-around w-full'>
        <div className='pt-[15vh] text-[7vw] font-extrabold ml-[2.5vw] m-5 w-1/2'>
          <p className="font-semibold text-xl flex  leading-tight text-justify text-zinc-950">
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
          <div className='pt-[15vh] pr-[2.5vw] '>
            <div>
              <img src= {cool} alt="404" className='rounded-2xl funky-shadow' width={350} />
            </div>
            
          </div>

      </div>

        
    </div>
    <Footer />
     </>
  )
}

export default About
