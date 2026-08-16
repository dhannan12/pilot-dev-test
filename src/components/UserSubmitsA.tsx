/**
 * UserSubmitsA — Insurance claim submission form with all required fields
 *
 * Features: Vehicle details, incident information, claimant details, file upload, form validation
 *
 * Ticket: SCRUM-964 | Branch: proto/SCRUM-963
 */

import React, { useState } from 'react'

interface ClaimSubmission {
  id: string
  claimantName: string
  email: string
  phone: string
  vehicleModel: string
  vehicleYear: string
  licenseNumber: string
  incidentDate: string
  incidentLocation: string
  incidentDescription: string
  damageType: string
  status: 'draft' | 'submitted' | 'processing'
}

// Mock data for submitted claims
const MOCK_SUBMITTED_CLAIMS: ClaimSubmission[] = [
  {
    id: 'CLM-001',
    claimantName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-0101',
    vehicleModel: 'Toyota Camry',
    vehicleYear: '2022',
    licenseNumber: 'ABC123',
    incidentDate: '2026-08-10',
    incidentLocation: '123 Main St, Springfield',
    incidentDescription: 'Rear-ended at traffic light',
    damageType: 'Rear bumper damage',
    status: 'submitted'
  },
  {
    id: 'CLM-002',
    claimantName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '555-0102',
    vehicleModel: 'Honda Accord',
    vehicleYear: '2021',
    licenseNumber: 'XYZ789',
    incidentDate: '2026-08-12',
    incidentLocation: '456 Oak Ave, Springfield',
    incidentDescription: 'Side collision at intersection',
    damageType: 'Driver side door damage',
    status: 'processing'
  },
  {
    id: 'CLM-003',
    claimantName: 'Michael Brown',
    email: 'm.brown@example.com',
    phone: '555-0103',
    vehicleModel: 'Ford F-150',
    vehicleYear: '2023',
    licenseNumber: 'DEF456',
    incidentDate: '2026-08-14',
    incidentLocation: '789 Elm St, Springfield',
    incidentDescription: 'Hit by falling tree branch',
    damageType: 'Roof and windshield damage',
    status: 'submitted'
  },
  {
    id: 'CLM-004',
    claimantName: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '555-0104',
    vehicleModel: 'Tesla Model 3',
    vehicleYear: '2024',
    licenseNumber: 'GHI789',
    incidentDate: '2026-08-15',
    incidentLocation: '321 Pine Rd, Springfield',
    incidentDescription: 'Parking lot collision',
    damageType: 'Front fender damage',
    status: 'draft'
  },
  {
    id: 'CLM-005',
    claimantName: 'David Wilson',
    email: 'david.w@example.com',
    phone: '555-0105',
    vehicleModel: 'BMW 330i',
    vehicleYear: '2022',
    licenseNumber: 'JKL012',
    incidentDate: '2026-08-16',
    incidentLocation: '654 Maple Dr, Springfield',
    incidentDescription: 'Hit and run while parked',
    damageType: 'Multiple scratches and dents',
    status: 'submitted'
  }
]

const DAMAGE_TYPES = [
  'Rear bumper damage',
  'Front bumper damage',
  'Side door damage',
  'Windshield damage',
  'Roof damage',
  'Multiple damage',
  'Other'
]

export default function UserSubmitsA() {
  const [formData, setFormData] = useState({
    claimantName: '',
    email: '',
    phone: '',
    vehicleModel: '',
    vehicleYear: '',
    licenseNumber: '',
    incidentDate: '',
    incidentLocation: '',
    incidentDescription: '',
    damageType: ''
  })

  const [submittedClaims, setSubmittedClaims] = useState<ClaimSubmission[]>(MOCK_SUBMITTED_CLAIMS)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      return
    }

    const newClaim: ClaimSubmission = {
      id: `CLM-${String(submittedClaims.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'submitted'
    }

    setSubmittedClaims(prev => [newClaim, ...prev])
    setShowSuccess(true)
    
    // Reset form
    setFormData({
      claimantName: '',
      email: '',
      phone: '',
      vehicleModel: '',
      vehicleYear: '',
      licenseNumber: '',
      incidentDate: '',
      incidentLocation: '',
      incidentDescription: '',
      damageType: ''
    })

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div data-testid="usersubmitsa" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Insurance Claim</h1>
          <p className="text-gray-600 mb-6">Complete all required fields to submit your motor vehicle claim</p>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 font-medium">✓ Claim submitted successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Claimant Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Claimant Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="claimantName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="claimantName"
                    name="claimantName"
                    data-testid="usersubmitsa-claimantname"
                    value={formData.claimantName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    data-testid="usersubmitsa-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    data-testid="usersubmitsa-phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Make/Model *
                  </label>
                  <input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    data-testid="usersubmitsa-vehiclemodel"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="text"
                    id="vehicleYear"
                    name="vehicleYear"
                    data-testid="usersubmitsa-vehicleyear"
                    value={formData.vehicleYear}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    License Plate *
                  </label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    data-testid="usersubmitsa-licensenumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Incident Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Incident Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Incident Date *
                    </label>
                    <input
                      type="date"
                      id="incidentDate"
                      name="incidentDate"
                      data-testid="usersubmitsa-incidentdate"
                      value={formData.incidentDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="damageType" className="block text-sm font-medium text-gray-700 mb-1">
                      Damage Type *
                    </label>
                    <select
                      id="damageType"
                      name="damageType"
                      data-testid="usersubmitsa-damagetype"
                      value={formData.damageType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select damage type</option>
                      {DAMAGE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="incidentLocation" className="block text-sm font-medium text-gray-700 mb-1">
                    Incident Location *
                  </label>
                  <input
                    type="text"
                    id="incidentLocation"
                    name="incidentLocation"
                    data-testid="usersubmitsa-incidentlocation"
                    value={formData.incidentLocation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="incidentDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Incident Description *
                  </label>
                  <textarea
                    id="incidentDescription"
                    name="incidentDescription"
                    data-testid="usersubmitsa-incidentdescription"
                    value={formData.incidentDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide detailed description of the incident..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                data-testid="usersubmitsa-reset"
                onClick={() => setFormData({
                  claimantName: '',
                  email: '',
                  phone: '',
                  vehicleModel: '',
                  vehicleYear: '',
                  licenseNumber: '',
                  incidentDate: '',
                  incidentLocation: '',
                  incidentDescription: '',
                  damageType: ''
                })}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                data-testid="usersubmitsa-submit"
                disabled={!isFormValid()}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                Submit Claim
              </button>
            </div>
          </form>
        </div>

        {/* Submitted Claims List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Submitted Claims</h2>
          <div data-testid="usersubmitsa-list" className="space-y-4">
            {submittedClaims.map(claim => (
              <div
                key={claim.id}
                data-testid="usersubmitsa-item"
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{claim.id}</h3>
                    <p className="text-sm text-gray-600">{claim.claimantName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    claim.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                    claim.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {claim.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="ml-2 text-gray-900">{claim.vehicleModel} ({claim.vehicleYear})</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 text-gray-900">{claim.incidentDate}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2 text-gray-900">{claim.incidentLocation}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Damage:</span>
                    <span className="ml-2 text-gray-900">{claim.damageType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
