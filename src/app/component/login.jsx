'use client'
import React, { useState } from 'react';
import './login.css'; // Import your CSS file

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with:', username, password);
    const json = {username,userPassword}
    fetch("/api/checker",{next:{revalidat:5},body:JSON.stringfy(username,password)})
    setUsername('');
    setPassword('');
  };

  return (
    <form class="login">
    <input type="text" onChange={handleUsernameChange} placeholder="Username">
    <input type="password" onchange={handlePasswordChange} placeholder="Password">
    <button onClick={handleSubmit} >Login</button>
  </form>
  );
}

export default LoginForm;
