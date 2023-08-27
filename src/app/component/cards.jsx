import React from 'react'
import Image from 'next/image'
import "../card.css";

export default function Cards() {
  return (
    <div className='p-2 cursor-pointer'>
     <div className=' w-max border-2
     border-solid rounded-lg'>
     <div id='article' className='  
     drop-shadow-sm 
     items-center
     text-center
     bg-sky-200
     
     w-80 md:w- lg:w-100 h-60
     flex
     hover:bg-transparent
     '
     >
    
      <Image 
      src={'/OIP.png'}
      fill
       priority
       />
    </div>
    
    <div className='flex justify-center font-sans text-2xl md:sm font-semibold'>
    fork lifts
    </div>
    </div>
    </div>
  )
}
