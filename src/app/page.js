import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import BrandsEffect from './component/BrandsEffect';
import "./imageResponse.css";
export default function Home() {
  let set = false
  return (
    <div className='flex-col gap-[2rem] flex'>
    <div className='relative p-[1px]' >
       <Image
      src={'/homescreen.jpg'}
      fill
      quality={10}
      placeholder='blur'
      blurDataURL="data:image/jpeg..."
      onLoadingComplete={set=true}
      alt={'homescreen'}
      className={'image blur-[1px] brightness-[0.4] backdrop-hue-rotate-90 bg-white/30 w-9/10 '}
      // placeholder="hello"
      loading = 'lazy' 
       />
       {set&&
        <div className='flex gap-[2px]'>
      <h1 className='centertext' > SuperHandlers Trusted Forklift Solutions Brampton.</h1>
        <div className='descriptiontext'>
          <p className="subdis">
          Founded in 2016, Super Handlers is the fastest-growing sales, rental, and service firm for material handling equipment, with two facilities in Ontario and Alberta.</p>
<Link href="/about">
<button href='/about' className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'  >
   Learn More
   </button>
   </Link>
</div>
        </div>
       }
       
    
     </div >
     <div className='p-4 flex-col gap-3 flex-wrap'>

     <span className='flex justify-center text-xl font-bold uppercase' >
     Brands We Provide Services.
     </span>
     <BrandsEffect/>
     </div>
     <div>
      <div className='flex flex-wrap gap-20 m-2 items-center justify-around '>
        <div>
      <h2 className='text-2xl font-bold' >Heavy Duty:</h2>
     <p className='relative  flex  pb-2  lg:w-[25rem] sm:w-fit' >

SuperHandlers is a leading provider of forklift rental services in the bustling city of Brampton, located in the heart of Toronto, Ontario, Canada. Our expertise lies in offering a wide range of forklifts, specifically designed for handling heavy loads with large capacity requirements. Whether you are in need of exclusive rental options or prefer to explore our inventory of well-maintained pre-owned forklifts



</p>
<Link href="/shop">
<button className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'>Shop</button>
</Link>
</div>
<Image loading = 'lazy'

src={'/wp7388664-forklift-wallpapers.jpg'}
width={500}
height={500}
alt='wallpapers'

className='imageboxshawdow rounded-[19px] border-1'
/>
</div>
</div>
<div className='flex flex-wrap gap-20 m-2 items-center justify-around animationdelay '>
  <div>
<p className='text-2xl font-bold'>Servicing:</p>
  <p className=' relative pb-2 flex  lg:w-[25rem] sm:w-fit '>
To get the most out of your equipment, it’s important to get everything properly serviced and maintained. Forklift Solutions can Service & Repair any make of equipment and we pride ourselves on being able to offer a first-class service to ensure as little downtime for you as possible.
Whether you’re wanting a Planned Preventative Maintenance Contract (PPM) or even a Full Maintenance Contract (FMC) for your Forklift Truck, with our variety of preventative maintenance, repairs and services, we can tailor to your individual needs
</p>
<Link href="/contact">
<button className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'>Contact Us</button>
</Link>
</div>

<Image loading = 'lazy' src={'/wp7388677-forklift-wallpapers.jpg'} width={500} height={500} className=' imageboxshawdow rounded-[19px] border-1' alt='forklift-wallpapers' />

</div>
<div className='bodycard'>
  
  <a className='flex items-center flex-col' href='/shop' >
<figure>
  <Image loading = 'lazy'  src={'/shop.jpg'} width={300} height={400} className='imageboxshawdow aspect-[3/2] w-80 h-40' alt="Mountains" />
  <figcaption>Shop</figcaption>
</figure>
<p className="caption flex text-[#3f4550] font-normal align-baseline  items-center  w-fit text-xl">shop <FaExternalLinkAlt className='h-4 '/> </p>
  </a>
  <a className='flex items-center flex-col' href='/about' >

<figure>

  <Image loading = 'lazy'  src={'/wp7388677-forklift-wallpapers.jpg'} className='imageboxshawdow aspect-[3/2] w-80 h-40' width={300} height={400} alt="Mountains" />
  <figcaption>About</figcaption>

</figure>
<p className="caption flex text-[#3f4550] font-normal align-baseline  items-center   text-xl w-fit">About <FaExternalLinkAlt className='h-4'/> </p>

</a>
<a className='flex items-center flex-col'  href='/contact' >
<figure  >
  <Image loading = 'lazy'  src={'/contact.webp'} className='imageboxshawdow aspect-[3/2] w-80 h-40' width={300} height={400} alt="Mountains" />
  <figcaption>Contact Us</figcaption>

</figure>
<p className="caption flex text-[#3f4550] font-normal text-xl  align-baseline  items-center w-fit  ">ContactUS <FaExternalLinkAlt className='h-4 '/> </p>

</a>
</div>
     </div>
  )
}
