import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/utils/supabase/admin'
import axios from 'axios'
import cheerio from 'cheerio'

export async function GET(req: NextRequest) {
  const { data } = await axios.get('https://crumblcookies.com/', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
  })
  const $ = cheerio.load(data)
  const flavors = $('#weekly-cookie-flavors li')
  const crumblCookies = flavors
    .map((_, el: cheerio.Element) => {
      const name = $(el).find('h3').text().trim()
      const description = $(el).find('p').text().trim()
      const imageUrl = $(el).find('img').attr('src')
      const caloriesText = $(el)
        .find('.flex.items-center.justify-start.text-xs.opacity-60')
        .text()
        .trim()
      const match = caloriesText.match(/(\d+)-?(\d+)?\s?cal/) // This regex matches one or two numbers followed by "cal"
      let calories = null

      if (match && match[1]) {
        // If there's a range, take the average
        if (match[2]) {
          const lowEnd = parseInt(match[1], 10)
          const highEnd = parseInt(match[2], 10)
          calories = (lowEnd + highEnd) / 2 // Calculate the average
        } else {
          // If there's only one number, use it as is
          calories = parseInt(match[1], 10)
        }
      }
      return { name, description, imageUrl, calories, caloriesText }
    })
    .get()

  // Upsert cookies into the Cookies table
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

    if (error) {
      console.error('Error upserting cookie:', error)
    }
  }

  // Use NextResponse to create the response
  return NextResponse.json(crumblCookies)
}
