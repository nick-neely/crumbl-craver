'use client'
import { CrumblCraverLogo } from './CrumblCraverLogo'
import AuthButton from './AuthButton'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const NavBar = () => {
  return (
    <nav className="bg flex h-16 w-full justify-center border-b border-b-foreground/10 dark:bg-gray-900">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <div className="flex items-center gap-4">
          <span className="hidden text-3xl font-bold md:block">
            Crumbl Craver
          </span>
          <Link href="/">
            {/* Replace Company Name with Logo when on smaller screens */}
            <CrumblCraverLogo className="block md:hidden" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <CrumblCraverLogo className="hidden md:block" />
          </Link>
        </div>
      </div>

      <div className="flex w-full max-w-4xl items-center justify-end gap-5 p-3 text-sm">
        <ThemeToggle />
        <AuthButton />
      </div>
    </nav>
  )
}

export default NavBar
