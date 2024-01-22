import axios from 'axios'
import cheerio from 'cheerio'

// Utility function to fetch Crumbl cookie flavors and details
async function fetchCrumblCookies() {
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
      const match = caloriesText.match(/(\\d+)-?(\\d+)?\\s?cal/)
      const calories = match ? parseInt(match[1], 10) : undefined
      return { name, description, imageUrl, calories, caloriesText }
    })
    .get()
  return crumblCookies
}

export default fetchCrumblCookies
