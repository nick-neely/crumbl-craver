'use server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

async function getUserData() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export default getUserData
