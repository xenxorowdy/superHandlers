import Image from "next/image"
import "./footer.css"
import {  FaFacebook, FaMapMarked, FaPhone } from "react-icons/fa";
import Link from "next/link";

export default function Footter() {
  return (
    
      <footer className="footer">
        <div className="flex justify-between p-4 flex-row-reverse  md:gap-0 lg:gap-40">

  <div className="container w-[75%]">
    <div className="row">
      <div className="footer-col">
        <h4>company</h4>
        <ul>
          <li>
            <a href="/about">about us</a>
          </li>
          <li>
            <a href="/shop">shop</a>
          </li>
          <li>
            <a href="/contact">contact us</a>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>follow us</h4>
        <div className="social-links">
          <a href="https://www.facebook.com/Shandlers/" target="_blank">
          <FaFacebook className="fixwind"  />
          
          </a>
        {/* //   <a href="#">
        //     <i className="fab fa-twitter" />
        //   </a>
        //   <a href="#">
        //     <i className="fab fa-instagram" />
        //   </a>
        //   <a href="#">
        //     <i className="fab fa-linkedin-in" />
        //   </a> */}
        </div>
      </div>
      <div className="footer-col">
        <h4>ADDRESS</h4>
       <ul> 
        <a className="flex gap-1 items-start align-baseline text-[#bbbbbb] cursor-pointer" href="https://maps.app.goo.gl/ZufwDGCdrLqQB7QJ6" target="_blank">
         <FaMapMarked className="w-[50px]"/> 241 Advance Blvd
    Brampton, ON L6T 4J2, Canada
    </a> 
       </ul>
      </div>
      <div className="footer-col">
        <h4>PHONE</h4>
       <ul> 
        <Link href="tel:+1 905-487-6124" className="flex gap-1 items-start align-baseline text-[#bbbbbb] cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-5 h-5">
  <path strokeLlinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
</svg>
<span >
+1 905-487-6124
</span>
</Link>
       </ul>
       <ul>
       <Link href="mailto:superhandlers1@gmail.com" className="flex gap-1 items-start align-baseline text-[#bbbbbb] cursor-pointer">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
</svg>
<span >
superhandlers1@gmail.com
</span>
</Link>
       </ul>
      </div>
    </div>
  </div>
  <Image src={"/My project.png"} width={200} height={200} className=" w-[25%] object-contain" alt='myprojectlogo' />

  </div>
  <hr className=" text-[#fff]"/>
  <h1 className=" text-center relative top-10">Copyright © 2023 superHandlers. All rights reserved.</h1>
</footer>

  )
}
