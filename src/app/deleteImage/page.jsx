"use client"
import React,{useState,useEffect} from 'react'
import Skeleton from "../component/Skeleton";
import Cards from '../component/cards';
import { useRouter } from 'next/navigation';
import {useSession} from "next-auth/react";

const DeleteImage = () => {
  const {data:session} = useSession(); 
  const router = useRouter();
  const [result ,setResult] = useState([]);
  const [loading,setLoading] = useState(true)
  const [deleteFile,setDeleteFile] = useState(null); 
  
  const getAllName=async()=>{
    const result = await fetch("/api/getName", {next:{revalidate:1},method:'post',body:{data:JSON.stringify(Math.random())}});
    const res = await result.json()
    setResult(res?.result);
    setLoading(false)
  }
  
  useEffect(()=>{
    if(!session){
      router.push("/login")
      return;
    }
    setLoading(true)
    getAllName();
  },[session, router])

  useEffect(()=>{
    setResult( pre=>pre.filter(e=>e.filename!=deleteFile))
  },[deleteFile])

  return (
    <div className='pt-[102px] px-10' >
         <div style={{gridTemplateColumns:"repeat(auto-fit, minmax(310px,1fr))",display:"grid",gap:"20px",padding:"0px px 0px 12px",minHeight:"250px!important",paddingBottom:"16px" , justifyItems:"center",paddingTop:"1%" }}>
      { loading ? Array(20).fill(null).map((e,index)=><Skeleton key={index}/>)  :
      
      result.map(e=><Cards key={e.filename} res={e.filename} price={e.metadata?.price} title={e.metadata?.title } desc={e.metadata?.description??''} selected={e.metadata?.selected} deleted={true} setDeleteFile={setDeleteFile} />)}
    
      {/* <Cards/> */}
     </div>    

   
    </div>
  )
}

export default DeleteImage
