'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Card } from './ui/card'
import Link from 'next/link'

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Card className="p-4 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
      <Link href="/">
        <a className="text-blue-500 hover:underline">Go back to home</a>
      </Link>
    </Card>
  )
}
