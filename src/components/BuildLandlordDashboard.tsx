/**
 * BuildLandlordDashboard — Property management dashboard for landlords with portfolio overview
 *
 * Features: property portfolio view, revenue analytics, tenant management, maintenance requests, occupancy tracking
 *
 * Ticket: SCRUM-712 | Branch: proto/SCRUM-703
 */

import React, { useState } from 'react'

interface Property {
  id: string
  name: string
  address: string
  type: string
  units: number
  occupiedUnits: number
  monthlyRevenue: number
  status: 'active' | 'maintenance' | 'vacant'
  imageUrl: string
}

interface MaintenanceRequest {
  id: string
  propertyName: string
  unit: string
  issue: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in-progress' | 'completed'
  reportedDate: string
}

interface Tenant {
  id: string
  name: string
  property: string
  unit: string
  leaseEnd: string
  rentStatus: 'paid' | 'due' | 'overdue'
  monthlyRent: number
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop1',
    name: 'Sunset Apartments',
    address: '123 Ocean Drive, Miami, FL',
    type: 'Multi-family',
    units: 24,
    occupiedUnits: 22,
    monthlyRevenue: 48000,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'
  },
  {
    id: 'prop2',
    name: 'Downtown Lofts',
    address: '456 Main Street, Austin, TX',
    type: 'Loft',
    units: 12,
    occupiedUnits: 12,
    monthlyRevenue: 36000,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400'
  },
  {
    id: 'prop3',
    name: 'Riverside Condos',
    address: '789 River Road, Portland, OR',
    type: 'Condo',
    units: 18,
    occupiedUnits: 15,
    monthlyRevenue: 42000,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400'
  },
  {
    id: 'prop4',
    name: 'Garden View Estates',
    address: '321 Park Avenue, Seattle, WA',
    type: 'Townhouse',
    units: 8,
    occupiedUnits: 6,
    monthlyRevenue: 24000,
    status: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'
  },
  {
    id: 'prop5',
    name: 'Hillside Studios',
    address: '654 Summit Lane, Denver, CO',
    type: 'Studio',
    units: 30,
    occupiedUnits: 28,
    monthlyRevenue: 33600,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1502672260066-6bc35f0a1def?w=400'
  },
  {
    id: 'prop6',
    name: 'Lakefront Residences',
    address: '987 Lake Street, Chicago, IL',
    type: 'Multi-family',
    units: 36,
    occupiedUnits: 30,
    monthlyRevenue: 72000,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'
  }
]

const MOCK_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'maint1',
    propertyName: 'Sunset Apartments',
    unit: 'Unit 12A',
    issue: 'Leaking faucet in kitchen',
    priority: 'medium',
    status: 'pending',
    reportedDate: '2026-08-10'
  },
  {
    id: 'maint2',
    propertyName: 'Downtown Lofts',
    unit: 'Unit 5B',
    issue: 'HVAC not cooling properly',
    priority: 'high',
    status: 'in-progress',
    reportedDate: '2026-08-09'
  },
  {
    id: 'maint3',
    propertyName: 'Riverside Condos',
    unit: 'Unit 8C',
    issue: 'Broken window in living room',
    priority: 'high',
    status: 'pending',
    reportedDate: '2026-08-11'
  },
  {
    id: 'maint4',
    propertyName: 'Garden View Estates',
    unit: 'Unit 3A',
    issue: 'Garage door opener malfunction',
    priority: 'low',
    status: 'completed',
    reportedDate: '2026-08-05'
  },
  {
    id: 'maint5',
    propertyName: 'Hillside Studios',
    unit: 'Unit 22D',
    issue: 'Light fixture not working',
    priority: 'low',
    status: 'pending',
    reportedDate: '2026-08-12'
  },
  {
    id: 'maint6',
    propertyName: 'Lakefront Residences',
    unit: 'Unit 15F',
    issue: 'Water heater needs replacement',
    priority: 'high',
    status: 'in-progress',
    reportedDate: '2026-08-08'
  }
]

