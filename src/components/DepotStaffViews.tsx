/**
 * DepotStaffViews — Current bookings dashboard for depot staff
 *
 * Features: booking list, status filters, customer details, equipment info, date range display
 *
 * Ticket: SCRUM-921 | Branch: proto/SCRUM-914
 */

import React, { useState } from 'react'

interface Booking {
  id: string
  bookingNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  equipmentName: string
  equipmentId: string
  startDate: string
  endDate: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  totalAmount: number
  depositPaid: boolean
  pickupLocation: string
  returnLocation: string
  notes: string
}

const mockBookings: Booking[] = [
  {
    id: 'BK001',
    bookingNumber: 'BK-2024-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    customerPhone: '+1-555-0101',
    equipmentName: 'Excavator CAT 320',
    equipmentId: 'EQ001',
    startDate: '2024-08-20',
    endDate: '2024-08-25',
    status: 'confirmed',
    totalAmount: 2500.00,
    depositPaid: true,
    pickupLocation: 'Main Depot - Bay 3',
    returnLocation: 'Main Depot - Bay 3',
    notes: 'Customer requires delivery to site'
  },
  {
    id: 'BK002',
    bookingNumber: 'BK-2024-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@construction.com',
    customerPhone: '+1-555-0102',
    equipmentName: 'Concrete Mixer',
    equipmentId: 'EQ002',
    startDate: '2024-08-18',
    endDate: '2024-08-22',
    status: 'in-progress',
    totalAmount: 850.00,
    depositPaid: true,
    pickupLocation: 'Main Depot - Bay 1',
    returnLocation: 'Main Depot - Bay 1',
    notes: 'Equipment picked up on time'
  },
  {
    id: 'BK003',
    bookingNumber: 'BK-2024-003',
    customerName: 'Michael Brown',
    customerEmail: 'mbrown@builders.com',
    customerPhone: '+1-555-0103',
    equipmentName: 'Scaffolding Set',
    equipmentId: 'EQ003',
    startDate: '2024-08-22',
    endDate: '2024-09-05',
    status: 'pending',
    totalAmount: 1200.00,
    depositPaid: false,
    pickupLocation: 'North Depot - Section A',
    returnLocation: 'North Depot - Section A',
    notes: 'Awaiting deposit payment confirmation'
  },
  {
    id: 'BK004',
    bookingNumber: 'BK-2024-004',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@renovations.com',
    customerPhone: '+1-555-0104',
    equipmentName: 'Forklift Toyota',
    equipmentId: 'EQ004',
    startDate: '2024-08-15',
    endDate: '2024-08-19',
    status: 'in-progress',
    totalAmount: 1800.00,
    depositPaid: true,
    pickupLocation: 'Main Depot - Bay 5',
    returnLocation: 'Main Depot - Bay 5',
    notes: 'Extended rental - original end date was 08/17'
  },
  {
    id: 'BK005',
    bookingNumber: 'BK-2024-005',
    customerName: 'Robert Wilson',
    customerEmail: 'rwilson@infrastructure.com',
    customerPhone: '+1-555-0105',
    equipmentName: 'Generator 50kW',
    equipmentId: 'EQ005',
    startDate: '2024-08-21',
    endDate: '2024-08-28',
    status: 'confirmed',
    totalAmount: 950.00,
    depositPaid: true,
    pickupLocation: 'South Depot - Area B',
    returnLocation: 'South Depot - Area B',
    notes: 'Customer will arrange own transportation'
  },
  {
    id: 'BK006',
    bookingNumber: 'BK-2024-006',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.a@projects.com',
    customerPhone: '+1-555-0106',
    equipmentName: 'Air Compressor',
    equipmentId: 'EQ006',
    startDate: '2024-08-16',
    endDate: '2024-08-20',
    status: 'in-progress',
    totalAmount: 600.00,
    depositPaid: true,
    pickupLocation: 'Main Depot - Bay 2',
    returnLocation: 'Main Depot - Bay 2',
    notes: 'Regular customer - preferred rates applied'
  },
  {
    id: 'BK007',
    bookingNumber: 'BK-2024-007',
    customerName: 'David Martinez',
    customerEmail: 'dmartinez@contractors.com',
    customerPhone: '+1-555-0107',
    equipmentName: 'Welding Machine',
    equipmentId: 'EQ007',
    startDate: '2024-08-23',
    endDate: '2024-08-30',
    status: 'confirmed',
    totalAmount: 750.00,
    depositPaid: true,
    pickupLocation: 'Main Depot - Bay 4',
    returnLocation: 'Main Depot - Bay 4',
    notes: 'Includes gas cylinders and safety equipment'
  },
  {
    id: 'BK008',
    bookingNumber: 'BK-2024-008',
    customerName: 'Jennifer Taylor',
    customerEmail: 'jtaylor@development.com',
    customerPhone: '+1-555-0108',
    equipmentName: 'Excavator CAT 320',
    equipmentId: 'EQ001',
    startDate: '2024-08-12',
    endDate: '2024-08-16',
    status: 'completed',
    totalAmount: 2200.00,
    depositPaid: true,
    pickupLocation: 'Main Depot - Bay 3',
    returnLocation: 'Main Depot - Bay 3',
    notes: 'Returned in excellent condition'
  }
]

