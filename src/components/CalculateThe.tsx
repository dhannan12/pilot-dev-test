import React, { useState } from 'react';

interface Reservation {
  id: string;
  date: string;
  guestName: string;
  time: string;
}

const MOCK_RESERVATIONS: Reservation[] = [
  { id: '1', date: '2024-01-15', guestName: 'John Doe', time: '18:00' },
  { id: '2', date: '2024-01-15', guestName: 'Jane Smith', time: '19:00' },
  { id: '3', date: '2024-01-15', guestName: 'Bob Johnson', time: '20:00' },
  { id: '4', date: '2024-01-16', guestName: 'Alice Williams', time: '18:30' },
  { id: '5', date: '2024-01-16', guestName: 'Charlie Brown', time: '19:30' },
  { id: '6', date: '2024-01-17', guestName: 'Diana Prince', time: '17:00' },
  { id: '7', date: '2024-01-15', guestName: 'Eve Davis', time: '21:00' },
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
  const allDates = Array.from(new Set(MOCK_RESERVATIONS.map(r => r.date))).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reservation Calculator</h1>
          <p className="text-gray-600 mb-8">Calculate total reservations for a specific date</p>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-white text-gray-800 font-medium"
            >
              {allDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg p-8 mb-8 text-white">
            <p className="text-lg font-semibold mb-2">Total Reservations</p>
            <p className="text-5xl font-bold">{totalReservations}</p>
            <p className="text-indigo-100 mt-2">for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reservations Details</h2>
            {reservationsForDate.length > 0 ? (
              <div className="space-y-3">
                {reservationsForDate.map((reservation, index) => (
                  <div
                    key={reservation.id}
                    className="bg-white border-l-4 border-indigo-500 p-4 rounded flex justify-between items-center hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{reservation.guestName}</p>
                      <p className="text-sm text-gray-600">Reservation #{index + 1}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-indigo-600">{reservation.time}</p>
                      <p className="text-xs text-gray-500">Check-in time</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No reservations found for this date</p>
            )}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Summary:</span> There are <span className="font-bold text-lg text-blue-600">{totalReservations}</span> reservation(s) scheduled for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}