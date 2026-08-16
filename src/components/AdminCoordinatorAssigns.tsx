/**
 * AdminCoordinatorAssigns — Admin coordinator assigns volunteers to shifts
 *
 * Features: shift management, volunteer assignment, availability tracking, assignment history, real-time status updates
 *
 * Ticket: SCRUM-928 | Branch: proto/SCRUM-926
 */

import { useState } from 'react'

interface Volunteer {
  id: string
  name: string
  email: string
  skills: string[]
  availability: string
  assignedShifts: number
}

interface Shift {
  id: string
  title: string
  date: string
  time: string
  location: string
  requiredSkills: string[]
  slotsTotal: number
  slotsFilled: number
  assignedVolunteers: string[]
}

const MOCK_VOLUNTEERS: Volunteer[] = [
  {
    id: 'v1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    skills: ['First Aid', 'Event Setup', 'Registration'],
    availability: 'Weekends',
    assignedShifts: 2,
  },
  {
    id: 'v2',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    skills: ['Food Service', 'Cleanup', 'Customer Service'],
    availability: 'Evenings',
    assignedShifts: 1,
  },
  {
    id: 'v3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    skills: ['Registration', 'Customer Service', 'First Aid'],
    availability: 'Flexible',
    assignedShifts: 3,
  },
  {
    id: 'v4',
    name: 'David Thompson',
    email: 'dthompson@email.com',
    skills: ['Event Setup', 'Cleanup', 'Security'],
    availability: 'Weekdays',
    assignedShifts: 0,
  },
  {
    id: 'v5',
    name: 'Lisa Martinez',
    email: 'lisa.martinez@email.com',
    skills: ['Food Service', 'Registration', 'Event Setup'],
    availability: 'Weekends',
    assignedShifts: 2,
  },
  {
    id: 'v6',
    name: 'James Wilson',
    email: 'jwilson@email.com',
    skills: ['Security', 'Customer Service', 'Cleanup'],
    availability: 'Evenings',
    assignedShifts: 1,
  },
]

const MOCK_SHIFTS: Shift[] = [
  {
    id: 's1',
    title: 'Community Food Drive',
    date: '2026-08-20',
    time: '09:00 AM - 1:00 PM',
    location: 'Community Center',
    requiredSkills: ['Food Service', 'Registration'],
    slotsTotal: 4,
    slotsFilled: 2,
    assignedVolunteers: ['v1', 'v5'],
  },
  {
    id: 's2',
    title: 'Health Fair Setup',
    date: '2026-08-22',
    time: '07:00 AM - 10:00 AM',
    location: 'City Park',
    requiredSkills: ['Event Setup', 'First Aid'],
    slotsTotal: 3,
    slotsFilled: 1,
    assignedVolunteers: ['v3'],
  },
  {
    id: 's3',
    title: 'Evening Fundraiser',
    date: '2026-08-23',
    time: '05:00 PM - 9:00 PM',
    location: 'Grand Hotel',
    requiredSkills: ['Customer Service', 'Registration'],
    slotsTotal: 5,
    slotsFilled: 2,
    assignedVolunteers: ['v2', 'v6'],
  },
  {
    id: 's4',
    title: 'Beach Cleanup',
    date: '2026-08-25',
    time: '08:00 AM - 12:00 PM',
    location: 'Sunset Beach',
    requiredSkills: ['Cleanup', 'Event Setup'],
    slotsTotal: 6,
    slotsFilled: 1,
    assignedVolunteers: ['v4'],
  },
  {
    id: 's5',
    title: 'Youth Sports Day',
    date: '2026-08-27',
    time: '10:00 AM - 4:00 PM',
    location: 'Athletic Complex',
    requiredSkills: ['Security', 'First Aid', 'Customer Service'],
    slotsTotal: 4,
    slotsFilled: 1,
    assignedVolunteers: ['v1'],
  },
]

