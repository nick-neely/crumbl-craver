import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthButton from '../components/AuthButton'
import { CookieCard } from '../components/CookieCard'
import { Separator } from '@/components/ui/separator'
import fetchCrumblCookies from '@/utils/fetchCrumblCookies'

interface CookieType {
  name: string
  description: string
  caloriesText: string
  imageUrl: string
}

export default async function Index() {
  const data = await fetchCrumblCookies()

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-end p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <Card className="flex w-full max-w-4xl flex-col gap-16 p-8 shadow-inner shadow-slate-300">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Weekly Menu</CardTitle>
          <CardDescription>1/15/24 - 1/20/24</CardDescription>
        </CardHeader>
        <Separator className="m-0 rounded-md bg-slate-500 p-1" />
        <CardContent>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {data.map((cookie: CookieType) => (
              <CookieCard
                name={cookie.name}
                description={cookie.description}
                caloriesText={cookie.caloriesText}
                imageUrl={cookie.imageUrl}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <footer className="flex w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
        <p>
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  )
}
