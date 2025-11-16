'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function SavingsCalculator() {
  const [currentRate, setCurrentRate] = useState(8.5)
  const [currentPayment, setCurrentPayment] = useState(450)

  const estimatedNewRate = Math.max(4.5, currentRate - 2.5)
  const estimatedNewPayment = Math.round(currentPayment * 0.7)
  const monthlySavings = currentPayment - estimatedNewPayment

  return (
    <section className="relative bg-black py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-5xl font-bold text-white sm:text-6xl"
          >
            Calculate Your Savings
          </motion.h2>
        </div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl"
        >
          {/* Inputs */}
          <div className="mb-12 space-y-8">
            {/* Current Rate */}
            <div>
              <label className="mb-3 block text-sm font-medium text-white/60">
                Current Interest Rate
              </label>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold text-white">
                  {currentRate.toFixed(1)}
                </span>
                <span className="text-2xl text-white/40">%</span>
              </div>
              <input
                type="range"
                min="3"
                max="25"
                step="0.5"
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="mt-6 w-full accent-blue-500"
              />
            </div>

            {/* Current Payment */}
            <div>
              <label className="mb-3 block text-sm font-medium text-white/60">
                Current Monthly Payment
              </label>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl text-white/40">$</span>
                <span className="text-6xl font-bold text-white">
                  {currentPayment}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="1500"
                step="50"
                value={currentPayment}
                onChange={(e) => setCurrentPayment(Number(e.target.value))}
                className="mt-6 w-full accent-blue-500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="mb-2 text-sm text-white/50">
              Estimated Monthly Savings
            </div>
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-2xl text-white/40">$</span>
              <span className="text-7xl font-bold text-white">
                {monthlySavings}
              </span>
            </div>
            <div className="mb-8 flex items-center justify-between text-sm">
              <div>
                <div className="text-white/40">New Rate</div>
                <div className="text-xl font-bold text-white">
                  {estimatedNewRate.toFixed(1)}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/40">New Payment</div>
                <div className="text-xl font-bold text-white">
                  ${estimatedNewPayment}/mo
                </div>
              </div>
            </div>

            <a
              href="/apply"
              className="block rounded-full bg-white px-8 py-5 text-center text-lg font-semibold text-black transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              Check My Actual Rate
            </a>
          </div>

          <p className="mt-6 text-center text-sm text-white/40">
            Estimates based on average savings. Actual rates may vary.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
