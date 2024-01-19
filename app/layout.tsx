import { GeistSans } from 'geist/font/sans'
import './styles/globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Crumbl Craver',
  description:
    'Discover and track the latest Crumbl Cookie flavors with ease! Crumbl Craver, powered by Next.js and Supabase, offers real-time updates, user ratings, and personalized flavor notifications for cookie enthusiasts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="flex min-h-screen flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
