import Link from "next/link";
import { ArrowLeft, CheckCircle, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – WerkstattKLAR",
  description: "Wer steckt hinter WerkstattKLAR? Unsere Mission: Klarheit im Angebotsprozess für Handwerksbetriebe.",
};

export default function UeberUns() {
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
          Über uns
        </p>
        <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
          Klarheit im Angebotsprozess —<br />
          für Handwerker, die wachsen wollen.
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-12">
          WerkstattKLAR wurde gegründet, weil wir täglich sehen, wie gute
          Handwerksbetriebe Aufträge verlieren — nicht wegen ihrer Arbeit,
          sondern wegen unstrukturierter Prozesse.
        </p>

        {/* Mission */}
        <div className="border-t border-white/[0.05] pt-10 mb-10">
          <h2 className="text-2xl font-bold mb-4">Unsere Mission</h2>
          <p className="text-zinc-400 leading-relaxed mb-8">
            Handwerksbetriebe sollen sich auf das konzentrieren, was sie am
            besten können — exzellente Arbeit liefern. Den Rest übernehmen
            wir: professionelle Angebotsvorlagen, automatische Follow-ups,
            klare Übersicht über alle offenen Angebote.
          </p>
          <ul className="space-y-3">
            {[
              "Kein IT-Wissen notwendig",
              "Komplett eingerichtet in 2–3 Wochen",
              "3-fache Ergebnis-Garantie",
              "Persönlicher Support via Telefon",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-zinc-300">
                <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Team / Person */}
        <div className="border-t border-white/[0.05] pt-10 mb-10">
          <h2 className="text-2xl font-bold mb-6">Wer steckt dahinter?</h2>
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8">
            <p className="text-zinc-300 leading-relaxed">
              WerkstattKLAR ist ein spezialisierter Dienstleister für
              Handwerksbetriebe im deutschsprachigen Raum. Wir kombinieren
              Prozess-Knowhow mit einfacher Technologie — damit Ihre Angebote
              professionell aussehen, schneller rausgehen und mehr Aufträge
              gewinnen.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              Wir arbeiten ausschließlich mit Handwerksbetrieben — Elektriker,
              Sanitär, Maler, SHK, Schreiner und mehr. Dieses Fokus erlaubt uns,
              Lösungen zu bauen, die wirklich passen — ohne unnötigen Ballast.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="border-t border-white/[0.05] pt-10">
          <h2 className="text-2xl font-bold mb-4">Nehmen Sie Kontakt auf</h2>
          <p className="text-zinc-400 mb-6">
            Fragen, Interesse oder einfach ein kurzes Gespräch — wir freuen uns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:kontakt@werkstattklar.de"
              className="inline-flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm font-medium transition-colors"
            >
              <Mail className="w-4 h-4 text-red-400" />
              kontakt@werkstattklar.de
            </a>
            <a
              href="tel:+491792632430"
              className="inline-flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-red-400" />
              0179 263 243 0
            </a>
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
            <Link href="/kontakt" className="hover:text-zinc-400 transition-colors">Kontakt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
