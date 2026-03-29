"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal, { ScrollRevealGroup } from '../component/ScrollReveal'
import { FaQuoteLeft, FaHandshake, FaGlobeAmericas, FaAward, FaTruckLoading, FaCogs, FaPhoneAlt, FaArrowRight } from 'react-icons/fa'

const About = () => {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50">
      <div className="bg-orb orb-1 opacity-10"></div>
      <div className="bg-orb orb-2 opacity-10"></div>

      {/* Hero with full-bleed image */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        <Image
          src="/wp7388677-forklift-wallpapers.jpg"
          fill
          className="object-cover"
          alt="Super Handlers forklift operations"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2335] via-[#1a2335]/70 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 pb-20 md:pb-28">
          <ScrollReveal animation="fade-up" duration={800}>
            <span className="inline-block py-1.5 px-5 rounded-full bg-[#5ba3b5]/20 text-[#7ab8c7] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/30 backdrop-blur-sm">
              Est. Brampton, ON
            </span>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150} duration={900}>
            <h1 className="text-4xl md:text-7xl font-black mb-5 tracking-tight leading-[0.95] text-white max-w-3xl">
              Built to Keep<br />
              <span className="text-[#7ab8c7]">Industry Moving.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300} duration={900}>
            <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">
              Premier forklift maintenance, expert repairs, and certified parts — proudly serving the Greater Toronto Area.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="container mx-auto px-6 relative z-10">

        {/* Mission + Image Side-by-Side */}
        <section className="py-24 flex flex-col lg:flex-row items-center gap-16">
          <ScrollReveal animation="fade-right" className="lg:w-1/2">
            <div className="space-y-8">
              <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase border border-[#5ba3b5]/20">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Driven by <span className="text-[#5ba3b5]">Excellence</span><br />Since Day One.
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-loose">
                Super Handlers has established itself as a premier provider of forklift maintenance, expert repair services, and high-quality parts in the Greater Toronto Area. Our commitment to excellence is reflected in every service call, every part we supply, and every relationship we build.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                <div className="space-y-3">
                  <FaHandshake className="text-3xl text-[#5ba3b5]" />
                  <h4 className="font-black text-slate-900">Integrity First</h4>
                  <p className="text-sm text-slate-500">Transparent quotes and honest service calls.</p>
                </div>
                <div className="space-y-3">
                  <FaAward className="text-3xl text-[#5ba3b5]" />
                  <h4 className="font-black text-slate-900">Top Quality</h4>
                  <p className="text-sm text-slate-500">Only genuine and certified aftermarket parts.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={200} className="lg:w-1/2">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-slate-300/50 aspect-[4/5]">
              <Image
                src="/aboutImage.jpg"
                fill
                className="object-cover"
                alt="Super Handlers team at work"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2335]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="glass-strong rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#5ba3b5] rounded-xl flex items-center justify-center shrink-0">
                    <FaTruckLoading className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">Trusted by 1000+ Clients</p>
                    <p className="text-xs text-slate-500">Across GTA since inception</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Stats Band */}
        <ScrollReveal animation="zoom-in">
          <section className="rounded-[32px] bg-gradient-to-r from-[#2c3a52] to-[#1a2335] p-10 md:p-16 mb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#5ba3b5]/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#7ab8c7]/8 rounded-full blur-[80px] -ml-10 -mb-10 pointer-events-none" />
            <ScrollRevealGroup animation="fade-up" stagger={100} className="grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
              {[
                { val: '15+', label: 'Years Experience' },
                { val: '24/7', label: 'Support Available' },
                { val: '500+', label: 'Parts in Stock' },
                { val: '1000+', label: 'Happy Clients' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-4xl md:text-5xl font-black text-[#7ab8c7] mb-2 tracking-tighter">{stat.val}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                </div>
              ))}
            </ScrollRevealGroup>
          </section>
        </ScrollReveal>

        {/* Service Area + Quote — 2 Column */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <ScrollReveal animation="fade-right">
            <div className="glass-card p-10 md:p-12 rounded-[32px] overflow-hidden group flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-8">
                  <FaGlobeAmericas className="text-4xl text-[#5ba3b5] group-hover:rotate-12 transition-transform duration-500" />
                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100">ACTIVE REGION</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6">Toronto &amp; GTA</h3>
                <ul className="space-y-4 text-slate-600 font-medium mb-8">
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#5ba3b5]"></span> Brampton Headquarters</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#5ba3b5]"></span> Mississauga Service Hub</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#5ba3b5]"></span> Toronto Metro Area</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#5ba3b5]"></span> Vaughan &amp; Etobicoke</li>
                </ul>
              </div>
              <Link href="/contact" className="text-[#5ba3b5] font-black flex items-center gap-2 group-hover:gap-3 transition-all">
                View Service Area <FaArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={150}>
            <div className="rounded-[32px] overflow-hidden relative min-h-[420px] flex items-end h-full">
              <Image
                src="/wp7388664-forklift-wallpapers.jpg"
                fill
                className="object-cover"
                alt="Forklift operations"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2335] via-[#1a2335]/80 to-[#1a2335]/30" />
              <div className="relative z-10 p-10 md:p-12 w-full">
                <FaQuoteLeft className="text-4xl text-[#5ba3b5]/50 mb-6" />
                <p className="text-xl md:text-2xl font-black text-white leading-snug mb-8">
                  &ldquo;Our mission is simple: keep the engines of Canadian industry running smoothly through expert care.&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#5ba3b5] rounded-full flex items-center justify-center font-black text-white text-sm">SH</div>
                  <div>
                    <p className="font-black text-white uppercase text-xs tracking-[0.15em]">Super Handlers Management</p>
                    <p className="text-xs text-slate-400">Founded on trust since inception.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Full-width image break */}
        <ScrollReveal animation="zoom-in">
          <section className="mb-24 rounded-[32px] overflow-hidden relative h-[50vh] min-h-[360px]">
            <Image
              src="/forklift-for-rent.jpg"
              fill
              className="object-cover"
              alt="Forklift fleet ready for service"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2335]/90 via-[#1a2335]/50 to-transparent" />
            <div className="relative z-10 h-full flex items-center p-10 md:p-16">
              <div className="max-w-lg">
                <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/20 text-[#7ab8c7] text-[10px] font-black tracking-[0.2em] uppercase mb-5 border border-[#5ba3b5]/30">
                  Fleet Solutions
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">Rental &amp; Sales for Every Scale</h3>
                <p className="text-slate-300 font-medium leading-relaxed mb-8">
                  From single-unit rentals to full fleet management — we have the right forklift for your operation, ready when you need it.
                </p>
                <Link href="/shop" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/20">
                  Browse Inventory <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Core Pillars */}
        <ScrollReveal animation="fade-up">
          <section className="text-center py-20 px-6 md:px-16 glass-strong rounded-[40px] shadow-sm mb-24">
            <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
              Our Values
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Built on Three Core Pillars.</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto mb-16">The principles behind every service call, every repair, and every part we deliver.</p>
            <ScrollRevealGroup animation="fade-up" stagger={150} className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-5 group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5ba3b5] to-[#7ab8c7] text-white rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-lg shadow-[#5ba3b5]/20 group-hover:scale-110 transition-transform duration-300">
                  <FaTruckLoading />
                </div>
                <h4 className="text-xl font-black text-slate-900">Swift Mobility</h4>
                <p className="text-slate-500 font-medium max-w-xs mx-auto">Fast on-site repairs across the Greater Toronto Area — we come to you.</p>
              </div>
              <div className="space-y-5 group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5ba3b5] to-[#7ab8c7] text-white rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-lg shadow-[#5ba3b5]/20 group-hover:scale-110 transition-transform duration-300">
                  <FaCogs />
                </div>
                <h4 className="text-xl font-black text-slate-900">Technical Mastery</h4>
                <p className="text-slate-500 font-medium max-w-xs mx-auto">Certified mechanics with deep expertise across all major brands.</p>
              </div>
              <div className="space-y-5 group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5ba3b5] to-[#7ab8c7] text-white rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-lg shadow-[#5ba3b5]/20 group-hover:scale-110 transition-transform duration-300">
                  <FaHandshake />
                </div>
                <h4 className="text-xl font-black text-slate-900">Long-term Vision</h4>
                <p className="text-slate-500 font-medium max-w-xs mx-auto">Built for lasting partnerships and repeat trust.</p>
              </div>
            </ScrollRevealGroup>
          </section>
        </ScrollReveal>

        {/* CTA Banner */}
        <ScrollReveal animation="fade-up">
          <section className="rounded-[32px] bg-gradient-to-br from-[#2c3a52] to-[#1a2335] p-10 md:p-16 mb-24 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#5ba3b5]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="flex-1 relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight tracking-tight">Ready to Keep Your Fleet Running?</h2>
              <p className="text-slate-400 font-medium text-lg">Get a free consultation and same-day service quote from our team.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/20">
                <FaPhoneAlt className="text-sm" /> Get a Quote
              </Link>
              <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-300">
                Browse Parts
              </Link>
            </div>
          </section>
        </ScrollReveal>

      </div>
    </main>
  )
}

export default About
