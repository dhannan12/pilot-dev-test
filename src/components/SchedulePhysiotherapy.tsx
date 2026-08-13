/**
 * SchedulePhysiotherapy — Quick appointment booking interface for physiotherapy patients
 *
 * Features: therapist selection, service type picker, calendar date/time slots, patient details form, instant booking confirmation
 *
 * Ticket: SCRUM-719 | Branch: proto/SCRUM-717
 */

import { useState } from 'react'

interface Therapist {
  id: string
  name: string
  specialty: string
  availability: string
  rating: number
}

interface ServiceType {
  id: string
  name: string
  duration: number
  price: number
}

interface TimeSlot {
  time: string
  available: boolean
}

const THERAPISTS: Therapist[] = [
  { id: '1', name: 'Dr. Sarah Mitchell', specialty: 'Sports Injury', availability: 'Mon-Fri', rating: 4.9 },
  { id: '2', name: 'Dr. James Chen', specialty: 'Orthopedic', availability: 'Tue-Sat', rating: 4.8 },
  { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Neurological', availability: 'Mon-Thu', rating: 4.7 },
  { id: '4', name: 'Dr. Michael Johnson', specialty: 'Geriatric', availability: 'Wed-Sun', rating: 4.9 },
  { id: '5', name: 'Dr. Aisha Patel', specialty: 'Pediatric', availability: 'Mon-Fri', rating: 4.8 }
]

const SERVICES: ServiceType[] = [
  { id: '1', name: 'Manual Therapy', duration: 45, price: 85 },
  { id: '2', name: 'Exercise Therapy', duration: 60, price: 95 },
  { id: '3', name: 'Sports Rehabilitation', duration: 60, price: 110 },
  { id: '4', name: 'Post-Surgery Recovery', duration: 90, price: 150 },
  { id: '5', name: 'Pain Management', duration: 45, price: 90 }
]

const TIME_SLOTS: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '01:00 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: false },
  { time: '05:00 PM', available: true }
]

export default function SchedulePhysiotherapy() {
  const [step, setStep] = useState(1)
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [patientName, setPatientName] = useState('')
  const [patientEmail, setPatientEmail] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isBooked, setIsBooked] = useState(false)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleBooking = () => {
    setIsBooked(true)
  }

  const canProceedFromStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return selectedTherapist !== null && selectedService !== null
      case 2:
        return selectedDate !== '' && selectedTime !== null
      case 3:
        return patientName !== '' && patientEmail !== '' && patientPhone !== ''
      default:
        return false
    }
  }

  if (isBooked) {
    const therapist = THERAPISTS.find(t => t.id === selectedTherapist)
    const service = SERVICES.find(s => s.id === selectedService)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h2>
            <p className="text-gray-600 mb-8">Your physiotherapy session has been successfully scheduled.</p>

            <div className="bg-blue-50 rounded-lg p-6 text-left space-y-3">
              <div className="flex justify-between border-b border-blue-200 pb-2">
                <span className="font-semibold text-gray-700">Patient:</span>
                <span className="text-gray-800">{patientName}</span>
              </div>
              <div className="flex justify-between border-b border-blue-200 pb-2">
                <span className="font-semibold text-gray-700">Therapist:</span>
                <span className="text-gray-800">{therapist?.name}</span>
              </div>
              <div className="flex justify-between border-b border-blue-200 pb-2">
                <span className="font-semibold text-gray-700">Service:</span>
                <span className="text-gray-800">{service?.name}</span>
              </div>
              <div className="flex justify-between border-b border-blue-200 pb-2">
                <span className="font-semibold text-gray-700">Date & Time:</span>
                <span className="text-gray-800">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between border-b border-blue-200 pb-2">
                <span className="font-semibold text-gray-700">Duration:</span>
                <span className="text-gray-800">{service?.duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Price:</span>
                <span className="text-gray-800 font-bold">${service?.price}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-6">
              A confirmation email has been sent to <span className="font-semibold">{patientEmail}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Schedule Physiotherapy Appointment</h1>
          <p className="text-gray-600 mb-6">Book your appointment in under 5 minutes</p>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s < step
                      ? 'bg-green-500 text-white'
                      : s === step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Therapist & Service */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Your Therapist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {THERAPISTS.map((therapist) => (
                    <div
                      key={therapist.id}
                      onClick={() => setSelectedTherapist(therapist.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedTherapist === therapist.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800">{therapist.name}</h3>
                      <p className="text-sm text-gray-600">{therapist.specialty}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{therapist.availability}</span>
                        <span className="text-sm font-semibold text-yellow-600">★ {therapist.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Service Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedService === service.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800">{service.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600">{service.duration} min</span>
                        <span className="text-lg font-bold text-blue-600">${service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Date</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>

              {selectedDate && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Time Slot</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-3 rounded-lg font-semibold transition-all ${
                          selectedTime === slot.time
                            ? 'bg-blue-600 text-white'
                            : slot.available
                            ? 'bg-white border-2 border-gray-300 text-gray-800 hover:border-blue-400'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Patient Details */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Details</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific concerns or requirements..."
                  rows={4}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Review Your Appointment</h2>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Therapist</p>
                    <p className="font-semibold text-gray-800">
                      {THERAPISTS.find(t => t.id === selectedTherapist)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-semibold text-gray-800">
                      {SERVICES.find(s => s.id === selectedService)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-800">{selectedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold text-gray-800">{selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Patient</p>
                    <p className="font-semibold text-gray-800">{patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Price</p>
                    <p className="font-semibold text-blue-600 text-xl">
                      ${SERVICES.find(s => s.id === selectedService)?.price}
                    </p>
                  </div>
                </div>
                {notes && (
                  <div>
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-gray-800">{notes}</p>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Cancellation Policy:</span> Free cancellation up to 24 hours before your appointment.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                step === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceedFromStep(step)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  canProceedFromStep(step)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleBooking}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
