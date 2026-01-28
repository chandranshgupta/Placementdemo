'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { recruiters, brochureLink } from '@/src/services/api';

export default function RecruitersSection() {
    return (
        <section className="w-full bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Minimalist Heading */}
                <h2 className="text-gray-500 font-bold tracking-[0.2em] text-sm uppercase mb-16">
                    Expertise That Delivers
                </h2>

                {/* Logo Grid */}
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 mb-20">
                    {recruiters.map((recruiter) => (
                        <div
                            key={recruiter.id}
                            className="group relative w-32 md:w-40 h-10 md:h-12 flex items-center justify-center transition-all duration-300"
                        >
                            <img
                                src={recruiter.logo}
                                alt={recruiter.name}
                                className="w-full h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                            />
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <a
                        href={brochureLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#002147] text-white px-8 py-3 rounded-md font-bold text-sm tracking-wide flex items-center gap-2 hover:-translate-y-1 hover:bg-[#003366] hover:shadow-lg transition-all duration-300 group"
                    >
                        Download Brochure
                        <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
}
