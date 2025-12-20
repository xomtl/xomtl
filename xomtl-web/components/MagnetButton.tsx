"use client";

import React from "react";
import { motion } from "framer-motion";
import { useMagnetEffect } from "@/hooks/useMagnetEffect";

interface MagnetButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const MagnetButton: React.FC<MagnetButtonProps> = ({
  children,
  className = "",
  onClick,
  variant = "primary"
}) => {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetEffect(35);

  const baseStyles = "relative px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center overflow-hidden active:scale-95";
  const variantStyles = variant === "primary"
    ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
    : "border border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/20";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <button
        onClick={onClick}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        <span className="relative z-10 tracking-tight">{children}</span>
        {/* Interaction sweep */}
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12 opacity-20" />
      </button>
    </motion.div>
  );
};

export default MagnetButton;
