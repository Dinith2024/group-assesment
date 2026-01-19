"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-4 shadow-lg border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 relative flex items-center justify-between h-10">
        
        {/* ⭐ LOGO (Left Side) ⭐ */}
        <Link href="/" className="relative z-10 text-2xl md:text-3xl font-black tracking-tighter text-white flex items-center gap-2 group">
           <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-xl group-hover:rotate-12 transition-transform">🍔</div>
           <span>VISION<span className="text-orange-500">FOOD</span></span>
        </Link>

      
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <ul className="flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/5 backdrop-blur-sm">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-sm font-bold uppercase tracking-wider transition-all relative hover:text-orange-500 ${
                    pathname === link.href ? "text-orange-500" : "text-gray-300"
                  }`}
                >
                  {link.name}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

 
        <div className="w-10"></div> 

      </div>
    </nav>
  );
}