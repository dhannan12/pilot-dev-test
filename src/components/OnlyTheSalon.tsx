/**
 * OnlyTheSalon — Role-based booking management where only salon owners can confirm/cancel bookings
 *
 * Features: role selection, booking list display, owner-only confirm/cancel actions, status badges, permission enforcement
 *
 * Ticket: SCRUM-1291 | Branch: proto/SCRUM-1288
 */

import React, { useState } from 'react'

type UserRole = 'owner' | 'customer' | 'stylist'

type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

interface Booking {
  id: number
  customerName: string
  service: string
  stylist: string
  date: string
  time: string
  status: BookingStatus
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1,
    customerName: 'Sarah Johnson',
    service: 'Haircut & Style',
    stylist: 'Emma Watson',
    date: '2026-09-05',
    time: '10:00 AM',
    status: 'pending'
  },
  {
    id: 2,
    customerName: 'Michael Chen',
    service: 'Color Treatment',
    stylist: 'Olivia Martinez',
    date: '2026-09-05',
    time: '2:00 PM',
    status: 'confirmed'
  },
  {
    id: 3,
    customerName: 'Emily Rodriguez',
    service: 'Manicure',
    stylist: 'Sophia Lee',
    date: '2026-09-06',
    time: '11:30 AM',
    status: 'pending'
  },
  {
    id: 4,
    customerName: 'David Kim',
    service: 'Beard Trim',
    stylist: 'Emma Watson',
    date: '2026-09-06',
    time: '3:00 PM',
    status: 'cancelled'
  },
  {
    id: 5,
    customerName: 'Jessica Brown',
    service: 'Full Spa Package',
    stylist: 'Olivia Martinez',
    date: '2026-09-07',
    time: '9:00 AM',
    status: 'pending'
  },
  {
    id: 6,
    customerName: 'Robert Taylor',
    service: 'Facial Treatment',
    stylist: 'Sophia Lee',
    date: '2026-09-07',
    time: '1:00 PM',
    status: 'confirmed'
  }
]

export default function OnlyTheSalon() {
  const [userRole, setUserRole] = useState<UserRole>('customer')
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS)
  const [message, setMessage] = useState<string>('')

  const handleConfirm = (bookingId: number) => {
    if (userRole !== 'owner') {
      setMessage('❌ Access denied: Only salon owners can confirm bookings')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'confirmed' as BookingStatus }
          : booking
      )
    )
    setMessage('✓ Booking confirmed successfully')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleCancel = (bookingId: number) => {
    if (userRole !== 'owner') {
      setMessage('❌ Access denied: Only salon owners can cancel bookings')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' as BookingStatus }
          : booking
      )
    )
    setMessage('✓ Booking cancelled successfully')
    setTimeout(() => setMessage(''), 3000)
  }

  const getStatusColor = (status: BookingStatus): string => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section data-testid="onlythesalon" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Management System
          </h1>
          <p className="text-gray-600">
            Only salon owners can confirm or cancel bookings
          </p>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select Your Role
          </h2>
          <div className="flex gap-4">
            <button
              data-testid="onlythesalon-role-owner"
              onClick={() => setUserRole('owner')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                userRole === 'owner'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Salon Owner
            </button>
            <button
              data-testid="onlythesalon-role-customer"
              onClick={() => setUserRole('customer')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                userRole === 'customer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Customer
            </button>
            <button
              data-testid="onlythesalon-role-stylist"
              onClick={() => setUserRole('stylist')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                userRole === 'stylist'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Stylist
            </button>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Current Role:</strong>{' '}
              <span className="capitalize font-semibold">{userRole}</span>
              {userRole === 'owner' && ' (Full Access)'}
              {userRole !== 'owner' && ' (View Only)'}
            </p>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            data-testid="onlythesalon-message"
            className={`mb-6 p-4 rounded-lg ${
              message.includes('denied')
                ? 'bg-red-50 text-red-800'
                : 'bg-green-50 text-green-800'
            }`}
          >
            {message}
          </div>
        )}

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Bookings
          </h2>
          <div data-testid="onlythesalon-list" className="space-y-4">
            {bookings.map(booking => (
              <div
                key={booking.id}
                data-testid="onlythesalon-item"
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.customerName}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Service:</span>{' '}
                        {booking.service}
                      </div>
                      <div>
                        <span className="font-medium">Stylist:</span>{' '}
                        {booking.stylist}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span>{' '}
                        {booking.date}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span>{' '}
                        {booking.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          data-testid="onlythesalon-confirm"
                          onClick={() => handleConfirm(booking.id)}
                          disabled={userRole !== 'owner'}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            userRole === 'owner'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Confirm
                        </button>
                        <button
                          data-testid="onlythesalon-cancel"
                          onClick={() => handleCancel(booking.id)}
                          disabled={userRole !== 'owner'}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            userRole === 'owner'
                              ? 'bg-red-600 text-white hover:bg-red-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status !== 'pending' && (
                      <div className="px-4 py-2 text-sm text-gray-500 italic">
                        {booking.status === 'confirmed'
                          ? 'Booking confirmed'
                          : 'Booking cancelled'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permission Info */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-2">
            ℹ️ Permission Information
          </h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li>
              • <strong>Salon Owner:</strong> Can confirm and cancel all
              bookings
            </li>
            <li>
              • <strong>Customer:</strong> Can view bookings but cannot change
              status
            </li>
            <li>
              • <strong>Stylist:</strong> Can view bookings but cannot change
              status
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
