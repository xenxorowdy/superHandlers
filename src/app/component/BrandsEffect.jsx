'use client'
import Image from 'next/image'
import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
// import fs from 'fs';
import { Autoplay } from 'swiper/modules';

// import path from 'path';
import 'swiper/css';
import 'swiper/css/autoplay';
console.log(process.cwd());
export default function BrandsEffect() {
    // const imageFolderPath = path.join(process.cwd(), 'public'); // Adjust the path accordingly
    // const imageFileNames = fs.readdirSync(imageFolderPath);
    // console.log("imageFileName:", imageFileNames);
// console.log(imageFileNames);  
    return (
        <Swiper
        spaceBetween={50}
        slidesPerView={4}
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          waitForTransition:false
        }}
        >
          
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/toyota.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands toyota"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/raymond.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands raymond"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/crow.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands crow"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/nissan.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands nissan"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/hyster.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands hyster"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/tennant.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands tenant"
        />
        </SwiperSlide>
       

<SwiperSlide>
        <Image
        src={'/folkliftcompany/yale_logo-standard.webp'}
        width={10}
        sizes="5vw"
        height={10}
          className=' object-contain '
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands yale"
        />
        </SwiperSlide>
    </Swiper>
  )
}
