"use client"
import "./Skeleton.scss"
const Skeleton = () => {
  return (
    <div  className='border-2 bg-white
    border-solid rounded-[19px] pb-2   sm:w-[310px]  md: w-[340px] lg:[400px] '>
     <div className='text-[#21DA8C] absolute pl-2 font-[550] opacity-60 z-10 border-black text-md skeleton'> 
     </div>
    <div id='article' className='   effect
    drop-shadow-lg 
    items-center
    text-center
     
    w-[90%]
    h-[210px]
     
    flex
    
       justify-center
        
    '
    >
   <div className="w-[260px] h-[100px] skeleton"></div>
   </div>
      
     
      <hr/>
   
   <div className='flex flex-col pl-2  pb-1 justify-center     align-center '>
     <h4 className='text-center font-[540] text-lg skeleton '>
     </h4>
   <div className='flex justify-between'>
     <p className='flex text-[1.1rem] font-medium '> <span id="span" className='font-normal'> price:</span>  </p>
 
   </div>
   </div>
  
   
   </div>
  )
}

export default Skeleton
