"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { WISDOM_QUOTES } from "@/constants";

const WisdomSanctuary: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % WISDOM_QUOTES.length);
        }, 10000);
        return () => clearInterval(timer);
    }, []);

    const current = WISDOM_QUOTES[currentIndex];

    return (
        <section id="wisdom" className="w-full py-60 px-8 flex flex-col items-center overflow-hidden">
            <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="max-w-2xl text-center mb-24"
                >
                    <span className="text-[9px] uppercase tracking-[0.6em] text-white/20 mb-6 block font-bold">The Sanctuary of Wisdom</span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">WORDS FOR MEDITATION</h2>
                </motion.div>

                <div className="relative w-full min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.author}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
                        >
                            {/* LEFT SIDE: PORTRAIT */}
                            <div className="relative w-full max-w-sm mx-auto md:mx-0 aspect-[3/4] rounded-[2.5rem] overflow-hidden glass shadow-[0_30px_80px_rgba(0,0,0,0.5)] float-card">
                                <Image
                                    src={current.image}
                                    alt={current.author}
                                    fill
                                    className="object-cover grayscale brightness-90 contrast-125 saturate-125 transition-all duration-1000"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* RIGHT SIDE: CONTENT */}
                            <div className="flex flex-col text-center md:text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="mb-12"
                                >
                                    <p className="text-white/95 text-xl md:text-3xl font-light italic leading-relaxed text-balance">
                                        "{current.quote}"
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                >
                                    <p className="text-white text-3xl font-black tracking-tighter mb-2">{current.author.toUpperCase()}</p>
                                    <div className="h-0.5 w-16 bg-red-600/80 mb-6 mx-auto md:ml-0" />
                                    <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black leading-relaxed max-w-sm">
                                        {current.bio}
                                    </p>
                                </motion.div>

                                <div className="mt-16 flex gap-2 justify-center md:justify-start">
                                    {WISDOM_QUOTES.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-0.5 transition-all duration-1000 origin-left ${i === currentIndex ? 'w-12 bg-red-600/60' : 'w-2 bg-white/5'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default WisdomSanctuary;
