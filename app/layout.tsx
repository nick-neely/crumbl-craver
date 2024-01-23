import { GeistSans } from 'geist/font/sans'
import './styles/globals.css'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { AxiomWebVitals } from 'next-axiom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    'Crumbl Craver',
    'Cookie Flavor Updates',
    'Crumbl Cookie Flavors',
    'Cookie Enthusiasts',
    'Latest Cookie Flavors',
    'Crumbl Cookie Menu',
    'Cookie Flavor Alerts',
    'New Cookie Releases',
    'Crumbl Cookie Notifications',
    'Dessert Discovery',
    'Cookie Flavor Tracker',
    'Crumbl Cookie News',
    'Online Dessert Updates',
    'Automated Flavor Updates',
    'Cookie Shop Web Scraper',
  ],
  authors: [
    {
      name: 'Nick Neely',
    },
  ],
  creator: 'Nick Neely',
  manifest: `${siteConfig.url}/site.webmanifest`,
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>
        <SpeedInsights />
        <Analytics />
        <AxiomWebVitals />
      </body>
    </html>
  )
}
