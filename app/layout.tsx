import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Water Tracker',
  description: 'A sleek and interactive web application built with Next.js to help you monitor and improve your daily water consumption.',
  icons: {
    icon: "/glass-icon.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
