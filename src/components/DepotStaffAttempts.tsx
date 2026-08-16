/**
 * DepotStaffAttempts — Depot staff booking modification interface
 *
 * Features: Booking search, modification form, date/equipment updates, status tracking, audit trail
 *
 * Ticket: SCRUM-916 | Branch: proto/SCRUM-914
 */

import { useState } from 'react'

interface Booking {
  id: string
  bookingNumber: string
  customerName: string
  email: string
  phone: string
  equipment: string
  startDate: string
  endDate: string
  quantity: number
  status: 'pending' | 'confirmed' | 'active' | 'completed'
  totalAmount: number
  notes: string
}

interface ModificationLog {
  timestamp: string
  field: string
  oldValue: string
  newValue: string
  staffMember: string
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk1',
    bookingNumber: 'RNT-2026-001',
    customerName: 'John Anderson',
    email: 'john.anderson@construction.com',
    phone: '(555) 123-4567',
    equipment: 'Excavator CAT 320',
    startDate: '2026-08-20',
    endDate: '2026-08-25',
    quantity: 1,
    status: 'confirmed',
    totalAmount: 2250.00,
    notes: 'Delivery required to downtown site'
  },
  {
    id: 'bk2',
    bookingNumber: 'RNT-2026-002',
    customerName: 'Sarah Mitchell',
    email: 'sarah.mitchell@builders.com',
    phone: '(555) 234-5678',
    equipment: 'Forklift Toyota 8FD25',
    startDate: '2026-08-18',
    endDate: '2026-08-22',
    quantity: 2,
    status: 'active',
    totalAmount: 1800.00,
    notes: 'Standard pickup'
  },
  {
    id: 'bk3',
    bookingNumber: 'RNT-2026-003',
    customerName: 'Mike Roberts',
    email: 'mike.roberts@renovations.com',
    phone: '(555) 345-6789',
    equipment: 'Generator 50kW',
    startDate: '2026-08-22',
    endDate: '2026-08-28',
    quantity: 1,
    status: 'pending',
    totalAmount: 840.00,
    notes: 'Emergency backup power needed'
  },
  {
    id: 'bk4',
    bookingNumber: 'RNT-2026-004',
    customerName: 'Emily Chen',
    email: 'emily.chen@infrastructure.com',
    phone: '(555) 456-7890',
    equipment: 'Scissor Lift 26ft',
    startDate: '2026-08-19',
    endDate: '2026-08-23',
    quantity: 3,
    status: 'confirmed',
    totalAmount: 3000.00,
    notes: 'Safety inspection required before use'
  },
  {
    id: 'bk5',
    bookingNumber: 'RNT-2026-005',
    customerName: 'David Thompson',
    email: 'david.thompson@concrete.com',
    phone: '(555) 567-8901',
    equipment: 'Concrete Mixer 350L',
    startDate: '2026-08-21',
    endDate: '2026-08-26',
    quantity: 2,
    status: 'confirmed',
    totalAmount: 1140.00,
    notes: 'Weekend rental discount applied'
  },
  {
    id: 'bk6',
    bookingNumber: 'RNT-2026-006',
    customerName: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@demolition.com',
    phone: '(555) 678-9012',
    equipment: 'Skid Steer Loader',
    startDate: '2026-08-24',
    endDate: '2026-08-30',
    quantity: 1,
    status: 'pending',
    totalAmount: 2240.00,
    notes: 'Operator certification needed'
  }
]

const EQUIPMENT_OPTIONS = [
  'Excavator CAT 320',
  'Forklift Toyota 8FD25',
  'Generator 50kW',
  'Scissor Lift 26ft',
  'Concrete Mixer 350L',
  'Compressor 185CFM',
  'Skid Steer Loader'
]

const STATUS_OPTIONS: Array<Booking['status']> = ['pending', 'confirmed', 'active', 'completed']

