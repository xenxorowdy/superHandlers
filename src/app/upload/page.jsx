'use client'
import React,{useState} from 'react'
import ImageUploader from '../component/upload'
import { useRouter } from 'next/navigation';
import {useSession} from "next-auth/react";
export default function Upload() {
    const {data:session} = useSession(); 
  
    const router = useRouter();
    
    if(!session){
      router.push("/login")
    }

  return (
    
    <div className='flex flex-col gap-2 justify-center  items-center m-2'>

    {/* <LoginForm/> */}
    <ImageUploader/>
    

    </div>

  )
}
