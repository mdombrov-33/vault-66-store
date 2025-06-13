import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

//* Utility function to merge class names
//* Useful for conditional class names in components
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
