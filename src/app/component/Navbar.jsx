"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { FaPhoneAlt, FaBars, FaTimes } from 'react-icons/fa';
import "./NavbarStyles.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setClick(false);
    document.body.style.overflow = "unset";
  };

  const toggleMobileMenu = () => {
    setClick(!click);
    if (!click) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={scrolled ? 'nav scrolled' : 'nav'}>
        <Link href="/" className="flex items-center gap-2.5" onClick={closeMobileMenu}>
          <Image
            src="/logo.png"
            width={80}
            height={45}
            className="hover:scale-105 transition-transform duration-300 rounded-lg w-auto h-auto"
            alt="Super Handlers — Forklift Sales, Rentals & Repair"
            priority
            unoptimized
          />
          <span className={`hidden sm:block text-[15px] font-black tracking-tight transition-colors duration-500 leading-tight ${
            scrolled ? 'text-white' : 'text-slate-900'
          }`}>Super<br/><span className="text-[#5ba3b5]">Handlers</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center">
          <ul id="navbar">
            {navLinks.filter(l => l.name !== 'Contact').map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path} 
                  className={pathname === link.path ? 'active' : ''}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+6475730160"
            className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-slate-900 font-semibold text-sm transition-all duration-300 ${
              scrolled
                ? 'hover:font-bold'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <FaPhoneAlt className="text-xs text-[#5ba3b5]" />
            <span>647-573-0160</span>
          </a>
          <Link 
            href="/contact" 
            className={`hidden lg:flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all duration-300 ${
              pathname === '/contact'
              ? 'bg-[#5ba3b5] text-white shadow-lg shadow-[#5ba3b5]/20'
              : scrolled
                ? 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200'
            }`}
          >
            <span>Get Quote</span>
          </Link>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 z-[2001] ${
              click
                ? 'bg-white/15 text-white border border-white/20'
                : scrolled
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'bg-white text-slate-700 border border-slate-200 shadow-sm'
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {click ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay backdrop */}
      <div 
        className={`mobile-overlay${click ? ' open' : ''}`} 
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div className={`mobile-panel${click ? ' open' : ''}`}>
        <div className="flex flex-col h-full w-full relative z-10">
          <div className="flex justify-between items-center mb-12 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" width={120} height={67} alt="Super Handlers" className="rounded-lg w-auto h-auto" unoptimized />
              <span className="text-[#8a95a8] uppercase text-base font-semibold tracking-[0.2em]">MENU</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path} 
                className={`mobile-nav-link text-2xl font-bold py-3 px-3 rounded-xl transition-all duration-300 ${
                  pathname === link.path 
                  ? 'text-[#7ab8c7] bg-white/5 pl-5 border-l-2 border-[#5ba3b5]' 
                  : 'text-[#8a95a8] hover:text-white hover:bg-white/5 hover:pl-5'
                }`} 
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mobile-panel-footer mt-auto pb-10 space-y-5">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/8">
              <p className="text-[10px] font-black text-[#5ba3b5] uppercase tracking-[0.3em] mb-3">Support</p>
              <Link href="tel:+1 647-573-0160" className="text-base font-bold text-[#c8cdd6] flex items-center gap-3 hover:text-white transition-colors">
                <FaPhoneAlt className="text-[#5ba3b5] text-sm" /> +1 647-573-0160
              </Link>
            </div>
            <button 
              onClick={() => { closeMobileMenu(); window.location.href='/contact'; }} 
              className="w-full justify-center py-4 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 active:scale-[0.98] shadow-lg shadow-[#5ba3b5]/20 flex items-center gap-2"
            >
              Request Service
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
