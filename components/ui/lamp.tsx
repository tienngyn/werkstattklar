"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
  contentClassName,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) => {
  return (
    <div className={cn("relative min-h-screen bg-[#111111] w-full overflow-hidden", className)}>
      {/* Lamp graphics — purely decorative, pointer-events-none, positioned in top half */}
      <div className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none overflow-hidden">
        {/* Left conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(from 70deg at center top, var(--tw-gradient-stops))` }}
          className="absolute right-1/2 top-0 h-56 w-[30rem] bg-gradient-conic from-red-600 via-transparent to-transparent text-white overflow-visible"
        >
          <div className="absolute w-full left-0 bg-[#111111] h-40 bottom-0 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-full left-0 bg-[#111111] bottom-0 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(from 290deg at center top, var(--tw-gradient-stops))` }}
          className="absolute left-1/2 top-0 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-red-600 text-white overflow-visible"
        >
          <div className="absolute w-40 h-full right-0 bg-[#111111] bottom-0 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[#111111] h-40 bottom-0 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Glow orb */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10 h-36 w-[28rem] rounded-full bg-red-600 opacity-20 blur-3xl" />

        {/* Beam line */}
        <motion.div
          initial={{ width: "8rem" }}
          animate={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-16 h-0.5 w-64 bg-red-500 opacity-40 blur-2xl rounded-full"
        />

        {/* Floor fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#111111] to-transparent" />
      </div>

      {/* Content — natural flow, no translate */}
      <div className={cn("relative z-10 w-full", contentClassName)}>
        {children}
      </div>
    </div>
  );
};
