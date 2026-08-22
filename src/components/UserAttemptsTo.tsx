/**
 * UserAttemptsTo — User attempts to schedule telehealth consultation without consent
 *
 * Features: consent validation, appointment blocking, consent form display, error messaging, telehealth scheduling
 *
 * Ticket: SCRUM-1120 | Branch: proto/SCRUM-1115
 */

import { useState } from 'react'

interface TelehealthProvider {
  id: string
  name: string
  specialty: string
  availability: string
  rating: number
  consultationFee: number
}

interface ConsentItem {
  id: string
  title: string
  description: string
  required: boolean
}

const mockProviders: TelehealthProvider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Practitioner',
    availability: 'Today at 2:00 PM',
    rating: 4.8,
    consultationFee: 75
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    availability: 'Today at 3:30 PM',
    rating: 4.9,
    consultationFee: 120
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    availability: 'Tomorrow at 9:00 AM',
    rating: 4.7,
    consultationFee: 95
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Psychiatrist',
    availability: 'Today at 5:00 PM',
    rating: 4.6,
    consultationFee: 150
  },
  {
    id: '5',
    name: 'Dr. Amanda Lee',
    specialty: 'Pediatrician',
    availability: 'Today at 1:30 PM',
    rating: 4.9,
    consultationFee: 85
  }
]

const consentItems: ConsentItem[] = [
  {
    id: '1',
    title: 'Telehealth Services Agreement',
    description: 'I understand that telehealth services may have limitations and are not suitable for emergency situations.',
    required: true
  },
  {
    id: '2',
    title: 'Privacy and Data Sharing',
    description: 'I consent to the collection, use, and disclosure of my health information for telehealth services.',
    required: true
  },
  {
    id: '3',
    title: 'Video Recording Consent',
    description: 'I understand that telehealth sessions may be recorded for quality assurance and medical records purposes.',
    required: true
  },
  {
    id: '4',
    title: 'Payment Authorization',
    description: 'I authorize payment for telehealth consultation fees and understand the cancellation policy.',
    required: true
  },
  {
    id: '5',
    title: 'Technical Requirements',
    description: 'I confirm that I have access to the necessary technology and internet connection for telehealth services.',
    required: true
  }
]

