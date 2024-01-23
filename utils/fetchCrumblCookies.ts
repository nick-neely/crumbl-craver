import axios from 'axios'
import cheerio from 'cheerio'
import https from 'https'
import fs from 'fs'
import path from 'path'
import { log } from 'next-axiom'

// Utility function to fetch Crumbl cookie flavors and details
async function fetchCrumblCookies() {
  const { data } = await axios.get('https://crumblcookies.com/', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
  })
  const $ = cheerio.load(data)
  const flavors = $('#weekly-cookie-flavors li').toArray()

  const crumblCookies = []

  for (const flavor of flavors) {
    // Extract cookie details
    const name = $(flavor).find('h3').text().trim()
    const description = $(flavor).find('p').text().trim()
    const imageUrl = $(flavor).find('img').attr('src')
    const caloriesText = $(flavor)
      .find('.flex.items-center.justify-start.text-xs.opacity-60')
      .text()
      .trim()
    // Regular expression to match a range or a single value
    const match = caloriesText.match(/(\d+)-?(\d+)?\s?cal/)
    const calories = match ? parseInt(match[1], 10) : undefined

    if (imageUrl) {
      // Download image and get local path
      const imageFilePath = await downloadImage(imageUrl, name)

      crumblCookies.push({
        name,
        description,
        imageUrl,
        calories,
        caloriesText,
        imageFilePath,
      })
    }
  }

  return crumblCookies
}

/**
 * Sanitizes a file name by replacing any non-alphanumeric characters with underscores and converting it to lowercase.
 * @param name - The file name to sanitize.
 * @returns The sanitized file name.
 */
function sanitizeFileName(name: string) {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase()
}

/**
 * Downloads an image from the specified URL and saves it to a file.
 * @param url - The URL of the image to download.
 * @param cookieName - The name of the cookie associated with the image.
 * @returns A promise that resolves to the file path of the downloaded image.
 */
async function downloadImage(url: string, cookieName: string) {
  const extension = path.extname(url) // Extracting the file extension from the URL
  const timestamp = new Date().getTime() // Generating a timestamp
  // timestamp not used currently, but could be used to prevent duplicate file names
  const sanitizedFileName = `${sanitizeFileName(cookieName)}${extension}` // Creating a unique file name

  // Determine the directory path based on the environment
  const isVercel = process.env.VERCEL // Check if running on Vercel
  const baseDir = isVercel ? '/tmp' : 'C:/tmp' // Use '/tmp' on Vercel and 'C:/tmp' locally
  const dirPath = path.join(baseDir, 'images')

  // Check if the directory exists, if not, create it
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  const filePath = path.join(dirPath, sanitizedFileName)

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        // Handle non-successful responses
        if (response.statusCode !== 200) {
          reject(new Error('Failed to download image: ' + response.statusCode))
          return
        }

        // Pipe the image data to a file
        const stream = fs.createWriteStream(filePath)
        response.pipe(stream)
        stream.on('finish', () => {
          stream.close()
          resolve(filePath)
        })
      })
      .on('error', (e) => {
        console.error('Error downloading image:', e)
        log.error('Error downloading image', {
          code: '500',
          message: e.toString(),
        }) // Log error to Axiom
        reject(e)
      })
  })
}

export default fetchCrumblCookies
