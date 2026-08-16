/**
 * CalculateDamageCharges — Calculate and display damage charges for returned equipment
 *
 * Features: damage assessment form, severity-based pricing, itemized charge calculation, approval workflow, charge summary
 *
 * Ticket: SCRUM-918 | Branch: proto/SCRUM-914
 */

import { useState } from 'react'

interface DamageType {
  id: string
  name: string
  baseCost: number
  severity: 'minor' | 'moderate' | 'severe'
}

interface EquipmentReturn {
  id: string
  equipmentName: string
  rentalId: string
  customerName: string
  returnDate: string
  status: 'pending' | 'assessed' | 'approved'
}

interface DamageCharge {
  id: string
  damageType: string
  severity: 'minor' | 'moderate' | 'severe'
  cost: number
  notes: string
}

const DAMAGE_TYPES: DamageType[] = [
  { id: '1', name: 'Scratches', baseCost: 50, severity: 'minor' },
  { id: '2', name: 'Dents', baseCost: 150, severity: 'moderate' },
  { id: '3', name: 'Broken Parts', baseCost: 300, severity: 'severe' },
  { id: '4', name: 'Missing Components', baseCost: 200, severity: 'moderate' },
  { id: '5', name: 'Structural Damage', baseCost: 500, severity: 'severe' },
  { id: '6', name: 'Surface Wear', baseCost: 30, severity: 'minor' },
  { id: '7', name: 'Hydraulic Leak', baseCost: 400, severity: 'severe' },
  { id: '8', name: 'Tire Damage', baseCost: 180, severity: 'moderate' },
]

const MOCK_RETURNS: EquipmentReturn[] = [
  {
    id: 'RET-001',
    equipmentName: 'Excavator CAT 320',
    rentalId: 'RNT-1234',
    customerName: 'ABC Construction Co.',
    returnDate: '2026-08-15',
    status: 'pending',
  },
  {
    id: 'RET-002',
    equipmentName: 'Forklift Toyota 8FD25',
    rentalId: 'RNT-1235',
    customerName: 'BuildRight Inc.',
    returnDate: '2026-08-14',
    status: 'assessed',
  },
  {
    id: 'RET-003',
    equipmentName: 'Bulldozer Komatsu D65',
    rentalId: 'RNT-1236',
    customerName: 'MegaBuild LLC',
    returnDate: '2026-08-13',
    status: 'pending',
  },
  {
    id: 'RET-004',
    equipmentName: 'Crane Liebherr LTM 1060',
    rentalId: 'RNT-1237',
    customerName: 'SkyHigh Construction',
    returnDate: '2026-08-12',
    status: 'approved',
  },
  {
    id: 'RET-005',
    equipmentName: 'Loader Volvo L90H',
    rentalId: 'RNT-1238',
    customerName: 'UrbanDev Projects',
    returnDate: '2026-08-16',
    status: 'pending',
  },
]

