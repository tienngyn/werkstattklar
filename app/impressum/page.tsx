import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – WerkstattKLAR",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG.",
};

export default function Impressum() {
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
        <h1 className="text-4xl font-black mb-10">Impressum</h1>

        <div className="space-y-10 text-zinc-300 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-white mb-3">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="text-zinc-400">
              Cong Tien Nguyen<br />
              Kehrhüttenstraße 36<br />
              74078 Heilbronn<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Kontakt</h2>
            <p className="text-zinc-400">
              Telefon: 0179 263 243 0<br />
              E-Mail:{" "}
              <a
                href="mailto:kontakt@werkstattklar.de"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                kontakt@werkstattklar.de
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">
              Umsatzsteuer-ID
            </h2>
            <p className="text-zinc-400">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [USt-IdNr. eintragen]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p className="text-zinc-400">
              Cong Tien Nguyen<br />
              Kehrhüttenstraße 36<br />
              74078 Heilbronn
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">
              Haftungsausschluss
            </h2>

            <h3 className="font-semibold text-zinc-200 mb-2">Haftung für Inhalte</h3>
            <p className="text-zinc-400 mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
              §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
              überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
            <p className="text-zinc-400">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
              Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
              Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
              von entsprechenden Rechtsverletzungen werden wir diese Inhalte
              umgehend entfernen.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-zinc-200 mb-2">Haftung für Links</h3>
            <p className="text-zinc-400">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
              Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
              Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-zinc-200 mb-2">Urheberrecht</h3>
            <p className="text-zinc-400">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
              Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
              Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
              jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
              sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </section>

          <section className="border-t border-white/[0.05] pt-8">
            <p className="text-zinc-600 text-sm">
              Quelle: eRecht24.de
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© 2025 WerkstattKLAR. Alle Rechte vorbehalten.</span>
          <div className="flex items-center gap-5">
            <Link href="/datenschutz" className="hover:text-zinc-400 transition-colors">Datenschutz</Link>
            <Link href="/kontakt" className="hover:text-zinc-400 transition-colors">Kontakt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
