"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import "../card.scss"
import { FaTrash } from 'react-icons/fa'
import MyModal from './Modal'
import FullModal from './FullModal'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

export default function Cards({ res, title, price, desc, selected, deleted, setDeleteFile }) {
  const [urls] = useState(`/api/uploads/${res}`)
  const [open, setOpen] = useState(false)
  const [imageOpen, setImageOpen] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleDelete = () => {
    axios(`api/delete/${res}`, { method: "DELETE" })
      .then((resp) => {
        if (resp.status === 200) {
          setDeleteFile(res)
          toast.success("Card Deleted", {
            position: "bottom-left",
            autoClose: 3000,
            theme: "dark",
          })
        } else throw new Error("Delete failed")
      })
      .catch(() => {
        toast.error("Error — try again later", {
          position: "bottom-left",
          autoClose: 5000,
          theme: "dark",
        })
      })
  }

  const formattedPrice = `$${new Intl.NumberFormat('en-US').format(price || 0)}`
  const isRental = selected === "Rental ForkLift"

  return (
    <article className="card-item group" itemScope itemType="https://schema.org/Product">
      <meta itemProp="category" content={selected || 'Forklift'} />

      {/* Category + Delete */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-[10px] font-bold text-[#5ba3b5] uppercase tracking-wider">
          {selected || 'Listing'}
        </span>
        {deleted && (
          <button
            onClick={() => setOpen(true)}
            className="text-slate-400 hover:text-red-500 transition-colors p-1"
            aria-label="Delete listing"
          >
            <FaTrash size={12} />
          </button>
        )}
      </div>

      {/* Image */}
      <figure
        onClick={() => setImageOpen(true)}
        className="relative w-full h-[220px] cursor-pointer overflow-hidden bg-slate-100 m-0"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${title || 'forklift'}`}
        onKeyDown={(e) => e.key === 'Enter' && setImageOpen(true)}
      >
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm">
            Image unavailable
          </div>
        ) : (
          <Image
            src={urls}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            alt={`${title || 'Forklift'} — ${selected || 'forklift'} available at Super Handlers, Brampton`}
            itemProp="image"
            onError={() => setImgError(true)}
          />
        )}
      </figure>

      {/* Info */}
      <div className="px-4 py-3 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 truncate mb-1.5" itemProp="name">
          {title || 'Forklift'}
        </h3>
        {desc && (
          <p className="sr-only" itemProp="description">{desc}</p>
        )}
        <div className="flex items-baseline justify-between" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <p className="text-lg font-black text-[#5ba3b5] tracking-tight">
            <span itemProp="price" content={price || '0'}>{formattedPrice}</span>
            <meta itemProp="priceCurrency" content="CAD" />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            {isRental && (
              <span className="text-xs font-medium text-slate-400 ml-0.5">/mo</span>
            )}
          </p>
          <button
            onClick={() => setImageOpen(true)}
            className="text-xs font-semibold text-[#5ba3b5] hover:text-[#7ab8c7] transition-colors"
          >
            View Details →
          </button>
        </div>
      </div>

      <MyModal open={open} setOpen={setOpen} handleDelete={handleDelete} />
      <FullModal
        title={title}
        desc={desc}
        price={price}
        open={imageOpen}
        handleImage={() => setImageOpen(false)}
        url={urls}
        selected={selected}
      />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="dark"
      />
    </article>
  )
}
