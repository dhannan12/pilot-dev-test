/**
 * ARefereeCommunicates — Referee-to-player communication interface during matches
 *
 * Features: message sending, player selection, communication history, priority levels, real-time status
 *
 * Ticket: SCRUM-1111 | Branch: proto/SCRUM-1103
 */

import React, { useState } from 'react'

interface Communication {
  id: string
  matchId: string
  playerId: string
  playerName: string
  message: string
  priority: 'normal' | 'warning' | 'urgent'
  timestamp: string
  status: 'sent' | 'read' | 'acknowledged'
}

const MOCK_COMMUNICATIONS: Communication[] = [
  {
    id: 'comm-001',
    matchId: 'match-101',
    playerId: 'player-201',
    playerName: 'Zhang Wei',
    message: 'Please wipe the table before your next serve',
    priority: 'normal',
    timestamp: '2026-08-25T14:23:00',
    status: 'acknowledged'
  },
  {
    id: 'comm-002',
    matchId: 'match-101',
    playerId: 'player-202',
    playerName: 'Li Ming',
    message: 'Warning: Service toss height violation',
    priority: 'warning',
    timestamp: '2026-08-25T14:25:30',
    status: 'read'
  },
  {
    id: 'comm-003',
    matchId: 'match-102',
    playerId: 'player-203',
    playerName: 'Chen Yu',
    message: 'Timeout called - 60 seconds',
    priority: 'urgent',
    timestamp: '2026-08-25T14:28:15',
    status: 'acknowledged'
  },
  {
    id: 'comm-004',
    matchId: 'match-102',
    playerId: 'player-204',
    playerName: 'Wang Lei',
    message: 'Your serve - edge ball decision confirmed',
    priority: 'normal',
    timestamp: '2026-08-25T14:30:45',
    status: 'sent'
  },
  {
    id: 'comm-005',
    matchId: 'match-103',
    playerId: 'player-205',
    playerName: 'Liu Hua',
    message: 'Final warning: unsportsmanlike conduct',
    priority: 'urgent',
    timestamp: '2026-08-25T14:32:10',
    status: 'read'
  },
  {
    id: 'comm-006',
    matchId: 'match-103',
    playerId: 'player-206',
    playerName: 'Zhao Min',
    message: 'Equipment check approved - bat is regulation',
    priority: 'normal',
    timestamp: '2026-08-25T14:35:00',
    status: 'acknowledged'
  },
  {
    id: 'comm-007',
    matchId: 'match-104',
    playerId: 'player-207',
    playerName: 'Sun Tao',
    message: 'Slow play warning - please maintain pace',
    priority: 'warning',
    timestamp: '2026-08-25T14:38:25',
    status: 'sent'
  }
]

const MOCK_PLAYERS = [
  { id: 'player-201', name: 'Zhang Wei', matchId: 'match-101' },
  { id: 'player-202', name: 'Li Ming', matchId: 'match-101' },
  { id: 'player-203', name: 'Chen Yu', matchId: 'match-102' },
  { id: 'player-204', name: 'Wang Lei', matchId: 'match-102' },
  { id: 'player-205', name: 'Liu Hua', matchId: 'match-103' },
  { id: 'player-206', name: 'Zhao Min', matchId: 'match-103' },
  { id: 'player-207', name: 'Sun Tao', matchId: 'match-104' }
]

export default function ARefereeCommunicates() {
  const [communications, setCommunications] = useState<Communication[]>(MOCK_COMMUNICATIONS)
  const [selectedPlayer, setSelectedPlayer] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [priority, setPriority] = useState<'normal' | 'warning' | 'urgent'>('normal')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPlayer || !message.trim()) return

    const player = MOCK_PLAYERS.find(p => p.id === selectedPlayer)
    if (!player) return

    const newCommunication: Communication = {
      id: `comm-${Date.now()}`,
      matchId: player.matchId,
      playerId: player.id,
      playerName: player.name,
      message: message.trim(),
      priority,
      timestamp: new Date().toISOString(),
      status: 'sent'
    }

    setCommunications([newCommunication, ...communications])
    setMessage('')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 border-red-400 text-red-800'
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800'
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'acknowledged':
        return 'text-green-600'
      case 'read':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <section data-testid="arefereecommunicates" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Referee Communication</h1>
          <p className="text-gray-600">Send messages and instructions to players during matches</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Communication Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Message</h2>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label htmlFor="player-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Player
                </label>
                <select
                  id="player-select"
                  data-testid="arefereecommunicates-player"
                  value={selectedPlayer}
                  onChange={(e) => setSelectedPlayer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a player...</option>
                  {MOCK_PLAYERS.map(player => (
                    <option key={player.id} value={player.id}>
                      {player.name} (Match {player.matchId.split('-')[1]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priority-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  id="priority-select"
                  data-testid="arefereecommunicates-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'normal' | 'warning' | 'urgent')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="normal">Normal</option>
                  <option value="warning">Warning</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message-input"
                  data-testid="arefereecommunicates-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message to the player..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                data-testid="arefereecommunicates-submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Communication History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Communication History</h2>
            <div data-testid="arefereecommunicates-list" className="space-y-3 max-h-[600px] overflow-y-auto">
              {communications.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No communications yet</p>
              ) : (
                communications.map(comm => (
                  <div
                    key={comm.id}
                    data-testid="arefereecommunicates-item"
                    className={`border-l-4 p-4 rounded-lg ${getPriorityColor(comm.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{comm.playerName}</h3>
                        <p className="text-xs text-gray-600">Match {comm.matchId.split('-')[1]}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-medium uppercase px-2 py-1 rounded bg-white bg-opacity-50">
                          {comm.priority}
                        </span>
                        <span className={`text-xs mt-1 font-medium ${getStatusColor(comm.status)}`}>
                          {comm.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{comm.message}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(comm.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Communication Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">{communications.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Messages</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-red-600">
                {communications.filter(c => c.priority === 'urgent').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Urgent</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600">
                {communications.filter(c => c.priority === 'warning').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Warnings</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-green-600">
                {communications.filter(c => c.status === 'acknowledged').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Acknowledged</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
