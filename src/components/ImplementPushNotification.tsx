/**
 * ImplementPushNotification — Push notification service integration and management
 *
 * Features: notification preferences, notification history, permission status, notification categories, real-time updates simulation
 *
 * Ticket: SCRUM-1222 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface Notification {
  id: string
  title: string
  message: string
  category: 'game' | 'tournament' | 'social' | 'system'
  timestamp: string
  isRead: boolean
}

interface NotificationPreference {
  id: string
  category: 'game' | 'tournament' | 'social' | 'system'
  label: string
  enabled: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Game Invitation',
    message: 'Player Magnus invited you to a chess match',
    category: 'game',
    timestamp: '2026-08-26T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    title: 'Tournament Starting Soon',
    message: 'Grand Chess Tournament starts in 30 minutes',
    category: 'tournament',
    timestamp: '2026-08-26T09:15:00Z',
    isRead: false
  },
  {
    id: '3',
    title: 'New Follower',
    message: 'ChessMaster2026 started following you',
    category: 'social',
    timestamp: '2026-08-26T08:45:00Z',
    isRead: true
  },
  {
    id: '4',
    title: 'System Update',
    message: 'New features available in the chess app',
    category: 'system',
    timestamp: '2026-08-26T07:00:00Z',
    isRead: true
  },
  {
    id: '5',
    title: 'Match Result',
    message: 'You won your match against Player Hikaru!',
    category: 'game',
    timestamp: '2026-08-25T22:30:00Z',
    isRead: true
  },
  {
    id: '6',
    title: 'Tournament Reminder',
    message: 'Blitz Championship registration closes tomorrow',
    category: 'tournament',
    timestamp: '2026-08-25T18:00:00Z',
    isRead: true
  }
]

const initialPreferences: NotificationPreference[] = [
  { id: 'game', category: 'game', label: 'Game Invitations & Results', enabled: true },
  { id: 'tournament', category: 'tournament', label: 'Tournament Updates', enabled: true },
  { id: 'social', category: 'social', label: 'Social Interactions', enabled: true },
  { id: 'system', category: 'system', label: 'System Notifications', enabled: false }
]

export default function ImplementPushNotification() {
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'default'>('default')
  const [preferences, setPreferences] = useState<NotificationPreference[]>(initialPreferences)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeTab, setActiveTab] = useState<'history' | 'settings'>('history')

  const handleRequestPermission = () => {
    // Simulate permission request
    setPermissionStatus('granted')
  }

  const handleTogglePreference = (id: string) => {
    setPreferences(prev =>
      prev.map(pref =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    )
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    )
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getCategoryColor = (category: string) => {
    const colors = {
      game: 'bg-blue-100 text-blue-800 border-blue-300',
      tournament: 'bg-purple-100 text-purple-800 border-purple-300',
      social: 'bg-green-100 text-green-800 border-green-300',
      system: 'bg-gray-100 text-gray-800 border-gray-300'
    }
    return colors[category as keyof typeof colors] || colors.system
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div data-testid="implementpushnotification" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Push Notifications</h1>
              <p className="text-gray-600 mt-1">Manage your notification preferences</p>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                  {unreadCount} unread
                </span>
              </div>
            )}
          </div>

          {/* Permission Status */}
          <div className={`p-4 rounded-lg border-2 ${
            permissionStatus === 'granted' 
              ? 'bg-green-50 border-green-300' 
              : 'bg-yellow-50 border-yellow-300'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  permissionStatus === 'granted' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {permissionStatus === 'granted' ? 'Notifications Enabled' : 'Notifications Disabled'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {permissionStatus === 'granted' 
                      ? 'You will receive push notifications' 
                      : 'Enable notifications to stay updated'}
                  </p>
                </div>
              </div>
              {permissionStatus !== 'granted' && (
                <button
                  data-testid="implementpushnotification-enable"
                  onClick={handleRequestPermission}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Enable Notifications
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              data-testid="implementpushnotification-tab-history"
              onClick={() => setActiveTab('history')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Notification History
            </button>
            <button
              data-testid="implementpushnotification-tab-settings"
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'history' && (
              <div data-testid="implementpushnotification-history">
                {/* Action Buttons */}
                {notifications.length > 0 && (
                  <div className="flex gap-3 mb-4">
                    <button
                      data-testid="implementpushnotification-markallread"
                      onClick={handleMarkAllAsRead}
                      disabled={unreadCount === 0}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                      Mark All as Read
                    </button>
                    <button
                      data-testid="implementpushnotification-clearall"
                      onClick={handleClearAll}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                )}

                {/* Notification List */}
                <div data-testid="implementpushnotification-list" className="space-y-3">
                  {notifications.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-5xl mb-3">🔔</div>
                      <p className="text-gray-600 font-medium">No notifications</p>
                      <p className="text-gray-500 text-sm">You're all caught up!</p>
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        data-testid="implementpushnotification-item"
                        className={`p-4 rounded-lg border-2 transition-all ${
                          notification.isRead
                            ? 'bg-gray-50 border-gray-200'
                            : 'bg-white border-blue-300 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(notification.category)}`}>
                                {notification.category.toUpperCase()}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">
                              {notification.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {notification.message}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <button
                              data-testid="implementpushnotification-markread"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                            >
                              Mark Read
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div data-testid="implementpushnotification-settings">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Notification Preferences
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose which types of notifications you want to receive
                </p>

                <div data-testid="implementpushnotification-preferences" className="space-y-3">
                  {preferences.map(preference => (
                    <div
                      key={preference.id}
                      data-testid="implementpushnotification-preference"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(preference.category)}`}>
                          {preference.category.toUpperCase()}
                        </span>
                        <span className="font-medium text-gray-800">
                          {preference.label}
                        </span>
                      </div>
                      <button
                        data-testid={`implementpushnotification-toggle-${preference.id}`}
                        onClick={() => handleTogglePreference(preference.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preference.enabled ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preference.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        ></span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">💡 Tip:</span> You can change these preferences at any time. 
                    Critical notifications will always be delivered regardless of your preferences.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
