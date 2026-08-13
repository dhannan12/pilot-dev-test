/**
 * BuildTenantScreening — Tenant screening process interface with application review and credit check workflow
 *
 * Features: Application status tracking, Credit score display, Background check results, Income verification, Reference validation
 *
 * Ticket: SCRUM-714 | Branch: proto/SCRUM-703
 */

import React, { useState } from 'react'

interface TenantApplication {
  id: string
  applicantName: string
  email: string
  phone: string
  propertyAddress: string
  monthlyIncome: number
  creditScore: number
  employmentStatus: string
  applicationDate: string
  status: 'pending' | 'approved' | 'rejected' | 'under-review'
  backgroundCheck: 'passed' | 'failed' | 'pending'
  incomeVerified: boolean
  referencesChecked: boolean
  notes: string
}

const MOCK_APPLICATIONS: TenantApplication[] = [
  {
    id: 'APP-001',
    applicantName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    propertyAddress: '123 Main St, Apt 4B',
    monthlyIncome: 5500,
    creditScore: 720,
    employmentStatus: 'Full-time',
    applicationDate: '2026-08-01',
    status: 'approved',
    backgroundCheck: 'passed',
    incomeVerified: true,
    referencesChecked: true,
    notes: 'Excellent credit history and stable employment'
  },
  {
    id: 'APP-002',
    applicantName: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    propertyAddress: '456 Oak Ave, Unit 2A',
    monthlyIncome: 4200,
    creditScore: 650,
    employmentStatus: 'Contract',
    applicationDate: '2026-08-05',
    status: 'under-review',
    backgroundCheck: 'pending',
    incomeVerified: true,
    referencesChecked: false,
    notes: 'Awaiting background check results'
  },
  {
    id: 'APP-003',
    applicantName: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '(555) 345-6789',
    propertyAddress: '789 Pine Rd, Studio 5',
    monthlyIncome: 6800,
    creditScore: 780,
    employmentStatus: 'Full-time',
    applicationDate: '2026-08-07',
    status: 'pending',
    backgroundCheck: 'passed',
    incomeVerified: true,
    referencesChecked: true,
    notes: 'High income and excellent credit score'
  },
  {
    id: 'APP-004',
    applicantName: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '(555) 456-7890',
    propertyAddress: '321 Elm St, Apt 3C',
    monthlyIncome: 3800,
    creditScore: 580,
    employmentStatus: 'Part-time',
    applicationDate: '2026-08-09',
    status: 'rejected',
    backgroundCheck: 'failed',
    incomeVerified: false,
    referencesChecked: true,
    notes: 'Insufficient income and failed background check'
  },
  {
    id: 'APP-005',
    applicantName: 'Lisa Martinez',
    email: 'lisa.martinez@email.com',
    phone: '(555) 567-8901',
    propertyAddress: '654 Maple Dr, Unit 1B',
    monthlyIncome: 5200,
    creditScore: 695,
    employmentStatus: 'Full-time',
    applicationDate: '2026-08-10',
    status: 'under-review',
    backgroundCheck: 'passed',
    incomeVerified: true,
    referencesChecked: false,
    notes: 'Good credit, awaiting final reference checks'
  },
  {
    id: 'APP-006',
    applicantName: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '(555) 678-9012',
    propertyAddress: '987 Cedar Ln, Apt 6A',
    monthlyIncome: 7200,
    creditScore: 750,
    employmentStatus: 'Self-employed',
    applicationDate: '2026-08-11',
    status: 'pending',
    backgroundCheck: 'pending',
    incomeVerified: true,
    referencesChecked: true,
    notes: 'Self-employed with strong financial records'
  },
  {
    id: 'APP-007',
    applicantName: 'Amanda Brown',
    email: 'amanda.brown@email.com',
    phone: '(555) 789-0123',
    propertyAddress: '147 Birch Ave, Studio 3',
    monthlyIncome: 4500,
    creditScore: 710,
    employmentStatus: 'Full-time',
    applicationDate: '2026-08-12',
    status: 'approved',
    backgroundCheck: 'passed',
    incomeVerified: true,
    referencesChecked: true,
    notes: 'Approved with standard lease terms'
  }
]

