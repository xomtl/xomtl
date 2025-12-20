"use client";

import HeroSection from "@/components/HeroSection";
import WisdomSanctuary from "@/components/WisdomSanctuary";
import { motion } from "framer-motion";
import { ROADMAP_CONTENT, APP_CONFIG } from "@/constants";
import Link from "next/link";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center selection:bg-red-600/30">
      <HeroSection />

      {/* ROADMAP SECTION */}
      <section id="roadmap" className="w-full px-8 py-40 flex flex-col items-center justify-center">
        <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-[9px] uppercase tracking-[0.6em] text-red-500/60 mb-6 block font-bold">Simplified Evolution</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 text-white">
              {ROADMAP_CONTENT.title}
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {ROADMAP_CONTENT.steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="glass p-8 rounded-[2rem] hover:bg-white/[0.03] transition-colors float-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="text-lg font-black text-red-600/60 mb-4 block">0{index + 1}</span>
                <h3 className="text-base font-bold mb-3 tracking-tight text-white">{step.title}</h3>
                <p className="text-white/30 leading-relaxed font-light text-[13px]">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <WisdomSanctuary />

      {/* FOOTER - MINIMALIST PRECISION */}
      <footer id="footer" className="w-full py-40 border-t border-white/[0.02] bg-transparent relative z-10 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center w-full"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-20 text-white/20">CONTACT US</h2>

            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center w-full">
              <Link
                href={APP_CONFIG.instagramUrl}
                target="_blank"
                className="group flex items-center gap-4 text-white/10 hover:text-white transition-all duration-500"
              >
                <div className="p-4 rounded-full border border-white/5 group-hover:border-red-600/20 transition-all duration-500">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-tighter uppercase">@omvr_tvl</span>
              </Link>

              <div className="hidden md:block h-12 w-px bg-white/5" />

              <Link
                href={`mailto:${APP_CONFIG.email}`}
                className="group flex items-center gap-4 text-white/10 hover:text-white transition-all duration-500"
              >
                <div className="p-4 rounded-full border border-white/5 group-hover:border-red-600/20 transition-all duration-500">
                  <EmailIcon className="w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-tighter lowercase">omartal.0662@gmail.com</span>
              </Link>
            </div>

            <p className="mt-32 text-[8px] uppercase tracking-[1em] text-white/5 font-bold text-center">
              PRECISION IS LUXURY
            </p>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}
