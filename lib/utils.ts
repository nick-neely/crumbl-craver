import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a phone number by removing non-digit characters and adding dashes.
 * @param value - The phone number to format.
 * @returns The formatted phone number.
 */
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

export function getCurrentWeek() {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const startDay = startOfYear.getDay() || 7 // Get the day of the week with Monday as 1 and Sunday as 7
  if (startDay !== 1) {
    startOfYear.setHours(-24 * (startDay - 1)) // Adjust to the previous Monday if Jan 1st isn't a Monday
  }
  const currentWeek = Math.ceil(
    ((now.valueOf() - startOfYear.valueOf()) / (24 * 3600 * 1000) + 1) / 7
  )
  const year = now.getFullYear()
  return `cookies-week:${year}-W${currentWeek}`
}
