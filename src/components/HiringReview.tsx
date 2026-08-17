/**
 * HiringReview — Hiring Manager interface to review job applications and update candidate status
 *
 * Features: application list view, candidate details, status updates, filtering, notes and feedback
 *
 * Ticket: SCRUM-997 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface Application {
  id: string
  candidateName: string
  jobTitle: string
  department: string
  appliedDate: string
  status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'accepted'
  email: string
  phone: string
  experience: string
  education: string
  notes: string
}

const mockApplications: Application[] = [
  {
    id: '1',
    candidateName: 'Sarah Johnson',
    jobTitle: 'Senior Software Engineer',
    department: 'Engineering',
    appliedDate: '2026-08-10',
    status: 'reviewing',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    experience: '7 years of full-stack development experience with React, TypeScript, Node.js, and AWS. Previously worked at TechCorp and StartupXYZ.',
    education: 'Bachelor of Science in Computer Science, MIT',
    notes: 'Strong technical background. Good cultural fit based on initial screening.'
  },
  {
    id: '2',
    candidateName: 'Michael Chen',
    jobTitle: 'Product Manager',
    department: 'Product',
    appliedDate: '2026-08-12',
    status: 'interview',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    experience: '5 years of product management experience at Fortune 500 companies. Led successful launches of 3 major products with $10M+ revenue impact.',
    education: 'MBA from Stanford, BS in Engineering from UC Berkeley',
    notes: 'Excellent communication skills. Scheduled for final round interview on 8/20.'
  },
  {
    id: '3',
    candidateName: 'Emily Rodriguez',
    jobTitle: 'UX Designer',
    department: 'Design',
    appliedDate: '2026-08-08',
    status: 'offer',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    experience: '6 years of UX design experience. Portfolio includes award-winning mobile apps and enterprise software. Expert in Figma and user research.',
    education: 'Master of Design in Human-Computer Interaction, Carnegie Mellon',
    notes: 'Outstanding portfolio. Team feedback was unanimously positive. Offer extended at $120K.'
  },
  {
    id: '4',
    candidateName: 'David Park',
    jobTitle: 'Senior Software Engineer',
    department: 'Engineering',
    appliedDate: '2026-08-05',
    status: 'rejected',
    email: 'david.park@email.com',
    phone: '+1 (555) 456-7890',
    experience: '3 years of frontend development. Experience with React and Vue.js. Looking to transition to full-stack role.',
    education: 'Bachelor of Arts in Computer Science, UCLA',
    notes: 'Good potential but lacks required backend experience. Recommended to apply for mid-level position.'
  },
  {
    id: '5',
    candidateName: 'Jennifer Williams',
    jobTitle: 'Product Manager',
    department: 'Product',
    appliedDate: '2026-08-14',
    status: 'pending',
    email: 'jennifer.williams@email.com',
    phone: '+1 (555) 567-8901',
    experience: '8 years in product management. Previously at Google and Amazon. Led cross-functional teams of 20+ people. Strong data-driven approach.',
    education: 'MBA from Harvard Business School, BS in Economics from Yale',
    notes: 'Just submitted. Need to schedule initial screening call.'
  },
  {
    id: '6',
    candidateName: 'Robert Taylor',
    jobTitle: 'Data Scientist',
    department: 'Analytics',
    appliedDate: '2026-08-11',
    status: 'reviewing',
    email: 'robert.taylor@email.com',
    phone: '+1 (555) 678-9012',
    experience: '4 years of data science experience. PhD research in machine learning. Proficient in Python, R, TensorFlow, and PyTorch.',
    education: 'PhD in Computer Science, Stanford University',
    notes: 'Strong academic background. Reviewing portfolio of ML projects.'
  },
  {
    id: '7',
    candidateName: 'Amanda White',
    jobTitle: 'Marketing Manager',
    department: 'Marketing',
    appliedDate: '2026-08-09',
    status: 'interview',
    email: 'amanda.white@email.com',
    phone: '+1 (555) 789-0123',
    experience: '6 years in digital marketing. Managed campaigns with $5M+ budgets. Expert in SEO, SEM, and content strategy.',
    education: 'Bachelor of Business Administration, NYU',
    notes: 'Impressive campaign results. Second interview scheduled with CMO.'
  }
]

const statusColors = {
  pending: 'bg-gray-100 text-gray-800 border-gray-300',
  reviewing: 'bg-blue-100 text-blue-800 border-blue-300',
  interview: 'bg-purple-100 text-purple-800 border-purple-300',
  offer: 'bg-green-100 text-green-800 border-green-300',
  rejected: 'bg-red-100 text-red-800 border-red-300',
  accepted: 'bg-emerald-100 text-emerald-800 border-emerald-300'
}

export default function HiringReview() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [noteText, setNoteText] = useState<string>('')

  const departments = Array.from(new Set(mockApplications.map(app => app.department)))
  const statuses = ['pending', 'reviewing', 'interview', 'offer', 'rejected', 'accepted']

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || app.department === filterDepartment
    return matchesStatus && matchesDepartment
  })

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ))
    if (selectedApplication && selectedApplication.id === applicationId) {
      setSelectedApplication({ ...selectedApplication, status: newStatus })
    }
  }

  const handleAddNote = () => {
    if (!selectedApplication || !noteText.trim()) return

    const updatedNote = selectedApplication.notes
      ? `${selectedApplication.notes}\n\n[${new Date().toLocaleDateString()}] ${noteText}`
      : `[${new Date().toLocaleDateString()}] ${noteText}`

    setApplications(applications.map(app =>
      app.id === selectedApplication.id ? { ...app, notes: updatedNote } : app
    ))
    setSelectedApplication({ ...selectedApplication, notes: updatedNote })
    setNoteText('')
  }

  const handleSelectApplication = (app: Application) => {
    setSelectedApplication(app)
    setNoteText('')
  }

  return (
    <div data-testid="hiringreview" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Review</h1>
          <p className="text-gray-600">Review candidate applications and manage hiring decisions</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                data-testid="hiringreview-filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Department
              </label>
              <select
                data-testid="hiringreview-filter-department"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{filteredApplications.length}</span> application{filteredApplications.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Applications</h2>
              </div>
              <div data-testid="hiringreview-list" className="divide-y divide-gray-200 max-h-[calc(100vh-320px)] overflow-y-auto">
                {filteredApplications.map(app => (
                  <div
                    key={app.id}
                    data-testid="hiringreview-item"
                    onClick={() => handleSelectApplication(app)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedApplication?.id === app.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{app.candidateName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[app.status]}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{app.jobTitle}</p>
                    <p className="text-xs text-gray-500">{app.department} • Applied {app.appliedDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="lg:col-span-2">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {selectedApplication.candidateName}
                      </h2>
                      <p className="text-lg text-gray-600">{selectedApplication.jobTitle}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[selectedApplication.status]}`}>
                      {selectedApplication.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2 text-gray-900">{selectedApplication.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <span className="ml-2 text-gray-900">{selectedApplication.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Department:</span>
                      <span className="ml-2 text-gray-900">{selectedApplication.department}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Applied:</span>
                      <span className="ml-2 text-gray-900">{selectedApplication.appliedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Update Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {statuses.map(status => (
                        <button
                          key={status}
                          data-testid={`hiringreview-status-${status}`}
                          onClick={() => handleStatusChange(selectedApplication.id, status as Application['status'])}
                          className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${
                            selectedApplication.status === status
                              ? statusColors[status as Application['status']]
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Experience</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      {selectedApplication.experience}
                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Education</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      {selectedApplication.education}
                    </p>
                  </div>

                  {/* Notes */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Notes & Feedback</h3>
                    {selectedApplication.notes && (
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md mb-3 whitespace-pre-wrap">
                        {selectedApplication.notes}
                      </div>
                    )}
                    <div className="space-y-2">
                      <textarea
                        data-testid="hiringreview-note-input"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add a note or feedback..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                      />
                      <button
                        data-testid="hiringreview-add-note"
                        onClick={handleAddNote}
                        disabled={!noteText.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Application Selected</h3>
                <p className="text-gray-600">Select an application from the list to view details and update status</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
