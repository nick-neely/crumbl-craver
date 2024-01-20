import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(value: string): string {
  value = value.replace(/\D/g, '') // remove non-digit characters

  // limit to 10 digits
  value = value.slice(0, 10)

  if (value.length > 3 && value.length <= 6)
    value = value.slice(0, 3) + '-' + value.slice(3)
  else if (value.length > 6)
    value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6)

  return value
}
