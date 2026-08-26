/**
 * PlayersMustComplete — Displays tournament registration deadline and player completion status
 *
 * Features: deadline countdown, player list, registration status tracking, completion indicators, real-time status updates
 *
 * Ticket: SCRUM-1213 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface Player {
  id: number
  name: string
  email: string
  registrationComplete: boolean
  registrationDate?: string
}

const MOCK_PLAYERS: Player[] = [
  {
    id: 1,
    name: 'Magnus Carlsen',
    email: 'magnus.carlsen@chess.com',
    registrationComplete: true,
    registrationDate: '2026-08-20'
  },
  {
    id: 2,
    name: 'Hikaru Nakamura',
    email: 'hikaru.nakamura@chess.com',
    registrationComplete: true,
    registrationDate: '2026-08-21'
  },
  {
    id: 3,
    name: 'Fabiano Caruana',
    email: 'fabiano.caruana@chess.com',
    registrationComplete: false
  },
  {
    id: 4,
    name: 'Ding Liren',
    email: 'ding.liren@chess.com',
    registrationComplete: false
  },
  {
    id: 5,
    name: 'Ian Nepomniachtchi',
    email: 'ian.nepo@chess.com',
    registrationComplete: true,
    registrationDate: '2026-08-22'
  },
  {
    id: 6,
    name: 'Wesley So',
    email: 'wesley.so@chess.com',
    registrationComplete: false
  },
  {
    id: 7,
    name: 'Levon Aronian',
    email: 'levon.aronian@chess.com',
    registrationComplete: true,
    registrationDate: '2026-08-19'
  }
]

const REGISTRATION_DEADLINE = '2026-08-30T23:59:59'

export default function PlayersMustComplete() {
  const [players] = useState<Player[]>(MOCK_PLAYERS)
  
  const deadlineDate = new Date(REGISTRATION_DEADLINE)
  const now = new Date()
  const daysRemaining = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  const completedCount = players.filter(p => p.registrationComplete).length
  const totalCount = players.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  return (
    <section data-testid="playersmustcomplete" className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Tournament Registration Deadline</h1>
        <p className="text-lg mb-4">All players must complete registration before the deadline</p>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-4 inline-block">
          <div className="text-sm uppercase tracking-wide mb-1">Deadline</div>
          <div className="text-3xl font-bold">
            {deadlineDate.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>
          <div className="text-sm mt-2">
            {daysRemaining > 0 ? (
              <span className="font-semibold">{daysRemaining} days remaining</span>
            ) : (
              <span className="font-semibold text-red-200">Deadline passed</span>
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Registration Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm text-green-600 uppercase mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-700">{completedCount}</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-sm text-red-600 uppercase mb-1">Incomplete</div>
            <div className="text-3xl font-bold text-red-700">{totalCount - completedCount}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm text-blue-600 uppercase mb-1">Completion Rate</div>
            <div className="text-3xl font-bold text-blue-700">{completionPercentage}%</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Players List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Player Registration Status</h2>
        
        <div className="mb-4 flex gap-2">
          <button
            data-testid="playersmustcomplete-filter-all"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            All Players
          </button>
          <button
            data-testid="playersmustcomplete-filter-complete"
            className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition"
          >
            Completed
          </button>
          <button
            data-testid="playersmustcomplete-filter-incomplete"
            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
          >
            Incomplete
          </button>
        </div>

        <div data-testid="playersmustcomplete-list" className="space-y-3">
          {players.map((player) => (
            <div
              key={player.id}
              data-testid="playersmustcomplete-item"
              className={`border rounded-lg p-4 flex items-center justify-between ${
                player.registrationComplete
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{player.name}</h3>
                <p className="text-sm text-gray-600">{player.email}</p>
                {player.registrationComplete && player.registrationDate && (
                  <p className="text-xs text-green-700 mt-1">
                    Registered on {new Date(player.registrationDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {player.registrationComplete ? (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
                      ✓ Complete
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">
                      ⚠ Incomplete
                    </span>
                    <button
                      data-testid="playersmustcomplete-remind"
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                    >
                      Send Reminder
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert for incomplete registrations */}
      {totalCount - completedCount > 0 && daysRemaining > 0 && (
        <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-yellow-800 mb-1">Action Required</h3>
              <p className="text-yellow-700">
                {totalCount - completedCount} player{totalCount - completedCount !== 1 ? 's have' : ' has'} not completed registration. 
                Please ensure all registrations are submitted before the deadline.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
