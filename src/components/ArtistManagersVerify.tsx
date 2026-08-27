/**
 * ArtistManagersVerify — Identity verification portal for artist managers to access chart performance data
 *
 * Features: identity verification form, document upload, manager credentials validation, verified status tracking, access request management
 *
 * Ticket: SCRUM-1226 | Branch: proto/SCRUM-1223
 */

import React, { useState } from 'react'

interface VerificationRequest {
  id: string
  managerName: string
  email: string
  artistName: string
  managerId: string
  company: string
  status: 'pending' | 'verified' | 'rejected'
  submittedDate: string
}

const mockVerificationRequests: VerificationRequest[] = [
  {
    id: 'VR001',
    managerName: 'Sarah Mitchell',
    email: 'sarah.mitchell@startalent.com',
    artistName: 'Luna Rose',
    managerId: 'MGR-45892',
    company: 'Star Talent Agency',
    status: 'verified',
    submittedDate: '2026-08-20'
  },
  {
    id: 'VR002',
    managerName: 'David Chen',
    email: 'david.chen@globalmusic.com',
    artistName: 'The Crimson Wave',
    managerId: 'MGR-67234',
    company: 'Global Music Management',
    status: 'verified',
    submittedDate: '2026-08-22'
  },
  {
    id: 'VR003',
    managerName: 'Rebecca Torres',
    email: 'rebecca.torres@indieartists.com',
    artistName: 'Echo Valley',
    managerId: 'MGR-89123',
    company: 'Indie Artists Collective',
    status: 'pending',
    submittedDate: '2026-08-25'
  },
  {
    id: 'VR004',
    managerName: 'Marcus Johnson',
    email: 'marcus.j@urbanbeats.com',
    artistName: 'DJ Nexus',
    managerId: 'MGR-34567',
    company: 'Urban Beats Management',
    status: 'verified',
    submittedDate: '2026-08-19'
  },
  {
    id: 'VR005',
    managerName: 'Elena Popov',
    email: 'elena.popov@rhythmhouse.com',
    artistName: 'Classical Dreams Ensemble',
    managerId: 'MGR-91245',
    company: 'Rhythm House Artists',
    status: 'pending',
    submittedDate: '2026-08-26'
  },
  {
    id: 'VR006',
    managerName: 'James Sullivan',
    email: 'james.sullivan@rocklegends.com',
    artistName: 'Iron Phoenix',
    managerId: 'MGR-78901',
    company: 'Rock Legends Inc',
    status: 'rejected',
    submittedDate: '2026-08-21'
  }
]

export default function ArtistManagersVerify() {
  const [formData, setFormData] = useState({
    managerName: '',
    email: '',
    artistName: '',
    managerId: '',
    company: ''
  })
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Verification request submitted:', formData)
    // Reset form
    setFormData({
      managerName: '',
      email: '',
      artistName: '',
      managerId: '',
      company: ''
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const filteredRequests = filterStatus === 'all'
    ? mockVerificationRequests
    : mockVerificationRequests.filter(req => req.status === filterStatus)

  return (
    <div data-testid="artistmanagersverify" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Artist Manager Identity Verification
          </h1>
          <p className="text-gray-600">
            Verify your identity to access chart performance data for your artists
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Submit Verification Request
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="managerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Manager Name *
                </label>
                <input
                  id="managerName"
                  name="managerName"
                  type="text"
                  data-testid="artistmanagersverify-managername"
                  value={formData.managerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="artistmanagersverify-email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="manager@company.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="artistName" className="block text-sm font-medium text-gray-700 mb-1">
                  Artist Name *
                </label>
                <input
                  id="artistName"
                  name="artistName"
                  type="text"
                  data-testid="artistmanagersverify-artistname"
                  value={formData.artistName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter artist or band name"
                  required
                />
              </div>
              <div>
                <label htmlFor="managerId" className="block text-sm font-medium text-gray-700 mb-1">
                  Manager ID *
                </label>
                <input
                  id="managerId"
                  name="managerId"
                  type="text"
                  data-testid="artistmanagersverify-managerid"
                  value={formData.managerId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="MGR-XXXXX"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Management Company *
              </label>
              <input
                id="company"
                name="company"
                type="text"
                data-testid="artistmanagersverify-company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your management company name"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                data-testid="artistmanagersverify-reset"
                onClick={() => setFormData({
                  managerName: '',
                  email: '',
                  artistName: '',
                  managerId: '',
                  company: ''
                })}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                data-testid="artistmanagersverify-submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Verification
              </button>
            </div>
          </form>
        </div>

        {/* Verification Requests List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Verification Requests
            </h2>
            <div className="flex space-x-2">
              <button
                data-testid="artistmanagersverify-filter-all"
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                data-testid="artistmanagersverify-filter-pending"
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                data-testid="artistmanagersverify-filter-verified"
                onClick={() => setFilterStatus('verified')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'verified'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Verified
              </button>
              <button
                data-testid="artistmanagersverify-filter-rejected"
                onClick={() => setFilterStatus('rejected')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'rejected'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          <div data-testid="artistmanagersverify-list" className="space-y-3">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                data-testid="artistmanagersverify-item"
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {request.managerName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'verified'
                            ? 'bg-green-100 text-green-800'
                            : request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Email:</span> {request.email}
                      </div>
                      <div>
                        <span className="font-medium">Artist:</span> {request.artistName}
                      </div>
                      <div>
                        <span className="font-medium">Manager ID:</span> {request.managerId}
                      </div>
                      <div>
                        <span className="font-medium">Company:</span> {request.company}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Submitted: {request.submittedDate}
                    </div>
                  </div>
                  {request.status === 'verified' && (
                    <button
                      data-testid="artistmanagersverify-access"
                      className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Access Data
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No verification requests found for the selected status.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
