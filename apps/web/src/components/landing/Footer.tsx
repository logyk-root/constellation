import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">
              Stellar Loans
            </h3>
            <p className="mb-4 text-sm">
              AI-powered auto loan refinancing for Texas drivers. Save money
              with transparent, free service.
            </p>
            <p className="text-sm text-gray-400">
              📍 Proudly serving Texas
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/apply"
                  className="transition-colors hover:text-blue-400"
                >
                  Apply Now
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="transition-colors hover:text-blue-400"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-blue-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-blue-400"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/resources/calculator"
                  className="transition-colors hover:text-blue-400"
                >
                  Savings Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/faqs"
                  className="transition-colors hover:text-blue-400"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/guides"
                  className="transition-colors hover:text-blue-400"
                >
                  Refinancing Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/lenders"
                  className="transition-colors hover:text-blue-400"
                >
                  Our Lenders
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-blue-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclosures"
                  className="transition-colors hover:text-blue-400"
                >
                  Disclosures
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-blue-400"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <div>
              © {new Date().getFullYear()} Stellar Loans. All rights reserved.
            </div>
            <div className="flex gap-6">
              {/* Social Links - Add when ready */}
              {/* <a href="#" className="hover:text-blue-400">Twitter</a>
              <a href="#" className="hover:text-blue-400">Facebook</a>
              <a href="#" className="hover:text-blue-400">LinkedIn</a> */}
            </div>
          </div>

          {/* Disclaimers */}
          <div className="mt-6 text-xs text-gray-500">
            <p className="mb-2">
              * Savings are based on average results and may vary. Your actual
              savings depend on your credit profile, vehicle, and lender
              approval.
            </p>
            <p className="mb-2">
              Stellar Loans is a free service that connects borrowers with
              lenders. We earn a commission from lenders when you close a loan.
              This does not increase your costs.
            </p>
            <p>
              By submitting an application, you authorize lenders to perform
              credit checks. Rates and terms are subject to lender approval.
              Not all applicants will qualify.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
