'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import signOut from '@/app/actions/signOut'
import getUserData from '@/app/actions/getUserData'
import { Loader2 } from 'lucide-react'

// Define the User interface
interface User {
  email?: string
  user_metadata: {
    displayName?: string
  }
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserData()
      setUser(user)
    }

    fetchUserData()
  }, [])

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut()
    setUser(null)
    setIsLoading(false)
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          Hey, {user.user_metadata.displayName || user.email || 'Guest'}
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={handleSignOut}> Log Out </Button>
          )}
        </>
      ) : (
        <>
          <Link href="/login" className={buttonVariants()}>
            Log In
          </Link>
          <Link href="/signup" className={buttonVariants()}>
            Sign Up
          </Link>
        </>
      )}
    </div>
  )
}
