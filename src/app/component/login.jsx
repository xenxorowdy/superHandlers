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
    <div className='login-container pt-32 pb-32 relative'>
      <div className="bg-orb bg-orb-1 opacity-20"></div>
      <div className="bg-orb bg-orb-2 bottom-0 left-0 opacity-10"></div>
      
      <form className='login-glass flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <h2 className='gradient-text'>LOGIN</h2>
        <p>Access the Super Handlers Admin Dashboard</p>
        
        {error && <div className='error-badge mb-6'>Invalid Credentials. Access Denied.</div>}
        
        <div className="login-input-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name='email' 
            placeholder="admin@superhandlers.com" 
            required
          />
        </div>
        
        <div className="login-input-group">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="••••••••" 
            required
          />
        </div>
        
        <button type="submit" className='btn-primary login-btn w-full mt-6 shadow-sky-500/20'>
          Log In Securely
        </button>
      </form>
    </div>
  )
}
export default LoginForm;
