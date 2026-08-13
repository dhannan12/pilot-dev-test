/**
 * ScheduleAppointments — Online appointment scheduling system for registered patients
 *
 * Features: patient authentication, dentist selection, available time slots, appointment confirmation, booking history
 *
 * Ticket: SCRUM-748 | Branch: proto/SCRUM-747
 */

import { useState } from 'react'

interface Patient {
  id: string
  name: string
  email: string
  isRegistered: boolean
}

interface Dentist {
  id: string
  name: string
  specialty: string
  avatar: string
}

interface TimeSlot {
  id: string
  dentistId: string
  date: string
  time: string
  available: boolean
}

interface Appointment {
  id: string
  patientId: string
  dentistId: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes: string
}

// Mock data
const MOCK_PATIENTS: Patient[] = [
  { id: 'P001', name: 'John Smith', email: 'john.smith@email.com', isRegistered: true },
  { id: 'P002', name: 'Sarah Johnson', email: 'sarah.j@email.com', isRegistered: true },
  { id: 'P003', name: 'Michael Brown', email: 'mbrown@email.com', isRegistered: true },
  { id: 'P004', name: 'Emily Davis', email: 'emily.davis@email.com', isRegistered: true },
  { id: 'P005', name: 'David Wilson', email: 'dwilson@email.com', isRegistered: true },
]

const MOCK_DENTISTS: Dentist[] = [
  { id: 'D001', name: 'Dr. Alice Carter', specialty: 'General Dentistry', avatar: '👩‍⚕️' },
  { id: 'D002', name: 'Dr. Robert Lee', specialty: 'Orthodontics', avatar: '👨‍⚕️' },
  { id: 'D003', name: 'Dr. Maria Garcia', specialty: 'Endodontics', avatar: '👩‍⚕️' },
  { id: 'D004', name: 'Dr. James Wilson', specialty: 'Periodontics', avatar: '👨‍⚕️' },
  { id: 'D005', name: 'Dr. Lisa Anderson', specialty: 'Oral Surgery', avatar: '👩‍⚕️' },
]

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: 'TS001', dentistId: 'D001', date: '2026-08-15', time: '09:00 AM', available: true },
  { id: 'TS002', dentistId: 'D001', date: '2026-08-15', time: '10:00 AM', available: true },
  { id: 'TS003', dentistId: 'D001', date: '2026-08-15', time: '11:00 AM', available: false },
  { id: 'TS004', dentistId: 'D001', date: '2026-08-15', time: '02:00 PM', available: true },
  { id: 'TS005', dentistId: 'D001', date: '2026-08-15', time: '03:00 PM', available: true },
  { id: 'TS006', dentistId: 'D002', date: '2026-08-16', time: '09:00 AM', available: true },
  { id: 'TS007', dentistId: 'D002', date: '2026-08-16', time: '10:00 AM', available: true },
  { id: 'TS008', dentistId: 'D003', date: '2026-08-17', time: '01:00 PM', available: true },
]

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'A001', patientId: 'P001', dentistId: 'D001', date: '2026-08-10', time: '10:00 AM', status: 'completed', notes: 'Regular checkup' },
  { id: 'A002', patientId: 'P001', dentistId: 'D002', date: '2026-08-20', time: '02:00 PM', status: 'scheduled', notes: 'Braces adjustment' },
  { id: 'A003', patientId: 'P002', dentistId: 'D001', date: '2026-08-12', time: '11:00 AM', status: 'completed', notes: 'Teeth cleaning' },
  { id: 'A004', patientId: 'P002', dentistId: 'D003', date: '2026-08-18', time: '03:00 PM', status: 'scheduled', notes: 'Root canal' },
  { id: 'A005', patientId: 'P003', dentistId: 'D004', date: '2026-08-11', time: '09:00 AM', status: 'cancelled', notes: 'Gum treatment' },
]

