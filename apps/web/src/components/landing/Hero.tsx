'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=3432&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        {/* Gradient overlay for blending effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-cyan-600/20 blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge with glassmorphism */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-medium text-white/90">
              100% Free • No Hidden Fees
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-6xl font-bold leading-tight tracking-tight text-white sm:text-7xl lg:text-8xl">
            Lower Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Car Payment
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mb-12 text-xl leading-relaxed text-white/70 sm:text-2xl">
            AI-powered refinancing. Save $142/month on average.
            <br />
            <span className="text-white/90">3 minutes. Zero cost.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/apply"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-semibold text-black transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            >
              Check My Rate
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/#how-it-works"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-5 text-lg font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10"
            >
              How It Works
            </Link>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/50"
          >
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>No credit impact</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>15+ lenders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span>Texas-focused</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade - creates the blend effect as you scroll */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </section>
  )
}
