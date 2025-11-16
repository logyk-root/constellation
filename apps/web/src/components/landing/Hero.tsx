import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <span className="mr-2">🎉</span>
            100% Free - No Hidden Fees
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Lower Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Car Payment
            </span>
            <br />
            in Minutes
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-xl text-gray-600 sm:text-2xl">
            AI-powered auto loan refinancing for Texas drivers.
            <br />
            <span className="font-semibold text-blue-600">
              Save an average of $142/month
            </span>{' '}
            - completely free, no obligation.
          </p>

          {/* Key Benefits */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>No credit impact</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>3-minute application</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>100% free service</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/apply"
              className="w-full rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl sm:w-auto"
            >
              Check My Rate - Free
            </Link>
            <Link
              href="#how-it-works"
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 sm:w-auto"
            >
              How It Works
            </Link>
          </div>

          {/* Trust Line */}
          <p className="mt-6 text-sm text-gray-500">
            ⏱️ Takes 3 minutes • 🔒 Secure & confidential • 📍 Serving Texas
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
        <div className="absolute -right-4 top-20 h-72 w-72 rounded-full bg-purple-100 opacity-50 blur-3xl"></div>
      </div>
    </section>
  )
}
