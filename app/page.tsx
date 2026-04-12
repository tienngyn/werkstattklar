"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  CheckCircle, Clock, TrendingUp, Zap, RefreshCw, Star,
  ChevronDown, Phone, Mail, AlertTriangle, Shield,
  ArrowRight, Users, BarChart2, FileText, X, Check,
  Lock, Quote, LayoutDashboard, Aperture, MessageSquare,
  Activity, Layers, Euro, Timer, Trophy,
} from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { GradientButton } from "@/components/ui/gradient-button";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import { BGPattern } from "@/components/ui/bg-pattern";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { LogoCloud } from "@/components/ui/logo-cloud";

// ─── Utils ────────────────────────────────────────────────────────────────────
function cn(...c: (string | undefined | false | null)[]) {
  return c.filter(Boolean).join(" ");
}

// ─── Stagger Container (21st.dev inspired) ────────────────────────────────────
function Stagger({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div className={className}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: delay } } }}>
      {children}
    </motion.div>
  );
}
function FadeUp({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div className={className}
      variants={{ hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } } }}>
      {children}
    </motion.div>
  );
}


// ─── Section ─────────────────────────────────────────────────────────────────
function Section({ id, className, children, dots = false, dotsBg = "#161616" }: {
  id?: string; className?: string; children: React.ReactNode; dots?: boolean; dotsBg?: string;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28 px-4", className)}>
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

// ─── FEATURE ICON — Framer-style gradient + inset shadow ──────────────────────
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
// 👉 Ersetzen Sie diese URL mit Ihrem echten Calendly-Link
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
  // Primary CTA → Calendly in neuem Tab
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
  const navItems = [
    { name: "Problem", url: "#problem", icon: AlertTriangle },
    { name: "Lösung", url: "#loesung", icon: Zap },
    { name: "Preise", url: "#preise", icon: Euro },
    { name: "FAQ", url: "#faq", icon: MessageSquare },
  ];
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-6 pt-4 pointer-events-none">
        <a href="#" className="pointer-events-auto text-xl font-black tracking-tight">Werkstatt<span className="text-red-500">KLAR</span></a>
        <GradientButton asChild className="!px-5 !py-2.5 !text-sm !min-w-0 pointer-events-auto">
          <a href="#kontakt">Gespräch buchen</a>
        </GradientButton>
      </header>
      <NavBar items={navItems} />
    </>
  );
}

// ─── TRUST BAR ────────────────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    { icon: Timer, text: "Schnell & sorgfältig umgesetzt" },
    { icon: Users, text: "1 persönlicher Ansprechpartner" },
    { icon: TrendingUp, text: "Region HN & Stuttgart" },
    { icon: Star, text: "3-fache Garantie" },
  ];
  return (
    <div className="border-y border-white/[0.05] bg-white/[0.015] py-4 overflow-hidden">
      <Stagger className="flex gap-8 md:gap-12 items-center justify-center flex-wrap px-4 max-w-6xl mx-auto">
        {items.map(({ icon: Icon, text }) => (
          <FadeUp key={text}>
            <div className="flex items-center gap-2 text-zinc-400 text-sm whitespace-nowrap">
              <Icon className="w-4 h-4 text-red-500 shrink-0" />{text}
            </div>
          </FadeUp>
        ))}
      </Stagger>
    </div>
  );
}

// ─── TOOLS BAR ────────────────────────────────────────────────────────────────
const toolLogos = [
  { src: "https://svgl.app/library/google_wordmark.svg",       alt: "Google" },
  { src: "https://svgl.app/library/notion_wordmark.svg",       alt: "Notion" },
  { src: "https://svgl.app/library/stripe_wordmark.svg",       alt: "Stripe" },
  { src: "https://svgl.app/library/slack_wordmark.svg",        alt: "Slack" },
  { src: "https://svgl.app/library/gmail.svg",                 alt: "Gmail" },
  { src: "https://svgl.app/library/zapier_wordmark.svg",       alt: "Zapier" },
  { src: "https://svgl.app/library/microsoft_wordmark.svg",    alt: "Microsoft" },
  { src: "https://svgl.app/library/hubspot_wordmark.svg",      alt: "HubSpot" },
  { src: "https://svgl.app/library/airtable_wordmark.svg",     alt: "Airtable" },
  { src: "https://svgl.app/library/whatsapp_wordmark.svg",     alt: "WhatsApp" },
];

function ToolsBar() {
  return (
    <div className="border-b border-white/[0.05] bg-white/[0.01] py-5">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600 mb-4">
        Wir nutzen die besten Tools — Sie müssen sich um nichts kümmern
      </p>
      <LogoCloud logos={toolLogos} speed={60} speedOnHover={20} />
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
// 21st.dev ElegantShape: floating frosted-glass ellipses
function ElegantShape({ className, delay = 0, width = 400, height = 100, rotate = 0, gradient = "from-white/[0.06]" }: {
  className?: string; delay?: number; width?: number; height?: number; rotate?: number; gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -120, rotate: rotate - 12 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }}
      className={cn("absolute pointer-events-none", className)}
    >
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r to-transparent",
          gradient,
          "backdrop-blur-[2px] border border-white/[0.08]",
          "shadow-[0_8px_32px_0_rgba(255,255,255,0.04)]"
        )} />
      </motion.div>
    </motion.div>
  );
}

// Kicker: urgency badge mit pulsierendem Dot
function KickerBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-2.5 bg-red-950/40 border border-red-500/20 rounded-full px-4 py-2 text-sm font-medium text-zinc-300 shadow-[0_0_20px_rgba(239,68,68,0.08)]"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      {children}
    </motion.div>
  );
}

