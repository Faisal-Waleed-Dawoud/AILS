import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Lecture Summarization Tool',
  description: 'AILS leverages AI to convert recorded lectures into organized summaries and review questions, helping educators and students improve learning efficiency',
  keywords: ["AI", "Lecture", "Summarization", "Tool", "AILS", "AI Lecture Summarization Tool"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'AI Lecture Summarization Tool',
    description: 'AILS leverages AI to convert recorded lectures into organized summaries and review questions, helping educators and students improve learning efficiency',
    url: 'https://ails.netlify.app',
    siteName: 'AI Lecture Summarization Tool',
    images: [
      {
        url: 'https://i.ibb.co/0VWx9KSM/logo.png',
        width: 1200,
        height: 630,
        alt: 'AILS',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Lecture Summarization Tool',
    description: 'AILS leverages AI to convert recorded lectures into organized summaries and review questions, helping educators and students improve learning efficiency',
    images: ['https://i.ibb.co/0VWx9KSM/logo.png'],
  },
  applicationName: "AILS",
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
