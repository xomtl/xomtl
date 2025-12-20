"use client";

import React from "react";
import { motion } from "framer-motion";
import MagnetButton from "./MagnetButton";
import { HERO_CONTENT } from "@/constants";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
    const router = useRouter();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const handleLearnMore = () => {
        const section = document.getElementById('roadmap');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-[5rem] font-black tracking-tighter mb-8 text-white leading-[0.9] uppercase"
                >
                    {HERO_CONTENT.title}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-white/30 mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-tight"
                >
                    {HERO_CONTENT.subtitle}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                >
                    <MagnetButton
                        variant="primary"
                        className="!px-12"
                        onClick={() => router.push('/login')}
                    >
                        {HERO_CONTENT.primaryCta}
                    </MagnetButton>
                    <MagnetButton
                        variant="secondary"
                        onClick={handleLearnMore}
                        className="!px-10"
                    >
                        {HERO_CONTENT.secondaryCta}
                    </MagnetButton>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2, delay: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[1em] text-white"
            >
                Scroll to enter
            </motion.div>
        </section>
    );
};

export default HeroSection;
