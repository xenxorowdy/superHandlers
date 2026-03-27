"use client"
import { useState } from 'react'
import Image from 'next/image'

export default function ImageGallery({ images, title }) {
    const [activeIdx, setActiveIdx] = useState(0)

    if (!images || images.length === 0) return null

    const hasThumbs = images.length > 1

    return (
        <div className="flex flex-col gap-3">
            {/* Main image */}
            <div className="relative overflow-hidden rounded-[28px] bg-white shadow-sm border border-slate-200 min-h-[380px] lg:min-h-[460px]">
                <Image
                    src={`/api/uploads/${images[activeIdx]}`}
                    alt={`${title} — image ${activeIdx + 1} of ${images.length}`}
                    fill
                    unoptimized
                    priority={activeIdx === 0}
                    className="object-cover transition-opacity duration-300"
                />

                {/* Image counter badge */}
                {hasThumbs && (
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-bold backdrop-blur-sm">
                        {activeIdx + 1} / {images.length}
                    </span>
                )}

                {/* Prev / Next arrows */}
                {hasThumbs && (
                    <>
                        <button
                            onClick={() => setActiveIdx((i) => (i - 1 + images.length) % images.length)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-md transition-all backdrop-blur-sm"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setActiveIdx((i) => (i + 1) % images.length)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-md transition-all backdrop-blur-sm"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnail strip */}
            {hasThumbs && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((filename, idx) => (
                        <button
                            key={filename}
                            onClick={() => setActiveIdx(idx)}
                            className={`relative shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                                idx === activeIdx
                                    ? 'border-[#5ba3b5] shadow-md shadow-[#5ba3b5]/20'
                                    : 'border-slate-200 opacity-60 hover:opacity-90 hover:border-slate-300'
                            }`}
                            aria-label={`View image ${idx + 1}`}
                        >
                            <Image
                                src={`/api/uploads/${filename}`}
                                alt={`${title} thumbnail ${idx + 1}`}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