export default function DepotStaffViews() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const filteredBookings = mockBookings.filter(booking => {
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus
    const matchesSearch = 
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.equipmentName.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'in-progress':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusBadge = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const bookingStats = {
    total: mockBookings.length,
    pending: mockBookings.filter(b => b.status === 'pending').length,
    confirmed: mockBookings.filter(b => b.status === 'confirmed').length,
    inProgress: mockBookings.filter(b => b.status === 'in-progress').length,
    completed: mockBookings.filter(b => b.status === 'completed').length
  }

  return (
    <div data-testid="depotstaffviews" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Current Bookings</h1>
          <p className="text-gray-600">View and manage all equipment rental bookings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">Total Bookings</div>
            <div className="text-2xl font-bold text-gray-900">{bookingStats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-700">{bookingStats.pending}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-600">
            <div className="text-sm text-gray-600 mb-1">Confirmed</div>
            <div className="text-2xl font-bold text-blue-700">{bookingStats.confirmed}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-1">In Progress</div>
            <div className="text-2xl font-bold text-green-700">{bookingStats.inProgress}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-2xl font-bold text-gray-700">{bookingStats.completed}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Bookings
              </label>
              <input
                id="search"
                type="text"
                data-testid="depotstaffviews-search"
                placeholder="Search by booking number, customer, or equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:w-64">
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="status-filter"
                data-testid="depotstaffviews-status-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            Showing {filteredBookings.length} of {mockBookings.length} bookings
          </div>
        </div>

        {/* Bookings List */}
        <div data-testid="depotstaffviews-list" className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">No bookings found matching your criteria</p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                data-testid="depotstaffviews-item"
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left Section - Main Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {booking.bookingNumber}
                          </h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                            {getStatusBadge(booking.status)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Customer Details */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer</h4>
                          <p className="text-sm text-gray-900 font-medium">{booking.customerName}</p>
                          <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                          <p className="text-sm text-gray-600">{booking.customerPhone}</p>
                        </div>

                        {/* Equipment Details */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Equipment</h4>
                          <p className="text-sm text-gray-900 font-medium">{booking.equipmentName}</p>
                          <p className="text-sm text-gray-600">ID: {booking.equipmentId}</p>
                        </div>
                      </div>

                      {/* Rental Period */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Rental Period</h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="text-gray-900">{formatDate(booking.startDate)}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-gray-900">{formatDate(booking.endDate)}</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {calculateDuration(booking.startDate, booking.endDate)} days
                          </span>
                        </div>
                      </div>

                      {/* Location Info */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Locations</h4>
                        <div className="text-sm text-gray-600">
                          <p><span className="font-medium">Pickup:</span> {booking.pickupLocation}</p>
                          <p><span className="font-medium">Return:</span> {booking.returnLocation}</p>
                        </div>
                      </div>

                      {/* Notes */}
                      {booking.notes && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Notes</h4>
                          <p className="text-sm text-gray-600 italic">{booking.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Section - Financial & Actions */}
                    <div className="lg:w-64 space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Financial</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Amount</span>
                            <span className="text-lg font-bold text-gray-900">
                              {formatCurrency(booking.totalAmount)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Deposit</span>
                            <span className={`text-sm font-medium ${booking.depositPaid ? 'text-green-600' : 'text-red-600'}`}>
                              {booking.depositPaid ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          data-testid="depotstaffviews-view-details"
                          onClick={() => setSelectedBooking(booking)}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                        >
                          View Details
                        </button>
                        <button
                          data-testid="depotstaffviews-edit"
                          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
                        >
                          Edit Booking
                        </button>
                        {booking.status === 'pending' && (
                          <button
                            data-testid="depotstaffviews-confirm"
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for Booking Details */}
        {selectedBooking && (
          <div
            data-testid="depotstaffviews-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBooking(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                  <button
                    data-testid="depotstaffviews-close-modal"
                    onClick={() => setSelectedBooking(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Booking Number</p>
                      <p className="font-semibold text-gray-900">{selectedBooking.bookingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Status</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedBooking.status)}`}>
                        {getStatusBadge(selectedBooking.status)}
                      </span>
                    </div>
                  </div>

                  <div className="pb-4 border-b">
                    <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Name:</span> <span className="text-gray-900">{selectedBooking.customerName}</span></p>
                      <p><span className="text-gray-600">Email:</span> <span className="text-gray-900">{selectedBooking.customerEmail}</span></p>
                      <p><span className="text-gray-600">Phone:</span> <span className="text-gray-900">{selectedBooking.customerPhone}</span></p>
                    </div>
                  </div>

                  <div className="pb-4 border-b">
                    <h3 className="font-semibold text-gray-900 mb-2">Equipment Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Name:</span> <span className="text-gray-900">{selectedBooking.equipmentName}</span></p>
                      <p><span className="text-gray-600">Equipment ID:</span> <span className="text-gray-900">{selectedBooking.equipmentId}</span></p>
                    </div>
                  </div>

                  <div className="pb-4 border-b">
                    <h3 className="font-semibold text-gray-900 mb-2">Rental Period</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Start Date:</span> <span className="text-gray-900">{formatDate(selectedBooking.startDate)}</span></p>
                      <p><span className="text-gray-600">End Date:</span> <span className="text-gray-900">{formatDate(selectedBooking.endDate)}</span></p>
                      <p><span className="text-gray-600">Duration:</span> <span className="text-gray-900">{calculateDuration(selectedBooking.startDate, selectedBooking.endDate)} days</span></p>
                    </div>
                  </div>

                  <div className="pb-4 border-b">
                    <h3 className="font-semibold text-gray-900 mb-2">Location Details</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Pickup:</span> <span className="text-gray-900">{selectedBooking.pickupLocation}</span></p>
                      <p><span className="text-gray-600">Return:</span> <span className="text-gray-900">{selectedBooking.returnLocation}</span></p>
                    </div>
                  </div>

                  <div className="pb-4 border-b">
                    <h3 className="font-semibold text-gray-900 mb-2">Financial Details</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Total Amount:</span> <span className="text-gray-900 font-semibold">{formatCurrency(selectedBooking.totalAmount)}</span></p>
                      <p><span className="text-gray-600">Deposit Status:</span> <span className={`font-medium ${selectedBooking.depositPaid ? 'text-green-600' : 'text-red-600'}`}>{selectedBooking.depositPaid ? 'Paid' : 'Pending'}</span></p>
                    </div>
                  </div>

                  {selectedBooking.notes && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Additional Notes</h3>
                      <p className="text-sm text-gray-600 italic">{selectedBooking.notes}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    data-testid="depotstaffviews-print"
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    Print Details
                  </button>
                  <button
                    data-testid="depotstaffviews-close"
                    onClick={() => setSelectedBooking(null)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
