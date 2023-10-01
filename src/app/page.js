'use client'
import Image from 'next/image';
import { useState } from 'react';
import BrandsEffect from './component/BrandsEffect';
import "./imageResponse.css";
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
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
      alt={'homescreen'}
      className={'image blur-[2px] brightness-[0.4] backdrop-hue-rotate-90 bg-white/30 w-9/10 '}
      // placeholder="hello"
      loading = 'lazy' 
       />
       {
        imageload&&
        <div className='flex gap-[2px]'>
      <div className='centertext' > Your Trusted Forklift Solution in Brampton, Canada</div>
        <div className='descriptiontext'>
          <p className="subdis">
          Founded in 2016, Super Handlers is the fastest-growing sales, rental, and service firm for material handling equipment, with two facilities in Ontario and Alberta.</p>

<Link href="/about">
<button href='/about' className='p-[8px] m-1 border-1 rounded-[18px] bg-green-400 hover:bg-[#5fc186]'  >
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
     <h1 className='relative  flex  lg:w-[25rem] sm:w-fit' >
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
alt='wallpapers'
className='rounded-[19px] border-1'
/>
</div>
</div>
<div className='flex flex-wrap gap-20 m-2 items-center justify-around animationdelay '>
  <div>
<h1 className='text-2xl font-bold'>Servicing</h1>
  <h1 className=' relative  flex  lg:w-[25rem] sm:w-fit '>
To get the most out of your equipment, it’s important to get everything properly serviced and maintained. Forklift Solutions can Service & Repair any make of equipment and we pride ourselves on being able to offer a first-class service to ensure as little downtime for you as possible.
Whether you’re wanting a Planned Preventative Maintenance Contract (PPM) or even a Full Maintenance Contract (FMC) for your Forklift Truck, with our variety of preventative maintenance, repairs and services, we can tailor to your individual needs
</h1>
</div>

<Image src={'/wp7388677-forklift-wallpapers.jpg'} width={500} height={500} className=' rounded-[19px] border-1' alt='forklift-wallpapers' />

</div>
<div className='bodycard'>
  
  <a href='/shop' >
  <p className="caption flex text-[#3f4550] font-normal align-baseline  items-center  w-fit text-xl">shop <FaExternalLinkAlt className='h-4 '/> </p>
<figure>
  <Image  src={'/shop.jpg'} width={300} height={400} className=' aspect-[3/2] w-80 h-40' alt="Mountains" />
  <figcaption>Shop</figcaption>
</figure>
  </a>
  <a href='/about' >

  <p className="caption flex text-[#3f4550] font-normal align-baseline  items-center   text-xl w-fit">About <FaExternalLinkAlt className='h-4'/> </p>
<figure>

  <Image  src={'/wp7388677-forklift-wallpapers.jpg'} className=' aspect-[3/2] w-80 h-40' width={300} height={400} alt="Mountains" />
  <figcaption>About</figcaption>

</figure>
</a>
<a href='/contact'>
  <p className="caption flex text-[#3f4550] font-normal text-xl  align-baseline  items-center w-fit  ">ContactUS <FaExternalLinkAlt className='h-4 '/> </p>
<figure  >
  <Image  src={'/contact.webp'} className=' aspect-[3/2] w-80 h-40' width={300} height={400} alt="Mountains" />
  <figcaption>Contact Us</figcaption>

</figure>
</a>
</div>
     </div>
  )
}
