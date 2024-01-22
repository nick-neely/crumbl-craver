import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const CookiesLoading = () => {
  const skeletonCount = 6

  return (
    <Card className="flex w-full max-w-4xl flex-col gap-16 p-8 shadow-inner shadow-slate-300">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle className="text-4xl font-bold">Weekly Menu</CardTitle>
            <CardDescription>1/22/24 - 1/27/24</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator className="m-0 rounded-md bg-slate-500 p-1" />
      <CardContent>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: skeletonCount }, (_, index) => (
            <div key={index} className="animate-pulse rounded shadow-lg">
              <div className="h-64 w-full rounded bg-gray-300" />
              <div className="ml-6 mt-6 h-6 w-3/4 rounded bg-gray-300" />
              <div className="ml-6 mt-2 h-6 w-1/2 rounded bg-gray-300" />
              <div className="mx-auto ml-6 mt-6 h-36 w-48 rounded bg-gray-300" />
              <div className="h-20 w-full rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CookiesLoading
