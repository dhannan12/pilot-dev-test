/**
 * PlayersAreNotified — Displays push notifications for chess tournament match times
 *
 * Features: notification list, match time display, read/dismiss actions, player/opponent info, board assignments
 *
 * Ticket: SCRUM-1216 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface MatchNotification {
  id: string
  playerName: string
  opponentName: string
  matchTime: string
  boardNumber: number
  round: number
  timestamp: string
  isRead: boolean
}

const mockNotifications: MatchNotification[] = [
  {
    id: 'notif-1',
    playerName: 'Alexandra Chen',
    opponentName: 'Marcus Johnson',
    matchTime: '2026-08-26 14:00',
    boardNumber: 3,
    round: 1,
    timestamp: '2026-08-26 09:30',
    isRead: false
  },
  {
    id: 'notif-2',
    playerName: 'David Martinez',
    opponentName: 'Sarah Williams',
    matchTime: '2026-08-26 15:30',
    boardNumber: 7,
    round: 1,
    timestamp: '2026-08-26 09:30',
    isRead: false
  },
  {
    id: 'notif-3',
    playerName: 'Emily Thompson',
    opponentName: 'James Anderson',
    matchTime: '2026-08-26 14:00',
    boardNumber: 12,
    round: 1,
    timestamp: '2026-08-26 09:30',
    isRead: true
  },
  {
    id: 'notif-4',
    playerName: 'Robert Kim',
    opponentName: 'Lisa Brown',
    matchTime: '2026-08-26 16:00',
    boardNumber: 5,
    round: 2,
    timestamp: '2026-08-26 10:15',
    isRead: false
  },
  {
    id: 'notif-5',
    playerName: 'Maria Garcia',
    opponentName: 'John Smith',
    matchTime: '2026-08-26 17:00',
    boardNumber: 9,
    round: 2,
    timestamp: '2026-08-26 10:15',
    isRead: false
  },
  {
    id: 'notif-6',
    playerName: 'Thomas Wright',
    opponentName: 'Anna Lee',
    matchTime: '2026-08-26 15:30',
    boardNumber: 15,
    round: 2,
    timestamp: '2026-08-26 10:15',
    isRead: true
  }
]

export default function PlayersAreNotified() {
  const [notifications, setNotifications] = useState<MatchNotification[]>(mockNotifications)

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ))
  }

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })))
  }

  const handleClearAll = () => {
    setNotifications(notifications.filter(notif => !notif.isRead))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <section data-testid="playersarenotified" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Match Notifications</h1>
              <p className="text-gray-600 mt-1">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                data-testid="playersarenotified-mark-all-read"
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Mark All Read
              </button>
              <button
                data-testid="playersarenotified-clear-all"
                onClick={handleClearAll}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear Read
              </button>
            </div>
          </div>
        </div>

        <ul data-testid="playersarenotified-list" className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">No notifications at this time</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <li
                key={notification.id}
                data-testid="playersarenotified-item"
                className={`bg-white rounded-lg shadow-md p-6 transition-all ${
                  notification.isRead ? 'opacity-60' : 'border-l-4 border-blue-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {notification.playerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Round {notification.round} Match Scheduled
                        </h3>
                        <p className="text-sm text-gray-500">
                          Notified at {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          NEW
                        </span>
                      )}
                    </div>

                    <div className="ml-15 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium">Player:</span>
                        <span className="text-gray-900">{notification.playerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium">Opponent:</span>
                        <span className="text-gray-900">{notification.opponentName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium">Match Time:</span>
                        <span className="text-blue-700 font-semibold">
                          {new Date(notification.matchTime).toLocaleString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium">Board:</span>
                        <span className="text-gray-900">#{notification.boardNumber}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {!notification.isRead && (
                      <button
                        data-testid="playersarenotified-mark-read"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      data-testid="playersarenotified-dismiss"
                      onClick={() => handleDismiss(notification.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors whitespace-nowrap"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  )
}
