/**
 * PropertyStreamline — Tenant screening and maintenance request management dashboard
 *
 * Features: tenant application review, maintenance request routing, property manager approval workflow, screening status tracking, assignment delegation
 *
 * Ticket: SCRUM-708 | Branch: proto/SCRUM-703
 */

import React, { useState } from 'react'

interface TenantApplication {
  id: string
  applicantName: string
  propertyAddress: string
  applicationDate: string
  creditScore: number
  income: number
  status: 'pending' | 'approved' | 'rejected'
  employmentStatus: string
}

interface MaintenanceRequest {
  id: string
  propertyAddress: string
  tenantName: string
  requestType: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  description: string
  submittedDate: string
  status: 'pending_review' | 'approved' | 'assigned' | 'rejected'
  assignedTo?: string
}

const mockTenantApplications: TenantApplication[] = [
  {
    id: 'TA-001',
    applicantName: 'Sarah Johnson',
    propertyAddress: '1234 Oak Street, Apt 2B',
    applicationDate: '2026-08-10',
    creditScore: 720,
    income: 65000,
    status: 'pending',
    employmentStatus: 'Full-time Software Engineer'
  },
  {
    id: 'TA-002',
    applicantName: 'Michael Chen',
    propertyAddress: '5678 Maple Avenue, Unit 301',
    applicationDate: '2026-08-09',
    creditScore: 680,
    income: 58000,
    status: 'pending',
    employmentStatus: 'Full-time Marketing Manager'
  },
  {
    id: 'TA-003',
    applicantName: 'Emily Rodriguez',
    propertyAddress: '9012 Pine Boulevard, Suite 4A',
    applicationDate: '2026-08-08',
    creditScore: 750,
    income: 72000,
    status: 'approved',
    employmentStatus: 'Full-time Data Analyst'
  },
  {
    id: 'TA-004',
    applicantName: 'David Thompson',
    propertyAddress: '3456 Elm Court, Apt 12',
    applicationDate: '2026-08-07',
    creditScore: 620,
    income: 45000,
    status: 'rejected',
    employmentStatus: 'Part-time Retail Associate'
  },
  {
    id: 'TA-005',
    applicantName: 'Jessica Williams',
    propertyAddress: '7890 Cedar Lane, Unit 5C',
    applicationDate: '2026-08-11',
    creditScore: 695,
    income: 61000,
    status: 'pending',
    employmentStatus: 'Full-time Nurse'
  },
  {
    id: 'TA-006',
    applicantName: 'Robert Martinez',
    propertyAddress: '2345 Birch Drive, Apt 8D',
    applicationDate: '2026-08-12',
    creditScore: 710,
    income: 68000,
    status: 'pending',
    employmentStatus: 'Full-time Accountant'
  }
]

const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'MR-001',
    propertyAddress: '1234 Oak Street, Apt 2B',
    tenantName: 'John Davis',
    requestType: 'Plumbing',
    priority: 'high',
    description: 'Kitchen sink is leaking and causing water damage',
    submittedDate: '2026-08-12',
    status: 'pending_review'
  },
  {
    id: 'MR-002',
    propertyAddress: '5678 Maple Avenue, Unit 301',
    tenantName: 'Anna Smith',
    requestType: 'HVAC',
    priority: 'urgent',
    description: 'Air conditioning not working during heat wave',
    submittedDate: '2026-08-13',
    status: 'pending_review'
  },
  {
    id: 'MR-003',
    propertyAddress: '9012 Pine Boulevard, Suite 4A',
    tenantName: 'Carlos Ramirez',
    requestType: 'Electrical',
    priority: 'medium',
    description: 'Bedroom outlet not functioning properly',
    submittedDate: '2026-08-11',
    status: 'approved',
    assignedTo: 'Mike\'s Electric Services'
  },
  {
    id: 'MR-004',
    propertyAddress: '3456 Elm Court, Apt 12',
    tenantName: 'Linda Brown',
    requestType: 'Appliance',
    priority: 'low',
    description: 'Dishwasher making unusual noise',
    submittedDate: '2026-08-10',
    status: 'assigned',
    assignedTo: 'ABC Appliance Repair'
  },
  {
    id: 'MR-005',
    propertyAddress: '7890 Cedar Lane, Unit 5C',
    tenantName: 'Thomas Wilson',
    requestType: 'Structural',
    priority: 'high',
    description: 'Ceiling water stain indicating possible roof leak',
    submittedDate: '2026-08-12',
    status: 'pending_review'
  },
  {
    id: 'MR-006',
    propertyAddress: '2345 Birch Drive, Apt 8D',
    tenantName: 'Maria Garcia',
    requestType: 'Lock/Security',
    priority: 'medium',
    description: 'Front door lock is sticking and hard to turn',
    submittedDate: '2026-08-11',
    status: 'pending_review'
  }
]

