import Image from "next/image"
import "./footer.css"
import {  FaFacebook } from "react-icons/fa";

export default function Footter() {
  return (
    
      <footer className="footer">
        <div className="flex justify-between p-4">

  <div className="container">
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
    </div>
  </div>
  <Image src={"/My project.png"} width={200} height={200} className="  object-contain" />

  </div>
  <hr className=" bg-black"/>
  <h1 className=" text-center relative top-10">Copyright © 2023 superHandlers. All rights reserved.</h1>
</footer>

  )
}
