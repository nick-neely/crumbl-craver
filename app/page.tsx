import CookieDashboard from '@/components/CookieDashboard'
import Link from 'next/link'

export default async function Index() {
  return (
    <div className="mt-20 flex w-full flex-1 flex-col items-center gap-20">
      <CookieDashboard />

      <footer className="flex w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
        <p>
          Crumbl Craver is not affiliated with
          <Link href="https://crumblcookies.com/" className="font-bold">
            {' '}
            Crumbl Cookies
          </Link>{' '}
          but is a fan-made project to enhance the cookie-tasting experience.
        </p>
      </footer>
    </div>
  )
}
