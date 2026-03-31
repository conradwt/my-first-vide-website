import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blood Pressure Tracker',
  description: 'Track your blood pressure, diastolic, heart rate, and arm readings over time.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  keywords: 'blood pressure, health tracker, heart rate, systolic, diastolic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>❤️</text></svg>" />
      </head>
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
