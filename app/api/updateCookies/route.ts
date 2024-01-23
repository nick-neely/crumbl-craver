import type { NextRequest } from 'next/server'
import fetchCrumblCookies from '@/utils/fetchCrumblCookies'
import { supabaseAdmin } from '@/utils/supabase/admin'
import fs from 'fs'
import path from 'path'

const SECRET_KEY = process.env.UPDATE_COOKIES_SECRET_KEY

/**
 * Uploads an image file to Supabase storage.
 *
 * @param filePath - The path of the image file to upload.
 * @returns The name of the uploaded file.
 * @throws Error if there is an error uploading the image to Supabase.
 */
async function uploadImageToSupabase(filePath: string) {
  // Create a readable stream from the file
  const stream = fs.createReadStream(filePath)

  const fileName = path.basename(filePath)

  const { data, error } = await supabaseAdmin.storage
    .from('cookie_images')
    .upload(fileName, stream, {
      contentType: 'image/png', // Adjust as necessary for different image formats
      upsert: true,
      // Specifying the duplex mode as 'half' for the readable stream
      duplex: 'half',
    })

  if (error) {
    throw new Error('Error uploading image to Supabase: ' + error.message)
  }

  return fileName
}

/**
 * Handles the POST request to update the cookies data.
 *
 * @param req - The NextRequest object representing the incoming request.
 * @returns A Response object with the updated cookies data or an error message.
 */
export async function POST(req: NextRequest) {
  if (req.headers.get('Authorization') !== `Bearer ${SECRET_KEY}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    // Fetch all cookie IDs
    const { data: cookies, error: fetchError } = await supabaseAdmin
      .from('cookies')
      .select('id')

    if (fetchError) {
      throw fetchError
    }

    // Update each cookie's is_active flag
    for (const cookie of cookies) {
      const { error: updateError } = await supabaseAdmin
        .from('cookies')
        .update({ is_active: false })
        .match({ id: cookie.id })

      if (updateError) {
        throw updateError
      }
    }

    const crumblCookies = await fetchCrumblCookies()

    for (const cookie of crumblCookies) {
      const { name, imageFilePath, description, calories, caloriesText } =
        cookie

      // Upload image to Supabase storage
      const uploadedImagePath = await uploadImageToSupabase(
        imageFilePath as string
      )

      // Use Supabase URL for image_url in upsert, set is_active to true for new
      const { error } = await supabaseAdmin.from('cookies').upsert(
        [
          {
            name,
            description,
            image_url: `https://tknjbaclwamgdwtkgaez.supabase.co/storage/v1/object/public/cookie_images/${uploadedImagePath}`,
            calories,
            calories_text: caloriesText,
            is_active: true,
          },
        ],
        { onConflict: 'name' }
      )
      if (error) throw error
    }

    return new Response(
      JSON.stringify({ message: 'Cookies updated successfully' }),
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
