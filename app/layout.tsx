import type {Metadata} from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from './components/ThemeToggle';
import './globals.css'; // Global styles

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Benjamin Poersch | AI Expert & Product Builder',
  description: 'AI Expert, Integration Specialist, and Applied AI Builder based in Berlin.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-bg transition-colors duration-300 text-text selection:bg-gold/30">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
