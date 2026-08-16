/**
 * AdminCoordinatorMarks — Admin coordinator marks volunteer attendance for shifts
 *
 * Features: shift selection, volunteer roster display, attendance marking, status toggle, bulk actions
 *
 * Ticket: SCRUM-929 | Branch: proto/SCRUM-926
 */

import { useState } from 'react'

interface Volunteer {
  id: string
  name: string
  email: string
  role: string
  status: 'present' | 'absent' | 'late' | 'pending'
}

interface Shift {
  id: string
  name: string
  date: string
  time: string
  location: string
}

const MOCK_SHIFTS: Shift[] = [
  { id: '1', name: 'Morning Food Distribution', date: '2026-08-16', time: '08:00 AM - 12:00 PM', location: 'Community Center A' },
  { id: '2', name: 'Afternoon Tutoring', date: '2026-08-16', time: '01:00 PM - 05:00 PM', location: 'Education Wing' },
  { id: '3', name: 'Evening Shelter Support', date: '2026-08-17', time: '05:00 PM - 09:00 PM', location: 'Shelter Building' },
  { id: '4', name: 'Weekend Fundraising Event', date: '2026-08-20', time: '10:00 AM - 04:00 PM', location: 'Main Hall' },
  { id: '5', name: 'Medical Clinic Assistance', date: '2026-08-21', time: '09:00 AM - 03:00 PM', location: 'Health Center' },
]

const MOCK_VOLUNTEERS: Record<string, Volunteer[]> = {
  '1': [
    { id: 'v1', name: 'Sarah Johnson', email: 'sarah.j@email.com', role: 'Team Leader', status: 'pending' },
    { id: 'v2', name: 'Michael Chen', email: 'michael.c@email.com', role: 'Volunteer', status: 'pending' },
    { id: 'v3', name: 'Emily Rodriguez', email: 'emily.r@email.com', role: 'Volunteer', status: 'pending' },
    { id: 'v4', name: 'David Thompson', email: 'david.t@email.com', role: 'Volunteer', status: 'pending' },
    { id: 'v5', name: 'Jessica Martinez', email: 'jessica.m@email.com', role: 'Support Staff', status: 'pending' },
  ],
  '2': [
    { id: 'v6', name: 'Robert Williams', email: 'robert.w@email.com', role: 'Tutor', status: 'pending' },
    { id: 'v7', name: 'Amanda Lee', email: 'amanda.l@email.com', role: 'Tutor', status: 'pending' },
    { id: 'v8', name: 'Christopher Brown', email: 'chris.b@email.com', role: 'Assistant', status: 'pending' },
    { id: 'v9', name: 'Nicole Davis', email: 'nicole.d@email.com', role: 'Team Leader', status: 'pending' },
    { id: 'v10', name: 'Kevin Anderson', email: 'kevin.a@email.com', role: 'Volunteer', status: 'pending' },
  ],
  '3': [
    { id: 'v11', name: 'Laura Wilson', email: 'laura.w@email.com', role: 'Coordinator', status: 'pending' },
    { id: 'v12', name: 'James Taylor', email: 'james.t@email.com', role: 'Volunteer', status: 'pending' },
    { id: 'v13', name: 'Michelle Garcia', email: 'michelle.g@email.com', role: 'Volunteer', status: 'pending' },
    { id: 'v14', name: 'Daniel Moore', email: 'daniel.m@email.com', role: 'Support Staff', status: 'pending' },
    { id: 'v15', name: 'Patricia Clark', email: 'patricia.c@email.com', role: 'Volunteer', status: 'pending' },
  ],
  '4': [
    { id: 'v16', name: 'Steven White', email: 'steven.w@email.com', role: 'Event Staff', status: 'pending' },
    { id: 'v17', name: 'Rachel Harris', email: 'rachel.h@email.com', role: 'Team Leader', status: 'pending' },
    { id: 'v18', name: 'Brian Lewis', email: 'brian.l@email.com', role: 'Volunteer', status: 'pending' },
    { id: 'v19', name: 'Angela Robinson', email: 'angela.r@email.com', role: 'Volunteer', status: 'pending' },
    { id: 'v20', name: 'Matthew Walker', email: 'matthew.w@email.com', role: 'Volunteer', status: 'pending' },
  ],
  '5': [
    { id: 'v21', name: 'Jennifer Hall', email: 'jennifer.h@email.com', role: 'Medical Assistant', status: 'pending' },
    { id: 'v22', name: 'Joseph Allen', email: 'joseph.a@email.com', role: 'Volunteer', status: 'pending' },
    { id: 'v23', name: 'Lisa Young', email: 'lisa.y@email.com', role: 'Team Leader', status: 'pending' },
    { id: 'v24', name: 'Thomas King', email: 'thomas.k@email.com', role: 'Support Staff', status: 'pending' },
    { id: 'v25', name: 'Susan Wright', email: 'susan.w@email.com', role: 'Volunteer', status: 'pending' },
  ],
}

