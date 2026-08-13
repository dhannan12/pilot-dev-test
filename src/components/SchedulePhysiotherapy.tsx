/**
 * SchedulePhysiotherapy — Patient appointment scheduling with physiotherapist progress notes
 *
 * Features: appointment booking calendar, available time slots, physiotherapist selection, session progress notes entry, appointment history
 *
 * Ticket: SCRUM-724 | Branch: proto/SCRUM-717
 */

import { useState } from 'react'

interface Physiotherapist {
  id: string
  name: string
  specialization: string
  available: boolean
}

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface Appointment {
  id: string
  patientName: string
  physiotherapistId: string
  physiotherapistName: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  progressNotes?: string
}

const MOCK_PHYSIOTHERAPISTS: Physiotherapist[] = [
  { id: 'pt1', name: 'Dr. Sarah Johnson', specialization: 'Sports Injury', available: true },
  { id: 'pt2', name: 'Dr. Michael Chen', specialization: 'Orthopedic', available: true },
  { id: 'pt3', name: 'Dr. Emily Rodriguez', specialization: 'Neurological', available: true },
  { id: 'pt4', name: 'Dr. James Wilson', specialization: 'Pediatric', available: false },
  { id: 'pt5', name: 'Dr. Lisa Anderson', specialization: 'Geriatric', available: true },
]

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: 'slot1', time: '09:00 AM', available: true },
  { id: 'slot2', time: '10:00 AM', available: true },
  { id: 'slot3', time: '11:00 AM', available: false },
  { id: 'slot4', time: '01:00 PM', available: true },
  { id: 'slot5', time: '02:00 PM', available: true },
  { id: 'slot6', time: '03:00 PM', available: true },
  { id: 'slot7', time: '04:00 PM', available: false },
]

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt1',
    patientName: 'John Doe',
    physiotherapistId: 'pt1',
    physiotherapistName: 'Dr. Sarah Johnson',
    date: '2026-08-15',
    time: '09:00 AM',
    status: 'scheduled',
  },
  {
    id: 'apt2',
    patientName: 'John Doe',
    physiotherapistId: 'pt2',
    physiotherapistName: 'Dr. Michael Chen',
    date: '2026-08-10',
    time: '02:00 PM',
    status: 'completed',
    progressNotes: 'Patient showed significant improvement in mobility. ROM exercises completed successfully. Continue with current treatment plan.',
  },
  {
    id: 'apt3',
    patientName: 'John Doe',
    physiotherapistId: 'pt3',
    physiotherapistName: 'Dr. Emily Rodriguez',
    date: '2026-08-05',
    time: '11:00 AM',
    status: 'completed',
    progressNotes: 'Initial assessment completed. Patient has limited range of motion in left shoulder. Started with gentle stretching exercises.',
  },
  {
    id: 'apt4',
    patientName: 'John Doe',
    physiotherapistId: 'pt1',
    physiotherapistName: 'Dr. Sarah Johnson',
    date: '2026-08-01',
    time: '03:00 PM',
    status: 'completed',
    progressNotes: 'Pain level reduced from 7/10 to 4/10. Patient able to perform daily activities with less discomfort. Recommended home exercises.',
  },
  {
    id: 'apt5',
    patientName: 'John Doe',
    physiotherapistId: 'pt5',
    physiotherapistName: 'Dr. Lisa Anderson',
    date: '2026-07-28',
    time: '10:00 AM',
    status: 'completed',
    progressNotes: 'Follow-up session. Patient compliance with home exercise program is excellent. Progress is on track.',
  },
]

export default function SchedulePhysiotherapy() {
  const [selectedPhysiotherapist, setSelectedPhysiotherapist] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [showBooking, setShowBooking] = useState<boolean>(true)
  const [editingNotes, setEditingNotes] = useState<string>('')
  const [noteAppointmentId, setNoteAppointmentId] = useState<string>('')

  const handleScheduleAppointment = () => {
    if (!selectedPhysiotherapist || !selectedDate || !selectedTime) {
      alert('Please select a physiotherapist, date, and time slot')
      return
    }

    const physiotherapist = MOCK_PHYSIOTHERAPISTS.find((pt) => pt.id === selectedPhysiotherapist)
    if (!physiotherapist) return

    const newAppointment: Appointment = {
      id: `apt${appointments.length + 1}`,
      patientName: 'John Doe',
      physiotherapistId: selectedPhysiotherapist,
      physiotherapistName: physiotherapist.name,
      date: selectedDate,
      time: selectedTime,
      status: 'scheduled',
    }

    setAppointments([newAppointment, ...appointments])
    setSelectedPhysiotherapist('')
    setSelectedDate('')
    setSelectedTime('')
    alert('Appointment scheduled successfully!')
  }

  const handleSaveProgressNotes = (appointmentId: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, progressNotes: editingNotes } : apt
      )
    )
    setNoteAppointmentId('')
    setEditingNotes('')
    alert('Progress notes saved successfully!')
  }

  const startEditingNotes = (appointmentId: string, currentNotes?: string) => {
    setNoteAppointmentId(appointmentId)
    setEditingNotes(currentNotes || '')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Physiotherapy Management</h1>
          <p className="text-gray-600">Schedule appointments and track progress notes</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowBooking(true)}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              showBooking
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Schedule Appointment
          </button>
          <button
            onClick={() => setShowBooking(false)}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              !showBooking
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Appointment History
          </button>
        </div>

        {showBooking ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule New Appointment</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Physiotherapist
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MOCK_PHYSIOTHERAPISTS.map((pt) => (
                    <button
                      key={pt.id}
                      onClick={() => pt.available && setSelectedPhysiotherapist(pt.id)}
                      disabled={!pt.available}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPhysiotherapist === pt.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : pt.available
                          ? 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                          : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{pt.name}</div>
                        <div className="text-sm text-gray-600">{pt.specialization}</div>
                        <div
                          className={`text-xs mt-2 font-medium ${
                            pt.available ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {pt.available ? '✓ Available' : '✗ Unavailable'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {MOCK_TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                        selectedTime === slot.time
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : slot.available
                          ? 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleScheduleAppointment}
                  className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointment History</h2>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="border-2 border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {apt.physiotherapistName}
                        </h3>
                        <p className="text-gray-600">
                          {apt.date} at {apt.time}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                            apt.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : apt.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {apt.status === 'completed' && (
                      <div className="mt-4 border-t-2 border-gray-100 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-700">Progress Notes</h4>
                          <button
                            onClick={() => startEditingNotes(apt.id, apt.progressNotes)}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            {apt.progressNotes ? 'Edit Notes' : 'Add Notes'}
                          </button>
                        </div>

                        {noteAppointmentId === apt.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={editingNotes}
                              onChange={(e) => setEditingNotes(e.target.value)}
                              placeholder="Enter progress notes for this session..."
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none min-h-[120px]"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveProgressNotes(apt.id)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                              >
                                Save Notes
                              </button>
                              <button
                                onClick={() => {
                                  setNoteAppointmentId('')
                                  setEditingNotes('')
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                            {apt.progressNotes || 'No progress notes recorded yet.'}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
