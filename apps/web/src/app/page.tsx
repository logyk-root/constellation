export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-24">
      <div className="max-w-5xl text-center">
        <h1 className="mb-6 text-6xl font-bold tracking-tight text-gray-900">
          Stellar Loans
        </h1>
        <p className="mb-4 text-2xl font-light text-gray-600">
          AI-Powered Auto Loan Refinancing
        </p>
        <p className="mb-8 text-xl text-gray-500">
          Transparent pricing. No hidden fees. Serving Texas.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700">
            Get Started
          </button>
          <button className="rounded-lg border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50">
            Learn More
          </button>
        </div>
        <p className="mt-12 text-sm text-gray-400">
          🚧 Coming Soon - Platform in Development
        </p>
        <p className="mt-4 text-xs text-gray-300">
          stellarloans.io | stellarloans.net
        </p>
      </div>
    </main>
  )
}
