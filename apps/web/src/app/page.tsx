import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { SavingsCalculator } from '@/components/calculator/SavingsCalculator'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SavingsCalculator />
      <Footer />
    </>
  )
}
