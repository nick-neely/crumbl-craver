import AuthButton from '../components/AuthButton'
import { Cookie } from '../components/Cookie'
import { cookies } from 'next/headers'

interface CookieType {
    name: string
    description: string
    calories: string
    imageUrl: string
}

async function getCookies() {
    const response = await fetch('http://localhost:3000/api/cookies')

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
}

export default async function Index() {
    const cookieStore = cookies()

    const data = await getCookies()

    return (
        <div className="flex w-full flex-1 flex-col items-center gap-20">
            <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
                <div className="flex w-full max-w-4xl items-center justify-end p-3 text-sm">
                    <AuthButton />
                </div>
            </nav>

            <main className="flex w-full max-w-4xl flex-col gap-16 p-8">
                <h1 className="text-4xl font-bold">Cookies</h1>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {data.map((cookie: CookieType) => (
                        <Cookie
                            name={cookie.name}
                            description={cookie.description}
                            calories={cookie.calories}
                            imageUrl={cookie.imageUrl}
                        />
                    ))}
                </div>
            </main>

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
