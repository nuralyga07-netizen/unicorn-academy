import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unicorn Academy — Премиальная онлайн-академия английского языка",
  description: "Изучайте английский онлайн с лучшими преподавателями. IELTS, общий английский, индивидуальные занятия. Современная платформа с личным кабинетом.",
  keywords: ["английский онлайн", "IELTS", "английский язык", "онлайн школа", "Unicorn Academy"],
  openGraph: {
    title: "Unicorn Academy — Онлайн-академия английского",
    description: "Премиальное образование английского языка онлайн",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
