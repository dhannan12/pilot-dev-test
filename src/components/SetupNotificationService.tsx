/**
 * SetupNotificationService — Notification service configuration for appointment reminders and confirmations
 *
 * Features: notification templates, delivery channels, scheduling rules, reminder settings, confirmation management
 *
 * Ticket: SCRUM-732 | Branch: proto/SCRUM-717
 */

import React, { useState } from 'react'

interface NotificationTemplate {
  id: string
  name: string
  type: 'reminder' | 'confirmation' | 'cancellation' | 'rescheduled'
  subject: string
  message: string
  timing: string
}

interface NotificationChannel {
  id: string
  name: string
  type: 'email' | 'sms' | 'push' | 'in-app'
  enabled: boolean
  priority: number
}

interface NotificationSchedule {
  id: string
  templateId: string
  channels: string[]
  triggerTime: string
  active: boolean
}

interface AppointmentReminder {
  id: string
  appointmentId: string
  patientName: string
  appointmentDate: string
  reminderDate: string
  status: 'pending' | 'sent' | 'failed' | 'delivered'
  channel: string
}

const mockTemplates: NotificationTemplate[] = [
  {
    id: 'tmpl1',
    name: '24-Hour Reminder',
    type: 'reminder',
    subject: 'Upcoming Appointment Tomorrow',
    message: 'Hi {patient_name}, reminder that you have a physiotherapy appointment tomorrow at {time} with {therapist}.',
    timing: '24 hours before',
  },
  {
    id: 'tmpl2',
    name: 'Appointment Confirmation',
    type: 'confirmation',
    subject: 'Appointment Confirmed',
    message: 'Your appointment has been confirmed for {date} at {time}. We look forward to seeing you!',
    timing: 'Immediately',
  },
  {
    id: 'tmpl3',
    name: '2-Hour Reminder',
    type: 'reminder',
    subject: 'Appointment in 2 Hours',
    message: 'Hi {patient_name}, this is a reminder that your appointment is in 2 hours at {time}.',
    timing: '2 hours before',
  },
  {
    id: 'tmpl4',
    name: 'Cancellation Notice',
    type: 'cancellation',
    subject: 'Appointment Cancelled',
    message: 'Your appointment scheduled for {date} at {time} has been cancelled. Please contact us to reschedule.',
    timing: 'Immediately',
  },
  {
    id: 'tmpl5',
    name: 'Reschedule Confirmation',
    type: 'rescheduled',
    subject: 'Appointment Rescheduled',
    message: 'Your appointment has been rescheduled to {new_date} at {new_time}. See you then!',
    timing: 'Immediately',
  },
]

const mockChannels: NotificationChannel[] = [
  { id: 'ch1', name: 'Email Notifications', type: 'email', enabled: true, priority: 1 },
  { id: 'ch2', name: 'SMS Messages', type: 'sms', enabled: true, priority: 2 },
  { id: 'ch3', name: 'Push Notifications', type: 'push', enabled: false, priority: 3 },
  { id: 'ch4', name: 'In-App Alerts', type: 'in-app', enabled: true, priority: 4 },
  { id: 'ch5', name: 'WhatsApp Messages', type: 'sms', enabled: false, priority: 5 },
]

const mockSchedules: NotificationSchedule[] = [
  { id: 'sch1', templateId: 'tmpl1', channels: ['ch1', 'ch2'], triggerTime: '24h before', active: true },
  { id: 'sch2', templateId: 'tmpl2', channels: ['ch1', 'ch4'], triggerTime: 'immediate', active: true },
  { id: 'sch3', templateId: 'tmpl3', channels: ['ch2'], triggerTime: '2h before', active: true },
  { id: 'sch4', templateId: 'tmpl4', channels: ['ch1', 'ch2', 'ch4'], triggerTime: 'immediate', active: true },
  { id: 'sch5', templateId: 'tmpl5', channels: ['ch1', 'ch4'], triggerTime: 'immediate', active: true },
]

const mockReminders: AppointmentReminder[] = [
  {
    id: 'rem1',
    appointmentId: 'apt001',
    patientName: 'John Smith',
    appointmentDate: '2026-08-14 10:00 AM',
    reminderDate: '2026-08-13 10:00 AM',
    status: 'sent',
    channel: 'email',
  },
  {
    id: 'rem2',
    appointmentId: 'apt002',
    patientName: 'Sarah Johnson',
    appointmentDate: '2026-08-14 02:00 PM',
    reminderDate: '2026-08-13 02:00 PM',
    status: 'delivered',
    channel: 'sms',
  },
  {
    id: 'rem3',
    appointmentId: 'apt003',
    patientName: 'Michael Chen',
    appointmentDate: '2026-08-15 09:30 AM',
    reminderDate: '2026-08-14 09:30 AM',
    status: 'pending',
    channel: 'email',
  },
  {
    id: 'rem4',
    appointmentId: 'apt004',
    patientName: 'Emily Davis',
    appointmentDate: '2026-08-15 03:00 PM',
    reminderDate: '2026-08-14 03:00 PM',
    status: 'sent',
    channel: 'in-app',
  },
  {
    id: 'rem5',
    appointmentId: 'apt005',
    patientName: 'David Wilson',
    appointmentDate: '2026-08-16 11:00 AM',
    reminderDate: '2026-08-15 11:00 AM',
    status: 'failed',
    channel: 'sms',
  },
]

