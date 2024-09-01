'use client'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React from 'react';
import ImageUploader from '../component/upload';
export default function Upload() {
  const { data: session } = useSession();

  const router = useRouter();

  if (!session) {
    router.push("/login")
  }

  return (

    <div className='flex flex-col gap-2 justify-center  items-center m-2'>

      {/* <LoginForm/> */}
      <ImageUploader />


    </div>

  )
}
