"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, APP_CONFIG } from "@/constants";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 md:px-12 py-6 glass !border-none !rounded-none"
      >
        <Link href="/" className="text-lg font-bold tracking-tighter text-white uppercase flex items-center gap-1 group">
          <span className="text-red-600 font-black group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] transition-all">ANTI</span>
          <span className="opacity-80 font-medium">-ADHD</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center">
          {NAV_LINKS.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.8 }}
            >
              <Link
                href={isLoginPage ? `/${link.href}` : link.href}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:tracking-[0.3em] ${link.label === "Tired?" ? "text-red-500/60 hover:text-red-500" : "text-white/40 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link href="/login" className="ghost-button">
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white/60 hover:text-red-600 transition-colors relative z-[101]"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[90] glass flex flex-col items-center justify-center gap-12 pt-20"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={isLoginPage ? `/${link.href}` : link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black uppercase tracking-[0.3em] text-white/40 hover:text-red-600 transition-all hover:scale-110"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black uppercase tracking-[0.3em] text-red-600 hover:scale-110 transition-all"
            >
              Sign In
            </Link>

            <div className="absolute bottom-12 text-[10px] uppercase tracking-[1em] text-white/10 font-bold">
              Elite Protocol Active
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
