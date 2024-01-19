import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'

export default async function AuthButton() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/')
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.displayName || user.email}!
      <form action={signOut}>
        <Button variant={'secondary'}>Log out</Button>
      </form>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link href="/login" className={buttonVariants()}>
        Log In
      </Link>
      <Link href="/signup" className={buttonVariants()}>
        Sign Up
      </Link>
    </div>
  )
}
