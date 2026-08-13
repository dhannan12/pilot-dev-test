/**
 * SchedulePhysiotherapy — Patient appointment scheduling with resource access
 *
 * Features: appointment booking, therapist selection, time slot picker, rehabilitation resources, session history
 *
 * Ticket: SCRUM-726 | Branch: proto/SCRUM-717
 */

import { useState } from 'react'

interface Therapist {
  id: string
  name: string
  specialization: string
  availableSlots: string[]
  rating: number
}

interface Resource {
  id: string
  title: string
  type: 'video' | 'document' | 'exercise'
  url: string
}

interface Appointment {
  id: string
  therapistName: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
}

const MOCK_THERAPISTS: Therapist[] = [
  {
    id: 'PT1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Sports Injury Rehabilitation',
    availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
    rating: 4.8
  },
  {
    id: 'PT2',
    name: 'Dr. Michael Chen',
    specialization: 'Post-Surgery Recovery',
    availableSlots: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
    rating: 4.9
  },
  {
    id: 'PT3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Chronic Pain Management',
    availableSlots: ['08:00 AM', '12:00 PM', '02:30 PM', '04:30 PM'],
    rating: 4.7
  },
  {
    id: 'PT4',
    name: 'Dr. James Wilson',
    specialization: 'Neurological Rehabilitation',
    availableSlots: ['09:30 AM', '11:30 AM', '01:30 PM', '03:30 PM'],
    rating: 4.9
  },
  {
    id: 'PT5',
    name: 'Dr. Lisa Anderson',
    specialization: 'Pediatric Physiotherapy',
    availableSlots: ['10:30 AM', '12:30 PM', '02:00 PM', '04:00 PM'],
    rating: 4.8
  }
]

const MOCK_RESOURCES: Resource[] = [
  {
    id: 'R1',
    title: 'Lower Back Strengthening Exercises',
    type: 'video',
    url: '#'
  },
  {
    id: 'R2',
    title: 'Post-Operative Care Guidelines',
    type: 'document',
    url: '#'
  },
  {
    id: 'R3',
    title: 'Shoulder Mobility Routine',
    type: 'exercise',
    url: '#'
  },
  {
    id: 'R4',
    title: 'Balance and Coordination Training',
    type: 'video',
    url: '#'
  },
  {
    id: 'R5',
    title: 'Home Exercise Program Guide',
    type: 'document',
    url: '#'
  },
  {
    id: 'R6',
    title: 'Knee Rehabilitation Protocol',
    type: 'exercise',
    url: '#'
  }
]

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'A1',
    therapistName: 'Dr. Sarah Johnson',
    date: '2026-08-10',
    time: '09:00 AM',
    status: 'completed'
  },
  {
    id: 'A2',
    therapistName: 'Dr. Michael Chen',
    date: '2026-08-15',
    time: '01:00 PM',
    status: 'scheduled'
  },
  {
    id: 'A3',
    therapistName: 'Dr. Emily Rodriguez',
    date: '2026-08-05',
    time: '02:30 PM',
    status: 'completed'
  },
  {
    id: 'A4',
    therapistName: 'Dr. James Wilson',
    date: '2026-08-20',
    time: '11:30 AM',
    status: 'scheduled'
  },
  {
    id: 'A5',
    therapistName: 'Dr. Lisa Anderson',
    date: '2026-07-28',
    time: '10:30 AM',
    status: 'cancelled'
  }
]

export default function SchedulePhysiotherapy() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'history' | 'resources'>('schedule')
  const [selectedTherapist, setSelectedTherapist] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleScheduleAppointment = () => {
    if (!selectedTherapist || !selectedDate || !selectedTime) {
      alert('Please select therapist, date, and time')
      return
    }

    const therapist = MOCK_THERAPISTS.find(t => t.id === selectedTherapist)
    const newAppointment: Appointment = {
      id: `A${appointments.length + 1}`,
      therapistName: therapist?.name || '',
      date: selectedDate,
      time: selectedTime,
      status: 'scheduled'
    }

    setAppointments([...appointments, newAppointment])
    setShowConfirmation(true)
    
    // Reset form
    setTimeout(() => {
      setSelectedTherapist('')
      setSelectedDate('')
      setSelectedTime('')
      setShowConfirmation(false)
    }, 3000)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥'
      case 'document':
        return '📄'
      case 'exercise':
        return '🏃'
      default:
        return '📎'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const selectedTherapistData = MOCK_THERAPISTS.find(t => t.id === selectedTherapist)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Physiotherapy Appointment Scheduler
          </h1>
          <p className="text-gray-600">
            Book appointments with qualified therapists and access rehabilitation resources
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'schedule'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Schedule Appointment
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Appointment History
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'resources'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Rehabilitation Resources
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                {showConfirmation && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    ✓ Appointment successfully scheduled!
                  </div>
                )}

                {/* Select Therapist */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Therapist
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_THERAPISTS.map(therapist => (
                      <button
                        key={therapist.id}
                        onClick={() => setSelectedTherapist(therapist.id)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          selectedTherapist === therapist.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{therapist.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {therapist.specialization}
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-700 ml-1">
                            {therapist.rating} / 5.0
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Date */}
                <div>
                  <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    id="appointment-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Select Time */}
                {selectedTherapistData && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {selectedTherapistData.availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-4 py-3 border-2 rounded-lg font-medium transition-all ${
                            selectedTime === slot
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Schedule Button */}
                <div className="pt-4">
                  <button
                    onClick={handleScheduleAppointment}
                    disabled={!selectedTherapist || !selectedDate || !selectedTime}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Schedule Appointment
                  </button>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Appointments
                </h3>
                {appointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No appointments scheduled yet
                  </p>
                ) : (
                  appointments
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(appointment => (
                      <div
                        key={appointment.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {appointment.therapistName}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {new Date(appointment.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="text-sm text-gray-600">
                              {appointment.time}
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status.charAt(0).toUpperCase() +
                              appointment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))
                )}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Rehabilitation Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_RESOURCES.map(resource => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-start">
                        <div className="text-3xl mr-3">{getResourceIcon(resource.type)}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            {resource.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 capitalize">
                            {resource.type}
                          </div>
                        </div>
                        <div className="text-blue-600 text-xl">→</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
