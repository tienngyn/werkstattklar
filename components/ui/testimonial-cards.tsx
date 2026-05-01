"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { Quote, Star, MoveRight } from "lucide-react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  initials: string;
  photo: string;
  text: string;
  stars?: number;
}

interface CardProps {
  testimonial: Testimonial;
  position: "front" | "middle" | "back" | "hidden";
  handleShuffle: () => void;
}

function TestimonialCard({ testimonial, position, handleShuffle }: CardProps) {
  const isFront = position === "front";
  if (position === "hidden") return null;

  const rotate =
    position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg";
  const x =
    position === "front" ? "0%" : position === "middle" ? "33%" : "66%";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{ rotate, x }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -80) handleShuffle();
      }}
      transition={{ duration: 0.35 }}
      className={[
        "absolute left-0 top-0 flex h-[440px] w-[300px] select-none flex-col rounded-2xl border border-zinc-800/60 bg-zinc-900/90 p-7 shadow-2xl backdrop-blur-md",
        isFront ? "cursor-grab active:cursor-grabbing" : "",
      ].join(" ")}
    >
      {/* subtle red top glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,68,68,0.14), transparent 70%)",
        }}
      />

      {/* Avatar */}
      <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden ring-2 ring-zinc-700/60 shrink-0 z-10">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="w-full h-full object-cover grayscale contrast-150 brightness-[65%] pointer-events-none"
          draggable={false}
        />
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(220,38,38,0.32) 0%, rgba(220,38,38,0.09) 42%, transparent 65%)",
          }}
        />
      </div>

      {/* Quote + text */}
      <div className="flex-1 flex flex-col gap-2 mt-5 z-10">
        <Quote className="w-5 h-5 text-red-500/30 shrink-0" />
        <p className="text-zinc-300 text-sm leading-relaxed flex-1 overflow-hidden">
          {testimonial.text}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/[0.05] z-10">
        <div className="flex items-center gap-0.5 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <div className="text-sm font-bold text-white">{testimonial.name}</div>
        <div className="text-xs text-zinc-500">
          {testimonial.role} · {testimonial.location}
        </div>
      </div>
    </motion.div>
  );
}

interface ShuffleCardsProps {
  testimonials: Testimonial[];
}

export function ShuffleCards({ testimonials }: ShuffleCardsProps) {
  const [order, setOrder] = useState<number[]>(testimonials.map((_, i) => i));
  const [shuffleCount, setShuffleCount] = useState(0);

  const handleShuffle = () => {
    setOrder((prev) => {
      const next = [...prev];
      next.push(next.shift()!);
      return next;
    });
    setShuffleCount((c) => c + 1);
  };

  const getPosition = (i: number): "front" | "middle" | "back" | "hidden" => {
    const rank = order.indexOf(i);
    if (rank === 0) return "front";
    if (rank === 1) return "middle";
    if (rank === 2) return "back";
    return "hidden";
  };

  const currentIndex = (shuffleCount % testimonials.length) + 1;

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Card stack */}
      <div className="relative" style={{ height: 440, width: 300, marginRight: 198 }}>
        {testimonials.map((t, i) => (
          <TestimonialCard
            key={t.id}
            testimonial={t}
            position={getPosition(i)}
            handleShuffle={handleShuffle}
          />
        ))}
      </div>

      {/* Hint + counter */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleShuffle}
          className="flex items-center gap-2 rounded-full border border-zinc-800/60 bg-zinc-900/50 px-5 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white hover:border-red-500/30 transition-colors duration-200 cursor-pointer"
        >
          Nächste Rezension
          <MoveRight className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] text-zinc-700 tabular-nums">
          {currentIndex} / {testimonials.length} Rezensionen
        </span>
      </div>
    </div>
  );
}
