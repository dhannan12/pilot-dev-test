/**
 * EventRegistration — Event registration form with active membership validation
 *
 * Features: membership status check, event selection, registration form, validation messages, status indicators
 *
 * Ticket: SCRUM-676 | Branch: proto/SCRUM-674
 */

import { useState } from 'react'

interface Member {
  id: string
  name: string
  email: string
  membershipStatus: 'active' | 'inactive' | 'pending' | 'expired'
  memberSince: string
}

interface Event {
  id: string
  name: string
  date: string
  location: string
  capacity: number
  registered: number
}

const MOCK_MEMBERS: Member[] = [
  { id: 'M001', name: 'Alice Johnson', email: 'alice@example.com', membershipStatus: 'active', memberSince: '2024-01-15' },
  { id: 'M002', name: 'Bob Smith', email: 'bob@example.com', membershipStatus: 'inactive', memberSince: '2023-06-20' },
  { id: 'M003', name: 'Carol Davis', email: 'carol@example.com', membershipStatus: 'active', memberSince: '2024-03-10' },
  { id: 'M004', name: 'David Lee', email: 'david@example.com', membershipStatus: 'expired', memberSince: '2022-11-05' },
  { id: 'M005', name: 'Emma Wilson', email: 'emma@example.com', membershipStatus: 'active', memberSince: '2024-05-22' },
  { id: 'M006', name: 'Frank Miller', email: 'frank@example.com', membershipStatus: 'pending', memberSince: '2026-08-01' },
  { id: 'M007', name: 'Grace Taylor', email: 'grace@example.com', membershipStatus: 'active', memberSince: '2023-09-12' }
]

const MOCK_EVENTS: Event[] = [
  { id: 'E001', name: 'Annual Gala Dinner', date: '2026-09-15', location: 'Grand Hotel Ballroom', capacity: 150, registered: 87 },
  { id: 'E002', name: 'Tech Workshop Series', date: '2026-08-25', location: 'Innovation Center', capacity: 50, registered: 42 },
  { id: 'E003', name: 'Community Networking Night', date: '2026-09-01', location: 'Downtown Conference Hall', capacity: 100, registered: 65 },
  { id: 'E004', name: 'Charity Golf Tournament', date: '2026-10-10', location: 'Riverside Golf Club', capacity: 80, registered: 48 },
  { id: 'E005', name: 'Leadership Summit', date: '2026-11-05', location: 'City Convention Center', capacity: 200, registered: 134 }
]

export default function EventRegistration() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('')
  const [selectedEventId, setSelectedEventId] = useState<string>('')
  const [registrationMessage, setRegistrationMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const selectedMember = MOCK_MEMBERS.find(m => m.id === selectedMemberId)
  const selectedEvent = MOCK_EVENTS.find(e => e.id === selectedEventId)

  const handleRegister = () => {
    setRegistrationMessage('')
    setMessageType('')

    if (!selectedMember) {
      setRegistrationMessage('Please select a member')
      setMessageType('error')
      return
    }

    if (!selectedEvent) {
      setRegistrationMessage('Please select an event')
      setMessageType('error')
      return
    }

    // Check if member has active membership status
    if (selectedMember.membershipStatus !== 'active') {
      setRegistrationMessage(
        `Registration failed: ${selectedMember.name} does not have an active membership. Current status: ${selectedMember.membershipStatus}`
      )
      setMessageType('error')
      return
    }

    // Check event capacity
    if (selectedEvent.registered >= selectedEvent.capacity) {
      setRegistrationMessage(`Registration failed: ${selectedEvent.name} is at full capacity`)
      setMessageType('error')
      return
    }

    // Success
    setRegistrationMessage(
      `Success! ${selectedMember.name} has been registered for ${selectedEvent.name} on ${selectedEvent.date}`
    )
    setMessageType('success')
  }

  const getMemberStatusColor = (status: Member['membershipStatus']) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-100'
      case 'inactive':
        return 'text-gray-700 bg-gray-100'
      case 'pending':
        return 'text-yellow-700 bg-yellow-100'
      case 'expired':
        return 'text-red-700 bg-red-100'
      default:
        return 'text-gray-700 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Registration</h1>
          <p className="text-gray-600 mb-6">Only members with active membership status can register for events</p>

          {/* Member Selection */}
          <div className="mb-6">
            <label htmlFor="member-select" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Member
            </label>
            <select
              id="member-select"
              value={selectedMemberId}
              onChange={(e) => {
                setSelectedMemberId(e.target.value)
                setRegistrationMessage('')
                setMessageType('')
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Choose a member --</option>
              {MOCK_MEMBERS.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.membershipStatus})
                </option>
              ))}
            </select>

            {selectedMember && (
              <div className="mt-3 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{selectedMember.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getMemberStatusColor(selectedMember.membershipStatus)}`}>
                    {selectedMember.membershipStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Email: {selectedMember.email}</p>
                <p className="text-sm text-gray-600">Member since: {selectedMember.memberSince}</p>
                {selectedMember.membershipStatus !== 'active' && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    ⚠️ This member cannot register for events (membership not active)
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Event Selection */}
          <div className="mb-6">
            <label htmlFor="event-select" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Event
            </label>
            <select
              id="event-select"
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value)
                setRegistrationMessage('')
                setMessageType('')
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Choose an event --</option>
              {MOCK_EVENTS.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name} - {event.date}
                </option>
              ))}
            </select>

            {selectedEvent && (
              <div className="mt-3 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedEvent.name}</h3>
                <p className="text-sm text-gray-600">📅 Date: {selectedEvent.date}</p>
                <p className="text-sm text-gray-600">📍 Location: {selectedEvent.location}</p>
                <p className="text-sm text-gray-600">
                  👥 Capacity: {selectedEvent.registered} / {selectedEvent.capacity} registered
                </p>
                {selectedEvent.registered >= selectedEvent.capacity && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
                    ⚠️ This event is at full capacity
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={!selectedMemberId || !selectedEventId}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Register for Event
          </button>

          {/* Registration Message */}
          {registrationMessage && (
            <div
              className={`mt-4 p-4 rounded-md ${
                messageType === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              <p className="font-medium">{registrationMessage}</p>
            </div>
          )}

          {/* Statistics */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Membership Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">
                  {MOCK_MEMBERS.filter(m => m.membershipStatus === 'active').length}
                </p>
                <p className="text-sm text-green-600">Active Members</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-700">
                  {MOCK_MEMBERS.filter(m => m.membershipStatus === 'inactive').length}
                </p>
                <p className="text-sm text-gray-600">Inactive</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-700">
                  {MOCK_MEMBERS.filter(m => m.membershipStatus === 'expired').length}
                </p>
                <p className="text-sm text-red-600">Expired</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-700">
                  {MOCK_MEMBERS.filter(m => m.membershipStatus === 'pending').length}
                </p>
                <p className="text-sm text-yellow-600">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
