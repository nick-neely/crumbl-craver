import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CookieCard } from '../components/CookieCard'
import { Separator } from '@/components/ui/separator'
import getCookies from './actions/cookies'

interface CookieType {
  name: string
  description: string
  calories: string
  image_url: string
}

export default async function Index() {
  const data = await getCookies()

  return (
    <div className="mt-20 flex w-full flex-1 flex-col items-center gap-20">
      <Card className="flex w-full max-w-4xl flex-col gap-16 p-8 shadow-inner shadow-slate-300">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Weekly Menu</CardTitle>
          <CardDescription>1/15/24 - 1/20/24</CardDescription>
        </CardHeader>
        <Separator className="m-0 rounded-md bg-slate-500 p-1" />
        <CardContent>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {data &&
              data.map((cookie: CookieType, index: number) => (
                <CookieCard
                  key={index}
                  name={cookie.name}
                  description={cookie.description}
                  calories={cookie.calories}
                  imageUrl={cookie.image_url}
                />
              ))}
          </div>
        </CardContent>
      </Card>

      <footer className="flex w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
        <p>
          Crumbl Craver is not affiliated with Crumbl Cookies but is a fan-made
          project to enhance the cookie-tasting experience.
        </p>
      </footer>
    </div>
  )
}
