'use client';

import React, { useState } from 'react';
import { CheckCircle2, User, Building2, Mail, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function RegistrationSection() {
    // State for focus management
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    return (
        <section className="relative w-full py-20 md:py-32 overflow-hidden flex items-center justify-center">
            {/* 1. Background Layer */}
            {/* Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/s1.jpg')` }}
            />
            {/* Oxford Blue Overlay (90% Opacity) */}
            <div className="absolute inset-0 z-1 bg-[#002147]/90" />

            {/* 2. Glass Card Centerpiece */}
            <div className="relative z-10 w-full max-w-6xl mx-4 lg:mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

                {/* Left Side (The Pitch) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
                    {/* Badge */}
                    <div className="self-start bg-[#ddb55e] text-[#002147] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                        Recruiters & Partners
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 font-poppins">
                        Partner with an Institute of <span className="text-[#ddb55e]">National Importance.</span>
                    </h2>

                    {/* Checklist */}
                    <ul className="space-y-4">
                        {[
                            "Access to 300+ Pre-vetted Profiles",
                            "Zero Cost Hiring & Placement Drives",
                            "Dedicated Corporate Relations Team"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <CheckCircle2 className="text-[#ddb55e]" size={20} />
                                <span className="text-gray-200 text-sm md:text-base font-medium font-open-sans">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side (The Form) */}
                <div className="w-full md:w-1/2 bg-white/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10">
                    <form className="space-y-6">
                        {/* Name Input */}
                        <div className="relative group">
                            <User className={clsx("absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300", focusedInput === 'name' ? 'text-[#ddb55e]' : 'text-gray-400')} size={18} />
                            <input
                                type="text"
                                placeholder="Your Name"
                                className={clsx(
                                    "w-full bg-transparent border rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 outline-none transition-all duration-300",
                                    focusedInput === 'name' ? 'border-[#ddb55e] bg-white/20' : 'border-white/20 hover:border-white/40'
                                )}
                                onFocus={() => setFocusedInput('name')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>

                        {/* Organization Input */}
                        <div className="relative group">
                            <Building2 className={clsx("absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300", focusedInput === 'org' ? 'text-[#ddb55e]' : 'text-gray-400')} size={18} />
                            <input
                                type="text"
                                placeholder="Organization Name"
                                className={clsx(
                                    "w-full bg-transparent border rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 outline-none transition-all duration-300",
                                    focusedInput === 'org' ? 'border-[#ddb55e] bg-white/20' : 'border-white/20 hover:border-white/40'
                                )}
                                onFocus={() => setFocusedInput('org')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <Mail className={clsx("absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300", focusedInput === 'email' ? 'text-[#ddb55e]' : 'text-gray-400')} size={18} />
                            <input
                                type="email"
                                placeholder="Official Email Address"
                                className={clsx(
                                    "w-full bg-transparent border rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 outline-none transition-all duration-300",
                                    focusedInput === 'email' ? 'border-[#ddb55e] bg-white/20' : 'border-white/20 hover:border-white/40'
                                )}
                                onFocus={() => setFocusedInput('email')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </div>

                        {/* CTA Button */}
                        <button
                            type="button"
                            className="w-full bg-[#ddb55e] text-[#002147] font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 shadow-lg mt-4"
                        >
                            Register Interest
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
