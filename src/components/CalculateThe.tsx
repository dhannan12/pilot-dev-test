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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reservation Calculator</h1>
          <p className="text-gray-600 mb-8">Calculate total reservations for a specific date</p>

          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 rounded">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-600 bg-white text-gray-800 font-medium"
            >
              {availableDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-md">
              <p className="text-sm font-semibold opacity-90 mb-2">Total Reservations</p>
              <p className="text-5xl font-bold">{totalReservations}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-md">
              <p className="text-sm font-semibold opacity-90 mb-2">Total Guests</p>
              <p className="text-5xl font-bold">{totalGuests}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-md">
              <p className="text-sm font-semibold opacity-90 mb-2">Avg Party Size</p>
              <p className="text-5xl font-bold">{totalReservations > 0 ? (totalGuests / totalReservations).toFixed(1) : '0'}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reservations for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</h2>
            {reservationsForDate.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Guest Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Party Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationsForDate.map((reservation, index) => (
                      <tr key={reservation.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="py-3 px-4 text-gray-800 font-medium">{reservation.guestName}</td>
                        <td className="py-3 px-4 text-gray-700">{reservation.time}</td>
                        <td className="py-3 px-4 text-gray-700 font-semibold">{reservation.partySize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No reservations found for this date</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}