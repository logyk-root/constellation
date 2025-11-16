'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Form schema
const formSchema = z.object({
  // Vehicle Information
  vehicleYear: z.string().min(4, 'Required'),
  vehicleMake: z.string().min(1, 'Required'),
  vehicleModel: z.string().min(1, 'Required'),
  vehicleMileage: z.string().min(1, 'Required'),

  // Current Loan
  currentLender: z.string().min(1, 'Required'),
  loanBalance: z.string().min(1, 'Required'),
  interestRate: z.string().min(1, 'Required'),
  monthlyPayment: z.string().min(1, 'Required'),

  // Personal Information
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone'),

  // Address
  street: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  state: z.string().min(2, 'Required'),
  zipCode: z.string().min(5, 'Required'),

  // Employment
  employmentStatus: z.string().min(1, 'Required'),
  employer: z.string().optional(),
  annualIncome: z.string().min(1, 'Required'),

  // Credit
  creditScore: z.string().min(1, 'Required'),
})

type FormData = z.infer<typeof formSchema>

const steps = [
  { id: 1, title: 'Vehicle', fields: ['vehicleYear', 'vehicleMake', 'vehicleModel', 'vehicleMileage'] },
  { id: 2, title: 'Current Loan', fields: ['currentLender', 'loanBalance', 'interestRate', 'monthlyPayment'] },
  { id: 3, title: 'Personal Info', fields: ['firstName', 'lastName', 'email', 'phone'] },
  { id: 4, title: 'Address', fields: ['street', 'city', 'state', 'zipCode'] },
  { id: 5, title: 'Employment', fields: ['employmentStatus', 'employer', 'annualIncome'] },
  { id: 6, title: 'Credit', fields: ['creditScore'] },
]

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const next = async () => {
    const fields = steps[currentStep].fields as Array<keyof FormData>
    const isValid = await trigger(fields)

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previous = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // TODO: Send to API
    console.log('Form data:', data)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Redirect to success page
    window.location.href = '/apply/success'
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="relative min-h-screen py-20">
      {/* Background gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-cyan-600/20 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-2xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            Apply for Refinancing
          </h1>
          <p className="text-xl text-white/60">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="mt-4 flex justify-between text-xs text-white/40">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={index <= currentStep ? 'text-white/80' : ''}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 1: Vehicle */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <FormField
                      label="Vehicle Year"
                      placeholder="2020"
                      error={errors.vehicleYear?.message}
                      {...register('vehicleYear')}
                    />
                    <FormField
                      label="Make"
                      placeholder="Toyota"
                      error={errors.vehicleMake?.message}
                      {...register('vehicleMake')}
                    />
                    <FormField
                      label="Model"
                      placeholder="Camry"
                      error={errors.vehicleModel?.message}
                      {...register('vehicleModel')}
                    />
                    <FormField
                      label="Mileage"
                      placeholder="45000"
                      error={errors.vehicleMileage?.message}
                      {...register('vehicleMileage')}
                    />
                  </div>
                )}

                {/* Step 2: Current Loan */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <FormField
                      label="Current Lender"
                      placeholder="Bank of America"
                      error={errors.currentLender?.message}
                      {...register('currentLender')}
                    />
                    <FormField
                      label="Loan Balance"
                      placeholder="25000"
                      type="number"
                      prefix="$"
                      error={errors.loanBalance?.message}
                      {...register('loanBalance')}
                    />
                    <FormField
                      label="Interest Rate"
                      placeholder="8.5"
                      type="number"
                      suffix="%"
                      error={errors.interestRate?.message}
                      {...register('interestRate')}
                    />
                    <FormField
                      label="Monthly Payment"
                      placeholder="450"
                      type="number"
                      prefix="$"
                      error={errors.monthlyPayment?.message}
                      {...register('monthlyPayment')}
                    />
                  </div>
                )}

                {/* Step 3: Personal Info */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        label="First Name"
                        placeholder="John"
                        error={errors.firstName?.message}
                        {...register('firstName')}
                      />
                      <FormField
                        label="Last Name"
                        placeholder="Doe"
                        error={errors.lastName?.message}
                        {...register('lastName')}
                      />
                    </div>
                    <FormField
                      label="Email"
                      placeholder="john@example.com"
                      type="email"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                    <FormField
                      label="Phone"
                      placeholder="(555) 123-4567"
                      type="tel"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                  </div>
                )}

                {/* Step 4: Address */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <FormField
                      label="Street Address"
                      placeholder="123 Main St"
                      error={errors.street?.message}
                      {...register('street')}
                    />
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        label="City"
                        placeholder="Austin"
                        error={errors.city?.message}
                        {...register('city')}
                      />
                      <FormField
                        label="State"
                        placeholder="TX"
                        error={errors.state?.message}
                        {...register('state')}
                      />
                    </div>
                    <FormField
                      label="ZIP Code"
                      placeholder="78701"
                      error={errors.zipCode?.message}
                      {...register('zipCode')}
                    />
                  </div>
                )}

                {/* Step 5: Employment */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <FormSelect
                      label="Employment Status"
                      error={errors.employmentStatus?.message}
                      {...register('employmentStatus')}
                      options={[
                        { value: '', label: 'Select...' },
                        { value: 'employed', label: 'Employed' },
                        { value: 'self-employed', label: 'Self-Employed' },
                        { value: 'retired', label: 'Retired' },
                      ]}
                    />
                    <FormField
                      label="Employer (if applicable)"
                      placeholder="Company Name"
                      error={errors.employer?.message}
                      {...register('employer')}
                    />
                    <FormField
                      label="Annual Income"
                      placeholder="75000"
                      type="number"
                      prefix="$"
                      error={errors.annualIncome?.message}
                      {...register('annualIncome')}
                    />
                  </div>
                )}

                {/* Step 6: Credit */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <FormSelect
                      label="Credit Score Range"
                      error={errors.creditScore?.message}
                      {...register('creditScore')}
                      options={[
                        { value: '', label: 'Select...' },
                        { value: '750+', label: 'Excellent (750+)' },
                        { value: '700-749', label: 'Good (700-749)' },
                        { value: '650-699', label: 'Fair (650-699)' },
                        { value: '600-649', label: 'Poor (600-649)' },
                        { value: '<600', label: 'Below 600' },
                      ]}
                    />
                    <div className="rounded-2xl bg-white/5 p-6">
                      <p className="text-sm text-white/60">
                        💡 Don't worry! We work with lenders who serve all credit ranges.
                        This helps us match you with the right lenders.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-between">
              <button
                type="button"
                onClick={previous}
                disabled={currentStep === 0}
                className="rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 disabled:opacity-30"
              >
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full bg-white px-8 py-4 font-semibold text-black transition-all hover:scale-105"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-white px-8 py-4 font-semibold text-black transition-all hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Trust Indicator */}
        <div className="mt-8 text-center text-sm text-white/40">
          <p>🔒 Your information is secure and confidential</p>
          <p className="mt-2">No credit impact • 100% free • Takes 3 minutes</p>
        </div>
      </div>
    </div>
  )
}

