import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
export async function GET(req: Request) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('cookies')
      .select('*')
      .eq('is_active', true)
    if (error) {
      // Handle error as needed here
      return error
    }
    return data
  }
  const response = await fetchData()
  return new Response(JSON.stringify({ response }), {
    status: 200,
  })
}
