/**
 * NSubmit — Expression of Interest submission form with cover note
 *
 * Features: EOI form, cover note input, file upload, form validation, submission handling
 *
 * Ticket: SCRUM-1007 | Branch: proto/SCRUM-1007
 */

import { useState } from 'react'

interface ExpressionOfInterest {
  id: string
  roleTitle: string
  department: string
  location: string
  datePosted: string
  description: string
}

// Mock data for available roles
const MOCK_ROLES: ExpressionOfInterest[] = [
  {
    id: 'eoi-1',
    roleTitle: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    datePosted: '2026-08-10',
    description: 'Lead development of scalable backend services and mentor junior engineers.',
  },
  {
    id: 'eoi-2',
    roleTitle: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    datePosted: '2026-08-12',
    description: 'Drive product strategy and work cross-functionally to deliver value to customers.',
  },
  {
    id: 'eoi-3',
    roleTitle: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    datePosted: '2026-08-13',
    description: 'Create intuitive user experiences and collaborate with engineering teams.',
  },
  {
    id: 'eoi-4',
    roleTitle: 'Data Scientist',
    department: 'Analytics',
    location: 'Seattle, WA',
    datePosted: '2026-08-14',
    description: 'Build predictive models and derive insights from large datasets.',
  },
  {
    id: 'eoi-5',
    roleTitle: 'Marketing Manager',
    department: 'Marketing',
    location: 'Austin, TX',
    datePosted: '2026-08-15',
    description: 'Develop and execute marketing campaigns to drive brand awareness and growth.',
  },
]

export default function NSubmit() {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [coverNote, setCoverNote] = useState<string>('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ role?: string; coverNote?: string; resume?: string }>({})

  const validateForm = (): boolean => {
    const newErrors: { role?: string; coverNote?: string; resume?: string } = {}

    if (!selectedRole) {
      newErrors.role = 'Please select a role'
    }

    if (!coverNote.trim()) {
      newErrors.coverNote = 'Cover note is required'
    } else if (coverNote.trim().length < 50) {
      newErrors.coverNote = 'Cover note must be at least 50 characters'
    }

    if (!resumeFile) {
      newErrors.resume = 'Please upload your resume'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate submission
      setSubmitted(true)
      console.log('Submitted:', {
        roleId: selectedRole,
        coverNote,
        resumeFileName: resumeFile?.name,
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, resume: 'Only PDF and Word documents are allowed' })
        return
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, resume: 'File size must be less than 5MB' })
        return
      }
      setResumeFile(file)
      setErrors({ ...errors, resume: undefined })
    }
  }

  const handleReset = () => {
    setSelectedRole('')
    setCoverNote('')
    setResumeFile(null)
    setSubmitted(false)
    setErrors({})
  }

  const selectedRoleDetails = MOCK_ROLES.find(role => role.id === selectedRole)

  if (submitted) {
    return (
      <div data-testid="n-submit" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div data-testid="n-submit-success" className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Expression of Interest Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for submitting your expression of interest. We will review your application and get back to you soon.
            </p>
            <button
              data-testid="n-submit-reset"
              onClick={handleReset}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="n-submit" className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Expression of Interest
          </h1>
          <p className="text-gray-600 mb-8">
            Submit your application for available positions within the organization
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role-select"
                data-testid="n-submit-role"
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value)
                  setErrors({ ...errors, role: undefined })
                }}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Choose a role...</option>
                {MOCK_ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleTitle} - {role.department} ({role.location})
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Role Details */}
            {selectedRoleDetails && (
              <div data-testid="n-submit-role-details" className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedRoleDetails.roleTitle}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Department:</strong> {selectedRoleDetails.department}</p>
                  <p><strong>Location:</strong> {selectedRoleDetails.location}</p>
                  <p><strong>Posted:</strong> {new Date(selectedRoleDetails.datePosted).toLocaleDateString()}</p>
                  <p className="mt-2">{selectedRoleDetails.description}</p>
                </div>
              </div>
            )}

            {/* Cover Note */}
            <div>
              <label htmlFor="cover-note" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Note <span className="text-red-500">*</span>
              </label>
              <textarea
                id="cover-note"
                data-testid="n-submit-cover-note"
                value={coverNote}
                onChange={(e) => {
                  setCoverNote(e.target.value)
                  setErrors({ ...errors, coverNote: undefined })
                }}
                rows={8}
                placeholder="Explain why you're interested in this role and how your qualifications make you a strong candidate..."
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.coverNote ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="mt-1 flex justify-between">
                <div>
                  {errors.coverNote && (
                    <p className="text-sm text-red-600">{errors.coverNote}</p>
                  )}
                </div>
                <p className={`text-sm ${coverNote.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>
                  {coverNote.length} / 50 min characters
                </p>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="resume-upload"
                  data-testid="n-submit-resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    cursor-pointer"
                />
              </div>
              {resumeFile && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
              {errors.resume && (
                <p className="mt-1 text-sm text-red-600">{errors.resume}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                PDF or Word document, maximum 5MB
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                data-testid="n-submit-submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Submit Expression of Interest
              </button>
              <button
                type="button"
                data-testid="n-submit-cancel"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-semibold"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Available Roles List */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Available Positions
          </h2>
          <div data-testid="n-submit-roles-list" className="space-y-4">
            {MOCK_ROLES.map((role) => (
              <div
                key={role.id}
                data-testid="n-submit-role-item"
                className="border border-gray-200 rounded-md p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedRole(role.id)
                  setErrors({ ...errors, role: undefined })
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {role.roleTitle}
                </h3>
                <p className="text-sm text-gray-600">
                  {role.department} • {role.location} • Posted {new Date(role.datePosted).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
