import { Badge } from '@/components/ui/badge'

interface CookieProps {
  name: string
  description: string
  caloriesText: string
  imageUrl: string
}

export const CookieCard: React.FC<CookieProps> = ({
  name,
  description,
  caloriesText,
  imageUrl,
}) => (
  <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:shadow-slate-700">
    <div className="flex-shrink-0">
      <img
        className="h-80 w-full bg-slate-100 object-cover dark:bg-slate-600 sm:h-64"
        src={imageUrl}
        alt={name}
      />
    </div>
    <div className="flex flex-1 flex-col justify-between bg-white p-6 dark:bg-slate-800">
      <div className="flex-1">
        <p className="text-xl font-semibold text-gray-900 dark:text-gray-300">
          {name}
        </p>
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="mt-6 text-sm font-medium">
        <Badge
          variant={'secondary'}
          className="text-gray-600 dark:text-gray-300"
        >
          {caloriesText}
        </Badge>
      </div>
    </div>
  </div>
)
