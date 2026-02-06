import React from 'react';
import { 
  User, 
  Plus, 
  Instagram, 
  Twitter, 
  Menu,
  ArrowRight,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <>
        <footer className="bg-black text-white p-8 lg:p-20 border-t-4 border-black overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-6xl font-black mb-8 font-['Syne'] uppercase">VIBE CHECK.</h2>
            <p className="text-2xl text-[#ccff00] font-bold mb-8 italic">DON'T MISS THE DROP.</p>
            <div className="flex border-4 border-[#ccff00] rounded-full overflow-hidden max-w-md bg-white/5">
              <input 
                type="email" 
                placeholder="YOUR EMAIL..." 
                className="bg-transparent px-6 py-4 flex-1 focus:outline-none font-bold placeholder-gray-500 text-white" 
              />
              <button className="bg-[#ccff00] text-black px-8 py-4 font-black hover:bg-white transition-colors">SEND IT</button>
            </div>
          </div>
          <div>
            <h5 className="font-black text-xl mb-6 text-[#ff007a] uppercase">Guides</h5>
            <ul className="space-y-4 font-bold text-gray-400">
              {['Shipping?', 'Returns?', 'Who are we?', 'Careers?'].map(link => (
                <li key={link}><a href="#" className="hover:text-white transition uppercase">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-black text-xl mb-6 text-[#8b5cf6] uppercase">Socials</h5>
            <div className="flex gap-6">
              {[Instagram, Twitter, User].map((Icon, i) => (
                <motion.a 
                  key={i}
                  whileHover={{ y: -5, color: "#ccff00" }}
                  href="#" 
                  className="text-3xl transition-colors"
                >
                  <Icon size={32} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t-2 border-white/20 text-center font-bold text-gray-500 italic uppercase tracking-widest">
          Keep it real. © 2024 VIBE CHECK. Made for the grid.
        </div>
      </footer>
        </>
    );
};

export default Footer;