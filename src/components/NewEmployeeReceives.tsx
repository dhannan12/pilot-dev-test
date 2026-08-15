/**
 * NewEmployeeReceives — Displays automated reminder emails for overdue onboarding tasks
 *
 * Features: email list, overdue task tracking, reminder status, task priority, action buttons
 *
 * Ticket: SCRUM-885 | Branch: proto/SCRUM-879
 */

import React, { useState } from 'react'

interface ReminderEmail {
  id: string
  employeeName: string
  employeeEmail: string
  taskName: string
  taskCategory: string
  dueDate: string
  daysPastDue: number
  reminderCount: number
  priority: 'High' | 'Medium' | 'Low'
  status: 'Pending' | 'Sent' | 'Failed'
  lastSent?: string
}

const MOCK_REMINDERS: ReminderEmail[] = [
  {
    id: 'rem-001',
    employeeName: 'Sarah Johnson',
    employeeEmail: 'sarah.johnson@company.com',
    taskName: 'Complete IT Security Training',
    taskCategory: 'Compliance',
    dueDate: '2026-08-10',
    daysPastDue: 5,
    reminderCount: 2,
    priority: 'High',
    status: 'Sent',
    lastSent: '2026-08-15 09:00'
  },
  {
    id: 'rem-002',
    employeeName: 'Michael Chen',
    employeeEmail: 'michael.chen@company.com',
    taskName: 'Submit Emergency Contact Information',
    taskCategory: 'HR Documentation',
    dueDate: '2026-08-12',
    daysPastDue: 3,
    reminderCount: 1,
    priority: 'High',
    status: 'Sent',
    lastSent: '2026-08-15 08:30'
  },
  {
    id: 'rem-003',
    employeeName: 'Emily Rodriguez',
    employeeEmail: 'emily.rodriguez@company.com',
    taskName: 'Set Up Direct Deposit',
    taskCategory: 'Payroll',
    dueDate: '2026-08-13',
    daysPastDue: 2,
    reminderCount: 1,
    priority: 'Medium',
    status: 'Pending',
  },
  {
    id: 'rem-004',
    employeeName: 'David Kim',
    employeeEmail: 'david.kim@company.com',
    taskName: 'Complete Benefits Enrollment',
    taskCategory: 'Benefits',
    dueDate: '2026-08-09',
    daysPastDue: 6,
    reminderCount: 3,
    priority: 'High',
    status: 'Failed',
    lastSent: '2026-08-15 07:00'
  },
  {
    id: 'rem-005',
    employeeName: 'Jessica Martinez',
    employeeEmail: 'jessica.martinez@company.com',
    taskName: 'Review Company Policies',
    taskCategory: 'Onboarding',
    dueDate: '2026-08-14',
    daysPastDue: 1,
    reminderCount: 1,
    priority: 'Low',
    status: 'Sent',
    lastSent: '2026-08-15 10:15'
  },
  {
    id: 'rem-006',
    employeeName: 'Robert Thompson',
    employeeEmail: 'robert.thompson@company.com',
    taskName: 'Complete Workplace Safety Training',
    taskCategory: 'Compliance',
    dueDate: '2026-08-11',
    daysPastDue: 4,
    reminderCount: 2,
    priority: 'High',
    status: 'Sent',
    lastSent: '2026-08-15 09:45'
  },
  {
    id: 'rem-007',
    employeeName: 'Amanda Wilson',
    employeeEmail: 'amanda.wilson@company.com',
    taskName: 'Upload Profile Photo',
    taskCategory: 'Profile Setup',
    dueDate: '2026-08-14',
    daysPastDue: 1,
    reminderCount: 1,
    priority: 'Low',
    status: 'Pending',
  }
]

export default function NewEmployeeReceives() {
  const [reminders, setReminders] = useState<ReminderEmail[]>(MOCK_REMINDERS)
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [filterPriority, setFilterPriority] = useState<string>('All')

  const filteredReminders = reminders.filter((reminder) => {
    const statusMatch = filterStatus === 'All' || reminder.status === filterStatus
    const priorityMatch = filterPriority === 'All' || reminder.priority === filterPriority
    return statusMatch && priorityMatch
  })

  const handleResendReminder = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { 
            ...reminder, 
            status: 'Sent' as const, 
            lastSent: new Date().toLocaleString('en-US', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit', 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            reminderCount: reminder.reminderCount + 1
          }
        : reminder
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Low':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Pending':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'Failed':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const stats = {
    total: reminders.length,
    sent: reminders.filter(r => r.status === 'Sent').length,
    pending: reminders.filter(r => r.status === 'Pending').length,
    failed: reminders.filter(r => r.status === 'Failed').length,
    highPriority: reminders.filter(r => r.priority === 'High').length
  }

  return (
    <div data-testid="newemployeereceives" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Automated Task Reminders
          </h1>
          <p className="text-gray-600">
            Monitor and manage automated reminder emails for overdue onboarding tasks
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Reminders</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-green-200">
            <div className="text-sm text-gray-600 mb-1">Sent</div>
            <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-orange-200">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-red-200">
            <div className="text-sm text-gray-600 mb-1">Failed</div>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-red-200">
            <div className="text-sm text-gray-600 mb-1">High Priority</div>
            <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="status-filter"
                data-testid="newemployeereceives-status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Sent">Sent</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Priority
              </label>
              <select
                id="priority-filter"
                data-testid="newemployeereceives-priority-filter"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reminders List */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Reminder Emails ({filteredReminders.length})
            </h2>
          </div>
          <div data-testid="newemployeereceives-list" className="divide-y divide-gray-200">
            {filteredReminders.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No reminders found matching your filters
              </div>
            ) : (
              filteredReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  data-testid="newemployeereceives-item"
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {reminder.employeeName}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(reminder.priority)}`}>
                          {reminder.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(reminder.status)}`}>
                          {reminder.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Email:</span> {reminder.employeeEmail}
                      </div>
                      <div className="text-sm text-gray-900 font-medium mb-1">
                        Task: {reminder.taskName}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>Category: {reminder.taskCategory}</span>
                        <span>Due: {reminder.dueDate}</span>
                        <span className="text-red-600 font-medium">
                          {reminder.daysPastDue} {reminder.daysPastDue === 1 ? 'day' : 'days'} overdue
                        </span>
                        <span>Reminders sent: {reminder.reminderCount}</span>
                      </div>
                      {reminder.lastSent && (
                        <div className="text-xs text-gray-500 mt-1">
                          Last sent: {reminder.lastSent}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        data-testid="newemployeereceives-resend"
                        onClick={() => handleResendReminder(reminder.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Resend
                      </button>
                      <button
                        data-testid="newemployeereceives-view"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Reminders are sent automatically daily at 8:00 AM for all overdue tasks
        </div>
      </div>
    </div>
  )
}
