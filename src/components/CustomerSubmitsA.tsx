/**
 * CustomerSubmitsA — Rental request form for equipment rental platform
 *
 * Features: Equipment selection, date/time picker, customer details, quantity selection, form validation
 *
 * Ticket: SCRUM-915 | Branch: proto/SCRUM-914
 */

import { useState } from 'react'

interface Equipment {
  id: string
  name: string
  category: string
  dailyRate: number
}

interface RentalRequest {
  equipmentId: string
  customerName: string
  email: string
  phone: string
  startDate: string
  endDate: string
  quantity: number
  notes: string
}

const MOCK_EQUIPMENT: Equipment[] = [
  { id: 'eq1', name: 'Excavator CAT 320', category: 'Heavy Machinery', dailyRate: 450 },
  { id: 'eq2', name: 'Forklift Toyota 8FD25', category: 'Material Handling', dailyRate: 180 },
  { id: 'eq3', name: 'Generator 50kW', category: 'Power Equipment', dailyRate: 120 },
  { id: 'eq4', name: 'Scissor Lift 26ft', category: 'Aerial Equipment', dailyRate: 200 },
  { id: 'eq5', name: 'Concrete Mixer 350L', category: 'Construction Tools', dailyRate: 95 },
  { id: 'eq6', name: 'Compressor 185CFM', category: 'Air Tools', dailyRate: 110 },
  { id: 'eq7', name: 'Skid Steer Loader', category: 'Heavy Machinery', dailyRate: 320 }
]

export default function CustomerSubmitsA() {
  const [formData, setFormData] = useState<RentalRequest>({
    equipmentId: '',
    customerName: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    quantity: 1,
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.equipmentId) {
      newErrors.equipmentId = 'Please select equipment'
    }
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    } else if (formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = 'End date must be after start date'
    }
    if (formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
      console.log('Rental request submitted:', formData)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const selectedEquipment = MOCK_EQUIPMENT.find(eq => eq.id === formData.equipmentId)
  const calculateTotal = () => {
    if (!selectedEquipment || !formData.startDate || !formData.endDate) return 0
    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return days * selectedEquipment.dailyRate * formData.quantity
  }

  if (submitted) {
    return (
      <div data-testid="customersubmitsa" className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted!</h2>
            <p className="text-gray-600">
              Thank you, {formData.customerName}. Your rental request has been received.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Request Details</h3>
            <p className="text-sm text-gray-600">Equipment: {selectedEquipment?.name}</p>
            <p className="text-sm text-gray-600">Duration: {formData.startDate} to {formData.endDate}</p>
            <p className="text-sm text-gray-600">Quantity: {formData.quantity}</p>
            <p className="text-sm text-gray-600 font-semibold mt-2">
              Estimated Total: ${calculateTotal().toFixed(2)}
            </p>
          </div>
          <button
            data-testid="customersubmitsa-reset"
            onClick={() => {
              setSubmitted(false)
              setFormData({
                equipmentId: '',
                customerName: '',
                email: '',
                phone: '',
                startDate: '',
                endDate: '',
                quantity: 1,
                notes: ''
              })
            }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="customersubmitsa" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Equipment Rental Request</h1>
          <p className="text-gray-600 mb-6">Fill out the form below to request equipment rental</p>

          <form onSubmit={handleSubmit}>
            {/* Equipment Selection */}
            <div className="mb-6">
              <label htmlFor="equipmentId" className="block text-sm font-medium text-gray-700 mb-2">
                Select Equipment *
              </label>
              <select
                id="equipmentId"
                name="equipmentId"
                data-testid="customersubmitsa-equipment"
                value={formData.equipmentId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.equipmentId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Choose Equipment --</option>
                {MOCK_EQUIPMENT.map(equipment => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.name} - ${equipment.dailyRate}/day ({equipment.category})
                  </option>
                ))}
              </select>
              {errors.equipmentId && (
                <p className="mt-1 text-sm text-red-600">{errors.equipmentId}</p>
              )}
            </div>

            {/* Customer Name */}
            <div className="mb-6">
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                data-testid="customersubmitsa-name"
                value={formData.customerName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.customerName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
              )}
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="customersubmitsa-email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  data-testid="customersubmitsa-phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Rental Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  data-testid="customersubmitsa-startdate"
                  value={formData.startDate}
                  onChange={handleChange}
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
                  data-testid="customersubmitsa-enddate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                data-testid="customersubmitsa-quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
              )}
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                data-testid="customersubmitsa-notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special requirements or instructions..."
              />
            </div>

            {/* Price Estimate */}
            {selectedEquipment && formData.startDate && formData.endDate && (
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Estimated Total</h3>
                <p className="text-2xl font-bold text-blue-600">
                  ${calculateTotal().toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Based on {formData.quantity} unit(s) × {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s)
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="customersubmitsa-submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Submit Rental Request
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