// Form Field Component
const FormField = ({
  label,
  error,
  prefix,
  suffix,
  ...props
}: any) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-white/80">
      {label}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-4 top-4 text-white/40">{prefix}</span>
      )}
      <input
        className={`w-full rounded-2xl border ${
          error ? 'border-red-500/50' : 'border-white/10'
        } bg-white/5 px-4 py-4 ${prefix ? 'pl-8' : ''} ${
          suffix ? 'pr-12' : ''
        } text-white placeholder-white/30 backdrop-blur-xl transition-all focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10`}
        {...props}
      />
      {suffix && (
        <span className="absolute right-4 top-4 text-white/40">{suffix}</span>
      )}
    </div>
    {error && (
      <p className="mt-2 text-sm text-red-400">{error}</p>
    )}
  </div>
)

// Form Select Component
const FormSelect = ({
  label,
  error,
  options,
  ...props
}: any) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-white/80">
      {label}
    </label>
    <select
      className={`w-full rounded-2xl border ${
        error ? 'border-red-500/50' : 'border-white/10'
      } bg-white/5 px-4 py-4 text-white backdrop-blur-xl transition-all focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/10`}
      {...props}
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value} className="bg-black">
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="mt-2 text-sm text-red-400">{error}</p>
    )}
  </div>
)
