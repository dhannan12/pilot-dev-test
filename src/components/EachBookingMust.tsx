/**
 * EachBookingMust — Displays bookings with status management (pending, confirmed, cancelled)
 *
 * Features: status filtering, visual status indicators, booking list display, status updates, booking details
 *
 * Ticket: SCRUM-1293 | Branch: proto/SCRUM-1288
 */

import React, { useState } from 'react'

type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

interface Booking {
  id: string
  customerName: string
  service: string
  date: string
  time: string
  status: BookingStatus
  stylist: string
  price: number
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BK001',
    customerName: 'Sarah Johnson',
    service: 'Haircut & Style',
    date: '2026-09-05',
    time: '10:00 AM',
    status: 'confirmed',
    stylist: 'Jessica Smith',
    price: 85
  },
  {
    id: 'BK002',
    customerName: 'Michael Chen',
    service: 'Color Treatment',
    date: '2026-09-05',
    time: '2:00 PM',
    status: 'pending',
    stylist: 'Emily Davis',
    price: 150
  },
  {
    id: 'BK003',
    customerName: 'Amanda Rodriguez',
    service: 'Manicure & Pedicure',
    date: '2026-09-06',
    time: '11:30 AM',
    status: 'confirmed',
    stylist: 'Lisa Brown',
    price: 65
  },
  {
    id: 'BK004',
    customerName: 'David Williams',
    service: 'Beard Trim',
    date: '2026-09-06',
    time: '3:00 PM',
    status: 'cancelled',
    stylist: 'Mark Taylor',
    price: 35
  },
  {
    id: 'BK005',
    customerName: 'Jennifer Martinez',
    service: 'Highlights & Blow Dry',
    date: '2026-09-07',
    time: '9:00 AM',
    status: 'pending',
    stylist: 'Jessica Smith',
    price: 180
  },
  {
    id: 'BK006',
    customerName: 'Robert Thompson',
    service: 'Haircut',
    date: '2026-09-07',
    time: '1:00 PM',
    status: 'confirmed',
    stylist: 'Mark Taylor',
    price: 45
  },
  {
    id: 'BK007',
    customerName: 'Lisa Anderson',
    service: 'Facial Treatment',
    date: '2026-09-08',
    time: '10:30 AM',
    status: 'cancelled',
    stylist: 'Emily Davis',
    price: 95
  },
  {
    id: 'BK008',
    customerName: 'James Wilson',
    service: 'Hair Styling',
    date: '2026-09-08',
    time: '4:00 PM',
    status: 'pending',
    stylist: 'Jessica Smith',
    price: 70
  }
]

export default function EachBookingMust() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS)
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all')

  const filteredBookings = filterStatus === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filterStatus)

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    )
  }

  const getStatusColor = (status: BookingStatus): string => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: BookingStatus): string => {
    switch (status) {
      case 'confirmed':
        return '✓'
      case 'pending':
        return '⏱'
      case 'cancelled':
        return '✗'
      default:
        return '•'
    }
  }

  const countByStatus = (status: BookingStatus) => 
    bookings.filter(b => b.status === status).length

  return (
    <div data-testid="eachbookingmust" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Management
          </h1>
          <p className="text-gray-600">
            Manage and track booking statuses: pending, confirmed, or cancelled
          </p>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Bookings</div>
            <div className="text-2xl font-bold text-gray-900">{bookings.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Confirmed</div>
            <div className="text-2xl font-bold text-green-600">{countByStatus('confirmed')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{countByStatus('pending')}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Cancelled</div>
            <div className="text-2xl font-bold text-red-600">{countByStatus('cancelled')}</div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
              Filter by Status:
            </label>
            <select
              id="status-filter"
              data-testid="eachbookingmust-status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as BookingStatus | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="text-sm text-gray-600 ml-auto">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div data-testid="eachbookingmust-list" className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No bookings found with the selected filter.</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                data-testid="eachbookingmust-item"
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.customerName}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        <span>{getStatusIcon(booking.status)}</span>
                        <span className="capitalize">{booking.status}</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Service:</span> {booking.service}
                      </div>
                      <div>
                        <span className="font-medium">Stylist:</span> {booking.stylist}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {booking.date}
                      </div>
                      <div>
                        <span className="font-medium">Time:</span> {booking.time}
                      </div>
                      <div>
                        <span className="font-medium">Booking ID:</span> {booking.id}
                      </div>
                      <div>
                        <span className="font-medium">Price:</span> ${booking.price}
                      </div>
                    </div>
                  </div>

                  {/* Status Update Actions */}
                  <div className="flex flex-col gap-2 md:w-48">
                    <label className="text-xs font-medium text-gray-600 mb-1">
                      Update Status:
                    </label>
                    <button
                      data-testid="eachbookingmust-confirm"
                      onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      disabled={booking.status === 'confirmed'}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      data-testid="eachbookingmust-pending"
                      onClick={() => updateBookingStatus(booking.id, 'pending')}
                      disabled={booking.status === 'pending'}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Set Pending
                    </button>
                    <button
                      data-testid="eachbookingmust-cancel"
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      disabled={booking.status === 'cancelled'}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Status Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('confirmed')}`}>
                ✓ Confirmed
              </span>
              <span className="text-gray-600">Booking is confirmed and scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('pending')}`}>
                ⏱ Pending
              </span>
              <span className="text-gray-600">Awaiting confirmation or payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor('cancelled')}`}>
                ✗ Cancelled
              </span>
              <span className="text-gray-600">Booking has been cancelled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
