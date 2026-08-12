/**
 * ValidMembership — Membership enrollment form with personal information validation
 *
 * Features: name validation, email validation, phone validation, real-time feedback, enrollment submission
 *
 * Ticket: SCRUM-675 | Branch: proto/SCRUM-674
 */

import { useState, FormEvent, ChangeEvent } from 'react'

interface MembershipData {
  id: string
  name: string
  email: string
  phone: string
  enrollmentDate: string
  status: string
}

const MOCK_ENROLLMENTS: MembershipData[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    enrollmentDate: '2026-01-15',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(555) 234-5678',
    enrollmentDate: '2026-02-20',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    phone: '(555) 345-6789',
    enrollmentDate: '2026-03-10',
    status: 'Active'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    phone: '(555) 456-7890',
    enrollmentDate: '2026-04-05',
    status: 'Pending'
  },
  {
    id: '5',
    name: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    phone: '(555) 567-8901',
    enrollmentDate: '2026-05-12',
    status: 'Active'
  },
  {
    id: '6',
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    phone: '(555) 678-9012',
    enrollmentDate: '2026-06-18',
    status: 'Active'
  }
]

interface ValidationErrors {
  name?: string
  email?: string
  phone?: string
}

export default function ValidMembership() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [enrollments, setEnrollments] = useState<MembershipData[]>(MOCK_ENROLLMENTS)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return 'Name is required'
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters'
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return undefined
  }

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) {
      return 'Phone number is required'
    }
    const phoneRegex = /^[\d\s()+-]+$/
    if (!phoneRegex.test(phone)) {
      return 'Phone number can only contain digits, spaces, and (), +, - characters'
    }
    const digitsOnly = phone.replace(/\D/g, '')
    if (digitsOnly.length < 10) {
      return 'Phone number must contain at least 10 digits'
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const phoneError = validatePhone(formData.phone)
    
    if (nameError) newErrors.name = nameError
    if (emailError) newErrors.email = emailError
    if (phoneError) newErrors.phone = phoneError
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear submit success message when user starts typing again
    if (submitSuccess) {
      setSubmitSuccess(false)
    }
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const newErrors = { ...errors }
      if (name === 'name') {
        const error = validateName(value)
        if (error) {
          newErrors.name = error
        } else {
          delete newErrors.name
        }
      } else if (name === 'email') {
        const error = validateEmail(value)
        if (error) {
          newErrors.email = error
        } else {
          delete newErrors.email
        }
      } else if (name === 'phone') {
        const error = validatePhone(value)
        if (error) {
          newErrors.phone = error
        } else {
          delete newErrors.phone
        }
      }
      setErrors(newErrors)
    }
  }

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
    
    // Validate the specific field on blur
    const newErrors = { ...errors }
    if (fieldName === 'name') {
      const error = validateName(formData.name)
      if (error) {
        newErrors.name = error
      } else {
        delete newErrors.name
      }
    } else if (fieldName === 'email') {
      const error = validateEmail(formData.email)
      if (error) {
        newErrors.email = error
      } else {
        delete newErrors.email
      }
    } else if (fieldName === 'phone') {
      const error = validatePhone(formData.phone)
      if (error) {
        newErrors.phone = error
      } else {
        delete newErrors.phone
      }
    }
    setErrors(newErrors)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true })
    
    if (validateForm()) {
      // Create new enrollment
      const newEnrollment: MembershipData = {
        id: String(enrollments.length + 1),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'Pending'
      }
      
      setEnrollments(prev => [newEnrollment, ...prev])
      setFormData({ name: '', email: '', phone: '' })
      setErrors({})
      setTouched({})
      setSubmitSuccess(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Membership Enrollment</h1>
          <p className="text-lg text-gray-600">Join our community with valid personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enrollment Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enroll Now</h2>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">✓ Enrollment submitted successfully!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Name Field */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('name')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    touched.name && errors.name
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="John Smith"
                />
                {touched.name && errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    touched.email && errors.email
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="john.smith@example.com"
                />
                {touched.email && errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('phone')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    touched.phone && errors.phone
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                  }`}
                  placeholder="(555) 123-4567"
                />
                {touched.phone && errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Submit Enrollment
              </button>

              <p className="mt-4 text-sm text-gray-500 text-center">* Required fields</p>
            </form>
          </div>

          {/* Enrollment List */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Recent Enrollments ({enrollments.length})
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{enrollment.name}</h3>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        enrollment.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Email:</span> {enrollment.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {enrollment.phone}
                    </p>
                    <p>
                      <span className="font-medium">Enrolled:</span>{' '}
                      {new Date(enrollment.enrollmentDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
