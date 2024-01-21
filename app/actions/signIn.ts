'use server'

import { useAuthStore } from '../state/authStore'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface SignInData {
  email: string
  password: string
}

/**
 * Signs in a user with the provided email and password.
 * @param {SignInData} signInData - The email and password for signing in.
 * @returns {Promise<void>} - A promise that resolves when the user is signed in successfully.
 */
export default async function signIn({ email, password }: SignInData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }
  return redirect('/')
}
