'use client'

import { motion } from 'framer-motion'

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Apply',
      description: '3 minutes. No credit impact.',
    },
    {
      number: '02',
      title: 'Get Matched',
      description: '15+ lenders compete for you.',
    },
    {
      number: '03',
      title: 'Save Money',
      description: 'Choose your best rate. Free.',
    },
  ]

  return (
    <section id="how-it-works" className="relative bg-black py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-5xl font-bold text-white sm:text-6xl"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/50"
          >
            Three simple steps to lower your payment
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
            >
              {/* Step Number */}
              <div className="mb-6 text-6xl font-bold text-white/10">
                {step.number}
              </div>

              {/* Content */}
              <h3 className="mb-3 text-2xl font-bold text-white">
                {step.title}
              </h3>
              <p className="text-white/60">{step.description}</p>

              {/* Hover gradient effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="/apply"
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-semibold text-black transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
          >
            Get Started
            <svg
              className="h-5 w-5"
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
          </a>
        </motion.div>
      </div>
    </section>
  )
}
