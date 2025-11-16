'use client'

import { useState } from 'react'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Is Stellar Loans really 100% free?',
      answer:
        'Yes! We never charge you any fees - no documentation fees, no application fees, nothing. We earn a small commission from lenders when you close a loan, but you pay zero to use our service.',
    },
    {
      question: 'Will checking my rate hurt my credit score?',
      answer:
        'No! We use a "soft pull" credit check that doesn\'t impact your score. Only if you choose to proceed with a lender and they do a full application will there be a hard pull.',
    },
    {
      question: 'How long does the process take?',
      answer:
        'The application takes just 3 minutes. You\'ll see rate matches instantly. Most approvals happen within 24-48 hours, and you can close your loan in as little as 7-10 days.',
    },
    {
      question: 'What credit score do I need?',
      answer:
        'Our lender network works with a wide range of credit scores, from excellent (750+) to fair (580+). Even if you have less-than-perfect credit, you may still qualify for better rates.',
    },
    {
      question: 'Do I need to live in Texas?',
      answer:
        'Currently, yes. Stellar Loans specializes in Texas auto refinancing. We work with Texas-based credit unions, banks, and lenders who know the local market.',
    },
    {
      question: 'What if I\'m upside down on my loan?',
      answer:
        'You can still refinance! Many of our lenders work with borrowers who owe more than their car is worth (negative equity). We\'ll help you find the best option available.',
    },
    {
      question: 'How do you make money if it\'s free?',
      answer:
        'Great question! We earn a referral commission from lenders when you successfully close a loan. This doesn\'t cost you anything - lenders pay us, not you.',
    },
    {
      question: 'Can I refinance a car I just bought?',
      answer:
        'Most lenders require you to wait at least 6-12 months after your original purchase. However, if interest rates have dropped significantly or your credit has improved, it might still be worth checking.',
    },
    {
      question: 'What information do I need to apply?',
      answer:
        'You\'ll need basic info: your vehicle details (year, make, model, mileage), current loan balance, employment information, and income. The whole process takes about 3 minutes.',
    },
    {
      question: 'What happens after I apply?',
      answer:
        'Our AI instantly matches you with lenders. You\'ll see rate offers from multiple lenders. Choose the one you like best, and we\'ll connect you with them to close your loan. You\'re never obligated to proceed.',
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about refinancing with Stellar Loans.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-gray-200"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between bg-white p-6 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-6 w-6 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openIndex === index && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-12 rounded-2xl bg-blue-50 p-8 text-center">
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Still have questions?
            </h3>
            <p className="mb-6 text-gray-600">
              We're here to help! Reach out and we'll get back to you quickly.
            </p>
            <a
              href="mailto:hello@stellarloans.io"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
