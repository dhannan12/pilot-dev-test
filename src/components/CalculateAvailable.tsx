/**
 * CalculateAvailable — Calculates and displays available appointment slots based on clinic hours
 *
 * Features: operating hours configuration, appointment duration settings, slot calculation, capacity display, time slot breakdown
 *
 * Ticket: SCRUM-722 | Branch: proto/SCRUM-717
 */

import { useState } from 'react'

interface ClinicHours {
  id: string
  dayOfWeek: string
  openTime: string
  closeTime: string
  breakStart?: string
  breakEnd?: string
}

interface AppointmentConfig {
  id: string
  clinicId: string
  appointmentDuration: number // in minutes
  bufferTime: number // in minutes
  maxConcurrentPatients: number
}

interface AvailableSlot {
  time: string
  available: boolean
  capacity: number
}

const mockClinicHours: ClinicHours[] = [
  {
    id: '1',
    dayOfWeek: 'Monday',
    openTime: '08:00',
    closeTime: '17:00',
    breakStart: '12:00',
    breakEnd: '13:00'
  },
  {
    id: '2',
    dayOfWeek: 'Tuesday',
    openTime: '08:00',
    closeTime: '17:00',
    breakStart: '12:00',
    breakEnd: '13:00'
  },
  {
    id: '3',
    dayOfWeek: 'Wednesday',
    openTime: '08:00',
    closeTime: '20:00',
    breakStart: '12:00',
    breakEnd: '13:00'
  },
  {
    id: '4',
    dayOfWeek: 'Thursday',
    openTime: '09:00',
    closeTime: '17:00',
    breakStart: '12:30',
    breakEnd: '13:30'
  },
  {
    id: '5',
    dayOfWeek: 'Friday',
    openTime: '08:00',
    closeTime: '16:00',
    breakStart: '12:00',
    breakEnd: '13:00'
  }
]

const mockAppointmentConfigs: AppointmentConfig[] = [
  {
    id: '1',
    clinicId: 'clinic-001',
    appointmentDuration: 30,
    bufferTime: 5,
    maxConcurrentPatients: 2
  },
  {
    id: '2',
    clinicId: 'clinic-002',
    appointmentDuration: 45,
    bufferTime: 10,
    maxConcurrentPatients: 1
  },
  {
    id: '3',
    clinicId: 'clinic-003',
    appointmentDuration: 60,
    bufferTime: 15,
    maxConcurrentPatients: 3
  },
  {
    id: '4',
    clinicId: 'clinic-004',
    appointmentDuration: 20,
    bufferTime: 5,
    maxConcurrentPatients: 2
  },
  {
    id: '5',
    clinicId: 'clinic-005',
    appointmentDuration: 30,
    bufferTime: 0,
    maxConcurrentPatients: 4
  }
]

