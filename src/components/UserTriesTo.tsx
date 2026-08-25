/**
 * UserTriesTo — User attempts to access exclusive museum events
 *
 * Features: event access control, membership verification, status feedback, exclusive event listings, access attempt tracking
 *
 * Ticket: SCRUM-1129 | Branch: proto/SCRUM-1127
 */

import React, { useState } from 'react'

interface ExclusiveEvent {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  requiredLevel: 'standard' | 'premium' | 'vip' | 'patron'
  capacity: number
  spotsLeft: number
}

interface UserStatus {
  name: string
  membershipLevel: 'none' | 'standard' | 'premium' | 'vip' | 'patron'
  memberId: string
}

interface AccessAttempt {
  eventId: string
  status: 'pending' | 'granted' | 'denied'
  message: string
}

const EXCLUSIVE_EVENTS: ExclusiveEvent[] = [
  {
    id: 'evt-001',
    name: 'Medieval Manuscripts Private Viewing',
    date: '2026-09-15',
    time: '18:00',
    location: 'Rare Documents Gallery',
    description: 'Exclusive viewing of 12th century illuminated manuscripts from the monastery of Mellifont Abbey',
    requiredLevel: 'premium',
    capacity: 20,
    spotsLeft: 8
  },
  {
    id: 'evt-002',
    name: 'Curator\'s Evening: Viking Treasures',
    date: '2026-09-20',
    time: '19:30',
    location: 'Viking Exhibition Hall',
    description: 'Private curator-led tour of newly discovered Viking artifacts from archaeological sites in County Louth',
    requiredLevel: 'vip',
    capacity: 15,
    spotsLeft: 3
  },
  {
    id: 'evt-003',
    name: 'Patrons\' Gala: Heritage Celebration',
    date: '2026-10-05',
    time: '20:00',
    location: 'Grand Hall',
    description: 'Annual black-tie gala celebrating Irish heritage with live traditional music, fine dining, and exclusive art unveiling',
    requiredLevel: 'patron',
    capacity: 50,
    spotsLeft: 12
  },
  {
    id: 'evt-004',
    name: 'Children\'s Workshop: Medieval Crafts',
    date: '2026-09-25',
    time: '14:00',
    location: 'Education Center',
    description: 'Hands-on workshop where children learn medieval calligraphy and bookbinding techniques',
    requiredLevel: 'standard',
    capacity: 25,
    spotsLeft: 18
  },
  {
    id: 'evt-005',
    name: 'Restoration Lab Behind-the-Scenes',
    date: '2026-10-10',
    time: '10:00',
    location: 'Conservation Laboratory',
    description: 'Exclusive access to the restoration lab where conservators work on historical artifacts',
    requiredLevel: 'premium',
    capacity: 10,
    spotsLeft: 5
  },
  {
    id: 'evt-006',
    name: 'VIP Wine Tasting & Art Preview',
    date: '2026-10-18',
    time: '18:30',
    location: 'Members Lounge',
    description: 'Premium wine tasting paired with preview of upcoming exhibition featuring local Irish artists',
    requiredLevel: 'vip',
    capacity: 30,
    spotsLeft: 15
  },
  {
    id: 'evt-007',
    name: 'Heritage Lecture Series: Norman Invasion',
    date: '2026-09-28',
    time: '15:00',
    location: 'Auditorium',
    description: 'Expert lecture on the Norman invasion of Ireland and its impact on Dundalk and surrounding areas',
    requiredLevel: 'standard',
    capacity: 60,
    spotsLeft: 42
  }
]

const MEMBERSHIP_LEVELS = {
  none: { label: 'Non-Member', color: 'gray', priority: 0 },
  standard: { label: 'Standard Member', color: 'blue', priority: 1 },
  premium: { label: 'Premium Member', color: 'purple', priority: 2 },
  vip: { label: 'VIP Member', color: 'amber', priority: 3 },
  patron: { label: 'Patron', color: 'emerald', priority: 4 }
}

