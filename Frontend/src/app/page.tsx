"use client";

import { client } from "@/sanity";
import Image from "next/image";
import Link from "next/link"; 
import { FaShoppingCart, FaArrowRight } from "react-icons/fa"; 
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const getData = async () => {
  const query = `*[_type == "category"]{
    _id,
    title,
    "imageUrl": image.asset->url
  }`;
  return await client.fetch(query);
};

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    getData().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white selection:bg-orange-500 selection:text-white overflow-x-hidden font-sans">
      
      {/* --- HERO SECTION --- */}
      <section ref={targetRef} className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        {/* Floating Images */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ y, opacity }} className="absolute top-20 -left-10 md:left-10 w-64 md:w-[500px] z-0">
             <Image src="/burger.png" alt="Burger" width={900} height={700} className="drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]" />
          </motion.div>
          <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }} className="absolute bottom-10 -right-10 md:right-0 w-56 md:w-[450px] z-0">
             <Image src="/pizza.png" alt="Pizza" width={450} height={450} className="drop-shadow-2xl animate-[float_7s_ease-in-out_infinite_1s]" />
          </motion.div>
          
          {/* Other Decorative Icons */}
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="absolute top-1 right -100 md:right-10 w-24 md:w-36 z-0">
             <Image src="/chicken.png" alt="Chicken" width={200} height={200} className="drop-shadow-xl animate-[float_5s_ease-in-out_infinite_2s]" />
          </motion.div>
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="absolute bottom-1/4 left-5 md:left-20 w-20 md:w-32 z-0">
             <Image src="/fries.png" alt="Fries" width={500} height={500} className="drop-shadow-xl animate-[float_8s_ease-in-out_infinite_0.5s]" />
          </motion.div>
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="absolute top-24 right-10 md:right-40 w-16 md:w-28 z-0">
             <Image src="/coke.png" alt="Coke" width={150} height={150} className="drop-shadow-lg animate-[float_6s_ease-in-out_infinite_1.5s]" />
          </motion.div>
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} className="absolute bottom-10 left-20 md:left-60 w-24 md:w-36 z-0">
             <Image src="/hotdog.png" alt="Hotdog" width={400} height={400} className="drop-shadow-lg animate-[float_7s_ease-in-out_infinite_2.5s] rotate-12" />
          </motion.div>
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} className="absolute top-25 left-[1%] w-20 md:w-32 z-0 opacity-80">
             <Image src="/taco.png" alt="Taco" width={150} height={150} className="drop-shadow-lg animate-[float_9s_ease-in-out_infinite_0.2s] -rotate-12" />
          </motion.div>
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.8, duration: 1 }} className="absolute bottom-10 right-[30%] w-20 md:w-32 z-0 opacity-80">
             <Image src="/sandwich.png" alt="Sandwich" width={150} height={150} className="drop-shadow-lg animate-[float_8s_ease-in-out_infinite_3s] rotate-6" />
          </motion.div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Fastest Delivery in 20 Mins</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black mb-6 leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              CRAVING <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">REAL FOOD?</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light">
              Experience the taste of perfection. Premium ingredients, world-class chefs, delivered hot to your doorstep.
            </p>
            
        
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/menu">
                <button className="group relative px-8 py-4 bg-orange-600 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)]">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative flex items-center gap-2">Order Now <FaShoppingCart/></span>
                </button>
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* --- CATEGORIES SECTION --- */}
      <section className="relative py-32 px-6 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore <span className="text-orange-500">Categories</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">Select a category to view our delicious menu items.</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category: any, idx) => (
              
     
              <Link 
                href={`/menu?category=${category.title}`} 
                key={category._id}
                className="block w-full"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative h-80 w-full rounded-[30px] overflow-hidden cursor-pointer border border-white/5 hover:border-orange-500/50 transition-all"
                >
                  {/* Category Image */}
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">No Image</div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-orange-900/80 transition-all duration-500"></div>

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-wide">{category.title}</h3>
                    <div className="flex items-center gap-2 text-orange-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>View Items</span>
                      <FaArrowRight />
                    </div>
                  </div>

                  {/* Fresh Badge */}
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white">
                    Fresh
                  </div>

                </motion.div>
              </Link>
            ))}
          </div>

          {categories.length === 0 && (
             <div className="text-center py-20 text-gray-500">
              <p className="text-xl">Loading Categories...</p>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
      `}</style>
    </main>
  );
}