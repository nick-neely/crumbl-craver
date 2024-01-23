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

/**
 * Returns the current week number of the year.
 * @returns {number} The current week number.
 */
export function getCurrentWeek() {
  const now = new Date() // get current date
  const start = new Date(now.getFullYear(), 0, 1) // First day of year
  const diff = now.getTime() - start.getTime() // difference in milliseconds
  const oneDay = 1000 * 60 * 60 * 24 // milliseconds in a day
  const day = Math.floor(diff / oneDay) // get number of days since year started
  return Math.ceil(day / 7) // get number of weeks since year started
}
