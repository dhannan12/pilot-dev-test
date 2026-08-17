/**
 * NSubmit — Submit expression of interest with cover note and current role
 *
 * Features: cover note input, current role selection, job role selection, submission form, validation feedback
 *
 * Ticket: SCRUM-995 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface JobRole {
  id: string
  title: string
  department: string
  location: string
}

interface CurrentRole {
  id: string
  title: string
  department: string
}

const MOCK_JOB_ROLES: JobRole[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY'
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote'
  },
  {
    id: '4',
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Austin, TX'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA'
  },
  {
    id: '6',
    title: 'HR Business Partner',
    department: 'Human Resources',
    location: 'Chicago, IL'
  },
  {
    id: '7',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Remote'
  }
]

const MOCK_CURRENT_ROLES: CurrentRole[] = [
  {
    id: '1',
    title: 'Software Engineer',
    department: 'Engineering'
  },
  {
    id: '2',
    title: 'Junior Product Manager',
    department: 'Product'
  },
  {
    id: '3',
    title: 'UI Designer',
    department: 'Design'
  },
  {
    id: '4',
    title: 'Business Analyst',
    department: 'Analytics'
  },
  {
    id: '5',
    title: 'Systems Administrator',
    department: 'IT'
  },
  {
    id: '6',
    title: 'HR Coordinator',
    department: 'Human Resources'
  },
  {
    id: '7',
    title: 'Marketing Specialist',
    department: 'Marketing'
  }
]

export default function NSubmit() {
  const [selectedJobRole, setSelectedJobRole] = useState<string>('')
  const [selectedCurrentRole, setSelectedCurrentRole] = useState<string>('')
  const [coverNote, setCoverNote] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!selectedJobRole) {
      newErrors.jobRole = 'Please select a job role you are interested in'
    }

    if (!selectedCurrentRole) {
      newErrors.currentRole = 'Please select your current role'
    }

    if (!coverNote.trim()) {
      newErrors.coverNote = 'Please provide a cover note'
    } else if (coverNote.trim().length < 50) {
      newErrors.coverNote = 'Cover note must be at least 50 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setSubmitted(true)
      // In a real application, this would send data to the backend
      console.log('Submitted:', {
        jobRole: selectedJobRole,
        currentRole: selectedCurrentRole,
        coverNote
      })
    }
  }

  const handleReset = () => {
    setSelectedJobRole('')
    setSelectedCurrentRole('')
    setCoverNote('')
    setErrors({})
    setSubmitted(false)
  }

  const selectedJob = MOCK_JOB_ROLES.find(job => job.id === selectedJobRole)
  const selectedCurrent = MOCK_CURRENT_ROLES.find(role => role.id === selectedCurrentRole)

  if (submitted) {
    return (
      <div data-testid="nsubmit" className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Expression of Interest Submitted!</h2>
              <p className="text-gray-600">
                Thank you for your interest in the position. Your submission has been received.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">Submission Summary</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Applied for:</span>
                  <p className="text-gray-900">{selectedJob?.title} - {selectedJob?.department}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Current role:</span>
                  <p className="text-gray-900">{selectedCurrent?.title} - {selectedCurrent?.department}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Cover note:</span>
                  <p className="text-gray-900 mt-1">{coverNote}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                data-testid="nsubmit-new"
                onClick={handleReset}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Another Expression of Interest
              </button>
              <button
                data-testid="nsubmit-browse"
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Browse More Roles
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="nsubmit" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Expression of Interest</h1>
          <p className="text-gray-600">
            Express your interest in an internal position by providing details about your motivation and current role
          </p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          {/* Job Role Selection */}
          <div className="mb-6">
            <label htmlFor="job-role" className="block text-sm font-medium text-gray-700 mb-2">
              Position of Interest <span className="text-red-500">*</span>
            </label>
            <select
              id="job-role"
              data-testid="nsubmit-job-role"
              value={selectedJobRole}
              onChange={(e) => {
                setSelectedJobRole(e.target.value)
                setErrors({ ...errors, jobRole: '' })
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.jobRole ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a position...</option>
              {MOCK_JOB_ROLES.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title} - {job.department} ({job.location})
                </option>
              ))}
            </select>
            {errors.jobRole && (
              <p className="mt-1 text-sm text-red-600">{errors.jobRole}</p>
            )}
          </div>

          {/* Current Role Selection */}
          <div className="mb-6">
            <label htmlFor="current-role" className="block text-sm font-medium text-gray-700 mb-2">
              Your Current Role <span className="text-red-500">*</span>
            </label>
            <select
              id="current-role"
              data-testid="nsubmit-current-role"
              value={selectedCurrentRole}
              onChange={(e) => {
                setSelectedCurrentRole(e.target.value)
                setErrors({ ...errors, currentRole: '' })
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.currentRole ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select your current role...</option>
              {MOCK_CURRENT_ROLES.map(role => (
                <option key={role.id} value={role.id}>
                  {role.title} - {role.department}
                </option>
              ))}
            </select>
            {errors.currentRole && (
              <p className="mt-1 text-sm text-red-600">{errors.currentRole}</p>
            )}
          </div>

          {/* Cover Note */}
          <div className="mb-6">
            <label htmlFor="cover-note" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Note <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Explain why you are interested in this position and how your current experience makes you a good fit (minimum 50 characters)
            </p>
            <textarea
              id="cover-note"
              data-testid="nsubmit-cover-note"
              value={coverNote}
              onChange={(e) => {
                setCoverNote(e.target.value)
                setErrors({ ...errors, coverNote: '' })
              }}
              rows={8}
              placeholder="Share your motivation, relevant experience, and what you hope to contribute to this role..."
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y ${
                errors.coverNote ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              <div>
                {errors.coverNote && (
                  <p className="text-sm text-red-600">{errors.coverNote}</p>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {coverNote.length} characters
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              data-testid="nsubmit-cancel"
              onClick={handleReset}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-testid="nsubmit-submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Submit Expression of Interest
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Tips for a Strong Submission</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Be specific about your interest in the role and department</li>
            <li>Highlight relevant skills and achievements from your current position</li>
            <li>Explain how this opportunity aligns with your career goals</li>
            <li>Demonstrate your understanding of the role's requirements</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
