import React from 'react'
import { useState } from 'react'

const Ai = () => {
 const [see, setSee] = useState(false)  
 const [message, setMessage] = useState("")
 
  return (
    <div className='w-full bg-white text-zinc-900 text-md'>
       {see ? (
        <div className='w-full md:w-1/3 fixed h-[80vh] bottom-20 right-5 bg-white z-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl flex flex-col overflow-hidden'>
      
          <div className='bg-zinc-900 text-white p-4 flex justify-between items-center'>
            <h2 className='font-bold uppercase tracking-tighter'>Delulu AI Manager 💅</h2>
            <button onClick={() => setSee(false)}>✕</button>
          </div>

          <form  className='p-4 border-t-2 border-zinc-100 flex gap-2'>
            <input 
              type="text" 
              
              
              placeholder='Ask for a vibe check...' 
              className='flex-1 p-2 outline-none border-2 border-zinc-900 rounded-lg' 
            />
            <button type="submit" className='bg-zinc-900 text-white px-4 py-2 rounded-lg font-bold uppercase text-xs'>Send</button>
          </form>
        </div>
      ) : (
        <div className='fixed bottom-5 right-5 z-50'>
          <button  
            onClick={() => setSee(true)}
            className='bg-emerald-400 font-bold border-4 p-4 border-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-full w-16 h-16 flex items-center justify-center text-xl'
          >
            Ai
          </button>
        </div>
      )}
      
    </div>
  )
}

export default Ai
