// import { Component } from "react";
"use client";
import {  useEffect, useState } from "react";
import "./NavbarStyles.css";
import Image from 'next/image'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { FaFacebook } from "react-icons/fa";


const Navbar = ()=> {
  
    
//   state = { clicked: false };
    const [state,SetState] = useState(false);
    const [scrolled, setScrolled] = useState(false);
  const handleClick = () => {
    SetState(pre=>!pre)
    // this.setState({ clicked: !state });
  };

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Add a class when the user scrolls down
        setScrolled(true);
      } else {
        // Remove the class when the user scrolls to the top
        setScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
    return (
      <>
        <nav className={scrolled ? 'scrolled' : ''} >
          <Link href="/">
            
            <Image
              src='/logo.png'
              alt="super logo"
            //   className="dark:invert"
              
              width={50}
              height={50}
              className=" !w-fit"
              priority
            />
          </Link>
          <Link href="tel:+1 905-487-6124" className="flex gap-x-3 text-black hover:text-teal-300 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokellinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
</svg>
<span id='pc'>
+1 905-487-6124
</span>
</Link>

<Link href="mailto:superhandlers1@gmail.com" className="flex gap-x-3 text-black hover:text-teal-300 font-semibold">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
</svg>
<span id='pc'>
superhandlers1@gmail.com
</span>
</Link>

          <div className="">
            <ul
              id="navbar"
              className={`${state ? "#navbar active " : "#navbar "} ${scrolled?"scrollcolor":"color"}` }
            >
              <li>
                <Link onClick={handleClick} className={usePathname() === '/' ?  "active" : undefined} href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={handleClick} className={usePathname() === '/shop' ?  "active" : undefined } href="shop">Shop</Link>
              </li>
              {/* <li>
                <Link onClick={handleClick} className={usePathname() === '/blog' ?  "active" : undefined } href="blog">Blog</Link>
              </li> */}
              <li>
                <Link onClick={handleClick} className={usePathname() === '/about' ?  "active" : undefined } href="/about">About</Link>
              </li>
              <li>
                <Link onClick={handleClick} className={usePathname() === '/contact' ?  "active" : undefined } href="contact">Contact</Link>
              </li>
              <li>
              <Link onClick={handleClick} href="https://www.facebook.com/Shandlers/" target="_blank">
              <FaFacebook className="h-21"/>
</Link>
              </li>
            </ul>
            
          </div>

          <div id="mobile" onClick={handleClick}>
          { !state?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

}

            <i
              id="bar"
              className={state ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
        </nav>
      </>
    );
  
}

export default Navbar;
