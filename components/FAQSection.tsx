'use client';

import React, { useState } from 'react';
import { faqs } from '@/src/services/api';
import { Plus, Minus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    // Toggle function
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Slice data based on showAll state
    const visibleFAQs = showAll ? faqs : faqs.slice(0, 6);

    return (
        <section className="w-full bg-white py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <h2 className="text-center text-[#002147] font-bold text-3xl md:text-4xl mb-12">
                    Frequently Asked Questions
                </h2>

                {/* FAQ List */}
                <div className="border-t border-gray-200">
                    {visibleFAQs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200">
                            {/* Question Row */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
                            >
                                <span className={`text-lg font-semibold pr-8 transition-colors duration-200 ${openIndex === index ? 'text-[#ddb55e]' : 'text-[#002147] group-hover:text-[#002147]/80'}`}>
                                    {faq.q}
                                </span>
                                <span className="flex-shrink-0 text-[#002147]">
                                    {/* Icon Rotation */}
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 45 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Plus size={24} />
                                    </motion.div>
                                </span>
                            </button>

                            {/* Answer Row (Animated) */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-5 text-gray-600 leading-relaxed text-sm md:text-base">
                                            {/* Render answer with link parsing basics if needed, or just text */}
                                            {/* Given the complexity of links in text, simplistic rendering here. 
                                                For robust link rendering, we'd need parsing, but user provided markdown-like links. 
                                                I will do a simple regex replace for links if possible, or just render text. 
                                                The prompt shows markdown style links. Let's try to simple render.
                                            */}
                                            <p dangerouslySetInnerHTML={{
                                                __html: faq.a.replace(/\((https?:\/\/[^\s]+)\)/g, '(<a href="$1" target="_blank" class="text-blue-600 underline hover:text-blue-800">$1</a>)')
                                            }} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {!showAll && faqs.length > 6 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="border border-[#002147] text-[#002147] px-8 py-3 rounded-full font-bold hover:bg-[#002147] hover:text-white transition-all duration-300"
                        >
                            Read all FAQs
                        </button>
                    </div>
                )}

                {/* Show Less Button (Optional, good UX) */}
                {showAll && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => {
                                setShowAll(false);
                                setOpenIndex(null); // Close active when collapsing
                                // Optional: Scroll back to top of list
                                window.scrollTo({ top: document.getElementById('faq-section')?.offsetTop, behavior: 'smooth' });
                            }}
                            className="text-gray-500 hover:text-[#002147] text-sm underline"
                        >
                            Show Less
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
