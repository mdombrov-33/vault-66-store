import { z } from 'zod'

//* This helper function validates image files in zod schemas(image schema).
export function validateImageFile() {
  const maxUploadSize = 1024 * 1024 // 1 MB
  const acceptedFileTypes = ['image/']

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize
    }, 'File size must be less than 1MB')
    .refine((file) => {
      return !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
    }, 'File must be an image')
}
