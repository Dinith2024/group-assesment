"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaTiktok, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  
  const socialLinks = [
    { icon: FaFacebookF, url: "#", name: "Facebook", hoverColor: "hover:bg-[#1877F2]" },
    { icon: FaInstagram, url: "#", name: "Instagram", hoverColor: "hover:bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" },
    { icon: FaWhatsapp, url: "https://wa.me/94771234567", name: "WhatsApp", hoverColor: "hover:bg-[#25D366]" },
    { icon: FaYoutube, url: "#", name: "YouTube", hoverColor: "hover:bg-[#FF0000]" },
    { icon: FaTiktok, url: "#", name: "TikTok", hoverColor: "hover:bg-black hover:border hover:border-white/20" },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter flex items-center gap-2">
              VISION<span className="text-orange-500">FOOD</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the best food delivery service in town. Fresh ingredients, hot meals, and super fast delivery right to your doorstep.
            </p>
            {/* Social Icons Row */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 transition-all duration-300 ${social.hoverColor} hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/20`}
                  title={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Menu', 'Aboutt', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item === 'Home' ? '' : item.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 group text-sm">
                    <FaArrowRight className="text-xs opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Opening Hours */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Opening Hours</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Mon - Fri</span>
                <span className="text-white font-bold">8:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Saturday</span>
                <span className="text-white font-bold">9:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Sunday</span>
                <span className="text-orange-500 font-bold">Closed</span>
              </li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-orange-500 flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Address</h4>
                  <p className="text-xs text-gray-400">Malabe, Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-orange-500 flex-shrink-0">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Phone</h4>
                  <p className="text-xs text-gray-400">+94 77 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-orange-500 flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Email</h4>
                  <p className="text-xs text-gray-400">hello@visionfood.lk</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-orange-500 font-bold">VISIONFOOD</span>. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}