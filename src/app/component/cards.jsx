"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaTrash, FaPhoneAlt } from 'react-icons/fa'
import MyModal from './Modal'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { buildInventoryUrl } from '@/lib/shopSeo'

const PHONE = '+16475730160'

const CATEGORY_COLORS = {
  'New ForkLift':       { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'New' },
  'Rental ForkLift':    { bg: 'bg-blue-100',    text: 'text-blue-700',    label: 'Rental' },
  'Pre Owned ForkLift': { bg: 'bg-amber-100',   text: 'text-amber-700',   label: 'Pre-Owned' },
}

export default function Cards({ res, title, price, desc, selected, deleted, setDeleteFile, uploadDate }) {
  const [urls] = useState(`/api/uploads/${res}`)
  const [open, setOpen] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleDelete = () => {
    axios(`api/delete/${res}`, { method: 'DELETE' })
      .then((resp) => {
        if (resp.status === 200) {
          setDeleteFile(res)
          toast.success('Card Deleted', { position: 'bottom-left', autoClose: 3000, theme: 'dark' })
        } else throw new Error('Delete failed')
      })
      .catch(() => {
        toast.error('Error — try again later', { position: 'bottom-left', autoClose: 5000, theme: 'dark' })
      })
  }

  const isRental = selected === 'Rental ForkLift'
  const detailsHref = buildInventoryUrl({ filename: res, metadata: { title } })
  const formattedPrice = `$${new Intl.NumberFormat('en-US').format(price || 0)}`

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full"
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="category" content={selected || 'Forklift'} />

      {/* Delete button (admin only) */}
      {deleted && (
        <button
          onClick={() => setOpen(true)}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
          aria-label="Delete listing"
        >
          <FaTrash size={11} />
        </button>
      )}

      {/* Cover image */}
      <Link href={detailsHref} className="relative block w-full h-[240px] overflow-hidden bg-slate-100 shrink-0 cursor-pointer">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm font-medium">
            Image unavailable
          </div>
        ) : (
          <Image
            src={urls}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            alt={`${title || 'Forklift'} — ${selected || 'forklift'} for sale at Super Handlers`}
            itemProp="image"
            onError={() => setImgError(true)}
          />
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category tag */}
        {(() => {
          const cat = CATEGORY_COLORS[selected]
          return cat ? (
            <span className={`self-start mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${cat.bg} ${cat.text}`}>
              {cat.label}
            </span>
          ) : null
        })()}
        <h3 className="text-[15px] font-black text-slate-900 leading-tight mb-1 line-clamp-2" itemProp="name">
          <Link href={detailsHref} className="hover:text-[#5ba3b5] transition-colors">
            {title || 'Forklift'}
          </Link>
        </h3>

        {desc && <p className="sr-only" itemProp="description">{desc}</p>}

        {/* Price */}
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="flex items-baseline gap-1 mt-2 mb-4">
          {price ? (
            <>
              <span className="text-2xl font-black text-[#5ba3b5] tracking-tight" itemProp="price" content={price}>
                {formattedPrice}
              </span>
              <span className="text-xs font-semibold text-slate-400">CAD</span>
              {isRental && <span className="text-xs font-semibold text-slate-400">/mo</span>}
              <meta itemProp="priceCurrency" content="CAD" />
            </>
          ) : (
            <span className="text-sm font-semibold text-slate-400">Contact for pricing</span>
          )}
          <meta itemProp="availability" content="https://schema.org/InStock" />
        </div>

        {/* Listing date */}
        {uploadDate && (
          <p className="text-[11px] text-slate-400 -mt-2 mb-2">
            Listed {new Date(uploadDate).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={detailsHref}
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#5ba3b5] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#4a92a4] active:scale-[0.98] transition-all duration-200"
          >
            View Details
          </Link>
          <a
            href={`tel:${PHONE}`}
            className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-3.5 py-2.5 text-slate-600 hover:bg-[#5ba3b5]/10 hover:text-[#5ba3b5] active:scale-[0.98] transition-all duration-200"
            aria-label="Call Super Handlers"
          >
            <FaPhoneAlt size={13} />
          </a>
        </div>
      </div>

      <MyModal open={open} setOpen={setOpen} handleDelete={handleDelete} />
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick draggable pauseOnHover theme="dark" />
    </article>
  )
}
