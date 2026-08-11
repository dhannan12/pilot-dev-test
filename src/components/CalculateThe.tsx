import React, { useState } from 'react';

interface Reservation {
  id: string;
  date: string;
  guestName: string;
  partySize: number;
  time: string;
}

const MOCK_RESERVATIONS: Reservation[] = [
  { id: '1', date: '2024-01-15', guestName: 'John Smith', partySize: 4, time: '18:00' },
  { id: '2', date: '2024-01-15', guestName: 'Sarah Johnson', partySize: 2, time: '19:00' },
  { id: '3', date: '2024-01-15', guestName: 'Michael Brown', partySize: 6, time: '20:00' },
  { id: '4', date: '2024-01-16', guestName: 'Emily Davis', partySize: 3, time: '18:30' },
  { id: '5', date: '2024-01-15', guestName: 'Robert Wilson', partySize: 5, time: '19:30' },
  { id: '6', date: '2024-01-16', guestName: 'Jessica Martinez', partySize: 2, time: '20:00' },
  { id: '7', date: '2024-01-17', guestName: 'David Anderson', partySize: 4, time: '18:00' },
  { id: '8', date: '2024-01-15', guestName: 'Lisa Taylor', partySize: 3, time: '21:00' },
];

export default function CalculateThe() {
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-15');

  const calculateReservations = (date: string): number => {
    return MOCK_RESERVATIONS.filter(reservation => reservation.date === date).length;
  };

  const getReservationsForDate = (date: string): Reservation[] => {
    return MOCK_RESERVATIONS.filter(reservation => reservation.date === date);
  };

  const totalReservations = calculateReservations(selectedDate);
  const reservationsForDate = getReservationsForDate(selectedDate);
  const totalGuests = reservationsForDate.reduce((sum, res) => sum + res.partySize, 0);

  const availableDates = Array.from(
    new Set(MOCK_RESERVATIONS.map(r => r.date))
  ).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reservation Calculator</h1>
          <p className="text-gray-600">Calculate total reservations for a specific date</p>
        </div>

        {/* Date Selection Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Date
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-white text-gray-800 font-medium"
          >
            {availableDates.map(date => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </option>
            ))}
          </select>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Total Reservations</p>
            <p className="text-3xl font-bold text-indigo-600">{totalReservations}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Total Guests</p>
            <p className="text-3xl font-bold text-green-600">{totalGuests}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-medium mb-1">Average Party Size</p>
            <p className="text-3xl font-bold text-purple-600">
              {totalReservations > 0 ? (totalGuests / totalReservations).toFixed(1) : '0'}
            </p>
          </div>
        </div>

        {/* Reservations List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reservations for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h2>
          
          {reservationsForDate.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Guest Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Party Size</th>
                  </tr>
                </thead>
                <tbody>
                  {reservationsForDate.map((reservation, index) => (
                    <tr key={reservation.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="py-3 px-4 text-gray-800">{reservation.guestName}</td>
                      <td className="py-3 px-4 text-gray-800">{reservation.time}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                          {reservation.partySize} {reservation.partySize === 1 ? 'guest' : 'guests'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No reservations found for this date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}