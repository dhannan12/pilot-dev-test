/**
 * ManageMy — Centralized landlord dashboard for property and tenant application management
 *
 * Features: property listing, tenant application tracking, property status overview, quick actions, occupancy statistics
 *
 * Ticket: SCRUM-704 | Branch: proto/SCRUM-703
 */

import React, { useState } from 'react'

interface Property {
  id: string
  address: string
  type: string
  bedrooms: number
  bathrooms: number
  rent: number
  status: 'occupied' | 'vacant' | 'maintenance'
  tenantName?: string
  leaseEnd?: string
  applicationsCount: number
}

interface TenantApplication {
  id: string
  propertyId: string
  applicantName: string
  email: string
  phone: string
  moveInDate: string
  status: 'pending' | 'approved' | 'rejected'
  submittedDate: string
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-001',
    address: '123 Maple Street, Portland, OR 97201',
    type: 'Single Family',
    bedrooms: 3,
    bathrooms: 2,
    rent: 2500,
    status: 'occupied',
    tenantName: 'John Smith',
    leaseEnd: '2026-12-31',
    applicationsCount: 0
  },
  {
    id: 'prop-002',
    address: '456 Oak Avenue, Portland, OR 97202',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    rent: 1800,
    status: 'vacant',
    applicationsCount: 3
  },
  {
    id: 'prop-003',
    address: '789 Pine Road, Portland, OR 97203',
    type: 'Condo',
    bedrooms: 2,
    bathrooms: 2,
    rent: 2200,
    status: 'occupied',
    tenantName: 'Sarah Johnson',
    leaseEnd: '2027-03-15',
    applicationsCount: 0
  },
  {
    id: 'prop-004',
    address: '321 Elm Court, Portland, OR 97204',
    type: 'Townhouse',
    bedrooms: 4,
    bathrooms: 3,
    rent: 3200,
    status: 'maintenance',
    applicationsCount: 1
  },
  {
    id: 'prop-005',
    address: '654 Cedar Lane, Portland, OR 97205',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    rent: 1400,
    status: 'vacant',
    applicationsCount: 5
  }
]

const MOCK_APPLICATIONS: TenantApplication[] = [
  {
    id: 'app-001',
    propertyId: 'prop-002',
    applicantName: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '(503) 555-0123',
    moveInDate: '2026-09-01',
    status: 'pending',
    submittedDate: '2026-08-10'
  },
  {
    id: 'app-002',
    propertyId: 'prop-002',
    applicantName: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '(503) 555-0124',
    moveInDate: '2026-09-15',
    status: 'pending',
    submittedDate: '2026-08-11'
  },
  {
    id: 'app-003',
    propertyId: 'prop-002',
    applicantName: 'Jessica Wilson',
    email: 'jessica.wilson@email.com',
    phone: '(503) 555-0125',
    moveInDate: '2026-08-25',
    status: 'approved',
    submittedDate: '2026-08-08'
  },
  {
    id: 'app-004',
    propertyId: 'prop-004',
    applicantName: 'David Martinez',
    email: 'david.martinez@email.com',
    phone: '(503) 555-0126',
    moveInDate: '2026-10-01',
    status: 'pending',
    submittedDate: '2026-08-12'
  },
  {
    id: 'app-005',
    propertyId: 'prop-005',
    applicantName: 'Amanda Taylor',
    email: 'amanda.taylor@email.com',
    phone: '(503) 555-0127',
    moveInDate: '2026-08-20',
    status: 'pending',
    submittedDate: '2026-08-09'
  },
  {
    id: 'app-006',
    propertyId: 'prop-005',
    applicantName: 'Robert Anderson',
    email: 'robert.anderson@email.com',
    phone: '(503) 555-0128',
    moveInDate: '2026-09-05',
    status: 'pending',
    submittedDate: '2026-08-11'
  }
]

export default function ManageMy() {
  const [selectedTab, setSelectedTab] = useState<'properties' | 'applications'>('properties')
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)

  const occupiedCount = MOCK_PROPERTIES.filter(p => p.status === 'occupied').length
  const vacantCount = MOCK_PROPERTIES.filter(p => p.status === 'vacant').length
  const maintenanceCount = MOCK_PROPERTIES.filter(p => p.status === 'maintenance').length
  const totalApplications = MOCK_APPLICATIONS.filter(a => a.status === 'pending').length

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'occupied':
        return 'bg-green-100 text-green-800'
      case 'vacant':
        return 'bg-yellow-100 text-yellow-800'
      case 'maintenance':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getApplicationStatusColor = (status: TenantApplication['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredApplications = selectedProperty
    ? MOCK_APPLICATIONS.filter(app => app.propertyId === selectedProperty)
    : MOCK_APPLICATIONS

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Landlord Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your properties and tenant applications
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Properties</div>
            <div className="text-3xl font-bold text-gray-900">{MOCK_PROPERTIES.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Occupied</div>
            <div className="text-3xl font-bold text-green-600">{occupiedCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Vacant</div>
            <div className="text-3xl font-bold text-yellow-600">{vacantCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Pending Applications</div>
            <div className="text-3xl font-bold text-blue-600">{totalApplications}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setSelectedTab('properties')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'properties'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                My Properties
              </button>
              <button
                onClick={() => setSelectedTab('applications')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'applications'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Tenant Applications
                {totalApplications > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                    {totalApplications}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Properties Tab */}
          {selectedTab === 'properties' && (
            <div className="p-6">
              <div className="space-y-4">
                {MOCK_PROPERTIES.map(property => (
                  <div
                    key={property.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {property.address}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{property.type}</span>
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          ${property.rent.toLocaleString()}/mo
                        </div>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {property.status === 'occupied' && property.tenantName && (
                      <div className="bg-gray-50 rounded p-3 mb-3">
                        <div className="text-sm text-gray-600">Current Tenant</div>
                        <div className="font-medium text-gray-900">{property.tenantName}</div>
                        <div className="text-sm text-gray-600">Lease ends: {property.leaseEnd}</div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                      {property.applicationsCount > 0 && (
                        <button
                          onClick={() => {
                            setSelectedTab('applications')
                            setSelectedProperty(property.id)
                          }}
                          className="flex-1 bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
                        >
                          View {property.applicationsCount} Application{property.applicationsCount !== 1 ? 's' : ''}
                        </button>
                      )}
                      {property.status === 'maintenance' && (
                        <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                          Schedule Maintenance
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {selectedTab === 'applications' && (
            <div className="p-6">
              {selectedProperty && (
                <div className="mb-4">
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    ← View All Applications
                  </button>
                </div>
              )}
              <div className="space-y-4">
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No applications found
                  </div>
                ) : (
                  filteredApplications.map(application => {
                    const property = MOCK_PROPERTIES.find(p => p.id === application.propertyId)
                    return (
                      <div
                        key={application.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {application.applicantName}
                            </h3>
                            <div className="text-sm text-gray-600 mb-2">
                              {property?.address}
                            </div>
                            <div className="flex flex-col gap-1 text-sm text-gray-600">
                              <div>Email: {application.email}</div>
                              <div>Phone: {application.phone}</div>
                              <div>Move-in Date: {application.moveInDate}</div>
                              <div>Submitted: {application.submittedDate}</div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>

                        {application.status === 'pending' && (
                          <div className="flex gap-2 mt-3">
                            <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors">
                              Approve
                            </button>
                            <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                              Review
                            </button>
                            <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors">
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
