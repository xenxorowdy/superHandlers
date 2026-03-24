"use client"
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const BrandsEffect = () => {
    const brands = [
        { src: '/folkliftcompany/toyota.png', alt: 'Toyota' },
        { src: '/folkliftcompany/raymond.png', alt: 'Raymond' },
        { src: '/folkliftcompany/crow.png', alt: 'Crown' },
        { src: '/folkliftcompany/nissan.png', alt: 'Nissan' },
        { src: '/folkliftcompany/hyster.png', alt: 'Hyster' },
        { src: '/folkliftcompany/tennant.png', alt: 'Tennant' },
        { src: '/folkliftcompany/yale_logo-standard.webp', alt: 'Yale' },
    ]

    return (
        <div className=" relative overflow-hidden group">
            <div className="absolute inset-y-0 left-0 w-32   from-slate-950 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 from-slate-950 to-transparent z-10"></div>
            
            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                loop={true}
                speed={3000}
                modules={[Autoplay]}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 40 },
                    1024: { slidesPerView: 5, spaceBetween: 50 },
                }}
                className="brands-swiper"
            >
                {/* Double the brands for seamless loop */}
                {[...brands, ...brands].map((brand, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center  transition-all duration-500 cursor-pointer py-4">
                        <div className="relative h-16 w-32 md:h-20 md:w-40">
                            <Image
                                src={brand.src}
                                fill
                                className="object-contain"
                                alt={brand.alt}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .brands-swiper .swiper-wrapper {
                    transition-timing-function: linear !important;
                }
            `}</style>
        </div>
    )
}

export default BrandsEffect
