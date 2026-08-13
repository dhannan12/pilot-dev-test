/**
 * ScheduleAppointments — Online appointment scheduling with insurance validation
 *
 * Features: insurance verification, date/time selection, dentist picker, appointment type, real-time availability
 *
 * Ticket: SCRUM-749 | Branch: proto/SCRUM-747
 */

import { useState } from 'react'

interface InsuranceInfo {
  provider: string
  policyNumber: string
  groupNumber: string
  subscriberName: string
}

interface Dentist {
  id: string
  name: string
  specialty: string
  available: boolean
}

interface AppointmentType {
  id: string
  name: string
  duration: number
  description: string
}

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

const MOCK_DENTISTS: Dentist[] = [
  { id: '1', name: 'Dr. Sarah Johnson', specialty: 'General Dentistry', available: true },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Orthodontics', available: true },
  { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Periodontics', available: true },
  { id: '4', name: 'Dr. David Kim', specialty: 'Endodontics', available: true },
  { id: '5', name: 'Dr. Lisa Thompson', specialty: 'Oral Surgery', available: true },
]

const MOCK_APPOINTMENT_TYPES: AppointmentType[] = [
  { id: '1', name: 'Regular Checkup', duration: 30, description: 'Routine dental examination' },
  { id: '2', name: 'Teeth Cleaning', duration: 45, description: 'Professional cleaning and polishing' },
  { id: '3', name: 'Cavity Filling', duration: 60, description: 'Dental restoration' },
  { id: '4', name: 'Root Canal', duration: 90, description: 'Endodontic treatment' },
  { id: '5', name: 'Tooth Extraction', duration: 45, description: 'Surgical removal of tooth' },
]

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: '1', time: '09:00 AM', available: true },
  { id: '2', time: '10:00 AM', available: true },
  { id: '3', time: '11:00 AM', available: false },
  { id: '4', time: '01:00 PM', available: true },
  { id: '5', time: '02:00 PM', available: true },
  { id: '6', time: '03:00 PM', available: true },
  { id: '7', time: '04:00 PM', available: false },
]

