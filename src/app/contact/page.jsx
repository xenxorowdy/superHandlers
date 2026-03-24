"use client"
import React, { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa'

const Contact = () => {
    const [form, setForm] = useState({ name: '', contact: '', email: '', interest: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/mailsend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Failed to send');

            setStatus('success');
            setForm({ name: '', contact: '', email: '', interest: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch {
            setStatus('idle');
            setErrorMsg('Failed to send message. Please try again or call us directly.');
        }
    };

    return (
        <main className="min-h-screen pt-40 pb-20 px-6 relative bg-slate-50 overflow-hidden">
            <div className="bg-orb orb-1 opacity-10"></div>
            <div className="bg-orb orb-2 opacity-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
                      Contact Center
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-slate-900">
                      Get In Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
                        Need immediate assistance? Our expert technicians are ready to keep your fleet moving.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Form */}
                    <div className="lg:col-span-7 glass-strong p-8 md:p-12 rounded-[40px] shadow-lg shadow-slate-200/50">
                        <div className="mb-10">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Send a Request</h2>
                            <p className="text-slate-500 font-medium">Complete the form below for a custom quote or service inquiry.</p>
                        </div>

                        {status === 'success' && (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-sm mb-6">
                                <FaCheckCircle className="text-lg shrink-0" />
                                Message sent successfully! We&apos;ll get back to you shortly.
                            </div>
                        )}

                        {errorMsg && (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-sm mb-6">
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                                <input id="name" type="text" placeholder="John Doe" className="w-full" required value={form.name} onChange={update('name')} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="contact" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                                <input id="contact" type="tel" placeholder="+1 289-505-5696" className="w-full" required value={form.contact} onChange={update('contact')} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                                <input id="email" type="email" placeholder="john@example.com" className="w-full" required value={form.email} onChange={update('email')} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="interest" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Interest</label>
                                <input id="interest" type="text" placeholder="Forklift Repair, Rental..." className="w-full" required value={form.interest} onChange={update('interest')} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="message" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Message</label>
                                <textarea id="message" rows={6} placeholder="Tell us about your fleet requirements..." className="w-full resize-none" required value={form.message} onChange={update('message')} />
                            </div>
                            <div className="md:col-span-2 pt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-12 py-4 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/20 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                                >
                                    {status === 'loading' ? (
                                        <><FaSpinner className="animate-spin" /> Opening email...</>
                                    ) : (
                                        <><FaPaperPlane className="text-sm opacity-70" /> Send Message</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info Panels */}
                    <div className="lg:col-span-5 space-y-6">
                        <a href="tel:+12895055696" className="glass-card p-10 rounded-[32px] group block">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-[#5ba3b5]/10 text-[#5ba3b5] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                                    <FaPhoneAlt />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Call Us</p>
                                    <p className="text-xl font-black text-slate-900 group-hover:text-[#5ba3b5] transition-colors">+1 289-505-5696</p>
                                </div>
                            </div>
                        </a>

                        <a href="mailto:superhandlers1@gmail.com" className="glass-card p-10 rounded-[32px] group block">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-[#5ba3b5]/10 text-[#5ba3b5] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                                    <FaEnvelope />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Support</p>
                                    <p className="text-xl font-black text-slate-900 group-hover:text-[#5ba3b5] transition-colors">superhandlers1@gmail.com</p>
                                </div>
                            </div>
                        </a>

                        <a href="https://maps.app.goo.gl/ZufwDGCdrLqQB7QJ6" target="_blank" rel="noopener noreferrer" className="glass-card p-10 rounded-[32px] group block">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-[#5ba3b5]/10 text-[#5ba3b5] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">HQ Location</p>
                                    <p className="text-xl font-black text-slate-900 leading-tight group-hover:text-[#5ba3b5] transition-colors">241 Advance Blvd, Brampton, ON</p>
                                </div>
                            </div>
                        </a>

                        <div className="glass-card p-10 rounded-[32px] bg-gradient-to-br from-[#2c3a52] to-[#1a2335] border-none shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-48 h-48 bg-[#5ba3b5]/15 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#5ba3b5]/25 transition-all duration-700"></div>
                           <div className="relative z-10 flex items-center gap-6">
                                <div className="w-16 h-16 bg-white/10 text-[#7ab8c7] rounded-2xl flex items-center justify-center text-2xl shrink-0">
                                    <FaClock className="animate-pulse" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-white/50 uppercase tracking-widest">Service Hours</p>
                                    <p className="text-xl font-black text-white">24/7 Support Available</p>
                                    <p className="text-xs text-[#7ab8c7] font-bold">Standard: 8 AM – 6 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-20 h-[500px] w-full glass-strong rounded-[40px] overflow-hidden grayscale contrast-[0.9] hover:grayscale-0 transition-all duration-1000 shadow-xl shadow-slate-200/50">
                   <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184474.37340078!2d-79.91428216140513!3d43.743516584281745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b15edda9f9799%3A0x442a3d767ef6152f!2sBrampton%2C%20ON!5e0!3m2!1sen!2sca!4v1711314592577!5m2!1sen!2sca" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                   ></iframe>
                </div>
            </div>
        </main>
    )
}

export default Contact
