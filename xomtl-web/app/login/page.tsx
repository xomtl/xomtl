"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MagnetButton from "@/components/MagnetButton";

export default function Login() {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden selection:bg-red-600/30">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md p-10 md:p-12 glass rounded-[2.5rem] flex flex-col items-center text-center float-card"
            >
                <span className="text-[9px] uppercase tracking-[0.8em] text-red-600/60 mb-6 font-bold">Secure Protocol</span>
                <h1 className="text-3xl font-black mb-3 tracking-tighter text-white">WELCOME BACK</h1>
                <p className="text-white/30 text-xs mb-10 font-light tracking-tight">Identity verified. Enter sanctuary.</p>

                <form className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1 text-left">
                        <label className="text-[9px] uppercase tracking-widest text-white/20 ml-4 font-bold">Email Address</label>
                        <input
                            type="email"
                            placeholder="e.g. user@sanctuary.io"
                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder:text-white/10 text-sm"
                        />
                    </div>

                    <div className="space-y-1 text-left">
                        <label className="text-[9px] uppercase tracking-widest text-white/20 ml-4 font-bold">PASSWORD</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-5 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder:text-white/10 text-sm"
                        />
                    </div>

                    <div className="pt-4">
                        <MagnetButton className="w-full !py-4 text-[10px]">
                            SIGN IN
                        </MagnetButton>
                    </div>
                </form>

                <Link
                    href="/"
                    className="mt-10 text-[9px] uppercase tracking-[0.5em] text-white/20 hover:text-white transition-all hover:tracking-[0.6em] font-bold"
                >
                    Return to Hub
                </Link>
            </motion.div>
        </main>
    );
}
