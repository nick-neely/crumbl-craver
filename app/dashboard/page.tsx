import CookieDashboard from '@/components/CookieDashboard'
import NavBar from '@/components/NavBar'
import Link from 'next/link'

export default async function Dashboard() {
  return (
    <>
      <NavBar />
      <div className="mt-20 flex w-full flex-1 flex-col items-center gap-20">
        <CookieDashboard />

        <footer className="flex w-full justify-center border-t border-t-foreground/5 bg-gradient-to-t from-slate-300 to-slate-100 p-8 text-center text-xs dark:bg-gradient-to-t dark:from-slate-800 dark:to-slate-600">
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
    </>
  )
}
