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
    <p1 className='font-bold'>LOGIN</p1>
    {error && <span className=' bg-red-700 rounded-md p-2 text-[#fff]'>Credentials are Incorrect</span>}
    <input type="email" name='email' className='border-2 p-1 rounded-lg' placeholder="Email" />
    <input type="password" name="password" className='border-2 p-1 rounded-lg' placeholder="Password" />
    <button type="submit" className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'>
      Log In
    </button>
  </form>
  
  )

}
export default LoginForm;
