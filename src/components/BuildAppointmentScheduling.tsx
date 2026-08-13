/**
 * BuildAppointmentScheduling — Comprehensive appointment scheduling interface for dental clinic
 *
 * Features: doctor selection, date picker, time slot booking, appointment type selection, patient info form
 *
 * Ticket: SCRUM-757 | Branch: proto/SCRUM-747
 */

import { useState } from 'react'

interface Doctor {
  id: string
  name: string
  specialty: string
  available: boolean
}

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface AppointmentType {
  id: string
  name: string
  duration: number
  description: string
}

const DOCTORS: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Mitchell', specialty: 'General Dentistry', available: true },
  { id: '2', name: 'Dr. James Chen', specialty: 'Orthodontics', available: true },
  { id: '3', name: 'Dr. Emily Parker', specialty: 'Pediatric Dentistry', available: false },
  { id: '4', name: 'Dr. Michael Roberts', specialty: 'Oral Surgery', available: true },
  { id: '5', name: 'Dr. Amanda Lee', specialty: 'Cosmetic Dentistry', available: true },
  { id: '6', name: 'Dr. David Thompson', specialty: 'Endodontics', available: true },
]

const TIME_SLOTS: TimeSlot[] = [
  { id: '1', time: '08:00 AM', available: true },
  { id: '2', time: '09:00 AM', available: true },
  { id: '3', time: '10:00 AM', available: false },
  { id: '4', time: '11:00 AM', available: true },
  { id: '5', time: '12:00 PM', available: false },
  { id: '6', time: '01:00 PM', available: true },
  { id: '7', time: '02:00 PM', available: true },
  { id: '8', time: '03:00 PM', available: true },
  { id: '9', time: '04:00 PM', available: false },
  { id: '10', time: '05:00 PM', available: true },
]

const APPOINTMENT_TYPES: AppointmentType[] = [
  { id: '1', name: 'General Checkup', duration: 30, description: 'Routine dental examination' },
  { id: '2', name: 'Cleaning', duration: 45, description: 'Professional teeth cleaning' },
  { id: '3', name: 'Filling', duration: 60, description: 'Cavity filling procedure' },
  { id: '4', name: 'Root Canal', duration: 90, description: 'Root canal treatment' },
  { id: '5', name: 'Extraction', duration: 45, description: 'Tooth extraction' },
  { id: '6', name: 'Consultation', duration: 20, description: 'Initial consultation' },
  { id: '7', name: 'Emergency', duration: 30, description: 'Emergency dental care' },
]

export default function BuildAppointmentScheduling() {
  const [step, setStep] = useState<number>(1)
  const [selectedDoctor, setSelectedDoctor] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<string>('')
  const [patientName, setPatientName] = useState<string>('')
  const [patientEmail, setPatientEmail] = useState<string>('')
  const [patientPhone, setPatientPhone] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  const canProceedFromStep1 = selectedAppointmentType !== '' && selectedDoctor !== ''
  const canProceedFromStep2 = selectedDate !== '' && selectedTime !== ''
  const canProceedFromStep3 = patientName !== '' && patientEmail !== '' && patientPhone !== ''

  const getSelectedDoctorName = () => {
    const doctor = DOCTORS.find(d => d.id === selectedDoctor)
    return doctor ? doctor.name : ''
  }

  const getSelectedAppointmentTypeName = () => {
    const type = APPOINTMENT_TYPES.find(t => t.id === selectedAppointmentType)
    return type ? type.name : ''
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
            <p className="text-gray-600 mb-8">Your appointment has been successfully scheduled.</p>
            
            <div className="bg-blue-50 rounded-xl p-6 text-left mb-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">Appointment Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span className="font-medium text-gray-900">{patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{getSelectedAppointmentTypeName()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium text-gray-900">{getSelectedDoctorName()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium text-gray-900">{selectedTime}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false)
                setStep(1)
                setSelectedDoctor('')
                setSelectedDate('')
                setSelectedTime('')
                setSelectedAppointmentType('')
                setPatientName('')
                setPatientEmail('')
                setPatientPhone('')
                setNotes('')
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Schedule Another Appointment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Schedule an Appointment</h1>
            <p className="text-blue-100">Book your dental appointment in just a few steps</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-50 px-8 py-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= stepNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {stepNum}
                    </div>
                    <span
                      className={`ml-3 font-medium ${
                        step >= stepNum ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {stepNum === 1 && 'Select'}
                      {stepNum === 2 && 'Date & Time'}
                      {stepNum === 3 && 'Patient Info'}
                      {stepNum === 4 && 'Review'}
                    </span>
                  </div>
                  {stepNum < 4 && (
                    <div
                      className={`h-1 flex-1 mx-4 ${
                        step > stepNum ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8">
            {/* Step 1: Select Appointment Type and Doctor */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Appointment Type and Doctor</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {APPOINTMENT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedAppointmentType(type.id)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedAppointmentType === type.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900 mb-1">{type.name}</div>
                        <div className="text-sm text-gray-600 mb-2">{type.description}</div>
                        <div className="text-xs text-gray-500">{type.duration} minutes</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Doctor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {DOCTORS.map((doctor) => (
                      <button
                        key={doctor.id}
                        onClick={() => doctor.available && setSelectedDoctor(doctor.id)}
                        disabled={!doctor.available}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedDoctor === doctor.id
                            ? 'border-blue-600 bg-blue-50'
                            : doctor.available
                            ? 'border-gray-200 hover:border-blue-300'
                            : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{doctor.name}</div>
                        <div className="text-sm text-gray-600">{doctor.specialty}</div>
                        {!doctor.available && (
                          <div className="text-xs text-red-600 mt-2">Not Available</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Select Date and Time */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date and Time</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Date</h3>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full md:w-auto px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                          selectedTime === slot.time
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : slot.available
                            ? 'border-gray-300 text-gray-900 hover:border-blue-400'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Patient Information */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
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
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requirements or concerns..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Appointment</h2>
                
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Appointment Type</div>
                      <div className="font-semibold text-gray-900">
                        {getSelectedAppointmentTypeName()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Doctor</div>
                      <div className="font-semibold text-gray-900">
                        {getSelectedDoctorName()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Date</div>
                      <div className="font-semibold text-gray-900">{selectedDate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Time</div>
                      <div className="font-semibold text-gray-900">{selectedTime}</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-600 mb-1">Patient Name</div>
                    <div className="font-semibold text-gray-900">{patientName}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Email</div>
                    <div className="font-semibold text-gray-900">{patientEmail}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Phone</div>
                    <div className="font-semibold text-gray-900">{patientPhone}</div>
                  </div>

                  {notes && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Notes</div>
                      <div className="text-gray-900">{notes}</div>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> You will receive a confirmation email with appointment details. 
                    Please arrive 10 minutes early for check-in.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-8 py-6 flex items-center justify-between border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                step === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !canProceedFromStep1) ||
                  (step === 2 && !canProceedFromStep2) ||
                  (step === 3 && !canProceedFromStep3)
                }
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  (step === 1 && !canProceedFromStep1) ||
                  (step === 2 && !canProceedFromStep2) ||
                  (step === 3 && !canProceedFromStep3)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Confirm Appointment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
