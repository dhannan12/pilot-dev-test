/**
 * ClaimsCannotBe — Enforces documentation requirements before closing claims
 *
 * Features: claim status display, document upload validation, required docs checklist, close button with validation, real-time status updates
 *
 * Ticket: SCRUM-870 | Branch: proto/SCRUM-868
 */

import { useState } from 'react'

interface Document {
  id: string
  name: string
  required: boolean
  uploaded: boolean
  uploadedDate?: string
}

interface Claim {
  id: string
  claimNumber: string
  status: 'Open' | 'Pending' | 'Closed'
  claimant: string
  documents: Document[]
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2024-001',
    status: 'Open',
    claimant: 'John Smith',
    documents: [
      { id: 'd1', name: 'Accident Report', required: true, uploaded: true, uploadedDate: '2024-01-15' },
      { id: 'd2', name: 'Medical Records', required: true, uploaded: false },
      { id: 'd3', name: 'Police Report', required: true, uploaded: false },
      { id: 'd4', name: 'Witness Statement', required: false, uploaded: false },
    ],
  },
  {
    id: '2',
    claimNumber: 'CLM-2024-002',
    status: 'Pending',
    claimant: 'Sarah Johnson',
    documents: [
      { id: 'd5', name: 'Accident Report', required: true, uploaded: true, uploadedDate: '2024-02-10' },
      { id: 'd6', name: 'Medical Records', required: true, uploaded: true, uploadedDate: '2024-02-12' },
      { id: 'd7', name: 'Police Report', required: true, uploaded: true, uploadedDate: '2024-02-11' },
      { id: 'd8', name: 'Repair Estimate', required: false, uploaded: true, uploadedDate: '2024-02-13' },
    ],
  },
  {
    id: '3',
    claimNumber: 'CLM-2024-003',
    status: 'Open',
    claimant: 'Michael Brown',
    documents: [
      { id: 'd9', name: 'Accident Report', required: true, uploaded: true, uploadedDate: '2024-03-05' },
      { id: 'd10', name: 'Medical Records', required: true, uploaded: false },
      { id: 'd11', name: 'Police Report', required: true, uploaded: true, uploadedDate: '2024-03-06' },
      { id: 'd12', name: 'Photo Evidence', required: false, uploaded: false },
    ],
  },
  {
    id: '4',
    claimNumber: 'CLM-2024-004',
    status: 'Open',
    claimant: 'Emily Davis',
    documents: [
      { id: 'd13', name: 'Accident Report', required: true, uploaded: false },
      { id: 'd14', name: 'Medical Records', required: true, uploaded: false },
      { id: 'd15', name: 'Police Report', required: true, uploaded: false },
      { id: 'd16', name: 'Insurance Card', required: true, uploaded: false },
    ],
  },
  {
    id: '5',
    claimNumber: 'CLM-2024-005',
    status: 'Pending',
    claimant: 'Robert Wilson',
    documents: [
      { id: 'd17', name: 'Accident Report', required: true, uploaded: true, uploadedDate: '2024-04-20' },
      { id: 'd18', name: 'Medical Records', required: true, uploaded: true, uploadedDate: '2024-04-22' },
      { id: 'd19', name: 'Police Report', required: true, uploaded: true, uploadedDate: '2024-04-21' },
      { id: 'd20', name: 'Damage Assessment', required: true, uploaded: true, uploadedDate: '2024-04-23' },
    ],
  },
]

