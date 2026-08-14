/**
 * UserSubmitsThe — Contact form submission handler with invalid data validation
 *
 * Features: form validation, error display, invalid data handling, field-level errors, submission feedback
 *
 * Ticket: SCRUM-836 | Branch: proto/SCRUM-828
 */

import React, { useState } from 'react'

interface ValidationError {
  field: string
  message: string
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const MOCK_VALIDATION_ERRORS: ValidationError[] = [
  { field: 'email', message: 'Invalid email format. Please use a valid email address.' },
  { field: 'phone', message: 'Phone number must be 10 digits.' },
  { field: 'name', message: 'Name is required and must be at least 2 characters.' },
  { field: 'subject', message: 'Subject cannot be empty.' },
  { field: 'message', message: 'Message must be at least 10 characters long.' }
]

const MOCK_INVALID_SUBMISSIONS = [
  { name: '', email: 'invalid-email', phone: '123', subject: '', message: 'Hi' },
  { name: 'J', email: 'test@', phone: '12345', subject: 'Help', message: 'Short' },
  { name: 'John Doe', email: 'notanemail', phone: 'abcdefghij', subject: '', message: '' },
  { name: 'Jane', email: 'jane@example', phone: '555', subject: 'Test', message: 'Test msg' },
  { name: 'Bob', email: 'bob@.com', phone: '9999', subject: 'Query', message: 'Too short' }
]

export default function UserSubmitsThe() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const validateForm = (): ValidationError[] => {
    const newErrors: ValidationError[] = []

    if (!formData.name || formData.name.length < 2) {
      newErrors.push({ field: 'name', message: 'Name is required and must be at least 2 characters.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.push({ field: 'email', message: 'Invalid email format. Please use a valid email address.' })
    }

    const phoneRegex = /^\d{10}$/
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.push({ field: 'phone', message: 'Phone number must be 10 digits.' })
    }

    if (!formData.subject || formData.subject.trim().length === 0) {
      newErrors.push({ field: 'subject', message: 'Subject cannot be empty.' })
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.push({ field: 'message', message: 'Message must be at least 10 characters long.' })
    }

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)
    const validationErrors = validateForm()
    setErrors(validationErrors)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const loadMockInvalidData = (index: number) => {
    const mockData = MOCK_INVALID_SUBMISSIONS[index]
    setFormData(mockData)
    setSubmitAttempted(false)
    setErrors([])
  }

  const getFieldError = (field: string): string | undefined => {
    return errors.find(err => err.field === field)?.message
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Form</h1>
          <p className="text-gray-600 mb-6">Submit your inquiry (validation will check for invalid data)</p>

          {submitAttempted && errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Form submission failed ({errors.length} error{errors.length !== 1 ? 's' : ''})
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {errors.map((error, idx) => (
                        <li key={idx}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {submitAttempted && errors.length === 0 && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Form submitted successfully!
                  </h3>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                  getFieldError('name') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {getFieldError('name') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                  getFieldError('email') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {getFieldError('email') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                  getFieldError('phone') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="1234567890"
              />
              {getFieldError('phone') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('phone')}</p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${
                  getFieldError('subject') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="What is this regarding?"
              />
              {getFieldError('subject') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('subject')}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={5}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none ${
                  getFieldError('message') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Describe your inquiry in detail (minimum 10 characters)"
              />
              {getFieldError('message') && (
                <p className="mt-1 text-sm text-red-600">{getFieldError('message')}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
            >
              Submit Form
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Test with Mock Invalid Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {MOCK_INVALID_SUBMISSIONS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => loadMockInvalidData(index)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                >
                  Load Invalid #{index + 1}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Click a button to populate the form with invalid test data, then submit to see validation errors.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
