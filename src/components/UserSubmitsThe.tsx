/**
 * UserSubmitsThe — Contact form with invalid email format validation
 *
 * Features: email validation, error messages, form state management, user feedback, invalid format detection
 *
 * Ticket: SCRUM-830 | Branch: proto/SCRUM-828
 */

import React, { useState } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

interface ValidationError {
  field: string
  message: string
}

interface SubmissionAttempt {
  id: number
  email: string
  isValid: boolean
  timestamp: string
  errorMessage?: string
}

// Mock data: common invalid email formats users might submit
const INVALID_EMAIL_EXAMPLES: string[] = [
  'user@',
  '@domain.com',
  'user.domain.com',
  'user@domain',
  'user name@domain.com',
]

export default function UserSubmitsThe() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [submissionHistory, setSubmissionHistory] = useState<SubmissionAttempt[]>([])
  const [attemptCount, setAttemptCount] = useState(0)

  const validateEmail = (email: string): boolean => {
    // RFC 5322 simplified email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear errors for this field when user starts typing
    if (errors.some((err) => err.field === name)) {
      setErrors((prev) => prev.filter((err) => err.field !== name))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: ValidationError[] = []

    // Validate name
    if (!formData.name.trim()) {
      newErrors.push({ field: 'name', message: 'Name is required' })
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.push({ field: 'email', message: 'Email is required' })
    } else if (!validateEmail(formData.email)) {
      newErrors.push({
        field: 'email',
        message: 'Invalid email format. Please use format: user@example.com',
      })
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.push({ field: 'message', message: 'Message is required' })
    }

    setErrors(newErrors)

    // Record submission attempt
    const attempt: SubmissionAttempt = {
      id: attemptCount + 1,
      email: formData.email,
      isValid: newErrors.length === 0 && validateEmail(formData.email),
      timestamp: new Date().toLocaleTimeString(),
      errorMessage: newErrors.find((err) => err.field === 'email')?.message,
    }

    setSubmissionHistory((prev) => [attempt, ...prev].slice(0, 5))
    setAttemptCount((prev) => prev + 1)

    if (newErrors.length === 0) {
      // Success - reset form
      alert('Form submitted successfully!')
      setFormData({ name: '', email: '', message: '' })
    }
  }

  const tryInvalidEmail = (email: string) => {
    setFormData((prev) => ({ ...prev, email }))
  }

  const getFieldError = (field: string): string | undefined => {
    return errors.find((err) => err.field === field)?.message
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact Form
          </h1>
          <p className="text-gray-600 mb-6">
            Try submitting with invalid email formats to see validation in action
          </p>

          {/* Quick test buttons */}
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-sm font-semibold text-yellow-900 mb-2">
              Test Invalid Email Formats:
            </h3>
            <div className="flex flex-wrap gap-2">
              {INVALID_EMAIL_EXAMPLES.map((email, index) => (
                <button
                  key={index}
                  onClick={() => tryInvalidEmail(email)}
                  className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 text-sm rounded border border-yellow-300 transition-colors"
                >
                  {email}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                  getFieldError('name')
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-indigo-200'
                }`}
                placeholder="John Doe"
              />
              {getFieldError('name') && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError('name')}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                  getFieldError('email')
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-indigo-200'
                }`}
                placeholder="user@example.com"
              />
              {getFieldError('email') && (
                <p className="mt-1 text-sm text-red-600 flex items-start">
                  <span className="mr-1">⚠️</span>
                  <span>{getFieldError('email')}</span>
                </p>
              )}
            </div>

            {/* Message field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                  getFieldError('message')
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-indigo-200'
                }`}
                placeholder="Your message here..."
              />
              {getFieldError('message') && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError('message')}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Submit Form
            </button>
          </form>
        </div>

        {/* Submission History */}
        {submissionHistory.length > 0 && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Submission History
            </h2>
            <div className="space-y-3">
              {submissionHistory.map((attempt) => (
                <div
                  key={attempt.id}
                  className={`p-4 rounded-lg border-2 ${
                    attempt.isValid
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span
                        className={`text-lg mr-2 ${
                          attempt.isValid ? '' : ''
                        }`}
                      >
                        {attempt.isValid ? '✓' : '✗'}
                      </span>
                      <span className="font-mono text-sm font-medium">
                        {attempt.email || '(empty)'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {attempt.timestamp}
                    </span>
                  </div>
                  {!attempt.isValid && attempt.errorMessage && (
                    <p className="text-sm text-red-700 ml-7">
                      {attempt.errorMessage}
                    </p>
                  )}
                  {attempt.isValid && (
                    <p className="text-sm text-green-700 ml-7">
                      Valid email format
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
