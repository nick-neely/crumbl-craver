'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

async function signOut() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  await supabase.auth.signOut()
}

export default signOut