export default function PropertyStreamline() {
  const [activeTab, setActiveTab] = useState<'screening' | 'maintenance'>('screening')
  const [applications, setApplications] = useState<TenantApplication[]>(mockTenantApplications)
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(mockMaintenanceRequests)
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

  const handleApproveApplication = (id: string) => {
    setApplications(apps =>
      apps.map(app =>
        app.id === id ? { ...app, status: 'approved' as const } : app
      )
    )
    setSelectedApplication(null)
  }

  const handleRejectApplication = (id: string) => {
    setApplications(apps =>
      apps.map(app =>
        app.id === id ? { ...app, status: 'rejected' as const } : app
      )
    )
    setSelectedApplication(null)
  }

  const handleApproveRequest = (id: string, assignTo: string) => {
    setMaintenanceRequests(reqs =>
      reqs.map(req =>
        req.id === id ? { ...req, status: 'approved' as const, assignedTo: assignTo } : req
      )
    )
    setSelectedRequest(null)
  }

  const handleRejectRequest = (id: string) => {
    setMaintenanceRequests(reqs =>
      reqs.map(req =>
        req.id === id ? { ...req, status: 'rejected' as const } : req
      )
    )
    setSelectedRequest(null)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'pending_review':
        return 'bg-blue-100 text-blue-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'assigned':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const pendingApplicationsCount = applications.filter(a => a.status === 'pending').length
  const pendingRequestsCount = maintenanceRequests.filter(r => r.status === 'pending_review').length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management Dashboard</h1>
          <p className="text-gray-600">Streamline tenant screening and maintenance request workflows</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="text-sm font-medium text-gray-600">Pending Applications</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{pendingApplicationsCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
            <div className="text-sm font-medium text-gray-600">Pending Requests</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{pendingRequestsCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-600">Approved This Week</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{applications.filter(a => a.status === 'approved').length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
            <div className="text-sm font-medium text-gray-600">Active Properties</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">24</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('screening')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'screening'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tenant Screening
                {pendingApplicationsCount > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs">
                    {pendingApplicationsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('maintenance')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'maintenance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Maintenance Requests
                {pendingRequestsCount > 0 && (
                  <span className="ml-2 bg-orange-100 text-orange-600 py-0.5 px-2 rounded-full text-xs">
                    {pendingRequestsCount}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Tenant Screening Tab */}
          {activeTab === 'screening' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tenant Applications</h2>
              <div className="space-y-4">
                {applications.map(app => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{app.applicantName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {app.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Property:</span> {app.propertyAddress}
                          </div>
                          <div>
                            <span className="font-medium">Applied:</span> {app.applicationDate}
                          </div>
                          <div>
                            <span className="font-medium">Credit Score:</span> {app.creditScore}
                          </div>
                          <div>
                            <span className="font-medium">Annual Income:</span> ${app.income.toLocaleString()}
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium">Employment:</span> {app.employmentStatus}
                          </div>
                        </div>
                      </div>
                      {app.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleApproveApplication(app.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectApplication(app.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Maintenance Requests Tab */}
          {activeTab === 'maintenance' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Maintenance Requests - Manager Review</h2>
              <div className="space-y-4">
                {maintenanceRequests.map(req => (
                  <div
                    key={req.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{req.requestType}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(req.priority)}`}>
                            {req.priority.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                            {req.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Property:</span> {req.propertyAddress}
                          </div>
                          <div>
                            <span className="font-medium">Tenant:</span> {req.tenantName}
                          </div>
                          <div>
                            <span className="font-medium">Submitted:</span> {req.submittedDate}
                          </div>
                          <div>
                            <span className="font-medium">Description:</span> {req.description}
                          </div>
                          {req.assignedTo && (
                            <div>
                              <span className="font-medium">Assigned to:</span> {req.assignedTo}
                            </div>
                          )}
                        </div>
                      </div>
                      {req.status === 'pending_review' && (
                        <div className="flex flex-col gap-2 ml-4">
                          <button
                            onClick={() => {
                              const vendor = prompt('Enter vendor/contractor name:')
                              if (vendor) {
                                handleApproveRequest(req.id, vendor)
                              }
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
                          >
                            Approve & Assign
                          </button>
                          <button
                            onClick={() => handleRejectRequest(req.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
