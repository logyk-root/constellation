export function TrustSignals() {
  return (
    <section className="border-y border-gray-200 bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Stat 1 */}
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-blue-600">
              $142
            </div>
            <div className="text-sm text-gray-600">Avg. Monthly Savings</div>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-blue-600">3 min</div>
            <div className="text-sm text-gray-600">Application Time</div>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-blue-600">15+</div>
            <div className="text-sm text-gray-600">Texas Lenders</div>
          </div>

          {/* Stat 4 */}
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-blue-600">
              100%
            </div>
            <div className="text-sm text-gray-600">Free Service</div>
          </div>
        </div>
      </div>
    </section>
  )
}