export default function AdminCoordinatorMarks() {
  const [selectedShiftId, setSelectedShiftId] = useState<string>('1')
  const [volunteers, setVolunteers] = useState<Record<string, Volunteer[]>>(MOCK_VOLUNTEERS)
  const [selectedVolunteers, setSelectedVolunteers] = useState<Set<string>>(new Set())

  const currentVolunteers = volunteers[selectedShiftId] || []
  const selectedShift = MOCK_SHIFTS.find(s => s.id === selectedShiftId)

  const handleStatusChange = (volunteerId: string, status: 'present' | 'absent' | 'late' | 'pending') => {
    setVolunteers(prev => ({
      ...prev,
      [selectedShiftId]: prev[selectedShiftId].map(v =>
        v.id === volunteerId ? { ...v, status } : v
      )
    }))
  }

  const handleToggleSelect = (volunteerId: string) => {
    setSelectedVolunteers(prev => {
      const next = new Set(prev)
      if (next.has(volunteerId)) {
        next.delete(volunteerId)
      } else {
        next.add(volunteerId)
      }
      return next
    })
  }

  const handleToggleSelectAll = () => {
    if (selectedVolunteers.size === currentVolunteers.length) {
      setSelectedVolunteers(new Set())
    } else {
      setSelectedVolunteers(new Set(currentVolunteers.map(v => v.id)))
    }
  }

  const handleBulkAction = (status: 'present' | 'absent' | 'late') => {
    if (selectedVolunteers.size === 0) return
    setVolunteers(prev => ({
      ...prev,
      [selectedShiftId]: prev[selectedShiftId].map(v =>
        selectedVolunteers.has(v.id) ? { ...v, status } : v
      )
    }))
    setSelectedVolunteers(new Set())
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-300'
      case 'absent': return 'bg-red-100 text-red-800 border-red-300'
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const stats = {
    present: currentVolunteers.filter(v => v.status === 'present').length,
    absent: currentVolunteers.filter(v => v.status === 'absent').length,
    late: currentVolunteers.filter(v => v.status === 'late').length,
    pending: currentVolunteers.filter(v => v.status === 'pending').length,
  }

  return (
    <div data-testid="admincoordinatormarks" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Attendance</h1>
          <p className="text-gray-600">Mark attendance for volunteers assigned to shifts</p>
        </div>

        {/* Shift Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <label htmlFor="shift-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Shift
          </label>
          <select
            id="shift-select"
            data-testid="admincoordinatormarks-shift"
            value={selectedShiftId}
            onChange={(e) => {
              setSelectedShiftId(e.target.value)
              setSelectedVolunteers(new Set())
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {MOCK_SHIFTS.map(shift => (
              <option key={shift.id} value={shift.id}>
                {shift.name} - {shift.date} ({shift.time})
              </option>
            ))}
          </select>

          {selectedShift && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">{selectedShift.name}</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><span className="font-medium">Date:</span> {selectedShift.date}</p>
                <p><span className="font-medium">Time:</span> {selectedShift.time}</p>
                <p><span className="font-medium">Location:</span> {selectedShift.location}</p>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm font-medium text-gray-600">Present</div>
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm font-medium text-gray-600">Absent</div>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm font-medium text-gray-600">Late</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-sm font-medium text-gray-600">Pending</div>
            <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedVolunteers.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm font-medium text-blue-900">
                {selectedVolunteers.size} volunteer{selectedVolunteers.size !== 1 ? 's' : ''} selected
              </div>
              <div className="flex gap-2">
                <button
                  data-testid="admincoordinatormarks-bulk-present"
                  onClick={() => handleBulkAction('present')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Mark Present
                </button>
                <button
                  data-testid="admincoordinatormarks-bulk-absent"
                  onClick={() => handleBulkAction('absent')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Mark Absent
                </button>
                <button
                  data-testid="admincoordinatormarks-bulk-late"
                  onClick={() => handleBulkAction('late')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
                >
                  Mark Late
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Volunteer List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Volunteers ({currentVolunteers.length})
              </h2>
              <button
                data-testid="admincoordinatormarks-select-all"
                onClick={handleToggleSelectAll}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {selectedVolunteers.size === currentVolunteers.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>

          <div data-testid="admincoordinatormarks-list" className="divide-y divide-gray-200">
            {currentVolunteers.map(volunteer => (
              <div
                key={volunteer.id}
                data-testid="admincoordinatormarks-item"
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  selectedVolunteers.has(volunteer.id) ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    data-testid={`admincoordinatormarks-checkbox-${volunteer.id}`}
                    checked={selectedVolunteers.has(volunteer.id)}
                    onChange={() => handleToggleSelect(volunteer.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{volunteer.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(volunteer.status)}`}>
                        {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{volunteer.email}</p>
                      <p className="font-medium text-gray-700">{volunteer.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      data-testid={`admincoordinatormarks-present-${volunteer.id}`}
                      onClick={() => handleStatusChange(volunteer.id, 'present')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        volunteer.status === 'present'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      data-testid={`admincoordinatormarks-late-${volunteer.id}`}
                      onClick={() => handleStatusChange(volunteer.id, 'late')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        volunteer.status === 'late'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                      }`}
                    >
                      Late
                    </button>
                    <button
                      data-testid={`admincoordinatormarks-absent-${volunteer.id}`}
                      onClick={() => handleStatusChange(volunteer.id, 'absent')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        volunteer.status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Total Volunteers: <span className="font-semibold text-gray-900">{currentVolunteers.length}</span>
              {' | '}
              Attendance Rate: <span className="font-semibold text-gray-900">
                {currentVolunteers.length > 0
                  ? Math.round((stats.present / currentVolunteers.length) * 100)
                  : 0}%
              </span>
            </div>
            <button
              data-testid="admincoordinatormarks-save"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
