/**
 * AdminCoordinatorAttempts — Admin coordinator attempts to schedule overlapping shifts for a volunteer
 *
 * Features: shift scheduling, overlap detection, conflict validation, volunteer assignment, time conflict alerts
 *
 * Ticket: SCRUM-933 | Branch: proto/SCRUM-926
 */

import { useState } from 'react'

interface Volunteer {
  id: string
  name: string
  email: string
}

interface Shift {
  id: string
  volunteerId: string
  volunteerName: string
  date: string
  startTime: string
  endTime: string
  role: string
  location: string
}

const MOCK_VOLUNTEERS: Volunteer[] = [
  { id: 'v1', name: 'Sarah Johnson', email: 'sarah.j@email.com' },
  { id: 'v2', name: 'Michael Chen', email: 'michael.c@email.com' },
  { id: 'v3', name: 'Emily Rodriguez', email: 'emily.r@email.com' },
  { id: 'v4', name: 'David Kim', email: 'david.k@email.com' },
  { id: 'v5', name: 'Jessica Taylor', email: 'jessica.t@email.com' },
]

const INITIAL_SHIFTS: Shift[] = [
  {
    id: 's1',
    volunteerId: 'v1',
    volunteerName: 'Sarah Johnson',
    date: '2026-08-20',
    startTime: '09:00',
    endTime: '13:00',
    role: 'Reception',
    location: 'Main Office',
  },
  {
    id: 's2',
    volunteerId: 'v2',
    volunteerName: 'Michael Chen',
    date: '2026-08-20',
    startTime: '14:00',
    endTime: '18:00',
    role: 'Food Distribution',
    location: 'Community Center',
  },
  {
    id: 's3',
    volunteerId: 'v1',
    volunteerName: 'Sarah Johnson',
    date: '2026-08-21',
    startTime: '10:00',
    endTime: '14:00',
    role: 'Admin Support',
    location: 'Main Office',
  },
  {
    id: 's4',
    volunteerId: 'v3',
    volunteerName: 'Emily Rodriguez',
    date: '2026-08-22',
    startTime: '08:00',
    endTime: '12:00',
    role: 'Outreach',
    location: 'Field Office',
  },
  {
    id: 's5',
    volunteerId: 'v4',
    volunteerName: 'David Kim',
    date: '2026-08-22',
    startTime: '13:00',
    endTime: '17:00',
    role: 'IT Support',
    location: 'Main Office',
  },
]

