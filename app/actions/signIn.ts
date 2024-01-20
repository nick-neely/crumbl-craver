'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

interface SignInData {
  email: string
  password: string
}

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
