'use client';

import React from 'react';
import { facultyTeam } from '@/src/services/api';

export default function TeamSection() {
    return (
        <section className="w-full bg-white py-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Minimalist Heading */}
                <h3 className="text-gray-500 font-bold tracking-[0.2em] text-xs uppercase mb-2">
                    THE TEAM
                </h3>
                <h2 className="text-[#002147] font-bold text-3xl mb-12">
                    Placement Committee
                </h2>

                {/* Team Grid */}
                {/* Centered logic: Grid with centered items? Or Flex? 
                    Design asks for 2 columns centered on desktop.
                    If more items were added, grid is better. For 2 items, flex or grid is fine.
                    Let's use Grid with max-width constraint to keep them close.
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {facultyTeam.map((member) => (
                        <div
                            key={member.id}
                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-[#ddb55e] hover:-translate-y-1"
                            onClick={() => window.open(member.link, '_blank')}
                        >
                            {/* Image Area */}
                            <div className="w-full aspect-[4/3] overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Text Area */}
                            <div className="p-6 text-left">
                                <h3 className="text-[#002147] font-bold text-lg leading-tight group-hover:text-[#ddb55e] transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-gray-500 text-sm font-medium mt-1">
                                    {member.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
