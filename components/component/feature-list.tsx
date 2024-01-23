export function FeatureList() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <CheckIcon className="h-12 w-12 mb-4 text-gray-900 dark:text-gray-100" />
          <h2 className="text-2xl font-bold mb-2">Feature One</h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is a brief description of the first feature. It explains how this feature benefits the user.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <CheckIcon className="h-12 w-12 mb-4 text-gray-900 dark:text-gray-100" />
          <h2 className="text-2xl font-bold mb-2">Feature Two</h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is a brief description of the second feature. It explains how this feature benefits the user.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <CheckIcon className="h-12 w-12 mb-4 text-gray-900 dark:text-gray-100" />
          <h2 className="text-2xl font-bold mb-2">Feature Three</h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is a brief description of the third feature. It explains how this feature benefits the user.
          </p>
        </div>
      </div>
    </div>
  )
}


function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
