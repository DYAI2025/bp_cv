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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ben.poersch.online'),
  alternates: {
    canonical: '/',
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
