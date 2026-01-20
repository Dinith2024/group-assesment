"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTruck, FaLeaf, FaAward, FaUsers } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white font-sans selection:bg-orange-500 selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">About Us</span>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              More Than Just <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Delicious Food</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              We started Vision Food with a simple mission: to deliver the authentic taste of premium ingredients directly to your doorstep, faster than anyone else.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Story Section (Image + Text) */}
      <section className="py-20 px-6 bg-[#151515]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          
      
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
             
              <Image 
                src="/burger.png" 
                alt="Our Story"
                fill
                className="object-contain drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
              />
            </div>
            {/* Decoration Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">We Cook With <span className="text-orange-500">Passion</span></h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              At Vision Food, quality isn't just a word; it's our promise. Our chefs select only the freshest local ingredients every morning. From the crisp vegetables to the premium meats, everything is chosen with care.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Whether you're craving a cheesy pizza, a juicy burger, or a refreshing drink, we guarantee a taste that will make you come back for more.
            </p>
            
            <div className="flex gap-4">
              <div className="text-center p-4 bg-[#222] rounded-2xl border border-white/5 w-1/3">
                <h3 className="text-3xl font-bold text-orange-500">5k+</h3>
                <p className="text-xs text-gray-400 mt-1 uppercase">Happy Clients</p>
              </div>
              <div className="text-center p-4 bg-[#222] rounded-2xl border border-white/5 w-1/3">
                <h3 className="text-3xl font-bold text-orange-500">20+</h3>
                <p className="text-xs text-gray-400 mt-1 uppercase">Expert Chefs</p>
              </div>
              <div className="text-center p-4 bg-[#222] rounded-2xl border border-white/5 w-1/3">
                <h3 className="text-3xl font-bold text-orange-500">15m</h3>
                <p className="text-xs text-gray-400 mt-1 uppercase">Fast Delivery</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Why Choose Us (Features) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-orange-500">Vision Food?</span></h2>
            <p className="text-gray-400">We are dedicated to providing the best service in town.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
               whileHover={{ y: -10 }}
               className="bg-[#1a1a1a] p-8 rounded-[30px] border border-white/5 text-center group hover:border-orange-500/30 transition-all"
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 text-2xl mx-auto mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <FaTruck />
              </div>
              <h3 className="text-xl font-bold mb-3">Super Fast Delivery</h3>
              <p className="text-gray-400 text-sm">We ensure your food arrives hot and fresh within 20 minutes of ordering.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
               whileHover={{ y: -10 }}
               className="bg-[#1a1a1a] p-8 rounded-[30px] border border-white/5 text-center group hover:border-orange-500/30 transition-all"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 text-2xl mx-auto mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <FaLeaf />
              </div>
              <h3 className="text-xl font-bold mb-3">Fresh Ingredients</h3>
              <p className="text-gray-400 text-sm">We use 100% organic and fresh ingredients sourced directly from local farmers.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
               whileHover={{ y: -10 }}
               className="bg-[#1a1a1a] p-8 rounded-[30px] border border-white/5 text-center group hover:border-orange-500/30 transition-all"
            >
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 text-2xl mx-auto mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                <FaAward />
              </div>
              <h3 className="text-xl font-bold mb-3">Best Quality</h3>
              <p className="text-gray-400 text-sm">Our world-class chefs maintain the highest hygiene and quality standards.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-600 to-red-600 rounded-[40px] p-10 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Taste the Best?</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">Order now and get 20% off on your first delivery. Don't miss out on the flavor explosion!</p>
            <Link href="/menu">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-transform hover:scale-105 shadow-xl">
                Order Now
              </button>
            </Link>
          </div>
          
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        </div>
      </section>

    </main>
  );
}