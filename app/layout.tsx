import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Facundo Sanchez | Portfolio",
  description:
    "Portfolio of Facundo Sanchez, Information Systems Engineering student and web developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}