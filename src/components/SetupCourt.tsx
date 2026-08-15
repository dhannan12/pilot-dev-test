/**
 * SetupCourt — Configure court date notification service settings and preferences
 *
 * Features: notification channel setup, delivery schedule configuration, recipient management, notification templates, priority rules
 *
 * Ticket: SCRUM-902 | Branch: proto/SCRUM-892
 */

import { useState } from 'react'

interface NotificationChannel {
  id: string
  name: string
  type: 'email' | 'sms' | 'push' | 'webhook'
  enabled: boolean
  config: {
    provider?: string
    endpoint?: string
    apiKey?: string
  }
  lastTested?: string
  status: 'active' | 'inactive' | 'error'
}

interface NotificationSchedule {
  id: string
  name: string
  daysBeforeCourtDate: number
  time: string
  channels: string[]
  priority: 'high' | 'medium' | 'low'
  enabled: boolean
}

interface RecipientGroup {
  id: string
  name: string
  description: string
  recipients: string[]
  notificationPreference: 'all' | 'critical-only' | 'custom'
  active: boolean
}

const MOCK_CHANNELS: NotificationChannel[] = [
  {
    id: 'CH001',
    name: 'Primary Email Service',
    type: 'email',
    enabled: true,
    config: {
      provider: 'SendGrid',
      endpoint: 'api.sendgrid.com',
      apiKey: '***********4a2f'
    },
    lastTested: '2026-08-15 09:30',
    status: 'active'
  },
  {
    id: 'CH002',
    name: 'SMS Gateway',
    type: 'sms',
    enabled: true,
    config: {
      provider: 'Twilio',
      endpoint: 'api.twilio.com',
      apiKey: '***********8b9c'
    },
    lastTested: '2026-08-15 08:45',
    status: 'active'
  },
  {
    id: 'CH003',
    name: 'Push Notification Service',
    type: 'push',
    enabled: false,
    config: {
      provider: 'Firebase',
      endpoint: 'fcm.googleapis.com',
      apiKey: '***********1d3e'
    },
    lastTested: '2026-08-10 14:20',
    status: 'inactive'
  },
  {
    id: 'CH004',
    name: 'Webhook Integration',
    type: 'webhook',
    enabled: true,
    config: {
      provider: 'Custom',
      endpoint: 'https://api.example.com/notify',
      apiKey: '***********7f2a'
    },
    lastTested: '2026-08-15 10:15',
    status: 'active'
  },
  {
    id: 'CH005',
    name: 'Backup Email Service',
    type: 'email',
    enabled: false,
    config: {
      provider: 'Amazon SES',
      endpoint: 'email.us-east-1.amazonaws.com',
      apiKey: '***********9c4b'
    },
    lastTested: '2026-08-12 16:00',
    status: 'inactive'
  }
]

const MOCK_SCHEDULES: NotificationSchedule[] = [
  {
    id: 'SCH001',
    name: '7-Day Advance Notice',
    daysBeforeCourtDate: 7,
    time: '09:00',
    channels: ['CH001', 'CH002'],
    priority: 'high',
    enabled: true
  },
  {
    id: 'SCH002',
    name: '3-Day Reminder',
    daysBeforeCourtDate: 3,
    time: '10:00',
    channels: ['CH001', 'CH002', 'CH004'],
    priority: 'high',
    enabled: true
  },
  {
    id: 'SCH003',
    name: '1-Day Final Notice',
    daysBeforeCourtDate: 1,
    time: '08:00',
    channels: ['CH001', 'CH002'],
    priority: 'high',
    enabled: true
  },
  {
    id: 'SCH004',
    name: 'Same Day Alert',
    daysBeforeCourtDate: 0,
    time: '07:00',
    channels: ['CH002'],
    priority: 'high',
    enabled: true
  },
  {
    id: 'SCH005',
    name: '14-Day Early Warning',
    daysBeforeCourtDate: 14,
    time: '11:00',
    channels: ['CH001'],
    priority: 'medium',
    enabled: false
  }
]