const MOCK_TENANTS: Tenant[] = [
  {
    id: 'tenant1',
    name: 'Sarah Johnson',
    property: 'Sunset Apartments',
    unit: 'Unit 12A',
    leaseEnd: '2027-03-31',
    rentStatus: 'paid',
    monthlyRent: 2200
  },
  {
    id: 'tenant2',
    name: 'Michael Chen',
    property: 'Downtown Lofts',
    unit: 'Unit 5B',
    leaseEnd: '2026-12-15',
    rentStatus: 'due',
    monthlyRent: 3000
  },
  {
    id: 'tenant3',
    name: 'Emily Rodriguez',
    property: 'Riverside Condos',
    unit: 'Unit 8C',
    leaseEnd: '2027-06-30',
    rentStatus: 'paid',
    monthlyRent: 2800
  },
  {
    id: 'tenant4',
    name: 'David Thompson',
    property: 'Garden View Estates',
    unit: 'Unit 3A',
    leaseEnd: '2026-11-20',
    rentStatus: 'overdue',
    monthlyRent: 3200
  },
  {
    id: 'tenant5',
    name: 'Jessica Martinez',
    property: 'Hillside Studios',
    unit: 'Unit 22D',
    leaseEnd: '2027-01-15',
    rentStatus: 'paid',
    monthlyRent: 1200
  },
  {
    id: 'tenant6',
    name: 'Robert Williams',
    property: 'Lakefront Residences',
    unit: 'Unit 15F',
    leaseEnd: '2027-09-30',
    rentStatus: 'paid',
    monthlyRent: 2400
  }
]

export default function BuildLandlordDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'maintenance' | 'tenants'>('overview')

  const totalProperties = MOCK_PROPERTIES.length
  const totalUnits = MOCK_PROPERTIES.reduce((sum, prop) => sum + prop.units, 0)
  const occupiedUnits = MOCK_PROPERTIES.reduce((sum, prop) => sum + prop.occupiedUnits, 0)
  const occupancyRate = Math.round((occupiedUnits / totalUnits) * 100)
  const totalRevenue = MOCK_PROPERTIES.reduce((sum, prop) => sum + prop.monthlyRevenue, 0)
  const pendingMaintenance = MOCK_MAINTENANCE_REQUESTS.filter(req => req.status === 'pending').length
  const overdueTenants = MOCK_TENANTS.filter(tenant => tenant.rentStatus === 'overdue').length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50'
      case 'in-progress': return 'text-blue-600 bg-blue-50'
      case 'completed': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50'
      case 'due': return 'text-yellow-600 bg-yellow-50'
      case 'overdue': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Landlord Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your property portfolio</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Settings
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Add Property
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('properties')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'properties'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'maintenance'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setActiveTab('tenants')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tenants'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tenants
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Properties</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{totalProperties}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{occupancyRate}%</p>
                    <p className="text-xs text-gray-500 mt-1">{occupiedUnits} / {totalUnits} units</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">${totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Issues</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{pendingMaintenance}</p>
                    <p className="text-xs text-red-500 mt-1">{overdueTenants} overdue payments</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Maintenance</h2>
                </div>
                <div className="divide-y">
                  {MOCK_MAINTENANCE_REQUESTS.slice(0, 4).map(request => (
                    <div key={request.id} className="px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{request.propertyName}</p>
                          <p className="text-sm text-gray-600 mt-1">{request.unit} - {request.issue}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{request.reportedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Rent Status</h2>
                </div>
                <div className="divide-y">
                  {MOCK_TENANTS.slice(0, 4).map(tenant => (
                    <div key={tenant.id} className="px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{tenant.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{tenant.property} - {tenant.unit}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRentStatusColor(tenant.rentStatus)}`}>
                              {tenant.rentStatus}
                            </span>
                            <span className="text-xs text-gray-600">${tenant.monthlyRent}/mo</span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">Due: {tenant.leaseEnd}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PROPERTIES.map(property => (
              <div key={property.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <img src={property.imageUrl} alt={property.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      property.status === 'active' ? 'bg-green-100 text-green-700' :
                      property.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{property.address}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900">{property.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Occupancy:</span>
                      <span className="font-medium text-gray-900">{property.occupiedUnits}/{property.units} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Revenue:</span>
                      <span className="font-medium text-green-600">${property.monthlyRevenue.toLocaleString()}/mo</span>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Maintenance Requests</h2>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                New Request
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_MAINTENANCE_REQUESTS.map(request => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.propertyName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.unit}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{request.issue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.reportedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tenants' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Tenant Management</h2>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                Add Tenant
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Rent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease End</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_TENANTS.map(tenant => (
                    <tr key={tenant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tenant.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tenant.property}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tenant.unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${tenant.monthlyRent.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRentStatusColor(tenant.rentStatus)}`}>
                          {tenant.rentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tenant.leaseEnd}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
