/**
 * BuildTenantApplication — Tenant application form screen for property rental applications
 *
 * Features: personal information form, employment details, rental history, references, document uploads
 *
 * Ticket: SCRUM-713 | Branch: proto/SCRUM-703
 */

import React, { useState } from 'react'

interface TenantApplication {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  currentAddress: string
  employmentStatus: string
  employer: string
  monthlyIncome: number
  previousAddress: string
  previousLandlord: string
  previousLandlordPhone: string
  emergencyContact: string
  emergencyContactPhone: string
  moveInDate: string
  pets: boolean
  petDetails: string
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
}

const MOCK_APPLICATIONS: TenantApplication[] = [
  {
    id: 'app-001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    currentAddress: '123 Oak Street, Apt 4B, Springfield',
    employmentStatus: 'Full-time',
    employer: 'Tech Solutions Inc.',
    monthlyIncome: 5500,
    previousAddress: '456 Maple Ave, Riverside',
    previousLandlord: 'John Smith',
    previousLandlordPhone: '(555) 234-5678',
    emergencyContact: 'Michael Johnson',
    emergencyContactPhone: '(555) 345-6789',
    moveInDate: '2026-09-01',
    pets: true,
    petDetails: 'One small dog (Beagle, 2 years old)',
    status: 'submitted'
  },
  {
    id: 'app-002',
    firstName: 'David',
    lastName: 'Martinez',
    email: 'david.martinez@email.com',
    phone: '(555) 987-6543',
    currentAddress: '789 Pine Road, Unit 12, Lakewood',
    employmentStatus: 'Self-employed',
    employer: 'Martinez Consulting LLC',
    monthlyIncome: 6200,
    previousAddress: '321 Elm Street, Brookside',
    previousLandlord: 'Lisa Brown',
    previousLandlordPhone: '(555) 456-7890',
    emergencyContact: 'Maria Martinez',
    emergencyContactPhone: '(555) 567-8901',
    moveInDate: '2026-09-15',
    pets: false,
    petDetails: '',
    status: 'approved'
  },
  {
    id: 'app-003',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.chen@email.com',
    phone: '(555) 246-8135',
    currentAddress: '567 Cedar Lane, Apartment 8, Greenville',
    employmentStatus: 'Full-time',
    employer: 'Healthcare Partners',
    monthlyIncome: 4800,
    previousAddress: '890 Birch Court, Hillside',
    previousLandlord: 'Robert Wilson',
    previousLandlordPhone: '(555) 678-9012',
    emergencyContact: 'James Chen',
    emergencyContactPhone: '(555) 789-0123',
    moveInDate: '2026-10-01',
    pets: true,
    petDetails: 'Two cats (indoor only)',
    status: 'draft'
  },
  {
    id: 'app-004',
    firstName: 'Michael',
    lastName: 'Taylor',
    email: 'michael.taylor@email.com',
    phone: '(555) 369-2580',
    currentAddress: '234 Willow Drive, Suite 5, Meadowbrook',
    employmentStatus: 'Part-time',
    employer: 'Retail Store Co.',
    monthlyIncome: 3200,
    previousAddress: '678 Spruce Avenue, Parkview',
    previousLandlord: 'Jennifer Davis',
    previousLandlordPhone: '(555) 890-1234',
    emergencyContact: 'Susan Taylor',
    emergencyContactPhone: '(555) 901-2345',
    moveInDate: '2026-09-20',
    pets: false,
    petDetails: '',
    status: 'rejected'
  },
  {
    id: 'app-005',
    firstName: 'Jessica',
    lastName: 'Anderson',
    email: 'jessica.anderson@email.com',
    phone: '(555) 147-2589',
    currentAddress: '901 Redwood Boulevard, Unit 3C, Riverside',
    employmentStatus: 'Full-time',
    employer: 'Financial Services Group',
    monthlyIncome: 7000,
    previousAddress: '345 Cypress Street, Lakeside',
    previousLandlord: 'Thomas Miller',
    previousLandlordPhone: '(555) 012-3456',
    emergencyContact: 'Robert Anderson',
    emergencyContactPhone: '(555) 123-4560',
    moveInDate: '2026-08-25',
    pets: true,
    petDetails: 'One medium dog (Labrador, 4 years old)',
    status: 'submitted'
  }
]

const EMPLOYMENT_STATUS_OPTIONS = ['Full-time', 'Part-time', 'Self-employed', 'Unemployed', 'Student', 'Retired']

export default function BuildTenantApplication() {
  const [formData, setFormData] = useState<Partial<TenantApplication>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentAddress: '',
    employmentStatus: 'Full-time',
    employer: '',
    monthlyIncome: 0,
    previousAddress: '',
    previousLandlord: '',
    previousLandlordPhone: '',
    emergencyContact: '',
    emergencyContactPhone: '',
    moveInDate: '',
    pets: false,
    petDetails: '',
    status: 'draft'
  })

  const [selectedApplication, setSelectedApplication] = useState<TenantApplication | null>(null)
  const [showApplications, setShowApplications] = useState(false)

  const handleInputChange = (field: keyof TenantApplication, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Application submitted successfully!')
  }

  const loadApplication = (app: TenantApplication) => {
    setFormData(app)
    setSelectedApplication(app)
    setShowApplications(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tenant Application Form</h1>
              <p className="text-gray-600 mt-2">Complete the form below to apply for a rental property</p>
            </div>
            <button
              onClick={() => setShowApplications(!showApplications)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showApplications ? 'Hide' : 'View'} Applications
            </button>
          </div>
        </div>

        {/* Applications List */}
        {showApplications && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sample Applications</h2>
            <div className="space-y-3">
              {MOCK_APPLICATIONS.map(app => (
                <div
                  key={app.id}
                  onClick={() => loadApplication(app)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {app.firstName} {app.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{app.email}</p>
                      <p className="text-sm text-gray-600">{app.employer}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Address</label>
                <input
                  type="text"
                  value={formData.currentAddress}
                  onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desired Move-in Date</label>
                <input
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Employment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  {EMPLOYMENT_STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employer Name</label>
                <input
                  type="text"
                  value={formData.employer}
                  onChange={(e) => handleInputChange('employer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rental History */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Rental History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Previous Address</label>
                <input
                  type="text"
                  value={formData.previousAddress}
                  onChange={(e) => handleInputChange('previousAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Previous Landlord Name</label>
                <input
                  type="text"
                  value={formData.previousLandlord}
                  onChange={(e) => handleInputChange('previousLandlord', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Previous Landlord Phone</label>
                <input
                  type="tel"
                  value={formData.previousLandlordPhone}
                  onChange={(e) => handleInputChange('previousLandlordPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pets Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Pet Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pets"
                  checked={formData.pets || false}
                  onChange={(e) => handleInputChange('pets', e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="pets" className="ml-2 text-sm font-medium text-gray-700">
                  I have pets
                </label>
              </div>
              {formData.pets && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Details</label>
                  <textarea
                    value={formData.petDetails}
                    onChange={(e) => handleInputChange('petDetails', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Describe your pets (type, breed, age, size)"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('status', 'draft')}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Save as Draft
              </button>
            </div>
          </div>
        </form>

        {/* Application Status */}
        {selectedApplication && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Status</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Application ID: {selectedApplication.id}</p>
                <p className="text-gray-600">Applicant: {selectedApplication.firstName} {selectedApplication.lastName}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedApplication.status)}`}>
                {selectedApplication.status.toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
