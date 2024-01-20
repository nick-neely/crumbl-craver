import { supabaseAdmin } from '@/utils/supabase/admin'
import axios from 'axios'
import cheerio from 'cheerio'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const SECRET_KEY = process.env.SCRAPING_SECRET_KEY

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check for secret key in the request headers
  if (req.headers['authorization'] !== `Bearer ${SECRET_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Proceed only if the request is a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
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
        const match = caloriesText.match(/(\d+)-?(\d+)?\s?cal/)
        let calories = null
        if (match && match[1]) {
          calories = match[2]
            ? (parseInt(match[1], 10) + parseInt(match[2], 10)) / 2
            : parseInt(match[1], 10)
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
      if (error) throw error
    }

    return res
      .status(200)
      .json({ message: 'Cookies updated successfully', cookies: crumblCookies })
  } catch (error) {
    console.error('Error scraping cookies:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
