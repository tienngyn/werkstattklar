'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, Lock } from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Rechtliches',
    links: [
      { title: 'Impressum', href: '/impressum' },
      { title: 'Datenschutz', href: '/datenschutz' },
      { title: 'kontakt@werkstattklar.de', href: 'mailto:kontakt@werkstattklar.de', icon: Mail },
      { title: '0179 263 243 0', href: 'tel:+491792632430', icon: Phone },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="relative w-full border-t border-white/[0.05] bg-[#111111] px-6 py-14 lg:py-20">
      {/* subtle red glow at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-1/3 rounded-full bg-red-500/30 blur-sm" />

      <div className="max-w-6xl mx-auto">
        <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8">

          {/* Brand column */}
          <AnimatedContainer className="space-y-4">
            <div className="text-2xl font-black tracking-tight">
              Werkstatt<span className="text-red-500">KLAR</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Websites &amp; digitale Lösungen für Handwerksbetriebe.<br />
              Persönlich. Transparent. Pünktlich.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-zinc-700">
              <Lock className="w-3 h-3 shrink-0" />
              DSGVO-konform · Deine Daten bleiben bei dir
            </div>
          </AnimatedContainer>

          {/* Link columns */}
          <div className="mt-4 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.08}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                    {section.label}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                        >
                          {link.icon && <link.icon className="w-3.5 h-3.5 shrink-0" />}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <AnimatedContainer delay={0.45}>
          <div className="mt-14 border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-700">
            <span>© {new Date().getFullYear()} WerkstattKLAR. Alle Rechte vorbehalten.</span>
          </div>
        </AnimatedContainer>
      </div>
    </footer>
  );
}

// ─── Animation wrapper ────────────────────────────────────────────────────────
type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
