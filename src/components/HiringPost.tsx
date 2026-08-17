/**
 * HiringPost — Hiring Manager interface to post new job vacancies with requirements and closing dates
 *
 * Features: job title input, department selection, requirements editor, closing date picker, posting form
 *
 * Ticket: SCRUM-996 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface JobPosting {
  id: string
  title: string
  department: string
  requirements: string
  closingDate: string
  postedDate: string
  status: 'draft' | 'active' | 'closed'
}

const mockPostedJobs: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    requirements: 'Bachelor\'s degree in Computer Science or related field. 5+ years of experience in software development. Proficiency in React, TypeScript, and Node.js. Strong problem-solving skills and ability to work in a team environment.',
    closingDate: '2026-09-15',
    postedDate: '2026-08-01',
    status: 'active'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    requirements: 'MBA or equivalent experience. 3+ years in product management. Experience with agile methodologies. Strong analytical and communication skills. Track record of successful product launches.',
    closingDate: '2026-09-20',
    postedDate: '2026-08-05',
    status: 'active'
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    requirements: 'Bachelor\'s degree in Design, HCI or related field. 4+ years of UX design experience. Proficiency in Figma, Sketch, or Adobe XD. Strong portfolio demonstrating user-centered design process. Excellent visual design skills.',
    closingDate: '2026-08-30',
    postedDate: '2026-07-20',
    status: 'active'
  },
  {
    id: '4',
    title: 'Data Analyst',
    department: 'Analytics',
    requirements: 'Bachelor\'s degree in Statistics, Mathematics, or related field. 3+ years of data analysis experience. Proficiency in SQL, Python, and data visualization tools. Strong analytical thinking and attention to detail.',
    closingDate: '2026-09-10',
    postedDate: '2026-08-10',
    status: 'active'
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    department: 'Marketing',
    requirements: 'Bachelor\'s degree in Marketing or related field. 2+ years in digital marketing. Experience with SEO, SEM, and social media campaigns. Excellent written and verbal communication skills. Creative thinking and project management abilities.',
    closingDate: '2026-09-25',
    postedDate: '2026-08-12',
    status: 'active'
  }
]

const departments = [
  'Engineering',
  'Product',
  'Design',
  'Analytics',
  'Marketing',
  'Sales',
  'Operations',
  'HR',
  'Finance',
  'Customer Success'
]

export default function HiringPost() {
  const [postedJobs, setPostedJobs] = useState<JobPosting[]>(mockPostedJobs)
  const [showForm, setShowForm] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    requirements: '',
    closingDate: ''
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.department || !formData.requirements || !formData.closingDate) {
      alert('Please fill in all fields')
      return
    }

    const newJob: JobPosting = {
      id: Date.now().toString(),
      title: formData.title,
      department: formData.department,
      requirements: formData.requirements,
      closingDate: formData.closingDate,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active'
    }

    setPostedJobs(prev => [newJob, ...prev])
    setFormData({ title: '', department: '', requirements: '', closingDate: '' })
    setShowForm(false)
  }

  const handleCancel = () => {
    setFormData({ title: '', department: '', requirements: '', closingDate: '' })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    setPostedJobs(prev => prev.filter(job => job.id !== id))
  }

  return (
    <section data-testid="hiringpost" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Post Job Vacancy</h1>
              <p className="text-gray-600 mt-2">Create and manage internal job postings</p>
            </div>
            {!showForm && (
              <button
                data-testid="hiringpost-create"
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                + New Vacancy
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Vacancy</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    data-testid="hiringpost-title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    data-testid="hiringpost-department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="closingDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Closing Date *
                </label>
                <input
                  type="date"
                  id="closingDate"
                  name="closingDate"
                  data-testid="hiringpost-closingdate"
                  value={formData.closingDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Requirements *
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  data-testid="hiringpost-requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter detailed job requirements, qualifications, and responsibilities..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  data-testid="hiringpost-submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Post Vacancy
                </button>
                <button
                  type="button"
                  data-testid="hiringpost-cancel"
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Posted Vacancies</h2>
          
          {postedJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No vacancies posted yet</p>
              <p className="text-sm mt-2">Click "New Vacancy" to create your first job posting</p>
            </div>
          ) : (
            <div data-testid="hiringpost-list" className="space-y-4">
              {postedJobs.map(job => (
                <div
                  key={job.id}
                  data-testid="hiringpost-item"
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <span className="font-medium">Department:</span>
                          <span className="ml-1">{job.department}</span>
                        </span>
                        <span className="flex items-center">
                          <span className="font-medium">Posted:</span>
                          <span className="ml-1">{job.postedDate}</span>
                        </span>
                        <span className="flex items-center">
                          <span className="font-medium">Closes:</span>
                          <span className="ml-1">{job.closingDate}</span>
                        </span>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{job.requirements}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      data-testid="hiringpost-delete"
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 font-medium text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