export default function ScheduleAppointments() {
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(MOCK_PATIENTS[0])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [appointmentNotes, setAppointmentNotes] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [myAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS.filter(a => a.patientId === 'P001'))

  const handleLogin = (patient: Patient) => {
    if (patient.isRegistered) {
      setCurrentPatient(patient)
      setIsLoggedIn(true)
    }
  }

  const handleBookAppointment = () => {
    if (selectedDentist && selectedSlot && currentPatient) {
      setShowConfirmation(true)
    }
  }

  const handleConfirmBooking = () => {
    setShowConfirmation(false)
    setSelectedDentist(null)
    setSelectedSlot(null)
    setAppointmentNotes('')
  }

  const availableSlots = selectedDentist 
    ? MOCK_TIME_SLOTS.filter(slot => slot.dentistId === selectedDentist.id && slot.available)
    : []

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🦷</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Dental Clinic</h1>
              <p className="text-gray-600">Online Appointment System</p>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md mb-4">
                ⚠️ Only registered patients can schedule appointments
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Select your account to login:</h2>
              {MOCK_PATIENTS.map(patient => (
                <button
                  key={patient.id}
                  onClick={() => handleLogin(patient)}
                  className="w-full p-4 text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg border border-blue-200 transition-all"
                >
                  <div className="font-medium text-gray-800">{patient.name}</div>
                  <div className="text-sm text-gray-600">{patient.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Confirmation modal
  if (showConfirmation && selectedDentist && selectedSlot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto mt-20">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Appointment Confirmed!</h2>
              <p className="text-gray-600">Your appointment has been successfully scheduled</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6 border border-green-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span className="font-semibold text-gray-800">{currentPatient?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dentist:</span>
                  <span className="font-semibold text-gray-800">{selectedDentist.avatar} {selectedDentist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialty:</span>
                  <span className="font-semibold text-gray-800">{selectedDentist.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-gray-800">{selectedSlot.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold text-gray-800">{selectedSlot.time}</span>
                </div>
                {appointmentNotes && (
                  <div className="pt-3 border-t border-green-200">
                    <span className="text-gray-600">Notes:</span>
                    <p className="text-gray-800 mt-1">{appointmentNotes}</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main scheduling interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Schedule Appointment</h1>
              <p className="text-gray-600">Welcome back, {currentPatient?.name}</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Select Dentist */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">1. Select a Dentist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_DENTISTS.map(dentist => (
                  <button
                    key={dentist.id}
                    onClick={() => {
                      setSelectedDentist(dentist)
                      setSelectedSlot(null)
                    }}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedDentist?.id === dentist.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-3xl mr-3">{dentist.avatar}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{dentist.name}</div>
                        <div className="text-sm text-gray-600">{dentist.specialty}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Select Time Slot */}
            {selectedDentist && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">2. Select a Time Slot</h2>
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableSlots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedSlot?.id === slot.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300 bg-white'
                        }`}
                      >
                        <div className="text-sm text-gray-600 mb-1">{slot.date}</div>
                        <div className="font-semibold text-gray-800">{slot.time}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No available time slots for this dentist</p>
                )}
              </div>
            )}
          </div>

          {/* Booking Summary & My Appointments */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>
              
              {selectedDentist ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{selectedDentist.avatar}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{selectedDentist.name}</div>
                        <div className="text-sm text-gray-600">{selectedDentist.specialty}</div>
                      </div>
                    </div>
                  </div>

                  {selectedSlot && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="text-sm text-gray-600 mb-1">Date & Time</div>
                      <div className="font-semibold text-gray-800">{selectedSlot.date}</div>
                      <div className="font-semibold text-gray-800">{selectedSlot.time}</div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Appointment Notes (Optional)
                    </label>
                    <textarea
                      value={appointmentNotes}
                      onChange={(e) => setAppointmentNotes(e.target.value)}
                      placeholder="Describe your symptoms or reason for visit..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>

                  <button
                    onClick={handleBookAppointment}
                    disabled={!selectedSlot}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      selectedSlot
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedSlot ? 'Book Appointment' : 'Select Time Slot'}
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Select a dentist to begin</p>
              )}
            </div>

            {/* My Appointments */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Appointments</h2>
              <div className="space-y-3">
                {myAppointments.slice(0, 3).map(appointment => {
                  const dentist = MOCK_DENTISTS.find(d => d.id === appointment.dentistId)
                  return (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800 text-sm">
                          {dentist?.avatar} {dentist?.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          appointment.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">{appointment.date} at {appointment.time}</div>
                      <div className="text-xs text-gray-500 mt-1">{appointment.notes}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
