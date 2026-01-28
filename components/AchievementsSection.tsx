'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { achievements } from '@/src/services/api';

export default function AchievementsSection() {
    // Double the list to ensure smooth infinite loop coverage with -50% Scroll
    const duplicatedAchievements = [...achievements, ...achievements];

    return (
        <section className="w-full bg-white py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h2 className="text-3xl font-bold text-[#002147] tracking-tight">
                    Student Achievements
                </h2>
                <div className="w-20 h-1 bg-[#ddb55e] mt-2"></div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden group"> {/* group for hover pause */}
                <div
                    className="flex gap-16 animate-scroll group-hover:[animation-play-state:paused] w-max px-4"
                >
                    {duplicatedAchievements.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="relative w-[400px] h-[550px] flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-2xl transition-shadow duration-300 bg-gray-100 cursor-pointer group/card"
                            onClick={() => window.open(item.link, '_blank')}
                        >
                            {/* Full Background Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                            />

                            {/* Glass Overlay */}
                            <div className="absolute bottom-0 left-0 w-full h-[35%] bg-black/40 backdrop-blur-md border-t border-white/10 p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-white font-bold text-lg leading-tight truncate">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-200 text-xs mt-1 line-clamp-2 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Button */}
                                <button className="self-start mt-3 bg-white text-black text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-200 transition-colors">
                                    View More <ExternalLink size={10} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Optional Gradients edges for fading effect */}
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
}
