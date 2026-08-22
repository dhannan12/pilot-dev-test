/**
 * CaregiverAttemptsTo — Displays access denial when caregiver attempts to monitor health metrics without permission
 *
 * Features: permission validation, access denied messaging, health metric display (locked), action logging, user privacy protection
 *
 * Ticket: SCRUM-1121 | Branch: proto/SCRUM-1115
 */

import { useState } from 'react'

interface HealthMetric {
  id: string
  userId: string
  userName: string
  metricType: string
  value: string
  timestamp: string
  accessGranted: boolean
}

interface AccessAttempt {
  id: string
  attemptTime: string
  caregiverName: string
  targetUser: string
  metricRequested: string
  status: 'denied' | 'pending' | 'granted'
  reason: string
}

const MOCK_HEALTH_METRICS: HealthMetric[] = [
  {
    id: 'hm-1',
    userId: 'user-001',
    userName: 'Margaret Thompson',
    metricType: 'Blood Pressure',
    value: '***/**',
    timestamp: '2026-08-22 08:30 AM',
    accessGranted: false
  },
  {
    id: 'hm-2',
    userId: 'user-002',
    userName: 'Robert Chen',
    metricType: 'Heart Rate',
    value: '*** BPM',
    timestamp: '2026-08-22 09:15 AM',
    accessGranted: false
  },
  {
    id: 'hm-3',
    userId: 'user-003',
    userName: 'Linda Martinez',
    metricType: 'Blood Glucose',
    value: '*** mg/dL',
    timestamp: '2026-08-22 10:00 AM',
    accessGranted: false
  },
  {
    id: 'hm-4',
    userId: 'user-004',
    userName: 'James Wilson',
    metricType: 'Temperature',
    value: '**.*°F',
    timestamp: '2026-08-22 11:20 AM',
    accessGranted: false
  },
  {
    id: 'hm-5',
    userId: 'user-005',
    userName: 'Patricia Davis',
    metricType: 'Oxygen Saturation',
    value: '**%',
    timestamp: '2026-08-22 12:45 PM',
    accessGranted: false
  }
]

const MOCK_ACCESS_ATTEMPTS: AccessAttempt[] = [
  {
    id: 'att-1',
    attemptTime: '2026-08-22 08:35 AM',
    caregiverName: 'Sarah Johnson',
    targetUser: 'Margaret Thompson',
    metricRequested: 'Blood Pressure',
    status: 'denied',
    reason: 'No active permission granted by user'
  },
  {
    id: 'att-2',
    attemptTime: '2026-08-22 09:20 AM',
    caregiverName: 'Sarah Johnson',
    targetUser: 'Robert Chen',
    metricRequested: 'Heart Rate',
    status: 'denied',
    reason: 'Permission expired on 2026-08-15'
  },
  {
    id: 'att-3',
    attemptTime: '2026-08-22 10:05 AM',
    caregiverName: 'Sarah Johnson',
    targetUser: 'Linda Martinez',
    metricRequested: 'Blood Glucose',
    status: 'pending',
    reason: 'Permission request sent, awaiting user approval'
  },
  {
    id: 'att-4',
    attemptTime: '2026-08-22 11:25 AM',
    caregiverName: 'Sarah Johnson',
    targetUser: 'James Wilson',
    metricRequested: 'Temperature',
    status: 'denied',
    reason: 'User declined access request'
  },
  {
    id: 'att-5',
    attemptTime: '2026-08-22 12:50 PM',
    caregiverName: 'Sarah Johnson',
    targetUser: 'Patricia Davis',
    metricRequested: 'Oxygen Saturation',
    status: 'denied',
    reason: 'No permission granted by user'
  }
]