function Hero() {
  return (
    <LampContainer contentClassName="max-w-6xl mx-auto px-4 pt-36 pb-20">
      <div className="max-w-4xl relative z-30">
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
        >
          Ihre neue Website —{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">die Kunden überzeugt.</span>
            <motion.span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-transparent"
              initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:1, duration:.8 }} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10"
        >
          Kein Warten auf 3 Monate, kein Agentur-Chaos, kein Ticketsystem.{" "}
          <span className="text-white">Ein Ansprechpartner, eine klare Lösung</span> — für Handwerker im Raum Heilbronn und Stuttgart.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.48 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <CTA size="lg">Kostenloses Gespräch buchen <ArrowRight className="w-5 h-5" /></CTA>
          <button
            onClick={() => {
              const el = document.getElementById("loesung");
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 cursor-pointer px-10 py-5 text-lg border border-zinc-700 hover:border-red-500/50 text-zinc-300 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-red-600/5 relative z-50"
          >
            Demo ansehen <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.62 }}
          className="flex items-center gap-3"
        >
          {/* Overlapping avatars */}
          <div className="flex items-center -space-x-2.5">
            {[
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=48&h=48&fit=crop&crop=faces&auto=format",
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=48&h=48&fit=crop&crop=faces&auto=format",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=faces&auto=format",
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=faces&auto=format",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop&crop=faces&auto=format",
            ].map((src, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111] overflow-hidden ring-0 shrink-0"
                style={{ zIndex: 5 - i }}>
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          {/* Stars + text */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-zinc-400">
              <span className="text-white font-semibold">20+ Handwerksbetriebe</span>{" "}
              <span className="text-zinc-500">in der Region vertrauen uns</span>
            </p>
          </div>
        </motion.div>

        {/* Partner-Betriebe Slider */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 w-full max-w-2xl"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-600 mb-4">
            Betriebe die bereits mit WerkstattKLAR arbeiten
          </p>
          <div className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <InfiniteSlider gap={40} speed={50}>
              {[
                "Elektro Maier GmbH",
                "Sanitär Weber",
                "Dach & Fach Schmidt",
                "Heizung Becker",
                "Maler Hoffmann",
                "Klempner Fischer",
                "Zimmerei Braun",
                "Fliesen Koch",
                "SHK Müller",
                "Elektrotechnik Roth",
              ].map((name) => (
                <span
                  key={name}
                  className="whitespace-nowrap text-sm font-semibold text-zinc-600 border border-zinc-800 rounded-full px-4 py-1.5 bg-white/[0.02]"
                >
                  {name}
                </span>
              ))}
            </InfiniteSlider>
          </div>
        </motion.div>
      </div>
    </LampContainer>
  );
}

// ─── PROBLEM — 21st.dev Bento Monochrome mixed-span grid ─────────────────────
const problemItems = [
  { icon: AlertTriangle, title: "Unsichtbar auf Google", meta: "HAUPTPROBLEM",
    body: "Ihr Konkurrent hat 80 Bewertungen und eine moderne Website — Sie haben 12 Bewertungen und eine Seite aus 2014. Wer glauben Sie bekommt den Anruf?",
    cost: "Täglich Aufträge die zur Konkurrenz gehen",
    span: "md:col-span-4 md:row-span-2" },
  { icon: Phone, title: "Anruf verpasst = Auftrag weg", meta: "ERREICHBARKEIT",
    body: "Sie sind auf der Baustelle. Kunde ruft an, Sie können nicht rangehen. Bis Sie zurückrufen hat er schon woanders einen Termin.",
    cost: "Jeder verpasste Anruf kostet 200–800 €",
    span: "md:col-span-2 md:row-span-1" },
  { icon: Clock, title: "45 Minuten pro Angebot", meta: "ZEITVERLUST",
    body: "Maße aufschreiben, Preise nachschlagen, Word-Dokument tippen, PDF erstellen. Das kostet fast eine Stunde — für jedes einzelne Angebot.",
    cost: "Wertvolle Arbeitszeit verschwendet",
    span: "md:col-span-2 md:row-span-1" },
  { icon: Star, title: "Kaum Google-Bewertungen", meta: "REPUTATION",
    body: "Zufriedene Kunden denken nicht daran eine Bewertung zu hinterlassen. Ohne aktives Nachfragen bleibt der Betrieb bei 10–15 Bewertungen hängen — für immer.",
    cost: "Kein Vertrauen, weniger Anfragen",
    span: "md:col-span-3 md:row-span-1" },
  { icon: FileText, title: "Veraltete oder keine Website", meta: "AUSSENWIRKUNG",
    body: "70% der Kunden schauen sich zuerst die Website an bevor sie anrufen. Eine schlechte Website ist schlimmer als gar keine.",
    cost: "Erster Eindruck zerstört",
    span: "md:col-span-3 md:row-span-1" },
];

function ProblemCard({ icon: Icon, title, meta, body, cost, span, isVisible, delay }: {
  icon: any; title: string; meta: string; body: string; cost: string; span: string; isVisible: boolean; delay: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "motion-safe:opacity-0",
        isVisible ? "motion-safe:animate-[bento-card-in_0.7s_ease-out_forwards]" : "",
        span
      )}
      style={{ animationDelay: delay } as any}
    >
      <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 group h-full flex flex-col justify-between overflow-hidden p-6">
        {/* Subtle gradient accent */}
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
    </motion.div>
  );
}

function Problems() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, amount: 0.2 });
  return (
    <Section id="problem" className="bg-[#161616]" dots dotsBg="#161616">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse-icon { 0%,100%{transform:scale(1);opacity:.85} 50%{transform:scale(1.12);opacity:1} }
        @keyframes tilt { 0%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} 100%{transform:rotate(-3deg)} }
        @keyframes drift { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(5%,-5%,0)} }
        @keyframes bento-card-in { 0%{opacity:0;transform:translate3d(0,18px,0) scale(.97)} 100%{opacity:1;transform:translate3d(0,0,0) scale(1)} }
      `}</style>
      <Stagger className="text-center mb-12">
        <FadeUp><SectionLabel>Das Problem</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>Warum verlieren Handwerker täglich Aufträge?</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">Nicht weil die Arbeit schlechter ist. Sondern weil die Außenwirkung nicht stimmt.</p></FadeUp>
      </Stagger>
      <div ref={ref} className="grid grid-cols-1 gap-3 md:auto-rows-[minmax(130px,auto)] md:grid-cols-6">
        {problemItems.map((item, i) => (
          <ProblemCard key={item.title} {...item} isVisible={isVisible} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </Section>
  );
}

// ─── SOLUTION — 21st.dev BentoCard hover + slide pattern ─────────────────────
function Solution() {
  const features = [
    { icon: Zap, title: "Professionelle Website, die überzeugt", meta: "WEBSITE", num: "01",
      body: "Sieht aus wie von einer teuren Agentur gebaut — und das mit persönlicher Betreuung. Mobiloptimiert, schnell, mit Kontaktformular, Google Maps und allem was ein Handwerker braucht.",
      result: "Kunden finden und vertrauen Ihnen",
      span: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2" },
    { icon: Phone, title: "Terminbuchung automatisch", meta: "KEIN VERPASSTER ANRUF", num: "02",
      body: "Kunden buchen direkt auf der Website einen Termin — ohne anzurufen. Sie bekommen die Buchung sofort per Mail. Der Kunde bekommt eine Bestätigung und SMS-Erinnerung.",
      result: "Kein verpasster Auftrag mehr",
      span: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2" },
    { icon: FileText, title: "KI-Angebotserstellung", meta: "5 STATT 45 MINUTEN", num: "03",
      body: "Kunde füllt ein Formular aus. Eine KI erstellt das vollständige Angebot als PDF. Sie prüfen kurz, klicken auf Senden. Fertig.",
      result: "45 Minuten auf 5 Minuten",
      span: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3" },
    { icon: Star, title: "Bewertungsautomation", meta: "GOOGLE BEWERTUNGEN", num: "04",
      body: "Job abgeschlossen? Automatisch geht eine persönliche SMS an den Kunden mit direktem Link zur Google-Bewertung. 6 neue Bewertungen pro Monat — ohne Aufwand.",
      result: "Dominant in der lokalen Suche",
      span: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2" },
    { icon: Shield, title: "Ein Ansprechpartner — immer", meta: "KEIN TICKETSYSTEM", num: "05",
      body: "Kein Ticketsystem, kein Callcenter, kein Warten. Sie haben eine direkte Handynummer und bekommen innerhalb von Stunden eine Antwort — nicht nach Tagen.",
      result: "Lokaler Support, der funktioniert",
      span: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3" },
  ];
  return (
    <Section id="loesung" dots dotsBg="#111111">
      <Stagger className="text-center mb-14">
        <FadeUp><SectionLabel>Die Lösung</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>Website. Termine. Angebote. Bewertungen.</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">Alles was ein Handwerksbetrieb digital braucht — aus einer Hand, sorgfältig umgesetzt, mit einem Ansprechpartner.</p></FadeUp>
      </Stagger>
      {/* 21st.dev BentoGrid: mixed row/col spans */}
      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:auto-rows-[minmax(140px,auto)] lg:grid-cols-3 gap-4">
        {features.map(({ icon: Icon, title, meta, num, body, result, span }, i) => (
          <FadeUp key={title} className={cn("h-full", span)}>
            <motion.div
              initial="idle" whileHover="active" variants={{ idle: {}, active: {} }}
              className="h-full"
            >
              <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 group h-full flex flex-col justify-between overflow-hidden">
                {/* Subtle red gradient */}
                <div className="absolute inset-0 pointer-events-none opacity-60"
                  style={{ background: "radial-gradient(ellipse 60% 80% at 10% 0%, rgba(239,68,68,0.08), transparent 70%)" }} />
                {/* Content block — slides up on hover (21st.dev pattern) */}
                <div className="pointer-events-none z-10 flex flex-col gap-1 p-7 transition-all duration-300 group-hover:-translate-y-8">
                  <motion.div variants={{ idle: { scale: 1 }, active: { scale: 0.8, originX: 0 } }}
                    transition={{ duration: 0.3 }} className="mb-4 w-fit">
                    <FeatureIcon icon={Icon} color="red" />
                  </motion.div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-zinc-700">{num}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 border border-zinc-800 rounded-full px-2 py-0.5">{meta}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">{body}</p>
                </div>
                {/* Result badge — slides in from bottom on hover (21st.dev pattern) */}
                <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span className="text-green-400 text-xs font-bold">{result}</span>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-red-500/[0.02]" />
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </Stagger>
    </Section>
  );
}

// ─── HOW IT WORKS — Timeline + GlowCard ──────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n:1, icon: Phone, title:"Kostenloses Gespräch", duration:"20 Min · kostenlos", meta:"Schritt 1",
      body:"Wir reden 20 Minuten. Sie erklären Ihren Betrieb, Ihre Leistungen, Ihre Region. Ich zeige Ihnen eine fertige Demo-Website von einem ähnlichen Betrieb.",
      result:"Klarheit was Sie bekommen",
      items:["Betrieb und Leistungen besprechen","Demo-Website live ansehen","Paket wählen und Ablauf klären"] },
    { n:2, icon: Layers, title:"Website-Aufbau", duration:"5–7 Tage", meta:"Schritt 2",
      body:"Sie schicken mir Fotos, Leistungen und Kontaktdaten. Ich baue die komplette Website. Sie müssen NICHTS selbst machen.",
      result:"Website fertig ohne Ihren Aufwand",
      items:["Inhalte und Fotos sammeln (30 Min)","Ich baue alles — Sie warten","Korrekturschleife: 1–2 kleine Änderungen"] },
    { n:3, icon: Users, title:"Abnahme & Go-Live", duration:"30 Min", meta:"Schritt 3",
      body:"Wir schauen die fertige Website gemeinsam durch. Letzte Anpassungen. Dann geht sie live — mit echter Domain, Hosting, Google Maps und allem.",
      result:"Ihre Website ist online",
      items:["Website gemeinsam durchgehen","Domain und Hosting einrichten","Live schalten + Google anmelden"] },
    { n:4, icon: Zap, title:"Betreuung & Wachstum", duration:"Monatlich", meta:"Schritt 4",
      body:"Ich kümmere mich um Hosting, Updates und technische Pflege. Monatlicher Check-in. Falls etwas geändert werden soll — eine WhatsApp genügt.",
      result:"Sie konzentrieren sich auf die Arbeit",
      items:["Hosting & technische Pflege","Änderungen per WhatsApp","Monatlicher Kurz-Check-in"] },
  ];
  return (
    <Section className="bg-[#161616]" dots dotsBg="#161616">
      <Stagger className="text-center mb-14">
        <FadeUp><SectionLabel>Der Prozess</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>Schnell live — ohne dass Sie etwas tun</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">Kein Monatelange Wartezeiten, kein hin und her. Einmal besprechen, einmal freigeben — fertig.</p></FadeUp>
      </Stagger>

      {/* Vertical timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-[27px] top-6 bottom-6 w-px pointer-events-none hidden sm:block"
          style={{ background: "linear-gradient(to bottom, rgba(239,68,68,0.6), rgba(239,68,68,0.2) 70%, rgba(34,197,94,0.4))" }} />

        <Stagger className="flex flex-col gap-6">
          {steps.map(({ n, icon: Icon, title, duration, body, result, items }, i) => (
            <FadeUp key={n}>
              <div className="flex gap-5 sm:gap-7 items-start">
                {/* Left: Icon + step number */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, type: "spring", stiffness: 260, damping: 18 }}
                  className="relative z-10 shrink-0"
                >
                  <FeatureIcon icon={Icon} color="red" size="md" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-[11px] font-black text-white leading-none shadow-lg shadow-red-900/40">{n}</span>
                </motion.div>

                {/* Right: GlowCard */}
                <motion.div initial="idle" whileHover="active" variants={{ idle: {}, active: {} }} className="flex-1 min-w-0">
                  <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 group flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none opacity-60"
                      style={{ background: "radial-gradient(ellipse 60% 80% at 10% 0%, rgba(239,68,68,0.10), transparent 70%)" }} />
                    {/* Content */}
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
                    {/* Result badge */}
                    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-green-400 text-sm font-bold">{result}</span>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-red-500/[0.02]" />
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

// ─── ROI ─────────────────────────────────────────────────────────────────────
function ROI() {
  return (
    <Section dots dotsBg="#111111">
      <Stagger className="text-center mb-12">
        <FadeUp><SectionLabel>Die Rechnung</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>Was kostet Sie eine schlechte Online-Präsenz wirklich?</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">Keine Theorie. Echte Zahlen. Schon 1–2 Aufträge mehr pro Monat zahlen alles zurück.</p></FadeUp>
      </Stagger>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-5">
        {/* Before / After comparison */}
        <FadeUp className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-3 h-full">
            {/* Without */}
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-zinc-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">Ohne System</span>
              </div>
              {[
                { icon: AlertTriangle, text: "Alte Website aus 2014" },
                { icon: Phone, text: "Anrufe die nicht ankommen" },
                { icon: Clock, text: "45 Min pro Angebot" },
                { icon: Star, text: "12 Google-Bewertungen" },
                { icon: X, text: "Unsichtbar auf Google" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-zinc-600">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm line-through">{text}</span>
                </div>
              ))}
              <div className="mt-auto pt-4 border-t border-zinc-800">
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-wider">Verlorenes Potenzial</p>
                <p className="text-xl font-black text-zinc-600 mt-1">Aufträge die zur Konkurrenz gehen</p>
              </div>
            </motion.div>
            {/* With */}
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/20 to-zinc-900/40 p-6 flex flex-col gap-4 [box-shadow:0_0_40px_rgba(239,68,68,0.06)_inset]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-red-400">Mit WerkstattKLAR</span>
              </div>
              {[
                { icon: Zap, text: "Professionelle Website, persönlich betreut" },
                { icon: Phone, text: "Terminbuchung automatisch" },
                { icon: FileText, text: "Angebot in 5 Minuten" },
                { icon: Star, text: "6+ Bewertungen / Monat" },
                { icon: TrendingUp, text: "Seite 1 bei Google lokal" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-zinc-200">
                  <Icon className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
              <div className="mt-auto pt-4 border-t border-red-500/10">
                <p className="text-red-400 text-xs font-bold uppercase tracking-wider">Mit WerkstattKLAR</p>
                <p className="text-xl font-black text-white mt-1">Sichtbar. Erreichbar. Professionell.</p>
              </div>
            </motion.div>
          </div>
        </FadeUp>

        {/* Stats column */}
        <FadeUp>
          <div className="flex flex-col gap-3 h-full">
            <motion.div whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(239,68,68,0.12)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-950/30 to-zinc-900/60 p-6 flex flex-col items-center justify-center text-center flex-1 [box-shadow:0_0_40px_rgba(239,68,68,0.06)_inset]">
              <FeatureIcon icon={TrendingUp} color="red" size="lg" className="mb-3" />
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Neue Bewertungen</p>
              <p className="text-5xl font-black text-white leading-none">+72</p>
              <p className="text-zinc-400 text-sm font-semibold mt-1">pro Jahr im Schnitt</p>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 flex flex-col items-center justify-center text-center">
              <FeatureIcon icon={Euro} color="neutral" size="sm" className="mb-2" />
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-1">Ab einmalig</p>
              <p className="text-3xl font-black text-white">999 €</p>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}

// ─── VALUE STACK ──────────────────────────────────────────────────────────────
function PricingItem({ text, checked }: { text: string; checked: boolean }) {
  return (
    <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3">
      <span className={cn("grid w-5 h-5 place-content-center rounded-full text-xs shrink-0 transition-colors",
        checked ? "bg-red-600/90 text-white" : "bg-zinc-800 text-zinc-500")}>
        {checked ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      </span>
      <span className={cn("text-sm", checked ? "text-zinc-200" : "text-zinc-600")}>{text}</span>
    </motion.div>
  );
}

function ValueStack() {
  const baseItems = [
    "Professionelle, mobiloptimierte Website",
    "Startseite mit klarer Botschaft & CTA",
    "Leistungsübersicht & Referenzen",
    "Kontaktformular mit Bestätigungsmail",
    "Google Maps Einbindung",
    "Impressum & Datenschutz",
    "Hosting & technische Pflege inklusive",
    "Persönliche Betreuung & schnelle Umsetzung",
    "1 direkter Ansprechpartner",
  ];
  const proItems = [
    ...baseItems,
    "Terminbuchung direkt auf der Website",
    "SMS-Erinnerung 24h vor dem Termin",
    "Nachfass-Mail nach dem Termin",
    "KI-Angebotserstellung als PDF (5 Min statt 45)",
    "Bewertungsautomation nach Jobabschluss",
    "Automatische Erinnerung nach 5 Tagen",
    "Alle Tool-Kosten inklusive (Make, Cal, Claude API)",
  ];

  return (
    <Section id="preise" className="bg-[#161616]" dots dotsBg="#161616">
      <div className="max-w-5xl mx-auto">
        <Stagger className="text-center mb-10">
          <FadeUp><SectionLabel>Preise</SectionLabel></FadeUp>
          <FadeUp><SectionHeading center>Einfach. Transparent. Ohne versteckte Kosten.</SectionHeading></FadeUp>
          <FadeUp><p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">Zwei Pakete. Ein Ansprechpartner. Kein Agentur-Bullshit.</p></FadeUp>
        </Stagger>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Package 1 — Website */}
          <FadeUp>
            <motion.div initial="idle" whileHover="active" variants={{ idle: {}, active: {} }} className="h-full">
              <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 group overflow-hidden h-full flex flex-col">
                <div className="absolute inset-0 pointer-events-none opacity-40"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,68,68,0.08), transparent 70%)" }} />
                <div className="relative z-10 p-8 flex flex-col flex-1">
                  <div className="pb-6 mb-6 border-b border-zinc-800/80">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-3">Paket 1</span>
                    <h3 className="text-2xl font-black text-white mb-4">Website</h3>
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-5xl font-black text-white">999 €</span>
                      <span className="text-zinc-500 text-sm mb-2">einmalig</span>
                    </div>
                    <div className="bg-zinc-800/40 border border-zinc-700/40 rounded-xl p-3 text-sm text-zinc-400">
                      danach <span className="text-white font-bold">49 €/Monat</span> · Hosting & Pflege
                    </div>
                  </div>
                  <div className="space-y-3 mb-8 flex-1">
                    {baseItems.map(t => <PricingItem key={t} text={t} checked={true} />)}
                  </div>
                  <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                    <CTA size="md" className="w-full justify-center">Gespräch buchen <ArrowRight className="w-4 h-4" /></CTA>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-700">
                      <Lock className="w-3 h-3" /> DSGVO-konform
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-red-500/[0.02]" />
              </div>
            </motion.div>
          </FadeUp>

          {/* Package 2 — Website + Automationen */}
          <FadeUp>
            <motion.div initial="idle" whileHover="active" variants={{ idle: {}, active: {} }} className="h-full">
              <div className="relative rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/20 to-zinc-900/50 group overflow-hidden h-full flex flex-col [box-shadow:0_0_60px_rgba(239,68,68,0.08)_inset]">
                <div className="absolute inset-0 pointer-events-none opacity-60"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,68,68,0.14), transparent 70%)" }} />
                <div className="relative z-10 p-8 flex flex-col flex-1">
                  <div className="pb-6 mb-6 border-b border-red-500/10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Paket 2</span>
                      <motion.span animate={{ scale:[1,1.05,1] }} transition={{ duration:2, repeat:Infinity }}
                        className="bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full">Empfohlen</motion.span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">Website + Automationen</h3>
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-5xl font-black text-white">1.999 €</span>
                      <span className="text-zinc-500 text-sm mb-2">einmalig</span>
                    </div>
                    <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-3 text-sm text-zinc-300">
                      danach <span className="text-white font-bold">129 €/Monat</span> · inkl. aller Tool-Kosten
                    </div>
                  </div>
                  <div className="space-y-3 mb-8 flex-1">
                    {proItems.map(t => <PricingItem key={t} text={t} checked={true} />)}
                  </div>
                  <div className="space-y-3 pt-4 border-t border-red-500/10">
                    <div className="flex justify-center">
                      <KickerBadge>Nur 3 Plätze/Monat — <span className="text-white font-bold">2 frei im Mai</span></KickerBadge>
                    </div>
                    <CTA size="md" className="w-full justify-center">Jetzt Platz sichern <ArrowRight className="w-4 h-4" /></CTA>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-700">
                      <Lock className="w-3 h-3" /> DSGVO-konform · Ihre Daten bleiben bei Ihnen
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-red-500/[0.02]" />
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </Section>
  );
}

// ─── GUARANTEES — GlowCard pattern (same as Solution/Prozess) ─────────────────
function Guarantees() {
  const items = [
    { icon: Trophy, emoji:"🏆", title:"30-Tage-Zufriedenheitsgarantie", label:"Ergebnis-Garantie",
      body:"Wenn Sie nach 30 Tagen nicht spürbar zufriedener mit Ihrer Online-Präsenz sind — volle Rückerstattung. Ohne Diskussion, ohne Bedingungen.",
      condition:"Ich arbeite so lange weiter, bis Sie zufrieden sind.",
      result:"0 € Risiko für Sie" },
    { icon: Zap, emoji:"⚡", title:"Klares Timing — garantiert", label:"Tempo-Garantie",
      body:"Keine monatelangen Wartezeiten. Ich nenne Ihnen einen konkreten Fertigstellungstermin — und halte ihn. Wenn nicht, bekommen Sie 200 € zurück.",
      condition:"Ein klarer Termin. Kein Vertrösten.",
      result:"Pünktlich oder Sie bekommen Geld zurück" },
    { icon: RefreshCw, emoji:"♾️", title:"Laufende Betreuung inklusive", label:"Support-Garantie",
      body:"Solange Sie Kunde sind — direkter Kontakt, keine Tickets, keine Warteliste. Änderung per WhatsApp, Umsetzung innerhalb von 48 Stunden.",
      condition:"Eine Handynummer. Immer erreichbar.",
      result:"Support wie von einem Mitarbeiter" },
  ];
  return (
    <Section className="bg-[#161616]" dots dotsBg="#161616">
      <Stagger className="text-center mb-14">
        <FadeUp><SectionLabel>Null Risiko</SectionLabel></FadeUp>
        <FadeUp><SectionHeading center>3-fache Garantie. 0 € Risiko.</SectionHeading></FadeUp>
        <FadeUp><p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">Ich trage das gesamte Risiko. Entweder es funktioniert - oder Sie bekommen Ihr Geld zurück.</p></FadeUp>
      </Stagger>
      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, title, label, body, condition, result }) => (
          <FadeUp key={title} className="h-full">
            <motion.div initial="idle" whileHover="active" variants={{ idle: {}, active: {} }} className="h-full">
              <div className="relative rounded-2xl border border-zinc-800/60 bg-zinc-900/50 group h-full flex flex-col justify-between overflow-hidden">
                {/* Green tint gradient */}
                <div className="absolute inset-0 pointer-events-none opacity-50"
                  style={{ background:"radial-gradient(ellipse 60% 80% at 10% 0%, rgba(34,197,94,0.06), transparent 70%)" }} />
                {/* Content slides up on hover */}
                <div className="pointer-events-none z-10 flex flex-col gap-1 p-7 transition-all duration-300 group-hover:-translate-y-8">
                  <motion.div variants={{ idle: { scale: 1 }, active: { scale: 0.8, originX: 0 } }}
                    transition={{ duration: 0.3 }} className="mb-4 w-fit">
                    <FeatureIcon icon={Icon} color="green" />
                  </motion.div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-3 h-3 text-green-500/60" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600">{label}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-1">{body}</p>
                  <p className="text-zinc-600 text-xs italic mt-2">{condition}</p>
                </div>
                {/* Result badge slides in from bottom */}
                <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span className="text-green-400 text-xs font-bold">{result}</span>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-green-500/[0.015]" />
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </Stagger>
    </Section>
  );
}

// ─── URGENCY ──────────────────────────────────────────────────────────────────
function useCountdown(hours = 48) {
  const endRef = useRef<number|null>(null);
  const [t, setT] = useState({ h:hours, m:0, s:0 });
  useEffect(() => {
    if (!endRef.current) {
      const s = typeof window !== "undefined" ? localStorage.getItem("wk_dl") : null;
      endRef.current = s ? parseInt(s) : Date.now() + hours*3600000;
      if (!s && typeof window !== "undefined") localStorage.setItem("wk_dl", String(endRef.current));
    }
    const tick = () => {
      const d = Math.max(0, (endRef.current??0) - Date.now());
      setT({ h:Math.floor(d/3600000), m:Math.floor((d%3600000)/60000), s:Math.floor((d%60000)/1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hours]);
  return t;
}

function Urgency() {
  const { h, m, s } = useCountdown(48);
  const pad = (n:number) => String(n).padStart(2,"0");
  const expired = h===0 && m===0 && s===0;
  return (
    <Section dots dotsBg="#111111">
      <div className="max-w-2xl mx-auto text-center">
        <Stagger>
          <FadeUp><SectionLabel>Zeitlich begrenzt</SectionLabel></FadeUp>
          <FadeUp><SectionHeading center>Ihr Preisvorteil läuft ab in:</SectionHeading></FadeUp>
          <FadeUp><p className="text-zinc-400 mb-10 text-sm md:text-base">Der Einführungspreis von <span className="text-white font-semibold">999 €</span> bzw. <span className="text-white font-semibold">1.999 €</span> gilt nur für die ersten Kunden in der Region.</p></FadeUp>
        </Stagger>
        {!expired ? (
          <div className="flex items-center justify-center gap-3 md:gap-5 mb-10">
            {[{v:pad(h),l:"Stunden"},{v:pad(m),l:"Minuten"},{v:pad(s),l:"Sekunden"}].map(({v,l},i) => (
              <div key={l} className="flex items-center gap-3 md:gap-5">
                {i > 0 && (
                  <div className="flex flex-col gap-1.5 mb-6">
                    <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ duration:1, repeat:Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ duration:1, repeat:Infinity, delay:0.5 }}
                      className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={v}
                      initial={{ y: -28, opacity: 0, filter: "blur(4px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: 28, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-b from-red-500/40 via-zinc-700/30 to-zinc-900 min-w-[80px] md:min-w-[100px]"
                    >
                      <motion.div className="absolute w-16 h-16 rounded-full bg-red-500/20 blur-2xl pointer-events-none left-1/2 -translate-x-1/2 -top-4" />
                      <div className="relative rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#111] px-4 py-5 md:py-7 text-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.07] to-transparent pointer-events-none" />
                        <motion.span
                          animate={{ textShadow:["0 0 30px rgba(239,68,68,0.7)","0 0 8px rgba(239,68,68,0.2)","0 0 30px rgba(239,68,68,0.7)"] }}
                          transition={{ duration:2.5, repeat:Infinity }}
                          className="text-5xl md:text-6xl font-black tabular-nums text-white"
                        >{v}</motion.span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <span className="text-[11px] text-zinc-600 uppercase tracking-widest font-semibold">{l}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 text-zinc-400">
            Rabatt abgelaufen. Aktueller Preis: <span className="text-white font-bold">1.990 €</span>
          </div>
        )}
        <p className="text-zinc-600 text-sm mb-8">Danach gilt der reguläre Preis.</p>
        <CTA size="lg">Jetzt zum Rabattpreis sichern <ArrowRight className="w-5 h-5" /></CTA>
      </div>
    </Section>
  );
}

// ─── TESTIMONIALS — Marquee (TestimonialsWithMarquee) ─────────────────────────
function Testimonials() {
  const testimonials = [
    {
      author: { name: "Thomas M.", handle: "Elektriker · Heilbronn", avatar: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop&crop=faces" },
      text: "Meine alte Website war aus 2013. Ich hab sie nie angefasst weil ich nicht wusste wie. Jetzt hab ich eine die wirklich gut aussieht — und ich hab nichts selbst gemacht. War in 6 Tagen fertig.",
    },
    {
      author: { name: "Stefan W.", handle: "Maler · Stuttgart-Süd", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" },
      text: "Das Angebot früher: Word aufmachen, Preise raussuchen, PDF erstellen, Mail schreiben. 40 Minuten. Jetzt: Formular kommt rein, PDF ist fertig, ich drücke auf Senden. 5 Minuten.",
    },
    {
      author: { name: "Michael K.", handle: "SHK · Ludwigsburg", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=faces" },
      text: "Wir haben jetzt 67 Google-Bewertungen. Vorher waren es 14. Das System schreibt Kunden nach jedem Job automatisch an. Ich muss gar nichts machen — die Bewertungen kommen einfach.",
    },
    {
      author: { name: "Andreas B.", handle: "Zimmerer · Öhringen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" },
      text: "Kunden können jetzt direkt auf meiner Website einen Termin buchen. Ich bekomme eine Mail und der Kunde bekommt eine SMS-Erinnerung. Ich hab seit 3 Monaten keine Anfrage mehr verpasst.",
    },
    {
      author: { name: "Klaus R.", handle: "Dachdecker · Bad Mergentheim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces" },
      text: "Was mich überzeugt hat: Ich hab eine Demo-Website gesehen von einem Betrieb der ähnlich aufgestellt ist wie ich. Da wusste ich sofort — das ist es was ich will.",
    },
    {
      author: { name: "Frank H.", handle: "Schreiner · Heilbronn", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces" },
      text: "Ich hab 20 Jahre lang keine Website gebraucht. Dann hat mein Sohn Google Maps geöffnet und mir gezeigt dass mein Konkurrent 80 Bewertungen hat und ich 9. Da hab ich angerufen.",
    },
  ];
  return (
    <div className="bg-[#161616]">
      <div className="max-w-6xl mx-auto px-4 pt-20 text-center">
        <Stagger>
          <FadeUp><SectionLabel>Ergebnisse</SectionLabel></FadeUp>
          <FadeUp><SectionHeading center>Was Kunden sagen</SectionHeading></FadeUp>
          <FadeUp><p className="text-zinc-500 text-sm mb-0">Echte Ergebnisse von echten Handwerksbetrieben.</p></FadeUp>
        </Stagger>
      </div>
      <TestimonialsSection
        title=""
        description=""
        testimonials={testimonials}
        className="pt-2 pb-20"
      />
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  { q:"Was kostet das genau?", a:"Paket 1 (Website): 999 € einmalig, dann 49 €/Monat für Hosting und Pflege. Paket 2 (Website + Automationen): 1.999 € einmalig, dann 129 €/Monat — darin sind alle Tool-Kosten inklusive (Make.com, Cal.com, Claude API). Keine versteckten Kosten." },
  { q:"Wie lange dauert es bis die Website live ist?", a:"Das hängt davon ab, wie schnell wir gemeinsam die Inhalte zusammenstellen. Normalerweise sind es 1–2 Wochen. Ich nenne Ihnen am Anfang einen konkreten Fertigstellungstermin — und halte ihn. Wenn nicht, bekommen Sie 200 € zurück." },
  { q:"Ich habe schon eine Website — was dann?", a:"Kein Problem. Wir schauen sie gemeinsam an. Wenn sie grundsätzlich noch zu retten ist, optimieren wir sie. Wenn nicht, bauen wir eine neue. Das klären wir im kostenlosen Erstgespräch." },
  { q:"Für welche Handwerker ist das gedacht?", a:"Für Betriebe mit 1–15 Mitarbeitern im Raum Heilbronn und Stuttgart: Elektriker, Maler, Sanitär/Heizung, Schreiner, Fliesenleger, Dachdecker — alle die Kunden vor Ort bedienen und mehr Anfragen wollen." },
  { q:"Was wenn ich keine Ahnung von Technik habe?", a:"Das ist der Normalfall. Sie müssen gar nichts selbst einrichten oder verstehen. Sie sagen mir was Sie wollen — ich setze es um. Änderungen danach: per WhatsApp schreiben, innerhalb von 48h erledigt." },
  { q:"Wie funktioniert die Terminbuchung genau?", a:"Kunden klicken auf Ihrer Website auf 'Termin buchen', wählen einen Slot, geben Kontaktdaten an. Sie bekommen sofort eine Mail mit allen Infos. Der Kunde bekommt eine Bestätigung und 24 Stunden vorher eine SMS-Erinnerung." },
  { q:"Wie bringt die Bewertungsautomation mehr Bewertungen?", a:"Wenn Sie einen Job als abgeschlossen markieren, schickt das System automatisch eine persönliche Mail und SMS an den Kunden — mit direktem Link zur Google-Bewertungsmaske. Nach 5 Tagen ohne Reaktion geht eine sanfte Erinnerung raus. Ein Betrieb mit 3 Jobs pro Woche sammelt so 6+ neue Bewertungen pro Monat." },
  { q:"Was wenn ich nicht zufrieden bin?", a:"Dann arbeite ich kostenlos weiter bis Sie es sind. Oder ich erstatte den vollen Betrag zurück — ohne Diskussion. Das Risiko liegt bei mir, nicht bei Ihnen." },
  { q:"Was ist mit Datenschutz?", a:"Alle Daten gehören Ihnen — in Ihren eigenen Accounts. DSGVO-konform. Impressum und Datenschutzerklärung sind auf der Website inklusive." },
  { q:"Wie läuft das Erstgespräch ab?", a:"20 Minuten per Telefon oder Video. Ich zeige Ihnen eine fertige Demo-Website von einem ähnlichen Betrieb. Sie stellen Fragen. Kein Verkaufsdruck. Wenn es passt — super. Wenn nicht — kein Problem." },
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
                {/* Red accent */}
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

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <Section id="kontakt" className="bg-[#161616]">
      <div className="relative max-w-3xl mx-auto text-center overflow-hidden rounded-3xl p-12 md:p-16">
        <motion.div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-900/10"
          animate={{ opacity:[0.7,1,0.7] }} transition={{ duration:4, repeat:Infinity }} />
        <div className="absolute inset-0 border border-red-500/10 rounded-3xl" />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-700/10 rounded-full blur-[80px]"
          animate={{ scale:[1,1.2,1] }} transition={{ duration:6, repeat:Infinity }} />
        <Stagger className="relative z-10">
          <FadeUp><SectionLabel>Jetzt starten</SectionLabel></FadeUp>
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Bereit für eine Website{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">die wirklich funktioniert?</span>
            </h2>
          </FadeUp>
          <FadeUp><p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">20 Minuten Gespräch — kostenlos, keine Verpflichtung. Ich zeige Ihnen eine fertige Demo und wir schauen ob es passt. <span className="text-white font-semibold">Nur noch 2 freie Plätze im Mai.</span></p></FadeUp>
          <FadeUp className="inline-flex mb-6">
            <motion.div whileHover={{ scale:1.04 }} whileTap={{ scale:.97 }}>
              <CTA size="lg">Erstgespräch buchen <Phone className="w-5 h-5" /></CTA>
            </motion.div>
          </FadeUp>
          <FadeUp>
            <a href="tel:+491792632430"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm mb-6 group">
              <span className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </span>
              Oder direkt anrufen: <span className="text-white font-semibold">0179 263 243 0</span>
            </a>
          </FadeUp>
          <FadeUp className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
            {["Kostenlos","20 Minuten","Keine Verpflichtung","Sofort verfügbar"].map(b => (
              <div key={b} className="flex items-center gap-1.5 text-xs text-zinc-400">
                <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />{b}
              </div>
            ))}
          </FadeUp>
        </Stagger>
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="text-xl font-black mb-2">Werkstatt<span className="text-red-500">KLAR</span></div>
            <p className="text-zinc-500 text-sm leading-relaxed">Websites und Automationen für Handwerker.<br />Region Heilbronn & Stuttgart.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-300 mb-4">Links</div>
            <div className="space-y-2">
              {[
                { label: "Über uns", href: "/ueber-uns" },
                { label: "Kontakt", href: "/kontakt" },
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="block text-sm text-zinc-500 hover:text-white transition-colors">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-300 mb-4">Kontakt</div>
            <div className="space-y-3">
              {[
                { icon:Mail, text:"kontakt@werkstattklar.de", href:"mailto:kontakt@werkstattklar.de" },
                { icon:Phone, text:"0179 263 243 0", href:"tel:+491792632430" },
              ].map(({ icon:Icon, text, href }) => (
                <a key={text} href={href} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors">
                  <Icon className="w-4 h-4 shrink-0" />{text}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-700">
          <span>© 2025 WerkstattKLAR. Alle Rechte vorbehalten.</span>
          <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> DSGVO-konform · Daten bleiben bei Ihnen</span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-[#111111]">
        <Hero />
        <TrustBar />
        <Problems />
        <Solution />
        <HowItWorks />
        <ROI />
        <ValueStack />
        <Guarantees />
        <Urgency />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
