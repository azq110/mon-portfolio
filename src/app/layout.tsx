// app/layout.tsx - Mettre à jour
import type { Metadata } from 'next';
import { ThemeProvider } from './context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Portfolio Moderne - Développeur Fullstack',
    template: '%s | Portfolio Moderne'
  },
  description: 'Portfolio de développeur fullstack avec thème sombre/clair',
  keywords: ['développeur', 'portfolio', 'react', 'nextjs', 'fullstack'],
  authors: [{ name: 'TIEGNAN AYAD HASSAN' }],
  creator: 'TIEGNAN AYAD HASSAN',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://votreportfolio.com',
    title: 'Portfolio Moderne - Développeur Fullstack',
    description: 'Portfolio de développeur fullstack avec thème sombre/clair',
    siteName: 'Portfolio Moderne',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
