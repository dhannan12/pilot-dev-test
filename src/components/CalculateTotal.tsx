/**
 * CalculateTotal — Calculates total volunteer hours based on shifts worked
 *
 * Features: shift tracking, duration calculation, total hours display, volunteer management, shift summary
 *
 * Ticket: SCRUM-677 | Branch: proto/SCRUM-674
 */

import { useState } from 'react'

interface Shift {
  id: string
  volunteerId: string
  volunteerName: string
  date: string
  startTime: string
  endTime: string
  durationHours: number
}

const MOCK_SHIFTS: Shift[] = [
  {
    id: 'shift-001',
    volunteerId: 'vol-001',
    volunteerName: 'Sarah Johnson',
    date: '2026-08-10',
    startTime: '09:00',
    endTime: '13:00',
    durationHours: 4
  },
  {
    id: 'shift-002',
    volunteerId: 'vol-001',
    volunteerName: 'Sarah Johnson',
    date: '2026-08-11',
    startTime: '10:00',
    endTime: '15:00',
    durationHours: 5
  },
  {
    id: 'shift-003',
    volunteerId: 'vol-002',
    volunteerName: 'Mike Chen',
    date: '2026-08-10',
    startTime: '08:00',
    endTime: '12:00',
    durationHours: 4
  },
  {
    id: 'shift-004',
    volunteerId: 'vol-002',
    volunteerName: 'Mike Chen',
    date: '2026-08-11',
    startTime: '13:00',
    endTime: '17:00',
    durationHours: 4
  },
  {
    id: 'shift-005',
    volunteerId: 'vol-003',
    volunteerName: 'Emily Rodriguez',
    date: '2026-08-09',
    startTime: '14:00',
    endTime: '18:00',
    durationHours: 4
  },
  {
    id: 'shift-006',
    volunteerId: 'vol-003',
    volunteerName: 'Emily Rodriguez',
    date: '2026-08-12',
    startTime: '09:00',
    endTime: '14:00',
    durationHours: 5
  },
  {
    id: 'shift-007',
    volunteerId: 'vol-004',
    volunteerName: 'David Lee',
    date: '2026-08-10',
    startTime: '11:00',
    endTime: '16:00',
    durationHours: 5
  },
  {
    id: 'shift-008',
    volunteerId: 'vol-005',
    volunteerName: 'Jessica Williams',
    date: '2026-08-11',
    startTime: '08:00',
    endTime: '11:00',
    durationHours: 3
  }
]

export default function CalculateTotal() {
  const [shifts] = useState<Shift[]>(MOCK_SHIFTS)
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>('all')

  // Calculate total hours for all shifts or filtered by volunteer
  const calculateTotalHours = (): number => {
    const filteredShifts = selectedVolunteer === 'all' 
      ? shifts 
      : shifts.filter(shift => shift.volunteerId === selectedVolunteer)
    
    return filteredShifts.reduce((total, shift) => total + shift.durationHours, 0)
  }

  // Calculate total number of shifts
  const calculateTotalShifts = (): number => {
    const filteredShifts = selectedVolunteer === 'all' 
      ? shifts 
      : shifts.filter(shift => shift.volunteerId === selectedVolunteer)
    
    return filteredShifts.length
  }

  // Get unique volunteers
  const getVolunteers = () => {
    const uniqueVolunteers = new Map<string, string>()
    shifts.forEach(shift => {
      uniqueVolunteers.set(shift.volunteerId, shift.volunteerName)
    })
    return Array.from(uniqueVolunteers, ([id, name]) => ({ id, name }))
  }

  // Get volunteer statistics
  const getVolunteerStats = () => {
    const volunteers = getVolunteers()
    return volunteers.map(volunteer => {
      const volunteerShifts = shifts.filter(shift => shift.volunteerId === volunteer.id)
      const totalHours = volunteerShifts.reduce((sum, shift) => sum + shift.durationHours, 0)
      return {
        ...volunteer,
        shiftsCount: volunteerShifts.length,
        totalHours
      }
    })
  }

  const filteredShifts = selectedVolunteer === 'all'
    ? shifts
    : shifts.filter(shift => shift.volunteerId === selectedVolunteer)

  const volunteerStats = getVolunteerStats()
  const totalHours = calculateTotalHours()
  const totalShifts = calculateTotalShifts()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Volunteer Hours Calculator
          </h1>
          <p className="text-gray-600">
            Track and calculate total volunteer hours based on shifts worked
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-500 text-white rounded-lg shadow-md p-6">
            <div className="text-blue-100 text-sm font-medium mb-2">
              Total Hours
            </div>
            <div className="text-4xl font-bold">{totalHours}</div>
            <div className="text-blue-100 text-sm mt-2">
              Across all {selectedVolunteer === 'all' ? 'volunteers' : 'shifts'}
            </div>
          </div>

          <div className="bg-green-500 text-white rounded-lg shadow-md p-6">
            <div className="text-green-100 text-sm font-medium mb-2">
              Total Shifts
            </div>
            <div className="text-4xl font-bold">{totalShifts}</div>
            <div className="text-green-100 text-sm mt-2">
              Completed shifts
            </div>
          </div>

          <div className="bg-purple-500 text-white rounded-lg shadow-md p-6">
            <div className="text-purple-100 text-sm font-medium mb-2">
              Average Hours/Shift
            </div>
            <div className="text-4xl font-bold">
              {totalShifts > 0 ? (totalHours / totalShifts).toFixed(1) : 0}
            </div>
            <div className="text-purple-100 text-sm mt-2">
              Per shift worked
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="volunteer-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Volunteer
          </label>
          <select
            id="volunteer-filter"
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Volunteers</option>
            {getVolunteers().map(volunteer => (
              <option key={volunteer.id} value={volunteer.id}>
                {volunteer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Volunteer Statistics Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Volunteer Statistics
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volunteer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Shifts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Hours/Shift
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {volunteerStats.map(volunteer => (
                  <tr key={volunteer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {volunteer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {volunteer.shiftsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {volunteer.totalHours} hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {(volunteer.totalHours / volunteer.shiftsCount).toFixed(1)} hours
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shift Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Shift Details
            {selectedVolunteer !== 'all' && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                (Filtered)
              </span>
            )}
          </h2>
          <div className="space-y-3">
            {filteredShifts.map(shift => (
              <div
                key={shift.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap justify-between items-start">
                  <div className="flex-1 min-w-0 mb-2 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {shift.volunteerName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(shift.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {shift.startTime} - {shift.endTime}
                    </div>
                    <div className="text-lg font-bold text-blue-600 mt-1">
                      {shift.durationHours} hours
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredShifts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No shifts found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
