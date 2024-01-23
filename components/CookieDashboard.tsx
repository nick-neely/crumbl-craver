'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CookieCard } from '../components/CookieCard'
import { Separator } from '@/components/ui/separator'
import { Button } from './ui/button'
import { RefreshCcw } from 'lucide-react'
import useSWR from 'swr'
import { useState } from 'react'
import CookiesLoading from './CookiesLoading'
import ErrorComponent from './ErrorComponent'

interface CookieType {
  name: string
  description: string
  calories: string
  calories_text: string
  image_url: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CookieDashboard() {
  // API endpoint for fetching cookies
  const { data, error, mutate } = useSWR('/api/getCookies', fetcher)
  const [isRefreshing, setIsRefreshing] = useState(false)

  if (error) return <ErrorComponent error={error} reset={mutate} />
  if (!data) return <CookiesLoading />

  // data should be an array of cookies
  const cookies: CookieType[] = data || []

  const revalidateData = async () => {
    setIsRefreshing(true)
    await mutate() // This will re-fetch the data
    setIsRefreshing(false)
  }

  return (
    <Card className="flex w-full max-w-4xl flex-col gap-16 p-8 shadow-inner shadow-slate-300">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle className="text-4xl font-bold">Weekly Menu</CardTitle>
            <CardDescription>1/22/24 - 1/27/24</CardDescription>
          </div>
          <Button onClick={revalidateData} variant="outline" size="icon">
            <RefreshCcw className={isRefreshing ? 'animate-spin' : ''} />
          </Button>
        </div>
      </CardHeader>
      <Separator className="m-0 rounded-md bg-slate-500 p-1" />
      <CardContent>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {cookies.map((cookie, index) => (
            <CookieCard
              key={index}
              name={cookie.name}
              description={cookie.description}
              caloriesText={cookie.calories_text}
              imageUrl={cookie.image_url}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
