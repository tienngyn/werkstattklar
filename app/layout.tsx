import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WerkstattKLAR – Mehr Aufträge, weniger Chaos",
  description:
    "In 6 Wochen bauen wir Ihnen ein komplettes System – von der Auftragsannahme bis zur bezahlten Rechnung. Kein IT-Wissen nötig.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.className} bg-[#080808] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
