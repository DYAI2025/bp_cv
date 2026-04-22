import type {Metadata} from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
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
  keywords: ['AI Integration', 'LLM Consultant', 'Digital Product Builder', 'Agile Coach', 'Berlin'],
  authors: [{ name: 'Benjamin Poersch' }],
  openGraph: {
    title: 'Benjamin Poersch | AI Expert & Product Builder',
    description: 'AI Expert, Integration Specialist, and Applied AI Builder based in Berlin.',
    url: 'https://bp-cv.vercel.app', // Placeholder, update if known
    siteName: 'Benjamin Poersch Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benjamin Poersch | AI Expert & Product Builder',
    description: 'AI Expert, Integration Specialist, and Applied AI Builder based in Berlin.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#050B14] text-blue-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