export default function ScheduleAppointments() {
  const [step, setStep] = useState<'insurance' | 'details' | 'confirmation'>('insurance')
  const [insuranceInfo, setInsuranceInfo] = useState<InsuranceInfo>({
    provider: '',
    policyNumber: '',
    groupNumber: '',
    subscriberName: '',
  })
  const [selectedDentist, setSelectedDentist] = useState<string>('')
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')
  const [notes, setNotes] = useState<string>('')

  const isInsuranceValid = () => {
    return (
      insuranceInfo.provider.trim() !== '' &&
      insuranceInfo.policyNumber.trim() !== '' &&
      insuranceInfo.groupNumber.trim() !== '' &&
      insuranceInfo.subscriberName.trim() !== ''
    )
  }

  const handleInsuranceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isInsuranceValid()) {
      setStep('details')
    }
  }

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedDentist && selectedAppointmentType && selectedDate && selectedTimeSlot) {
      setStep('confirmation')
    }
  }

  const handleReset = () => {
    setStep('insurance')
    setInsuranceInfo({
      provider: '',
      policyNumber: '',
      groupNumber: '',
      subscriberName: '',
    })
    setSelectedDentist('')
    setSelectedAppointmentType('')
    setSelectedDate('')
    setSelectedTimeSlot('')
    setNotes('')
  }

  if (step === 'confirmation') {
    const dentist = MOCK_DENTISTS.find(d => d.id === selectedDentist)
    const appointmentType = MOCK_APPOINTMENT_TYPES.find(a => a.id === selectedAppointmentType)
    const timeSlot = MOCK_TIME_SLOTS.find(t => t.id === selectedTimeSlot)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
            <p className="text-gray-600">Your appointment has been successfully scheduled</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-sm text-gray-600">Dentist</p>
              <p className="text-lg font-semibold text-gray-900">{dentist?.name}</p>
              <p className="text-sm text-gray-500">{dentist?.specialty}</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-sm text-gray-600">Appointment Type</p>
              <p className="text-lg font-semibold text-gray-900">{appointmentType?.name}</p>
              <p className="text-sm text-gray-500">{appointmentType?.duration} minutes</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="text-lg font-semibold text-gray-900">{selectedDate}</p>
              <p className="text-sm text-gray-500">{timeSlot?.time}</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-sm text-gray-600">Insurance</p>
              <p className="text-lg font-semibold text-gray-900">{insuranceInfo.provider}</p>
              <p className="text-sm text-gray-500">Policy: {insuranceInfo.policyNumber}</p>
            </div>

            {notes && (
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-sm text-gray-600">Notes</p>
                <p className="text-sm text-gray-900">{notes}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Schedule Another Appointment
          </button>
        </div>
      </div>
    )
  }

  if (step === 'details') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Schedule Your Appointment</h2>
          
          <form onSubmit={handleAppointmentSubmit} className="space-y-6">
            {/* Dentist Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Dentist *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_DENTISTS.map((dentist) => (
                  <div
                    key={dentist.id}
                    onClick={() => setSelectedDentist(dentist.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedDentist === dentist.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{dentist.name}</p>
                    <p className="text-sm text-gray-600">{dentist.specialty}</p>
                    {dentist.available && (
                      <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Available
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Appointment Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Appointment Type *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {MOCK_APPOINTMENT_TYPES.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setSelectedAppointmentType(type.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAppointmentType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{type.name}</p>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                      <span className="text-sm text-gray-500">{type.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Time Slot *
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {MOCK_TIME_SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!slot.available}
                    onClick={() => setSelectedTimeSlot(slot.id)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      selectedTimeSlot === slot.id
                        ? 'bg-blue-600 text-white'
                        : slot.available
                        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any specific concerns or requests..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('insurance')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to Insurance
              </button>
              <button
                type="submit"
                disabled={!selectedDentist || !selectedAppointmentType || !selectedDate || !selectedTimeSlot}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Insurance Information</h2>
          <p className="text-gray-600">Please provide your insurance details to proceed with scheduling</p>
        </div>

        <form onSubmit={handleInsuranceSubmit} className="space-y-6">
          <div>
            <label htmlFor="provider" className="block text-sm font-semibold text-gray-700 mb-2">
              Insurance Provider *
            </label>
            <input
              type="text"
              id="provider"
              value={insuranceInfo.provider}
              onChange={(e) => setInsuranceInfo({ ...insuranceInfo, provider: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Blue Cross Blue Shield"
              required
            />
          </div>

          <div>
            <label htmlFor="policyNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Policy Number *
            </label>
            <input
              type="text"
              id="policyNumber"
              value={insuranceInfo.policyNumber}
              onChange={(e) => setInsuranceInfo({ ...insuranceInfo, policyNumber: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 123456789"
              required
            />
          </div>

          <div>
            <label htmlFor="groupNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Group Number *
            </label>
            <input
              type="text"
              id="groupNumber"
              value={insuranceInfo.groupNumber}
              onChange={(e) => setInsuranceInfo({ ...insuranceInfo, groupNumber: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., GRP001"
              required
            />
          </div>

          <div>
            <label htmlFor="subscriberName" className="block text-sm font-semibold text-gray-700 mb-2">
              Subscriber Name *
            </label>
            <input
              type="text"
              id="subscriberName"
              value={insuranceInfo.subscriberName}
              onChange={(e) => setInsuranceInfo({ ...insuranceInfo, subscriberName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., John Doe"
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-blue-900">Insurance Verification Required</p>
                <p className="text-sm text-blue-700 mt-1">
                  All fields are required to proceed with appointment scheduling. Your insurance information will be verified before confirming your appointment.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isInsuranceValid()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Continue to Appointment Details
          </button>
        </form>
      </div>
    </div>
  )
}
