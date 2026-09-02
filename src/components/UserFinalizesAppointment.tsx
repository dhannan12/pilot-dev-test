/**
 * UserFinalizesAppointment — Shows warning when user attempts to finalize appointment without confirming all required details
 *
 * Features: appointment summary, unconfirmed details list, warning messages, proceed/cancel actions, validation feedback
 *
 * Ticket: SCRUM-1283 | Branch: proto/SCRUM-1277
 */

import React, { useState } from 'react'

interface AppointmentDetail {
  id: string
  service: string
  tradesperson: string
  date: string
  time: string
  location: string
  price: string
  unconfirmedItems: string[]
  status: 'pending' | 'warning' | 'critical'
}

const mockAppointments: AppointmentDetail[] = [
  {
    id: 'apt-001',
    service: 'Kitchen Renovation',
    tradesperson: 'Mike Johnson',
    date: '2026-09-15',
    time: '09:00 AM',
    location: '123 Main St, Springfield',
    price: '$2,500',
    unconfirmedItems: ['Payment method', 'Access instructions', 'Material preferences'],
    status: 'critical'
  },
  {
    id: 'apt-002',
    service: 'Bathroom Plumbing Repair',
    tradesperson: 'Sarah Davis',
    date: '2026-09-18',
    time: '02:00 PM',
    location: '456 Oak Ave, Riverside',
    price: '$450',
    unconfirmedItems: ['Emergency contact', 'Pet presence'],
    status: 'warning'
  },
  {
    id: 'apt-003',
    service: 'Electrical Panel Upgrade',
    tradesperson: 'Tom Wilson',
    date: '2026-09-20',
    time: '08:00 AM',
    location: '789 Elm St, Lakeside',
    price: '$1,800',
    unconfirmedItems: ['Power shutdown approval', 'Permit verification', 'Timeline expectations'],
    status: 'critical'
  },
  {
    id: 'apt-004',
    service: 'HVAC Maintenance',
    tradesperson: 'Lisa Chen',
    date: '2026-09-22',
    time: '10:00 AM',
    location: '321 Pine Rd, Hilltown',
    price: '$200',
    unconfirmedItems: ['Service agreement terms'],
    status: 'warning'
  },
  {
    id: 'apt-005',
    service: 'Roof Inspection',
    tradesperson: 'James Martinez',
    date: '2026-09-25',
    time: '11:00 AM',
    location: '654 Maple Dr, Brookfield',
    price: '$350',
    unconfirmedItems: ['Ladder access', 'Insurance documentation', 'Photo consent'],
    status: 'warning'
  }
]

export default function UserFinalizesAppointment() {
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetail>(mockAppointments[0])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [proceedAnyway, setProceedAnyway] = useState(false)

  const handleSelectAppointment = (apt: AppointmentDetail) => {
    setSelectedAppointment(apt)
    setShowConfirmation(false)
    setProceedAnyway(false)
  }

  const handleProceedAnyway = () => {
    setProceedAnyway(true)
    setShowConfirmation(true)
  }

  const handleGoBack = () => {
    setShowConfirmation(false)
    setProceedAnyway(false)
  }

  const handleFinalizeConfirmed = () => {
    setShowConfirmation(true)
  }

  return (
    <div data-testid="user-finalizes-appointment" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalize Appointment</h1>
          <p className="text-gray-600">Review and complete your booking</p>
        </div>

        {/* Appointment Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Appointment to Finalize</h2>
          <div data-testid="user-finalizes-appointment-list" className="space-y-3">
            {mockAppointments.map((apt) => (
              <button
                key={apt.id}
                data-testid="user-finalizes-appointment-item"
                onClick={() => handleSelectAppointment(apt)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAppointment.id === apt.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{apt.service}</h3>
                    <p className="text-sm text-gray-600">{apt.tradesperson} • {apt.date} at {apt.time}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {apt.unconfirmedItems.length} unconfirmed
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Warning and Details */}
        {!showConfirmation ? (
          <div className="space-y-6">
            {/* Warning Banner */}
            <div
              data-testid="user-finalizes-appointment-warning"
              className={`rounded-lg p-6 ${
                selectedAppointment.status === 'critical'
                  ? 'bg-red-50 border-2 border-red-200'
                  : 'bg-yellow-50 border-2 border-yellow-200'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className={`h-6 w-6 ${
                      selectedAppointment.status === 'critical' ? 'text-red-600' : 'text-yellow-600'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className={`text-lg font-semibold ${
                    selectedAppointment.status === 'critical' ? 'text-red-800' : 'text-yellow-800'
                  }`}>
                    {selectedAppointment.status === 'critical' ? 'Critical Details Missing' : 'Warning: Incomplete Details'}
                  </h3>
                  <p className={`mt-1 ${
                    selectedAppointment.status === 'critical' ? 'text-red-700' : 'text-yellow-700'
                  }`}>
                    You are attempting to finalize this appointment without confirming all required details. 
                    This may cause issues with your booking.
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Service:</span>
                  <span className="text-gray-900">{selectedAppointment.service}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Tradesperson:</span>
                  <span className="text-gray-900">{selectedAppointment.tradesperson}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Date:</span>
                  <span className="text-gray-900">{selectedAppointment.date}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Time:</span>
                  <span className="text-gray-900">{selectedAppointment.time}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="text-gray-900">{selectedAppointment.location}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Price:</span>
                  <span className="text-gray-900 font-semibold">{selectedAppointment.price}</span>
                </div>
              </div>
            </div>

            {/* Unconfirmed Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Unconfirmed Details</h2>
              <p className="text-gray-600 mb-4">
                The following details have not been confirmed. Please review and confirm these items before finalizing.
              </p>
              <ul data-testid="user-finalizes-appointment-unconfirmed-list" className="space-y-2">
                {selectedAppointment.unconfirmedItems.map((item, index) => (
                  <li
                    key={index}
                    data-testid="user-finalizes-appointment-unconfirmed-item"
                    className="flex items-start p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <svg
                      className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-red-900 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  data-testid="user-finalizes-appointment-go-back"
                  onClick={handleGoBack}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Go Back & Confirm Details
                </button>
                <button
                  data-testid="user-finalizes-appointment-proceed"
                  onClick={handleProceedAnyway}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    selectedAppointment.status === 'critical'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  }`}
                >
                  Proceed Anyway (Not Recommended)
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                We strongly recommend confirming all details before finalizing your appointment
              </p>
            </div>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              {proceedAnyway ? (
                <>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="h-8 w-8 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Appointment Finalized with Warnings
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Your appointment has been finalized, but {selectedAppointment.unconfirmedItems.length} details remain unconfirmed.
                    Please address these as soon as possible.
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Finalized</h2>
                  <p className="text-gray-600 mb-6">
                    Your appointment has been successfully finalized.
                  </p>
                </>
              )}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Booking Reference</h3>
                <p className="text-sm text-gray-600">Appointment ID: {selectedAppointment.id}</p>
                <p className="text-sm text-gray-600">{selectedAppointment.service}</p>
                <p className="text-sm text-gray-600">{selectedAppointment.date} at {selectedAppointment.time}</p>
              </div>
              <button
                data-testid="user-finalizes-appointment-done"
                onClick={() => setShowConfirmation(false)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
