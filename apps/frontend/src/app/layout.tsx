import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'HipSamples - Premium Hip-Hop Sample Marketplace',
  description: 'Discover, buy, and download high-quality hip-hop samples for your productions',
  openGraph: {
    type: 'website',
    url: 'http://localhost:3000',
    title: 'HipSamples',
    description: 'Premium Hip-Hop Sample Marketplace',
    images: [
      {
        url: 'http://localhost:3000/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
