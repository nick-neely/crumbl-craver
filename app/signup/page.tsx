import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { PhoneNumberInput } from '../../components/PhoneNumberInput'

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const displayName = formData.get('displayName') as string
    const phone = formData.get('phone') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
          data: { displayName, phone: phone },
        },
      })

      if (data && data.user) {
        return redirect('/?message=Sign up successful')
      } else if (error) {
        console.error('Signup error:', error)

        return redirect('/signup?message=Could not complete sign up')
      }
    } catch (error) {
      if (
        (error as any).name === 'AuthApiError' &&
        (error as any).status === 400
      ) {
        // Handle the invalid refresh token error
        console.error('Invalid refresh token:', error)
        return redirect('/login?message=Session expired. Please log in again.')
      } else {
        // Handle other errors
        console.error('An error occurred:', error)
      }
    }
    return redirect('/signup?message=Check email to continue sign in process')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <form
        className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in"
        action={signUp}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>

        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />

        <label className="text-md" htmlFor="displayName">
          Display Name
        </label>

        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="displayName"
          placeholder="Your Display Name"
          required
        />

        <label className="text-md" htmlFor="phone">
          Phone Number
        </label>

        <PhoneNumberInput />

        <label className="text-md" htmlFor="password">
          Password
        </label>

        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <button className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground">
          Sign Up
        </button>

        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}

        <Link href="/login" className="text-center text-sm text-foreground/60">
          Already have an account? Log in
        </Link>
      </form>
    </div>
  )
}
