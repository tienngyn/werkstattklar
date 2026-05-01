"use client";
import React from "react";
import { motion } from "framer-motion";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

function TestimonialCard({ text, image, name, role }: TestimonialItem) {
  return (
    <div className="relative p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/60 shadow-xl w-[280px] shrink-0 overflow-hidden">
      {/* subtle red top glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(239,68,68,0.14), transparent 70%)",
        }}
      />
      <p className="text-zinc-300 text-sm leading-relaxed relative z-10">
        &ldquo;{text}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-5 relative z-10">
        <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-zinc-700/60 shrink-0">
          <img
            width={36}
            height={36}
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale contrast-150 brightness-[65%]"
          />
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(220,38,38,0.32) 0%, rgba(220,38,38,0.09) 42%, transparent 65%)",
            }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="text-sm font-bold text-white leading-5 truncate">{name}</div>
          <div className="text-xs text-zinc-500 leading-5 truncate">{role}</div>
        </div>
      </div>
    </div>
  );
}

export const TestimonialsRow = (props: {
  testimonials: TestimonialItem[];
  duration?: number;
  direction?: "left" | "right";
}) => {
  const dir = props.direction ?? "left";

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        initial={{ translateX: dir === "left" ? "0%" : "-50%" }}
        animate={{ translateX: dir === "left" ? "-50%" : "0%" }}
        transition={{
          duration: props.duration ?? 22,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-row gap-5 pr-5 w-max"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map((t, i) => (
              <TestimonialCard key={`${index}-${i}`} {...t} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
