import type { NextRequest } from 'next/server'
import fetchCrumblCookies from '@/utils/fetchCrumblCookies'
import { supabaseAdmin } from '@/utils/supabase/admin'

const SECRET_KEY = process.env.UPDATE_COOKIES_SECRET_KEY

/**
 * Handles the POST request to update the cookies data.
 *
 * @param req - The NextRequest object representing the incoming request.
 * @returns A Response object with the updated cookies data or an error message.
 */
export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${SECRET_KEY}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  try {
    const crumblCookies = await fetchCrumblCookies()
    for (const cookie of crumblCookies) {
      const { error } = await supabaseAdmin.from('cookies').upsert(
        [
          {
            name: cookie.name,
            description: cookie.description,
            picture_url: cookie.imageUrl,
            calories: cookie.calories,
          },
        ],
        { onConflict: 'name' }
      )
      if (error) throw error
    }
    return new Response(
      JSON.stringify({ message: 'Cookies data successfully updated' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (err) {
    console.error('Error updating cookies data:', err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
