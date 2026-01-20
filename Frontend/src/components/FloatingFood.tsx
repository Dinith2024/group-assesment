"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FloatingFood() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      

      <motion.div
        animate={{ 
          y: [0, -20, 0], 
          rotate: [0, 5, -5, 0] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-5 md:left-20 opacity-90 w-24 h-24 md:w-40 md:h-40"
      >
        <Image 
          src="/burger.png" 
          alt="Floating Burger"
          fill
          className="object-contain drop-shadow-2xl"
        />
      </motion.div>

  
      <motion.div
        animate={{ 
          y: [0, 30, 0], 
          rotate: [0, -10, 10, 0] 
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 1 
        }}
        className="absolute top-1/3 right-5 md:right-20 opacity-90 w-28 h-28 md:w-48 md:h-48"
      >
        <Image 
          src="/pizza.png" 
          alt="Floating Pizza"
          fill
          className="object-contain drop-shadow-2xl"
        />
      </motion.div>


      <motion.div
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 2 
        }}
        className="absolute bottom-20 left-10 opacity-90 w-20 h-20 md:w-32 md:h-32"
      >
         <Image 
          src="/coke.png" 
          alt="Floating Drink"
          fill
          className="object-contain drop-shadow-2xl"
        />
      </motion.div>

    </div>
  );
}