const MOCK_RECIPIENT_GROUPS: RecipientGroup[] = [
  {
    id: 'RG001',
    name: 'Primary Solicitors',
    description: 'Main legal team handling active cases',
    recipients: ['john.doe@law.com', 'jane.smith@law.com', 'robert.jones@law.com'],
    notificationPreference: 'all',
    active: true
  },
  {
    id: 'RG002',
    name: 'Clients',
    description: 'Direct case clients requiring notifications',
    recipients: ['client1@email.com', 'client2@email.com', 'client3@email.com', 'client4@email.com'],
    notificationPreference: 'critical-only',
    active: true
  },
  {
    id: 'RG003',
    name: 'Admin Staff',
    description: 'Administrative team for case management',
    recipients: ['admin1@law.com', 'admin2@law.com'],
    notificationPreference: 'all',
    active: true
  },
  {
    id: 'RG004',
    name: 'External Counsel',
    description: 'Collaborating attorneys from other firms',
    recipients: ['ext.counsel1@firm.com', 'ext.counsel2@firm.com'],
    notificationPreference: 'custom',
    active: false
  },
  {
    id: 'RG005',
    name: 'Court Liaisons',
    description: 'Court representatives and coordinators',
    recipients: ['liaison1@court.gov', 'liaison2@court.gov'],
    notificationPreference: 'critical-only',
    active: true
  }
]

