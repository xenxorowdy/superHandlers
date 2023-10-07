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
        width={190}
        height={190}
          
          style={{  height: 'auto' }} // optional

          alt="brands toyota"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/raymond.png'}
        width={190}
        height={190}
          
          style={{  height: 'auto' }} // optional

          alt="brands raymond"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/crow.png'}
        width={190}
        height={190}
          
          style={{  height: 'auto' }} // optional

          alt="brands crow"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/nissan.png'}
        width={190}
        height={190}
          
          style={{  height: 'auto' }} // optional

          alt="brands nissan"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/hyster.png'}
        width={190}
        height={190}
          
          style={{  height: 'auto' }} // optional

          alt="brands hyster"
        />
        </SwiperSlide>
        <SwiperSlide>
        <Image
        src={'/folkliftcompany/tennant.png'}
        width={190}
        height={190}
          
          style={{  height: 'auto' }} // optional

          alt="brands tenant"
        />
        </SwiperSlide>
       

<SwiperSlide>
        <Image
        src={'/folkliftcompany/yale_logo-standard.webp'}
        width={190}
        height={190}
          className=' aspect-video '
          style={{  height: 'auto' }} // optional

          alt="brands yale"
        />
        </SwiperSlide>
    </Swiper>
  )
}
