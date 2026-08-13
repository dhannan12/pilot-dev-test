/**
 * BuildPatientTreatment — Patient Treatment Management screen for dental clinic
 *
 * Features: treatment records list, procedure details, cost tracking, appointment history, treatment status updates
 *
 * Ticket: SCRUM-759 | Branch: proto/SCRUM-747
 */

import React, { useState } from 'react'

interface Treatment {
  id: string
  patientId: string
  patientName: string
  procedure: string
  dentist: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  date: string
  cost: number
  notes: string
  duration: number
}

const MOCK_TREATMENTS: Treatment[] = [
  {
    id: 'TRT-001',
    patientId: 'PAT-1001',
    patientName: 'Sarah Johnson',
    procedure: 'Root Canal Treatment',
    dentist: 'Dr. Michael Chen',
    status: 'completed',
    date: '2026-08-10',
    cost: 1200,
    notes: 'Completed successfully. Follow-up in 2 weeks.',
    duration: 90
  },
  {
    id: 'TRT-002',
    patientId: 'PAT-1002',
    patientName: 'Robert Williams',
    procedure: 'Dental Implant',
    dentist: 'Dr. Emily Rodriguez',
    status: 'in-progress',
    date: '2026-08-12',
    cost: 3500,
    notes: 'Stage 1 completed. Awaiting osseointegration.',
    duration: 120
  },
  {
    id: 'TRT-003',
    patientId: 'PAT-1003',
    patientName: 'Jennifer Martinez',
    procedure: 'Teeth Whitening',
    dentist: 'Dr. Sarah Thompson',
    status: 'scheduled',
    date: '2026-08-15',
    cost: 450,
    notes: 'Patient requested professional whitening treatment.',
    duration: 60
  },
  {
    id: 'TRT-004',
    patientId: 'PAT-1004',
    patientName: 'David Brown',
    procedure: 'Wisdom Tooth Extraction',
    dentist: 'Dr. Michael Chen',
    status: 'completed',
    date: '2026-08-08',
    cost: 800,
    notes: 'All four wisdom teeth removed. Recovery normal.',
    duration: 75
  },
  {
    id: 'TRT-005',
    patientId: 'PAT-1005',
    patientName: 'Lisa Anderson',
    procedure: 'Orthodontic Braces Installation',
    dentist: 'Dr. James Park',
    status: 'in-progress',
    date: '2026-08-11',
    cost: 5000,
    notes: 'Initial braces installed. Monthly adjustments scheduled.',
    duration: 90
  },
  {
    id: 'TRT-006',
    patientId: 'PAT-1006',
    patientName: 'Michael Davis',
    procedure: 'Dental Crown Placement',
    dentist: 'Dr. Emily Rodriguez',
    status: 'scheduled',
    date: '2026-08-16',
    cost: 1100,
    notes: 'Crown fabricated and ready for placement.',
    duration: 60
  },
  {
    id: 'TRT-007',
    patientId: 'PAT-1007',
    patientName: 'Amanda Wilson',
    procedure: 'Gum Disease Treatment',
    dentist: 'Dr. Sarah Thompson',
    status: 'in-progress',
    date: '2026-08-13',
    cost: 950,
    notes: 'Scaling and root planing completed. Follow-up needed.',
    duration: 45
  }
]

export default function BuildPatientTreatment() {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const getStatusColor = (status: Treatment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const filteredTreatments = MOCK_TREATMENTS.filter((treatment) => {
    const matchesStatus = filterStatus === 'all' || treatment.status === filterStatus
    const matchesSearch =
      treatment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalRevenue = MOCK_TREATMENTS.filter((t) => t.status === 'completed').reduce(
    (sum, t) => sum + t.cost,
    0
  )

  const treatmentStats = {
    total: MOCK_TREATMENTS.length,
    completed: MOCK_TREATMENTS.filter((t) => t.status === 'completed').length,
    inProgress: MOCK_TREATMENTS.filter((t) => t.status === 'in-progress').length,
    scheduled: MOCK_TREATMENTS.filter((t) => t.status === 'scheduled').length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Patient Treatment Management
          </h1>
          <p className="text-gray-600">
            Track and manage all patient treatment records and procedures
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Treatments</div>
            <div className="text-3xl font-bold text-gray-900">{treatmentStats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-green-200">
            <div className="text-sm font-medium text-green-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-700">{treatmentStats.completed}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-blue-200">
            <div className="text-sm font-medium text-blue-600 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-blue-700">{treatmentStats.inProgress}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-gray-900">
              ${totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Treatments
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by patient name, procedure, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-full md:w-64">
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Treatment List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List View */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Treatment Records ({filteredTreatments.length})
            </h2>
            <div className="space-y-3">
              {filteredTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  onClick={() => setSelectedTreatment(treatment)}
                  className={`bg-white rounded-lg shadow p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedTreatment?.id === treatment.id
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{treatment.patientName}</h3>
                      <p className="text-sm text-gray-600">{treatment.id}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        treatment.status
                      )}`}
                    >
                      {treatment.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Procedure:</span>
                      <span className="font-medium text-gray-900">{treatment.procedure}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Dentist:</span>
                      <span className="text-gray-900">{treatment.dentist}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Date:</span>
                      <span className="text-gray-900">{treatment.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-semibold text-green-600">
                        ${treatment.cost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredTreatments.length === 0 && (
                <div className="bg-white rounded-lg shadow p-8 text-center border border-gray-200">
                  <p className="text-gray-500">No treatments found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* Detail View */}
          <div className="lg:sticky lg:top-6 h-fit">
            {selectedTreatment ? (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedTreatment.patientName}
                      </h2>
                      <p className="text-gray-600">{selectedTreatment.id}</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                        selectedTreatment.status
                      )}`}
                    >
                      {selectedTreatment.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Procedure</h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedTreatment.procedure}
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Assigned Dentist</h3>
                    <p className="text-lg text-gray-900">{selectedTreatment.dentist}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Treatment Date</h3>
                      <p className="text-lg text-gray-900">{selectedTreatment.date}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Duration</h3>
                      <p className="text-lg text-gray-900">{selectedTreatment.duration} mins</p>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Patient ID</h3>
                    <p className="text-lg text-gray-900">{selectedTreatment.patientId}</p>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Treatment Cost</h3>
                    <p className="text-2xl font-bold text-green-600">
                      ${selectedTreatment.cost.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Treatment Notes</h3>
                    <p className="text-gray-900 bg-gray-50 p-4 rounded-lg border border-gray-200">
                      {selectedTreatment.notes}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Update Status
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Edit Treatment
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center border border-gray-200">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Treatment Selected
                </h3>
                <p className="text-gray-600">
                  Select a treatment record from the list to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
