import React, { useState } from 'react'

const MOCK_PROPERTIES = [
  { id: 1, name: 'Beachfront Villa', location: 'Malibu, CA', price: 450 },
  { id: 2, name: 'Mountain Cabin', location: 'Aspen, CO', price: 320 },
  { id: 3, name: 'City Apartment', location: 'New York, NY', price: 280 },
  { id: 4, name: 'Desert Resort', location: 'Phoenix, AZ', price: 200 },
]

const MOCK_GUESTS = [
  { id: 1, name: '1 Guest' },
  { id: 2, name: '2 Guests' },
  { id: 3, name: '3 Guests' },
  { id: 4, name: '4 Guests' },
  { id: 5, name: '5+ Guests' },
]

interface FormData {
  propertyId: string
  checkInDate: string
  checkOutDate: string
  guests: string
  specialRequests: string
}

export default function BuildReservationForm() {
  const [formData, setFormData] = useState<FormData>({
    propertyId: '',
    checkInDate: '',
    checkOutDate: '',
    guests: '',
    specialRequests: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.propertyId) {
      newErrors.propertyId = 'Please select a property'
    }
    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Check-in date is required'
    }
    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required'
    }
    if (formData.checkInDate && formData.checkOutDate) {
      if (new Date(formData.checkInDate) >= new Date(formData.checkOutDate)) {
        newErrors.checkOutDate = 'Check-out must be after check-in'
      }
    }
    if (!formData.guests) {
      newErrors.guests = 'Please select number of guests'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
      console.log('Reservation submitted:', formData)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          propertyId: '',
          checkInDate: '',
          checkOutDate: '',
          guests: '',
          specialRequests: '',
        })
      }, 3000)
    }
  }

  const selectedProperty = MOCK_PROPERTIES.find(p => p.id.toString() === formData.propertyId)
  const totalNights = formData.checkInDate && formData.checkOutDate
    ? Math.ceil((new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0
  const totalPrice = selectedProperty && totalNights > 0 ? selectedProperty.price * totalNights : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Create Your Reservation</h1>
            <p className="text-blue-100">Book your perfect getaway in just a few steps</p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Reservation submitted successfully! Confirmation email sent.</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-8 space-y-6">
            {/* Property Selection */}
            <div>
              <label htmlFor="propertyId" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Property *
              </label>
              <select
                id="propertyId"
                name="propertyId"
                value={formData.propertyId}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.propertyId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Choose a property...</option>
                {MOCK_PROPERTIES.map(property => (
                  <option key={property.id} value={property.id}>
                    {property.name} - {property.location} (${property.price}/night)
                  </option>
                ))}
              </select>
              {errors.propertyId && <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>}
            </div>

            {/* Check-in and Check-out Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="checkInDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.checkInDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
              </div>
              <div>
                <label htmlFor="checkOutDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.checkOutDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>}
              </div>
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Guests *
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.guests ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select number of guests...</option>
                {MOCK_GUESTS.map(guest => (
                  <option key={guest.id} value={guest.id}>
                    {guest.name}
                  </option>
                ))}
              </select>
              {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any special requests or preferences?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Price Summary */}
            {selectedProperty && totalNights > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{selectedProperty.name}</span>
                    <span className="font-medium text-gray-900">${selectedProperty.price}/night</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{totalNights} night{totalNights !== 1 ? 's' : ''}</span>
                    <span className="font-medium text-gray-900">×</span>
                  </div>
                  <div className="border-t border-blue-200 pt-2 flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-blue-600">${totalPrice}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 transform hover:scale-105"
              >
                Complete Reservation
              </button>
              <button
                type="reset"
                onClick={() => {
                  setFormData({
                    propertyId: '',
                    checkInDate: '',
                    checkOutDate: '',
                    guests: '',
                    specialRequests: '',
                  })
                  setErrors({})
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}