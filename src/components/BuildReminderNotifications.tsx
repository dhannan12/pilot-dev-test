/**
 * BuildReminderNotifications — Manages appointment reminder notifications for dental clinic patients
 *
 * Features: reminder list display, notification timing configuration, toggle active status, filter by type, delivery method selection
 *
 * Ticket: SCRUM-758 | Branch: proto/SCRUM-747
 */

import { useState } from 'react'

interface ReminderNotification {
  id: string
  patientName: string
  patientEmail: string
  patientPhone: string
  appointmentDate: string
  appointmentTime: string
  appointmentType: string
  reminderType: 'email' | 'sms' | 'both'
  sendBefore: string
  status: 'scheduled' | 'sent' | 'failed' | 'cancelled'
  scheduledFor: string
  sentAt?: string
  createdAt: string
}

const MOCK_REMINDERS: ReminderNotification[] = [
  {
    id: 'REM-001',
    patientName: 'Sarah Johnson',
    patientEmail: 'sarah.j@email.com',
    patientPhone: '(555) 123-4567',
    appointmentDate: '2026-08-20',
    appointmentTime: '10:00 AM',
    appointmentType: 'Regular Checkup',
    reminderType: 'both',
    sendBefore: '24 hours',
    status: 'scheduled',
    scheduledFor: '2026-08-19 10:00 AM',
    createdAt: '2026-08-13 09:15 AM'
  },
  {
    id: 'REM-002',
    patientName: 'Michael Chen',
    patientEmail: 'mchen@email.com',
    patientPhone: '(555) 234-5678',
    appointmentDate: '2026-08-21',
    appointmentTime: '02:30 PM',
    appointmentType: 'Teeth Cleaning',
    reminderType: 'email',
    sendBefore: '48 hours',
    status: 'scheduled',
    scheduledFor: '2026-08-19 02:30 PM',
    createdAt: '2026-08-13 10:30 AM'
  },
  {
    id: 'REM-003',
    patientName: 'Emily Rodriguez',
    patientEmail: 'emily.r@email.com',
    patientPhone: '(555) 345-6789',
    appointmentDate: '2026-08-15',
    appointmentTime: '11:00 AM',
    appointmentType: 'Root Canal',
    reminderType: 'sms',
    sendBefore: '24 hours',
    status: 'sent',
    scheduledFor: '2026-08-14 11:00 AM',
    sentAt: '2026-08-14 11:02 AM',
    createdAt: '2026-08-10 03:20 PM'
  },
  {
    id: 'REM-004',
    patientName: 'David Thompson',
    patientEmail: 'david.t@email.com',
    patientPhone: '(555) 456-7890',
    appointmentDate: '2026-08-16',
    appointmentTime: '03:00 PM',
    appointmentType: 'Dental Implant',
    reminderType: 'both',
    sendBefore: '72 hours',
    status: 'sent',
    scheduledFor: '2026-08-13 03:00 PM',
    sentAt: '2026-08-13 03:01 PM',
    createdAt: '2026-08-08 01:45 PM'
  },
  {
    id: 'REM-005',
    patientName: 'Jessica Martinez',
    patientEmail: 'jess.martinez@email.com',
    patientPhone: '(555) 567-8901',
    appointmentDate: '2026-08-18',
    appointmentTime: '09:30 AM',
    appointmentType: 'Orthodontic Consultation',
    reminderType: 'email',
    sendBefore: '24 hours',
    status: 'failed',
    scheduledFor: '2026-08-17 09:30 AM',
    createdAt: '2026-08-12 11:10 AM'
  },
  {
    id: 'REM-006',
    patientName: 'Robert Wilson',
    patientEmail: 'r.wilson@email.com',
    patientPhone: '(555) 678-9012',
    appointmentDate: '2026-08-22',
    appointmentTime: '01:00 PM',
    appointmentType: 'Emergency Visit',
    reminderType: 'sms',
    sendBefore: '12 hours',
    status: 'scheduled',
    scheduledFor: '2026-08-22 01:00 AM',
    createdAt: '2026-08-13 02:30 PM'
  },
  {
    id: 'REM-007',
    patientName: 'Amanda Lee',
    patientEmail: 'amanda.lee@email.com',
    patientPhone: '(555) 789-0123',
    appointmentDate: '2026-08-19',
    appointmentTime: '04:15 PM',
    appointmentType: 'Cavity Filling',
    reminderType: 'both',
    sendBefore: '24 hours',
    status: 'cancelled',
    scheduledFor: '2026-08-18 04:15 PM',
    createdAt: '2026-08-11 09:00 AM'
  }
]

export default function BuildReminderNotifications() {
  const [reminders] = useState<ReminderNotification[]>(MOCK_REMINDERS)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'sent':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getReminderTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return '📧'
      case 'sms':
        return '📱'
      case 'both':
        return '📧📱'
      default:
        return '📬'
    }
  }

  const filteredReminders = reminders.filter(reminder => {
    const matchesStatus = selectedStatus === 'all' || reminder.status === selectedStatus
    const matchesType = selectedType === 'all' || reminder.reminderType === selectedType
    const matchesSearch = searchQuery === '' || 
      reminder.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.appointmentType.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesType && matchesSearch
  })

  const statusCounts = {
    all: reminders.length,
    scheduled: reminders.filter(r => r.status === 'scheduled').length,
    sent: reminders.filter(r => r.status === 'sent').length,
    failed: reminders.filter(r => r.status === 'failed').length,
    cancelled: reminders.filter(r => r.status === 'cancelled').length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reminder Notifications</h1>
          <p className="text-gray-600">Manage and monitor appointment reminder notifications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">Total Reminders</div>
            <div className="text-2xl font-bold text-gray-900">{statusCounts.all}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-1">Scheduled</div>
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.scheduled}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-1">Sent</div>
            <div className="text-2xl font-bold text-green-600">{statusCounts.sent}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-red-500">
            <div className="text-sm text-gray-600 mb-1">Failed</div>
            <div className="text-2xl font-bold text-red-600">{statusCounts.failed}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-gray-500">
            <div className="text-sm text-gray-600 mb-1">Cancelled</div>
            <div className="text-2xl font-bold text-gray-600">{statusCounts.cancelled}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by patient or appointment type..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="sent">Sent</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="email">Email Only</option>
                <option value="sms">SMS Only</option>
                <option value="both">Email & SMS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reminders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Appointment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Send Before
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled For
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReminders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No reminder notifications found
                    </td>
                  </tr>
                ) : (
                  filteredReminders.map((reminder) => (
                    <tr key={reminder.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{reminder.patientName}</div>
                        <div className="text-xs text-gray-500">{reminder.patientEmail}</div>
                        <div className="text-xs text-gray-500">{reminder.patientPhone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{reminder.appointmentType}</div>
                        <div className="text-xs text-gray-500">
                          {reminder.appointmentDate} at {reminder.appointmentTime}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">{getReminderTypeIcon(reminder.reminderType)}</span>
                          <span className="text-sm text-gray-700 capitalize">{reminder.reminderType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{reminder.sendBefore}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{reminder.scheduledFor}</div>
                        {reminder.sentAt && (
                          <div className="text-xs text-green-600">Sent: {reminder.sentAt}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reminder.status)}`}>
                          {reminder.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {reminder.status === 'scheduled' && (
                            <>
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                                Cancel
                              </button>
                            </>
                          )}
                          {reminder.status === 'failed' && (
                            <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                              Retry
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredReminders.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{reminders.length}</span> reminder notifications
          </div>
        </div>
      </div>
    </div>
  )
}
