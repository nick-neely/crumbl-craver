'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**
 * Signs out the user by calling the signOut method of the Supabase authentication client.
 */
async function signOut() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  await supabase.auth.signOut()
}

export default signOut
