'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// --- Types ---
interface StatItemProps {
    label: string;
    value: number;
    color: string;
    delay?: number;
}

// --- Counter Component ---
const Counter = ({ value, color, delay = 0 }: { value: number; color: string; delay?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    // Trigger earlier to ensure visibility - simpler logic
    const inView = useInView(ref, { once: true, margin: "0px" });
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Wait for inView
        if (!inView) return;

        // Use framer-motion's animate function for reliable value interpolation
        const controls = animate(0, value, {
            duration: 2,
            delay: delay,
            ease: "easeOut",
            onUpdate(currentValue) {
                if (ref.current) {
                    ref.current.textContent = Math.floor(currentValue).toString();
                }
            },
            onComplete() {
                setIsComplete(true);
                // Ensure final value matches exactly just in case
                if (ref.current) {
                    ref.current.textContent = value.toString();
                }
            }
        });

        return () => controls.stop();
    }, [inView, value, delay]);

    return (
        <div className="flex justify-center items-baseline relative mx-auto w-fit">
            {/* Number */}
            <span
                ref={ref}
                className="text-5xl md:text-6xl font-bold tracking-tight tabular-nums block min-w-[3ch] text-center"
                style={{ color: color }}
            >
                0
            </span>

            {/* The + Sign Animation */}
            <motion.span
                className="text-3xl md:text-4xl font-bold absolute -right-6 top-0"
                style={{ color: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                +
            </motion.span>
        </div>
    );
};

// --- Stat Item Component ---
const StatItem = ({ label, value, color, delay }: StatItemProps) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-4">
            {/* Counter */}
            <Counter value={value} color={color} delay={delay} />

            {/* Label */}
            <p className="mt-2 text-sm md:text-base font-open-sans font-semibold tracking-widest uppercase text-[#333333]">
                {label}
            </p>
        </div>
    );
};

export default function StatsSection() {
    const stats = [
        { label: "Seminars Conducted", value: 100, color: "#002147" }, // Oxford Blue
        { label: "Students Enrolled", value: 300, color: "#ddb55e" },    // Golden Yellow
        { label: "Research Published", value: 100, color: "#002147" }, // Oxford Blue
        { label: "MoUs Signed", value: 280, color: "#ddb55e" },        // Golden Yellow
    ];

    return (
        <section className="w-full bg-white py-16 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {stats.map((stat, idx) => (
                        <StatItem
                            key={idx}
                            {...stat}
                            delay={idx * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
