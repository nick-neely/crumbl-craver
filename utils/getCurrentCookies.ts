import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function getCurrentCookies() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    let { data: cookies, error } = await supabase
      .from('cookies')
      .select('*')
      .eq('is_active', true)

    if (error) throw error

    console.log('cookies', cookies)
    return cookies
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}
