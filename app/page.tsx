"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, useScroll, useMotionValueEvent, useMotionValue, useTransform, animate } from "framer-motion";
import {
  CheckCircle, Clock, TrendingUp, Zap, RefreshCw, Star,
  ChevronDown, Phone, Mail, AlertTriangle, Shield,
  ArrowRight, Users, BarChart2, FileText, X, Check,
  Lock, Quote, LayoutDashboard, Aperture, MessageSquare,
  Activity, Layers, Euro, Timer, Trophy, Globe, Send,
  GitMerge, Bot, Wrench, User, Calendar, ThumbsDown, Frown,
} from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { GradientButton } from "@/components/ui/gradient-button";
import { BGPattern } from "@/components/ui/bg-pattern";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FooterSection } from "@/components/ui/footer-section";
import { TestimonialsRow } from "@/components/ui/testimonials-columns-1";
import type { TestimonialItem } from "@/components/ui/testimonials-columns-1";
import type { Testimonial } from "@/components/ui/testimonial-cards";

// ─── Utils ────────────────────────────────────────────────────────────────────
function cn(...c: (string | undefined | false | null)[]) {
  return c.filter(Boolean).join(" ");
}

// ─── Stagger Container ────────────────────────────────────────────────────────
function Stagger({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div className={className}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}>
      {children}
    </motion.div>
  );
}
function FadeUp({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  // No blur — blur filter forces GPU compositing on every element (huge mobile perf cost)
  return (
    <motion.div className={className}
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay } } }}>
      {children}
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ id, className, children, dots = false, dotsBg = "#161616" }: {
  id?: string; className?: string; children: React.ReactNode; dots?: boolean; dotsBg?: string;
}) {
  return (
    <section id={id} className={cn("relative py-14 md:py-24 px-4", className)}>
      {dots && (
        <BGPattern
          variant="dots"
          mask="fade-edges"
          size={28}
          fill="rgba(255,255,255,0.07)"
          style={{ "--background": dotsBg } as React.CSSProperties}
        />
      )}
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-500 mb-3">{children}</span>;
}
function SectionHeading({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight", center && "text-center")}>{children}</h2>;
}

// ─── FEATURE ICON ─────────────────────────────────────────────────────────────
function FeatureIcon({ icon: Icon, color = "red", size = "md", className }: {
  icon: any;
  color?: "red" | "green" | "neutral";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes    = { sm: "w-9 h-9",   md: "w-11 h-11",  lg: "w-14 h-14"  };
  const iconSz   = { sm: "w-4 h-4",   md: "w-5 h-5",    lg: "w-7 h-7"    };
  const colors = {
    red:     "from-red-600/30 via-red-900/20 to-zinc-900/60 border-red-500/20 [box-shadow:inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.25),0_4px_14px_rgba(239,68,68,0.12)]",
    green:   "from-green-600/30 via-green-900/20 to-zinc-900/60 border-green-500/20 [box-shadow:inset_0_1px_1px_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.25),0_4px_14px_rgba(34,197,94,0.12)]",
    neutral: "from-zinc-600/30 via-zinc-800/20 to-zinc-900/60 border-white/10 [box-shadow:inset_0_1px_1px_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.25),0_4px_14px_rgba(0,0,0,0.2)]",
  };
  const iconColors = { red: "text-red-300", green: "text-green-300", neutral: "text-white/75" };
  return (
    <div className={cn(
      sizes[size], "shrink-0 rounded-2xl flex items-center justify-center",
      "bg-gradient-to-b border",
      colors[color],
      className
    )}>
      <Icon className={cn(iconSz[size], iconColors[color], "drop-shadow-sm")} />
    </div>
  );
}

// ─── Calendly ─────────────────────────────────────────────────────────────────
const CALENDLY_URL = "https://calendly.com/werkstattklar/werkstattklar-erstgesprach";

// ─── CTA Button ───────────────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
}
function CTA({ children, size = "md", variant = "primary", className, href = "#kontakt" }: {
  children: React.ReactNode; size?: "sm"|"md"|"lg"; variant?: "primary"|"outline"; className?: string; href?: string;
}) {
  const sz = { sm:"!px-5 !py-2.5 !text-sm !min-w-0", md:"", lg:"!px-10 !py-5 !text-lg" };
  const isCalendly = href === "#kontakt" || href === CALENDLY_URL;
  const finalHref = isCalendly ? CALENDLY_URL : href;
  const handleClick = (e: React.MouseEvent) => {
    if (!isCalendly && href.startsWith("#")) { e.preventDefault(); scrollTo(href); }
  };
  if (variant === "outline") {
    return (
      <a href={finalHref} onClick={handleClick}
        target={isCalendly ? "_blank" : undefined}
        rel={isCalendly ? "noopener noreferrer" : undefined}
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer px-7 py-3.5 text-base",
          "border border-zinc-700 hover:border-red-500/50 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-red-600/5",
          sz[size], className
        )}>
        {children}
      </a>
    );
  }
  return (
    <GradientButton asChild className={cn(sz[size], className)}>
      <a href={finalHref} onClick={handleClick} target="_blank" rel="noopener noreferrer">{children}</a>
    </GradientButton>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { name: "Warum ich", url: "#problem" },
    { name: "Leistungen", url: "#leistungen" },
    { name: "Über mich", url: "#uebermich" },
    { name: "Ablauf", url: "#ablauf" },
    { name: "FAQ", url: "#faq" },
    { name: "Kontakt", url: "#kontakt" },
  ];

  const handleNav = (url: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(url), 200);
  };

  return (
    <>
      {/* Header bar */}
      <header className="fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-5 py-4 bg-[#111111]/80 backdrop-blur-md border-b border-white/[0.05]">
        <a href="#" className="text-xl font-black tracking-tight">Werkstatt<span className="text-red-500">KLAR</span></a>

        <div className="flex items-center gap-3">
          {/* CTA — hidden on mobile */}
          <GradientButton asChild className="!px-5 !py-2.5 !text-sm !min-w-0 hidden sm:inline-flex">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Gespräch buchen</a>
          </GradientButton>

          {/* Burger button */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menü öffnen"
            className="relative z-[70] w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl border border-zinc-800 bg-zinc-900/80 hover:border-red-500/40 transition-colors"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
              className="block w-5 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[65] bg-[#111111]/95 backdrop-blur-lg flex flex-col justify-center px-8"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="flex flex-col gap-2"
              onClick={e => e.stopPropagation()}
            >
              {navItems.map(({ name, url }, i) => (
                <motion.button
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 + i * 0.05 }}
                  onClick={() => handleNav(url)}
                  className="text-left text-3xl sm:text-4xl font-black text-zinc-400 hover:text-white transition-colors py-2 border-b border-white/[0.05] last:border-0"
                >
                  <span className="text-red-500 text-lg font-mono mr-3 opacity-60">0{i + 1}</span>
                  {name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
                className="mt-8"
              >
                <GradientButton asChild className="w-full sm:w-auto">
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    Kennenlern-Gespräch buchen →
                  </a>
                </GradientButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── TRUST BAR — Stats mit Kreis-Ringen ──────────────────────────────────────
function StatRing({ num, suffix = "", unit, desc, progress = 0.78 }: {
  num: number; suffix?: string; unit: string; desc: string; progress?: number;
}) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = circ * progress;

  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.5 });

  // Count-up animation
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  // Ring fill animation
  const strokeOffset = useMotionValue(circ);

  useEffect(() => {
    if (!inView) return;
    const c1 = animate(count, num, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    const c2 = animate(strokeOffset, circ - dash, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => { c1.stop(); c2.stop(); };
  }, [inView]); // eslint-disable-line

  return (
    <FadeUp className="h-full">
      <div ref={cardRef} className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-5 sm:p-8 flex flex-col items-center gap-3 sm:gap-5 overflow-hidden h-full transition-transform duration-200 hover:-translate-y-1">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(239,68,68,0.18), transparent 70%)" }} />

        {/* Ring */}
        <svg width="60" height="60" viewBox="0 0 80 80" className="sm:w-20 sm:h-20 shrink-0 -rotate-90 z-10">
          {/* Track */}
          <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(239,68,68,0.12)" strokeWidth="5" />
          {/* Fill */}
          <motion.circle
            cx="40" cy="40" r={r} fill="none" stroke="#dc2626" strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circ}
            style={{ strokeDashoffset: strokeOffset }}
          />
        </svg>

        {/* Animated number */}
        <div className="flex flex-col items-center gap-1 z-10 -mt-1 sm:-mt-2">
          <motion.span className="text-3xl sm:text-5xl font-black text-white leading-none tabular-nums">
            {display}
          </motion.span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-zinc-500">{unit}</span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm font-bold text-white text-center z-10 leading-snug">{desc}</p>
      </div>
    </FadeUp>
  );
}

