import { z } from 'zod'

export function validateImageFile() {
  const maxUploadSize = 1024 * 1024 // 1MB
  const acceptedFileTypes = ['image/']

  return z
    .any()
    .refine(
      (file) =>
        file &&
        typeof file === 'object' &&
        'size' in file &&
        typeof file.size === 'number' &&
        file.size <= maxUploadSize,
      'File size must be less than 1MB'
    )
    .refine(
      (file) =>
        file &&
        typeof file === 'object' &&
        'type' in file &&
        typeof file.type === 'string' &&
        acceptedFileTypes.some((type) => file.type.startsWith(type)),
      'File must be an image'
    )
}