export default function AdminCoordinatorAttempts() {
  const [shifts, setShifts] = useState<Shift[]>(INITIAL_SHIFTS)
  const [selectedVolunteer, setSelectedVolunteer] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [conflictMessage, setConflictMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const checkForOverlap = (
    volunteerId: string,
    newDate: string,
    newStart: string,
    newEnd: string
  ): Shift | null => {
    const newStartMinutes = timeToMinutes(newStart)
    const newEndMinutes = timeToMinutes(newEnd)

    return (
      shifts.find((shift) => {
        if (shift.volunteerId !== volunteerId || shift.date !== newDate) {
          return false
        }

        const shiftStartMinutes = timeToMinutes(shift.startTime)
        const shiftEndMinutes = timeToMinutes(shift.endTime)

        // Check if times overlap
        return (
          (newStartMinutes >= shiftStartMinutes &&
            newStartMinutes < shiftEndMinutes) ||
          (newEndMinutes > shiftStartMinutes &&
            newEndMinutes <= shiftEndMinutes) ||
          (newStartMinutes <= shiftStartMinutes &&
            newEndMinutes >= shiftEndMinutes)
        )
      }) || null
    )
  }

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConflictMessage('')
    setSuccessMessage('')

    if (
      !selectedVolunteer ||
      !date ||
      !startTime ||
      !endTime ||
      !role ||
      !location
    ) {
      setConflictMessage('Please fill in all fields')
      return
    }

    // Validate end time is after start time
    if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
      setConflictMessage('End time must be after start time')
      return
    }

    // Check for overlapping shifts
    const conflictingShift = checkForOverlap(
      selectedVolunteer,
      date,
      startTime,
      endTime
    )

    if (conflictingShift) {
      const volunteer = MOCK_VOLUNTEERS.find(
        (v) => v.id === selectedVolunteer
      )
      setConflictMessage(
        `⚠️ OVERLAP DETECTED: ${volunteer?.name} already has a shift on ${conflictingShift.date} from ${conflictingShift.startTime} to ${conflictingShift.endTime} (${conflictingShift.role} at ${conflictingShift.location}). Cannot schedule overlapping shifts.`
      )
      return
    }

    // No conflict - add the shift
    const volunteer = MOCK_VOLUNTEERS.find((v) => v.id === selectedVolunteer)
    const newShift: Shift = {
      id: `s${Date.now()}`,
      volunteerId: selectedVolunteer,
      volunteerName: volunteer?.name || '',
      date,
      startTime,
      endTime,
      role,
      location,
    }

    setShifts([...shifts, newShift])
    setSuccessMessage(
      `✓ Shift successfully scheduled for ${volunteer?.name}`
    )

    // Reset form
    setSelectedVolunteer('')
    setDate('')
    setStartTime('')
    setEndTime('')
    setRole('')
    setLocation('')
  }

  const handleDeleteShift = (shiftId: string) => {
    setShifts(shifts.filter((s) => s.id !== shiftId))
    setSuccessMessage('Shift deleted successfully')
    setConflictMessage('')
  }

  return (
    <div
      data-testid="admincoordinatorattempts"
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Volunteer Shift Scheduling
          </h1>
          <p className="text-gray-600 mt-2">
            Schedule shifts and manage volunteer assignments with automatic
            overlap detection
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scheduling Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Schedule New Shift
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="volunteer"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Volunteer
                </label>
                <select
                  id="volunteer"
                  data-testid="admincoordinatorattempts-volunteer"
                  value={selectedVolunteer}
                  onChange={(e) => setSelectedVolunteer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose a volunteer --</option>
                  {MOCK_VOLUNTEERS.map((volunteer) => (
                    <option key={volunteer.id} value={volunteer.id}>
                      {volunteer.name} ({volunteer.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  data-testid="admincoordinatorattempts-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Time
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    data-testid="admincoordinatorattempts-starttime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Time
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    data-testid="admincoordinatorattempts-endtime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  data-testid="admincoordinatorattempts-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Reception, Food Distribution"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  data-testid="admincoordinatorattempts-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Main Office, Community Center"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {conflictMessage && (
                <div
                  data-testid="admincoordinatorattempts-conflict"
                  className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-md text-sm"
                >
                  {conflictMessage}
                </div>
              )}

              {successMessage && (
                <div
                  data-testid="admincoordinatorattempts-success"
                  className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-md text-sm"
                >
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                data-testid="admincoordinatorattempts-submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
              >
                Schedule Shift
              </button>
            </form>
          </div>

          {/* Scheduled Shifts List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Scheduled Shifts ({shifts.length})
            </h2>

            <div
              data-testid="admincoordinatorattempts-list"
              className="space-y-3 max-h-[600px] overflow-y-auto"
            >
              {shifts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No shifts scheduled yet
                </p>
              ) : (
                shifts
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() -
                        new Date(b.date).getTime() ||
                      timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
                  )
                  .map((shift) => (
                    <div
                      key={shift.id}
                      data-testid="admincoordinatorattempts-item"
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {shift.volunteerName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">{shift.role}</span>{' '}
                            at {shift.location}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(shift.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-sm font-medium text-blue-600 mt-1">
                            {shift.startTime} - {shift.endTime}
                          </p>
                        </div>
                        <button
                          data-testid="admincoordinatorattempts-delete"
                          onClick={() => handleDeleteShift(shift.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium ml-4"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Overlap Detection Active
          </h3>
          <p className="text-blue-800 text-sm">
            The system automatically detects when you attempt to schedule
            overlapping shifts for the same volunteer. Try scheduling a shift
            that conflicts with an existing one to see the validation in
            action.
          </p>
        </div>
      </div>
    </div>
  )
}
