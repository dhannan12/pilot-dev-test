/**
 * CalculateRentalDuration — Calculate rental duration from start and end dates
 *
 * Features: date range selection, automatic duration calculation, rental cost estimation, equipment selection, duration display
 *
 * Ticket: SCRUM-922 | Branch: proto/SCRUM-914
 */

import { useState } from 'react'

interface Equipment {
  id: string
  name: string
  category: string
  dailyRate: number
  available: boolean
}

interface RentalRequest {
  id: string
  equipmentId: string
  equipmentName: string
  startDate: string
  endDate: string
  duration: number
  dailyRate: number
  totalCost: number
  status: string
}

const MOCK_EQUIPMENT: Equipment[] = [
  { id: 'eq1', name: 'Excavator CAT 320', category: 'Heavy Machinery', dailyRate: 450, available: true },
  { id: 'eq2', name: 'Concrete Mixer', category: 'Construction', dailyRate: 85, available: true },
  { id: 'eq3', name: 'Scaffolding Set', category: 'Safety', dailyRate: 120, available: true },
  { id: 'eq4', name: 'Generator 50kW', category: 'Power', dailyRate: 200, available: true },
  { id: 'eq5', name: 'Forklift Toyota', category: 'Material Handling', dailyRate: 350, available: false },
  { id: 'eq6', name: 'Pneumatic Drill', category: 'Tools', dailyRate: 65, available: true },
  { id: 'eq7', name: 'Welding Machine', category: 'Tools', dailyRate: 95, available: true }
]

const MOCK_RENTAL_REQUESTS: RentalRequest[] = [
  {
    id: 'rr1',
    equipmentId: 'eq1',
    equipmentName: 'Excavator CAT 320',
    startDate: '2026-08-18',
    endDate: '2026-08-25',
    duration: 7,
    dailyRate: 450,
    totalCost: 3150,
    status: 'Pending'
  },
  {
    id: 'rr2',
    equipmentId: 'eq2',
    equipmentName: 'Concrete Mixer',
    startDate: '2026-08-20',
    endDate: '2026-08-27',
    duration: 7,
    dailyRate: 85,
    totalCost: 595,
    status: 'Approved'
  },
  {
    id: 'rr3',
    equipmentId: 'eq3',
    equipmentName: 'Scaffolding Set',
    startDate: '2026-08-16',
    endDate: '2026-09-15',
    duration: 30,
    dailyRate: 120,
    totalCost: 3600,
    status: 'Active'
  },
  {
    id: 'rr4',
    equipmentId: 'eq4',
    equipmentName: 'Generator 50kW',
    startDate: '2026-08-22',
    endDate: '2026-08-29',
    duration: 7,
    dailyRate: 200,
    totalCost: 1400,
    status: 'Pending'
  },
  {
    id: 'rr5',
    equipmentId: 'eq6',
    equipmentName: 'Pneumatic Drill',
    startDate: '2026-08-19',
    endDate: '2026-08-23',
    duration: 4,
    dailyRate: 65,
    totalCost: 260,
    status: 'Completed'
  }
]

export default function CalculateRentalDuration() {
  const [selectedEquipment, setSelectedEquipment] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>(MOCK_RENTAL_REQUESTS)

  const calculateDuration = (start: string, end: string): number => {
    if (!start || !end) return 0
    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()
    const diffTime = endTime - startTime
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const duration = calculateDuration(startDate, endDate)
  const selectedEquipmentData = MOCK_EQUIPMENT.find(eq => eq.id === selectedEquipment)
  const totalCost = selectedEquipmentData ? duration * selectedEquipmentData.dailyRate : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEquipment || !startDate || !endDate || duration <= 0) {
      alert('Please fill all fields with valid dates')
      return
    }

    const equipment = MOCK_EQUIPMENT.find(eq => eq.id === selectedEquipment)
    if (!equipment) return

    const newRequest: RentalRequest = {
      id: `rr${rentalRequests.length + 1}`,
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      startDate,
      endDate,
      duration,
      dailyRate: equipment.dailyRate,
      totalCost,
      status: 'Pending'
    }

    setRentalRequests([newRequest, ...rentalRequests])
    setSelectedEquipment('')
    setStartDate('')
    setEndDate('')
  }

  const handleReset = () => {
    setSelectedEquipment('')
    setStartDate('')
    setEndDate('')
  }

  return (
    <div data-testid="calculaterentalduration" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Calculate Rental Duration</h1>
          <p className="text-gray-600 mt-2">Submit equipment rental requests and calculate rental duration</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rental Request Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">New Rental Request</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-2">
                    Equipment
                  </label>
                  <select
                    id="equipment"
                    data-testid="calculaterentalduration-equipment"
                    value={selectedEquipment}
                    onChange={(e) => setSelectedEquipment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select equipment</option>
                    {MOCK_EQUIPMENT.filter(eq => eq.available).map(equipment => (
                      <option key={equipment.id} value={equipment.id}>
                        {equipment.name} - ${equipment.dailyRate}/day
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    data-testid="calculaterentalduration-startdate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    data-testid="calculaterentalduration-enddate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Duration Calculation Display */}
                {startDate && endDate && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="text-sm text-gray-700">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Duration:</span>
                        <span className="font-bold text-blue-600">{duration} days</span>
                      </div>
                      {selectedEquipmentData && (
                        <>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Daily Rate:</span>
                            <span>${selectedEquipmentData.dailyRate}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-blue-300">
                            <span className="font-bold">Total Cost:</span>
                            <span className="font-bold text-blue-600">${totalCost}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    data-testid="calculaterentalduration-submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    data-testid="calculaterentalduration-reset"
                    onClick={handleReset}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Equipment Availability */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Equipment Availability</h3>
              <ul data-testid="calculaterentalduration-equipment-list" className="space-y-2">
                {MOCK_EQUIPMENT.map(equipment => (
                  <li
                    key={equipment.id}
                    data-testid="calculaterentalduration-equipment-item"
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{equipment.name}</div>
                      <div className="text-xs text-gray-600">{equipment.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">${equipment.dailyRate}/day</div>
                      <div className={`text-xs ${equipment.available ? 'text-green-600' : 'text-red-600'}`}>
                        {equipment.available ? 'Available' : 'Unavailable'}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rental Requests List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Rental Requests</h2>
              <div data-testid="calculaterentalduration-list" className="space-y-4">
                {rentalRequests.map(request => (
                  <div
                    key={request.id}
                    data-testid="calculaterentalduration-item"
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{request.equipmentName}</h3>
                        <span
                          className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${
                            request.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : request.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : request.status === 'Active'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{request.duration} days</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Start Date:</span>
                        <div className="font-medium text-gray-900">{request.startDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">End Date:</span>
                        <div className="font-medium text-gray-900">{request.endDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Daily Rate:</span>
                        <div className="font-medium text-gray-900">${request.dailyRate}/day</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Cost:</span>
                        <div className="font-bold text-gray-900">${request.totalCost}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
