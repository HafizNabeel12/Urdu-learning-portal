import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Urdu Learning Portal',
  description: 'Interactive Urdu Digital Classroom with animated learning and gamification',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
