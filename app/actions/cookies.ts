'use server'
import getCurrentCookies from '@/utils/getCurrentCookies'

export default async function getCookies() {
  try {
    const cookies = await getCurrentCookies()
    return cookies
  } catch (error) {
    console.error('Failed to fetch cookies:', error)
    throw error
  }
}
