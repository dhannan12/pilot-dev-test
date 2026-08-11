import React, { useState } from 'react'

const MOCK_PROPERTIES = [
  { id: 1, name: 'Beachfront Villa', location: 'Malibu, CA', price: 450 },
  { id: 2, name: 'Mountain Cabin', location: 'Aspen, CO', price: 320 },
  { id: 3, name: 'City Apartment', location: 'New York, NY', price: 280 },
  { id: 4, name: 'Desert Resort', location: 'Scottsdale, AZ', price: 380 }
]

const MOCK_GUESTS = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
]

interface ReservationFormData {
  propertyId: string
  guestId: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests: string
  specialRequests: string
}

export default function BuildReservationForm() {
  const [formData, setFormData] = useState<ReservationFormData>({
    propertyId: '',
    guestId: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: '1',
    specialRequests: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.propertyId) newErrors.propertyId = 'Property is required'
    if (!formData.guestId) newErrors.guestId = 'Guest is required'
    if (!formData.checkInDate) newErrors.checkInDate = 'Check-in date is required'
    if (!formData.checkOutDate) newErrors.checkOutDate = 'Check-out date is required'
    if (!formData.numberOfGuests) newErrors.numberOfGuests = 'Number of guests is required'

    if (formData.checkInDate && formData.checkOutDate) {
      if (new Date(formData.checkInDate) >= new Date(formData.checkOutDate)) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
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
          guestId: '',
          checkInDate: '',
          checkOutDate: '',
          numberOfGuests: '1',
          specialRequests: ''
        })
      }, 3000)
    }
  }

  const selectedProperty = MOCK_PROPERTIES.find(p => p.id.toString() === formData.propertyId)
  const totalPrice = selectedProperty ? selectedProperty.price * Math.max(1, parseInt(formData.numberOfGuests) || 1) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Create Reservation</h1>
            <p className="text-blue-100 mt-2">Book your perfect getaway</p>
          </div>

          {submitted && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
              <p className="text-green-700 font-semibold">✓ Reservation submitted successfully!</p>
              <p className="text-green-600 text-sm mt-1">Your booking confirmation has been sent to the guest email.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-2">
                  Property *
                </label>
                <select
                  id="propertyId"
                  name="propertyId"
                  value={formData.propertyId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.propertyId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a property</option>
                  {MOCK_PROPERTIES.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name} - {property.location} (${property.price}/night)
                    </option>
                  ))}
                </select>
                {errors.propertyId && <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>}
              </div>

              <div>
                <label htmlFor="guestId" className="block text-sm font-medium text-gray-700 mb-2">
                  Guest *
                </label>
                <select
                  id="guestId"
                  name="guestId"
                  value={formData.guestId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.guestId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a guest</option>
                  {MOCK_GUESTS.map(guest => (
                    <option key={guest.id} value={guest.id}>
                      {guest.name} ({guest.email})
                    </option>
                  ))}
                </select>
                {errors.guestId && <p className="text-red-500 text-sm mt-1">{errors.guestId}</p>}
              </div>

              <div>
                <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.checkInDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
              </div>

              <div>
                <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.checkOutDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>}
              </div>

              <div>
                <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  id="numberOfGuests"
                  name="numberOfGuests"
                  min="1"
                  max="10"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.numberOfGuests && <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                placeholder="Any special requests or preferences?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {selectedProperty && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Estimated Total</p>
                    <p className="text-2xl font-bold text-blue-600">${totalPrice}</p>
                    <p className="text-xs text-gray-500 mt-1">${selectedProperty.price} per night × {formData.numberOfGuests} guest(s)</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 transform hover:scale-105"
              >
                Create Reservation
              </button>
              <button
                type="reset"
                onClick={() => {
                  setFormData({
                    propertyId: '',
                    guestId: '',
                    checkInDate: '',
                    checkOutDate: '',
                    numberOfGuests: '1',
                    specialRequests: ''
                  })
                  setErrors({})
                }}
                className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition duration-200"
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