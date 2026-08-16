/**
 * ClaimsAdjustersMust — Claims adjusters provide notes for evaluated claims
 *
 * Features: claim evaluation form, mandatory notes field, validation, claim list display, status tracking
 *
 * Ticket: SCRUM-971 | Branch: proto/SCRUM-963
 */

import { useState } from 'react'

interface Claim {
  id: string
  claimNumber: string
  claimant: string
  incidentDate: string
  description: string
  status: 'pending' | 'under-review' | 'evaluated' | 'approved' | 'denied'
  adjusterNotes: string
  evaluatedBy?: string
  evaluatedAt?: string
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2024-001',
    claimant: 'John Smith',
    incidentDate: '2024-01-15',
    description: 'Vehicle collision at intersection - front-end damage',
    status: 'evaluated',
    adjusterNotes: 'Reviewed all documentation. Damage assessment confirms collision impact. All medical records verified.',
    evaluatedBy: 'Sarah Johnson',
    evaluatedAt: '2024-01-18'
  },
  {
    id: '2',
    claimNumber: 'CLM-2024-002',
    claimant: 'Emily Davis',
    incidentDate: '2024-02-20',
    description: 'Rear-end accident on highway - bumper damage',
    status: 'under-review',
    adjusterNotes: '',
    evaluatedBy: undefined,
    evaluatedAt: undefined
  },
  {
    id: '3',
    claimNumber: 'CLM-2024-003',
    claimant: 'Michael Brown',
    incidentDate: '2024-03-10',
    description: 'Parking lot incident - side panel scratches',
    status: 'evaluated',
    adjusterNotes: 'Minor damage confirmed. Police report reviewed. Repair estimate is within policy limits.',
    evaluatedBy: 'David Wilson',
    evaluatedAt: '2024-03-12'
  },
  {
    id: '4',
    claimNumber: 'CLM-2024-004',
    claimant: 'Jessica Martinez',
    incidentDate: '2024-03-25',
    description: 'Hit and run - significant damage to driver side',
    status: 'pending',
    adjusterNotes: '',
    evaluatedBy: undefined,
    evaluatedAt: undefined
  },
  {
    id: '5',
    claimNumber: 'CLM-2024-005',
    claimant: 'Robert Taylor',
    incidentDate: '2024-04-05',
    description: 'Multi-vehicle accident - comprehensive damage',
    status: 'under-review',
    adjusterNotes: '',
    evaluatedBy: undefined,
    evaluatedAt: undefined
  }
]

