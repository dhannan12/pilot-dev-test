/**
 * UserAttemptsTo — User attempts to access telehealth services
 *
 * Features: telehealth provider selection, appointment scheduling, video consultation access, doctor availability, service category filtering
 *
 * Ticket: SCRUM-1117 | Branch: proto/SCRUM-1115
 */

import { useState } from 'react'

interface TelehealthProvider {
  id: string
  name: string
  specialty: string
  availability: string
  rating: number
  photoUrl: string
  consultationFee: number
  nextAvailable: string
}

interface AppointmentSlot {
  id: string
  time: string
  date: string
  available: boolean
}

const mockProviders: TelehealthProvider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Practitioner',
    availability: 'Available Now',
    rating: 4.8,
    photoUrl: 'https://via.placeholder.com/150',
    consultationFee: 75,
    nextAvailable: 'Today at 2:00 PM'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    availability: 'Available in 30 min',
    rating: 4.9,
    photoUrl: 'https://via.placeholder.com/150',
    consultationFee: 120,
    nextAvailable: 'Today at 3:30 PM'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    availability: 'Available Tomorrow',
    rating: 4.7,
    photoUrl: 'https://via.placeholder.com/150',
    consultationFee: 95,
    nextAvailable: 'Tomorrow at 9:00 AM'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Psychiatrist',
    availability: 'Available Today',
    rating: 4.6,
    photoUrl: 'https://via.placeholder.com/150',
    consultationFee: 150,
    nextAvailable: 'Today at 5:00 PM'
  },
  {
    id: '5',
    name: 'Dr. Amanda Lee',
    specialty: 'Pediatrician',
    availability: 'Available Now',
    rating: 4.9,
    photoUrl: 'https://via.placeholder.com/150',
    consultationFee: 85,
    nextAvailable: 'Today at 1:30 PM'
  },
  {
    id: '6',
    name: 'Dr. Robert Martinez',
    specialty: 'Orthopedic Surgeon',
    availability: 'Available Tomorrow',
    rating: 4.8,
    photoUrl: 'https://via.placeholder.com/150',
    consultationFee: 140,
    nextAvailable: 'Tomorrow at 10:00 AM'
  },
  {
    id: '7',
    name: 'Dr. Lisa Thompson',
    specialty: 'Endocrinologist',
    availability: 'Available Today',
    rating: 4.7,
    photoUrl: 'https://via.placeholder.com/150',
    consultationFee: 110,
    nextAvailable: 'Today at 4:30 PM'
  }
]

const mockAppointmentSlots: AppointmentSlot[] = [
  { id: '1', time: '9:00 AM', date: 'Today', available: true },
  { id: '2', time: '10:30 AM', date: 'Today', available: false },
  { id: '3', time: '1:00 PM', date: 'Today', available: true },
  { id: '4', time: '2:30 PM', date: 'Today', available: true },
  { id: '5', time: '4:00 PM', date: 'Today', available: false },
  { id: '6', time: '9:00 AM', date: 'Tomorrow', available: true },
  { id: '7', time: '11:00 AM', date: 'Tomorrow', available: true }
]

const specialtyCategories = [
  'All Specialties',
  'General Practitioner',
  'Cardiologist',
  'Dermatologist',
  'Psychiatrist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Endocrinologist'
]

export default function UserAttemptsTo() {
  const [selectedProvider, setSelectedProvider] = useState<TelehealthProvider | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All Specialties')
  const [reasonForVisit, setReasonForVisit] = useState<string>('')
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  const filteredProviders = selectedSpecialty === 'All Specialties'
    ? mockProviders
    : mockProviders.filter(p => p.specialty === selectedSpecialty)

  const handleBookAppointment = () => {
    if (selectedProvider && selectedSlot && reasonForVisit) {
      setShowConfirmation(true)
    }
  }

  const handleStartVideoCall = (provider: TelehealthProvider) => {
    setSelectedProvider(provider)
    // In a real app, this would initiate a video call
  }

  const resetForm = () => {
    setSelectedProvider(null)
    setSelectedSlot(null)
    setReasonForVisit('')
    setShowConfirmation(false)
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Telehealth Services
          </h1>
          <p className="text-gray-600">
            Connect with healthcare providers from the comfort of your home
          </p>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && selectedProvider && selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div data-testid="userattemptsto-modal" className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Appointment Confirmed!
              </h2>
              <div className="space-y-3 mb-6">
                <p className="text-gray-700">
                  <span className="font-semibold">Provider:</span> {selectedProvider.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Specialty:</span> {selectedProvider.specialty}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Time:</span> {selectedSlot.date} at {selectedSlot.time}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Fee:</span> ${selectedProvider.consultationFee}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Reason:</span> {reasonForVisit}
                </p>
              </div>
              <button
                data-testid="userattemptsto-close"
                onClick={resetForm}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Specialty Filter */}
        <div className="mb-6">
          <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Specialty
          </label>
          <select
            id="specialty-filter"
            data-testid="userattemptsto-specialty"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {specialtyCategories.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Providers List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div data-testid="userattemptsto-list" className="col-span-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Available Providers ({filteredProviders.length})
            </h2>
          </div>
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              data-testid="userattemptsto-item"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={provider.photoUrl}
                  alt={provider.name}
                  className="w-16 h-16 rounded-full bg-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {provider.name}
                  </h3>
                  <p className="text-sm text-gray-600">{provider.specialty}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-700 ml-1">
                      {provider.rating}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Next Available:</span> {provider.nextAvailable}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Consultation Fee:</span> ${provider.consultationFee}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  provider.availability.includes('Now') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {provider.availability}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  data-testid="userattemptsto-select"
                  onClick={() => setSelectedProvider(provider)}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${
                    selectedProvider?.id === provider.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {selectedProvider?.id === provider.id ? 'Selected' : 'Select Provider'}
                </button>
                {provider.availability.includes('Now') && (
                  <button
                    data-testid="userattemptsto-video"
                    onClick={() => handleStartVideoCall(provider)}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Start Video Call Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Booking Section */}
        {selectedProvider && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Book Appointment with {selectedProvider.name}
            </h2>
            
            {/* Time Slots */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Select Time Slot
              </h3>
              <div data-testid="userattemptsto-slots" className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mockAppointmentSlots.map((slot) => (
                  <button
                    key={slot.id}
                    data-testid="userattemptsto-slot"
                    onClick={() => slot.available && setSelectedSlot(slot)}
                    disabled={!slot.available}
                    className={`py-3 px-4 rounded-lg border transition-colors ${
                      selectedSlot?.id === slot.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : slot.available
                        ? 'bg-white text-gray-900 border-gray-300 hover:border-blue-500'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-sm font-medium">{slot.date}</div>
                    <div className="text-xs">{slot.time}</div>
                    {!slot.available && (
                      <div className="text-xs mt-1">Booked</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Reason for Visit */}
            <div className="mb-6">
              <label htmlFor="reason-visit" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit
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

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                data-testid="userattemptsto-submit"
                onClick={handleBookAppointment}
                disabled={!selectedProvider || !selectedSlot || !reasonForVisit}
                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Book Appointment
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
        )}

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No providers available for the selected specialty.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
