'use client'
import React,{useState} from 'react'
import LoginForm from '../component/login'
import ImageUploader from '../component/upload'

export default function Upload() {
 

  return (
    
    <div className='flex flex-col gap-2 justify-center  items-center m-2'>

    {/* <LoginForm/> */}
    <ImageUploader/>
    

    </div>

  )
}
