import React, { useState } from 'react';

const MOCK_RESERVATIONS = [
  { id: 1, date: '2024-01-15', guestName: 'John Doe', time: '18:00' },
  { id: 2, date: '2024-01-15', guestName: 'Jane Smith', time: '19:00' },
  { id: 3, date: '2024-01-15', guestName: 'Bob Johnson', time: '20:00' },
  { id: 4, date: '2024-01-16', guestName: 'Alice Brown', time: '18:30' },
  { id: 5, date: '2024-01-16', guestName: 'Charlie Wilson', time: '19:30' },
  { id: 6, date: '2024-01-17', guestName: 'Diana Prince', time: '17:00' },
  { id: 7, date: '2024-01-15', guestName: 'Eve Davis', time: '21:00' },
];

export default function CalculateThe() {
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-15');

  const calculateReservations = (date: string): number => {
    return MOCK_RESERVATIONS.filter(reservation => reservation.date === date).length;
  };

  const totalReservations = calculateReservations(selectedDate);
  const reservationsForDate = MOCK_RESERVATIONS.filter(r => r.date === selectedDate);
  const uniqueDates = Array.from(new Set(MOCK_RESERVATIONS.map(r => r.date))).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reservation Calculator</h1>
          <p className="text-gray-600">Calculate total reservations for a specific date</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Date Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-white text-gray-800 font-medium"
            >
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </option>
              ))}
            </select>
          </div>

          {/* Total Count Display */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg p-8 mb-8 text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">Total Reservations</p>
            <p className="text-5xl font-bold">{totalReservations}</p>
            <p className="text-sm opacity-75 mt-2">
              for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Reservations List */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Reservations Details</h2>
            {reservationsForDate.length > 0 ? (
              <div className="space-y-3">
                {reservationsForDate.map((reservation, index) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{reservation.guestName}</p>
                        <p className="text-sm text-gray-500">{reservation.time}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      Confirmed
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">No reservations for this date</p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-600 text-sm font-medium mb-1">Total Dates</p>
            <p className="text-2xl font-bold text-indigo-600">{uniqueDates.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-600 text-sm font-medium mb-1">All Reservations</p>
            <p className="text-2xl font-bold text-indigo-600">{MOCK_RESERVATIONS.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-600 text-sm font-medium mb-1">Selected Date</p>
            <p className="text-2xl font-bold text-indigo-600">{totalReservations}</p>
          </div>
        </div>
      </div>
    </div>
  );
}