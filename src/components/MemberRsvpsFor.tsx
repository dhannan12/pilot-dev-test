/**
 * MemberRsvpsFor — Member RSVP management for upcoming matches
 *
 * Features: match list, RSVP status tracking, multi-choice responses, match details, attendance tracking
 *
 * Ticket: SCRUM-1268 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

type RsvpStatus = 'yes' | 'no' | 'maybe' | 'pending'

interface Match {
  id: string
  opponent: string
  date: string
  time: string
  location: string
  homeAway: 'home' | 'away'
  rsvpStatus: RsvpStatus
  attendeeCount: number
}

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    opponent: 'Riverside Tigers',
    date: '2026-09-05',
    time: '18:00',
    location: 'Central Sports Complex',
    homeAway: 'home',
    rsvpStatus: 'pending',
    attendeeCount: 12
  },
  {
    id: '2',
    opponent: 'Mountain Lions FC',
    date: '2026-09-12',
    time: '19:30',
    location: 'Mountain Stadium',
    homeAway: 'away',
    rsvpStatus: 'yes',
    attendeeCount: 18
  },
  {
    id: '3',
    opponent: 'City United',
    date: '2026-09-19',
    time: '17:00',
    location: 'Central Sports Complex',
    homeAway: 'home',
    rsvpStatus: 'maybe',
    attendeeCount: 9
  },
  {
    id: '4',
    opponent: 'Lakeside Rangers',
    date: '2026-09-26',
    time: '20:00',
    location: 'Lakeside Arena',
    homeAway: 'away',
    rsvpStatus: 'pending',
    attendeeCount: 15
  },
  {
    id: '5',
    opponent: 'Coastal Warriors',
    date: '2026-10-03',
    time: '16:30',
    location: 'Central Sports Complex',
    homeAway: 'home',
    rsvpStatus: 'no',
    attendeeCount: 11
  },
  {
    id: '6',
    opponent: 'Valley Hawks',
    date: '2026-10-10',
    time: '18:30',
    location: 'Valley Sports Ground',
    homeAway: 'away',
    rsvpStatus: 'pending',
    attendeeCount: 14
  }
]

export default function MemberRsvpsFor() {
  const [matches, setMatches] = useState<Match[]>(MOCK_MATCHES)

  const handleRsvp = (matchId: string, status: RsvpStatus) => {
    setMatches(prevMatches =>
      prevMatches.map(match =>
        match.id === matchId
          ? { ...match, rsvpStatus: status }
          : match
      )
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getRsvpButtonClass = (currentStatus: RsvpStatus, buttonStatus: RsvpStatus) => {
    const baseClass = 'px-3 py-1 rounded text-sm font-medium transition-colors'
    if (currentStatus === buttonStatus) {
      switch (buttonStatus) {
        case 'yes':
          return `${baseClass} bg-green-600 text-white`
        case 'no':
          return `${baseClass} bg-red-600 text-white`
        case 'maybe':
          return `${baseClass} bg-yellow-600 text-white`
        default:
          return `${baseClass} bg-gray-300 text-gray-700`
      }
    }
    return `${baseClass} bg-gray-100 text-gray-600 hover:bg-gray-200`
  }

  const getStatusBadgeClass = (status: RsvpStatus) => {
    switch (status) {
      case 'yes':
        return 'bg-green-100 text-green-800'
      case 'no':
        return 'bg-red-100 text-red-800'
      case 'maybe':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div data-testid="memberrsvpsfor" className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Match RSVPs</h1>
        <p className="text-gray-600">Manage your attendance for upcoming matches</p>
      </div>

      <div data-testid="memberrsvpsfor-list" className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            data-testid="memberrsvpsfor-item"
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Match Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    vs {match.opponent}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      match.homeAway === 'home'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {match.homeAway.toUpperCase()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(
                      match.rsvpStatus
                    )}`}
                  >
                    {match.rsvpStatus === 'pending' ? 'No Response' : match.rsvpStatus.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{formatDate(match.date)} at {match.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{match.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>{match.attendeeCount} attending</span>
                  </div>
                </div>
              </div>

              {/* RSVP Buttons */}
              <div className="flex flex-col gap-2 md:items-end">
                <p className="text-xs text-gray-500 mb-1">Your RSVP:</p>
                <div className="flex gap-2">
                  <button
                    data-testid="memberrsvpsfor-rsvp-yes"
                    onClick={() => handleRsvp(match.id, 'yes')}
                    className={getRsvpButtonClass(match.rsvpStatus, 'yes')}
                  >
                    Yes
                  </button>
                  <button
                    data-testid="memberrsvpsfor-rsvp-no"
                    onClick={() => handleRsvp(match.id, 'no')}
                    className={getRsvpButtonClass(match.rsvpStatus, 'no')}
                  >
                    No
                  </button>
                  <button
                    data-testid="memberrsvpsfor-rsvp-maybe"
                    onClick={() => handleRsvp(match.id, 'maybe')}
                    className={getRsvpButtonClass(match.rsvpStatus, 'maybe')}
                  >
                    Maybe
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {matches.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No upcoming matches</p>
        </div>
      )}
    </div>
  )
}
