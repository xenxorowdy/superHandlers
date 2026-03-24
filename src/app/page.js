"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BrandsEffect from './component/BrandsEffect'
import ScrollReveal, { ScrollRevealGroup } from './component/ScrollReveal'
import { FaWrench, FaCogs, FaTools, FaCheckCircle, FaStar, FaShieldAlt, FaArrowRight } from 'react-icons/fa'

export default function Home() {
  const services = [
    { title: 'Emergency Repair', description: 'On-site mobile forklift repairs available 24/7 in Brampton & Toronto.', icon: <FaWrench /> },
    { title: 'Planned Maintenance', description: 'Preventative programs to keep your fleet running at peak efficiency.', icon: <FaCogs /> },
    { title: 'Parts Inventory', description: 'Genuine OEM and high-quality aftermarket parts for all major brands.', icon: <FaTools /> },
  ]

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {/* Hero with Background Image */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/wp7388677-forklift-wallpapers.jpg"
          fill
          className="object-cover"
          alt="Forklift warehouse operations"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2335]/95 via-[#1a2335]/80 to-[#1a2335]/40" />

        <div className="container mx-auto px-6 relative z-10 py-32">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up" duration={800}>
              <span className="inline-block py-1.5 px-5 rounded-full bg-[#5ba3b5]/20 text-[#7ab8c7] text-[10px] font-black tracking-[0.2em] uppercase mb-8 border border-[#5ba3b5]/30 backdrop-blur-sm">
                Reliable Forklift Solutions
              </span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150} duration={900}>
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[0.95] text-white">
                SUPER<br />
                <span className="text-[#7ab8c7]">HANDLERS</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300} duration={900}>
              <p className="text-lg md:text-xl text-slate-300 max-w-xl mb-10 font-medium leading-relaxed">
                Premium forklift maintenance, parts, and expert repair services across Brampton and the Greater Toronto Area. We keep your business moving.
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={450}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/25 active:scale-95">
                  Shop Parts <FaArrowRight size={12} />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-300 backdrop-blur-sm">
                  Get a Quote
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white/50 border-y border-slate-100">
        <div className="container mx-auto">
          <ScrollRevealGroup animation="fade-up" stagger={100} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: '15+', label: 'Years Experience' },
              { val: '24/7', label: 'Support Available' },
              { val: '500+', label: 'Parts in Stock' },
              { val: '1000+', label: 'Happy Clients' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-black text-[#5ba3b5] mb-2 tracking-tighter">{stat.val}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-5 border border-[#5ba3b5]/20">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Our Core Services</h2>
          </ScrollReveal>
          
          <ScrollRevealGroup animation="fade-up" stagger={150} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="glass-card p-10 rounded-[24px] group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5ba3b5] to-[#7ab8c7] text-white rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#5ba3b5]/20">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 leading-tight">{service.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">{service.description}</p>
                <Link href="/contact" className="text-[#5ba3b5] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <FaArrowRight size={11} />
                </Link>
              </div>
            ))}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* Brands Slider */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-in">
            <div className="text-center mb-12">
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4">We Specialize In</p>
            </div>
            <BrandsEffect />
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <ScrollReveal animation="fade-right" className="flex-1">
              <span className="inline-block py-1 px-4 rounded-full bg-[#5ba3b5]/10 text-[#5ba3b5] text-[10px] font-black tracking-[0.2em] uppercase mb-6 border border-[#5ba3b5]/20">
                Why Us
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8 leading-tight">Expert Service You Can Count On</h2>
              <div className="space-y-6">
                {[
                  { text: 'Certified expert technicians with decades of experience.', icon: <FaShieldAlt /> },
                  { text: 'Fast response times and same-day mobile repairs.', icon: <FaCheckCircle /> },
                  { text: 'Competitive pricing and transparent estimates.', icon: <FaStar /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 text-[#5ba3b5] text-xl shrink-0">{item.icon}</div>
                    <p className="text-lg text-slate-600 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#5ba3b5] hover:bg-[#7ab8c7] transition-all duration-300 shadow-lg shadow-[#5ba3b5]/20 active:scale-95 mt-12">
                Schedule Appointment <FaArrowRight size={12} />
              </Link>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={200} className="flex-1 w-full">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-slate-300/50 aspect-[4/5] max-w-lg mx-auto">
                <Image 
                  src="/homescreen.jpg" 
                  fill 
                  className="object-cover" 
                  alt="Super Handlers Forklift Services" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2335]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass-strong rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#5ba3b5] rounded-xl flex items-center justify-center shrink-0">
                      <FaShieldAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">Certified Technicians</p>
                      <p className="text-xs text-slate-500">Licensed & fully insured</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  )
}
