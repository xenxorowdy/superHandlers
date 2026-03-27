"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaTrash, FaEnvelope, FaPhone, FaTag, FaCommentAlt, FaCheckCircle, FaInbox } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RequestsPage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!session) { router.push('/login'); return }
        fetch('/api/inquiries')
            .then(r => r.json())
            .then(data => { setInquiries(data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [session, router])

    const markRead = async (id) => {
        await fetch(`/api/inquiries/${id}`, { method: 'PATCH' })
        setInquiries(prev => prev.map(i => i._id === id ? { ...i, read: true } : i))
    }

    const deleteInquiry = async (id) => {
        await fetch(`/api/inquiries/${id}`, { method: 'DELETE' })
        setInquiries(prev => prev.filter(i => i._id !== id))
        toast.success('Request deleted', { position: 'bottom-left', theme: 'dark', autoClose: 2000 })
    }

    const unreadCount = inquiries.filter(i => !i.read).length

    if (loading) {
        return (
            <div className="min-h-screen pt-32 px-6 flex items-start justify-center">
                <div className="space-y-4 w-full max-w-4xl">
                    {Array(4).fill(null).map((_, i) => (
                        <div key={i} className="h-40 bg-slate-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inquiries</h1>
                        <p className="text-slate-500 text-sm mt-1">{inquiries.length} total · {unreadCount} unread</p>
                    </div>
                    {unreadCount > 0 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#5ba3b5] text-white text-xs font-black">
                            {unreadCount} New
                        </span>
                    )}
                </div>

                {/* Empty state */}
                {inquiries.length === 0 && (
                    <div className="text-center py-24 text-slate-400">
                        <FaInbox size={40} className="mx-auto mb-4 opacity-40" />
                        <p className="font-semibold text-lg">No inquiries yet</p>
                        <p className="text-sm mt-1">Form submissions will appear here.</p>
                    </div>
                )}

                {/* List */}
                <div className="space-y-4">
                    {inquiries.map(item => (
                        <div
                            key={item._id}
                            className={`bg-white rounded-2xl border shadow-sm p-6 transition-all ${item.read ? 'border-slate-100' : 'border-[#5ba3b5]/40 shadow-[#5ba3b5]/5'}`}
                        >
                            {/* Top row */}
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3 min-w-0">
                                    {!item.read && (
                                        <span className="shrink-0 w-2 h-2 rounded-full bg-[#5ba3b5]" />
                                    )}
                                    <div className="min-w-0">
                                        <p className="font-black text-slate-900 text-base truncate">{item.name}</p>
                                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                                            {new Date(item.createdAt).toLocaleDateString('en-CA', {
                                                year: 'numeric', month: 'short', day: 'numeric',
                                                hour: '2-digit', minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    {!item.read && (
                                        <button
                                            onClick={() => markRead(item._id)}
                                            title="Mark as read"
                                            className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                                        >
                                            <FaCheckCircle size={13} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteInquiry(item._id)}
                                        title="Delete"
                                        className="w-8 h-8 rounded-full bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors"
                                    >
                                        <FaTrash size={11} />
                                    </button>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <FaEnvelope size={11} className="text-slate-400 shrink-0" />
                                    <a href={`mailto:${item.email}`} className="hover:text-[#5ba3b5] truncate">{item.email}</a>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <FaPhone size={11} className="text-slate-400 shrink-0" />
                                    <a href={`tel:${item.contact}`} className="hover:text-[#5ba3b5]">{item.contact}</a>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <FaTag size={11} className="text-slate-400 shrink-0" />
                                    <span className="truncate">{item.interest}</span>
                                </div>
                                {item.message && (
                                    <div className="flex items-start gap-2 text-slate-600 sm:col-span-2">
                                        <FaCommentAlt size={11} className="text-slate-400 shrink-0 mt-0.5" />
                                        <p className="leading-snug">{item.message}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ToastContainer position="bottom-left" autoClose={2000} theme="dark" />
        </main>
    )
}