export default function CalculateAvailable() {
  const [selectedDay, setSelectedDay] = useState<string>('Monday')
  const [selectedConfig, setSelectedConfig] = useState<AppointmentConfig>(mockAppointmentConfigs[0])

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  const calculateAvailableSlots = (day: string, config: AppointmentConfig): AvailableSlot[] => {
    const daySchedule = mockClinicHours.find(h => h.dayOfWeek === day)
    if (!daySchedule) return []

    const slots: AvailableSlot[] = []
    const slotDuration = config.appointmentDuration + config.bufferTime
    
    const openMinutes = timeToMinutes(daySchedule.openTime)
    const closeMinutes = timeToMinutes(daySchedule.closeTime)
    const breakStartMinutes = daySchedule.breakStart ? timeToMinutes(daySchedule.breakStart) : null
    const breakEndMinutes = daySchedule.breakEnd ? timeToMinutes(daySchedule.breakEnd) : null

    let currentTime = openMinutes

    while (currentTime + config.appointmentDuration <= closeMinutes) {
      const slotEnd = currentTime + config.appointmentDuration
      
      // Check if slot overlaps with break time
      const isDuringBreak = breakStartMinutes !== null && breakEndMinutes !== null &&
        (currentTime < breakEndMinutes && slotEnd > breakStartMinutes)

      if (!isDuringBreak) {
        slots.push({
          time: minutesToTime(currentTime),
          available: true,
          capacity: config.maxConcurrentPatients
        })
      }

      currentTime += slotDuration
    }

    return slots
  }

  const slots = calculateAvailableSlots(selectedDay, selectedConfig)
  const totalAppointments = slots.reduce((sum, slot) => sum + slot.capacity, 0)
  const totalSlots = slots.length

  const daySchedule = mockClinicHours.find(h => h.dayOfWeek === selectedDay)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Available Appointments Calculator
          </h1>
          <p className="text-gray-600">
            Calculate total appointment capacity based on clinic hours and configuration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Summary Cards */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-100">Total Slots</span>
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                <span className="text-sm font-medium">Available</span>
              </div>
            </div>
            <div className="text-4xl font-bold">{totalSlots}</div>
            <div className="text-sm text-blue-100 mt-1">Time slots available</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-100">Total Capacity</span>
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                <span className="text-sm font-medium">Patients</span>
              </div>
            </div>
            <div className="text-4xl font-bold">{totalAppointments}</div>
            <div className="text-sm text-green-100 mt-1">Maximum appointments</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-100">Slot Duration</span>
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                <span className="text-sm font-medium">Minutes</span>
              </div>
            </div>
            <div className="text-4xl font-bold">
              {selectedConfig.appointmentDuration + selectedConfig.bufferTime}
            </div>
            <div className="text-sm text-purple-100 mt-1">
              {selectedConfig.appointmentDuration}min + {selectedConfig.bufferTime}min buffer
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Day Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Select Day</h2>
            <div className="grid grid-cols-2 gap-3">
              {mockClinicHours.map((schedule) => (
                <button
                  key={schedule.id}
                  onClick={() => setSelectedDay(schedule.dayOfWeek)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDay === schedule.dayOfWeek
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <div className="font-semibold">{schedule.dayOfWeek}</div>
                  <div className="text-sm mt-1">
                    {schedule.openTime} - {schedule.closeTime}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Appointment Configuration</h2>
            <div className="space-y-3">
              {mockAppointmentConfigs.map((config) => (
                <button
                  key={config.id}
                  onClick={() => setSelectedConfig(config)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedConfig.id === config.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800">{config.clinicId}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Duration: {config.appointmentDuration}min | Buffer: {config.bufferTime}min
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-lg px-3 py-1">
                      <div className="text-xs text-gray-600">Max Patients</div>
                      <div className="text-lg font-bold text-gray-800">
                        {config.maxConcurrentPatients}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        {daySchedule && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedDay} Schedule Details
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 mb-1">Opens</div>
                <div className="text-2xl font-bold text-blue-700">{daySchedule.openTime}</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-sm text-red-600 mb-1">Closes</div>
                <div className="text-2xl font-bold text-red-700">{daySchedule.closeTime}</div>
              </div>
              {daySchedule.breakStart && daySchedule.breakEnd && (
                <>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-sm text-orange-600 mb-1">Break Start</div>
                    <div className="text-2xl font-bold text-orange-700">{daySchedule.breakStart}</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-sm text-orange-600 mb-1">Break End</div>
                    <div className="text-2xl font-bold text-orange-700">{daySchedule.breakEnd}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Available Slots */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Time Slots</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {slots.map((slot, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">{slot.time}</div>
                  <div className="text-xs text-green-600 mt-1">
                    Capacity: {slot.capacity}
                  </div>
                  <div className="mt-2">
                    <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {slots.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-xl mb-2">No available slots</div>
              <div className="text-sm">Try selecting a different day or configuration</div>
            </div>
          )}
        </div>

        {/* Calculation Summary */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 mt-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Calculation Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-indigo-200 text-sm">Appointment Duration</div>
              <div className="text-2xl font-bold">{selectedConfig.appointmentDuration} min</div>
            </div>
            <div>
              <div className="text-indigo-200 text-sm">Buffer Time</div>
              <div className="text-2xl font-bold">{selectedConfig.bufferTime} min</div>
            </div>
            <div>
              <div className="text-indigo-200 text-sm">Concurrent Patients</div>
              <div className="text-2xl font-bold">×{selectedConfig.maxConcurrentPatients}</div>
            </div>
            <div>
              <div className="text-indigo-200 text-sm">Total Appointments</div>
              <div className="text-2xl font-bold">{totalAppointments}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
