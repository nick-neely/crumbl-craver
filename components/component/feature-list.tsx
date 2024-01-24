import { Cookie, GanttChart, MessageSquareHeart } from 'lucide-react'

export function FeatureList() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative flex flex-col items-center text-center">
          <span className="absolute right-0 top-0 rounded-bl-lg bg-yellow-500 px-2 py-1 text-xs font-bold text-white">
            In Development
          </span>
          <MessageSquareHeart className="mb-4 h-12 w-12 text-gray-900 dark:text-gray-100" />
          <h2 className="mb-2 text-2xl font-bold">Favorite Flavor Alerts</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Never experience FOMO over your cherished flavors again! Our alert
            system notifies you the moment your all-time favorites make a
            comeback, ensuring you can indulge in what you love most.
          </p>
        </div>
        <div className="relative flex flex-col items-center text-center">
          <span className="absolute right-0 top-0 rounded-bl-lg bg-yellow-500 px-2 py-1 text-xs font-bold text-white">
            In Development
          </span>
          <Cookie className="mb-4 h-12 w-12 text-gray-900 dark:text-gray-100" />
          <h2 className="mb-2 text-2xl font-bold">
            Curate Your Cookie Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            With our intuitive like and favorite system, tailor your Crumbl
            journey to your tastes. Keep tabs on your top picks for a customized
            cookie dashboard that’s all you.
          </p>
        </div>
        <div className="relative flex flex-col items-center text-center">
          <span className="absolute right-0 top-0 rounded-bl-lg bg-yellow-500 px-2 py-1 text-xs font-bold text-white">
            In Development
          </span>
          <GanttChart className="mb-4 h-12 w-12 text-gray-900 dark:text-gray-100" />
          <h2 className="mb-2 text-2xl font-bold">
            Interactive Flavor Reviews
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Share your taste test verdicts with our community. Rate and review
            each flavor you try to help fellow cookie enthusiasts find their
            perfect match, and see which flavors are trending in the Crumbl
            world.
          </p>
        </div>
      </div>
    </div>
  )
}
