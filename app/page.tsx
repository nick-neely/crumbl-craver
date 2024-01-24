import FaqSection from '@/components/FaqSection'
import { FeatureList } from '@/components/component/feature-list'
import { HeroSection } from '@/components/component/hero-section'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import Link from 'next/link'

export default async function Index() {
  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center gap-14">
        <HeroSection />
        <FeatureList />
        <Card className="mx-4 mt-0 rounded-lg p-6 text-center shadow-lg dark:border-slate-600 dark:bg-slate-800 md:mt-12">
          <CardHeader className="mb-6 text-3xl font-bold">
            Ready to get started?
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#1890a0ff] px-8 font-bold text-white shadow transition-colors hover:bg-[#1890a0]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1890a0] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#1890a0] dark:text-[#ffffff] dark:hover:bg-[#1890a0]/90 dark:focus-visible:ring-[#1890a0]"
                href="/signup"
              >
                Sign Up
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#FFC83B] px-8 font-bold text-white shadow transition-colors hover:bg-[#FFC83B]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFC83B] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#FFC83B] dark:text-[#ffffff] dark:hover:bg-[#FFC83B]/90 dark:focus-visible:ring-[#FFC83B]"
                href="/login"
              >
                Log In
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="flex w-full justify-center rounded-xl bg-slate-300 shadow-inner shadow-slate-500 dark:bg-slate-800">
          <FaqSection />
        </div>

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