export default function ClaimsAdjustersMust() {
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS)
  const [selectedClaimId, setSelectedClaimId] = useState<string>('')
  const [adjusterNotes, setAdjusterNotes] = useState('')
  const [adjusterName, setAdjusterName] = useState('')
  const [evaluationStatus, setEvaluationStatus] = useState<'approved' | 'denied'>('approved')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const selectedClaim = claims.find((c) => c.id === selectedClaimId)

  const handleClaimSelect = (claimId: string) => {
    setSelectedClaimId(claimId)
    const claim = claims.find((c) => c.id === claimId)
    if (claim) {
      setAdjusterNotes(claim.adjusterNotes || '')
    }
    setError('')
    setSuccess('')
  }

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!selectedClaimId) {
      setError('Please select a claim to evaluate')
      return
    }

    if (!adjusterName.trim()) {
      setError('Adjuster name is required')
      return
    }

    if (!adjusterNotes.trim()) {
      setError('Adjuster notes are mandatory for evaluated claims')
      return
    }

    if (adjusterNotes.trim().length < 20) {
      setError('Notes must be at least 20 characters to provide sufficient evaluation detail')
      return
    }

    const updatedClaims = claims.map((claim) => {
      if (claim.id === selectedClaimId) {
        return {
          ...claim,
          status: evaluationStatus,
          adjusterNotes: adjusterNotes.trim(),
          evaluatedBy: adjusterName.trim(),
          evaluatedAt: new Date().toISOString().split('T')[0]
        }
      }
      return claim
    })

    setClaims(updatedClaims)
    setSuccess(`Claim ${selectedClaim?.claimNumber} successfully evaluated and ${evaluationStatus}`)
    setSelectedClaimId('')
    setAdjusterNotes('')
    setAdjusterName('')
  }

  const handleReset = () => {
    setSelectedClaimId('')
    setAdjusterNotes('')
    setAdjusterName('')
    setError('')
    setSuccess('')
  }

  return (
    <div data-testid="claimsadjustersmust" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Claims Adjuster Evaluation
          </h1>
          <p className="text-gray-600 mb-6">
            All evaluated claims must include adjuster notes. Notes are mandatory to document the evaluation decision.
          </p>

          <form onSubmit={handleEvaluate} className="space-y-6">
            <div>
              <label
                htmlFor="claimSelect"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Claim to Evaluate *
              </label>
              <select
                id="claimSelect"
                data-testid="claimsadjustersmust-claim-select"
                value={selectedClaimId}
                onChange={(e) => handleClaimSelect(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Select a claim --</option>
                {claims
                  .filter((c) => c.status === 'pending' || c.status === 'under-review')
                  .map((claim) => (
                    <option key={claim.id} value={claim.id}>
                      {claim.claimNumber} - {claim.claimant} ({claim.incidentDate})
                    </option>
                  ))}
              </select>
            </div>

            {selectedClaim && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                <h3 className="font-semibold text-gray-900 mb-2">Claim Details</h3>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Claimant:</span> {selectedClaim.claimant}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Incident Date:</span> {selectedClaim.incidentDate}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Description:</span> {selectedClaim.description}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="adjusterName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adjuster Name *
              </label>
              <input
                id="adjusterName"
                type="text"
                data-testid="claimsadjustersmust-adjuster-name"
                value={adjusterName}
                onChange={(e) => setAdjusterName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="evaluationStatus"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Evaluation Decision *
              </label>
              <select
                id="evaluationStatus"
                data-testid="claimsadjustersmust-evaluation-status"
                value={evaluationStatus}
                onChange={(e) => setEvaluationStatus(e.target.value as 'approved' | 'denied')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="approved">Approve Claim</option>
                <option value="denied">Deny Claim</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="adjusterNotes"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adjuster Notes * <span className="text-red-600">(Required - min 20 characters)</span>
              </label>
              <textarea
                id="adjusterNotes"
                data-testid="claimsadjustersmust-notes"
                value={adjusterNotes}
                onChange={(e) => setAdjusterNotes(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide detailed notes about your evaluation. Include all relevant findings, documentation reviewed, and rationale for your decision..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Character count: {adjusterNotes.length} / 20 minimum
              </p>
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
                data-testid="claimsadjustersmust-submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Submit Evaluation
              </button>
              <button
                type="button"
                data-testid="claimsadjustersmust-reset"
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
            All Claims
          </h2>
          <p className="text-gray-600 mb-4">
            Evaluated claims must have adjuster notes documented
          </p>

          <div data-testid="claimsadjustersmust-list" className="space-y-4">
            {claims.map((claim) => (
              <div
                key={claim.id}
                data-testid="claimsadjustersmust-item"
                className={`p-4 border rounded-lg ${
                  claim.status === 'approved'
                    ? 'border-green-200 bg-green-50'
                    : claim.status === 'denied'
                    ? 'border-red-200 bg-red-50'
                    : claim.status === 'evaluated'
                    ? 'border-blue-200 bg-blue-50'
                    : claim.status === 'under-review'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {claim.claimNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      Claimant: {claim.claimant}
                    </p>
                    <p className="text-sm text-gray-600">
                      Incident: {claim.incidentDate}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      claim.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : claim.status === 'denied'
                        ? 'bg-red-100 text-red-800'
                        : claim.status === 'evaluated'
                        ? 'bg-blue-100 text-blue-800'
                        : claim.status === 'under-review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {claim.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-3">
                  <span className="font-medium">Description:</span> {claim.description}
                </p>

                <div className="border-t pt-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Adjuster Notes:
                  </p>
                  {claim.adjusterNotes ? (
                    <div>
                      <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                        {claim.adjusterNotes}
                      </p>
                      {claim.evaluatedBy && claim.evaluatedAt && (
                        <p className="text-xs text-gray-500 mt-2">
                          Evaluated by <span className="font-medium">{claim.evaluatedBy}</span> on {claim.evaluatedAt}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-orange-700 font-medium italic">
                      No notes provided - evaluation incomplete
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
