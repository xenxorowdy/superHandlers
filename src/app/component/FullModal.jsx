import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment } from 'react'
import Image from 'next/image'

const FullModal = ({ title, desc, open, url, handleImage, price, selected }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={e => handleImage()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  <div className='text-[#21DA8C] font-[550] opacity-60 border-black text-md flex justify-around items-center'>
                    {selected || ''}</div>
                  <Image src={url} loading='lazy' placeholder='blur' blurDataURL="data:image/png" width={400} height={400} style={{ objectFit: "contain", aspectRatio: "3/2" }} alt={title} />
                  <h4 style={{ fontWeight: "700" }}>{title}</h4>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-800">
                    <p className='flex text-[1.1rem] font-medium '> <span id="span" className='font-normal'> price:</span>
                      <span className='  text-[#37a864]'>
                        ${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(price || 0)}
                      </span>
                      {selected == "Rental FolkLift" && <>/month</>}
                    </p>
                    <br />
                    {desc && <h2> Descriptions </h2>}
                    {desc && desc.split("\n").map((e, index) => e.trim() && <li key={index} className='w-[90%]'>{e}</li>)}

                  </p>
                </div>

                <div className="mt-4 flex gap-10 float-right">

                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={e => { handleImage() }}
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default FullModal
