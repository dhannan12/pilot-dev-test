/**
 * ScheduleAppointments — Patient appointment scheduling with feedback tracking
 *
 * Features: appointment selection, time slot booking, appointment history, feedback reminders, 7-day feedback deadline
 *
 * Ticket: SCRUM-755 | Branch: proto/SCRUM-747
 */

import { useState } from 'react'

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface Appointment {
  id: string
  date: string
  time: string
  doctorName: string
  specialty: string
  status: 'upcoming' | 'completed' | 'feedback-pending'
  appointmentDate: Date
  feedbackDeadline: Date | null
}

const AVAILABLE_TIME_SLOTS: TimeSlot[] = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '01:00 PM', available: true },
  { id: '5', time: '02:00 PM', available: true },
  { id: '6', time: '03:00 PM', available: false },
  { id: '7', time: '04:00 PM', available: true },
  { id: '8', time: '05:00 PM', available: true },
]

const DOCTORS = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Dentistry' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Orthodontics' },
  { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Pediatric Dentistry' },
  { id: '4', name: 'Dr. James Williams', specialty: 'Oral Surgery' },
  { id: '5', name: 'Dr. Lisa Anderson', specialty: 'Cosmetic Dentistry' },
]

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    date: '2026-08-15',
    time: '10:00 AM',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'General Dentistry',
    status: 'upcoming',
    appointmentDate: new Date('2026-08-15'),
    feedbackDeadline: null,
  },
  {
    id: '2',
    date: '2026-08-05',
    time: '02:00 PM',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Orthodontics',
    status: 'feedback-pending',
    appointmentDate: new Date('2026-08-05'),
    feedbackDeadline: new Date('2026-08-12'),
  },
  {
    id: '3',
    date: '2026-07-28',
    time: '11:00 AM',
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Pediatric Dentistry',
    status: 'completed',
    appointmentDate: new Date('2026-07-28'),
    feedbackDeadline: new Date('2026-08-04'),
  },
  {
    id: '4',
    date: '2026-07-15',
    time: '09:00 AM',
    doctorName: 'Dr. James Williams',
    specialty: 'Oral Surgery',
    status: 'completed',
    appointmentDate: new Date('2026-07-15'),
    feedbackDeadline: new Date('2026-07-22'),
  },
  {
    id: '5',
    date: '2026-08-20',
    time: '03:00 PM',
    doctorName: 'Dr. Lisa Anderson',
    specialty: 'Cosmetic Dentistry',
    status: 'upcoming',
    appointmentDate: new Date('2026-08-20'),
    feedbackDeadline: null,
  },
]

export default function ScheduleAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedDoctor, setSelectedDoctor] = useState<string>('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'schedule' | 'appointments'>('schedule')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleScheduleAppointment = () => {
    if (!selectedDate || !selectedDoctor || !selectedTimeSlot) {
      alert('Please select a date, doctor, and time slot')
      return
    }

    const doctor = DOCTORS.find(d => d.id === selectedDoctor)
    const timeSlot = AVAILABLE_TIME_SLOTS.find(t => t.id === selectedTimeSlot)
    
    if (!doctor || !timeSlot) return

    const appointmentDate = new Date(selectedDate)
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      date: selectedDate,
      time: timeSlot.time,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      status: 'upcoming',
      appointmentDate: appointmentDate,
      feedbackDeadline: null,
    }

    setAppointments([...appointments, newAppointment])
    setShowConfirmation(true)
    
    // Reset form
    setSelectedDate('')
    setSelectedDoctor('')
    setSelectedTimeSlot('')

    setTimeout(() => setShowConfirmation(false), 3000)
  }

  const getFeedbackStatus = (appointment: Appointment) => {
    if (appointment.status === 'feedback-pending' && appointment.feedbackDeadline) {
      const daysRemaining = Math.ceil((appointment.feedbackDeadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      if (daysRemaining > 0) {
        return `Feedback due in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`
      } else {
        return 'Feedback overdue'
      }
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointment Scheduling</h1>
          <p className="text-gray-600 mt-2">Schedule your dental appointments easily and track your visits</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'schedule'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Schedule New Appointment
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'appointments'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Appointments
          </button>
        </div>

        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Appointment scheduled successfully! Remember to submit feedback within 7 days after your appointment.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Schedule a New Appointment</h2>
            
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Doctor Selection */}
              <div>
                <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Doctor
                </label>
                <select
                  id="doctor"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a doctor...</option>
                  {DOCTORS.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {AVAILABLE_TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                      disabled={!slot.available}
                      className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                        selectedTimeSlot === slot.id
                          ? 'bg-blue-600 text-white'
                          : slot.available
                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                      {!slot.available && (
                        <span className="block text-xs mt-1">Unavailable</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleScheduleAppointment}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200"
                >
                  Schedule Appointment
                </button>
              </div>

              {/* Feedback Notice */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> After your appointment, you'll have 7 days to submit feedback about your visit.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Appointments</h2>
            
            {appointments.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500">No appointments scheduled yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments
                  .sort((a, b) => b.appointmentDate.getTime() - a.appointmentDate.getTime())
                  .map((appointment) => {
                    const feedbackStatus = getFeedbackStatus(appointment)
                    return (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {appointment.doctorName}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  appointment.status === 'upcoming'
                                    ? 'bg-green-100 text-green-800'
                                    : appointment.status === 'feedback-pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {appointment.status === 'upcoming'
                                  ? 'Upcoming'
                                  : appointment.status === 'feedback-pending'
                                  ? 'Feedback Pending'
                                  : 'Completed'}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-1">{appointment.specialty}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>📅 {appointment.date}</span>
                              <span>🕐 {appointment.time}</span>
                            </div>
                            {feedbackStatus && (
                              <div className={`mt-3 text-sm font-medium ${
                                feedbackStatus.includes('overdue') ? 'text-red-600' : 'text-yellow-600'
                              }`}>
                                ⚠️ {feedbackStatus}
                              </div>
                            )}
                          </div>
                          <div className="mt-4 md:mt-0 flex space-x-2">
                            {appointment.status === 'feedback-pending' && (
                              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                                Submit Feedback
                              </button>
                            )}
                            {appointment.status === 'upcoming' && (
                              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
                                Reschedule
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
