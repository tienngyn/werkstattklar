"use client";
import * as React from "react";
import { motion } from "framer-motion";

interface TestimonialData {
  id: number;
  testimonial: string;
  author: string;
  img: string;
}

interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: "front" | "middle" | "back";
  id: number;
  author: string;
  img: string;
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  author,
  img,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate:
          position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX;
      }}
      onDragEnd={(e: any) => {
        if (dragRef.current - e.clientX > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-zinc-700 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <img
        src={img}
        alt={`Avatar von ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-zinc-700 bg-zinc-800 object-cover"
      />
      <span className="text-center text-lg italic text-zinc-300 leading-relaxed">
        &ldquo;{testimonial}&rdquo;
      </span>
      <span className="text-center text-sm font-semibold text-red-400">
        — {author}
      </span>
      {isFront && (
        <p className="text-center text-xs text-zinc-600">
          ← nach links ziehen für nächste Stimme
        </p>
      )}
    </motion.div>
  );
}

const wkTestimonials: TestimonialData[] = [
  {
    id: 1,
    testimonial:
      "Vorher 48% Abschlussrate, jetzt 67%. 5 Aufträge mehr pro Monat. Das System hat sich in 2 Wochen amortisiert.",
    author: "Thomas M. – Elektriker, 12 Mitarbeiter",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: 2,
    testimonial:
      "Angebote gehen jetzt in 3 Minuten raus statt 30. Follow-ups laufen automatisch. Ich hab endlich Überblick. Game-changer.",
    author: "Stefan W. – Maler, 8 Mitarbeiter",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
  },
  {
    id: 3,
    testimonial:
      "Meine Angebote sehen aus wie von einer großen Firma. Kunden wählen mich jetzt auch wenn ich teurer bin.",
    author: "Michael K. – SHK, 15 Mitarbeiter",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
  },
];

export function ShuffleCards() {
  const [positions, setPositions] = React.useState<
    Array<"front" | "middle" | "back">
  >(["front", "middle", "back"]);

  const handleShuffle = () => {
    const next = [...positions] as Array<"front" | "middle" | "back">;
    next.unshift(next.pop()!);
    setPositions(next);
  };

  return (
    <div className="flex justify-center w-full overflow-hidden py-10">
      <div className="relative h-[450px] w-[350px] ml-[100px] md:ml-[175px]">
        {wkTestimonials.map((t, index) => (
          <TestimonialCard
            key={t.id}
            {...t}
            handleShuffle={handleShuffle}
            position={positions[index]}
          />
        ))}
      </div>
    </div>
  );
}