export default function UserAttemptsTo() {
  const [selectedProvider, setSelectedProvider] = useState<TelehealthProvider | null>(null)
  const [appointmentDate, setAppointmentDate] = useState<string>('')
  const [appointmentTime, setAppointmentTime] = useState<string>('')
  const [reasonForVisit, setReasonForVisit] = useState<string>('')
  const [consentGiven, setConsentGiven] = useState<Record<string, boolean>>({})
  const [showConsentModal, setShowConsentModal] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [attemptedWithoutConsent, setAttemptedWithoutConsent] = useState<boolean>(false)

  const allConsentsGiven = consentItems.every(item => consentGiven[item.id] === true)

  const handleScheduleAttempt = () => {
    if (!allConsentsGiven) {
      setAttemptedWithoutConsent(true)
      setShowErrorModal(true)
    } else {
      // Booking would proceed
      alert('Appointment scheduled successfully!')
      resetForm()
    }
  }

  const handleConsentChange = (id: string, checked: boolean) => {
    setConsentGiven(prev => ({ ...prev, [id]: checked }))
  }

  const handleSelectAllConsents = () => {
    const allSelected = consentItems.reduce((acc, item) => {
      acc[item.id] = true
      return acc
    }, {} as Record<string, boolean>)
    setConsentGiven(allSelected)
  }

  const resetForm = () => {
    setSelectedProvider(null)
    setAppointmentDate('')
    setAppointmentTime('')
    setReasonForVisit('')
    setConsentGiven({})
    setShowConsentModal(false)
    setShowErrorModal(false)
    setAttemptedWithoutConsent(false)
  }

  const isFormValid = selectedProvider && appointmentDate && appointmentTime && reasonForVisit

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Schedule Telehealth Consultation
          </h1>
          <p className="text-gray-600">
            Book an appointment with a healthcare provider
          </p>
        </div>

        {/* Error Modal - Consent Required */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div data-testid="userattemptsto-error-modal" className="bg-white rounded-lg p-8 max-w-md w-full mx-4 border-4 border-red-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-red-600 text-2xl font-bold">!</span>
                </div>
                <h2 className="text-2xl font-bold text-red-600">
                  Consent Required
                </h2>
              </div>
              <p className="text-gray-700 mb-4">
                You cannot schedule a telehealth consultation without providing all required consents. 
                Please review and accept all consent items before proceeding.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800 font-medium">
                  Missing {consentItems.length - Object.values(consentGiven).filter(Boolean).length} required consent(s)
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  data-testid="userattemptsto-review-consent"
                  onClick={() => {
                    setShowErrorModal(false)
                    setShowConsentModal(true)
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Review Consents
                </button>
                <button
                  data-testid="userattemptsto-close-error"
                  onClick={() => setShowErrorModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Consent Modal */}
        {showConsentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div data-testid="userattemptsto-consent-modal" className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 my-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Required Consents
              </h2>
              <p className="text-gray-600 mb-6">
                Please review and accept all required consents to proceed with scheduling your telehealth consultation.
              </p>
              
              <div data-testid="userattemptsto-consent-list" className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {consentItems.map((item) => (
                  <div
                    key={item.id}
                    data-testid="userattemptsto-consent-item"
                    className="border border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors"
                  >
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        data-testid={`userattemptsto-consent-${item.id}`}
                        checked={consentGiven[item.id] || false}
                        onChange={(e) => handleConsentChange(item.id, e.target.checked)}
                        className="mt-1 mr-3 w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1 flex items-center">
                          {item.title}
                          {item.required && (
                            <span className="ml-2 text-red-600 text-sm">*Required</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  data-testid="userattemptsto-accept-all"
                  onClick={handleSelectAllConsents}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Accept All Consents
                </button>
                <button
                  data-testid="userattemptsto-close-consent"
                  onClick={() => setShowConsentModal(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Provider Selection */}
          <div className="mb-6">
            <label htmlFor="provider-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Healthcare Provider <span className="text-red-600">*</span>
            </label>
            <select
              id="provider-select"
              data-testid="userattemptsto-provider"
              value={selectedProvider?.id || ''}
              onChange={(e) => {
                const provider = mockProviders.find(p => p.id === e.target.value)
                setSelectedProvider(provider || null)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select a Provider --</option>
              {mockProviders.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} - {provider.specialty} (${provider.consultationFee})
                </option>
              ))}
            </select>
          </div>

          {/* Provider Details */}
          {selectedProvider && (
            <div data-testid="userattemptsto-provider-details" className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedProvider.name}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p><span className="font-medium">Specialty:</span> {selectedProvider.specialty}</p>
                <p><span className="font-medium">Rating:</span> ⭐ {selectedProvider.rating}</p>
                <p><span className="font-medium">Next Available:</span> {selectedProvider.availability}</p>
                <p><span className="font-medium">Fee:</span> ${selectedProvider.consultationFee}</p>
              </div>
            </div>
          )}

          {/* Date and Time Selection */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="appointment-date"
                data-testid="userattemptsto-date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="appointment-time" className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Time <span className="text-red-600">*</span>
              </label>
              <input
                type="time"
                id="appointment-time"
                data-testid="userattemptsto-time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Reason for Visit */}
          <div className="mb-6">
            <label htmlFor="reason-visit" className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Visit <span className="text-red-600">*</span>
            </label>
            <textarea
              id="reason-visit"
              data-testid="userattemptsto-reason"
              value={reasonForVisit}
              onChange={(e) => setReasonForVisit(e.target.value)}
              rows={4}
              placeholder="Please describe your symptoms or reason for consultation..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Consent Section */}
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <span className="text-yellow-600 mr-2">⚠️</span>
              Consent Required
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              You must review and accept all required consents before scheduling your appointment.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium text-gray-900">
                  Consents Accepted: {Object.values(consentGiven).filter(Boolean).length} / {consentItems.length}
                </span>
                {!allConsentsGiven && (
                  <span className="ml-2 text-red-600 font-medium">
                    ({consentItems.length - Object.values(consentGiven).filter(Boolean).length} remaining)
                  </span>
                )}
              </div>
              <button
                data-testid="userattemptsto-view-consent"
                onClick={() => setShowConsentModal(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                {allConsentsGiven ? 'View Consents' : 'Review & Accept Consents'}
              </button>
            </div>
          </div>

          {/* Warning Message */}
          {attemptedWithoutConsent && !allConsentsGiven && (
            <div data-testid="userattemptsto-warning" className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">
                ⛔ You attempted to schedule without required consents. Please accept all consents to continue.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              data-testid="userattemptsto-submit"
              onClick={handleScheduleAttempt}
              disabled={!isFormValid}
              className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              Schedule Appointment
            </button>
            <button
              data-testid="userattemptsto-cancel"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Provider List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Available Providers
          </h2>
          <div data-testid="userattemptsto-list" className="space-y-3">
            {mockProviders.map((provider) => (
              <div
                key={provider.id}
                data-testid="userattemptsto-item"
                className={`border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer ${
                  selectedProvider?.id === provider.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => setSelectedProvider(provider)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                    <p className="text-sm text-gray-600">{provider.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">⭐ {provider.rating}</p>
                    <p className="text-sm font-medium text-gray-900">${provider.consultationFee}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
