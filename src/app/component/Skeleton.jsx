"use client"
import "./Skeleton.scss"
const Skeleton = () => {
  return (
    <div className='glass-card pb-2 sm:w-[310px] md:w-[340px] lg:w-[400px]'>
      <div className='h-4 w-24 mx-auto mt-2 skeleton rounded-md'></div>
      <div id='article' className='effect items-center text-center w-[90%] h-[210px] flex justify-center mx-auto'>
        <div className="w-[245px] h-[150px] skeleton rounded-lg"></div>
      </div>

      <hr className="border-white/10" />

      <div className='flex flex-col pl-2 pb-1 justify-center align-center'>
        <h4 className='text-center font-medium text-lg skeleton h-5 w-3/4 mx-auto mt-2 rounded-md'></h4>
        <div className='flex justify-between mt-2'>
          <p className='flex text-[1.1rem] font-medium text-[#94a3b8]'>
            <span id="span" className='font-normal'>price:</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
