export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Apply in 3 Minutes',
      description:
        'Fill out our quick online form. No credit impact, no obligation. Our AI analyzes your situation instantly.',
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      number: '2',
      title: 'Get Matched to Lenders',
      description:
        'Our AI shops your application to 15+ Texas lenders. See multiple rate offers from top lenders - all in one place.',
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      number: '3',
      title: 'Choose Your Best Rate',
      description:
        'Compare offers and choose the one that saves you the most. Close your loan with the lender - completely free!',
      icon: (
        <svg
          className="h-8 w-8"
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
      ),
    },
  ]

  return (
    <section id="how-it-works" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Get matched to the best auto loan rates in Texas - fast, free, and
            easy.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              {/* Step Number Badge */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-4 text-blue-600">{step.icon}</div>

              {/* Content */}
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>

              {/* Connector Line (except last item) */}
              {step.number !== '3' && (
                <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-blue-200 md:block"></div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/apply"
            className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
          >
            Start Saving Money Today
          </a>
        </div>
      </div>
    </section>
  )
}
