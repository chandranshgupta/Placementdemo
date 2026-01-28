'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api, { CampusLocation } from '@/src/services/api';
import clsx from 'clsx';
import IndiaMap from './IndiaMap';

export default function Hero() {
    const [phase, setPhase] = useState(1); // 1: Text, 2: Map, 3: Radar, 4: Nodes, 5: Pulse
    const [locations, setLocations] = useState<CampusLocation[]>([]);
    const [terminalLines, setTerminalLines] = useState<string[]>([]);
    const [showTerminal, setShowTerminal] = useState(true);

    useEffect(() => {
        // Fetch locations relative to API
        api.getCampusLocations().then(setLocations);
    }, []);

    // Animation Sequence Logic
    useEffect(() => {
        // Phase 1: Terminal Text Sequence
        if (phase === 1) {
            const sequence = [
                { text: './status --verbose', delay: 0 },
                { text: '> [INIT] Search Talent Protocol', delay: 800 },
                { text: '> [CHECK] INA, MHA', delay: 1600 },
                { text: '> De<span style="color: #ffff00">[TECH]</span>ted!!', delay: 2400, last: true }
            ];

            let timeouts: NodeJS.Timeout[] = [];

            sequence.forEach((item) => {
                const timeout = setTimeout(() => {
                    setTerminalLines((prev) => [...prev, item.text]);
                    if (item.last) {
                        // After last line, wait then clear text and move to next phase
                        setTimeout(() => {
                            setShowTerminal(false); // Vanish text
                            setTimeout(() => setPhase(2), 500); // Start Map Phase
                        }, 1500);
                    }
                }, item.delay);
                timeouts.push(timeout);
            });

            return () => timeouts.forEach(clearTimeout);
        }
    }, [phase]);

    // Phase Transitions
    useEffect(() => {
        if (phase === 2) {
            setTimeout(() => setPhase(3), 1000); // Map Fade -> Radar
        }
        if (phase === 3) {
            setTimeout(() => setPhase(4), 1000); // Radar -> Nodes
        }
        if (phase === 4) {
            setTimeout(() => setPhase(5), 1000 * locations.length * 0.1 + 500); // Nodes -> Pulse
        }
    }, [phase, locations.length]);


    return (
        <section className="relative w-full h-screen bg-[var(--cyber-bg)] overflow-hidden flex flex-col md:flex-row items-center justify-center p-4 md:p-10 font-mono text-[var(--cyber-text)]">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />

            {/* TERMINAL SECTION (Upper Left) */}
            <AnimatePresence>
                {showTerminal && (
                    <motion.div
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-10 left-5 md:top-20 md:left-20 z-10 w-full max-w-md"
                    >
                        <div className="flex flex-col space-y-2 text-sm md:text-lg lg:text-xl drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]">
                            {terminalLines.map((line, idx) => (
                                <div key={idx}>
                                    <span dangerouslySetInnerHTML={{ __html: line }} />
                                </div>
                            ))}
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block w-2 h-4 bg-[var(--cyber-text)] ml-1"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAP SECTION (Center) */}
            <motion.div
                className="relative w-full h-full max-w-[80vh] aspect-square flex items-center justify-center p-4 md:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 1.5 }}
            >
                {/* Container for Map and Nodes */}
                <div className="relative w-full h-full">

                    {/* India Map Component - Animated */}
                    <div className="absolute inset-0 z-0">
                        {phase >= 2 && <IndiaMap />}
                    </div>


                    {/* RADAR SWEEP (Phase 3+) */}
                    {phase >= 3 && (
                        <motion.div
                            className="absolute w-full h-full border border-[var(--cyber-radar)] rounded-full opacity-30 pointer-events-none"
                            style={{
                                top: '50%',
                                left: '50%',
                                width: '100%',
                                height: '100%',
                                transform: 'translate(-50%, -50%)',
                                borderWidth: '1px',
                                borderStyle: 'dashed'
                            }}
                            initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
                            animate={{ scale: [0, 1.4], opacity: [0.5, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                                ease: "linear",
                                delay: 0.5
                            }}
                        />
                    )}

                    {/* CAMPUS NODES (Phase 4+) - Positioned Absolute Over Map */}
                    {/* Coordinates in API now need to range roughly 0-100 across the square image */}
                    <AnimatePresence>
                        {locations.map((loc, idx) => (
                            (phase >= 4) && (
                                <motion.div
                                    key={loc.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        delay: idx * 0.1,
                                        type: "spring", stiffness: 200, damping: 10
                                    }}
                                    className="absolute cursor-pointer flex flex-col items-center group z-20"
                                    style={{
                                        top: `${loc.coordinates.y}%`,
                                        left: `${loc.coordinates.x}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                    onClick={() => window.open(loc.url, '_blank')}
                                >
                                    {/* Dot */}
                                    <motion.div
                                        className={clsx(
                                            "w-2 h-2 rounded-full",
                                            loc.isHero ? "bg-[var(--cyber-text)] w-3 h-3 shadow-[0_0_10px_var(--cyber-text)]" : "bg-white"
                                        )}
                                        animate={loc.isHero && phase >= 5 ? {
                                            boxShadow: ["0 0 0 0px rgba(0, 255, 65, 0.7)", "0 0 0 20px rgba(0, 255, 65, 0)"],
                                        } : {}}
                                        transition={loc.isHero ? { repeat: Infinity, duration: 1.5 } : {}}
                                    />

                                    {/* Tooltip Label (Hover) */}
                                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-4 text-xs bg-black/80 px-2 py-1 rounded text-white whitespace-nowrap pointer-events-none transition-opacity border border-[var(--cyber-radar)]">
                                        {loc.name}
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* CTA NAVIGATION ((Bottom Center)) */}
            <motion.div
                className="absolute bottom-10 flex space-x-6 z-20"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 4, duration: 0.8 }}
            >
                <button className="px-6 py-2 border border-[var(--cyber-text)] text-[var(--cyber-text)] bg-transparent hover:bg-[var(--cyber-text)] hover:text-black transition-colors duration-300 font-bold uppercase tracking-wider backdrop-blur-sm">
                    [ View Talent Data ]
                </button>
                <button className="px-6 py-2 border border-[var(--cyber-radar)] text-[var(--cyber-radar)] bg-transparent hover:bg-[var(--cyber-radar)] hover:text-black transition-colors duration-300 font-bold uppercase tracking-wider backdrop-blur-sm">
                    [ Explore Curriculum ]
                </button>
            </motion.div>
        </section>
    );
}
