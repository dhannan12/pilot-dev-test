/**
 * ClaimsCannotBe — Claims review interface with mandatory document verification before approval
 *
 * Features: document attachment list, review status tracking, approval workflow, validation alerts, pending claims queue
 *
 * Ticket: SCRUM-874 | Branch: proto/SCRUM-868
 */

import { useState } from 'react'

interface Document {
  id: string
  name: string
  type: string
  uploadedDate: string
  reviewed: boolean
}

interface Claim {
  id: string
  claimNumber: string
  claimant: string
  amount: number
  submittedDate: string
  documents: Document[]
  status: 'pending' | 'reviewing' | 'approved' | 'rejected'
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: '1',
    claimNumber: 'CLM-2026-001',
    claimant: 'John Smith',
    amount: 2500.00,
    submittedDate: '2026-08-10',
    documents: [
      { id: 'd1', name: 'Medical Report.pdf', type: 'PDF', uploadedDate: '2026-08-10', reviewed: false },
      { id: 'd2', name: 'Invoice.pdf', type: 'PDF', uploadedDate: '2026-08-10', reviewed: false },
      { id: 'd3', name: 'ID Document.jpg', type: 'Image', uploadedDate: '2026-08-10', reviewed: false }
    ],
    status: 'pending'
  },
  {
    id: '2',
    claimNumber: 'CLM-2026-002',
    claimant: 'Sarah Johnson',
    amount: 4200.00,
    submittedDate: '2026-08-12',
    documents: [
      { id: 'd4', name: 'Accident Report.pdf', type: 'PDF', uploadedDate: '2026-08-12', reviewed: false },
      { id: 'd5', name: 'Police Report.pdf', type: 'PDF', uploadedDate: '2026-08-12', reviewed: false },
      { id: 'd6', name: 'Damage Photos.zip', type: 'Archive', uploadedDate: '2026-08-12', reviewed: false },
      { id: 'd7', name: 'Repair Estimate.pdf', type: 'PDF', uploadedDate: '2026-08-12', reviewed: false }
    ],
    status: 'pending'
  },
  {
    id: '3',
    claimNumber: 'CLM-2026-003',
    claimant: 'Michael Brown',
    amount: 1800.00,
    submittedDate: '2026-08-13',
    documents: [
      { id: 'd8', name: 'Treatment Record.pdf', type: 'PDF', uploadedDate: '2026-08-13', reviewed: false },
      { id: 'd9', name: 'Prescription.pdf', type: 'PDF', uploadedDate: '2026-08-13', reviewed: false }
    ],
    status: 'pending'
  },
  {
    id: '4',
    claimNumber: 'CLM-2026-004',
    claimant: 'Emily Davis',
    amount: 5600.00,
    submittedDate: '2026-08-14',
    documents: [
      { id: 'd10', name: 'Hospital Bill.pdf', type: 'PDF', uploadedDate: '2026-08-14', reviewed: false },
      { id: 'd11', name: 'Diagnostic Results.pdf', type: 'PDF', uploadedDate: '2026-08-14', reviewed: false },
      { id: 'd12', name: 'Insurance Card.jpg', type: 'Image', uploadedDate: '2026-08-14', reviewed: false }
    ],
    status: 'pending'
  },
  {
    id: '5',
    claimNumber: 'CLM-2026-005',
    claimant: 'Robert Wilson',
    amount: 3300.00,
    submittedDate: '2026-08-15',
    documents: [
      { id: 'd13', name: 'Claim Form.pdf', type: 'PDF', uploadedDate: '2026-08-15', reviewed: false },
      { id: 'd14', name: 'Supporting Evidence.pdf', type: 'PDF', uploadedDate: '2026-08-15', reviewed: false },
      { id: 'd15', name: 'Witness Statement.pdf', type: 'PDF', uploadedDate: '2026-08-15', reviewed: false },
      { id: 'd16', name: 'Photo Evidence.jpg', type: 'Image', uploadedDate: '2026-08-15', reviewed: false },
      { id: 'd17', name: 'Additional Notes.pdf', type: 'PDF', uploadedDate: '2026-08-15', reviewed: false }
    ],
    status: 'pending'
  }
]

