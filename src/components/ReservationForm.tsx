import React, { useState } from 'react';

const MOCK_RESTAURANTS = [
  { id: 1, name: 'The Italian Corner', cuisine: 'Italian', maxGuests: 8 },
  { id: 2, name: 'Sakura Sushi', cuisine: 'Japanese', maxGuests: 10 },
  { id: 3, name: 'Le Petit Bistro', cuisine: 'French', maxGuests: 6 },
  { id: 4, name: 'Spice Route', cuisine: 'Indian', maxGuests: 12 },
  { id: 5, name: 'El Mariachi', cuisine: 'Mexican', maxGuests: 8 },
];

const MOCK_TIME_SLOTS = [
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
];

interface FormData {
  restaurantId: string;
  date: string;
  time: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ReservationForm() {
  const [formData, setFormData] = useState<FormData>({
    restaurantId: '',
    date: '',
    time: '',
    guests: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.restaurantId) newErrors.restaurantId = 'Please select a restaurant';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    if (!formData.guests) newErrors.guests = 'Please select number of guests';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) newErrors.phone = 'Invalid phone format';

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
        setFormData({
          restaurantId: '',
          date: '',
          time: '',
          guests: '',
          name: '',
          email: '',
          phone: '',
          specialRequests: '',
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const selectedRestaurant = MOCK_RESTAURANTS.find((r) => r.id.toString() === formData.restaurantId);
  const maxGuests = selectedRestaurant?.maxGuests || 12;

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-8 sm:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Make a Reservation</h1>
            <p className="text-amber-100">Book your table at your favorite restaurant</p>
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6">
              <p className="text-green-700 font-semibold">✓ Reservation submitted successfully!</p>
              <p className="text-green-600 text-sm mt-1">We'll confirm your booking shortly.</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Restaurant Selection */}
            <div>
              <label htmlFor="restaurantId" className="block text-sm font-semibold text-gray-700 mb-2">
                Restaurant *
              </label>
              <select
                id="restaurantId"
                name="restaurantId"
                value={formData.restaurantId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${
                  errors.restaurantId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a restaurant</option>
                {MOCK_RESTAURANTS.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name} - {restaurant.cuisine}
                  </option>
                ))}
              </select>
              {errors.restaurantId && <p className="text-red-500 text-sm mt-1">{errors.restaurantId}</p>}
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                  Time *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${
                    errors.time ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a time</option>
                  {MOCK_TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Guests * (Max: {maxGuests})
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${
                  errors.guests ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select number of guests</option>
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
              {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
            </div>

            {/* Name and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-700 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any dietary restrictions, allergies, or special occasions?"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95"
              >
                Confirm Reservation
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-gray-500 text-sm mt-4">
              * Required fields. We'll send a confirmation to your email.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}