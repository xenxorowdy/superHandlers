'use client'
import Image from 'next/image';
import { useState } from 'react';
import BrandsEffect from './component/BrandsEffect';
import "./imageResponse.css";
import Link from 'next/link';
export default function Home() {
  const [imageload,setImageload] = useState(false)


  return (
    <div className='flex-col gap-[2rem] flex'>
    <div className='relative p-[1px]' >
       <Image
      src={'/homescreen.jpg'}
      onLoadingComplete={img => setImageload(true)}
      quality={20}
      fill
      className={'image blur-[2px] brightness-[0.4] backdrop-hue-rotate-90 bg-white/30 w-9/10 '}
      // placeholder="hello"
      loading = 'lazy' 
       />
       {
        imageload&&
        <div className='flex gap-1'>
      <div className='centertext' > Your Trusted Forklift Solution in Brampton, Canada</div>
        <div className='descriptiontext'>
          <p className="subdis">
      Super Handlers inc. founded in 2015, has one of the biggest inventories of forklifts to meet the needs of various clients. <br/>
We provide a variety of services: - Refurbished and brand-new forklifts for  lease, and purchase - Forklift accessories - Premium Equipment and components - Maintenance and repair facility<br/>
</p>
<Link href="/about">
<button href='/about' className='p-[8px] m-1 border-1 rounded-[18px] bg-[#21DA8C] hover:bg-[#5fc186]'  >
   Learn More
   </button>
   </Link>
</div>
        </div>
       }
       
    
     </div >
     <div className='p-4 flex-col gap-3'>

     <h1 className='flex justify-center text-lg font-semibold' >
     Brands We have Authorized
     </h1>
     <BrandsEffect/>
     </div>
     <div>
      <div className='flex flex-wrap gap-20 m-2 items-center justify-around '>
        <div>
      <h2 className='text-2xl font-bold' >Heavy Duty</h2>
     <h1 className='relative  flex w-[24rem]' >
We specialise in renting out huge capacity vehicles.
Available include exclusive, current stock, and short-term hiring. for further information.

</h1>
<Link href="/contact">
<button className='p-2 m-1 border-1 rounded-[18px] bg-[#21DA8C]  hover:bg-[#5fc186]'>Contact Us</button>
</Link>
</div>
<Image
src={'/wp7388664-forklift-wallpapers.jpg'}
width={500}
height={500}
className='rounded-[19px] border-1'
/>
</div>
</div>
<div className='flex flex-wrap gap-20 m-2 items-center justify-around animationdelay'>
  <div>
<h1 className='text-2xl font-bold'>Servicing</h1>
  <h1 className=' relative  flex w-[24rem]'>
To get the most out of your equipment, it’s important to get everything properly serviced and maintained. Forklift Solutions can Service & Repair any make of equipment and we pride ourselves on being able to offer a first-class service to ensure as little downtime for you as possible.
Whether you’re wanting a Planned Preventative Maintenance Contract (PPM) or even a Full Maintenance Contract (FMC) for your Forklift Truck, with our variety of preventative maintenance, repairs and services, we can tailor to your individual needs
</h1>
</div>

<Image src={'/wp7388677-forklift-wallpapers.jpg'} width={500} height={500} className=' rounded-[19px] border-1' />

</div>


     </div>
  )
}
