/**
 * SubmitTenant — Online tenant application submission with credit and rental verification
 *
 * Features: Application form, credit score display, rental history verification, employment details, screening status
 *
 * Ticket: SCRUM-710 | Branch: proto/SCRUM-703
 */

import React, { useState } from 'react'

interface TenantApplication {
  id: string
  applicantName: string
  email: string
  phone: string
  currentAddress: string
  employmentStatus: string
  monthlyIncome: number
  creditScore: number
  rentalHistory: RentalHistoryItem[]
  screeningStatus: 'pending' | 'approved' | 'rejected' | 'reviewing'
  applicationDate: string
}

interface RentalHistoryItem {
  propertyAddress: string
  landlordName: string
  landlordContact: string
  rentAmount: number
  startDate: string
  endDate: string
  verified: boolean
}

const MOCK_APPLICATIONS: TenantApplication[] = [
  {
    id: 'APP-001',
    applicantName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 123-4567',
    currentAddress: '123 Main St, Apt 4B, Boston, MA 02101',
    employmentStatus: 'Full-time',
    monthlyIncome: 5500,
    creditScore: 720,
    rentalHistory: [
      {
        propertyAddress: '456 Oak Ave, Boston, MA',
        landlordName: 'John Smith',
        landlordContact: '(555) 234-5678',
        rentAmount: 1800,
        startDate: '2021-03-01',
        endDate: '2023-12-31',
        verified: true
      },
      {
        propertyAddress: '789 Pine St, Cambridge, MA',
        landlordName: 'Mary Davis',
        landlordContact: '(555) 345-6789',
        rentAmount: 1500,
        startDate: '2019-01-01',
        endDate: '2021-02-28',
        verified: true
      }
    ],
    screeningStatus: 'approved',
    applicationDate: '2024-01-15'
  },
  {
    id: 'APP-002',
    applicantName: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '(555) 234-5678',
    currentAddress: '789 Elm St, Unit 12, Cambridge, MA 02139',
    employmentStatus: 'Full-time',
    monthlyIncome: 6200,
    creditScore: 750,
    rentalHistory: [
      {
        propertyAddress: '321 Maple Dr, Somerville, MA',
        landlordName: 'Robert Wilson',
        landlordContact: '(555) 456-7890',
        rentAmount: 2100,
        startDate: '2020-06-01',
        endDate: '2024-01-31',
        verified: true
      }
    ],
    screeningStatus: 'approved',
    applicationDate: '2024-01-20'
  },
  {
    id: 'APP-003',
    applicantName: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '(555) 345-6789',
    currentAddress: '456 Broadway, Apt 8, Boston, MA 02118',
    employmentStatus: 'Self-employed',
    monthlyIncome: 4800,
    creditScore: 680,
    rentalHistory: [
      {
        propertyAddress: '654 Highland Ave, Brookline, MA',
        landlordName: 'Patricia Brown',
        landlordContact: '(555) 567-8901',
        rentAmount: 1700,
        startDate: '2022-01-01',
        endDate: '2023-12-31',
        verified: true
      }
    ],
    screeningStatus: 'reviewing',
    applicationDate: '2024-02-01'
  },
  {
    id: 'APP-004',
    applicantName: 'David Thompson',
    email: 'dthompson@email.com',
    phone: '(555) 456-7890',
    currentAddress: '987 Commonwealth Ave, Boston, MA 02215',
    employmentStatus: 'Full-time',
    monthlyIncome: 7000,
    creditScore: 785,
    rentalHistory: [
      {
        propertyAddress: '111 Beacon St, Boston, MA',
        landlordName: 'James Anderson',
        landlordContact: '(555) 678-9012',
        rentAmount: 2500,
        startDate: '2019-09-01',
        endDate: '2023-08-31',
        verified: true
      },
      {
        propertyAddress: '222 Charles St, Boston, MA',
        landlordName: 'Linda Taylor',
        landlordContact: '(555) 789-0123',
        rentAmount: 2200,
        startDate: '2017-05-01',
        endDate: '2019-08-31',
        verified: true
      }
    ],
    screeningStatus: 'approved',
    applicationDate: '2024-02-05'
  },
  {
    id: 'APP-005',
    applicantName: 'Jessica Martinez',
    email: 'jessica.m@email.com',
    phone: '(555) 567-8901',
    currentAddress: '321 Harvard St, Cambridge, MA 02138',
    employmentStatus: 'Part-time',
    monthlyIncome: 3500,
    creditScore: 640,
    rentalHistory: [
      {
        propertyAddress: '555 Massachusetts Ave, Cambridge, MA',
        landlordName: 'Thomas White',
        landlordContact: '(555) 890-1234',
        rentAmount: 1400,
        startDate: '2021-07-01',
        endDate: '2023-12-31',
        verified: false
      }
    ],
    screeningStatus: 'pending',
    applicationDate: '2024-02-10'
  }
]

