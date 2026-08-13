/**
 * ScheduleAppointments — Patient appointment scheduling interface with available time slots
 *
 * Features: appointment type selection, date picker calendar, available time slot display, patient information form, appointment confirmation
 *
 * Ticket: SCRUM-750 | Branch: proto/SCRUM-747
 */

import { useState } from 'react'

interface TimeSlot {
  id: string
  time: string
  available: boolean
  dentist: string
}

interface AppointmentType {
  id: string
  name: string
  duration: string
  description: string
}

interface DentistInfo {
  id: string
  name: string
  specialty: string
}

const APPOINTMENT_TYPES: AppointmentType[] = [
  { id: '1', name: 'General Checkup', duration: '30 min', description: 'Routine dental examination' },
  { id: '2', name: 'Teeth Cleaning', duration: '45 min', description: 'Professional cleaning and polishing' },
  { id: '3', name: 'Cavity Filling', duration: '60 min', description: 'Tooth restoration procedure' },
  { id: '4', name: 'Root Canal', duration: '90 min', description: 'Endodontic treatment' },
  { id: '5', name: 'Teeth Whitening', duration: '60 min', description: 'Cosmetic whitening procedure' },
  { id: '6', name: 'Crown Fitting', duration: '75 min', description: 'Dental crown placement' },
  { id: '7', name: 'Emergency Visit', duration: '30 min', description: 'Urgent dental care' }
]

const DENTISTS: DentistInfo[] = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Dentistry' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Orthodontics' },
  { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Endodontics' },
  { id: '4', name: 'Dr. James Williams', specialty: 'Cosmetic Dentistry' },
  { id: '5', name: 'Dr. Lisa Thompson', specialty: 'Pediatric Dentistry' }
]

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: '1', time: '09:00 AM', available: true, dentist: 'Dr. Sarah Johnson' },
  { id: '2', time: '09:30 AM', available: true, dentist: 'Dr. Michael Chen' },
  { id: '3', time: '10:00 AM', available: false, dentist: 'Dr. Sarah Johnson' },
  { id: '4', time: '10:30 AM', available: true, dentist: 'Dr. Emily Rodriguez' },
  { id: '5', time: '11:00 AM', available: true, dentist: 'Dr. James Williams' },
  { id: '6', time: '11:30 AM', available: true, dentist: 'Dr. Lisa Thompson' },
  { id: '7', time: '01:00 PM', available: false, dentist: 'Dr. Sarah Johnson' },
  { id: '8', time: '01:30 PM', available: true, dentist: 'Dr. Michael Chen' },
  { id: '9', time: '02:00 PM', available: true, dentist: 'Dr. Emily Rodriguez' },
  { id: '10', time: '02:30 PM', available: true, dentist: 'Dr. James Williams' },
  { id: '11', time: '03:00 PM', available: false, dentist: 'Dr. Lisa Thompson' },
  { id: '12', time: '03:30 PM', available: true, dentist: 'Dr. Sarah Johnson' },
  { id: '13', time: '04:00 PM', available: true, dentist: 'Dr. Michael Chen' },
  { id: '14', time: '04:30 PM', available: true, dentist: 'Dr. Emily Rodriguez' }
]

export default function ScheduleAppointments() {
  const [step, setStep] = useState<number>(1)
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [patientName, setPatientName] = useState<string>('')
  const [patientEmail, setPatientEmail] = useState<string>('')
  const [patientPhone, setPatientPhone] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [confirmed, setConfirmed] = useState<boolean>(false)

  const availableSlots = MOCK_TIME_SLOTS.filter(slot => slot.available)

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setStep(2)
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setStep(3)
  }

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId)
    setStep(4)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmed(true)
    setStep(5)
  }

  const handleReset = () => {
    setStep(1)
    setSelectedType('')
    setSelectedDate('')
    setSelectedSlot('')
    setPatientName('')
    setPatientEmail('')
    setPatientPhone('')
    setNotes('')
    setConfirmed(false)
  }

  const selectedTypeDetails = APPOINTMENT_TYPES.find(t => t.id === selectedType)
  const selectedSlotDetails = MOCK_TIME_SLOTS.find(s => s.id === selectedSlot)

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h2>
            <div className="bg-blue-50 rounded-lg p-6 text-left mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Appointment Type:</span>
                  <span className="text-gray-900 font-semibold">{selectedTypeDetails?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Date:</span>
                  <span className="text-gray-900 font-semibold">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Time:</span>
                  <span className="text-gray-900 font-semibold">{selectedSlotDetails?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Dentist:</span>
                  <span className="text-gray-900 font-semibold">{selectedSlotDetails?.dentist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Patient:</span>
                  <span className="text-gray-900 font-semibold">{patientName}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to <strong>{patientEmail}</strong>
            </p>
            <button
              onClick={handleReset}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Schedule Another Appointment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Schedule an Appointment</h1>
          <p className="text-gray-600 mb-8">Book your dental appointment in just a few simple steps</p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12">
            {[
              { num: 1, label: 'Select Service' },
              { num: 2, label: 'Choose Date' },
              { num: 3, label: 'Pick Time' },
              { num: 4, label: 'Your Details' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      step >= s.num
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span
                    className={`text-sm mt-2 font-medium ${
                      step >= s.num ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step > s.num ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Appointment Type */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Appointment Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {APPOINTMENT_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all text-left"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{type.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{type.duration}</p>
                    <p className="text-gray-600 text-sm">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 hover:text-blue-700 mb-4 font-medium flex items-center"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose a Date</h2>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700">
                  <strong>Selected:</strong> {selectedTypeDetails?.name} ({selectedTypeDetails?.duration})
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'Mon, Dec 18, 2026',
                  'Tue, Dec 19, 2026',
                  'Wed, Dec 20, 2026',
                  'Thu, Dec 21, 2026',
                  'Fri, Dec 22, 2026',
                  'Mon, Dec 25, 2026',
                  'Tue, Dec 26, 2026',
                  'Wed, Dec 27, 2026'
                ].map((date, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDateSelect(date)}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <p className="font-bold text-gray-800">{date}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Select Time Slot */}
          {step === 3 && (
            <div>
              <button
                onClick={() => setStep(2)}
                className="text-blue-600 hover:text-blue-700 mb-4 font-medium flex items-center"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Time Slots</h2>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700">
                  <strong>Date:</strong> {selectedDate}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableSlots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot.id)}
                    className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-lg transition-all text-left"
                  >
                    <p className="font-bold text-gray-800 text-lg mb-1">{slot.time}</p>
                    <p className="text-sm text-gray-600">{slot.dentist}</p>
                    <div className="mt-2 inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      Available
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Patient Information */}
          {step === 4 && (
            <div>
              <button
                onClick={() => setStep(3)}
                className="text-blue-600 hover:text-blue-700 mb-4 font-medium flex items-center"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Information</h2>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700 mb-2">
                  <strong>Appointment:</strong> {selectedTypeDetails?.name}
                </p>
                <p className="text-gray-700">
                  <strong>Time:</strong> {selectedDate} at {selectedSlotDetails?.time} with {selectedSlotDetails?.dentist}
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Any special requirements or notes for your appointment..."
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                  >
                    Confirm Appointment
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-8 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Available Dentists Sidebar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Our Dentists</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {DENTISTS.map(dentist => (
              <div key={dentist.id} className="bg-gray-50 rounded-lg p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold text-lg">
                    {dentist.name.split(' ')[1][0]}
                  </span>
                </div>
                <p className="font-bold text-gray-800 text-sm">{dentist.name}</p>
                <p className="text-xs text-gray-600 mt-1">{dentist.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
