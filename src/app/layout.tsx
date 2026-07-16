import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// ============================================================
// Font configuration
// ============================================================

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

// ============================================================
// Metadata
// ============================================================

export const metadata: Metadata = {
  title: {
    default: 'Unicorn Academy — Премиальная онлайн-академия английского языка',
    template: '%s | Unicorn Academy',
  },
  description:
    'Изучайте английский онлайн с лучшими преподавателями. IELTS, общий английский, индивидуальные занятия. Современная платформа с личным кабинетом.',
  keywords: [
    'английский онлайн',
    'IELTS',
    'английский язык',
    'онлайн школа',
    'Unicorn Academy',
    'изучение английского',
  ],
  authors: [{ name: 'Unicorn Academy' }],
  openGraph: {
    title: 'Unicorn Academy — Онлайн-академия английского',
    description: 'Премиальное образование английского языка онлайн',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Unicorn Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unicorn Academy — Онлайн-академия английского',
    description: 'Премиальное образование английского языка онлайн',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ============================================================
// Root layout
// ============================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Prevent FOUC — apply theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('unicorn-academy-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
