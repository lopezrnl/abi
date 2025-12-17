import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion

const Welcome = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleEnter = () => {
    if (password === "abigailc.") {
      navigate("/app/diary");
    } else {
      setError(true);
      setPassword(""); 
    }
  };

  // Animation settings for the floating effect
  const floatingAnimation = {
    y: ["-10px", "10px"],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative h-screen bg-[#faf9f6] flex items-center justify-center p-6 overflow-hidden">
      
      {/* Decorative Image 1 - Top Left */}
      <motion.div 
        animate={floatingAnimation}
        className="absolute top-[10%] left-[10%] w-32 h-44 md:w-48 md:h-64 opacity-60 hidden sm:block"
      >
        <img 
          src="/48.jpeg" 
          alt="decoration"
          className="w-full h-full object-cover rounded-2xl shadow-sm grayscale hover:grayscale-0 transition-all duration-700"
        />
      </motion.div>

      {/* Decorative Image 2 - Bottom Right */}
      <motion.div 
        animate={{
          y: ["10px", "-10px"], // Moves opposite to the first one
          transition: { duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }}
        className="absolute bottom-[10%] right-[10%] w-32 h-44 md:w-48 md:h-64 opacity-60 hidden sm:block"
      >
        <img 
          src="/58.jpeg" 
          alt="decoration"
          className="w-full h-full object-cover rounded-2xl shadow-sm grayscale hover:grayscale-0 transition-all duration-700"
        />
      </motion.div>

      <div className="z-10 max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-1000">
        <div className="space-y-2">
          <h1 className="text-6xl font-serif italic text-stone-800">Abigail</h1>
          <p className="text-stone-400 uppercase tracking-[0.3em] text-xs">Private Digital Archive</p>
        </div>
        
        <div className="h-[1px] w-12 bg-rose-300 mx-auto"></div>
        
        <p className="text-stone-500 italic font-serif leading-relaxed px-4">
          "Collecting moments, thoughts, and the small things that make life feel intentional."
        </p>

        <div className="space-y-4 max-w-xs mx-auto">
          <input
            type="password"
            placeholder="Enter Passcode"
            value={password}
            onKeyDown={(e) => e.key === 'Enter' && handleEnter()} // Added: Press Enter to submit
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            className={`w-full bg-transparent border-b transition-colors duration-300 py-2 text-center outline-none font-serif 
              ${error ? 'border-rose-400 text-rose-400' : 'border-stone-200 focus:border-stone-400 text-stone-800'}`}
          />
          {error && <p className="text-[10px] uppercase tracking-widest text-rose-400">Access Denied</p>}
        </div>

        <button 
          onClick={handleEnter}
          className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden font-medium tracking-tighter text-white bg-stone-800 rounded-full"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-rose-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="relative uppercase text-xs tracking-[0.2em]">Enter Space</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;