export default function SetupCourt() {
  const [channels, setChannels] = useState<NotificationChannel[]>(MOCK_CHANNELS)
  const [schedules, setSchedules] = useState<NotificationSchedule[]>(MOCK_SCHEDULES)
  const [recipientGroups, setRecipientGroups] = useState<RecipientGroup[]>(MOCK_RECIPIENT_GROUPS)
  const [activeTab, setActiveTab] = useState<'channels' | 'schedules' | 'recipients'>('channels')

  const toggleChannelEnabled = (channelId: string) => {
    setChannels(prev =>
      prev.map(ch =>
        ch.id === channelId
          ? { ...ch, enabled: !ch.enabled, status: !ch.enabled ? 'active' : 'inactive' }
          : ch
      )
    )
  }

  const toggleScheduleEnabled = (scheduleId: string) => {
    setSchedules(prev =>
      prev.map(sch =>
        sch.id === scheduleId ? { ...sch, enabled: !sch.enabled } : sch
      )
    )
  }

  const toggleGroupActive = (groupId: string) => {
    setRecipientGroups(prev =>
      prev.map(grp =>
        grp.id === groupId ? { ...grp, active: !grp.active } : grp
      )
    )
  }

  const testChannel = (channelId: string) => {
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ')
    setChannels(prev =>
      prev.map(ch =>
        ch.id === channelId
          ? { ...ch, lastTested: now, status: 'active' }
          : ch
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return '📧'
      case 'sms':
        return '📱'
      case 'push':
        return '🔔'
      case 'webhook':
        return '🔗'
      default:
        return '📤'
    }
  }

  const activeChannelsCount = channels.filter(ch => ch.enabled).length
  const activeSchedulesCount = schedules.filter(sch => sch.enabled).length
  const activeGroupsCount = recipientGroups.filter(grp => grp.active).length

  return (
    <div data-testid="setupcourt" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Court Date Notification Setup
          </h1>
          <p className="text-gray-600">
            Configure notification channels, schedules, and recipient groups for court date alerts
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Active Channels</div>
            <div className="text-2xl font-bold text-gray-900">
              {activeChannelsCount} / {channels.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Active Schedules</div>
            <div className="text-2xl font-bold text-gray-900">
              {activeSchedulesCount} / {schedules.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Active Recipient Groups</div>
            <div className="text-2xl font-bold text-gray-900">
              {activeGroupsCount} / {recipientGroups.length}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                data-testid="setupcourt-tab-channels"
                onClick={() => setActiveTab('channels')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'channels'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notification Channels ({channels.length})
              </button>
              <button
                data-testid="setupcourt-tab-schedules"
                onClick={() => setActiveTab('schedules')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'schedules'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notification Schedules ({schedules.length})
              </button>
              <button
                data-testid="setupcourt-tab-recipients"
                onClick={() => setActiveTab('recipients')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'recipients'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Recipient Groups ({recipientGroups.length})
              </button>
            </nav>
          </div>

          {/* Channels Tab */}
          {activeTab === 'channels' && (
            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Notification Channels
                </h2>
                <button
                  data-testid="setupcourt-add-channel"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Add Channel
                </button>
              </div>
              <div data-testid="setupcourt-channels-list" className="space-y-4">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    data-testid="setupcourt-channel-item"
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{getChannelIcon(channel.type)}</span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {channel.name}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(channel.status)}`}>
                            {channel.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Type:</span>{' '}
                            <span className="uppercase">{channel.type}</span>
                          </div>
                          <div>
                            <span className="font-medium">Provider:</span> {channel.config.provider || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">Endpoint:</span> {channel.config.endpoint || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">Last Tested:</span> {channel.lastTested || 'Never'}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          data-testid="setupcourt-test-channel"
                          onClick={() => testChannel(channel.id)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Test
                        </button>
                        <button
                          data-testid="setupcourt-toggle-channel"
                          onClick={() => toggleChannelEnabled(channel.id)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            channel.enabled
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-400 text-white hover:bg-gray-500'
                          }`}
                        >
                          {channel.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedules Tab */}
          {activeTab === 'schedules' && (
            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Notification Schedules
                </h2>
                <button
                  data-testid="setupcourt-add-schedule"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Add Schedule
                </button>
              </div>
              <div data-testid="setupcourt-schedules-list" className="space-y-4">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    data-testid="setupcourt-schedule-item"
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {schedule.name}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            schedule.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : schedule.priority === 'medium'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {schedule.priority.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Days Before:</span> {schedule.daysBeforeCourtDate} days
                          </div>
                          <div>
                            <span className="font-medium">Send Time:</span> {schedule.time}
                          </div>
                          <div>
                            <span className="font-medium">Channels:</span> {schedule.channels.length} configured
                          </div>
                          <div>
                            <span className="font-medium">Status:</span>{' '}
                            <span className={schedule.enabled ? 'text-green-600' : 'text-gray-500'}>
                              {schedule.enabled ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          data-testid="setupcourt-edit-schedule"
                          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          data-testid="setupcourt-toggle-schedule"
                          onClick={() => toggleScheduleEnabled(schedule.id)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            schedule.enabled
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-400 text-white hover:bg-gray-500'
                          }`}
                        >
                          {schedule.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recipients Tab */}
          {activeTab === 'recipients' && (
            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recipient Groups
                </h2>
                <button
                  data-testid="setupcourt-add-group"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Add Group
                </button>
              </div>
              <div data-testid="setupcourt-recipients-list" className="space-y-4">
                {recipientGroups.map((group) => (
                  <div
                    key={group.id}
                    data-testid="setupcourt-recipient-item"
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {group.name}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${
                            group.active
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-gray-100 text-gray-800 border-gray-300'
                          }`}>
                            {group.active ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Recipients:</span> {group.recipients.length} members
                          </div>
                          <div>
                            <span className="font-medium">Preference:</span>{' '}
                            <span className="capitalize">{group.notificationPreference.replace('-', ' ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          data-testid="setupcourt-edit-group"
                          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          data-testid="setupcourt-toggle-group"
                          onClick={() => toggleGroupActive(group.id)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            group.active
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-400 text-white hover:bg-gray-500'
                          }`}
                        >
                          {group.active ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Save Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Save Configuration</h3>
              <p className="text-sm text-gray-600">
                Apply changes to the court date notification system
              </p>
            </div>
            <div className="flex gap-3">
              <button
                data-testid="setupcourt-reset"
                className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
              <button
                data-testid="setupcourt-save"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