export default function SubmitTenant() {
  const [selectedApp, setSelectedApp] = useState<TenantApplication | null>(null)
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    currentAddress: '',
    employmentStatus: 'Full-time',
    monthlyIncome: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Application submitted successfully! Screening will include credit score and rental history verification.')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 740) return 'text-green-600'
    if (score >= 670) return 'text-blue-600'
    if (score >= 580) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'reviewing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tenant Application Portal</h1>
          <p className="text-gray-600">Submit your application with automatic credit score and rental history verification</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Submit New Application</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john.doe@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Address *
                </label>
                <input
                  type="text"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St, Apt 4B, City, State ZIP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Status *
                </label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Contract">Contract</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income *
                </label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h3 className="font-semibold text-blue-900 mb-2">Screening Process</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Credit score verification (automated)</li>
                  <li>✓ Rental history verification (landlord contact)</li>
                  <li>✓ Employment verification</li>
                  <li>✓ Background check</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>

          {/* Previous Applications with Screening Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Applications</h2>
            <div className="space-y-4">
              {MOCK_APPLICATIONS.map((app) => (
                <div
                  key={app.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{app.applicantName}</h3>
                      <p className="text-sm text-gray-600">{app.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.screeningStatus)}`}>
                      {app.screeningStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                    <div>
                      <span className="text-gray-500">Credit Score:</span>
                      <span className={`ml-2 font-bold ${getCreditScoreColor(app.creditScore)}`}>
                        {app.creditScore}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Income:</span>
                      <span className="ml-2 font-semibold text-gray-900">
                        ${app.monthlyIncome.toLocaleString()}/mo
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    <span className="text-gray-500">Applied:</span> {new Date(app.applicationDate).toLocaleDateString()}
                  </div>

                  {selectedApp?.id === app.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3">Rental History Verification</h4>
                      <div className="space-y-3">
                        {app.rentalHistory.map((history, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{history.propertyAddress}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                  Landlord: {history.landlordName}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Contact: {history.landlordContact}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  ${history.rentAmount}/mo | {history.startDate} to {history.endDate}
                                </p>
                              </div>
                              <div className="ml-3">
                                {history.verified ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                    ✓ Verified
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                    Pending
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs text-blue-600 font-semibold">EMPLOYMENT</p>
                          <p className="text-sm font-semibold text-blue-900 mt-1">{app.employmentStatus}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs text-green-600 font-semibold">PHONE</p>
                          <p className="text-sm font-semibold text-green-900 mt-1">{app.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Screening Info Footer */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Tenant Screening Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Credit Score Verification</h4>
              <p className="text-sm text-gray-600">
                Automated credit check from major bureaus. Scores above 670 are considered good credit.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Rental History Verification</h4>
              <p className="text-sm text-gray-600">
                Direct contact with previous landlords to verify payment history and tenancy dates.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900 mb-2">Employment & Income</h4>
              <p className="text-sm text-gray-600">
                Verification of employment status and monthly income to ensure rent affordability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