function TrustBar() {
  return (
    <div className="px-4 py-14 bg-[#161616]">
      <div className="max-w-4xl mx-auto">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatRing num={7}   unit="Tage"       desc="bis zur fertigen Website"          progress={0.78} />
          <StatRing num={2}   unit="Wochen"     desc="bis zu den ersten Anfragen"        progress={0.55} />
          <StatRing num={100} suffix="%" unit="Festpreise" desc="keine versteckten Kosten" progress={1}  />
          <StatRing num={1}   unit="Person"     desc="direkter Ansprechpartner für dich" progress={0.25} />
        </Stagger>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <LampContainer contentClassName="max-w-6xl mx-auto px-4 pt-36 pb-10">
      <div className="max-w-4xl relative z-30">
        {/* Pill above headline */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="mb-6">
          <span className="inline-flex items-center gap-2 bg-red-950/40 border border-red-500/20 rounded-full px-4 py-2 text-sm font-medium text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            Für deinen Handwerks-Betrieb
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
        >
          Deine Website bringt keine Anfragen?{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">Das ist kein Zufall.</span>
            <motion.span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-transparent"
              initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:1, duration:.8 }} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10"
        >
          Du hast eine Website – aber sie bringt keine Anfragen. Oder du hast gar keine, und läufst täglich an Kunden vorbei, die online nach dir suchen und{" "}
          <span className="text-white">jemand anderen finden.</span> Ich ändere das.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.48 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <CTA size="lg">Kennenlern-Gespräch buchen <ArrowRight className="w-5 h-5" /></CTA>
          <button
            onClick={() => scrollTo("leistungen")}
            className="inline-flex items-center justify-center gap-2 cursor-pointer px-10 py-5 text-lg border border-zinc-700 hover:border-red-500/50 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-red-600/5 relative z-50"
          >
            Leistungen ansehen <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }}
          className="inline-flex items-center gap-3 rounded-full border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm px-3 py-2 relative z-30"
        >
          {/* Overlapping avatars — grayscale + red overlay */}
          <div className="flex -space-x-2">
            {[
              { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face", alt: "Kunde 1" },
              { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face", alt: "Kunde 2" },
              { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face", alt: "Kunde 3" },
              { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face", alt: "Kunde 4" },
              { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face", alt: "Kunde 5" },
            ].map(({ src, alt }, i) => (
              <Avatar key={i} className="w-7 h-7 ring-2 ring-zinc-900">
                <AvatarImage
                  src={src}
                  alt={alt}
                  className="grayscale contrast-150 brightness-[65%]"
                />
                {/* Red gradient from bottom — b&w image with red hue rising from below */}
                <span className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(220,38,38,0.32) 0%, rgba(220,38,38,0.09) 42%, transparent 65%)" }} />
                <AvatarFallback className="text-[9px] bg-zinc-800 text-zinc-400">K{i+1}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="flex flex-col gap-0.5 pr-1">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-zinc-400 leading-none">20+ Betriebe vertrauen mir bereits</span>
          </div>
        </motion.div>
      </div>
    </LampContainer>
  );
}

// ─── PROBLEM — "Kommt dir das bekannt vor?" ──────────────────────────────────
const problemItems = [
  {
    icon: ThumbsDown,
    title: "Der Webdesigner nimmt dein Geld — und meldet sich dann nicht mehr.",
    meta: "ERFAHRUNG #1",
    body: "Wochen vergehen. Du schreibst Nachrichten. Du rufst an. Nichts. Und irgendwann merkst du: du bist nicht der erste Kunde, dem das passiert ist.",
    cost: "Zeit und Geld verloren — und keine Website",
    span: "md:col-span-4 md:row-span-2",
  },
  {
    icon: Frown,
    title: "Am Ende ist die Website doppelt so teuer wie besprochen.",
    meta: "ERFAHRUNG #2",
    body: "SEO extra. Mobile-Optimierung extra. Domain verbinden extra. Was als fairer Preis begann, endet in einer Rechnung, die du so nie unterschrieben hättest.",
    cost: "Keine Kostentransparenz von Anfang an",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    icon: X,
    title: "Die Domain läuft auf dem Namen des Designers. Die Zugangsdaten bekommst du nicht.",
    meta: "ERFAHRUNG #3",
    body: "Deine eigene Website — und du kommst nicht ran. Das ist kein Einzelfall. Das ist bei manchen Anbietern Geschäftsmodell.",
    cost: "Abhängigkeit statt Selbstbestimmung",
    span: "md:col-span-2 md:row-span-1",
  },
];

function ProblemCard({ icon: Icon, title, meta, body, cost, span, isVisible, delay }: {
  icon: any; title: string; meta: string; body: string; cost: string; span: string; isVisible: boolean; delay: string;
}) {
  return (
    <div
      className={cn(
        "motion-safe:opacity-0",
        isVisible ? "motion-safe:animate-[bento-card-in_0.7s_ease-out_forwards]" : "",
        span
      )}
      style={{ animationDelay: delay } as any}
    >
      <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 group h-full flex flex-col justify-between overflow-hidden p-6">
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(ellipse 60% 120% at 12% 0%, rgba(239,68,68,0.12), transparent 72%)" }} />
        </div>
        <div className="flex items-start gap-4">
          <FeatureIcon icon={Icon} color="red" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="font-bold text-white text-base leading-tight">{title}</h3>
              <span className="ml-auto shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                {meta}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">{body}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
          <span className="text-xs font-bold text-red-400">{cost}</span>
        </div>
      </div>
    </div>
  );
}

function Problems() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, amount: 0.2 });
  return (
    <Section id="problem" className="bg-[#161616]">
      <style>{`
        @keyframes bento-card-in { 0%{opacity:0;transform:translate3d(0,18px,0) scale(.97)} 100%{opacity:1;transform:translate3d(0,0,0) scale(1)} }
      `}</style>
      <Stagger className="text-center mb-12">
        <FadeUp><SectionLabel>Kommt dir das bekannt vor?</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>Die ehrliche Wahrheit über Webdesign-Erfahrungen.</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">Ich kenne diese Geschichten. Und ich habe dieses Geschäft so aufgebaut, dass genau das bei mir nicht passiert.</p></FadeUp>
      </Stagger>
      <div ref={ref} className="grid grid-cols-1 gap-3 md:auto-rows-[minmax(130px,auto)] md:grid-cols-6">
        {problemItems.map((item, i) => (
          <ProblemCard key={item.title} {...item} isVisible={isVisible} delay={`${i * 0.1}s`} />
        ))}
      </div>
      <Stagger className="mt-8 flex justify-center">
        <FadeUp>
          <CTA size="md">Leistungen ansehen <ArrowRight className="w-4 h-4" /></CTA>
        </FadeUp>
      </Stagger>
    </Section>
  );
}

// ─── ÜBER MICH ────────────────────────────────────────────────────────────────
function AboutMe() {
  return (
    <Section id="uebermich">
      <div className="max-w-4xl mx-auto">
        <Stagger className="mb-12">
          <FadeUp><SectionLabel>Über mich</SectionLabel></FadeUp>
          <FadeUp><SectionHeading>Kein Agentur-Chaos. Nur ein Mensch, der liefert.</SectionHeading></FadeUp>
        </Stagger>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <FadeUp>
            <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 overflow-hidden aspect-[4/3] flex items-center justify-center">
              <div className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(239,68,68,0.12), transparent 70%)" }} />
              <div className="relative z-10 flex flex-col items-center gap-3 text-zinc-600">
                <User className="w-20 h-20 opacity-20" />
                <span className="text-xs uppercase tracking-widest opacity-40">Dein Foto hier</span>
              </div>
            </div>
          </FadeUp>
          <Stagger className="flex flex-col gap-5">
            <FadeUp>
              <p className="text-zinc-300 text-lg leading-relaxed">
                Dein Text hier. Schreib mir kurz wer du bist, was dich antreibt und warum du dieses Business aufgebaut hast — ich passe diesen Abschnitt dann an.
              </p>
            </FadeUp>
            <FadeUp>
              <p className="text-zinc-400 text-base leading-relaxed">
                Beschreibe hier kurz deine Erfahrung, deine Werte und was dich von einer Agentur unterscheidet. Der persönliche Ton macht hier den Unterschied.
              </p>
            </FadeUp>
            <FadeUp>
              <div className="flex flex-col gap-3 pt-2">
                {[
                  "Deine Domain gehört dir — immer",
                  "Du bekommst alle Zugangsdaten",
                  "Festpreis ab Angebot — keine Extras",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="grid w-5 h-5 place-content-center rounded-full bg-red-600/90 text-white shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-sm text-zinc-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
            <FadeUp className="pt-2">
              <CTA size="md">Lass uns sprechen <ArrowRight className="w-4 h-4" /></CTA>
            </FadeUp>
          </Stagger>
        </div>
      </div>
    </Section>
  );
}

// ─── LEISTUNGEN ───────────────────────────────────────────────────────────────
function Services() {
  const features = [
    {
      icon: Globe, title: "Webdesign & Landingpages", meta: "SICHTBARKEIT", num: "01",
      body: "Wenn jemand deinen Namen googelt, landet er auf einer Seite, die sofort Vertrauen schafft – und ihm zeigt, warum er dich anrufen soll. Nicht irgendwann. Jetzt.",
      result: "Mehr Vertrauen, mehr Anfragen",
      span: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
    },
    {
      icon: BarChart2, title: "Performance Marketing", meta: "META & GOOGLE ADS", num: "02",
      body: "Meta Ads, Google Ads, jede Plattform. Ich setze Kampagnen auf, die tatsächlich Ergebnisse liefern – kein Budget verbrennen ins Blaue, kein Hoffnungsmarketing.",
      result: "Messbare Ergebnisse, kein Raten",
      span: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      icon: Layers, title: "Funnel-Aufbau", meta: "STRATEGIE", num: "03",
      body: "Vom ersten Klick bis zum Abschluss: Ich plane und baue den kompletten digitalen Verkaufsprozess. Weil eine gute Website ohne Strategie nur eine schöne Visitenkarte ist.",
      result: "Klick wird zu Kunde",
      span: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
    {
      icon: Bot, title: "KI Automation", meta: "ZEITERSPARNIS", num: "04",
      body: "Aufgaben, die du täglich wiederholst, kann ein System für dich übernehmen. Anfragen beantworten, Leads qualifizieren, Follow-ups schicken – während du dich um das kümmerst, was nur du kannst.",
      result: "Weniger Aufwand, gleiche Ergebnisse",
      span: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    },
    {
      icon: Wrench, title: "Website-Pflege & Betreuung", meta: "LONG-TERM", num: "05",
      body: "Deine Website läuft – auch wenn du gerade einen Kunden betreust, Urlaub machst oder schläfst. Ich kümmere mich um Updates, Sicherheit und alles, was du nicht sehen oder anfassen willst.",
      result: "Immer aktuell, immer sicher",
      span: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
    },
  ];
  return (
    <Section id="leistungen">
      <Stagger className="text-center mb-14">
        <FadeUp><SectionLabel>Meine Leistungen</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>Von der ersten Idee bis zur nächsten Anfrage.</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">Keine Standardpakete. Kein Einheitsbrei. Du bekommst, was dein Business wirklich braucht — nicht mehr, nicht weniger.</p></FadeUp>
      </Stagger>
      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:auto-rows-[minmax(140px,auto)] lg:grid-cols-3 gap-4">
        {features.map(({ icon: Icon, title, meta, num, body, result, span }, i) => (
          <FadeUp key={title} className={cn("h-full", span)}>
            <div className="h-full">
              <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 group h-full flex flex-col justify-between overflow-hidden">

                {/* ── Alle Cards: Foto-Hintergrund ── */}
                {(() => {
                  const imgs = [
                    "/handwerker-laptop.png",
                    "/marketing-dashboard.png",
                    "/funnel-strategie.png",
                    "/ki-automation.png",
                    "/website-pflege.png",
                  ];
                  return (
                    <>
                      <img
                        src={imgs[i]}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 brightness-[30%] pointer-events-none select-none"
                      />
                      {/* dunkle Vignette oben — Text lesbar */}
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.0) 100%)" }} />
                      {/* roter Hue von unten — weich */}
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(220,38,38,0.32) 0%, rgba(220,38,38,0.09) 42%, transparent 65%)" }} />
                    </>
                  );
                })()}
                <div className="pointer-events-none z-10 flex flex-col gap-1 p-7 transition-all duration-300 group-hover:-translate-y-8">
                  <div className="mb-4 w-fit">
                    <FeatureIcon icon={Icon} color="red" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-zinc-300">{num}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] rounded-full px-2 py-0.5 text-zinc-200 border border-white/20">{meta}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed max-w-xs text-zinc-200">{body}</p>
                </div>
                <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span className="text-green-400 text-xs font-bold">{result}</span>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-red-500/[0.02]" />
              </div>
            </div>
          </FadeUp>
        ))}
      </Stagger>
      <Stagger className="mt-10 flex justify-center">
        <FadeUp>
          <CTA size="lg">Kennenlern-Gespräch buchen (kostenlos) <ArrowRight className="w-5 h-5" /></CTA>
        </FadeUp>
      </Stagger>
    </Section>
  );
}

// ─── GUARANTEES ───────────────────────────────────────────────────────────────
function Guarantees() {
  const items = [
    {
      icon: Shield, title: "Unabhängigkeit", label: "GARANTIE #1",
      body: "Deine Domain läuft auf deinen Namen. Deine Zugangsdaten bekommst du immer. Deine Website gehört dir – nicht mir. Du kannst jederzeit mit einem anderen Dienstleister weiterarbeiten, ohne von vorne anfangen zu müssen.",
      condition: "100% Eigentumsrecht. Immer.",
      result: "Du bist unabhängig",
    },
    {
      icon: Euro, title: "Transparente Preise", label: "GARANTIE #2",
      body: "Festpreis ab Angebot. Was drin ist, ist drin – keine 'das kostet extra'-Überraschungen hinterher. Ich sage dir vor dem ersten Entwurf, was es kostet.",
      condition: "Kein Preis ändert sich nach Vertragsschluss.",
      result: "0 € Überraschungen",
    },
    {
      icon: Calendar, title: "Termintreue", label: "GARANTIE #3",
      body: "Du bekommst von Anfang an einen klaren Zeitplan mit Meilensteinen. Was ich verspreche, halte ich – und wenn sich auf meiner Seite etwas verschiebt, sage ich es dir sofort.",
      condition: "Kein böses Erwachen zwei Wochen vor dem Launch.",
      result: "Pünktlich oder du bekommst Geld zurück",
    },
    {
      icon: Phone, title: "Erreichbarkeit", label: "GARANTIE #4",
      body: "Ich antworte auf Nachrichten innerhalb von 24 Stunden an Werktagen. Du musst mir nicht hinterherlaufen. Und du bekommst regelmäßige Updates zum Stand deines Projekts – ohne dass du nachfragen musst.",
      condition: "Ein Ansprechpartner. Immer erreichbar.",
      result: "Keine Ghosting-Erfahrung",
    },
    {
      icon: RefreshCw, title: "Feedback ohne Limit-Druck", label: "GARANTIE #5",
      body: "Ich liefere keine Website ab und verschwinde. Feedbackrunden sind fester Bestandteil des Prozesses. Wir arbeiten so lange, bis du sagst: Ja, genau das.",
      condition: "So lange, bis es wirklich passt.",
      result: "100% Zufriedenheit oder Geld zurück",
    },
  ];
  return (
    <Section id="garantien" className="bg-[#161616]">
      <Stagger className="text-center mb-14">
        <FadeUp><SectionLabel>Garantien</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>5 Versprechen. 0 € Risiko für dich.</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">Ich trage das Risiko. Entweder es funktioniert — oder du bekommst dein Geld zurück.</p></FadeUp>
      </Stagger>
      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, title, label, body, condition, result }) => (
          <FadeUp key={title} className="h-full">
            <div className="h-full">
              <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 group h-full flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-50"
                  style={{ background:"radial-gradient(ellipse 60% 80% at 10% 0%, rgba(34,197,94,0.06), transparent 70%)" }} />
                <div className="pointer-events-none z-10 flex flex-col gap-1 p-7 transition-all duration-300 group-hover:-translate-y-8">
                  <div className="mb-4 w-fit">
                    <FeatureIcon icon={Icon} color="green" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-3 h-3 text-green-500/60" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600">{label}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-1">{body}</p>
                  <p className="text-zinc-600 text-xs italic mt-2">{condition}</p>
                </div>
                <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span className="text-green-400 text-xs font-bold">{result}</span>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-green-500/[0.015]" />
              </div>
            </div>
          </FadeUp>
        ))}
      </Stagger>
    </Section>
  );
}

