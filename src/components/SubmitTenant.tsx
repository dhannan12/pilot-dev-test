/**
 * SubmitTenant — Online tenant application form with email and phone validation
 *
 * Features: form validation, email/phone requirements, real-time error display, submission preview, form reset
 *
 * Ticket: SCRUM-705 | Branch: proto/SCRUM-703
 */

import { useState } from 'react'

interface TenantApplication {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  currentAddress: string
  employmentStatus: string
  annualIncome: string
  moveInDate: string
  submittedAt: string
}

// Mock submitted applications for display
const mockApplications: TenantApplication[] = [
  {
    id: '1',
    fullName: 'John Smith',
    email: 'john.smith@email.com',
    phoneNumber: '555-0123',
    currentAddress: '123 Main St, Apt 4B, New York, NY 10001',
    employmentStatus: 'Full-time',
    annualIncome: '$75,000',
    moveInDate: '2026-09-01',
    submittedAt: '2026-08-01T10:30:00Z'
  },
  {
    id: '2',
    fullName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phoneNumber: '555-0456',
    currentAddress: '456 Oak Ave, Unit 2, Brooklyn, NY 11201',
    employmentStatus: 'Self-employed',
    annualIncome: '$82,000',
    moveInDate: '2026-09-15',
    submittedAt: '2026-08-03T14:20:00Z'
  },
  {
    id: '3',
    fullName: 'Michael Chen',
    email: 'mchen@workmail.com',
    phoneNumber: '555-0789',
    currentAddress: '789 Pine Rd, Apt 1A, Queens, NY 11354',
    employmentStatus: 'Full-time',
    annualIncome: '$68,500',
    moveInDate: '2026-10-01',
    submittedAt: '2026-08-05T09:45:00Z'
  },
  {
    id: '4',
    fullName: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.net',
    phoneNumber: '555-0321',
    currentAddress: '321 Elm St, Unit 5C, Manhattan, NY 10002',
    employmentStatus: 'Part-time',
    annualIncome: '$45,000',
    moveInDate: '2026-09-20',
    submittedAt: '2026-08-07T16:10:00Z'
  },
  {
    id: '5',
    fullName: 'David Williams',
    email: 'dwilliams@company.com',
    phoneNumber: '555-0654',
    currentAddress: '654 Maple Dr, Apt 3D, Bronx, NY 10451',
    employmentStatus: 'Full-time',
    annualIncome: '$95,000',
    moveInDate: '2026-08-25',
    submittedAt: '2026-08-10T11:00:00Z'
  }
]

export default function SubmitTenant() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    currentAddress: '',
    employmentStatus: 'Full-time',
    annualIncome: '',
    moveInDate: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showApplications, setShowApplications] = useState(false)

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Phone validation (basic format)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{3}-?\d{4}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validate required fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number (e.g., 555-0123)'
    }

    if (!formData.currentAddress.trim()) {
      newErrors.currentAddress = 'Current address is required'
    }

    if (!formData.annualIncome.trim()) {
      newErrors.annualIncome = 'Annual income is required'
    }

    if (!formData.moveInDate) {
      newErrors.moveInDate = 'Desired move-in date is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Success
    setSubmitted(true)
    setErrors({})
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      currentAddress: '',
      employmentStatus: 'Full-time',
      annualIncome: '',
      moveInDate: ''
    })
    setErrors({})
    setSubmitted(false)
  }

  const formatDate = (isoDate: string): string => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tenant Application</h1>
            <p className="text-gray-600">Submit your application online. All fields are required.</p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Application Submitted Successfully!</h3>
                  <div className="text-sm text-green-800 space-y-1 mb-4">
                    <p><strong>Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                    <p><strong>Address:</strong> {formData.currentAddress}</p>
                    <p><strong>Employment:</strong> {formData.employmentStatus}</p>
                    <p><strong>Income:</strong> {formData.annualIncome}</p>
                    <p><strong>Move-in Date:</strong> {formData.moveInDate}</p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.phoneNumber
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="555-0123"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="currentAddress"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.currentAddress
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your full current address"
                />
                {errors.currentAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentAddress}</p>
                )}
              </div>

              <div>
                <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Student">Student</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>

              <div>
                <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Income <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="annualIncome"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.annualIncome
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="$50,000"
                />
                {errors.annualIncome && (
                  <p className="mt-1 text-sm text-red-600">{errors.annualIncome}</p>
                )}
              </div>

              <div>
                <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Move-in Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="moveInDate"
                  name="moveInDate"
                  value={formData.moveInDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.moveInDate
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.moveInDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.moveInDate}</p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear Form
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Mock applications display */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
            <button
              onClick={() => setShowApplications(!showApplications)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              {showApplications ? 'Hide' : 'Show'} ({mockApplications.length})
            </button>
          </div>

          {showApplications && (
            <div className="space-y-4">
              {mockApplications.map((app) => (
                <div
                  key={app.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{app.fullName}</h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(app.submittedAt)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Email:</span> {app.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {app.phoneNumber}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Address:</span> {app.currentAddress}
                    </div>
                    <div>
                      <span className="font-medium">Employment:</span> {app.employmentStatus}
                    </div>
                    <div>
                      <span className="font-medium">Income:</span> {app.annualIncome}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Move-in Date:</span> {app.moveInDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
