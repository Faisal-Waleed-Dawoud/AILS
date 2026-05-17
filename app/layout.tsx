import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Lecture Summarization Tool',
  description: 'AI Lecture Summarization Tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