// ─── STEP ICON — dunkel bis die Linie es berührt, dann Farbe ─────────────────
const StepIcon = React.forwardRef<HTMLDivElement, {
  icon: any; n: number; scrollProgress: any; threshold: number;
}>(({ icon: Icon, n, scrollProgress, threshold }, ref) => {
  const [active, setActive] = useState(false);

  useMotionValueEvent(scrollProgress, "change", (v: number) => {
    setActive(v >= threshold);
  });

  return (
    <div
      ref={ref}
      className="relative z-20 shrink-0 bg-[#111111] rounded-2xl"
      style={{
        filter: active ? "none" : "grayscale(1) brightness(0.3)",
        transition: "filter 0.35s ease",
      }}
    >
      <FeatureIcon icon={Icon} color="red" size="md" />
      <span
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black text-white leading-none shadow-lg"
        style={{
          background: active ? "#dc2626" : "#3f3f46",
          transition: "background 0.35s ease",
        }}
      >
        {n}
      </span>
    </div>
  );
});
StepIcon.displayName = "StepIcon";

// ─── ABLAUF ───────────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: 1, icon: Phone, title: "Kostenloses Kennenlern-Gespräch", duration: "15 Minuten · kostenlos", meta: "Schritt 1",
      body: "Du erzählst, wo du stehst und was du erreichen willst. Ich höre zu und sage dir ehrlich, ob und wie ich helfen kann – und was es dafür braucht. Wenn's passt, machen wir weiter.",
      result: "Klarheit ohne Verkaufsdruck",
      items: ["Du erzählst deine Situation", "Ich sage ehrlich was ich tun kann", "Kein Druck — wir schauen ob es passt"],
    },
    {
      n: 2, icon: FileText, title: "Briefing & Festpreis-Angebot", duration: "1–2 Tage", meta: "Schritt 2",
      body: "Ich entwickle auf Basis unseres Gesprächs ein Konzept und ein konkretes Angebot mit Festpreis und Zeitplan. Du weißt vorher, was es kostet — nicht erst beim Launch.",
      result: "Keine Überraschungen — nie",
      items: ["Konzept auf Basis deines Gesprächs", "Festpreis + klarer Zeitplan", "Du entscheidest — kein Druck"],
    },
    {
      n: 3, icon: LayoutDashboard, title: "Design & Feedback", duration: "individuell", meta: "Schritt 3",
      body: "Ich entwickle ein individuelles Design für dich. Kein Template vom Template-Regal. Du siehst Entwürfe, gibst Feedback, und wir arbeiten so lange, bis es wirklich passt.",
      result: "Dein Design — nicht meins",
      items: ["Individuelles Design, kein Template", "Entwürfe mit Feedbackrunden", "So lange bis du sagst: Ja, genau das"],
    },
    {
      n: 4, icon: Activity, title: "Umsetzung mit laufenden Updates", duration: "laufend", meta: "Schritt 4",
      body: "Die Website entsteht — und du weißt jederzeit, wo wir stehen. Ich melde mich regelmäßig mit Updates. Du musst nicht nachfragen.",
      result: "Volle Transparenz im Prozess",
      items: ["Regelmäßige Status-Updates", "Du kannst jederzeit Fragen stellen", "Keine bösen Überraschungen"],
    },
    {
      n: 5, icon: CheckCircle, title: "Launch & Übergabe", duration: "dein Tag", meta: "Schritt 5",
      body: "Deine Website geht live. Du bekommst alle Zugangsdaten, deine Domain bleibt auf deinen Namen, und ich zeige dir, wie du einfache Änderungen selbst machst. Du bist unabhängig — aber ich bin da, wenn du mich brauchst.",
      result: "Du bist live — und unabhängig",
      items: ["Alle Zugangsdaten gehören dir", "Domain auf deinen Namen", "Ich zeige dir wie es weitergeht"],
    },
  ];
  // Scroll-driven line animation
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [thresholds, setThresholds] = useState([0, 0.25, 0.5, 0.75, 1]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 20%"],
  });

  // Echte Icon-Positionen messen → pixelgenaue Thresholds
  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerH = containerRef.current.offsetHeight;
      const lineTop = 24; // top-6 = 24px
      const lineH = containerH - 48; // minus top-6 + bottom-6
      const next = iconRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        const iconCenter = r.top + r.height / 2 - containerRect.top;
        return Math.max(0.01, Math.min(0.99, (iconCenter - lineTop) / lineH));
      });
      setThresholds(next);
    };
    const t = setTimeout(compute, 200);
    window.addEventListener("resize", compute);
    return () => { clearTimeout(t); window.removeEventListener("resize", compute); };
  }, []);

  return (
    <Section id="ablauf">
      <Stagger className="text-center mb-14">
        <FadeUp><SectionLabel>Der Ablauf</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>Von 0 zu online — ohne Agentur-Chaos.</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">Einmal besprechen, einmal freigeben — fertig. Kein wochenlangem Hin und Her.</p></FadeUp>
      </Stagger>

      <div ref={containerRef} className="relative max-w-3xl mx-auto">
        {/* Track — volle Höhe, dezent grau */}
        <div className="absolute left-[27px] top-6 bottom-6 w-0.5 pointer-events-none z-[1] bg-zinc-800/70" />
        {/* Fill — wächst scroll-synchron, nur rot */}
        <motion.div
          className="absolute left-[27px] top-6 bottom-6 w-0.5 pointer-events-none z-[1] origin-top bg-red-600"
          style={{ scaleY: scrollYProgress }}
        />

        <Stagger className="flex flex-col gap-6">
          {steps.map(({ n, icon: Icon, title, duration, body, result, items }, i) => (
            <FadeUp key={n}>
              <div className="flex gap-5 sm:gap-7 items-start">
                <StepIcon
                  ref={(el) => { iconRefs.current[i] = el; }}
                  icon={Icon}
                  n={n}
                  scrollProgress={scrollYProgress}
                  threshold={thresholds[i] ?? i / (steps.length - 1)}
                />

                <div className="flex-1 min-w-0">
                  <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 group flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-60"
                      style={{ background: "radial-gradient(ellipse 60% 80% at 10% 0%, rgba(239,68,68,0.10), transparent 70%)" }} />
                    <div className="pointer-events-none z-10 flex flex-col gap-2 p-7 transition-all duration-300 group-hover:-translate-y-8">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 border border-zinc-800 rounded-full px-3 py-1">{duration}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mt-1">{body}</p>
                      <ul className="mt-4 space-y-2">
                        {items.map(item => (
                          <li key={item} className="flex items-center gap-3 text-sm text-zinc-400">
                            <Check className="w-4 h-4 text-red-500/70 shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-green-400 text-sm font-bold">{result}</span>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-red-500/[0.02]" />
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Markus H.",
    role: "Elektroinstallateur",
    location: "Heilbronn",
    initials: "MH",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    text: "Ich hatte vorher eine Website, die ich selbst gebaut hab. Sah aus wie 2009. Seit der neuen kommen jede Woche Anfragen rein — ohne dass ich irgendetwas tue. Einfach top.",
    stars: 5,
  },
  {
    id: 2,
    name: "Sandra B.",
    role: "Malermeisterin",
    location: "Stuttgart",
    initials: "SB",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    text: "Schnell, transparent, pünktlich. Die Zusammenarbeit war unkompliziert und das Ergebnis genau das, was ich mir vorgestellt hab. Ich würde es jederzeit wieder machen.",
    stars: 5,
  },
  {
    id: 3,
    name: "Daniel K.",
    role: "Heizung & Sanitär",
    location: "Mannheim",
    initials: "DK",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    text: "Keine Agentur-Bürokratie, kein Stille-Post-Spiel. Ich hab direkt mit einer Person geredet, die weiß was sie tut. Die Website ist live und bringt Ergebnisse.",
    stars: 5,
  },
  {
    id: 4,
    name: "Lisa M.",
    role: "Personaltrainerin",
    location: "Karlsruhe",
    initials: "LM",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    text: "Ich dachte, eine professionelle Website wäre für mich zu teuer. War sie nicht. Und jetzt buchen Kunden online, während ich trainiere. Besser geht's nicht.",
    stars: 5,
  },
  {
    id: 5,
    name: "Thomas R.",
    role: "Schreiner",
    location: "Heidelberg",
    initials: "TR",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    text: "Der Festpreis hat mich überzeugt. Kein nachträgliches 'das kostet extra'. Alles war von Anfang an klar — und das Ergebnis hat meine Erwartungen übertroffen.",
    stars: 5,
  },
  {
    id: 6,
    name: "Nina F.",
    role: "Kosmetikstudio",
    location: "Ludwigsburg",
    initials: "NF",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    text: "Ich hatte Angst, dass ich als Einzelperson keine Chance gegen die grossen Anbieter habe. Jetzt stehe ich auf Google ganz oben. Die Website hat sich schon im ersten Monat amortisiert.",
    stars: 5,
  },
];

function StarRow() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function Testimonials() {
  // Map to the column format
  const colItems: TestimonialItem[] = testimonials.map(t => ({
    text: t.text,
    image: t.photo,
    name: t.name,
    role: `${t.role} · ${t.location}`,
  }));

  const row1 = colItems.slice(0, 3);
  const row2 = colItems.slice(3, 6);

  return (
    <Section id="testimonials" className="bg-[#161616] overflow-hidden">
      <Stagger className="text-center mb-14">
        <FadeUp><SectionLabel>Kundenstimmen</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>Was andere sagen — nicht ich.</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">Echte Ergebnisse. Echte Betriebe. Keine erfundenen Bewertungen.</p></FadeUp>
      </Stagger>

      {/* Horizontal scrolling rows */}
      <div className="flex flex-col gap-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <TestimonialsRow testimonials={row1} duration={24} direction="left" />
        <TestimonialsRow testimonials={row2} duration={28} direction="right" />
      </div>

      {/* Bottom trust line */}
      <FadeUp delay={0.3}>
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 5).map(({ photo, initials }, i) => (
                <Avatar key={i} className="w-7 h-7 ring-2 ring-[#161616]">
                  <AvatarImage src={photo} alt="" className="grayscale contrast-150 brightness-[65%]" />
                  <span className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(220,38,38,0.32) 0%, rgba(220,38,38,0.09) 42%, transparent 65%)" }} />
                  <AvatarFallback className="text-[9px] bg-zinc-800 text-zinc-400">{initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span>20+ zufriedene Kunden</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <StarRow />
            <span>Durchschnitt 5,0 / 5</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-zinc-800" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span>100% Geld-zurück-Garantie</span>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "Für wen ist das gedacht?", a: "Für Selbstständige und kleine Unternehmen, die online mehr Kunden gewinnen wollen — egal aus welcher Branche. Ob Freelancer, Handwerker, Coach oder lokales Unternehmen: Wenn du eine professionelle Präsenz brauchst, die Ergebnisse bringt, bist du hier richtig." },
  { q: "Was kostet eine Website?", a: "Das hängt davon ab, was du brauchst. Im kostenlosen Erstgespräch verstehe ich deine Situation und mache dir dann ein konkretes Angebot mit Festpreis. Kein Stundensatz, keine Überraschungen — du weißt vorher was es kostet." },
  { q: "Wirklich fertig in 7 Tagen?", a: "Ja — wenn wir die Inhalte zusammen schnell klären. Die meisten Projekte gehen in 7–10 Werktagen live. Im Erstgespräch nenne ich dir einen konkreten Termin und halte ihn. Wenn nicht, bekommst du Geld zurück." },
  { q: "Ich habe schon eine Website — was dann?", a: "Kein Problem. Wir schauen sie gemeinsam an. Wenn sie grundsätzlich noch zu retten ist, optimieren wir sie. Wenn nicht, bauen wir eine neue. Das klären wir im kostenlosen Erstgespräch — ohne Verpflichtung." },
  { q: "Wem gehört die Website und die Domain?", a: "Dir. Komplett. Deine Domain läuft auf deinen Namen, deine Zugangsdaten bekommst du vollständig. Du kannst jederzeit mit einem anderen Anbieter weiterarbeiten — ohne von vorne anfangen zu müssen. Das ist mir wichtig." },
  { q: "Was wenn ich keine Ahnung von Technik habe?", a: "Das ist der Normalfall. Du musst gar nichts selbst einrichten oder verstehen. Du sagst mir was du willst — ich setze es um. Und ich zeige dir am Ende, wie du einfache Dinge selbst machen kannst, wenn du möchtest." },
  { q: "Was wenn ich nicht zufrieden bin?", a: "Dann arbeite ich kostenlos weiter bis du es bist. Feedbackrunden sind fester Bestandteil des Prozesses — ich verschwinde nicht nach dem Launch. Und wenn gar nichts passt: volle Rückerstattung, ohne Diskussion." },
  { q: "Wie läuft das Erstgespräch ab?", a: "15 Minuten per Telefon oder Video. Du erzählst wo du stehst und was du dir vorstellst. Ich höre zu und sage dir ehrlich ob ich helfen kann. Kein Verkaufsdruck. Wenn's passt — super. Wenn nicht — ich gehe mit dir, bis du die richtige Lösung gefunden hast." },
];

function FAQ() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <Section id="faq">
      <div className="max-w-2xl mx-auto">
        <Stagger className="text-center mb-12">
          <FadeUp><SectionLabel>FAQ</SectionLabel></FadeUp>
          <FadeUp><SectionHeading center>Noch nicht überzeugt?</SectionHeading></FadeUp>
          <FadeUp><p className="text-zinc-500 text-sm mt-2">Alle Einwände, ehrlich beantwortet.</p></FadeUp>
        </Stagger>
        <Stagger className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <FadeUp key={i}>
              <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-50"
                  style={{ background: "radial-gradient(ellipse 60% 80% at 10% 0%, rgba(239,68,68,0.07), transparent 70%)" }} />
                <button
                  className="relative z-10 w-full flex items-center justify-between p-6 text-left gap-4"
                  onClick={() => setOpen(open===i ? null : i)}
                >
                  <span className={cn("font-semibold text-sm md:text-base transition-colors", open===i ? "text-white" : "text-zinc-200")}>{q}</span>
                  <motion.div animate={{ rotate: open===i ? 180 : 0 }} transition={{ duration:.2 }} className="shrink-0">
                    <ChevronDown className={cn("w-5 h-5", open===i ? "text-red-400" : "text-zinc-500")} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open===i && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
                      exit={{ height:0, opacity:0 }} transition={{ duration:.22 }} className="overflow-hidden">
                      <div className="relative z-10 px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-white/[0.06] pt-4">{a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage von ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nE-Mail: ${form.email}\nTelefon: ${form.phone}\n\nNachricht:\n${form.message}`
    );
    window.location.href = `mailto:kontakt@werkstattklar.de?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-green-500/20 bg-green-500/5 p-10 text-center"
      >
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Nachricht gesendet!</h3>
        <p className="text-zinc-400 text-sm">Ich melde mich innerhalb von 24 Stunden bei dir.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Dein Name *</label>
          <input
            type="text" required value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Max Mustermann"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">E-Mail *</label>
          <input
            type="email" required value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="max@beispiel.de"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Telefon (optional)</label>
        <input
          type="tel" value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="+49 170 000 0000"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Was stellst du dir vor? *</label>
        <textarea
          required value={form.message} rows={5}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Beschreib kurz was du brauchst — oder schreib einfach nur 'Erstgespräch'. Ich melde mich."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-colors resize-none"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <GradientButton asChild className="flex-1 justify-center">
          <button type="submit" className="flex items-center justify-center gap-2 w-full">
            Nachricht senden <Send className="w-4 h-4" />
          </button>
        </GradientButton>
        <CTA variant="outline" href={CALENDLY_URL} className="flex-1 justify-center">
          Oder direkt buchen <Calendar className="w-4 h-4" />
        </CTA>
      </div>
      <p className="text-xs text-zinc-700 text-center">
        <Lock className="w-3 h-3 inline mr-1" />Deine Daten werden nicht weitergegeben. Ich antworte innerhalb von 24 Stunden.
      </p>
    </form>
  );
}

function Contact() {
  return (
    <Section id="kontakt" className="bg-[#161616]">
      <div className="max-w-3xl mx-auto">
        <Stagger className="text-center mb-12">
          <FadeUp><SectionLabel>Kontakt & Anfrage</SectionLabel></FadeUp>
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Deine Website wartet{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">nicht auf dich.</span>
            </h2>
          </FadeUp>
          <FadeUp><p className="text-zinc-400 text-lg max-w-xl mx-auto">Schreib mir kurz, was du dir vorstellst — oder buch direkt ein kostenloses Erstgespräch. Kein Druck, keine Verkaufsmasche. Ich antworte innerhalb von 24 Stunden.</p></FadeUp>
        </Stagger>

        <FadeUp>
          <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 overflow-hidden p-8 md:p-10">
            <div className="absolute inset-0 pointer-events-none opacity-40"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(239,68,68,0.10), transparent 70%)" }} />
            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-zinc-500">
            <a href="mailto:kontakt@werkstattklar.de" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" /> kontakt@werkstattklar.de
            </a>
            <a href="tel:+491792632430" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" /> 0179 263 243 0
            </a>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}

// Footer → see components/ui/footer-section.tsx

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-[#111111]">
        <Hero />
        <TrustBar />
        <Problems />
        <AboutMe />
        <Services />
        <Guarantees />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <FooterSection />
    </>
  );
}
