import { ApplicationForm } from '@/components/apply/ApplicationForm'

export const metadata = {
  title: 'Apply for Refinancing | Stellar Loans',
  description: 'Apply for auto loan refinancing in 3 minutes. No credit impact, 100% free.',
}

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-black">
      <ApplicationForm />
    </main>
  )
}