export default function ClaimsCannotBe() {
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS)
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const handleClaimSelect = (claim: Claim) => {
    setSelectedClaim(claim)
    setShowAlert(false)
  }

  const handleDocumentReview = (documentId: string) => {
    if (!selectedClaim) return

    const updatedClaim = {
      ...selectedClaim,
      documents: selectedClaim.documents.map(doc =>
        doc.id === documentId ? { ...doc, reviewed: true } : doc
      )
    }
    
    setSelectedClaim(updatedClaim)
    setClaims(claims.map(c => c.id === updatedClaim.id ? updatedClaim : c))
  }

  const allDocumentsReviewed = () => {
    if (!selectedClaim) return false
    return selectedClaim.documents.every(doc => doc.reviewed)
  }

  const handleApprove = () => {
    if (!selectedClaim) return

    if (!allDocumentsReviewed()) {
      setAlertMessage('Cannot approve claim: All documents must be reviewed before approval.')
      setShowAlert(true)
      return
    }

    const updatedClaim = { ...selectedClaim, status: 'approved' as const }
    setClaims(claims.map(c => c.id === updatedClaim.id ? updatedClaim : c))
    setSelectedClaim(null)
    setAlertMessage('Claim approved successfully!')
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const handleReject = () => {
    if (!selectedClaim) return

    const updatedClaim = { ...selectedClaim, status: 'rejected' as const }
    setClaims(claims.map(c => c.id === updatedClaim.id ? updatedClaim : c))
    setSelectedClaim(null)
    setAlertMessage('Claim rejected.')
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const pendingClaims = claims.filter(c => c.status === 'pending')
  const reviewedCount = selectedClaim ? selectedClaim.documents.filter(d => d.reviewed).length : 0
  const totalDocs = selectedClaim ? selectedClaim.documents.length : 0

  return (
    <div data-testid="claimscannotbe" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Claims Review System</h1>
        <p className="text-gray-600 mb-6">All documents must be reviewed before approval</p>

        {showAlert && (
          <div
            data-testid="claimscannotbe-alert"
            className={`mb-6 p-4 rounded-lg ${
              alertMessage.includes('Cannot') ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'
            }`}
          >
            {alertMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Claims List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pending Claims ({pendingClaims.length})
              </h2>
              <ul data-testid="claimscannotbe-list" className="space-y-3">
                {pendingClaims.map(claim => (
                  <li
                    key={claim.id}
                    data-testid="claimscannotbe-item"
                    onClick={() => handleClaimSelect(claim)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedClaim?.id === claim.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{claim.claimNumber}</div>
                    <div className="text-sm text-gray-600">{claim.claimant}</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">
                      ${claim.amount.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {claim.documents.length} document{claim.documents.length !== 1 ? 's' : ''}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Claim Details and Documents */}
          <div className="lg:col-span-2">
            {selectedClaim ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedClaim.claimNumber}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Claimant:</span>
                      <span className="ml-2 font-medium">{selectedClaim.claimant}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-2 font-medium">${selectedClaim.amount.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Submitted:</span>
                      <span className="ml-2 font-medium">{selectedClaim.submittedDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="ml-2 font-medium capitalize">{selectedClaim.status}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Attached Documents ({reviewedCount}/{totalDocs} reviewed)
                    </h3>
                    {allDocumentsReviewed() && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                        All Reviewed ✓
                      </span>
                    )}
                  </div>

                  <div className="mb-4 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${totalDocs > 0 ? (reviewedCount / totalDocs) * 100 : 0}%` }}
                    />
                  </div>

                  <ul data-testid="claimscannotbe-document-list" className="space-y-2">
                    {selectedClaim.documents.map(doc => (
                      <li
                        key={doc.id}
                        data-testid="claimscannotbe-document-item"
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-600">
                            {doc.type} • Uploaded {doc.uploadedDate}
                          </div>
                        </div>
                        <button
                          data-testid="claimscannotbe-review-document"
                          onClick={() => handleDocumentReview(doc.id)}
                          disabled={doc.reviewed}
                          className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                            doc.reviewed
                              ? 'bg-green-100 text-green-800 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {doc.reviewed ? 'Reviewed ✓' : 'Mark as Reviewed'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <div className="flex gap-4">
                    <button
                      data-testid="claimscannotbe-approve"
                      onClick={handleApprove}
                      className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                        allDocumentsReviewed()
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Approve Claim
                    </button>
                    <button
                      data-testid="claimscannotbe-reject"
                      onClick={handleReject}
                      className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Reject Claim
                    </button>
                  </div>
                  {!allDocumentsReviewed() && (
                    <p className="text-sm text-red-600 mt-3 text-center">
                      ⚠️ All documents must be reviewed before approval
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
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
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Claim Selected</h3>
                <p className="text-gray-600">Select a pending claim from the list to review documents</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
