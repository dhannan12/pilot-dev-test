import React, { useState } from 'react';

const MOCK_PROPERTIES = [
  { id: 1, name: 'Beachfront Villa', location: 'Malibu, CA', price: 450 },
  { id: 2, name: 'Mountain Cabin', location: 'Aspen, CO', price: 320 },
  { id: 3, name: 'City Penthouse', location: 'New York, NY', price: 550 },
  { id: 4, name: 'Desert Resort', location: 'Phoenix, AZ', price: 280 },
];

const MOCK_GUESTS = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

interface FormData {
  propertyId: string;
  guestId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: string;
  specialRequests: string;
}

export default function BuildReservationForm() {
  const [formData, setFormData] = useState<FormData>({
    propertyId: '',
    guestId: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: '',
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
    if (formData.checkInDate && formData.checkOutDate && formData.checkInDate >= formData.checkOutDate) {
      newErrors.checkOutDate = 'Check-out date must be after check-in date';
    }
    if (formData.numberOfGuests && parseInt(formData.numberOfGuests) < 1) {
      newErrors.numberOfGuests = 'Must have at least 1 guest';
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
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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
          numberOfGuests: '',
          specialRequests: '',
        });
      }, 3000);
    }
  };

  const selectedProperty = MOCK_PROPERTIES.find((p) => p.id === parseInt(formData.propertyId));
  const totalPrice = selectedProperty && formData.checkInDate && formData.checkOutDate
    ? Math.ceil((new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / (1000 * 60 * 60 * 24)) * selectedProperty.price
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">Create Reservation</h1>
            <p className="text-blue-100 mt-2">Book your perfect getaway</p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
              <p className="text-green-700 font-semibold">✓ Reservation submitted successfully!</p>
              <p className="text-green-600 text-sm mt-1">Your booking confirmation has been sent to your email.</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.propertyId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Choose a property...</option>
                {MOCK_PROPERTIES.map((prop) => (
                  <option key={prop.id} value={prop.id}>
                    {prop.name} - {prop.location} (${prop.price}/night)
                  </option>
                ))}
              </select>
              {errors.propertyId && <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>}
            </div>

            {/* Guest Selection */}
            <div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div>
              <label htmlFor="numberOfGuests" className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Guests *
              </label>
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                min="1"
                max="20"
                value={formData.numberOfGuests}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.numberOfGuests && <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests}</p>}
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
                rows={4}
                placeholder="Any special requests or preferences?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price Summary */}
            {totalPrice > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Total Price:</span>
                  <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {Math.ceil((new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) / (1000 * 60 * 60 * 24))} nights × ${selectedProperty?.price}/night
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 transform hover:scale-105"
            >
              Complete Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}