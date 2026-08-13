/**
 * SubmitTenant — Tenant application submission form for property management
 *
 * Features: multi-step form, personal info, employment verification, rental history, document uploads, application status
 *
 * Ticket: SCRUM-709 | Branch: proto/SCRUM-703
 */

import { useState } from 'react'

interface TenantApplication {
  id: string
  propertyAddress: string
  applicantName: string
  email: string
  phone: string
  employmentStatus: string
  monthlyIncome: number
  previousAddress: string
  moveInDate: string
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  submittedDate?: string
}

interface Property {
  id: string
  address: string
  unit: string
  monthlyRent: number
  available: boolean
}

const MOCK_PROPERTIES: Property[] = [
  { id: 'p1', address: '123 Main St', unit: 'Apt 4B', monthlyRent: 1800, available: true },
  { id: 'p2', address: '456 Oak Ave', unit: 'Unit 12', monthlyRent: 2200, available: true },
  { id: 'p3', address: '789 Pine Rd', unit: 'Suite 3A', monthlyRent: 1650, available: true },
  { id: 'p4', address: '321 Elm Street', unit: 'Apt 201', monthlyRent: 2000, available: true },
  { id: 'p5', address: '555 Maple Dr', unit: 'Townhouse 8', monthlyRent: 2500, available: true },
]

const MOCK_APPLICATIONS: TenantApplication[] = [
  {
    id: 'app1',
    propertyAddress: '123 Main St, Apt 4B',
    applicantName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 123-4567',
    employmentStatus: 'Full-time',
    monthlyIncome: 5400,
    previousAddress: '100 First Ave, City, ST 12345',
    moveInDate: '2026-09-01',
    status: 'submitted',
    submittedDate: '2026-08-10',
  },
  {
    id: 'app2',
    propertyAddress: '456 Oak Ave, Unit 12',
    applicantName: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '(555) 234-5678',
    employmentStatus: 'Self-employed',
    monthlyIncome: 6600,
    previousAddress: '200 Second St, Town, ST 23456',
    moveInDate: '2026-09-15',
    status: 'under_review',
    submittedDate: '2026-08-11',
  },
  {
    id: 'app3',
    propertyAddress: '789 Pine Rd, Suite 3A',
    applicantName: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 345-6789',
    employmentStatus: 'Full-time',
    monthlyIncome: 4950,
    previousAddress: '300 Third Blvd, Village, ST 34567',
    moveInDate: '2026-10-01',
    status: 'approved',
    submittedDate: '2026-08-05',
  },
  {
    id: 'app4',
    propertyAddress: '321 Elm Street, Apt 201',
    applicantName: 'David Thompson',
    email: 'dthompson@email.com',
    phone: '(555) 456-7890',
    employmentStatus: 'Full-time',
    monthlyIncome: 6000,
    previousAddress: '400 Fourth Ln, City, ST 45678',
    moveInDate: '2026-08-20',
    status: 'draft',
  },
  {
    id: 'app5',
    propertyAddress: '555 Maple Dr, Townhouse 8',
    applicantName: 'Jennifer Martinez',
    email: 'jmartinez@email.com',
    phone: '(555) 567-8901',
    employmentStatus: 'Contract',
    monthlyIncome: 7500,
    previousAddress: '500 Fifth Way, Town, ST 56789',
    moveInDate: '2026-09-10',
    status: 'submitted',
    submittedDate: '2026-08-12',
  },
]

export default function SubmitTenant() {
  const [activeTab, setActiveTab] = useState<'new' | 'applications'>('new')
  const [selectedProperty, setSelectedProperty] = useState<string>('')
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    employmentStatus: '',
    monthlyIncome: '',
    previousAddress: '',
    moveInDate: '',
    emergencyContact: '',
    emergencyPhone: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Application submitted successfully! You will receive a confirmation email shortly.')
    // Reset form
    setFormData({
      applicantName: '',
      email: '',
      phone: '',
      employmentStatus: '',
      monthlyIncome: '',
      previousAddress: '',
      moveInDate: '',
      emergencyContact: '',
      emergencyPhone: '',
    })
    setSelectedProperty('')
    setActiveTab('applications')
  }

  const getStatusColor = (status: TenantApplication['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700'
      case 'submitted':
        return 'bg-blue-100 text-blue-700'
      case 'under_review':
        return 'bg-yellow-100 text-yellow-700'
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: TenantApplication['status']) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tenant Application Portal</h1>
          <p className="text-gray-600">Submit your rental application online and track your application status</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('new')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'new'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                New Application
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'applications'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Applications
              </button>
            </nav>
          </div>

          {activeTab === 'new' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit New Application</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Property *
                  </label>
                  <select
                    id="property"
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a property...</option>
                    {MOCK_PROPERTIES.map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.address}, {property.unit} - ${property.monthlyRent}/month
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="applicantName"
                        name="applicantName"
                        value={formData.applicantName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Desired Move-in Date *
                      </label>
                      <input
                        type="date"
                        id="moveInDate"
                        name="moveInDate"
                        value={formData.moveInDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Employment Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-2">
                        Employment Status *
                      </label>
                      <select
                        id="employmentStatus"
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select...</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="Contract">Contract</option>
                        <option value="Unemployed">Unemployed</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Income *
                      </label>
                      <input
                        type="number"
                        id="monthlyIncome"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rental History</h3>
                  <div>
                    <label htmlFor="previousAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Address *
                    </label>
                    <textarea
                      id="previousAddress"
                      name="previousAddress"
                      value={formData.previousAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="emergencyPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Phone *
                      </label>
                      <input
                        type="tel"
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> By submitting this application, you authorize us to verify the information
                      provided and conduct background and credit checks as required.
                    </p>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          applicantName: '',
                          email: '',
                          phone: '',
                          employmentStatus: '',
                          monthlyIncome: '',
                          previousAddress: '',
                          moveInDate: '',
                          emergencyContact: '',
                          emergencyPhone: '',
                        })
                        setSelectedProperty('')
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear Form
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">My Applications</h2>
              <div className="space-y-4">
                {MOCK_APPLICATIONS.map((application) => (
                  <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{application.propertyAddress}</h3>
                        <p className="text-sm text-gray-600">Applicant: {application.applicantName}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusLabel(application.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <p className="text-gray-900">{application.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <p className="text-gray-900">{application.phone}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Move-in Date:</span>
                        <p className="text-gray-900">{application.moveInDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Employment:</span>
                        <p className="text-gray-900">{application.employmentStatus}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Monthly Income:</span>
                        <p className="text-gray-900">${application.monthlyIncome.toLocaleString()}</p>
                      </div>
                      {application.submittedDate && (
                        <div>
                          <span className="text-gray-500">Submitted:</span>
                          <p className="text-gray-900">{application.submittedDate}</p>
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
