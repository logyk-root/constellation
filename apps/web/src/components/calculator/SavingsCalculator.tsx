'use client'

import { useState } from 'react'

export function SavingsCalculator() {
  const [loanBalance, setLoanBalance] = useState(25000)
  const [currentRate, setCurrentRate] = useState(8.5)
  const [currentPayment, setCurrentPayment] = useState(450)

  // Simple calculation (you'll make this more sophisticated later)
  const estimatedNewRate = Math.max(4.5, currentRate - 2.5)
  const estimatedNewPayment = Math.round(currentPayment * 0.7)
  const monthlySavings = currentPayment - estimatedNewPayment
  const yearlySavings = monthlySavings * 12

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              See Your Potential Savings
            </h2>
            <p className="text-xl text-gray-600">
              Enter your current loan details to estimate how much you could
              save.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Side */}
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Your Current Loan
              </h3>

              {/* Loan Balance */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Current Loan Balance
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={loanBalance}
                    onChange={(e) =>
                      setLoanBalance(Number(e.target.value))
                    }
                    className="w-full rounded-lg border-2 border-gray-200 py-3 pl-8 pr-4 text-lg focus:border-blue-500 focus:outline-none"
                    placeholder="25000"
                  />
                </div>
                <input
                  type="range"
                  min="5000"
                  max="75000"
                  step="1000"
                  value={loanBalance}
                  onChange={(e) => setLoanBalance(Number(e.target.value))}
                  className="mt-3 w-full"
                />
              </div>

              {/* Current Interest Rate */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Current Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(Number(e.target.value))}
                    className="w-full rounded-lg border-2 border-gray-200 py-3 pl-4 pr-10 text-lg focus:border-blue-500 focus:outline-none"
                    placeholder="8.5"
                    step="0.1"
                  />
                  <span className="absolute right-4 top-3 text-gray-500">
                    %
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="25"
                  step="0.5"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(Number(e.target.value))}
                  className="mt-3 w-full"
                />
              </div>

              {/* Current Monthly Payment */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Current Monthly Payment
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={currentPayment}
                    onChange={(e) =>
                      setCurrentPayment(Number(e.target.value))
                    }
                    className="w-full rounded-lg border-2 border-gray-200 py-3 pl-8 pr-4 text-lg focus:border-blue-500 focus:outline-none"
                    placeholder="450"
                  />
                </div>
              </div>
            </div>

            {/* Results Side */}
            <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 p-8 text-white shadow-xl">
              <h3 className="mb-6 text-2xl font-bold">Your Estimated Savings</h3>

              <div className="mb-8 space-y-6">
                <div className="border-b border-blue-400 pb-4">
                  <div className="text-sm text-blue-100">Estimated New Rate</div>
                  <div className="text-4xl font-bold">
                    {estimatedNewRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-100">
                    vs. {currentRate}% current
                  </div>
                </div>

                <div className="border-b border-blue-400 pb-4">
                  <div className="text-sm text-blue-100">
                    Estimated New Payment
                  </div>
                  <div className="text-4xl font-bold">
                    ${estimatedNewPayment}/mo
                  </div>
                  <div className="text-sm text-blue-100">
                    vs. ${currentPayment}/mo current
                  </div>
                </div>

                <div className="rounded-lg bg-white bg-opacity-20 p-4">
                  <div className="mb-2 text-sm text-blue-100">
                    You Could Save
                  </div>
                  <div className="text-5xl font-bold">
                    ${monthlySavings}
                  </div>
                  <div className="text-xl text-blue-100">per month</div>
                  <div className="mt-2 text-sm text-blue-100">
                    ${yearlySavings.toLocaleString()} per year
                  </div>
                </div>
              </div>

              <a
                href="/apply"
                className="block rounded-lg bg-white py-4 text-center text-lg font-bold text-blue-600 shadow-lg transition-all hover:bg-gray-50"
              >
                Check My Actual Rate - Free
              </a>

              <p className="mt-4 text-center text-sm text-blue-100">
                💡 This is an estimate. Your actual rate may vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
