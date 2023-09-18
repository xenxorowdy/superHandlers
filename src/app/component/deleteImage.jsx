"use client"

import { useEffect, useState } from "react";
// import Skeleton from "./Skeleton.jsx";

function DeleteImage() {
    const [result,setResult] = useState([]);
    const [loading,setLoading] = useState(true);
    const getAllName=async()=>{
        const result = await fetch("/api/getName", {next:{revalidate:5},method:'post',body:{data:JSON.stringify(Math.random())}});
        const res = await result.json()
        setResult(res?.result);
        setLoading(false)
    }
    useEffect(()=>{
        getAllName()
    },[])
    const arry = Array(20).fill(null)
  return (
    <div>
    
        {/* <Skeleton/> */}
      {/* {arry.map((e,index)=> <Skeleton key={index}/> )} */}
    </div>
  )
}

export default DeleteImage
