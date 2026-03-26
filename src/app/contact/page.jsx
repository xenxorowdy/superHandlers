"use client"
import React, { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle, FaSpinner, FaArrowRight } from 'react-icons/fa'

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

    const infoCards = [
        {
            icon: <FaPhoneAlt />,
            label: 'Call Us',
            value: '+1 647-573-0160',
            sub: 'Tap to call now',
            href: 'tel:+6475730160',
        },
        {
            icon: <FaEnvelope />,
            label: 'Email Support',
            value: 'superhandlers1@gmail.com',
            sub: 'We reply within 2 hours',
            href: 'mailto:superhandlers1@gmail.com',
            breakAll: true,
        },
        {
            icon: <FaMapMarkerAlt />,
            label: 'Primary Location',
            value: '11 Holland Dr, Unit 9, Bolton, ON L7E 1G7',
            sub: 'Secondary: 241 Advance Blvd, Brampton, ON',
        },
    ];

    return (
        <main className="min-h-screen relative overflow-hidden">
            <div className="bg-orb orb-1 opacity-10"></div>
            <div className="bg-orb orb-2 opacity-10"></div>

            {/* Hero */}
            <section className="relative pt-40 pb-20 px-6 bg-gradient-to-b from-[#1a2335] via-[#1a2335] to-slate-50 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(91,163,181,0.15),transparent)]" />
                <div className="container mx-auto relative z-10 text-center">
                    <span className="inline-block py-1.5 px-5 rounded-full bg-[#5ba3b5]/15 text-[#7ab8c7] text-xs font-black tracking-[0.25em] uppercase mb-8 border border-[#5ba3b5]/25 backdrop-blur-sm">
                        Contact Center
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[0.95] text-white">
                        Get In <span className="text-[#7ab8c7]">Touch</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
                        Need immediate assistance? Our expert technicians are ready to keep your fleet moving.
                    </p>

                    {/* Quick action pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a href="tel:+6475730160" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5ba3b5] text-white font-bold text-sm hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/25 active:scale-95">
                            <FaPhoneAlt size={12} /> Call Now
                        </a>
                        <a href="mailto:superhandlers1@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold text-sm border border-white/20 hover:bg-white/15 backdrop-blur-sm transition-all duration-300">
                            <FaEnvelope size={12} /> Email Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Info Cards Row */}
            <section className="px-6 -mt-1 relative z-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {infoCards.map((card, i) => {
                            const Wrapper = card.href ? 'a' : 'div';
                            return (
                                <Wrapper
                                    key={i}
                                    {...(card.href ? { href: card.href } : {})}
                                    className="glass-card p-8 rounded-[28px] group flex items-start gap-5 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#5ba3b5]/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[#5ba3b5]/10 transition-all duration-700" />
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#5ba3b5] to-[#7ab8c7] text-white rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#5ba3b5]/20 shrink-0">
                                        {card.icon}
                                    </div>
                                    <div className="relative z-10 min-w-0">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
                                        <p className={`text-lg font-black text-slate-900 group-hover:text-[#5ba3b5] transition-colors leading-tight ${card.breakAll ? 'break-all' : ''}`}>
                                            {card.value}
                                        </p>
                                        <p className="text-xs text-slate-400 font-semibold mt-1">{card.sub}</p>
                                    </div>
                                    {card.href && (
                                        <FaArrowRight className="absolute top-8 right-8 text-slate-300 group-hover:text-[#5ba3b5] group-hover:translate-x-1 transition-all duration-300" size={12} />
                                    )}
                                </Wrapper>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Form + Service Hours */}
            <section className="py-20 px-6 relative z-10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Form */}
                        <div className="lg:col-span-8 glass-strong p-8 md:p-12 rounded-[36px] shadow-xl shadow-slate-200/40 relative overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#5ba3b5]/5 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10 mb-10">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">Send a Request</h2>
                                <p className="text-slate-500 font-medium">Complete the form below for a custom quote or service inquiry.</p>
                            </div>

                            {status === 'success' && (
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-sm mb-8">
                                    <FaCheckCircle className="text-lg shrink-0" />
                                    Message sent successfully! We&apos;ll get back to you shortly.
                                </div>
                            )}

                            {errorMsg && (
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-semibold text-sm mb-8">
                                    {errorMsg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Full Name</label>
                                    <input id="name" type="text" placeholder="John Doe" className="w-full bg-white/70 border border-slate-200/80 focus:border-[#5ba3b5] focus:ring-4 focus:ring-[#5ba3b5]/10 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-300 transition-all duration-300 outline-none" required value={form.name} onChange={update('name')} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="contact" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Phone Number</label>
                                    <input id="contact" type="tel" placeholder="+1 647-573-0160" className="w-full bg-white/70 border border-slate-200/80 focus:border-[#5ba3b5] focus:ring-4 focus:ring-[#5ba3b5]/10 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-300 transition-all duration-300 outline-none" required value={form.contact} onChange={update('contact')} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Email Address</label>
                                    <input id="email" type="email" placeholder="john@example.com" className="w-full bg-white/70 border border-slate-200/80 focus:border-[#5ba3b5] focus:ring-4 focus:ring-[#5ba3b5]/10 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-300 transition-all duration-300 outline-none" required value={form.email} onChange={update('email')} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="interest" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Interest</label>
                                    <input id="interest" type="text" placeholder="Forklift Repair, Rental..." className="w-full bg-white/70 border border-slate-200/80 focus:border-[#5ba3b5] focus:ring-4 focus:ring-[#5ba3b5]/10 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-300 transition-all duration-300 outline-none" required value={form.interest} onChange={update('interest')} />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor="message" className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Message</label>
                                    <textarea id="message" rows={5} placeholder="Tell us about your fleet requirements..." className="w-full bg-white/70 border border-slate-200/80 focus:border-[#5ba3b5] focus:ring-4 focus:ring-[#5ba3b5]/10 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-300 transition-all duration-300 outline-none resize-none" required value={form.message} onChange={update('message')} />
                                </div>
                                <div className="md:col-span-2 pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-12 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#5ba3b5] to-[#4a9aad] hover:from-[#7ab8c7] hover:to-[#5ba3b5] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/25 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none text-base"
                                    >
                                        {status === 'loading' ? (
                                            <><FaSpinner className="animate-spin" /> Opening email...</>
                                        ) : (
                                            <><FaPaperPlane className="text-sm opacity-80" /> Send Message</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Service Hours + CTA Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="rounded-[32px] bg-gradient-to-br from-[#2c3a52] to-[#1a2335] p-10 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-[#5ba3b5]/15 rounded-full blur-3xl -mr-16 -mt-16" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#7ab8c7]/10 rounded-full blur-2xl -ml-10 -mb-10" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white/10 text-[#7ab8c7] rounded-2xl flex items-center justify-center text-2xl mb-6">
                                        <FaClock className="animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2">Service Hours</h3>
                                    <div className="space-y-4 mt-6">
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-sm text-slate-400 font-semibold">Emergency</span>
                                            <span className="text-sm font-black text-[#7ab8c7]">24/7</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-sm text-slate-400 font-semibold">Mon – Fri</span>
                                            <span className="text-sm font-bold text-white">8 AM – 6 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                                            <span className="text-sm text-slate-400 font-semibold">Saturday</span>
                                            <span className="text-sm font-bold text-white">9 AM – 3 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-sm text-slate-400 font-semibold">Sunday</span>
                                            <span className="text-sm font-bold text-slate-500">Emergency Only</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a href="tel:+6475730160" className="block rounded-[28px] bg-gradient-to-r from-[#5ba3b5] to-[#4a9aad] p-8 text-white group hover:shadow-xl hover:shadow-[#5ba3b5]/20 transition-all duration-300">
                                <p className="text-sm font-bold opacity-80 mb-2">Need urgent help?</p>
                                <p className="text-2xl font-black mb-4">Call us now</p>
                                <div className="flex items-center gap-2 text-sm font-bold opacity-90 group-hover:gap-3 transition-all">
                                    +1 647-573-0160 <FaArrowRight size={11} />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="px-6 pb-20 relative z-10">
                <div className="container mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">Find Us</h2>
                        <p className="text-slate-500 font-medium">Conveniently located in Bolton, serving all of the GTA.</p>
                    </div>
                    <div className="h-[450px] w-full glass-strong rounded-[32px] overflow-hidden grayscale-[0.6] contrast-[0.95] hover:grayscale-0 transition-all duration-1000 shadow-xl shadow-slate-200/50">
                        <iframe
                            title="Super Handlers location – Unit 3-4, 11 Holland Dr #9, Bolton, ON"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.5688779120046!2d-79.73337492374972!3d43.86476373872174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b21f9bd43da8b%3A0xefe2a12a79cf74a5!2sUnit%203-4%2C%2011%20Holland%20Dr%20%239%2C%20Bolton%2C%20ON%20L7E%201G7%2C%20Canada!5e0!3m2!1sen!2sin!4v1774521344321!5m2!1sen!2sin"
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contact
