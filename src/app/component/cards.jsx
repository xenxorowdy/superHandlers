"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import "../card.scss";
export default function Cards({res,title,price,desc,selected}) {
  const [urls,setUrls] = useState(`/api/uploads/${res}`);
  const [more,setMore] = useState(false);

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
     border-solid rounded-[19px] pb-2  sm:w-[310px]  md: w-[340px] lg:[400px] '>
      <div className='text-[#21DA8C] absolute pl-2 font-[550] opacity-60 z-10 border-black text-md'> 
        {selected||''}
      </div>
     <div id='article' className='   effect
     drop-shadow-lg 
     items-center
     text-center
      
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
       />
    </div>
       
      
       <hr/>
    
    <div className='flex flex-col pl-2  pb-1 justify-center     align-center '>
      <h4 className='text-center font-[540] text-lg '>

     {title??'Item'}
      </h4>
    <div className='flex justify-between'>
      <p className='flex text-[1.1rem] font-medium'> <span id="span" className='font-normal'> price:</span> ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(price||0)}</p>
    {
      desc.trim()&&
    <button onClick={e=>setMore(e=>!e)} className='flex justify-end pr-3 items-center gap-1 cursor-pointer text-[#21DA8C]'>View {more? 'less': 'more'}

    <i class={`arrow ${more? 'up': 'down'}`} />
    </button>
    }
    </div>
    
    {more && desc &&
     desc.split("\n").map(e=> e.trim() && <li className='w-[90%]'>{e}</li>)}
    </div>
    
    </div>
  )
}
