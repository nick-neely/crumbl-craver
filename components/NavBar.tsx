'use client'
import { CrumblCraverLogo } from './CrumblCraverLogo'
import AuthButton from './AuthButton'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
      <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">Crumbl Craver</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <CrumblCraverLogo />
          </Link>
        </div>
      </div>

      <div className="flex w-full max-w-4xl items-center justify-end p-3 text-sm">
        <AuthButton />
      </div>
    </nav>
  )
}

export default NavBar
