import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import Redis from 'ioredis'
import { log } from 'next-axiom'
import { getCurrentWeek } from '../../../lib/utils'

// Initialize Redis client
const redisUrl = process.env.UPSTASH_REDIS_URL

if (!redisUrl) {
  throw new Error(
    'UPSTASH_REDIS_URL is not defined in the environment variables'
  )
}

const redis = new Redis(redisUrl)

/**
 * Fetches data from Supabase.
 * @returns {Promise<any>} The fetched data from Supabase.
 * @throws {Error} If there is an error fetching the data.
 */
async function fetchDataFromSupabase() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('cookies')
    .select('*')
    .eq('is_active', true)

  if (error) {
    log.error(error.toString()) // Log error to Axiom
    throw new Error(`Failed to fetch data: ${error.message}`)
  }

  return data
}

/**
 * Retrieves cookies data from cache or fetches it from Supabase API if not available in cache.
 * Caches the fetched data with an expiration time to ensure the cache is updated after the weekly change.
 * Handles errors appropriately and returns the response or error message.
 *
 * @param req - The request object.
 * @returns A Promise that resolves to a Response object containing the cookies data or error message.
 */
export async function GET(req: Request) {
  const cacheKey = `cookies-week:${getCurrentWeek()}`

  try {
    // Check cache
    const cachedData = await redis.get(cacheKey)
    if (cachedData) {
      return new Response(cachedData, { status: 200 })
    }
  } catch (error) {
    console.error('Redis error:', error)
  }

  try {
    const response = await fetchDataFromSupabase()

    // Cache the fresh data with an expiration time set to ensure the cache is updated after the weekly change
    await redis.set(cacheKey, JSON.stringify(response), 'EX', calculateTTL())

    return new Response(JSON.stringify({ response }), {
      status: 200,
    })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'

    // Handle error appropriately
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    })
  }
}

/**
 * Calculates the time to live (TTL) in seconds until the next update.
 * The TTL is based on the current date and time, and the next update is scheduled for Sunday at 9:59 PM.
 * @returns The TTL in seconds until the next update.
 */
function calculateTTL(): number {
  const now = new Date()
  const nowDayOfWeek = now.getDay() // Sunday - Saturday : 0 - 6
  const nowHour = now.getHours()
  const nowMinutes = now.getMinutes()

  // Assuming the week starts on Sunday, with 0 representing Sunday
  const daysUntilNextUpdate =
    nowDayOfWeek === 0 && nowHour < 21 ? 0 : 7 - nowDayOfWeek

  // If today is Sunday and it's not yet 9:59 PM, calculate the hours and minutes until the update
  let hoursUntilNextUpdate = daysUntilNextUpdate * 24 - nowHour + 21 // Hours until next Sunday at 9 PM
  let minutesUntilNextUpdate = 59 - nowMinutes // Minutes until 59 past the hour

  // If it's past 9:59 PM, add an extra hour as we're calculating for the next minute
  if (nowHour === 21 && nowMinutes >= 59) {
    hoursUntilNextUpdate += 1
    minutesUntilNextUpdate = 60 - nowMinutes // Reset minutes to the next hour
  }

  // Calculate total TTL in seconds
  const ttlInSeconds =
    hoursUntilNextUpdate * 60 * 60 + minutesUntilNextUpdate * 60
  return ttlInSeconds
}
