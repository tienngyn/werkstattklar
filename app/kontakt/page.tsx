import Link from "next/link";
import { ArrowLeft, Mail, Phone, Clock, Calendar, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

// 👉 Ersetzen Sie diese URL mit Ihrem echten Calendly-Link
const CALENDLY_URL = "https://calendly.com/werkstattklar/werkstattklar-erstgesprach";

export const metadata: Metadata = {
  title: "Kontakt – WerkstattKLAR",
  description: "Nehmen Sie Kontakt mit WerkstattKLAR auf. Kostenloses Erstgespräch buchen oder direkt anrufen.",
};

export default function Kontakt() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.05] py-5 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-black tracking-tight">
            Werkstatt<span className="text-red-500">KLAR</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="text-red-500 text-sm font-bold uppercase tracking-widest mb-4">
          Kontakt
        </p>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
          Sprechen wir.
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-12">
          Kostenloses Erstgespräch (20 Min) — wir analysieren Ihren
          Angebotsprozess und zeigen, was möglich ist. Kein Verkaufsgespräch,
          keine Verpflichtung.
        </p>

        {/* Calendly CTA */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full bg-red-600 hover:bg-red-500 rounded-2xl p-6 mb-8 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-lg leading-tight">
                Kostenloses Erstgespräch buchen
              </div>
              <div className="text-red-200 text-sm mt-0.5">
                20 Min · kostenlos · kein Verkaufsgespräch
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform shrink-0" />
        </a>

        {/* Contact options */}
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          <a
            href="mailto:kontakt@werkstattklar.de"
            className="group flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-red-500/20 rounded-2xl p-4 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-0.5">E-Mail</div>
              <div className="font-semibold text-white group-hover:text-red-400 transition-colors text-sm">
                kontakt@werkstattklar.de
              </div>
            </div>
          </a>

          <a
            href="tel:+491792632430"
            className="group flex items-center gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-red-500/20 rounded-2xl p-4 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-0.5">Telefon</div>
              <div className="font-semibold text-white group-hover:text-red-400 transition-colors text-sm">
                0179 263 243 0
              </div>
            </div>
          </a>
        </div>

        {/* Opening hours */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-zinc-500" />
            <div className="text-sm font-semibold text-zinc-300">Erreichbarkeit</div>
          </div>
          <div className="space-y-1.5 text-sm text-zinc-400">
            <div className="flex justify-between">
              <span>Mo – Fr</span>
              <span className="text-zinc-300">08:00 – 18:00 Uhr</span>
            </div>
            <div className="flex justify-between">
              <span>Samstag</span>
              <span className="text-zinc-300">09:00 – 13:00 Uhr</span>
            </div>
            <div className="flex justify-between">
              <span>Sonntag</span>
              <span className="text-zinc-600">Nicht erreichbar</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© 2025 WerkstattKLAR. Alle Rechte vorbehalten.</span>
          <div className="flex items-center gap-5">
            <Link href="/impressum" className="hover:text-zinc-400 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-zinc-400 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