export default function ClaimsCannotBe() {
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS)
  const [selectedClaimId, setSelectedClaimId] = useState<string>(MOCK_CLAIMS[0].id)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const selectedClaim = claims.find(c => c.id === selectedClaimId)

  const allRequiredDocsUploaded = (claim: Claim) => {
    return claim.documents
      .filter(doc => doc.required)
      .every(doc => doc.uploaded)
  }

  const handleCloseClaim = () => {
    if (!selectedClaim) return

    if (!allRequiredDocsUploaded(selectedClaim)) {
      const missingDocs = selectedClaim.documents
        .filter(doc => doc.required && !doc.uploaded)
        .map(doc => doc.name)
        .join(', ')
      
      setErrorMessage(`Cannot close claim. Missing required documents: ${missingDocs}`)
      return
    }

    // Close the claim
    setClaims(claims.map(c => 
      c.id === selectedClaimId 
        ? { ...c, status: 'Closed' as const }
        : c
    ))
    setErrorMessage('')
  }

  const handleUploadDocument = (docId: string) => {
    setClaims(claims.map(c => 
      c.id === selectedClaimId
        ? {
            ...c,
            documents: c.documents.map(doc =>
              doc.id === docId
                ? { ...doc, uploaded: true, uploadedDate: new Date().toISOString().split('T')[0] }
                : doc
            )
          }
        : c
    ))
    setErrorMessage('')
  }

  if (!selectedClaim) return null

  const requiredDocsCount = selectedClaim.documents.filter(d => d.required).length
  const uploadedRequiredDocsCount = selectedClaim.documents.filter(d => d.required && d.uploaded).length
  const canCloseClaim = allRequiredDocsUploaded(selectedClaim) && selectedClaim.status !== 'Closed'

  return (
    <div data-testid="claims-cannot-be" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Claims Management</h1>

        {/* Claims List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Claim</h2>
          <div data-testid="claims-cannot-be-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {claims.map(claim => (
              <button
                key={claim.id}
                data-testid="claims-cannot-be-item"
                onClick={() => {
                  setSelectedClaimId(claim.id)
                  setErrorMessage('')
                }}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  selectedClaimId === claim.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{claim.claimNumber}</div>
                <div className="text-sm text-gray-600">{claim.claimant}</div>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      claim.status === 'Closed'
                        ? 'bg-gray-200 text-gray-700'
                        : claim.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {claim.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Claim Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedClaim.claimNumber}</h2>
              <p className="text-gray-600">Claimant: {selectedClaim.claimant}</p>
              <p className="mt-2">
                <span className="text-sm font-medium text-gray-700">
                  Status:{' '}
                </span>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded ${
                    selectedClaim.status === 'Closed'
                      ? 'bg-gray-200 text-gray-700'
                      : selectedClaim.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {selectedClaim.status}
                </span>
              </p>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-600 mb-2">
                Required Documents: {uploadedRequiredDocsCount} / {requiredDocsCount}
              </div>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(uploadedRequiredDocsCount / requiredDocsCount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Documentation</h3>
            <div data-testid="claims-cannot-be-documents-list" className="space-y-3">
              {selectedClaim.documents.map(doc => (
                <div
                  key={doc.id}
                  data-testid="claims-cannot-be-document-item"
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    doc.uploaded ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        doc.uploaded ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      {doc.uploaded && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {doc.name}
                        {doc.required && (
                          <span className="ml-2 text-xs text-red-600 font-semibold">* Required</span>
                        )}
                      </div>
                      {doc.uploaded && doc.uploadedDate && (
                        <div className="text-sm text-gray-500">Uploaded: {doc.uploadedDate}</div>
                      )}
                    </div>
                  </div>

                  {!doc.uploaded && selectedClaim.status !== 'Closed' && (
                    <button
                      data-testid="claims-cannot-be-upload"
                      onClick={() => handleUploadDocument(doc.id)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                    >
                      Upload
                    </button>
                  )}

                  {doc.uploaded && (
                    <span className="text-sm text-green-600 font-medium">✓ Uploaded</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div
              data-testid="claims-cannot-be-error"
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-red-600 mr-2 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-800 font-medium">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {selectedClaim.status === 'Closed' ? (
              <div className="px-6 py-2 bg-gray-100 text-gray-600 font-medium rounded-lg">
                Claim is Closed
              </div>
            ) : (
              <>
                <button
                  data-testid="claims-cannot-be-cancel"
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  data-testid="claims-cannot-be-close"
                  onClick={handleCloseClaim}
                  disabled={!canCloseClaim}
                  className={`px-6 py-2 font-medium rounded-lg transition-colors ${
                    canCloseClaim
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Close Claim
                </button>
              </>
            )}
          </div>

          {/* Helper Text */}
          {!canCloseClaim && selectedClaim.status !== 'Closed' && (
            <div className="mt-4 text-sm text-gray-600 text-right">
              ⓘ All required documents must be uploaded before closing the claim
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
