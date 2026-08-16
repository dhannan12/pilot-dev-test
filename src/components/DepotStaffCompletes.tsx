/**
 * DepotStaffCompletes — Equipment inspection checklist for depot staff
 *
 * Features: inspection form, equipment details, checklist items, condition assessment, photo upload sections
 *
 * Ticket: SCRUM-917 | Branch: proto/SCRUM-914
 */

import React, { useState } from 'react'

interface InspectionItem {
  id: string
  category: string
  checkpoints: string[]
}

interface Equipment {
  id: string
  name: string
  serialNumber: string
  type: string
}

const mockEquipment: Equipment[] = [
  { id: 'EQ001', name: 'Excavator CAT 320', serialNumber: 'SN-2024-001', type: 'Heavy Machinery' },
  { id: 'EQ002', name: 'Concrete Mixer', serialNumber: 'SN-2024-002', type: 'Mixing Equipment' },
  { id: 'EQ003', name: 'Scaffolding Set', serialNumber: 'SN-2024-003', type: 'Support Structure' },
  { id: 'EQ004', name: 'Forklift Toyota', serialNumber: 'SN-2024-004', type: 'Material Handling' },
  { id: 'EQ005', name: 'Generator 50kW', serialNumber: 'SN-2024-005', type: 'Power Supply' },
  { id: 'EQ006', name: 'Air Compressor', serialNumber: 'SN-2024-006', type: 'Pneumatic Tools' },
  { id: 'EQ007', name: 'Welding Machine', serialNumber: 'SN-2024-007', type: 'Fabrication' }
]

const inspectionChecklist: InspectionItem[] = [
  {
    id: 'CAT001',
    category: 'Physical Condition',
    checkpoints: [
      'Check for visible damage or dents',
      'Inspect for rust or corrosion',
      'Verify all parts are present',
      'Check paint condition',
      'Inspect for leaks or fluid stains'
    ]
  },
  {
    id: 'CAT002',
    category: 'Safety Features',
    checkpoints: [
      'Test emergency stop button',
      'Verify safety guards are intact',
      'Check warning labels and signs',
      'Inspect safety harness points',
      'Test alarm/horn functionality'
    ]
  },
  {
    id: 'CAT003',
    category: 'Operational Check',
    checkpoints: [
      'Test power on/off functionality',
      'Check all controls and switches',
      'Verify smooth operation of moving parts',
      'Test hydraulic/pneumatic systems',
      'Check fuel/battery levels'
    ]
  },
  {
    id: 'CAT004',
    category: 'Documentation',
    checkpoints: [
      'Verify serial number matches records',
      'Check maintenance log is up to date',
      'Confirm calibration certificates',
      'Review previous inspection notes',
      'Verify insurance documentation'
    ]
  },
  {
    id: 'CAT005',
    category: 'Cleanliness',
    checkpoints: [
      'Equipment is clean and free of debris',
      'All surfaces wiped down',
      'Interior compartments cleaned',
      'Filters checked and cleaned',
      'No oil or grease buildup'
    ]
  }
]

