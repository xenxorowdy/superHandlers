'use client'
import React, { useState } from 'react';
import {signIn} from "next-auth/react";
import './login.css'; 
import { useRouter } from 'next/navigation';
// import DeleteImage  from "./DeleteImage"
function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState(false);


  const handleSubmit = async(event) => {
    event.preventDefault();
    setError(false)
    const data = new FormData(event.currentTarget);
    console.log("data",data);
    // console.log('Logging in with:', username, password);
    const signInResponse = await signIn("credentials",{
      email:data.get("email"),
      password:data.get("password"),
      redirect:false
    })
    if(signInResponse && !signInResponse.error){
      console.log("successfull");
      router.push("/login");
    }else{
      console.log("Error:",signInResponse);
      setError(true);
    }


    // const json = {username,userPassword}
    // fetch("/api/checker",{next:{revalidat:5},body:JSON.stringfy(username,password)})

  };
  // return <DeleteImage/>
  return (
    <form className='flex flex-col items-center justify-center gap-3 m-20' onSubmit={handleSubmit}>
    <h1 className='font-bold'>LOGIN</h1>
    {error && <span className=' bg-red-700 rounded-md p-2 text-[#fff]'>Credentials are Incorrect</span>}
    <input type="email" name='email' className='border-2 p-1 rounded-lg' placeholder="Email" />
    <input type="password" name="password" className='border-2 p-1 rounded-lg' placeholder="Password" />
    <button type="submit" className='border-2 rounded-lg px-5 py-1 bg-[#21DA8C] focus:shadow-md hover:bg-[#12e38c] -inset-1'>
      Log In
    </button>
  </form>
  
  )

}
export default LoginForm;
