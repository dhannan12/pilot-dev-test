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
  { id: '5', date: '2024-01-16', guestName: 'Robert Wilson', partySize: 5, time: '19:30' },
  { id: '6', date: '2024-01-17', guestName: 'Jessica Martinez', partySize: 2, time: '17:00' },
  { id: '7', date: '2024-01-15', guestName: 'David Anderson', partySize: 4, time: '21:00' },
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
              {availableDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-indigo-50 rounded-lg p-6 border-2 border-indigo-200">
              <p className="text-gray-600 text-sm font-medium mb-2">Total Reservations</p>
              <p className="text-4xl font-bold text-indigo-600">{totalReservations}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
              <p className="text-gray-600 text-sm font-medium mb-2">Total Guests</p>
              <p className="text-4xl font-bold text-green-600">{totalGuests}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reservations for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h2>
            {reservationsForDate.length > 0 ? (
              <div className="space-y-3">
                {reservationsForDate.map((reservation) => (
                  <div key={reservation.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{reservation.guestName}</p>
                        <p className="text-sm text-gray-600">Party size: {reservation.partySize} guests</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-indigo-600">{reservation.time}</p>
                        <p className="text-xs text-gray-500">ID: {reservation.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No reservations for this date</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}