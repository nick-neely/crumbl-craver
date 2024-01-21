'use server'

import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

interface SignUpData {
  email: string
  password: string
  displayName: string
  phone: string
}

/**
 * Signs up a user with the provided data.
 * @param {SignUpData} data - The sign up data including email, password, displayName, and phone.
 * @returns {Promise<void>} - A promise that resolves when the sign up process is complete.
 */
export default async function signUp({
  email,
  password,
  displayName,
  phone,
}: SignUpData) {
  const origin = headers().get('origin')
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
      console.error('Invalid refresh token:', error)
      return redirect('/login?message=Session expired. Please log in again.')
    } else {
      console.error('An error occurred:', error)
    }
  }
  return redirect('/signup?message=Check email to continue sign in process')
}
