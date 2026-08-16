/**
 * UserSubmitsA — Membership sign-up form with personal details validation
 *
 * Features: personal info fields, email/phone validation, membership tier selection, form submission feedback, responsive layout
 *
 * Ticket: SCRUM-952 | Branch: proto/SCRUM-951
 */

import React, { useState } from 'react'

interface MembershipTier {
  id: string
  name: string
  price: number
  benefits: string[]
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  membershipTier: string
  emergencyContact: string
  emergencyPhone: string
}

const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29.99,
    benefits: ['Gym access', 'Locker room', 'Basic equipment']
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 49.99,
    benefits: ['All Basic benefits', 'Group classes', 'Free parking', 'Guest passes (2/month)']
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 79.99,
    benefits: ['All Standard benefits', 'Personal training (2 sessions/month)', 'Spa access', 'Nutrition consultation']
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 129.99,
    benefits: ['All Premium benefits', 'Unlimited personal training', 'Priority booking', 'Private locker', '24/7 access']
  },
  {
    id: 'student',
    name: 'Student',
    price: 19.99,
    benefits: ['Gym access', 'Group classes', 'Student ID required', 'Off-peak hours']
  }
]

const MOCK_SUBMISSIONS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    tier: 'Premium',
    status: 'Approved',
    date: '2026-08-10'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    tier: 'Standard',
    status: 'Pending',
    date: '2026-08-12'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    tier: 'Elite',
    status: 'Approved',
    date: '2026-08-13'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.d@email.com',
    tier: 'Basic',
    status: 'Approved',
    date: '2026-08-14'
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    email: 'alex.r@email.com',
    tier: 'Student',
    status: 'Pending',
    date: '2026-08-15'
  }
]

export default function UserSubmitsA() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    membershipTier: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    } else {
      const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear()
      if (age < 16) {
        newErrors.dateOfBirth = 'Must be at least 16 years old'
      }
    }
    if (!formData.membershipTier) {
      newErrors.membershipTier = 'Please select a membership tier'
    }
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact name is required'
    }
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency phone is required'
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.emergencyPhone)) {
      newErrors.emergencyPhone = 'Invalid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          membershipTier: '',
          emergencyContact: '',
          emergencyPhone: ''
        })
      }, 3000)
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const selectedTier = MEMBERSHIP_TIERS.find(tier => tier.id === formData.membershipTier)

  return (
    <div data-testid="usersubmitsa" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gym Membership Sign-Up</h1>
          <p className="text-gray-600 mb-8">Join our fitness community today! Fill out the form below to get started.</p>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
              <p className="font-semibold">Success! Your membership application has been submitted.</p>
              <p className="text-sm">We'll review your information and contact you within 24 hours.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    data-testid="usersubmitsa-firstname"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    data-testid="usersubmitsa-lastname"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Smith"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    data-testid="usersubmitsa-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john.smith@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    data-testid="usersubmitsa-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    id="dateOfBirth"
                    data-testid="usersubmitsa-dateofbirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
              </div>
            </div>

            {/* Membership Selection */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Membership Tier</h2>
              <div>
                <label htmlFor="membershipTier" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Your Plan *
                </label>
                <select
                  id="membershipTier"
                  data-testid="usersubmitsa-membershiptier"
                  value={formData.membershipTier}
                  onChange={(e) => handleChange('membershipTier', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.membershipTier ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Choose a membership --</option>
                  {MEMBERSHIP_TIERS.map(tier => (
                    <option key={tier.id} value={tier.id}>
                      {tier.name} - ${tier.price}/month
                    </option>
                  ))}
                </select>
                {errors.membershipTier && <p className="text-red-500 text-sm mt-1">{errors.membershipTier}</p>}
              </div>

              {selectedTier && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">{selectedTier.name} Membership Benefits:</h3>
                  <ul className="space-y-1">
                    {selectedTier.benefits.map((benefit, index) => (
                      <li key={index} className="text-blue-800 text-sm flex items-start">
                        <span className="mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-lg font-bold text-blue-900">${selectedTier.price}/month</p>
                </div>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact Name *
                  </label>
                  <input
                    id="emergencyContact"
                    data-testid="usersubmitsa-emergencycontact"
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Jane Smith"
                  />
                  {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
                </div>

                <div>
                  <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Phone Number *
                  </label>
                  <input
                    id="emergencyPhone"
                    data-testid="usersubmitsa-emergencyphone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1 (555) 987-6543"
                  />
                  {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                data-testid="usersubmitsa-reset"
                onClick={() => {
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    dateOfBirth: '',
                    membershipTier: '',
                    emergencyContact: '',
                    emergencyPhone: ''
                  })
                  setErrors({})
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reset Form
              </button>
              <button
                type="submit"
                data-testid="usersubmitsa-submit"
                className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>

        {/* Recent Submissions */}
        <div className="mt-8 bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Membership Applications</h2>
          <div data-testid="usersubmitsa-list" className="space-y-3">
            {MOCK_SUBMISSIONS.map(submission => (
              <div
                key={submission.id}
                data-testid="usersubmitsa-item"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{submission.name}</h3>
                  <p className="text-sm text-gray-600">{submission.email}</p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-medium text-gray-700">{submission.tier}</p>
                  <p className="text-sm text-gray-500">{submission.date}</p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      submission.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
