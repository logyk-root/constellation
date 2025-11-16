export function WhyStellarLoans() {
  const benefits = [
    {
      title: '100% Free Service',
      description:
        'Unlike other companies, we never charge you a fee. No documentation fees, no application fees, no hidden costs. Ever.',
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'AI-Powered Matching',
      description:
        'Our smart algorithm matches you to the best lenders based on your profile. No pushy salespeople, no commission-based loan officers.',
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: 'Multiple Lender Options',
      description:
        'We work with 15+ Texas lenders including credit unions, banks, and online lenders. More options means better rates for you.',
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: 'No Credit Impact',
      description:
        'We use a soft credit pull to get your rates - it won\'t affect your credit score. Only proceed with a lender if you want to.',
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: 'Texas-Focused',
      description:
        'We specialize in Texas auto loans. Our lenders know Texas DMV processes, local credit unions, and state-specific requirements.',
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Fast & Easy Process',
      description:
        '3-minute application, instant AI matching, and most approvals within 24-48 hours. Close your loan in as little as 7 days.',
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Why Choose Stellar Loans?
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            We're different from traditional auto loan companies. Here's how:
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-lg border border-gray-200 p-6 transition-all hover:border-blue-300 hover:shadow-lg"
            >
              <div className="mb-4 text-blue-600">{benefit.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Emphasis Box */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-center text-white shadow-xl">
          <h3 className="mb-4 text-3xl font-bold">
            Our Promise: Always 100% Free
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-blue-50">
            We earn a small commission from lenders when you close a loan - but
            you never pay us a penny. No documentation fees, no application
            fees, no surprises. Just savings.
          </p>
          <a
            href="/apply"
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-gray-50"
          >
            Get Started - Free
          </a>
        </div>
      </div>
    </section>
  )
}
