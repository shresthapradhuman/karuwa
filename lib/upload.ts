import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadImage(
  image: string,
  foldername: string
): Promise<{ public_id: string; url: string }> {
  const result = await cloudinary.uploader.upload(image, {
    folder: foldername
  })
  return { public_id: result.public_id, url: result.secure_url }
}

export async function deleteImage(url: string, foldername: string) {
  const startIndex = url.lastIndexOf('/') + 1
  const endIndex = url.lastIndexOf('.')
  const public_id = url.substring(startIndex, endIndex)
  return await cloudinary.uploader.destroy(`${foldername}/${public_id}`)
}
