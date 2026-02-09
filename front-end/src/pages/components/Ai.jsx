import React from "react";
import { useState } from "react";
import axiosAiapi from "../../api/axiosAiapi.jsx";
import {motion} from "framer-motion";
import ReactMarkdown from 'react-markdown';

const Ai = () => {
  const [see, setSee] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      setLoading(true);
      const result = await axiosAiapi.post(
        "/askDelulu",
        {
          userMessage: message,
        },
        {
          withCredentials: true,
        },
      );
      setResponse(result.data.data.deluluResponse);
      console.log("Delulu responce is: ", result.data);
      setLoading(false);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="w-full bg-white text-zinc-900 text-md font-[poppins]">
      {see ? (
        <div className="w-full md:w-1/3 fixed h-[80vh] bottom-20 right-5 border-4 border-black p-4  bg-white z-50 rounded-2xl flex flex-col overflow-hidden funky-shadow">
          <div className="text-black p-4 flex justify-between items-center rounded-2xl">
            <h2 className="font-bold uppercase tracking-tighter">
              Delulu AI Manager 💅
            </h2>
            <button onClick={() => setSee(false)}>✕</button>
          </div>

          <form
            className="p-4 border-t-2 border-zinc-100 flex-col flex-wrap "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                onChange={handleChange}
                value={message}
                placeholder="Ask for a vibe check..."
                className="flex-1 p-2 outline-none border-2 border-zinc-900 rounded-lg"
              />
              <motion.button
                type="submit"
                whileHover={{
              x: 4,
              y: 4,
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
            }}
            whileTap={{
              scale: 0.9,
            }}
                disabled={loading}
                className="bg-emerald-400 font-bold font-[poppins] border-4 p-1 border-black  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] "
              >
                {loading ? "Thinking..." : "Send"}
              </motion.button>
            </div>
            {response && (
              <div className="w-full mt-8 p-2 bg-zinc-200 rounded-lg">
                <div className="font-bold mb-2 font-[poppins]">Delulu's Response:</div>
                <div className="text-sm text-zinc-700">
                  
                  <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={() => setSee(true)}
            className="bg-emerald-400 font-bold border-4 p-4 border-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-full w-16 h-16 flex items-center justify-center text-xl font-[poppins]"
          >
            Ai
          </button>
        </div>
      )}
    </div>
  );
};

export default Ai;