export default function AdminCoordinatorAssigns() {
  const [volunteers] = useState<Volunteer[]>(MOCK_VOLUNTEERS)
  const [shifts, setShifts] = useState<Shift[]>(MOCK_SHIFTS)
  const [selectedShift, setSelectedShift] = useState<string | null>(null)
  const [filterSkill, setFilterSkill] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const allSkills = Array.from(
    new Set(volunteers.flatMap((v) => v.skills))
  ).sort()

  const handleAssignVolunteer = (shiftId: string, volunteerId: string) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) => {
        if (shift.id === shiftId) {
          if (shift.assignedVolunteers.includes(volunteerId)) {
            return shift
          }
          if (shift.slotsFilled >= shift.slotsTotal) {
            alert('This shift is already full')
            return shift
          }
          return {
            ...shift,
            assignedVolunteers: [...shift.assignedVolunteers, volunteerId],
            slotsFilled: shift.slotsFilled + 1,
          }
        }
        return shift
      })
    )
  }

  const handleUnassignVolunteer = (shiftId: string, volunteerId: string) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) => {
        if (shift.id === shiftId) {
          return {
            ...shift,
            assignedVolunteers: shift.assignedVolunteers.filter(
              (id) => id !== volunteerId
            ),
            slotsFilled: shift.slotsFilled - 1,
          }
        }
        return shift
      })
    )
  }

  const getVolunteerName = (volunteerId: string): string => {
    return volunteers.find((v) => v.id === volunteerId)?.name || 'Unknown'
  }

  const isVolunteerAssigned = (shiftId: string, volunteerId: string): boolean => {
    const shift = shifts.find((s) => s.id === shiftId)
    return shift?.assignedVolunteers.includes(volunteerId) || false
  }

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      searchTerm === '' ||
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSkill =
      filterSkill === 'all' || volunteer.skills.includes(filterSkill)

    return matchesSearch && matchesSkill
  })

  const currentShift = selectedShift
    ? shifts.find((s) => s.id === selectedShift)
    : null

  return (
    <div data-testid="admincoordinatorassigns" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Volunteer Assignment Manager
          </h1>
          <p className="text-gray-600">
            Assign volunteers to shifts based on their skills and availability
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shifts Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Available Shifts
              </h2>
              <div data-testid="admincoordinatorassigns-shifts-list" className="space-y-3">
                {shifts.map((shift) => (
                  <button
                    key={shift.id}
                    data-testid="admincoordinatorassigns-shift-item"
                    onClick={() => setSelectedShift(shift.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedShift === shift.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">
                      {shift.title}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {shift.date} • {shift.time}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{shift.location}</span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          shift.slotsFilled >= shift.slotsTotal
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {shift.slotsFilled}/{shift.slotsTotal} filled
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Assignment Column */}
          <div className="lg:col-span-2">
            {currentShift ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {currentShift.title}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Date:</span>{' '}
                      <span className="font-medium">{currentShift.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>{' '}
                      <span className="font-medium">{currentShift.time}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>{' '}
                      <span className="font-medium">{currentShift.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Capacity:</span>{' '}
                      <span className="font-medium">
                        {currentShift.slotsFilled}/{currentShift.slotsTotal}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="text-gray-600 text-sm">Required Skills:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {currentShift.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Currently Assigned Volunteers */}
                {currentShift.assignedVolunteers.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Assigned Volunteers ({currentShift.assignedVolunteers.length})
                    </h3>
                    <div data-testid="admincoordinatorassigns-assigned-list" className="space-y-2">
                      {currentShift.assignedVolunteers.map((volunteerId) => {
                        const volunteer = volunteers.find((v) => v.id === volunteerId)
                        if (!volunteer) return null
                        return (
                          <div
                            key={volunteerId}
                            data-testid="admincoordinatorassigns-assigned-item"
                            className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                          >
                            <div>
                              <div className="font-medium text-gray-900">
                                {volunteer.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {volunteer.email}
                              </div>
                            </div>
                            <button
                              data-testid="admincoordinatorassigns-unassign"
                              onClick={() =>
                                handleUnassignVolunteer(currentShift.id, volunteerId)
                              }
                              className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Volunteer Search and Filter */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Available Volunteers
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      data-testid="admincoordinatorassigns-search"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      data-testid="admincoordinatorassigns-filter"
                      value={filterSkill}
                      onChange={(e) => setFilterSkill(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Skills</option>
                      {allSkills.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Available Volunteers List */}
                <div data-testid="admincoordinatorassigns-volunteers-list" className="space-y-2">
                  {filteredVolunteers.map((volunteer) => {
                    const isAssigned = isVolunteerAssigned(
                      currentShift.id,
                      volunteer.id
                    )
                    const hasRequiredSkill = currentShift.requiredSkills.some(
                      (skill) => volunteer.skills.includes(skill)
                    )

                    return (
                      <div
                        key={volunteer.id}
                        data-testid="admincoordinatorassigns-volunteer-item"
                        className={`flex items-center justify-between p-4 border rounded-lg ${
                          isAssigned
                            ? 'bg-gray-100 border-gray-300'
                            : hasRequiredSkill
                            ? 'bg-white border-blue-300'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {volunteer.name}
                            </span>
                            {hasRequiredSkill && !isAssigned && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                Recommended
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {volunteer.email} • {volunteer.availability}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {volunteer.skills.map((skill) => (
                              <span
                                key={skill}
                                className={`px-2 py-0.5 text-xs rounded ${
                                  currentShift.requiredSkills.includes(skill)
                                    ? 'bg-blue-100 text-blue-700 font-medium'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Currently assigned to {volunteer.assignedShifts} shift(s)
                          </div>
                        </div>
                        <button
                          data-testid="admincoordinatorassigns-assign"
                          onClick={() =>
                            handleAssignVolunteer(currentShift.id, volunteer.id)
                          }
                          disabled={isAssigned || currentShift.slotsFilled >= currentShift.slotsTotal}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            isAssigned
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : currentShift.slotsFilled >= currentShift.slotsTotal
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isAssigned ? 'Assigned' : 'Assign'}
                        </button>
                      </div>
                    )
                  })}
                </div>

                {filteredVolunteers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No volunteers match your search criteria
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-2">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Select a Shift
                </h3>
                <p className="text-gray-600">
                  Choose a shift from the list to assign volunteers
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
