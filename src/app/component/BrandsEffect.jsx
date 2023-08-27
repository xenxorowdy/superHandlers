'use client'
import Image from 'next/image'
import React from 'react'
// import fs from 'fs';
// import path from 'path';

console.log(process.cwd());
export default function BrandsEffect() {
    // const imageFolderPath = path.join(process.cwd(), 'public'); // Adjust the path accordingly
    // const imageFileNames = fs.readdirSync(imageFolderPath);
    // console.log("imageFileName:", imageFileNames);
// console.log(imageFileNames);  
    return (
        <div className='flex'>
        <Image
        src={'/folkliftcompany/toyota.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands toyota"
        />
        <Image
        src={'/folkliftcompany/raymond.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands raymond"
        />
        <Image
        src={'/folkliftcompany/crow.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands crow"
        />
        <Image
        src={'/folkliftcompany/nissan.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands nissan"
        />
        <Image
        src={'/folkliftcompany/hyster.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands hyster"
        />
        <Image
        src={'/folkliftcompany/tennant.png'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands tenant"
        />
       

        <Image
        src={'/folkliftcompany/yale_logo-standard.webp'}
        width={120}
        sizes="10vw"
        height={120}
          
          style={{ width: '20vw', height: 'auto' }} // optional

          alt="brands yale"
        />
    </div>
  )
}