export default function UserTriesTo() {
  const [currentUser, setCurrentUser] = useState<UserStatus>({
    name: 'Sarah O\'Connor',
    membershipLevel: 'standard',
    memberId: 'MEM-2024-1891'
  })

  const [accessAttempts, setAccessAttempts] = useState<Record<string, AccessAttempt>>({})

  const handleAccessAttempt = (event: ExclusiveEvent) => {
    const userPriority = MEMBERSHIP_LEVELS[currentUser.membershipLevel].priority
    const requiredPriority = MEMBERSHIP_LEVELS[event.requiredLevel].priority

    let status: 'granted' | 'denied'
    let message: string

    if (userPriority >= requiredPriority) {
      if (event.spotsLeft > 0) {
        status = 'granted'
        message = `Access granted! Your ${MEMBERSHIP_LEVELS[currentUser.membershipLevel].label} status qualifies you for this event.`
      } else {
        status = 'denied'
        message = 'Event is fully booked. No spots remaining.'
      }
    } else {
      status = 'denied'
      message = `Access denied. This event requires ${MEMBERSHIP_LEVELS[event.requiredLevel].label} or higher. You currently have ${MEMBERSHIP_LEVELS[currentUser.membershipLevel].label} status.`
    }

    setAccessAttempts({
      ...accessAttempts,
      [event.id]: { eventId: event.id, status, message }
    })
  }

  const handleChangeMembership = (level: UserStatus['membershipLevel']) => {
    setCurrentUser({ ...currentUser, membershipLevel: level })
    setAccessAttempts({}) // Clear attempts when membership changes
  }

  const getMembershipColor = (level: string) => {
    const levelKey = level as keyof typeof MEMBERSHIP_LEVELS
    return MEMBERSHIP_LEVELS[levelKey]?.color || 'gray'
  }

  const getMembershipBadgeClass = (level: string) => {
    const color = getMembershipColor(level)
    const colorMap: Record<string, string> = {
      gray: 'bg-gray-100 text-gray-800',
      blue: 'bg-blue-100 text-blue-800',
      purple: 'bg-purple-100 text-purple-800',
      amber: 'bg-amber-100 text-amber-800',
      emerald: 'bg-emerald-100 text-emerald-800'
    }
    return colorMap[color] || colorMap.gray
  }

  return (
    <div data-testid="usertriesto" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Exclusive Museum Events
          </h1>
          <p className="text-gray-600 mb-4">
            Access to exclusive events is based on your membership level. Try accessing events below.
          </p>

          {/* Current User Status */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Current User</h2>
                <p className="text-gray-700">{currentUser.name}</p>
                <p className="text-sm text-gray-500">Member ID: {currentUser.memberId}</p>
              </div>
              <span className={`px-4 py-2 rounded-full font-semibold ${getMembershipBadgeClass(currentUser.membershipLevel)}`}>
                {MEMBERSHIP_LEVELS[currentUser.membershipLevel].label}
              </span>
            </div>

            {/* Membership Level Selector (for demo purposes) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Simulate Different Membership Level:
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(MEMBERSHIP_LEVELS).map(([level, info]) => (
                  <button
                    key={level}
                    data-testid={`usertriesto-membership-${level}`}
                    onClick={() => handleChangeMembership(level as UserStatus['membershipLevel'])}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      currentUser.membershipLevel === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {info.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4" data-testid="usertriesto-list">
          {EXCLUSIVE_EVENTS.map((event) => {
            const attempt = accessAttempts[event.id]
            const requiredLevelInfo = MEMBERSHIP_LEVELS[event.requiredLevel]

            return (
              <div
                key={event.id}
                data-testid="usertriesto-item"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Event Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{event.name}</h3>
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${getMembershipBadgeClass(event.requiredLevel)}`}>
                        Requires: {requiredLevelInfo.label}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Date:</span>
                        <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Time:</span>
                        <p className="text-gray-600">{event.time}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Location:</span>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Availability:</span>
                        <p className={`${event.spotsLeft > 5 ? 'text-green-600' : event.spotsLeft > 0 ? 'text-amber-600' : 'text-red-600'} font-semibold`}>
                          {event.spotsLeft} / {event.capacity} spots
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col items-stretch lg:items-end gap-2 min-w-[200px]">
                    <button
                      data-testid={`usertriesto-access-${event.id}`}
                      onClick={() => handleAccessAttempt(event)}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Request Access
                    </button>
                    
                    {/* Access Attempt Result */}
                    {attempt && (
                      <div
                        data-testid={`usertriesto-result-${event.id}`}
                        className={`p-3 rounded-lg text-sm ${
                          attempt.status === 'granted'
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <p className={`font-semibold mb-1 ${
                          attempt.status === 'granted' ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {attempt.status === 'granted' ? '✓ Access Granted' : '✗ Access Denied'}
                        </p>
                        <p className={attempt.status === 'granted' ? 'text-green-700' : 'text-red-700'}>
                          {attempt.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Membership Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {Object.entries(MEMBERSHIP_LEVELS).map(([level, info]) => (
              <div key={level} className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getMembershipBadgeClass(level)}`}>
                  {info.label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Higher membership levels grant access to all events available to lower levels.
          </p>
        </div>
      </div>
    </div>
  )
}
