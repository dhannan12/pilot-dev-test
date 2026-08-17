/**
 * BuildApplication — Application submission form for internal job postings
 *
 * Features: Cover note textarea, Current role selection, Grade level auto-fill, Form validation, Success modal
 *
 * Ticket: SCRUM-1021 | Branch: proto/SCRUM-1021
 */

import { useState } from 'react'

interface Vacancy {
  id: string
  title: string
  department: string
  grade_level: string
}

interface Application {
  vacancy_id: string
  cover_note: string
  current_role: string
  grade_level: string
  submitted_at: string
}

const mockVacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    grade_level: 'Level 5'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    grade_level: 'Level 4'
  },
  {
    id: '3',
    title: 'Data Scientist',
    department: 'Data & Analytics',
    grade_level: 'Level 4'
  },
  {
    id: '4',
    title: 'UX Designer',
    department: 'Design',
    grade_level: 'Level 3'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    grade_level: 'Level 4'
  }
]

const currentRoles: string[] = [
  'Software Engineer',
  'Senior Software Engineer',
  'Product Manager',
  'Data Analyst',
  'UX/UI Designer',
  'DevOps Engineer',
  'Project Manager',
  'Business Analyst'
]

export default function BuildApplication() {
  const [selectedVacancy, setSelectedVacancy] = useState<string>('')
  const [coverNote, setCoverNote] = useState<string>('')
  const [currentRole, setCurrentRole] = useState<string>('')
  const [gradeLevel, setGradeLevel] = useState<string>('')
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedVacancyData = mockVacancies.find(v => v.id === selectedVacancy)

  const handleVacancyChange = (vacancyId: string) => {
    setSelectedVacancy(vacancyId)
    const vacancy = mockVacancies.find(v => v.id === vacancyId)
    if (vacancy) {
      setGradeLevel(vacancy.grade_level)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!selectedVacancy) {
      newErrors.vacancy = 'Please select a vacancy'
    }
    if (!currentRole) {
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
      setShowConfirmModal(true)
    }
  }

  const confirmSubmission = () => {
    const application: Application = {
      vacancy_id: selectedVacancy,
      cover_note: coverNote,
      current_role: currentRole,
      grade_level: gradeLevel,
      submitted_at: new Date().toISOString()
    }
    
    // Simulate submission
    console.log('Application submitted:', application)
    
    setShowConfirmModal(false)
    setShowSuccessModal(true)
    
    // Reset form
    setTimeout(() => {
      setSelectedVacancy('')
      setCoverNote('')
      setCurrentRole('')
      setGradeLevel('')
      setErrors({})
    }, 100)
  }

  const closeSuccessModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <div data-testid="build-application" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit Application
          </h1>
          <p className="text-gray-600 mb-8">
            Express your interest in internal job opportunities
          </p>

          <form onSubmit={handleSubmit} data-testid="build-application-form">
            {/* Vacancy Selection */}
            <div className="mb-6">
              <label 
                htmlFor="vacancy-select" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Vacancy <span className="text-red-500">*</span>
              </label>
              <select
                id="vacancy-select"
                data-testid="build-application-vacancy"
                value={selectedVacancy}
                onChange={(e) => handleVacancyChange(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.vacancy ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Select a vacancy --</option>
                {mockVacancies.map((vacancy) => (
                  <option key={vacancy.id} value={vacancy.id}>
                    {vacancy.title} - {vacancy.department}
                  </option>
                ))}
              </select>
              {errors.vacancy && (
                <p className="text-red-500 text-sm mt-1">{errors.vacancy}</p>
              )}
            </div>

            {/* Vacancy Details */}
            {selectedVacancyData && (
              <div 
                data-testid="build-application-vacancy-details" 
                className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Vacancy Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Title:</span>{' '}
                    <span className="font-medium">{selectedVacancyData.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Department:</span>{' '}
                    <span className="font-medium">{selectedVacancyData.department}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Grade Level:</span>{' '}
                    <span className="font-medium">{selectedVacancyData.grade_level}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Current Role Selection */}
            <div className="mb-6">
              <label 
                htmlFor="current-role" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Current Role <span className="text-red-500">*</span>
              </label>
              <select
                id="current-role"
                data-testid="build-application-current-role"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.currentRole ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Select your current role --</option>
                {currentRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.currentRole && (
                <p className="text-red-500 text-sm mt-1">{errors.currentRole}</p>
              )}
            </div>

            {/* Grade Level (Auto-filled) */}
            <div className="mb-6">
              <label 
                htmlFor="grade-level" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Target Grade Level
              </label>
              <input
                id="grade-level"
                type="text"
                data-testid="build-application-grade-level"
                value={gradeLevel}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                placeholder="Auto-filled when vacancy is selected"
              />
              <p className="text-gray-500 text-xs mt-1">
                This field is automatically filled based on the selected vacancy
              </p>
            </div>

            {/* Cover Note */}
            <div className="mb-6">
              <label 
                htmlFor="cover-note" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cover Note <span className="text-red-500">*</span>
              </label>
              <textarea
                id="cover-note"
                data-testid="build-application-cover-note"
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                rows={6}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.coverNote ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Explain your interest in this position and relevant experience (minimum 50 characters)"
              />
              <div className="flex justify-between items-center mt-1">
                {errors.coverNote && (
                  <p className="text-red-500 text-sm">{errors.coverNote}</p>
                )}
                <p className="text-gray-500 text-xs ml-auto">
                  {coverNote.length} characters
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                data-testid="build-application-submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Application
              </button>
              <button
                type="button"
                data-testid="build-application-reset"
                onClick={() => {
                  setSelectedVacancy('')
                  setCoverNote('')
                  setCurrentRole('')
                  setGradeLevel('')
                  setErrors({})
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div 
          data-testid="build-application-confirm-modal" 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Confirm Submission
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit your application for{' '}
              <strong>{selectedVacancyData?.title}</strong>?
            </p>
            <div className="flex gap-3">
              <button
                data-testid="build-application-confirm-submit"
                onClick={confirmSubmission}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Yes, Submit
              </button>
              <button
                data-testid="build-application-confirm-cancel"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 border border-gray-300 py-2 px-4 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div 
          data-testid="build-application-success-modal" 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
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
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Your application has been successfully submitted. You will be notified of the next steps via email.
            </p>
            <button
              data-testid="build-application-success-close"
              onClick={closeSuccessModal}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
