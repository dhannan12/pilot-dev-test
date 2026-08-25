/**
 * UserInputsFamily — Allows users to input family member details for museum ticket purchase
 *
 * Features: dynamic family member form, ticket type selection, age-based pricing, add/remove members, purchase summary
 *
 * Ticket: SCRUM-1131 | Branch: proto/SCRUM-1127
 */

import React, { useState } from 'react'

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  ageRange: string
}

interface FamilyMember {
  id: string
  name: string
  age: number
  ticketType: string
}

const TICKET_TYPES: TicketType[] = [
  { id: 'adult', name: 'Adult', description: '18-64 years', price: 15, ageRange: '18-64' },
  { id: 'child', name: 'Child', description: '5-17 years', price: 8, ageRange: '5-17' },
  { id: 'senior', name: 'Senior', description: '65+ years', price: 12, ageRange: '65+' },
  { id: 'student', name: 'Student', description: 'With valid ID', price: 10, ageRange: '18+' },
  { id: 'infant', name: 'Infant', description: 'Under 5 years', price: 0, ageRange: '0-4' },
]

const MOCK_FAMILY_MEMBERS: FamilyMember[] = [
  { id: '1', name: 'John Smith', age: 42, ticketType: 'adult' },
  { id: '2', name: 'Mary Smith', age: 40, ticketType: 'adult' },
  { id: '3', name: 'Emma Smith', age: 15, ticketType: 'child' },
  { id: '4', name: 'Oliver Smith', age: 12, ticketType: 'child' },
  { id: '5', name: 'Grandma Rose', age: 68, ticketType: 'senior' },
]

export default function UserInputsFamily() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [currentName, setCurrentName] = useState('')
  const [currentAge, setCurrentAge] = useState('')
  const [currentTicketType, setCurrentTicketType] = useState('adult')
  const [showMockData, setShowMockData] = useState(false)

  const addFamilyMember = () => {
    if (!currentName.trim() || !currentAge) {
      return
    }

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: currentName.trim(),
      age: parseInt(currentAge),
      ticketType: currentTicketType,
    }

    setFamilyMembers([...familyMembers, newMember])
    setCurrentName('')
    setCurrentAge('')
    setCurrentTicketType('adult')
  }

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id))
  }

  const loadMockData = () => {
    setFamilyMembers(MOCK_FAMILY_MEMBERS)
    setShowMockData(true)
  }

  const clearAll = () => {
    setFamilyMembers([])
    setShowMockData(false)
  }

  const calculateTotal = () => {
    return familyMembers.reduce((total, member) => {
      const ticketType = TICKET_TYPES.find(t => t.id === member.ticketType)
      return total + (ticketType?.price || 0)
    }, 0)
  }

  const getTicketPrice = (ticketTypeId: string): number => {
    return TICKET_TYPES.find(t => t.id === ticketTypeId)?.price || 0
  }

  return (
    <div data-testid="userinputsfamily" className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Ticket Purchase</h1>
        <p className="text-gray-600">
          Enter details for each family member visiting the museum
        </p>
      </div>

      {/* Ticket Types Reference */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Ticket Types & Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TICKET_TYPES.map(ticket => (
            <div
              key={ticket.id}
              data-testid="userinputsfamily-ticket-info"
              className="p-3 bg-white rounded border border-gray-200"
            >
              <div className="font-semibold text-gray-900">{ticket.name}</div>
              <div className="text-sm text-gray-600">{ticket.description}</div>
              <div className="text-lg font-bold text-blue-600 mt-1">€{ticket.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Family Member Form */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Family Member</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              data-testid="userinputsfamily-name"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              id="age"
              type="number"
              data-testid="userinputsfamily-age"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              placeholder="Age"
              min="0"
              max="120"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Type
            </label>
            <select
              id="ticketType"
              data-testid="userinputsfamily-tickettype"
              value={currentTicketType}
              onChange={(e) => setCurrentTicketType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {TICKET_TYPES.map(ticket => (
                <option key={ticket.id} value={ticket.id}>
                  {ticket.name} - €{ticket.price}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            data-testid="userinputsfamily-add"
            onClick={addFamilyMember}
            disabled={!currentName.trim() || !currentAge}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Add Member
          </button>
          <button
            data-testid="userinputsfamily-loadmock"
            onClick={loadMockData}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Load Sample Family
          </button>
          <button
            data-testid="userinputsfamily-clear"
            onClick={clearAll}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Family Members List */}
      {familyMembers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Family Members ({familyMembers.length})
          </h2>
          
          <div data-testid="userinputsfamily-list" className="space-y-3">
            {familyMembers.map(member => {
              const ticketType = TICKET_TYPES.find(t => t.id === member.ticketType)
              return (
                <div
                  key={member.id}
                  data-testid="userinputsfamily-item"
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-600">
                          Age: {member.age} | {ticketType?.name} ({ticketType?.ageRange})
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          €{getTicketPrice(member.ticketType)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    data-testid="userinputsfamily-remove"
                    onClick={() => removeFamilyMember(member.id)}
                    className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Summary */}
      {familyMembers.length > 0 && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
              <p className="text-gray-600">Total members: {familyMembers.length}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Total Amount</div>
              <div className="text-3xl font-bold text-blue-600">€{calculateTotal()}</div>
            </div>
          </div>
          
          <button
            data-testid="userinputsfamily-submit"
            className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            Proceed to Payment
          </button>
        </div>
      )}

      {/* Empty State */}
      {familyMembers.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-400 text-lg mb-2">No family members added yet</div>
          <p className="text-gray-500">Add family members above to begin your purchase</p>
        </div>
      )}
    </div>
  )
}
