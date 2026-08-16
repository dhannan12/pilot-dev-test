/**
 * IncidentDateMust — Insurance claim incident date validation form
 *
 * Features: date picker, required validation, claim submission, error handling, mock claim data
 *
 * Ticket: SCRUM-970 | Branch: proto/SCRUM-963
 */

import { useState } from 'react'

interface Claim {
  id: string
  claimNumber: string
  incidentDate: string | null
  description: string
  status: 'draft' | 'submitted' | 'invalid'
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2024-001',
    incidentDate: '2024-01-15',
    description: 'Vehicle collision at intersection',
    status: 'submitted'
  },
  {
    id: '2',
    claimNumber: 'CLM-2024-002',
    incidentDate: null,
    description: 'Rear-end accident on highway',
    status: 'draft'
  },
  {
    id: '3',
    claimNumber: 'CLM-2024-003',
    incidentDate: '2024-02-20',
    description: 'Parking lot damage',
    status: 'submitted'
  },
  {
    id: '4',
    claimNumber: 'CLM-2024-004',
    incidentDate: null,
    description: 'Side-swipe on freeway',
    status: 'invalid'
  },
  {
    id: '5',
    claimNumber: 'CLM-2024-005',
    incidentDate: '2024-03-10',
    description: 'Hit and run incident',
    status: 'submitted'
  }
]

export default function IncidentDateMust() {
  const [claims] = useState<Claim[]>(MOCK_CLAIMS)
  const [claimNumber, setClaimNumber] = useState('')
  const [incidentDate, setIncidentDate] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!claimNumber.trim()) {
      setError('Claim number is required')
      return
    }

    if (!incidentDate) {
      setError('Incident date must be provided in claim submission')
      return
    }

    if (!description.trim()) {
      setError('Description is required')
      return
    }

    const today = new Date()
    const selectedDate = new Date(incidentDate)
    if (selectedDate > today) {
      setError('Incident date cannot be in the future')
      return
    }

    setSuccess(`Claim ${claimNumber} submitted successfully with incident date ${incidentDate}`)
    setClaimNumber('')
    setIncidentDate('')
    setDescription('')
  }

  const handleReset = () => {
    setClaimNumber('')
    setIncidentDate('')
    setDescription('')
    setError('')
    setSuccess('')
  }

  return (
    <div data-testid="incidentdatemust" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit Insurance Claim
          </h1>
          <p className="text-gray-600 mb-6">
            All fields are required. Incident date must be provided to submit your claim.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="claimNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Claim Number *
              </label>
              <input
                id="claimNumber"
                type="text"
                data-testid="incidentdatemust-claim-number"
                value={claimNumber}
                onChange={(e) => setClaimNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="CLM-2024-XXX"
              />
            </div>

            <div>
              <label
                htmlFor="incidentDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Incident Date * <span className="text-red-600">(Required)</span>
              </label>
              <input
                id="incidentDate"
                type="date"
                data-testid="incidentdatemust-incident-date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Incident Description *
              </label>
              <textarea
                id="description"
                data-testid="incidentdatemust-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the incident in detail..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                <p className="font-medium">Success!</p>
                <p>{success}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                data-testid="incidentdatemust-submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Submit Claim
              </button>
              <button
                type="button"
                data-testid="incidentdatemust-reset"
                onClick={handleReset}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 transition-colors"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Existing Claims
          </h2>
          <p className="text-gray-600 mb-4">
            Claims without incident dates cannot be submitted
          </p>

          <div data-testid="incidentdatemust-list" className="space-y-3">
            {claims.map((claim) => (
              <div
                key={claim.id}
                data-testid="incidentdatemust-item"
                className={`p-4 border rounded-lg ${
                  claim.incidentDate
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {claim.claimNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      {claim.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      claim.status === 'submitted'
                        ? 'bg-green-100 text-green-800'
                        : claim.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {claim.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    <span className="font-medium">Incident Date:</span>{' '}
                    {claim.incidentDate ? (
                      <span className="text-green-700">{claim.incidentDate}</span>
                    ) : (
                      <span className="text-red-700 font-medium">
                        NOT PROVIDED - Required for submission
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
