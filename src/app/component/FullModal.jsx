import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { FaTimes, FaPhoneAlt, FaTag } from 'react-icons/fa';

const FullModal = ({ title, desc, open, url, handleImage, price, selected }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[200]" onClose={handleImage}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#1a2335]/80 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full sm:max-w-4xl transform overflow-hidden rounded-[24px] bg-white text-left shadow-2xl transition-all">
                {/* Close button */}
                <button
                  onClick={handleImage}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm"
                >
                  <FaTimes size={13} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image side */}
                  <div className="relative bg-slate-100 min-h-[280px] md:min-h-[420px]">
                    <Image
                      src={url}
                      fill
                      unoptimized
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                      className="object-cover"
                      alt={title || 'Forklift'}
                    />
                  </div>

                  {/* Details side */}
                  <div className="flex flex-col p-7 md:p-9">
                    {/* Category */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-bold uppercase tracking-wider w-fit mb-4 border border-[#5ba3b5]/20">
                      <FaTag size={8} />
                      {selected || 'Listing'}
                    </div>

                    {/* Title */}
                    <Dialog.Title as="h3" className="text-2xl md:text-3xl font-black text-slate-900 mb-5 leading-tight tracking-tight">
                      {title}
                    </Dialog.Title>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-7 pb-7 border-b border-slate-100">
                      <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Price</span>
                      <span className="text-3xl md:text-4xl font-black text-[#5ba3b5] tracking-tight">
                        ${new Intl.NumberFormat('en-US').format(price || 0)}
                      </span>
                      {selected === "Rental FolkLift" && (
                        <span className="text-sm font-medium text-slate-400">/month</span>
                      )}
                    </div>

                    {/* Description / Features */}
                    {desc && desc.trim() && (
                      <div className="mb-7 flex-1">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <div className="w-1 h-3.5 bg-[#5ba3b5] rounded-full"></div>
                          Features & Specifications
                        </h4>
                        <ul className="space-y-2.5">
                          {desc.split("\n").map((line, index) => line.trim() && (
                            <li key={index} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5ba3b5]/30 border border-[#5ba3b5]/40 shrink-0"></span>
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100 mt-auto">
                      <Link
                        href="/contact"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/20 active:scale-[0.98] text-sm"
                      >
                        <FaPhoneAlt size={11} /> Request Availability
                      </Link>
                      <button
                        type="button"
                        onClick={handleImage}
                        className="px-6 py-3.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300 text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default FullModal