export default function CaregiverAttemptsTo() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [attempts, setAttempts] = useState<AccessAttempt[]>(MOCK_ACCESS_ATTEMPTS)
  const [showRequestModal, setShowRequestModal] = useState(false)

  const handleRequestAccess = (metricId: string) => {
    const metric = MOCK_HEALTH_METRICS.find(m => m.id === metricId)
    if (metric) {
      setSelectedMetric(metricId)
      setShowRequestModal(true)
    }
  }

  const submitAccessRequest = () => {
    const metric = MOCK_HEALTH_METRICS.find(m => m.id === selectedMetric)
    if (metric) {
      const newAttempt: AccessAttempt = {
        id: `att-${Date.now()}`,
        attemptTime: new Date().toLocaleString('en-US', { 
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        caregiverName: 'Sarah Johnson',
        targetUser: metric.userName,
        metricRequested: metric.metricType,
        status: 'pending',
        reason: 'Permission request sent, awaiting user approval'
      }
      setAttempts([newAttempt, ...attempts])
      setShowRequestModal(false)
      setSelectedMetric(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'denied':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'granted':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div data-testid="caregiverattemptsto" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Metrics Monitor</h1>
              <p className="text-gray-600">Caregiver Dashboard - Sarah Johnson</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-300 rounded-lg">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-semibold text-red-800">Limited Access Mode</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Metrics Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Health Metrics</h2>
            <div data-testid="caregiverattemptsto-list" className="space-y-4">
              {MOCK_HEALTH_METRICS.map((metric) => (
                <div
                  key={metric.id}
                  data-testid="caregiverattemptsto-item"
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{metric.userName}</h3>
                      <p className="text-sm text-gray-600">{metric.metricType}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-sm font-semibold text-red-800">Access Denied</span>
                    </div>
                    <p className="text-sm text-gray-700">Value: <span className="font-mono text-gray-500">{metric.value}</span></p>
                    <p className="text-xs text-gray-600 mt-1">Recorded: {metric.timestamp}</p>
                  </div>

                  <button
                    data-testid="caregiverattemptsto-request"
                    onClick={() => handleRequestAccess(metric.id)}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Request Access Permission
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Access Attempts Log */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Access Attempt Log</h2>
            <div data-testid="caregiverattemptsto-attempts-list" className="space-y-3">
              {attempts.map((attempt) => (
                <div
                  key={attempt.id}
                  data-testid="caregiverattemptsto-attempt-item"
                  className={`border rounded-lg p-4 ${getStatusColor(attempt.status)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{attempt.targetUser}</p>
                      <p className="text-xs opacity-75">{attempt.metricRequested}</p>
                    </div>
                    <span className="text-xs font-bold uppercase px-2 py-1 bg-white bg-opacity-50 rounded">
                      {attempt.status}
                    </span>
                  </div>
                  <p className="text-xs mb-2">{attempt.reason}</p>
                  <p className="text-xs opacity-75">{attempt.attemptTime}</p>
                </div>
              ))}
            </div>

            {/* Information Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">Privacy Protection Active</h3>
              <p className="text-xs text-blue-800 leading-relaxed">
                All health metrics are protected by user privacy settings. Caregivers must receive explicit 
                permission from each user before accessing their health data. Permission requests are logged 
                and users are notified immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div 
          data-testid="caregiverattemptsto-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Request Access Permission</h3>
            
            {selectedMetric && (
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  You are requesting access to view health metrics for:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <p className="font-semibold text-gray-900">
                    {MOCK_HEALTH_METRICS.find(m => m.id === selectedMetric)?.userName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {MOCK_HEALTH_METRICS.find(m => m.id === selectedMetric)?.metricType}
                  </p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="request-reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Access (optional)
              </label>
              <textarea
                id="request-reason"
                data-testid="caregiverattemptsto-reason"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Explain why you need access to this health data..."
              />
            </div>

            <div className="flex gap-3">
              <button
                data-testid="caregiverattemptsto-submit"
                onClick={submitAccessRequest}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Send Request
              </button>
              <button
                data-testid="caregiverattemptsto-cancel"
                onClick={() => {
                  setShowRequestModal(false)
                  setSelectedMetric(null)
                }}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
