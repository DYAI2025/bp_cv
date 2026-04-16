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

const DEFAULT_SITE_URL = 'https://ben.poersch.online';

function getMetadataBase(): URL {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteUrl = configuredSiteUrl || DEFAULT_SITE_URL;

  try {
    return new URL(siteUrl);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export const metadata: Metadata = {
  title: 'Benjamin Poersch | AI Expert & Product Builder',
  description: 'AI Expert, Integration Specialist, and Applied AI Builder based in Berlin.',
  metadataBase: getMetadataBase(),
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