export default function SetupNotificationService() {
  const [activeTab, setActiveTab] = useState<'templates' | 'channels' | 'schedules' | 'reminders'>('templates')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return '📧'
      case 'sms':
        return '📱'
      case 'push':
        return '🔔'
      case 'in-app':
        return '💬'
      default:
        return '📨'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'bg-purple-100 text-purple-800'
      case 'confirmation':
        return 'bg-green-100 text-green-800'
      case 'cancellation':
        return 'bg-red-100 text-red-800'
      case 'rescheduled':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notification Service Setup</h1>
              <p className="text-gray-600 mt-1">Configure appointment reminders and confirmations</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                ⚙️ Settings
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                ➕ New Template
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1 p-2">
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'templates'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📝 Templates
              </button>
              <button
                onClick={() => setActiveTab('channels')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'channels'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📡 Channels
              </button>
              <button
                onClick={() => setActiveTab('schedules')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'schedules'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📅 Schedules
              </button>
              <button
                onClick={() => setActiveTab('reminders')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'reminders'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                🔔 Reminders
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Notification Templates</h2>
                  <p className="text-gray-600">Manage message templates for different notification types</p>
                </div>
                <div className="space-y-4">
                  {mockTemplates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                              {template.type}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              ⏰ {template.timing}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Subject: {template.subject}</p>
                          <p className="text-sm text-gray-600">{template.message}</p>
                        </div>
                        <button className="ml-4 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Channels Tab */}
            {activeTab === 'channels' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Notification Channels</h2>
                  <p className="text-gray-600">Configure delivery methods for notifications</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockChannels.map((channel) => (
                    <div
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel.id)}
                      className={`border rounded-lg p-6 cursor-pointer transition-all ${
                        selectedChannel === channel.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{getChannelIcon(channel.type)}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{channel.name}</h3>
                            <p className="text-sm text-gray-600 capitalize">{channel.type}</p>
                          </div>
                        </div>
                        <div className={`w-12 h-6 rounded-full transition-colors ${
                          channel.enabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-0.5 ${
                            channel.enabled ? 'translate-x-6 ml-1' : 'translate-x-0 ml-0.5'
                          }`} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Priority: {channel.priority}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          channel.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {channel.enabled ? 'Active' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedules Tab */}
            {activeTab === 'schedules' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Notification Schedules</h2>
                  <p className="text-gray-600">Configure when notifications are sent</p>
                </div>
                <div className="space-y-4">
                  {mockSchedules.map((schedule) => {
                    const template = mockTemplates.find((t) => t.id === schedule.templateId)
                    const channels = mockChannels.filter((c) => schedule.channels.includes(c.id))
                    return (
                      <div
                        key={schedule.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900">{template?.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              schedule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {schedule.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            Configure
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Trigger Time:</p>
                            <p className="font-medium text-gray-900">⏰ {schedule.triggerTime}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Channels:</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {channels.map((ch) => (
                                <span key={ch.id} className="text-lg">
                                  {getChannelIcon(ch.type)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Reminders Tab */}
            {activeTab === 'reminders' && (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Appointment Reminders</h2>
                  <p className="text-gray-600">Track and manage sent reminders</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patient</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Appointment</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reminder Sent</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Channel</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockReminders.map((reminder) => (
                        <tr key={reminder.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">
                            {reminder.patientName}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {reminder.appointmentDate}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {reminder.reminderDate}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span className="inline-flex items-center space-x-1">
                              <span>{getChannelIcon(reminder.channel)}</span>
                              <span className="capitalize text-gray-700">{reminder.channel}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                              {reminder.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <button className="text-blue-600 hover:text-blue-700 mr-3">View</button>
                            {reminder.status === 'failed' && (
                              <button className="text-green-600 hover:text-green-700">Resend</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Reminders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">127</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Delivered</p>
                <p className="text-2xl font-bold text-green-600 mt-1">98.4%</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">8</p>
              </div>
              <div className="text-3xl">⏳</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Failed</p>
                <p className="text-2xl font-bold text-red-600 mt-1">2</p>
              </div>
              <div className="text-3xl">❌</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
