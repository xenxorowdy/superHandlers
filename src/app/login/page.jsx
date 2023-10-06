"use client"
import LoginForm from "../component/login"
import Image from 'next/image';
import { FaCloudUploadAlt, FaExternalLinkAlt, FaTrashAlt } from 'react-icons/fa';
import "../imageResponse.css";
import {signIn,signOut,useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const {data:session} = useSession(); 
  const router = useRouter()
  console.log("session",session)
  if(session){
    return (
      <>



      <div className={"flex gap-14 items-center justify-center "}>
      <p className=" flex text-[#3f4550] font-normal gap-4 text-3xl  align-baseline  items-center w-[240px]">Hello {session?.user?.name}</p> 
      <button  className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2" onClick={async()=>{await signOut(); router.push("/login")}}> Sign Out</button>
      </div>
      <div className='bodycard'>
  
  <a href='/upload' >
  <p className=" flex text-[#3f4550] font-normal gap-4 align-baseline  items-center  w-[240px] text-xl"> <FaCloudUploadAlt className="h-4"/> upload <FaExternalLinkAlt className='h-4 '/> </p>
<figure>
<Image  src={'/wp7388677-forklift-wallpapers.jpg'} className=' aspect-[3/2] w-80 h-40' width={300} height={400} alt="Mountains" />

  <figcaption>Upload</figcaption>
</figure>
  </a>
  <a href='/deleteImage' >

  <p className=" flex text-[#3f4550] font-normal gap-4 align-baseline  items-center   text-xl w-[240px]"><FaTrashAlt className="h-4"/>  delete <FaExternalLinkAlt className='h-4'/> </p>
<figure>

  <Image  src={'/forklift-for-rent.jpg'} className=' aspect-[3/2] w-80 h-40' width={300} height={400} alt="Mountains" />
  <figcaption>Delete</figcaption>

</figure>
</a>

</div>

      
      </>
    )
  }
  return (

    <LoginForm/>

  )
}
