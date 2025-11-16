import { Hero } from '@/components/landing/Hero'
import { TrustSignals } from '@/components/landing/TrustSignals'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { WhyStellarLoans } from '@/components/landing/WhyStellarLoans'
import { SavingsCalculator } from '@/components/calculator/SavingsCalculator'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <HowItWorks />
      <WhyStellarLoans />
      <SavingsCalculator />
      <FAQ />
      <Footer />
    </>
  )
}
