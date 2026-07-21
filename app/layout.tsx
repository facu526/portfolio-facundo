import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const editorialFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Facundo Sanchez | Desarrollador Web",
  description:
    "Portfolio de Facundo Sanchez, desarrollador web full stack enfocado en crear sitios y aplicaciones funcionales para proyectos, negocios y personas.",
  applicationName: "Portfolio de Facundo Sanchez",
  openGraph: {
    title: "Facundo Sanchez | Desarrollador Web",
    description:
      "Portfolio de Facundo Sanchez, desarrollador web full stack enfocado en crear sitios y aplicaciones funcionales para proyectos, negocios y personas.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary",
    title: "Facundo Sanchez | Desarrollador Web",
    description:
      "Portfolio de Facundo Sanchez, desarrollador web full stack enfocado en crear sitios y aplicaciones funcionales para proyectos, negocios y personas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={editorialFont.variable}>
      <body>{children}</body>
    </html>
  );
}