export default function DepotStaffCompletes() {
  const [selectedEquipment, setSelectedEquipment] = useState<string>('')
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [overallCondition, setOverallCondition] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [inspectorName, setInspectorName] = useState<string>('')

  const handleCheckboxChange = (categoryId: string, checkpointIndex: number) => {
    const key = `${categoryId}-${checkpointIndex}`
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Inspection submitted', {
      selectedEquipment,
      checkedItems,
      overallCondition,
      notes,
      inspectorName
    })
    alert('Equipment inspection checklist submitted successfully!')
  }

  const handleReset = () => {
    setSelectedEquipment('')
    setCheckedItems({})
    setOverallCondition('')
    setNotes('')
    setInspectorName('')
  }

  const totalCheckpoints = inspectionChecklist.reduce((sum, cat) => sum + cat.checkpoints.length, 0)
  const checkedCount = Object.values(checkedItems).filter(Boolean).length
  const completionPercentage = totalCheckpoints > 0 ? Math.round((checkedCount / totalCheckpoints) * 100) : 0

  return (
    <div data-testid="depotstaffcompletes" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipment Inspection Checklist</h1>
          <p className="text-gray-600">Complete the inspection checklist before equipment rental or return</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Equipment Selection */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Equipment Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="equipment-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Equipment *
                </label>
                <select
                  id="equipment-select"
                  data-testid="depotstaffcompletes-equipment"
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Select Equipment --</option>
                  {mockEquipment.map(eq => (
                    <option key={eq.id} value={eq.id}>
                      {eq.name} ({eq.serialNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="inspector-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Inspector Name *
                </label>
                <input
                  id="inspector-name"
                  type="text"
                  data-testid="depotstaffcompletes-inspector"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {selectedEquipment && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                {(() => {
                  const eq = mockEquipment.find(e => e.id === selectedEquipment)
                  return eq ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Equipment:</span>
                        <span className="ml-2 text-gray-900">{eq.name}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Serial #:</span>
                        <span className="ml-2 text-gray-900">{eq.serialNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Type:</span>
                        <span className="ml-2 text-gray-900">{eq.type}</span>
                      </div>
                    </div>
                  ) : null
                })()}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {selectedEquipment && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Inspection Progress</span>
                <span className="text-sm font-medium text-blue-600">{completionPercentage}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {checkedCount} of {totalCheckpoints} checkpoints completed
              </p>
            </div>
          )}

          {/* Inspection Checklist */}
          {selectedEquipment && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Inspection Checklist</h2>
              
              <div data-testid="depotstaffcompletes-list" className="space-y-6">
                {inspectionChecklist.map((category) => (
                  <div key={category.id} data-testid="depotstaffcompletes-item" className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm mr-2">
                        {category.id}
                      </span>
                      {category.category}
                    </h3>
                    
                    <div className="space-y-2 ml-4">
                      {category.checkpoints.map((checkpoint, index) => {
                        const key = `${category.id}-${index}`
                        return (
                          <label
                            key={key}
                            className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              data-testid={`depotstaffcompletes-checkpoint-${category.id}-${index}`}
                              checked={checkedItems[key] || false}
                              onChange={() => handleCheckboxChange(category.id, index)}
                              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className={`text-sm ${checkedItems[key] ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                              {checkpoint}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overall Condition Assessment */}
          {selectedEquipment && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Assessment</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Condition *
                </label>
                <div className="flex flex-wrap gap-3">
                  {['Excellent', 'Good', 'Fair', 'Poor', 'Needs Repair'].map((condition) => (
                    <label
                      key={condition}
                      className={`flex items-center px-4 py-2 border-2 rounded-lg cursor-pointer transition-all ${
                        overallCondition === condition
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        data-testid={`depotstaffcompletes-condition-${condition.toLowerCase().replace(' ', '-')}`}
                        name="condition"
                        value={condition}
                        checked={overallCondition === condition}
                        onChange={(e) => setOverallCondition(e.target.value)}
                        className="mr-2"
                        required
                      />
                      <span className="font-medium">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="inspection-notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Inspection Notes
                </label>
                <textarea
                  id="inspection-notes"
                  data-testid="depotstaffcompletes-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional observations, issues, or recommendations..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {selectedEquipment && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  type="button"
                  data-testid="depotstaffcompletes-reset"
                  onClick={handleReset}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition-colors"
                >
                  Reset Form
                </button>
                <button
                  type="button"
                  data-testid="depotstaffcompletes-save-draft"
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  data-testid="depotstaffcompletes-submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
                >
                  Submit Inspection
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Empty State */}
        {!selectedEquipment && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Equipment Selected</h3>
            <p className="text-gray-600">Please select equipment from the dropdown above to begin the inspection checklist</p>
          </div>
        )}
      </div>
    </div>
  )
}
