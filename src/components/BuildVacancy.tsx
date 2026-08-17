/**
 * BuildVacancy — Job vacancy creation and management interface for hiring managers
 *
 * Features: vacancy form with validation, role/department selection, requirements editor, status management, preview
 *
 * Ticket: SCRUM-1016 | Branch: proto/SCRUM-1016
 */

import { useState } from 'react'

interface Vacancy {
  id: string
  title: string
  department: string
  location: string
  employmentType: 'full-time' | 'part-time' | 'contract' | 'temporary'
  level: string
  closingDate: string
  requirements: string[]
  responsibilities: string[]
  qualifications: string[]
  status: 'draft' | 'published' | 'closed'
  postedDate: string
  hiringManager: string
}

export default function BuildVacancy() {
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'list'>('form')
  const [formData, setFormData] = useState<Partial<Vacancy>>({
    title: '',
    department: '',
    location: '',
    employmentType: 'full-time',
    level: '',
    closingDate: '',
    status: 'draft'
  })
  const [requirements, setRequirements] = useState<string[]>([''])
  const [responsibilities, setResponsibilities] = useState<string[]>([''])
  const [qualifications, setQualifications] = useState<string[]>([''])
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const mockVacancies: Vacancy[] = [
    {
      id: 'vac-1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      employmentType: 'full-time',
      level: 'Senior',
      closingDate: '2026-09-30',
      requirements: ['5+ years of experience in software development', 'Strong knowledge of React and TypeScript', 'Experience with cloud platforms (AWS/Azure)'],
      responsibilities: ['Lead development of new features', 'Mentor junior developers', 'Code review and architecture decisions'],
      qualifications: ['Bachelor\'s degree in Computer Science or related field', 'Proven track record of delivering scalable applications'],
      status: 'published',
      postedDate: '2026-08-01',
      hiringManager: 'Sarah Johnson'
    },
    {
      id: 'vac-2',
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      employmentType: 'full-time',
      level: 'Mid',
      closingDate: '2026-09-15',
      requirements: ['3+ years of product management experience', 'Strong analytical and problem-solving skills', 'Experience with Agile methodologies'],
      responsibilities: ['Define product roadmap and strategy', 'Work with engineering and design teams', 'Gather and prioritize product requirements'],
      qualifications: ['MBA or equivalent experience', 'Technical background preferred'],
      status: 'published',
      postedDate: '2026-08-05',
      hiringManager: 'Michael Chen'
    },
    {
      id: 'vac-3',
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      employmentType: 'full-time',
      level: 'Mid',
      closingDate: '2026-10-01',
      requirements: ['4+ years of UX design experience', 'Proficiency in Figma and Adobe Creative Suite', 'Strong portfolio demonstrating user-centered design'],
      responsibilities: ['Create wireframes and prototypes', 'Conduct user research and usability testing', 'Collaborate with product and engineering teams'],
      qualifications: ['Bachelor\'s degree in Design, HCI, or related field', 'Experience with design systems'],
      status: 'published',
      postedDate: '2026-08-10',
      hiringManager: 'Emily Rodriguez'
    },
    {
      id: 'vac-4',
      title: 'Data Scientist',
      department: 'Data & Analytics',
      location: 'Boston, MA',
      employmentType: 'full-time',
      level: 'Senior',
      closingDate: '2026-09-20',
      requirements: ['PhD or Master\'s in Statistics, Computer Science, or related field', '5+ years of experience in data science', 'Strong programming skills in Python and R'],
      responsibilities: ['Build and deploy machine learning models', 'Analyze complex datasets', 'Present insights to stakeholders'],
      qualifications: ['Experience with deep learning frameworks (TensorFlow, PyTorch)', 'Strong communication skills'],
      status: 'draft',
      postedDate: '2026-08-15',
      hiringManager: 'David Kim'
    },
    {
      id: 'vac-5',
      title: 'HR Business Partner',
      department: 'Human Resources',
      location: 'Chicago, IL',
      employmentType: 'full-time',
      level: 'Senior',
      closingDate: '2026-08-31',
      requirements: ['7+ years of HR experience', 'Strong understanding of employment law', 'Experience with HRIS systems'],
      responsibilities: ['Partner with business leaders on HR strategy', 'Manage employee relations', 'Lead talent development initiatives'],
      qualifications: ['SHRM-CP or PHR certification', 'Experience in tech industry preferred'],
      status: 'closed',
      postedDate: '2026-07-20',
      hiringManager: 'Lisa Anderson'
    }
  ]

  const departments = ['Engineering', 'Product', 'Design', 'Data & Analytics', 'Marketing', 'Sales', 'Human Resources', 'Finance', 'Operations']
  const levels = ['Entry', 'Mid', 'Senior', 'Lead', 'Principal', 'Director', 'VP']

  const handleInputChange = (field: keyof Vacancy, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const addListItem = (type: 'requirements' | 'responsibilities' | 'qualifications') => {
    if (type === 'requirements') {
      setRequirements([...requirements, ''])
    } else if (type === 'responsibilities') {
      setResponsibilities([...responsibilities, ''])
    } else {
      setQualifications([...qualifications, ''])
    }
  }

  const updateListItem = (type: 'requirements' | 'responsibilities' | 'qualifications', index: number, value: string) => {
    if (type === 'requirements') {
      const updated = [...requirements]
      updated[index] = value
      setRequirements(updated)
    } else if (type === 'responsibilities') {
      const updated = [...responsibilities]
      updated[index] = value
      setResponsibilities(updated)
    } else {
      const updated = [...qualifications]
      updated[index] = value
      setQualifications(updated)
    }
  }

  const removeListItem = (type: 'requirements' | 'responsibilities' | 'qualifications', index: number) => {
    if (type === 'requirements') {
      setRequirements(requirements.filter((_, i) => i !== index))
    } else if (type === 'responsibilities') {
      setResponsibilities(responsibilities.filter((_, i) => i !== index))
    } else {
      setQualifications(qualifications.filter((_, i) => i !== index))
    }
  }

  const validateForm = (): boolean => {
    const errors: string[] = []

    if (!formData.title || formData.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters')
    }

    if (!formData.department) {
      errors.push('Department is required')
    }

    if (!formData.closingDate) {
      errors.push('Closing date is required')
    } else {
      const closingDate = new Date(formData.closingDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (closingDate < today) {
        errors.push('Closing date must be in the future')
      }
    }

    const validReqs = requirements.filter(r => r.trim().length > 0)
    if (validReqs.length === 0) {
      errors.push('At least one requirement is needed')
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleSaveDraft = () => {
    if (validateForm()) {
      alert('Vacancy saved as draft')
      setValidationErrors([])
    }
  }

  const handlePublish = () => {
    if (validateForm()) {
      alert('Vacancy published successfully')
      setValidationErrors([])
      setActiveTab('list')
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'closed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section data-testid="build-vacancy" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vacancy Management</h1>
          <p className="text-gray-600">Create and manage job postings for internal positions</p>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav data-testid="build-vacancy-tabs" className="flex space-x-8">
            <button
              data-testid="build-vacancy-tab-form"
              onClick={() => setActiveTab('form')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'form'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Create Vacancy
            </button>
            <button
              data-testid="build-vacancy-tab-preview"
              onClick={() => setActiveTab('preview')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'preview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Preview
            </button>
            <button
              data-testid="build-vacancy-tab-list"
              onClick={() => setActiveTab('list')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Vacancies
            </button>
          </nav>
        </div>

        {activeTab === 'form' && (
          <div data-testid="build-vacancy-form" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vacancy Details</h2>

            {validationErrors.length > 0 && (
              <div data-testid="build-vacancy-errors" className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-red-800 mb-2">Please correct the following errors:</h3>
                <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                  {validationErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  id="title"
                  data-testid="build-vacancy-title"
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select
                  id="department"
                  data-testid="build-vacancy-department"
                  value={formData.department || ''}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  id="location"
                  data-testid="build-vacancy-location"
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Remote, New York, NY"
                />
              </div>

              <div>
                <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type
                </label>
                <select
                  id="employmentType"
                  data-testid="build-vacancy-employment-type"
                  value={formData.employmentType || 'full-time'}
                  onChange={(e) => handleInputChange('employmentType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                </select>
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <select
                  id="level"
                  data-testid="build-vacancy-level"
                  value={formData.level || ''}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select level</option>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="closingDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Closing Date *
                </label>
                <input
                  id="closingDate"
                  data-testid="build-vacancy-closing-date"
                  type="date"
                  value={formData.closingDate || ''}
                  onChange={(e) => handleInputChange('closingDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Requirements *</label>
                <button
                  data-testid="build-vacancy-add-requirement"
                  onClick={() => addListItem('requirements')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add Requirement
                </button>
              </div>
              <div data-testid="build-vacancy-requirements-list" className="space-y-2">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      data-testid={`build-vacancy-requirement-${index}`}
                      type="text"
                      value={req}
                      onChange={(e) => updateListItem('requirements', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 5+ years of experience in software development"
                    />
                    {requirements.length > 1 && (
                      <button
                        data-testid={`build-vacancy-remove-requirement-${index}`}
                        onClick={() => removeListItem('requirements', index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
                <button
                  data-testid="build-vacancy-add-responsibility"
                  onClick={() => addListItem('responsibilities')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add Responsibility
                </button>
              </div>
              <div data-testid="build-vacancy-responsibilities-list" className="space-y-2">
                {responsibilities.map((resp, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      data-testid={`build-vacancy-responsibility-${index}`}
                      type="text"
                      value={resp}
                      onChange={(e) => updateListItem('responsibilities', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Lead development of new features"
                    />
                    {responsibilities.length > 1 && (
                      <button
                        data-testid={`build-vacancy-remove-responsibility-${index}`}
                        onClick={() => removeListItem('responsibilities', index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Qualifications</label>
                <button
                  data-testid="build-vacancy-add-qualification"
                  onClick={() => addListItem('qualifications')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add Qualification
                </button>
              </div>
              <div data-testid="build-vacancy-qualifications-list" className="space-y-2">
                {qualifications.map((qual, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      data-testid={`build-vacancy-qualification-${index}`}
                      type="text"
                      value={qual}
                      onChange={(e) => updateListItem('qualifications', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Bachelor's degree in Computer Science"
                    />
                    {qualifications.length > 1 && (
                      <button
                        data-testid={`build-vacancy-remove-qualification-${index}`}
                        onClick={() => removeListItem('qualifications', index)}
                        className="px-3 py-2 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                data-testid="build-vacancy-save-draft"
                onClick={handleSaveDraft}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Save as Draft
              </button>
              <button
                data-testid="build-vacancy-publish"
                onClick={handlePublish}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Publish Vacancy
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div data-testid="build-vacancy-preview" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.title || 'Untitled Position'}</h2>
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
              <span>{formData.department || 'N/A'}</span>
              <span>•</span>
              <span>{formData.location || 'N/A'}</span>
              <span>•</span>
              <span className="capitalize">{formData.employmentType || 'N/A'}</span>
              {formData.level && (
                <>
                  <span>•</span>
                  <span>{formData.level}</span>
                </>
              )}
            </div>

            {formData.closingDate && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Application Deadline:</strong> {new Date(formData.closingDate).toLocaleDateString()}
                </p>
              </div>
            )}

            {requirements.filter(r => r.trim()).length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {requirements.filter(r => r.trim()).map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {responsibilities.filter(r => r.trim()).length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {responsibilities.filter(r => r.trim()).map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {qualifications.filter(q => q.trim()).length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Qualifications</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {qualifications.filter(q => q.trim()).map((qual, idx) => (
                    <li key={idx}>{qual}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'list' && (
          <div data-testid="build-vacancy-list">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">All Vacancies ({mockVacancies.length})</h2>
              <button
                data-testid="build-vacancy-new"
                onClick={() => setActiveTab('form')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
              >
                + New Vacancy
              </button>
            </div>

            <div className="space-y-4">
              {mockVacancies.map((vacancy) => (
                <div
                  key={vacancy.id}
                  data-testid="build-vacancy-item"
                  className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{vacancy.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>{vacancy.department}</span>
                        <span>•</span>
                        <span>{vacancy.location}</span>
                        <span>•</span>
                        <span className="capitalize">{vacancy.employmentType.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(vacancy.status)}`}>
                      {vacancy.status.charAt(0).toUpperCase() + vacancy.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Posted:</span>{' '}
                      <span className="text-gray-900">{new Date(vacancy.postedDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Closing:</span>{' '}
                      <span className="text-gray-900">{new Date(vacancy.closingDate).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Level:</span>{' '}
                      <span className="text-gray-900">{vacancy.level}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Hiring Manager:</span>{' '}
                      <span className="text-gray-900">{vacancy.hiringManager}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <button
                      data-testid="build-vacancy-view"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details
                    </button>
                    <button
                      data-testid="build-vacancy-edit"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Edit
                    </button>
                    {vacancy.status === 'published' && (
                      <button
                        data-testid="build-vacancy-close"
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Close Vacancy
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
