"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import "../card.scss";
import { FaTrash } from 'react-icons/fa';
import MyModal from './Modal';
import FullModal from './FullModal'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
export default function Cards({res,title,price,desc,selected,deleted,setDeleteFile}) {
  const [urls,setUrls] = useState(`/api/uploads/${res}`);
  const [more,setMore] = useState(false);
  const [open,setOpen] = useState(false);
  const [imageOpen,setImageOpen] = useState(false);

  const handleDelete=()=>{
    console.log(res);
    axios(`api/delete/${res}`,{
      method:"DELETE"
    }).then((resp)=>{
      if(resp.status == 200){
      setDeleteFile(res)
      toast.success("Card Deleted", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      }else throw "err"
    }).catch((err)=>{
      toast.success("Error Try again some time", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
  }
  const handleImage=()=>{
    setImageOpen(imageOpen=>!imageOpen)
  }
  // useEffect(()=>{

  //   setUrls(`/api/uploads/${res}`);

  // },[])

// return(
//   <>
//   <div className="product-card">
//     <div className="product-image">
//       <img src={urls} />
//     </div>
//     <div className="product-details">
//       <h1>Product title</h1>
//       <p>
//         Great product title for a great product and all of the extra things a
//         product might need to make it fill an entire card.
//       </p>
//       <button type="button" className="btn">
//         Buy Now
//       </button>
//     </div>
//   </div>
// </>

// )

  return (
    
     <div id={!more?'max-height':'height'} className='         border-2 bg-white
     border-solid rounded-[12px]    sm:w-[310px]  md: w-[340px] lg:[400px] '>
      <div>
      <div className='text-[#21DA8C]  pl-2 font-[550] opacity-60 z-10 border-black text-md flex justify-around items-center m-1'> 
        {selected||''}
       {deleted && <FaTrash onClick={e=>setOpen(open=>!open)} className=' cursor-pointer  text-red-600'/> }  
      </div>
     
      </div>
     <div id='article' onClick={handleImage} className='   effect
     drop-shadow-lg 
     items-center
     text-center
     cursor-pointer
     w-[100%]
     h-[210px]
      
     flex
     
        justify-center
         
     '
     >
    
      <Image  
      src={urls}
      width={260}
      height={100}
      className=' aspect-squre max-w-[250px] max-h-[150px]  object-contain'
      alt={"folk lift image"}

       />
    </div>
       
      
       <hr/>
    
    <div className='flex flex-col pl-2  pb-1 justify-center     align-center '>
      <h4 className='text-center font-[540] text-lg '>

     {title??'Item'}
      </h4>
    <div className='flex justify-between'>
      <p className='flex text-[1.1rem] font-medium '> <span id="span" className='font-normal'> price:</span> ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(price||0)} {selected=="Renatal FolkLift"&&'\\MONTH'} </p>
    {/* {
      desc.trim()&&
    <button onClick={e=>setMore(e=>!e)} className='flex justify-end pr-3 items-center gap-1 cursor-pointer text-[#21DA8C]'>View {more? 'less': 'more'}

    <i class={`arrow ${more? 'up': 'down'}`} />
    </button>
    } */}
    </div>
    
    {/* {more && desc &&
     desc.split("\n").map((e,index)=> e.trim() && <li key={index} className='w-[90%]'>{e}</li>)} */}
    </div>
    <MyModal open={open} setOpen={setOpen} handleDelete={handleDelete}/>
    <FullModal title={title} desc={desc} price={price} open={imageOpen} handleImage={handleImage} url={urls} selected={selected} />
    <ToastContainer
position="bottom-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>

  )
}
