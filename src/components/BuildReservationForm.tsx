import React, { useState } from 'react';

const MOCK_PROPERTIES = [
  { id: 1, name: 'Beachfront Villa', location: 'Malibu, CA', price: 450 },
  { id: 2, name: 'Mountain Cabin', location: 'Aspen, CO', price: 320 },
  { id: 3, name: 'City Apartment', location: 'New York, NY', price: 280 },
  { id: 4, name: 'Desert Resort', location: 'Scottsdale, AZ', price: 380 },
];

const MOCK_GUESTS = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

interface ReservationFormData {
  propertyId: string;
  guestId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: string;
  specialRequests: string;
}

export default function BuildReservationForm() {
  const [formData, setFormData] = useState<ReservationFormData>({
    propertyId: '',
    guestId: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: '1',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.propertyId) newErrors.propertyId = 'Property is required';
    if (!formData.guestId) newErrors.guestId = 'Guest is required';
    if (!formData.checkInDate) newErrors.checkInDate = 'Check-in date is required';
    if (!formData.checkOutDate) newErrors.checkOutDate = 'Check-out date is required';
    if (!formData.numberOfGuests) newErrors.numberOfGuests = 'Number of guests is required';

    if (formData.checkInDate && formData.checkOutDate) {
      if (new Date(formData.checkInDate) >= new Date(formData.checkOutDate)) {
        newErrors.checkOutDate = 'Check-out date must be after check-in date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      console.log('Reservation submitted:', formData);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          propertyId: '',
          guestId: '',
          checkInDate: '',
          checkOutDate: '',
          numberOfGuests: '1',
          specialRequests: '',
        });
      }, 3000);
    }
  };

  const selectedProperty = MOCK_PROPERTIES.find((p) => p.id.toString() === formData.propertyId);
  const totalPrice = selectedProperty
    ? selectedProperty.price *
      (formData.checkInDate && formData.checkOutDate
        ? Math.ceil((new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / (1000 * 60 * 60 * 24))
        : 0)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 sm:px-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Reservation</h1>
            <p className="text-blue-100">Book your perfect getaway today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8">
            {/* Property Selection */}
            <div className="mb-6">
              <label htmlFor="propertyId" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Property *
              </label>
              <select
                id="propertyId"
                name="propertyId"
                value={formData.propertyId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.propertyId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Choose a property...</option>
                {MOCK_PROPERTIES.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name} - {property.location} (${property.price}/night)
                  </option>
                ))}
              </select>
              {errors.propertyId && <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>}
            </div>

            {/* Guest Selection */}
            <div className="mb-6">
              <label htmlFor="guestId" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Guest *
              </label>
              <select
                id="guestId"
                name="guestId"
                value={formData.guestId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.guestId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Choose a guest...</option>
                {MOCK_GUESTS.map((guest) => (
                  <option key={guest.id} value={guest.id}>
                    {guest.name} ({guest.email})
                  </option>
                ))}
              </select>
              {errors.guestId && <p className="text-red-500 text-sm mt-1">{errors.guestId}</p>}
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.checkOutDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.checkOutDate && <p className="text-red-500 text-sm mt-1">{errors.checkOutDate}</p>}
              </div>
            </div>

            {/* Number of Guests */}
            <div className="mb-6">
              <label htmlFor="numberOfGuests" className="block text-sm font-semibold text-gray-700 mb-2">
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.numberOfGuests && <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests}</p>}
            </div>

            {/* Special Requests */}
            <div className="mb-6">
              <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any special requests or requirements?"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Summary */}
            {selectedProperty && formData.checkInDate && formData.checkOutDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Nightly Rate:</span>
                  <span className="font-semibold text-gray-900">${selectedProperty.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Number of Nights:</span>
                  <span className="font-semibold text-gray-900">
                    {Math.ceil((new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
                <div className="border-t border-blue-200 pt-2 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Price:</span>
                  <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 transform hover:scale-105"
            >
              {submitted ? 'Reservation Confirmed!' : 'Complete Reservation'}
            </button>
          </form>

          {/* Success Message */}
          {submitted && (
            <div className="bg-green-50 border-t border-green-200 px-6 py-4 sm:px-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Your reservation has been successfully created!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}