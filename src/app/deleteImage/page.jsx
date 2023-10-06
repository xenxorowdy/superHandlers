"use client"
import React,{useState,useEffect} from 'react'
import Skeleton from "../component/Skeleton";
import Cards from '../component/cards';
import MyModal from '../component/Modal';
import { useRouter } from 'next/navigation';
import {useSession} from "next-auth/react";

const DeleteImage = () => {
  const {data:session} = useSession(); 

  const router = useRouter();
  
  if(!session){
    router.push("/login")
  }
    const [result ,setResult] = useState([]);
    const [loading,setLoading] = useState(true)
    const [deleteFile,setDeleteFile] = useState(null); 
    const handleOptionChange =(event)=>{
      setSelected(event.target?.value)
    }
    const getAllName=async()=>{
      const result = await fetch("/api/getName", {next:{revalidate:5},method:'post',body:{data:JSON.stringify(Math.random())}});
      const res = await result.json()
      setResult(res?.result);
      setLoading(false)
    }
    useEffect(()=>{
      setLoading(true)
       getAllName();
    },[])
    useEffect(()=>{
      setResult( pre=>pre.filter(e=>e.filename!=deleteFile))
    },[deleteFile])
  return (
    <div className='m-[16px]' >
         <div style={{gridTemplateColumns:"repeat(auto-fit, minmax(310px,1fr))",display:"grid",gap:"30px",padding:"0px px 0px 12px",minHeight:"250px!important",paddingBottom:"16px" , justifyItems:"center" }}>
      { loading ? Array(20).fill(null).map((e,index)=><Skeleton key={index}/>)  :
      
      result.map(e=><Cards key={e.filename} res={e.filename} price={e.metadata?.price} title={e.metadata?.title } desc={e.metadata?.description??''} selected={e.metadata?.selected} deleted={true} setDeleteFile={setDeleteFile} />)}
    
      {/* <Cards/> */}
     </div>    

   
    </div>
  )
}

export default DeleteImage
