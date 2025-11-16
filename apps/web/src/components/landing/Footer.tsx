export function Footer() {
  return (
    <footer className="relative bg-black py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          {/* Top Section */}
          <div className="mb-12 text-center">
            <h3 className="mb-2 text-2xl font-bold text-white">
              Stellar Loans
            </h3>
            <p className="text-white/50">
              AI-powered auto loan refinancing for Texas
            </p>
          </div>

          {/* Links */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/50">
            <a href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="/contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </div>

          {/* Legal */}
          <div className="border-t border-white/10 pt-8 text-center text-xs text-white/30">
            <p className="mb-4">
              © {new Date().getFullYear()} Stellar Loans. All rights reserved.
            </p>
            <p className="mb-2">
              Stellar Loans is a free service that connects borrowers with
              lenders. We earn a commission from lenders when you close a loan.
            </p>
            <p>
              Rates and terms subject to lender approval. Not all applicants
              will qualify.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
