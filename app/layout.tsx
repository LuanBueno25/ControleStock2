import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema de Controle de Estoque - SAEP",
  description: "Gestão de almoxarifado",
  authors: [{ name: "Luan" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-50 min-h-screen text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
