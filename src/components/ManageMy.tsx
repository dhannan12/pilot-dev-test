/**
 * ManageMy — Landlord property management dashboard with rental income calculations
 *
 * Features: property portfolio overview, rental income analytics, property status tracking, tenant management, financial summaries
 *
 * Ticket: SCRUM-706 | Branch: proto/SCRUM-703
 */

import React, { useState } from 'react'

interface Property {
  id: string
  address: string
  type: string
  bedrooms: number
  bathrooms: number
  monthlyRent: number
  status: 'Rented' | 'Vacant' | 'Maintenance'
  tenant?: string
  leaseEndDate?: string
}

const mockProperties: Property[] = [
  {
    id: 'P001',
    address: '123 Maple Street, Downtown',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    monthlyRent: 1800,
    status: 'Rented',
    tenant: 'John Smith',
    leaseEndDate: '2027-03-15'
  },
  {
    id: 'P002',
    address: '456 Oak Avenue, Riverside',
    type: 'House',
    bedrooms: 3,
    bathrooms: 2.5,
    monthlyRent: 2500,
    status: 'Rented',
    tenant: 'Sarah Johnson',
    leaseEndDate: '2026-12-31'
  },
  {
    id: 'P003',
    address: '789 Pine Road, Hillside',
    type: 'Condo',
    bedrooms: 1,
    bathrooms: 1,
    monthlyRent: 1200,
    status: 'Vacant'
  },
  {
    id: 'P004',
    address: '321 Elm Court, Lakeside',
    type: 'Townhouse',
    bedrooms: 3,
    bathrooms: 3,
    monthlyRent: 2200,
    status: 'Rented',
    tenant: 'Michael Brown',
    leaseEndDate: '2027-06-30'
  },
  {
    id: 'P005',
    address: '654 Birch Lane, Sunset',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    monthlyRent: 1500,
    status: 'Maintenance'
  },
  {
    id: 'P006',
    address: '987 Cedar Drive, Mountain View',
    type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    monthlyRent: 3200,
    status: 'Rented',
    tenant: 'Emily Davis',
    leaseEndDate: '2027-01-15'
  },
  {
    id: 'P007',
    address: '147 Willow Street, Garden District',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    monthlyRent: 1100,
    status: 'Rented',
    tenant: 'David Wilson',
    leaseEndDate: '2026-11-20'
  }
]

export default function ManageMy() {
  const [properties] = useState<Property[]>(mockProperties)
  const [filterStatus, setFilterStatus] = useState<string>('All')

  // Calculate rental income statistics
  const rentedProperties = properties.filter(p => p.status === 'Rented')
  const totalProperties = properties.length
  const rentedCount = rentedProperties.length
  const vacantCount = properties.filter(p => p.status === 'Vacant').length
  const maintenanceCount = properties.filter(p => p.status === 'Maintenance').length
  
  const totalMonthlyIncome = rentedProperties.reduce((sum, p) => sum + p.monthlyRent, 0)
  const averageRent = totalProperties > 0 ? properties.reduce((sum, p) => sum + p.monthlyRent, 0) / totalProperties : 0
  const potentialIncome = totalProperties * averageRent
  const occupancyRate = totalProperties > 0 ? (rentedCount / totalProperties) * 100 : 0

  // Filter properties
  const filteredProperties = filterStatus === 'All' 
    ? properties 
    : properties.filter(p => p.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rented':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Vacant':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Maintenance':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Property Management Dashboard</h1>
          <p className="text-gray-600">Manage your rental properties efficiently</p>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">Total Properties</div>
            <div className="text-3xl font-bold text-gray-900">{totalProperties}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-1">Monthly Income</div>
            <div className="text-3xl font-bold text-green-600">${totalMonthlyIncome.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">From {rentedCount} rented properties</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-sm text-gray-600 mb-1">Average Rent</div>
            <div className="text-3xl font-bold text-purple-600">${Math.round(averageRent).toLocaleString()}</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="text-sm text-gray-600 mb-1">Occupancy Rate</div>
            <div className="text-3xl font-bold text-orange-600">{occupancyRate.toFixed(1)}%</div>
          </div>
        </div>

        {/* Property Status Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <div className="text-sm text-gray-600">Rented</div>
                <div className="text-2xl font-bold text-green-700">{rentedCount}</div>
              </div>
              <div className="text-sm text-gray-600">
                ${rentedProperties.reduce((sum, p) => sum + p.monthlyRent, 0).toLocaleString()}/mo
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <div className="text-sm text-gray-600">Vacant</div>
                <div className="text-2xl font-bold text-yellow-700">{vacantCount}</div>
              </div>
              <div className="text-sm text-gray-600">
                ${properties.filter(p => p.status === 'Vacant').reduce((sum, p) => sum + p.monthlyRent, 0).toLocaleString()}/mo potential
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <div className="text-sm text-gray-600">Maintenance</div>
                <div className="text-2xl font-bold text-red-700">{maintenanceCount}</div>
              </div>
              <div className="text-sm text-gray-600">Needs attention</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Potential Monthly Income</div>
                <div className="text-xs text-gray-500 mt-1">
                  Calculated: {totalProperties} properties × ${Math.round(averageRent).toLocaleString()} average rent
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-700">
                ${Math.round(potentialIncome).toLocaleString()}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Current shortfall: ${Math.round(potentialIncome - totalMonthlyIncome).toLocaleString()}/mo
            </div>
          </div>
        </div>

        {/* Property List Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Property List</h2>
              
              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('All')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'All'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({totalProperties})
                </button>
                <button
                  onClick={() => setFilterStatus('Rented')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'Rented'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rented ({rentedCount})
                </button>
                <button
                  onClick={() => setFilterStatus('Vacant')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'Vacant'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Vacant ({vacantCount})
                </button>
                <button
                  onClick={() => setFilterStatus('Maintenance')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === 'Maintenance'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Maintenance ({maintenanceCount})
                </button>
              </div>
            </div>
          </div>

          {/* Properties Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beds/Baths</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease End</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{property.address}</div>
                      <div className="text-xs text-gray-500">{property.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{property.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {property.bedrooms} / {property.bathrooms}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ${property.monthlyRent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-block rounded-full text-xs font-medium border ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {property.tenant || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {property.leaseEndDate || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProperties.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No properties found matching the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
