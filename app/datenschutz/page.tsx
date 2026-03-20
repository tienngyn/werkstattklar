import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz – WerkstattKLAR",
  description: "Datenschutzerklärung von WerkstattKLAR gemäß DSGVO.",
};

export default function Datenschutz() {
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
        <h1 className="text-4xl font-black mb-4">Datenschutzerklärung</h1>
        <p className="text-zinc-500 text-sm mb-12">Stand: März 2025</p>

        <div className="space-y-10 text-zinc-400 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="font-semibold text-zinc-200 mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was
              mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
              besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
              persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-zinc-200 mb-2">
              Datenerfassung auf dieser Website
            </h3>
            <p className="mb-3">
              <strong className="text-zinc-300">
                Wer ist verantwortlich für die Datenerfassung auf dieser Website?
              </strong>
              <br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten können Sie dem{" "}
              <Link href="/impressum" className="text-red-400 hover:text-red-300 transition-colors">
                Impressum
              </Link>{" "}
              dieser Website entnehmen.
            </p>
            <p>
              <strong className="text-zinc-300">Wie erfassen wir Ihre Daten?</strong>
              <br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen (z. B. durch ein Kontaktformular oder per E-Mail). Andere
              Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der
              Website durch unsere IT-Systeme erfasst. Das sind vor allem technische
              Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des
              Seitenaufrufs).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Hosting
            </h2>
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>
            <p className="mt-3">
              <strong className="text-zinc-300">Vercel</strong>
              <br />
              Anbieter ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
              91789, USA. Details entnehmen Sie der Datenschutzerklärung von
              Vercel:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                https://vercel.com/legal/privacy-policy
              </a>
              .
            </p>
            <p className="mt-3">
              Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1
              lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer
              möglichst zuverlässigen Darstellung unserer Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3. Allgemeine Hinweise und Pflichtinformationen
            </h2>
            <h3 className="font-semibold text-zinc-200 mb-2">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-zinc-200 mb-2">
              Hinweis zur verantwortlichen Stelle
            </h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </p>
            <p className="mt-3 text-zinc-300">
              WerkstattKLAR<br />
              Cong Tien Nguyen<br />
              Kehrhüttenstraße 36<br />
              74078 Heilbronn<br /><br />
              Telefon: 0179 263 243 0<br />
              E-Mail:{" "}
              <a
                href="mailto:kontakt@werkstattklar.de"
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                kontakt@werkstattklar.de
              </a>
            </p>
            <p className="mt-3">
              Verantwortliche Stelle ist die natürliche oder juristische Person,
              die allein oder gemeinsam mit anderen über die Zwecke und Mittel der
              Verarbeitung von personenbezogenen Daten entscheidet.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-zinc-200 mb-2">Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere
              Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten
              bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie
              ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung
              zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern
              wir keine anderen rechtlich zulässigen Gründe für die Speicherung
              Ihrer personenbezogenen Daten haben.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-zinc-200 mb-2">
              Ihre Rechte
            </h3>
            <p className="mb-3">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
              Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
              erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung
              dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
              Datenverarbeitung erteilt haben, können Sie diese Einwilligung
              jederzeit für die Zukunft widerrufen.
            </p>
            <p>
              Außerdem haben Sie das Recht, unter bestimmten Umständen die
              Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
              verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der
              zuständigen Aufsichtsbehörde zu.
            </p>
            <p className="mt-3">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
              jederzeit an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Datenerfassung auf dieser Website
            </h2>
            <h3 className="font-semibold text-zinc-200 mb-2">Kontaktformular / E-Mail</h3>
            <p>
              Wenn Sie uns per E-Mail oder Kontaktformular Anfragen zukommen
              lassen, werden Ihre Angaben aus dem Anfrage-Formular inklusive der
              von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
              Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-3">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs.
              1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags
              zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
              erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf
              unserem berechtigten Interesse an der effektiven Bearbeitung der an
              uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p className="mt-3">
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei
              uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur
              Speicherung widerrufen oder der Zweck für die Datenspeicherung
              entfällt. Zwingende gesetzliche Bestimmungen — insbesondere
              Aufbewahrungsfristen — bleiben unberührt.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-zinc-200 mb-2">Cookies</h3>
            <p>
              Diese Website verwendet keine Tracking-Cookies. Es werden
              ausschließlich technisch notwendige Cookies verwendet, die für den
              Betrieb der Website erforderlich sind. Diese Cookies speichern keine
              personenbezogenen Daten und dienen ausschließlich der Funktionalität
              der Website.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-zinc-200 mb-2">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen
              in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns
              übermittelt. Dies sind: Browsertyp und -version, verwendetes
              Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners,
              Uhrzeit der Serveranfrage und IP-Adresse.
            </p>
            <p className="mt-3">
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
              vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von
              Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section className="border-t border-white/[0.05] pt-8">
            <p className="text-zinc-600 text-sm">
              Diese Datenschutzerklärung wurde zuletzt im März 2025 aktualisiert.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© 2025 WerkstattKLAR. Alle Rechte vorbehalten.</span>
          <div className="flex items-center gap-5">
            <Link href="/impressum" className="hover:text-zinc-400 transition-colors">Impressum</Link>
            <Link href="/kontakt" className="hover:text-zinc-400 transition-colors">Kontakt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
