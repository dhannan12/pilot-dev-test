/**
 * BuildExpression — Expression of interest submission and management interface
 *
 * Features: EOI submission form with cover note validation, grade level matching, submission list for hiring managers, status tracking, notification display
 *
 * Ticket: SCRUM-1017 | Branch: proto/SCRUM-1017
 */

import { useState } from 'react'

interface ExpressionOfInterest {
  id: string
  candidateName: string
  candidateEmail: string
  vacancyTitle: string
  vacancyId: string
  gradeLevel: string
  requiredGradeLevel: string
  coverNote: string
  submittedAt: string
  status: 'pending' | 'under-review' | 'shortlisted' | 'rejected'
  notificationSent: boolean
}

interface Vacancy {
  id: string
  title: string
  department: string
  requiredGradeLevel: string
}

export default function BuildExpression() {
  const [activeView, setActiveView] = useState<'submit' | 'list'>('submit')
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    vacancyId: '',
    gradeLevel: '',
    coverNote: ''
  })
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const mockVacancies: Vacancy[] = [
    { id: 'vac-1', title: 'Senior Software Engineer', department: 'Engineering', requiredGradeLevel: 'Grade 7' },
    { id: 'vac-2', title: 'Product Manager', department: 'Product', requiredGradeLevel: 'Grade 6' },
    { id: 'vac-3', title: 'UX Designer', department: 'Design', requiredGradeLevel: 'Grade 5' },
    { id: 'vac-4', title: 'Data Scientist', department: 'Data & Analytics', requiredGradeLevel: 'Grade 7' },
    { id: 'vac-5', title: 'Marketing Manager', department: 'Marketing', requiredGradeLevel: 'Grade 6' }
  ]

  const mockExpressions: ExpressionOfInterest[] = [
    {
      id: 'eoi-1',
      candidateName: 'Alice Johnson',
      candidateEmail: 'alice.johnson@email.com',
      vacancyTitle: 'Senior Software Engineer',
      vacancyId: 'vac-1',
      gradeLevel: 'Grade 7',
      requiredGradeLevel: 'Grade 7',
      coverNote: 'I am excited to apply for this position. With over 8 years of experience in full-stack development and a proven track record of leading successful projects, I believe I would be an excellent fit for this role. My expertise in React, Node.js, and cloud architecture aligns perfectly with your requirements.',
      submittedAt: '2026-08-15T10:30:00Z',
      status: 'under-review',
      notificationSent: true
    },
    {
      id: 'eoi-2',
      candidateName: 'Bob Smith',
      candidateEmail: 'bob.smith@email.com',
      vacancyTitle: 'Product Manager',
      vacancyId: 'vac-2',
      gradeLevel: 'Grade 6',
      requiredGradeLevel: 'Grade 6',
      coverNote: 'I have been following your company for years and am impressed by your product vision. My 5 years of product management experience, combined with my technical background and strong stakeholder management skills, make me well-suited for this opportunity. I am particularly interested in your AI initiatives.',
      submittedAt: '2026-08-14T14:20:00Z',
      status: 'shortlisted',
      notificationSent: true
    },
    {
      id: 'eoi-3',
      candidateName: 'Carol Williams',
      candidateEmail: 'carol.williams@email.com',
      vacancyTitle: 'UX Designer',
      vacancyId: 'vac-3',
      gradeLevel: 'Grade 5',
      requiredGradeLevel: 'Grade 5',
      coverNote: 'Design has always been my passion. With 6 years of experience creating user-centered designs for both B2B and B2C products, I excel at translating complex requirements into intuitive interfaces. My portfolio demonstrates my ability to deliver impactful design solutions that drive business results.',
      submittedAt: '2026-08-13T09:15:00Z',
      status: 'pending',
      notificationSent: true
    },
    {
      id: 'eoi-4',
      candidateName: 'David Brown',
      candidateEmail: 'david.brown@email.com',
      vacancyTitle: 'Data Scientist',
      vacancyId: 'vac-4',
      gradeLevel: 'Grade 6',
      requiredGradeLevel: 'Grade 7',
      coverNote: 'As a data scientist with 4 years of experience in machine learning and statistical modeling, I am eager to contribute to your team. While my current grade is 6, I have been consistently delivering at the Grade 7 level and am ready for this challenge. My recent work on predictive analytics has resulted in 20% improvement in forecasting accuracy.',
      submittedAt: '2026-08-12T16:45:00Z',
      status: 'rejected',
      notificationSent: true
    },
    {
      id: 'eoi-5',
      candidateName: 'Emma Davis',
      candidateEmail: 'emma.davis@email.com',
      vacancyTitle: 'Marketing Manager',
      vacancyId: 'vac-5',
      gradeLevel: 'Grade 6',
      requiredGradeLevel: 'Grade 6',
      coverNote: 'With 7 years of marketing experience spanning digital campaigns, brand strategy, and team leadership, I am confident in my ability to drive marketing excellence at your organization. My data-driven approach has consistently delivered ROI improvements of 30%+ across multiple campaigns. I am particularly excited about the opportunity to work on your global expansion initiatives.',
      submittedAt: '2026-08-11T11:00:00Z',
      status: 'under-review',
      notificationSent: true
    }
  ]

  const gradeLevels = ['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8']

  const validateForm = (): boolean => {
    const errors: string[] = []

    if (!formData.candidateName.trim()) {
      errors.push('Candidate name is required')
    }

    if (!formData.candidateEmail.trim()) {
      errors.push('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.candidateEmail)) {
      errors.push('Invalid email format')
    }

    if (!formData.vacancyId) {
      errors.push('Please select a vacancy')
    }

    if (!formData.gradeLevel) {
      errors.push('Grade level is required')
    }

    // BR-001: Mandatory cover note
    if (!formData.coverNote.trim()) {
      errors.push('Cover note is required (BR-001)')
    } else if (formData.coverNote.trim().length < 50) {
      errors.push('Cover note must be at least 50 characters (BR-001)')
    }

    // BR-005: Grade level matching validation
    if (formData.vacancyId && formData.gradeLevel) {
      const selectedVacancy = mockVacancies.find(v => v.id === formData.vacancyId)
      if (selectedVacancy) {
        const requiredGrade = parseInt(selectedVacancy.requiredGradeLevel.replace('Grade ', ''))
        const candidateGrade = parseInt(formData.gradeLevel.replace('Grade ', ''))
        
        if (candidateGrade < requiredGrade) {
          errors.push(`Grade level mismatch: ${selectedVacancy.title} requires ${selectedVacancy.requiredGradeLevel}, but candidate is ${formData.gradeLevel} (BR-005)`)
        }
      }
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Simulate submission
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({
          candidateName: '',
          candidateEmail: '',
          vacancyId: '',
          gradeLevel: '',
          coverNote: ''
        })
      }, 3000)
    }
  }

  const getStatusColor = (status: ExpressionOfInterest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'under-review': return 'bg-blue-100 text-blue-800'
      case 'shortlisted': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGradeLevelMatchIndicator = (candidateGrade: string, requiredGrade: string) => {
    const candidate = parseInt(candidateGrade.replace('Grade ', ''))
    const required = parseInt(requiredGrade.replace('Grade ', ''))
    
    if (candidate >= required) {
      return <span className="text-green-600 font-semibold">✓ Match</span>
    } else {
      return <span className="text-red-600 font-semibold">✗ Below Required</span>
    }
  }

  return (
    <div data-testid="build-expression" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Expression of Interest</h1>
          <p className="text-gray-600">Submit your interest in open positions or manage received expressions</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              data-testid="build-expression-tab-submit"
              onClick={() => setActiveView('submit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'submit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Submit EOI
            </button>
            <button
              data-testid="build-expression-tab-list"
              onClick={() => setActiveView('list')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Expressions ({mockExpressions.length})
            </button>
          </nav>
        </div>

        {/* Submit Form View */}
        {activeView === 'submit' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Expression of Interest</h2>

            {submitSuccess && (
              <div data-testid="build-expression-success" className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-green-600 font-semibold">✓ Success!</span>
                  <span className="ml-2 text-green-700">Your expression of interest has been submitted. A notification has been sent (BR-007).</span>
                </div>
              </div>
            )}

            {validationErrors.length > 0 && (
              <div data-testid="build-expression-errors" className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-red-800 font-semibold mb-2">Please correct the following errors:</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  {validationErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Candidate Name */}
                <div>
                  <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    data-testid="build-expression-name"
                    id="candidateName"
                    type="text"
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="candidateEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    data-testid="build-expression-email"
                    id="candidateEmail"
                    type="email"
                    value={formData.candidateEmail}
                    onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Vacancy Selection */}
                <div>
                  <label htmlFor="vacancy" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Vacancy *
                  </label>
                  <select
                    data-testid="build-expression-vacancy"
                    id="vacancy"
                    value={formData.vacancyId}
                    onChange={(e) => setFormData({ ...formData, vacancyId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a vacancy...</option>
                    {mockVacancies.map(vacancy => (
                      <option key={vacancy.id} value={vacancy.id}>
                        {vacancy.title} ({vacancy.requiredGradeLevel})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grade Level */}
                <div>
                  <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Grade Level * (BR-005)
                  </label>
                  <select
                    data-testid="build-expression-grade"
                    id="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your grade level...</option>
                    {gradeLevels.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grade Level Validation Display */}
              {formData.vacancyId && formData.gradeLevel && (
                <div data-testid="build-expression-grade-validation" className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-700">
                        <strong>Vacancy requires:</strong> {mockVacancies.find(v => v.id === formData.vacancyId)?.requiredGradeLevel}
                      </span>
                      <span className="mx-2 text-gray-400">|</span>
                      <span className="text-sm text-gray-700">
                        <strong>Your grade:</strong> {formData.gradeLevel}
                      </span>
                    </div>
                    <div>
                      {getGradeLevelMatchIndicator(
                        formData.gradeLevel,
                        mockVacancies.find(v => v.id === formData.vacancyId)?.requiredGradeLevel || ''
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Cover Note */}
              <div>
                <label htmlFor="coverNote" className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Note * (BR-001: Minimum 50 characters)
                </label>
                <textarea
                  data-testid="build-expression-cover-note"
                  id="coverNote"
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Explain why you're interested in this position and what makes you a strong candidate..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.coverNote.length} / 50 characters minimum
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  data-testid="build-expression-submit"
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit Expression of Interest
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List View */}
        {activeView === 'list' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All Expressions of Interest</h2>
              <p className="text-sm text-gray-600 mt-1">Manage and review submitted expressions</p>
            </div>

            <div data-testid="build-expression-list" className="divide-y divide-gray-200">
              {mockExpressions.map((eoi) => (
                <div
                  key={eoi.id}
                  data-testid="build-expression-item"
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{eoi.candidateName}</h3>
                      <p className="text-sm text-gray-600">{eoi.candidateEmail}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(eoi.status)}`}>
                        {eoi.status.replace('-', ' ').toUpperCase()}
                      </span>
                      {eoi.notificationSent && (
                        <span className="text-xs text-green-600 flex items-center">
                          <span className="mr-1">✓</span> Notified (BR-007)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700">
                      Position: <span className="text-gray-900">{eoi.vacancyTitle}</span>
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-600">
                        Candidate: {eoi.gradeLevel}
                      </p>
                      <span className="text-gray-400">|</span>
                      <p className="text-sm text-gray-600">
                        Required: {eoi.requiredGradeLevel}
                      </p>
                      <span className="text-gray-400">|</span>
                      {getGradeLevelMatchIndicator(eoi.gradeLevel, eoi.requiredGradeLevel)}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Cover Note:</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                      {eoi.coverNote}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500">
                    Submitted: {new Date(eoi.submittedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