export default function BuildTenantScreening() {
  const [applications] = useState<TenantApplication[]>(MOCK_APPLICATIONS)
  const [selectedApp, setSelectedApp] = useState<TenantApplication | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300'
    }
  }

  const getCheckColor = (check: string) => {
    switch (check) {
      case 'passed':
        return 'text-green-600 font-semibold'
      case 'failed':
        return 'text-red-600 font-semibold'
      default:
        return 'text-gray-500 font-semibold'
    }
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 740) return 'text-green-600 font-bold'
    if (score >= 670) return 'text-blue-600 font-bold'
    if (score >= 580) return 'text-yellow-600 font-bold'
    return 'text-red-600 font-bold'
  }

  const filteredApplications = filterStatus === 'all'
    ? applications
    : applications.filter(app => app.status === filterStatus)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tenant Screening Process</h1>
          <p className="text-gray-600">Review and manage tenant applications, credit checks, and background verification</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Applications</div>
            <div className="text-3xl font-bold text-gray-900">{applications.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Approved</div>
            <div className="text-3xl font-bold text-green-600">
              {applications.filter(a => a.status === 'approved').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Under Review</div>
            <div className="text-3xl font-bold text-yellow-600">
              {applications.filter(a => a.status === 'under-review').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-blue-600">
              {applications.filter(a => a.status === 'pending').length}
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Applications
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('under-review')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'under-review'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Under Review
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'approved'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'rejected'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications List */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredApplications.length} of {applications.length} applications
              </p>
            </div>
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedApp?.id === app.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{app.applicantName}</h3>
                      <p className="text-sm text-gray-600">{app.propertyAddress}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                      {app.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Credit: </span>
                      <span className={getCreditScoreColor(app.creditScore)}>{app.creditScore}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Income: </span>
                      <span className="font-semibold text-gray-900">${app.monthlyIncome.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Applied: {app.applicationDate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
            </div>
            {selectedApp ? (
              <div className="p-6 space-y-6">
                {/* Applicant Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Applicant Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-semibold text-gray-900">{selectedApp.applicantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-semibold text-gray-900">{selectedApp.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-semibold text-gray-900">{selectedApp.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property:</span>
                      <span className="font-semibold text-gray-900">{selectedApp.propertyAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Application ID:</span>
                      <span className="font-semibold text-gray-900">{selectedApp.id}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Financial Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Income:</span>
                      <span className="font-semibold text-gray-900">${selectedApp.monthlyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Credit Score:</span>
                      <span className={getCreditScoreColor(selectedApp.creditScore)}>{selectedApp.creditScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employment Status:</span>
                      <span className="font-semibold text-gray-900">{selectedApp.employmentStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Screening Status */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Screening Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Background Check:</span>
                      <span className={`text-sm ${getCheckColor(selectedApp.backgroundCheck)}`}>
                        {selectedApp.backgroundCheck.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Income Verified:</span>
                      <span className={`text-sm font-semibold ${selectedApp.incomeVerified ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedApp.incomeVerified ? '✓ YES' : '✗ NO'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">References Checked:</span>
                      <span className={`text-sm font-semibold ${selectedApp.referencesChecked ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedApp.referencesChecked ? '✓ YES' : '✗ NO'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Application Status */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Application Status</h3>
                  <div className="mb-3">
                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold border inline-block ${getStatusColor(selectedApp.status)}`}>
                      {selectedApp.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 font-medium mb-1">Notes:</p>
                    <p className="text-sm text-gray-600">{selectedApp.notes}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 pt-4 flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Approve Application
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                    Reject Application
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-lg">Select an application to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
