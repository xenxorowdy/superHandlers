'use client'
import React, { useState } from 'react';

import './login.css'; // Import your CSS file
// import DeleteImage  from "./DeleteImage"
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShown, setIsSHown] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with:', username, password);
    // const json = {username,userPassword}
    // fetch("/api/checker",{next:{revalidat:5},body:JSON.stringfy(username,password)})
    setUsername('');
    setPassword('');
  };
  // return <DeleteImage/>
  return (
    
    <div className='flex flex-col  items-center justify-center gap-3 m-20' >
      <h1 className='font-bold'> LOGIN </h1>
       <input type="text"  value={username}  onChange={handleUsernameChange} className=' border-2 p-1 rounded-lg  ' placeholder="Username"/>
    <input type={'password'}  value={password} onchange={handlePasswordChange} className=' border-2 p-1 rounded-lg  ' placeholder="Password"/>
    {/* <i class="w-2 divide-black " id="togglePassword"></i> */}

    <button onClick={handleSubmit} className=' border-2 rounded-lg px-5 py-1 bg-[#21DA8C] hover:bg-[#12e38c]  -inset-1  ' >Login</button>
    </div>
  )

}
export default LoginForm;
