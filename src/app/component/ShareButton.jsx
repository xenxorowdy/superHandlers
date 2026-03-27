"use client"
import { useState } from 'react'

export default function ShareButton({ title, url }) {
    const [copied, setCopied] = useState(false)

    async function handleShare() {
        if (navigator.share) {
            try {
                await navigator.share({ title, url })
            } catch (_) {
                // user cancelled — do nothing
            }
            return
        }
        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (_) {
            // ignore
        }
    }

    return (
        <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 active:scale-[0.97] transition-all duration-200 border border-slate-200"
            aria-label="Share this listing"
        >
            {copied ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500" aria-hidden>
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-600">Copied!</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
                        <path fillRule="evenodd" d="M15.75 4.5a3 3 0 116 0 3 3 0 01-6 0zm-12 6a3 3 0 116 0 3 3 0 01-6 0zm12 6a3 3 0 116 0 3 3 0 01-6 0zm-10.5-6a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" clipRule="evenodd" />
                        <path d="M13.5 10.5l-3-1.5m0 6l3-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    </svg>
                    Share
                </>
            )}
        </button>
    )
}