export default function DepotStaffAttempts() {
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [modifiedBooking, setModifiedBooking] = useState<Booking | null>(null)
  const [modificationLogs, setModificationLogs] = useState<ModificationLog[]>([])
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const filteredBookings = bookings.filter(booking =>
    booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setModifiedBooking({ ...booking })
    setSaveSuccess(false)
    setErrors({})
  }

  const handleModificationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!modifiedBooking) return

    const { name, value } = e.target
    setModifiedBooking(prev => {
      if (!prev) return null
      return {
        ...prev,
        [name]: name === 'quantity' || name === 'totalAmount' ? parseFloat(value) || 0 : value
      }
    })

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const validateModification = (): boolean => {
    if (!modifiedBooking) return false

    const newErrors: Record<string, string> = {}

    if (!modifiedBooking.customerName.trim()) {
      newErrors.customerName = 'Customer name is required'
    }
    if (!modifiedBooking.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modifiedBooking.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!modifiedBooking.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    if (!modifiedBooking.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!modifiedBooking.endDate) {
      newErrors.endDate = 'End date is required'
    } else if (modifiedBooking.startDate && modifiedBooking.endDate < modifiedBooking.startDate) {
      newErrors.endDate = 'End date must be after start date'
    }
    if (modifiedBooking.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1'
    }
    if (modifiedBooking.totalAmount < 0) {
      newErrors.totalAmount = 'Total amount must be positive'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveModification = () => {
    if (!selectedBooking || !modifiedBooking) return

    if (!validateModification()) return

    const logs: ModificationLog[] = []
    const timestamp = new Date().toISOString()
    const staffMember = 'Staff Member #1234'

    // Track all changes
    if (selectedBooking.customerName !== modifiedBooking.customerName) {
      logs.push({
        timestamp,
        field: 'Customer Name',
        oldValue: selectedBooking.customerName,
        newValue: modifiedBooking.customerName,
        staffMember
      })
    }
    if (selectedBooking.email !== modifiedBooking.email) {
      logs.push({
        timestamp,
        field: 'Email',
        oldValue: selectedBooking.email,
        newValue: modifiedBooking.email,
        staffMember
      })
    }
    if (selectedBooking.phone !== modifiedBooking.phone) {
      logs.push({
        timestamp,
        field: 'Phone',
        oldValue: selectedBooking.phone,
        newValue: modifiedBooking.phone,
        staffMember
      })
    }
    if (selectedBooking.equipment !== modifiedBooking.equipment) {
      logs.push({
        timestamp,
        field: 'Equipment',
        oldValue: selectedBooking.equipment,
        newValue: modifiedBooking.equipment,
        staffMember
      })
    }
    if (selectedBooking.startDate !== modifiedBooking.startDate) {
      logs.push({
        timestamp,
        field: 'Start Date',
        oldValue: selectedBooking.startDate,
        newValue: modifiedBooking.startDate,
        staffMember
      })
    }
    if (selectedBooking.endDate !== modifiedBooking.endDate) {
      logs.push({
        timestamp,
        field: 'End Date',
        oldValue: selectedBooking.endDate,
        newValue: modifiedBooking.endDate,
        staffMember
      })
    }
    if (selectedBooking.quantity !== modifiedBooking.quantity) {
      logs.push({
        timestamp,
        field: 'Quantity',
        oldValue: String(selectedBooking.quantity),
        newValue: String(modifiedBooking.quantity),
        staffMember
      })
    }
    if (selectedBooking.status !== modifiedBooking.status) {
      logs.push({
        timestamp,
        field: 'Status',
        oldValue: selectedBooking.status,
        newValue: modifiedBooking.status,
        staffMember
      })
    }
    if (selectedBooking.totalAmount !== modifiedBooking.totalAmount) {
      logs.push({
        timestamp,
        field: 'Total Amount',
        oldValue: `$${selectedBooking.totalAmount.toFixed(2)}`,
        newValue: `$${modifiedBooking.totalAmount.toFixed(2)}`,
        staffMember
      })
    }
    if (selectedBooking.notes !== modifiedBooking.notes) {
      logs.push({
        timestamp,
        field: 'Notes',
        oldValue: selectedBooking.notes,
        newValue: modifiedBooking.notes,
        staffMember
      })
    }

    setModificationLogs(prev => [...logs, ...prev])
    setSaveSuccess(true)
    console.log('Booking modified:', modifiedBooking)
    console.log('Modification logs:', logs)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="depotstaffattempts" className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Depot Staff - Booking Modifications</h1>
          <p className="text-gray-600 mb-6">Search and modify existing bookings</p>

          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Bookings
            </label>
            <input
              type="text"
              id="search"
              data-testid="depotstaffattempts-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by booking number, customer name, or equipment..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Bookings List */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Bookings</h2>
            <div data-testid="depotstaffattempts-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBookings.map(booking => (
                <div
                  key={booking.id}
                  data-testid="depotstaffattempts-item"
                  onClick={() => handleSelectBooking(booking)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedBooking?.id === booking.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{booking.bookingNumber}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{booking.customerName}</p>
                  <p className="text-sm text-gray-600">{booking.equipment}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {booking.startDate} to {booking.endDate}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mt-2">
                    ${booking.totalAmount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            {filteredBookings.length === 0 && (
              <p className="text-gray-500 text-center py-8">No bookings found matching your search.</p>
            )}
          </div>
        </div>

        {/* Modification Form */}
        {selectedBooking && modifiedBooking && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Modify Booking: {selectedBooking.bookingNumber}
              </h2>
              <button
                data-testid="depotstaffattempts-cancel"
                onClick={() => {
                  setSelectedBooking(null)
                  setModifiedBooking(null)
                  setSaveSuccess(false)
                  setErrors({})
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕ Close
              </button>
            </div>

            {saveSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-800 font-semibold">
                    Booking successfully modified! Changes have been logged.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSaveModification(); }}>
              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      data-testid="depotstaffattempts-customername"
                      value={modifiedBooking.customerName}
                      onChange={handleModificationChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.customerName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      data-testid="depotstaffattempts-email"
                      value={modifiedBooking.email}
                      onChange={handleModificationChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  data-testid="depotstaffattempts-phone"
                  value={modifiedBooking.phone}
                  onChange={handleModificationChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Booking Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment *
                    </label>
                    <select
                      id="equipment"
                      name="equipment"
                      data-testid="depotstaffattempts-equipment"
                      value={modifiedBooking.equipment}
                      onChange={handleModificationChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {EQUIPMENT_OPTIONS.map(eq => (
                        <option key={eq} value={eq}>{eq}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      id="status"
                      name="status"
                      data-testid="depotstaffattempts-status"
                      value={modifiedBooking.status}
                      onChange={handleModificationChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Rental Dates */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Rental Period</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      data-testid="depotstaffattempts-startdate"
                      value={modifiedBooking.startDate}
                      onChange={handleModificationChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.startDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      data-testid="depotstaffattempts-enddate"
                      value={modifiedBooking.endDate}
                      onChange={handleModificationChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.endDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity and Amount */}
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      data-testid="depotstaffattempts-quantity"
                      value={modifiedBooking.quantity}
                      onChange={handleModificationChange}
                      min="1"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.quantity ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.quantity && (
                      <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-2">
                      Total Amount ($) *
                    </label>
                    <input
                      type="number"
                      id="totalAmount"
                      name="totalAmount"
                      data-testid="depotstaffattempts-totalamount"
                      value={modifiedBooking.totalAmount}
                      onChange={handleModificationChange}
                      step="0.01"
                      min="0"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.totalAmount ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.totalAmount && (
                      <p className="mt-1 text-sm text-red-600">{errors.totalAmount}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  data-testid="depotstaffattempts-notes"
                  value={modifiedBooking.notes}
                  onChange={handleModificationChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional notes or special instructions..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  data-testid="depotstaffattempts-submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Save Modifications
                </button>
                <button
                  type="button"
                  data-testid="depotstaffattempts-reset"
                  onClick={() => setModifiedBooking({ ...selectedBooking })}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset Changes
                </button>
              </div>
            </form>

            {/* Modification Logs */}
            {modificationLogs.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Modification History</h3>
                <div data-testid="depotstaffattempts-logs" className="space-y-3">
                  {modificationLogs.slice(0, 10).map((log, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 text-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-800">{log.field} Modified</span>
                        <span className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        <span className="line-through text-red-600">{log.oldValue}</span>
                        {' → '}
                        <span className="text-green-600 font-semibold">{log.newValue}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        By: {log.staffMember}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
