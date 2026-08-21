/**
 * BuildSubmission — Submission confirmation UI for school absence reporting
 *
 * Features: success confirmation, submission details display, next actions, reference number, printable summary
 *
 * Ticket: SCRUM-1079 | Branch: proto/SCRUM-1070
 */

import React from 'react'

interface Submission {
  id: string
  referenceNumber: string
  studentName: string
  submittedDate: string
  absenceDate: string
  reason: string
  status: 'confirmed' | 'pending' | 'processing'
  confirmationEmail: string
}

const mockSubmissions: Submission[] = [
  {
    id: '1',
    referenceNumber: 'ABS-2026-001234',
    studentName: 'Emma Thompson',
    submittedDate: '2026-08-21 10:30 AM',
    absenceDate: '2026-08-22',
    reason: 'Medical appointment',
    status: 'confirmed',
    confirmationEmail: 'parent@example.com'
  },
  {
    id: '2',
    referenceNumber: 'ABS-2026-001235',
    studentName: 'James Wilson',
    submittedDate: '2026-08-21 09:15 AM',
    absenceDate: '2026-08-23',
    reason: 'Family emergency',
    status: 'confirmed',
    confirmationEmail: 'guardian@example.com'
  },
  {
    id: '3',
    referenceNumber: 'ABS-2026-001236',
    studentName: 'Sophie Chen',
    submittedDate: '2026-08-21 08:45 AM',
    absenceDate: '2026-08-24',
    reason: 'Illness',
    status: 'processing',
    confirmationEmail: 'parent2@example.com'
  },
  {
    id: '4',
    referenceNumber: 'ABS-2026-001237',
    studentName: 'Michael Brown',
    submittedDate: '2026-08-20 04:20 PM',
    absenceDate: '2026-08-25',
    reason: 'Religious observance',
    status: 'confirmed',
    confirmationEmail: 'family@example.com'
  },
  {
    id: '5',
    referenceNumber: 'ABS-2026-001238',
    studentName: 'Olivia Martinez',
    submittedDate: '2026-08-20 02:10 PM',
    absenceDate: '2026-08-26',
    reason: 'College visit',
    status: 'pending',
    confirmationEmail: 'parents@example.com'
  }
]

export default function BuildSubmission() {
  const [selectedSubmission, setSelectedSubmission] = React.useState<Submission>(mockSubmissions[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(selectedSubmission.confirmationEmail)
  }

  const handleNewSubmission = () => {
    // Navigate to new submission form
    console.log('Navigate to new submission form')
  }

  return (
    <div data-testid="buildsubmission" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Submission Confirmed
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Your absence report has been successfully submitted
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Reference Number</p>
            <p className="text-2xl font-mono font-bold text-blue-700">
              {selectedSubmission.referenceNumber}
            </p>
          </div>
        </div>

        {/* Submission Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Submission Details</h2>
          <div className="space-y-4">
            <div className="flex border-b border-gray-200 pb-3">
              <span className="w-40 text-gray-600 font-medium">Student Name:</span>
              <span className="text-gray-900">{selectedSubmission.studentName}</span>
            </div>
            <div className="flex border-b border-gray-200 pb-3">
              <span className="w-40 text-gray-600 font-medium">Absence Date:</span>
              <span className="text-gray-900">{selectedSubmission.absenceDate}</span>
            </div>
            <div className="flex border-b border-gray-200 pb-3">
              <span className="w-40 text-gray-600 font-medium">Reason:</span>
              <span className="text-gray-900">{selectedSubmission.reason}</span>
            </div>
            <div className="flex border-b border-gray-200 pb-3">
              <span className="w-40 text-gray-600 font-medium">Submitted:</span>
              <span className="text-gray-900">{selectedSubmission.submittedDate}</span>
            </div>
            <div className="flex border-b border-gray-200 pb-3">
              <span className="w-40 text-gray-600 font-medium">Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  selectedSubmission.status
                )}`}
              >
                {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-40 text-gray-600 font-medium">Confirmation Email:</span>
              <span className="text-gray-900 mr-2">{selectedSubmission.confirmationEmail}</span>
              <button
                data-testid="buildsubmission-copy-email"
                onClick={handleEmailCopy}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Next Actions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What Happens Next?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span>A confirmation email has been sent to {selectedSubmission.confirmationEmail}</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span>The school will review your absence report within 24 hours</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span>You will receive an email notification once your report is processed</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">✓</span>
              <span>Keep your reference number for future inquiries</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            data-testid="buildsubmission-print"
            onClick={handlePrint}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Print Confirmation
          </button>
          <button
            data-testid="buildsubmission-new"
            onClick={handleNewSubmission}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Submit Another Report
          </button>
          <button
            data-testid="buildsubmission-home"
            onClick={() => console.log('Navigate to home')}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors"
          >
            Return to Home
          </button>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Submissions</h2>
          <div data-testid="buildsubmission-list" className="space-y-3">
            {mockSubmissions.map((submission) => (
              <div
                key={submission.id}
                data-testid="buildsubmission-item"
                onClick={() => setSelectedSubmission(submission)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedSubmission.id === submission.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{submission.studentName}</p>
                    <p className="text-sm text-gray-600">Ref: {submission.referenceNumber}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Absence: {submission.absenceDate} • {submission.reason}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      submission.status
                    )}`}
                  >
                    {submission.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-700 mb-2">
            If you have questions about your submission, please contact the school office.
          </p>
          <button
            data-testid="buildsubmission-contact"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
          >
            Contact School Office
          </button>
        </div>
      </div>
    </div>
  )
}
