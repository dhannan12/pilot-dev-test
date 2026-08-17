/**
 * HiringPost — Enables hiring managers to post new job vacancies with detailed requirements and closing dates
 *
 * Features: job title and description input, requirements editor, closing date picker, department selection, employment type
 *
 * Ticket: SCRUM-1008 | Branch: proto/SCRUM-1008
 */

import React, { useState } from 'react'

interface Requirement {
  id: string
  text: string
}

interface JobPost {
  title: string
  department: string
  employmentType: string
  location: string
  closingDate: string
  description: string
  requirements: Requirement[]
}

const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Customer Success',
  'Operations',
  'Human Resources',
  'Finance'
]

const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Temporary'
]

const INITIAL_POST: JobPost = {
  title: '',
  department: '',
  employmentType: '',
  location: '',
  closingDate: '',
  description: '',
  requirements: []
}

const MOCK_POSTED_JOBS = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    employmentType: 'Full-time',
    location: 'San Francisco, CA',
    closingDate: '2026-09-15',
    postedDate: '2026-08-01',
    applicants: 42
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    employmentType: 'Full-time',
    location: 'Remote',
    closingDate: '2026-09-30',
    postedDate: '2026-08-05',
    applicants: 28
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    employmentType: 'Contract',
    location: 'New York, NY',
    closingDate: '2026-09-10',
    postedDate: '2026-07-28',
    applicants: 35
  },
  {
    id: '4',
    title: 'Marketing Coordinator',
    department: 'Marketing',
    employmentType: 'Full-time',
    location: 'Austin, TX',
    closingDate: '2026-09-20',
    postedDate: '2026-08-10',
    applicants: 19
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    employmentType: 'Full-time',
    location: 'Remote',
    closingDate: '2026-10-01',
    postedDate: '2026-08-12',
    applicants: 31
  }
]

export default function HiringPost() {
  const [jobPost, setJobPost] = useState<JobPost>(INITIAL_POST)
  const [newRequirement, setNewRequirement] = useState('')
  const [postedJobs] = useState(MOCK_POSTED_JOBS)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (field: keyof JobPost, value: string) => {
    setJobPost(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addRequirement = () => {
    if (newRequirement.trim()) {
      const requirement: Requirement = {
        id: Date.now().toString(),
        text: newRequirement.trim()
      }
      setJobPost(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirement]
      }))
      setNewRequirement('')
    }
  }

  const removeRequirement = (id: string) => {
    setJobPost(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req.id !== id)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission logic
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setJobPost(INITIAL_POST)
    }, 3000)
  }

  const isFormValid = () => {
    return (
      jobPost.title.trim() !== '' &&
      jobPost.department !== '' &&
      jobPost.employmentType !== '' &&
      jobPost.location.trim() !== '' &&
      jobPost.closingDate !== '' &&
      jobPost.description.trim() !== '' &&
      jobPost.requirements.length > 0
    )
  }

  return (
    <div data-testid="hiring-post" className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post New Vacancy</h1>
          <p className="mt-2 text-gray-600">
            Create a detailed job posting to attract qualified candidates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
              {/* Success Message */}
              {showSuccess && (
                <div data-testid="hiring-post-success" className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
                  ✓ Job posting created successfully!
                </div>
              )}

              {/* Job Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  id="title"
                  type="text"
                  data-testid="hiring-post-title"
                  value={jobPost.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Senior Frontend Engineer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Department and Employment Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    id="department"
                    data-testid="hiring-post-department"
                    value={jobPost.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type *
                  </label>
                  <select
                    id="employmentType"
                    data-testid="hiring-post-employment-type"
                    value={jobPost.employmentType}
                    onChange={(e) => handleInputChange('employmentType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Type</option>
                    {EMPLOYMENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location and Closing Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    id="location"
                    type="text"
                    data-testid="hiring-post-location"
                    value={jobPost.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., San Francisco, CA or Remote"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="closingDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Closing Date *
                  </label>
                  <input
                    id="closingDate"
                    type="date"
                    data-testid="hiring-post-closing-date"
                    value={jobPost.closingDate}
                    onChange={(e) => handleInputChange('closingDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  id="description"
                  data-testid="hiring-post-description"
                  value={jobPost.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a detailed description of the role, responsibilities, and what the candidate will be doing..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements *
                </label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      data-testid="hiring-post-requirement-input"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addRequirement()
                        }
                      }}
                      placeholder="Add a requirement (e.g., 5+ years of React experience)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      data-testid="hiring-post-add-requirement"
                      onClick={addRequirement}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  {jobPost.requirements.length > 0 && (
                    <ul data-testid="hiring-post-requirements-list" className="space-y-2">
                      {jobPost.requirements.map((req) => (
                        <li
                          key={req.id}
                          data-testid="hiring-post-requirement-item"
                          className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
                        >
                          <span className="text-gray-700">{req.text}</span>
                          <button
                            type="button"
                            data-testid={`hiring-post-remove-requirement-${req.id}`}
                            onClick={() => removeRequirement(req.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {jobPost.requirements.length === 0 && (
                    <p className="text-sm text-gray-500 italic">
                      Add at least one requirement to proceed
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  data-testid="hiring-post-submit"
                  disabled={!isFormValid()}
                  className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Post Vacancy
                </button>
                <button
                  type="button"
                  data-testid="hiring-post-cancel"
                  onClick={() => setJobPost(INITIAL_POST)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          {/* Recently Posted Jobs Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recently Posted
              </h2>
              <ul data-testid="hiring-post-recent-list" className="space-y-4">
                {postedJobs.map((job) => (
                  <li
                    key={job.id}
                    data-testid="hiring-post-recent-item"
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{job.department}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Closes: {new Date(job.closingDate).toLocaleDateString()}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {job.applicants} applicants
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
