import Link from 'next/link'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import cookieImage from '../../app/public/home-cookies.png'

export function HeroSection() {
  return (
    <section className="w-full bg-slate-100 py-12 dark:bg-slate-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <Image
            src={cookieImage}
            width={512}
            height={512}
            alt="Delicious Cookies"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
          ></Image>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold tracking-tighter text-blue-950 dark:text-white sm:text-5xl xl:text-6xl/none">
                  Crumbl Craver
                </h1>
                <Badge className="text-sm" variant={'outline'}>
                  Beta
                </Badge>
              </div>
              <p className="max-w-[600px] md:text-xl">
                Explore the world of delicious cookies.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#1890a0ff] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#1890a0]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1890a0] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#1890a0] dark:text-[#ffffff] dark:hover:bg-[#1890a0]/90 dark:focus-visible:ring-[#1890a0] md:w-1/2"
                href="/dashboard"
              >
                View Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
