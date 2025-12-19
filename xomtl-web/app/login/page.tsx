'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-space-grotesk'
});

// --- Components ---

/**
 * Terminal Decoding effect for text
 */
const DecodingText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
    const [displayText, setDisplayText] = useState('');
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    useEffect(() => {
        let iteration = 0;
        let interval: NodeJS.Timeout;

        const timeout = setTimeout(() => {
            interval = setInterval(() => {
                setDisplayText(
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        }, delay * 1000);

        return () => {
            clearTimeout(timeout);
            if (interval) clearInterval(interval);
        };
    }, [text, delay]);

    return <span className={className}>{displayText}</span>;
};

/**
 * Magnetic button logic
 */
const MagnetButton = ({
    children,
    onClick,
    className = "",
    type = "button",
    href
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
    href?: string;
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        const pull = 0.35;
        setPosition({ x: x * pull, y: y * pull });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative ${className}`}
        >
            <div className="w-full h-full cursor-pointer" onClick={onClick}>
                {children}
            </div>
        </motion.div>
    );

    if (href) {
        return <Link href={href} className="flex">{content}</Link>;
    }

    return <button type={type} className="w-full flex">{content}</button>;
};

/**
 * Mouse following spotlight effect
 */
const MouseSpotlight = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            animate={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(220, 38, 38, 0.05), transparent 80%)`,
            }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
        />
    );
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <main className={`relative min-h-screen bg-[#000] text-white flex flex-col items-center justify-center p-6 ${spaceGrotesk.className} selection:bg-red-600/40 overflow-hidden`}>
            <MouseSpotlight />

            {/* Grid Pattern Overlay */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-[380px] relative z-10 flex flex-col items-center"
            >
                {/* Header Section */}
                <div className="mb-32 text-center">
                    <h1 className="text-8xl md:text-9xl font-bold tracking-[-0.05em] uppercase leading-none">
                        <DecodingText
                            text="LOGIN"
                            delay={0.4}
                            className="text-white"
                        />
                    </h1>
                </div>

                {/* Form Section */}
                <form className="w-full space-y-16 flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
                    <div className="w-full space-y-10">
                        {/* Security ID Field */}
                        <div className="w-full text-center relative group">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="USERNAME"
                                className="w-full bg-transparent border-b border-white/10 focus:border-[#dc2626]/40 py-8 text-[12px] font-bold tracking-[0.5em] uppercase focus:outline-none transition-all placeholder:text-zinc-900 text-center focus:shadow-[0_4px_20px_-10px_rgba(220,38,38,0.3)]"
                            />
                        </div>

                        {/* Passcode Field */}
                        <div className="w-full text-center relative group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-transparent border-b border-white/10 focus:border-[#dc2626]/40 py-8 text-[12px] font-bold tracking-[1em] focus:outline-none transition-all placeholder:text-zinc-900 text-center focus:shadow-[0_4px_20px_-10px_rgba(220,38,38,0.3)]"
                            />
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="w-full flex flex-col items-center space-y-20">
                        <div className="w-[260px]">
                            <MagnetButton type="submit" className="w-full">
                                <div className="w-full bg-white text-black py-6 flex items-center justify-center transition-all duration-500 hover:bg-zinc-200 font-black tracking-[0.8em] uppercase text-[11px] shadow-2xl">
                                    SIGN IN
                                </div>
                            </MagnetButton>
                        </div>

                        {/* Forgot Password */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            transition={{ delay: 1.5 }}
                            className="text-[9px] font-bold tracking-[0.4em] text-white uppercase hover:opacity-100 transition-opacity cursor-pointer whitespace-nowrap"
                        >
                            Forgot Password?
                        </motion.span>
                    </div>
                </form>
            </motion.div>

            {/* Footer Navigation Area */}
            <div className="fixed bottom-12 w-full flex flex-col items-center space-y-8 z-50">
                {/* Return Link - Subtle and Centered */}
                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 2 }}
                        className="flex items-center gap-2 px-4 py-2 text-zinc-500 hover:text-white hover:opacity-100 transition-all group cursor-pointer"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[9px] font-bold tracking-[0.5em] uppercase">Return</span>
                    </motion.div>
                </Link>

                {/* Optional Branding */}
                <p className="text-[9px] font-bold tracking-[0.6em] text-white/5 uppercase italic whitespace-nowrap select-none pointer-events-none">
                    "Focus is the Currency of Gods"
                </p>
            </div>

            {/* Screen Edge Vignette */}
            <div className="fixed inset-0 pointer-events-none border-[120px] border-black/40 blur-[140px] z-20" />
        </main>
    );
}