export default function CalculateDamageCharges() {
  const [selectedReturn, setSelectedReturn] = useState<EquipmentReturn | null>(null)
  const [damageCharges, setDamageCharges] = useState<DamageCharge[]>([])
  const [selectedDamageType, setSelectedDamageType] = useState<string>('')
  const [damageNotes, setDamageNotes] = useState<string>('')
  const [showCalculation, setShowCalculation] = useState<boolean>(false)

  const handleSelectReturn = (returnItem: EquipmentReturn) => {
    setSelectedReturn(returnItem)
    setDamageCharges([])
    setShowCalculation(false)
  }

  const handleAddDamage = () => {
    if (!selectedDamageType || !selectedReturn) return

    const damageType = DAMAGE_TYPES.find((dt) => dt.id === selectedDamageType)
    if (!damageType) return

    const newCharge: DamageCharge = {
      id: `CHG-${Date.now()}`,
      damageType: damageType.name,
      severity: damageType.severity,
      cost: damageType.baseCost,
      notes: damageNotes || 'No additional notes',
    }

    setDamageCharges([...damageCharges, newCharge])
    setSelectedDamageType('')
    setDamageNotes('')
  }

  const handleRemoveDamage = (id: string) => {
    setDamageCharges(damageCharges.filter((charge) => charge.id !== id))
  }

  const calculateTotal = (): number => {
    return damageCharges.reduce((sum, charge) => sum + charge.cost, 0)
  }

  const handleCalculate = () => {
    if (damageCharges.length > 0) {
      setShowCalculation(true)
    }
  }

  const handleApprove = () => {
    if (selectedReturn) {
      alert(
        `Damage charges of $${calculateTotal()} approved for ${selectedReturn.equipmentName} (${selectedReturn.rentalId})`
      )
      setSelectedReturn(null)
      setDamageCharges([])
      setShowCalculation(false)
    }
  }

  const handleReset = () => {
    setDamageCharges([])
    setShowCalculation(false)
    setSelectedDamageType('')
    setDamageNotes('')
  }

  const getSeverityColor = (severity: 'minor' | 'moderate' | 'severe'): string => {
    switch (severity) {
      case 'minor':
        return 'bg-yellow-100 text-yellow-800'
      case 'moderate':
        return 'bg-orange-100 text-orange-800'
      case 'severe':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="calculate-damage-charges" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Calculate Damage Charges</h1>
          <p className="text-gray-600 mt-2">
            Assess equipment damage and calculate charges for returned rentals
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Equipment Returns List */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipment Returns</h2>
            <div data-testid="calculate-damage-charges-list" className="space-y-3">
              {MOCK_RETURNS.map((returnItem) => (
                <div
                  key={returnItem.id}
                  data-testid="calculate-damage-charges-item"
                  className={`p-4 border rounded-lg cursor-pointer transition ${
                    selectedReturn?.id === returnItem.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectReturn(returnItem)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{returnItem.equipmentName}</h3>
                      <p className="text-sm text-gray-600">Rental ID: {returnItem.rentalId}</p>
                      <p className="text-sm text-gray-600">Customer: {returnItem.customerName}</p>
                      <p className="text-sm text-gray-500">Returned: {returnItem.returnDate}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        returnItem.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : returnItem.status === 'assessed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {returnItem.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Damage Assessment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Damage Assessment</h2>

            {!selectedReturn ? (
              <div className="text-center py-12 text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p>Select an equipment return to begin damage assessment</p>
              </div>
            ) : (
              <div>
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">{selectedReturn.equipmentName}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedReturn.customerName} | {selectedReturn.rentalId}
                  </p>
                </div>

                {/* Add Damage Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label
                      htmlFor="damage-type-select"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Damage Type
                    </label>
                    <select
                      id="damage-type-select"
                      data-testid="calculate-damage-charges-damage-type"
                      value={selectedDamageType}
                      onChange={(e) => setSelectedDamageType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select damage type...</option>
                      {DAMAGE_TYPES.map((dt) => (
                        <option key={dt.id} value={dt.id}>
                          {dt.name} - ${dt.baseCost} ({dt.severity})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="damage-notes"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Notes
                    </label>
                    <textarea
                      id="damage-notes"
                      data-testid="calculate-damage-charges-notes"
                      value={damageNotes}
                      onChange={(e) => setDamageNotes(e.target.value)}
                      placeholder="Add notes about the damage..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    data-testid="calculate-damage-charges-add"
                    onClick={handleAddDamage}
                    disabled={!selectedDamageType}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                  >
                    Add Damage Charge
                  </button>
                </div>

                {/* Damage Charges List */}
                {damageCharges.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Damage Items</h3>
                    <div className="space-y-2">
                      {damageCharges.map((charge) => (
                        <div
                          key={charge.id}
                          className="flex justify-between items-start p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{charge.damageType}</span>
                              <span
                                className={`px-2 py-0.5 text-xs font-semibold rounded ${getSeverityColor(
                                  charge.severity
                                )}`}
                              >
                                {charge.severity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{charge.notes}</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">
                              ${charge.cost.toFixed(2)}
                            </p>
                          </div>
                          <button
                            data-testid="calculate-damage-charges-remove"
                            onClick={() => handleRemoveDamage(charge.id)}
                            className="text-red-600 hover:text-red-800 ml-2"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {damageCharges.length > 0 && (
                  <div className="space-y-3">
                    <button
                      data-testid="calculate-damage-charges-calculate"
                      onClick={handleCalculate}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                    >
                      Calculate Total Charges
                    </button>

                    {showCalculation && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-semibold text-gray-800">
                            Total Damage Charges:
                          </span>
                          <span className="text-2xl font-bold text-blue-600">
                            ${calculateTotal().toFixed(2)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          <p>Number of damage items: {damageCharges.length}</p>
                          <p>
                            Minor: {damageCharges.filter((c) => c.severity === 'minor').length} |
                            Moderate: {damageCharges.filter((c) => c.severity === 'moderate').length}{' '}
                            | Severe: {damageCharges.filter((c) => c.severity === 'severe').length}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            data-testid="calculate-damage-charges-approve"
                            onClick={handleApprove}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                          >
                            Approve & Submit
                          </button>
                          <button
                            data-testid="calculate-damage-charges-reset"
                            onClick={handleReset}
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Returns</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{MOCK_RETURNS.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Pending Assessment</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {MOCK_RETURNS.filter((r) => r.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Assessed</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {MOCK_RETURNS.filter((r) => r.status === 'assessed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Approved</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {MOCK_RETURNS.filter((r) => r.status === 'approved').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
