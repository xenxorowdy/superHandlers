"use client"
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './page.css';

import { ToastContainer, toast } from 'react-toastify';
// import Input from '../components/Input';

export default function Page() {
  const value = useRef({});
  const [email,setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formfilled,setFormFilled] = useState(false);
  useEffect(() => {
    
    if(email){
     
    const isValidEmail = /\S+@\S+\.\S+/.test(email);

    if (!isValidEmail  ) {
      setErrorMessage("Invalid email address")
    } else  {
      setErrorMessage("") // Clear the error message

    }
  }
  
  }, [email])
  
   
  const webformfill = () => {
    console.log(value.current)
    if(!email) 
    {setErrorMessage("email required");
    return;
  }
    const isValidEmail = /\S+@\S+\.\S+/.test(email)
    if (!isValidEmail  ) {
      setErrorMessage("Invalid email address")
      return;
    }

    fetch("/api/mailsend",{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(value.current)
    })
    .then((res)=>{
      setFormFilled(true)
      toast.success("success", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

        value.current = ''
        // setEmail("")


    }).catch((err)=>{
      toast.error("Failed please try in some time!", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
    toast.info("processing", {
      position: "bottom-left",
      autoClose: 1000,
      theme: "dark",
      });
    // const email = document.getElementById("email")
    // console.log(document.getElementById("name"))
    // console.log("email",email)
  }

  return (
    <>
    <ToastContainer
position="bottom-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <div className=' items-center items-center justify-center  gap-12 p-2  grid md:grid-col-1 lg:grid-cols-2      '>
      { formfilled ?
      <div className='justify-center items-center flex flex-col gap-y-5 border border-spacing-1 p-1 rounded-[18px] bordercolor-[#f7f7f7] h-[500px] text-5xl'>
      form filled <br/>
      we contact to you Soon.... 😊
      </div>
      :
      <div className=" justify-center items-center flex flex-col gap-y-5 border border-spacing-1 p-1 rounded-[18px] bordercolor-[#f7f7f7] ">
        <h1 className=' font-semibold text-2xl underline flex items-center gap-10 md: '>Contact Us:
          <Link href="tel:+1 905-487-6124" className="flex gap-x-6  hover:text-teal-300 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokellinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </Link>

          <Link href="mailto:superhandlers1@gmail.com" className="flex gap-x-3  hover:text-teal-300 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </Link>
        </h1>


        <h1 className='font-bold text-2xl   ' >Lets get in touch</h1>
        <div className="items-center flex flex-col gap-5 " >
          <input type="text" placeholder='Name' className=" className=' border-2 p-1 rounded-lg  " id="name" name="name"  onChange={e => value.current.name = e.currentTarget.value} />
          <input id="contact" type='tel' name='Number' placeholder='Contact Number' className=" className=' border-2 p-1 rounded-lg  " value={value.current.contact} onChange={e => value.current.contact = e.currentTarget.value} />
          <div>
          <input id="email" type='email' name='email' placeholder='Email' className=" className=' border-2 p-1 rounded-lg  " value={email} onChange={e =>{ value.current.email = e.currentTarget.value; setEmail(e.currentTarget.value) }} />
          <p id="error" className=' text-red-700' > {errorMessage} </p>
          </div>
          <input id="interest" type='text' name='Interest' placeholder='Interest' className=" className=' border-2 p-1 rounded-lg  " value={value.current.interest} onChange={e => value.current.interest = e.currentTarget.value} />
          <textarea id="message" placeholder='Your Message' rows={'5'} className=" p-1 w-[220px] border-[2px]  rounded-md    " value={value.current.message} onChange={e => value.current.message = e.currentTarget.value} />
          <button type="submit" className=' inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' onClick={webformfill} >Submit</button>
        </div>
      </div>
}
      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5770.183074298723!2d-79.81591837783648!3d43.68786033821295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b1465db7352cf%3A0xd067ead581ef467d!2s6%20Linderwood%20Dr%2C%20Brampton%2C%20ON%20L7A%201R7%2C%20Canada!5e0!3m2!1sen!2sin!4v1692993949630!5m2!1sen!2sin" height={550} style={{ border: 0, minWidth: "40vw" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> */}
      
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.1535165402033!2d-79.7024688893458!3d43.68657175015284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3e5e6da4d927%3A0x875f2ef3a8c94acc!2s241%20Advance%20Blvd%2C%20Brampton%2C%20ON%20L6T%204J2%2C%20Canada!5e0!3m2!1sen!2sjp!4v1696132339456!5m2!1sen!2sjp" height={550} style={{ border: 0, minWidth: "40vw" }} allowFullScreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <ToastContainer
position="bottom-left"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
    </>
  )
}
