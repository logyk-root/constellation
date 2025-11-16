'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black">
      {/* Background gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-cyan-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 backdrop-blur-xl">
            <svg
              className="h-12 w-12 text-green-400"
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
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-5xl font-bold text-white">
            Application Submitted!
          </h1>

          {/* Message */}
          <p className="mb-4 text-xl text-white/70">
            We're matching you with the best lenders right now.
          </p>
          <p className="mb-12 text-white/50">
            You'll receive rate offers via email within 24-48 hours.
          </p>

          {/* Next Steps */}
          <div className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-xl">
            <h2 className="mb-6 text-2xl font-bold text-white">
              What happens next?
            </h2>
            <div className="space-y-4">
              <Step
                number="1"
                title="AI Matching"
                description="Our AI is analyzing your profile and matching you with 15+ lenders"
              />
              <Step
                number="2"
                title="Rate Offers"
                description="You'll receive multiple rate offers via email within 24-48 hours"
              />
              <Step
                number="3"
                title="Choose & Save"
                description="Compare offers, choose your best rate, and start saving money"
              />
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-semibold text-black transition-all hover:scale-105"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  )
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-400">
        {number}
      </div>
      <div>
        <div className="font-semibold text-white">{title}</div>
        <div className="text-sm text-white/60">{description}</div>
      </div>
    </div>
  )
}
