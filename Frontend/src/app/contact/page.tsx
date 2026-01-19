"use client";

import React, { useState } from "react";
import { client } from "@/sanity"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, 
  FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaTiktok, 
  FaStar, FaPaperPlane, FaCheckCircle 
} from "react-icons/fa";


const sanityToken = process.env.NEXT_PUBLIC_SANITY_TOKEN;

export default function ContactPage() {
  
  // Form Data States
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Social Links
  const socialLinks = [
    { icon: FaFacebookF, url: "#", name: "Facebook", color: "bg-[#1877F2]" },
    { icon: FaInstagram, url: "#", name: "Instagram", color: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" },
    { icon: FaWhatsapp, url: "#", name: "WhatsApp", color: "bg-[#25D366]" },
    { icon: FaTiktok, url: "#", name: "TikTok", color: "bg-black border border-white/20" },
    { icon: FaYoutube, url: "#", name: "YouTube", color: "bg-[#FF0000]" },
  ];

  // Feedbacks (Static Display)
  const feedbacks = [
    { name: "Kasun P.", comment: "Best Burger in town! 🍔", rating: 5, img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Amaya S.", comment: "Pizza was super cheesy 🍕", rating: 5, img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Dilshan K.", comment: "Fast delivery service 🚀", rating: 4, img: "https://randomuser.me/api/portraits/men/86.jpg" },
  ];

  // ⭐ Send Message Function ⭐
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
  
    if (!sanityToken) {
      alert("Error: Missing API Token. Check .env.local");
      return;
    }

    setIsSubmitting(true);

    const messageDoc = {
      _type: 'feedback', 
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      await client.withConfig({ token: sanityToken }).create(messageDoc);
      
      // Success
      setFormData({ name: "", email: "", message: "" }); 
      setNotification("Message Sent Successfully! 📨");
      setTimeout(() => setNotification(null), 4000);

    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090909] text-white font-sans selection:bg-orange-500 selection:text-white pb-20 overflow-x-hidden">
      
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-green-400"
          >
            <FaCheckCircle className="text-xl" />
            <span className="font-bold">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-10 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
           <h1 className="text-5xl md:text-7xl font-black mb-4">
             Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Touch</span>
           </h1>
           <p className="text-gray-400 text-lg max-w-xl mx-auto">
             We love to hear from you. Chat with us on social media or send a message!
           </p>
        </motion.div>
      </section>

      {/* Social Icons */}
      <section className="px-6 mb-16 relative z-10">
         <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
            {socialLinks.map((social, idx) => (
               <motion.a 
                 key={idx} href={social.url} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} whileHover={{ scale: 1.1, y: -5 }}
                 className={`${social.color} w-16 h-16 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg shadow-white/5 cursor-pointer`}
               >
                  <social.icon />
               </motion.a>
            ))}
         </div>
      </section>

      {/* Form & Info Section */}
      <section className="px-6 max-w-7xl mx-auto mb-20 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: Info */}
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="space-y-8">
               <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-8 rounded-[30px] border border-white/10 flex items-center gap-6 group hover:border-orange-500/50 transition-all">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 text-2xl group-hover:bg-orange-500 group-hover:text-white transition-all"><FaPhoneAlt /></div>
                  <div><h3 className="text-gray-400 font-bold uppercase text-xs tracking-wider">Call Us</h3><p className="text-2xl font-bold text-white">+94 77 123 4567</p></div>
               </div>
               <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-8 rounded-[30px] border border-white/10 flex items-center gap-6 group hover:border-blue-500/50 transition-all">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 text-2xl group-hover:bg-blue-500 group-hover:text-white transition-all"><FaEnvelope /></div>
                  <div><h3 className="text-gray-400 font-bold uppercase text-xs tracking-wider">Email Us</h3><p className="text-xl font-bold text-white">hello@visionfood.lk</p></div>
               </div>
               <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-8 rounded-[30px] border border-white/10 flex items-center gap-6 group hover:border-green-500/50 transition-all">
                  <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 text-2xl group-hover:bg-green-500 group-hover:text-white transition-all"><FaMapMarkerAlt /></div>
                  <div><h3 className="text-gray-400 font-bold uppercase text-xs tracking-wider">Location</h3><p className="text-xl font-bold text-white">Malabe, Sri Lanka</p></div>
               </div>
            </motion.div>

            {/* Right: Functional Form */}
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="bg-[#161616] p-10 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[60px]"></div>

               <h2 className="text-3xl font-bold mb-8">Send Message 💬</h2>
               
               <form onSubmit={handleSendMessage} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                        <input required type="text" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all" placeholder="Savindu" 
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                        <input required type="email" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all" placeholder="example@gmail.com" 
                          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                     <textarea required rows={4} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-all resize-none" placeholder="How can we help?"
                       value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>
                  <button disabled={isSubmitting} className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                     {isSubmitting ? "Sending..." : "Send Now"} <FaPaperPlane />
                  </button>
               </form>
            </motion.div>
         </div>
      </section>

      {/* Map */}
      <section className="px-6 max-w-7xl mx-auto mb-20 relative z-10">
         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[30px] overflow-hidden h-[400px] border border-white/10 shadow-2xl grayscale invert contrast-125">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.564366952!2d79.78616429683917!3d6.92200198083818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1705999999999!5m2!1sen!2slk" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
         </motion.div>
      </section>

      {/* Marquee Feedbacks */}
      <section className="mb-10 relative z-10 overflow-hidden">
         <h2 className="text-3xl font-bold text-center mb-10">Customer <span className="text-orange-500">Love</span> 🧡</h2>
         <div className="relative w-full flex overflow-hidden mask-gradient">
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#090909] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#090909] to-transparent z-10 pointer-events-none"></div>
            <motion.div className="flex gap-6 whitespace-nowrap" animate={{ x: "-50%" }} transition={{ repeat: Infinity, ease: "linear", duration: 20 }}>
               {[...feedbacks, ...feedbacks].map((item, idx) => (
                  <div key={idx} className="w-[350px] bg-[#1a1a1a] p-8 rounded-[30px] border border-white/5 relative flex-shrink-0">
                     <div className="absolute top-6 right-8 text-4xl text-white/10 font-serif">"</div>
                     <div className="flex items-center gap-4 mb-4">
                        <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full border-2 border-orange-500" />
                        <div><h4 className="font-bold">{item.name}</h4><div className="flex text-yellow-500 text-xs">{[...Array(item.rating)].map((_, i) => <FaStar key={i} />)}</div></div>
                     </div>
                     <p className="text-gray-400 text-sm italic whitespace-normal">"{item.comment}"</p>
                  </div>
               ))}
            </motion.div>
         </div>
      </section>

    </main>
  );
}