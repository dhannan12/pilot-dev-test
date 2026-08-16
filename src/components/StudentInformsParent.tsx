/**
 * StudentInformsParent — Student notifies parent about planned absence
 *
 * Features: absence selection, parent contact picker, message preview, send notification, confirmation feedback
 *
 * Ticket: SCRUM-946 | Branch: proto/SCRUM-938
 */

import { useState } from 'react'

interface Absence {
  id: string
  date: string
  reason: string
  status: 'draft' | 'pending' | 'approved' | 'rejected'
}

interface Parent {
  id: string
  name: string
  relationship: string
  email: string
  phone: string
}

const MOCK_ABSENCES: Absence[] = [
  { id: 'abs-1', date: '2026-08-18', reason: 'Medical Appointment', status: 'draft' },
  { id: 'abs-2', date: '2026-08-20', reason: 'Family Emergency', status: 'draft' },
  { id: 'abs-3', date: '2026-08-22', reason: 'Dental Checkup', status: 'draft' },
  { id: 'abs-4', date: '2026-08-25', reason: 'College Visit', status: 'draft' },
  { id: 'abs-5', date: '2026-08-27', reason: 'Personal Day', status: 'draft' },
]

const MOCK_PARENTS: Parent[] = [
  { id: 'p-1', name: 'Sarah Johnson', relationship: 'Mother', email: 'sarah.j@email.com', phone: '555-0101' },
  { id: 'p-2', name: 'Michael Johnson', relationship: 'Father', email: 'michael.j@email.com', phone: '555-0102' },
  { id: 'p-3', name: 'Linda Martinez', relationship: 'Guardian', email: 'linda.m@email.com', phone: '555-0103' },
  { id: 'p-4', name: 'Robert Smith', relationship: 'Stepfather', email: 'robert.s@email.com', phone: '555-0104' },
  { id: 'p-5', name: 'Emily Davis', relationship: 'Grandmother', email: 'emily.d@email.com', phone: '555-0105' },
]

export default function StudentInformsParent() {
  const [selectedAbsence, setSelectedAbsence] = useState<string>('')
  const [selectedParent, setSelectedParent] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [notificationSent, setNotificationSent] = useState<boolean>(false)
  const [sentNotifications, setSentNotifications] = useState<Array<{ absenceId: string; parentId: string; timestamp: string }>>([])

  const handleSendNotification = () => {
    if (!selectedAbsence || !selectedParent) return

    const absence = MOCK_ABSENCES.find(a => a.id === selectedAbsence)
    const parent = MOCK_PARENTS.find(p => p.id === selectedParent)

    if (!absence || !parent) return

    const notification = {
      absenceId: selectedAbsence,
      parentId: selectedParent,
      timestamp: new Date().toISOString(),
    }

    setSentNotifications([...sentNotifications, notification])
    setNotificationSent(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      setNotificationSent(false)
      setSelectedAbsence('')
      setSelectedParent('')
      setMessage('')
    }, 2000)
  }

  const selectedAbsenceData = MOCK_ABSENCES.find(a => a.id === selectedAbsence)
  const selectedParentData = MOCK_PARENTS.find(p => p.id === selectedParent)

  return (
    <div data-testid="studentinformsparent" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notify Parent About Absence</h1>
          <p className="text-gray-600 mb-6">
            Select an absence and choose which parent or guardian you'd like to inform before submitting your absence request.
          </p>

          {notificationSent && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-green-900">Notification Sent!</h3>
                  <p className="text-sm text-green-700">Your parent has been notified about the absence.</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Select Absence */}
            <div>
              <label htmlFor="absence-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Absence
              </label>
              <select
                id="absence-select"
                data-testid="studentinformsparent-absence"
                value={selectedAbsence}
                onChange={(e) => setSelectedAbsence(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Choose an absence --</option>
                {MOCK_ABSENCES.map((absence) => (
                  <option key={absence.id} value={absence.id}>
                    {absence.date} - {absence.reason}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Parent */}
            <div>
              <label htmlFor="parent-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Parent/Guardian
              </label>
              <select
                id="parent-select"
                data-testid="studentinformsparent-parent"
                value={selectedParent}
                onChange={(e) => setSelectedParent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Choose a parent/guardian --</option>
                {MOCK_PARENTS.map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.name} ({parent.relationship})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Message */}
          <div className="mb-6">
            <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Message (Optional)
            </label>
            <textarea
              id="message-input"
              data-testid="studentinformsparent-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Add any additional information for your parent..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Preview Section */}
          {selectedAbsenceData && selectedParentData && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Notification Preview</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium">To:</span> {selectedParentData.name} ({selectedParentData.email})
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Subject:</span> Absence Notification for {selectedAbsenceData.date}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Reason:</span> {selectedAbsenceData.reason}
                </p>
                {message && (
                  <p className="text-gray-700">
                    <span className="font-medium">Message:</span> {message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              data-testid="studentinformsparent-send"
              onClick={handleSendNotification}
              disabled={!selectedAbsence || !selectedParent}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send Notification
            </button>
            <button
              data-testid="studentinformsparent-clear"
              onClick={() => {
                setSelectedAbsence('')
                setSelectedParent('')
                setMessage('')
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Sent Notifications History */}
        {sentNotifications.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notifications</h2>
            <div data-testid="studentinformsparent-list" className="space-y-3">
              {sentNotifications.map((notification, index) => {
                const absence = MOCK_ABSENCES.find(a => a.id === notification.absenceId)
                const parent = MOCK_PARENTS.find(p => p.id === notification.parentId)
                return (
                  <div
                    key={index}
                    data-testid="studentinformsparent-item"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {parent?.name} notified about {absence?.reason}
                      </p>
                      <p className="text-sm text-gray-600">
                        Date: {absence?.date} • Sent: {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Sent
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
