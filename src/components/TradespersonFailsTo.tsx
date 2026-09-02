/**
 * TradespersonFailsTo — Displays overdue quote requests from tradespersons who haven't responded within 24 hours
 *
 * Features: overdue quote tracking, elapsed time display, reminder actions, alternative tradesperson search, request cancellation
 *
 * Ticket: SCRUM-1284 | Branch: proto/SCRUM-1277
 */

import React, { useState } from 'react'

interface OverdueQuote {
  id: string
  jobTitle: string
  tradespersonName: string
  tradespersonType: string
  requestedAt: string
  hoursElapsed: number
  customerName: string
  jobDescription: string
  urgency: 'low' | 'medium' | 'high'
}

const MOCK_OVERDUE_QUOTES: OverdueQuote[] = [
  {
    id: 'OQ001',
    jobTitle: 'Kitchen Renovation',
    tradespersonName: 'Mike Johnson',
    tradespersonType: 'Carpenter',
    requestedAt: '2026-09-01 09:00',
    hoursElapsed: 30,
    customerName: 'Sarah Williams',
    jobDescription: 'Complete kitchen cabinet installation and countertop fitting',
    urgency: 'high'
  },
  {
    id: 'OQ002',
    jobTitle: 'Bathroom Plumbing Repair',
    tradespersonName: 'David Chen',
    tradespersonType: 'Plumber',
    requestedAt: '2026-09-01 11:30',
    hoursElapsed: 27,
    customerName: 'James Martinez',
    jobDescription: 'Fix leaking pipes and install new bathroom fixtures',
    urgency: 'high'
  },
  {
    id: 'OQ003',
    jobTitle: 'Electrical Panel Upgrade',
    tradespersonName: 'Emma Thompson',
    tradespersonType: 'Electrician',
    requestedAt: '2026-09-01 14:00',
    hoursElapsed: 25,
    customerName: 'Robert Brown',
    jobDescription: 'Upgrade main electrical panel to 200 amp service',
    urgency: 'medium'
  },
  {
    id: 'OQ004',
    jobTitle: 'Roof Leak Repair',
    tradespersonName: 'Carlos Rodriguez',
    tradespersonType: 'Roofer',
    requestedAt: '2026-09-01 16:30',
    hoursElapsed: 22,
    customerName: 'Lisa Anderson',
    jobDescription: 'Locate and repair roof leak in master bedroom area',
    urgency: 'high'
  },
  {
    id: 'OQ005',
    jobTitle: 'HVAC System Maintenance',
    tradespersonName: 'Patricia Davis',
    tradespersonType: 'HVAC Technician',
    requestedAt: '2026-09-01 10:00',
    hoursElapsed: 29,
    customerName: 'Michael Taylor',
    jobDescription: 'Annual HVAC system inspection and cleaning',
    urgency: 'low'
  },
  {
    id: 'OQ006',
    jobTitle: 'Fence Installation',
    tradespersonName: 'Tom Wilson',
    tradespersonType: 'Fence Contractor',
    requestedAt: '2026-09-01 13:00',
    hoursElapsed: 26,
    customerName: 'Jennifer Lee',
    jobDescription: 'Install 150 feet of vinyl privacy fencing',
    urgency: 'low'
  },
  {
    id: 'OQ007',
    jobTitle: 'Painting Interior Walls',
    tradespersonName: 'Amanda White',
    tradespersonType: 'Painter',
    requestedAt: '2026-09-01 15:00',
    hoursElapsed: 24,
    customerName: 'Christopher Garcia',
    jobDescription: 'Paint three bedrooms and living room walls',
    urgency: 'medium'
  }
]

export default function TradespersonFailsTo() {
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  const filteredQuotes = filter === 'all' 
    ? MOCK_OVERDUE_QUOTES 
    : MOCK_OVERDUE_QUOTES.filter(q => q.urgency === filter)

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const handleSendReminder = (quoteId: string) => {
    console.log(`Sending reminder for quote ${quoteId}`)
    alert(`Reminder sent to tradesperson for quote ${quoteId}`)
  }

  const handleFindAlternative = (quoteId: string) => {
    console.log(`Finding alternative tradesperson for quote ${quoteId}`)
    alert(`Searching for alternative tradesperson for quote ${quoteId}`)
  }

  const handleCancelRequest = (quoteId: string) => {
    console.log(`Canceling quote request ${quoteId}`)
    alert(`Quote request ${quoteId} has been cancelled`)
  }

  return (
    <div data-testid="tradespersonfailsto" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Overdue Quote Requests
          </h1>
          <p className="text-gray-600">
            Tradespersons who haven't provided quotes within 24 hours
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="urgency-filter" className="font-medium text-gray-700">
              Filter by Urgency:
            </label>
            <select
              id="urgency-filter"
              data-testid="tradespersonfailsto-urgency-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Urgencies</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <span className="ml-auto text-sm text-gray-600">
              {filteredQuotes.length} overdue {filteredQuotes.length === 1 ? 'quote' : 'quotes'}
            </span>
          </div>
        </div>

        {/* Overdue Quotes List */}
        <div data-testid="tradespersonfailsto-list" className="space-y-4">
          {filteredQuotes.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 text-lg">No overdue quotes found for this filter</p>
            </div>
          ) : (
            filteredQuotes.map((quote) => (
              <div
                key={quote.id}
                data-testid="tradespersonfailsto-item"
                className={`bg-white rounded-lg shadow-sm p-6 border-l-4 transition-all ${
                  selectedQuoteId === quote.id ? 'ring-2 ring-blue-500' : ''
                } ${
                  quote.urgency === 'high' ? 'border-red-500' :
                  quote.urgency === 'medium' ? 'border-yellow-500' :
                  'border-green-500'
                }`}
                onClick={() => setSelectedQuoteId(quote.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {quote.jobTitle}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(quote.urgency)}`}>
                        {quote.urgency.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Customer:</span> {quote.customerName}
                    </p>
                    <p className="text-gray-600 mb-3">
                      {quote.jobDescription}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tradesperson</p>
                    <p className="font-medium text-gray-900">{quote.tradespersonName}</p>
                    <p className="text-sm text-gray-600">{quote.tradespersonType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Quote Requested</p>
                    <p className="font-medium text-gray-900">{quote.requestedAt}</p>
                    <p className="text-sm font-semibold text-red-600">
                      {quote.hoursElapsed} hours ago (Overdue by {quote.hoursElapsed - 24} hours)
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    data-testid="tradespersonfailsto-send-reminder"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSendReminder(quote.id)
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Send Reminder
                  </button>
                  <button
                    data-testid="tradespersonfailsto-find-alternative"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFindAlternative(quote.id)
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Find Alternative
                  </button>
                  <button
                    data-testid="tradespersonfailsto-cancel-request"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCancelRequest(quote.id)
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600 font-medium mb-1">High Urgency</p>
            <p className="text-2xl font-bold text-red-900">
              {MOCK_OVERDUE_QUOTES.filter(q => q.urgency === 'high').length}
            </p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-medium mb-1">Medium Urgency</p>
            <p className="text-2xl font-bold text-yellow-900">
              {MOCK_OVERDUE_QUOTES.filter(q => q.urgency === 'medium').length}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium mb-1">Low Urgency</p>
            <p className="text-2xl font-bold text-green-900">
              {MOCK_OVERDUE_QUOTES.filter(q => q.urgency === 'low').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
