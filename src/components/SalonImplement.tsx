import React, { useState } from 'react'

interface PromotionalOffer {
  id: string
  name: string
  description: string
  discountPercentage: number
  startDate: string
  endDate: string
  status: 'active' | 'upcoming' | 'expired'
  applicableServices: string[]
}

const MOCK_OFFERS: PromotionalOffer[] = [
  {
    id: '1',
    name: 'Summer Hair Special',
    description: '20% off all haircuts and styling services',
    discountPercentage: 20,
    startDate: '2026-07-01',
    endDate: '2026-08-31',
    status: 'active',
    applicableServices: ['Haircut', 'Styling', 'Blow Dry']
  },
  {
    id: '2',
    name: 'Bridal Package Discount',
    description: '15% off bridal hair and makeup packages',
    discountPercentage: 15,
    startDate: '2026-08-01',
    endDate: '2026-12-31',
    status: 'active',
    applicableServices: ['Bridal Hair', 'Bridal Makeup', 'Trial Session']
  },
  {
    id: '3',
    name: 'New Client Welcome',
    description: '25% off your first visit to our salon',
    discountPercentage: 25,
    startDate: '2026-06-01',
    endDate: '2026-09-30',
    status: 'active',
    applicableServices: ['All Services']
  },
  {
    id: '4',
    name: 'Fall Color Promotion',
    description: '10% off all hair coloring services',
    discountPercentage: 10,
    startDate: '2026-09-01',
    endDate: '2026-11-30',
    status: 'upcoming',
    applicableServices: ['Hair Coloring', 'Highlights', 'Balayage']
  },
  {
    id: '5',
    name: 'Spring Refresh Special',
    description: '30% off keratin treatments',
    discountPercentage: 30,
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    status: 'expired',
    applicableServices: ['Keratin Treatment', 'Hair Smoothing']
  },
  {
    id: '6',
    name: 'Weekend Special',
    description: '15% off all services booked on Saturdays',
    discountPercentage: 15,
    startDate: '2026-07-15',
    endDate: '2026-12-31',
    status: 'active',
    applicableServices: ['All Services']
  },
  {
    id: '7',
    name: 'Holiday Glam Package',
    description: '20% off styling for holiday parties',
    discountPercentage: 20,
    startDate: '2026-12-01',
    endDate: '2026-12-31',
    status: 'upcoming',
    applicableServices: ['Styling', 'Updo', 'Makeup']
  }
]

export default function SalonImplement() {
  const [offers, setOffers] = useState<PromotionalOffer[]>(MOCK_OFFERS)
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'upcoming' | 'expired'>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newOffer, setNewOffer] = useState({
    name: '',
    description: '',
    discountPercentage: 0,
    startDate: '',
    endDate: '',
    applicableServices: ''
  })

  const filteredOffers = selectedTab === 'all' 
    ? offers 
    : offers.filter(offer => offer.status === selectedTab)

  const handleCreateOffer = () => {
    if (!newOffer.name || !newOffer.startDate || !newOffer.endDate) {
      alert('Please fill in all required fields')
      return
    }

    const today = new Date().toISOString().split('T')[0]
    const start = newOffer.startDate
    const end = newOffer.endDate

    let status: 'active' | 'upcoming' | 'expired' = 'upcoming'
    if (start <= today && end >= today) {
      status = 'active'
    } else if (end < today) {
      status = 'expired'
    }

    const offer: PromotionalOffer = {
      id: (offers.length + 1).toString(),
      name: newOffer.name,
      description: newOffer.description,
      discountPercentage: newOffer.discountPercentage,
      startDate: newOffer.startDate,
      endDate: newOffer.endDate,
      status,
      applicableServices: newOffer.applicableServices.split(',').map(s => s.trim()).filter(s => s)
    }

    setOffers([...offers, offer])
    setNewOffer({
      name: '',
      description: '',
      discountPercentage: 0,
      startDate: '',
      endDate: '',
      applicableServices: ''
    })
    setShowCreateForm(false)
  }

  const handleDeleteOffer = (id: string) => {
    setOffers(offers.filter(offer => offer.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Promotional Offers Management
          </h1>
          <p className="text-gray-600">
            Create and manage promotional offers for your salon. All offers must have a start and end date.
          </p>
        </div>

        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Offers ({offers.length})
            </button>
            <button
              onClick={() => setSelectedTab('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'active'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Active ({offers.filter(o => o.status === 'active').length})
            </button>
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'upcoming'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Upcoming ({offers.filter(o => o.status === 'upcoming').length})
            </button>
            <button
              onClick={() => setSelectedTab('expired')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTab === 'expired'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Expired ({offers.filter(o => o.status === 'expired').length})
            </button>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            {showCreateForm ? 'Cancel' : '+ Create New Offer'}
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Create New Promotional Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Name *
                </label>
                <input
                  type="text"
                  value={newOffer.name}
                  onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Summer Special"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percentage *
                </label>
                <input
                  type="number"
                  value={newOffer.discountPercentage}
                  onChange={(e) => setNewOffer({ ...newOffer, discountPercentage: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 20"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={newOffer.startDate}
                  onChange={(e) => setNewOffer({ ...newOffer, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  value={newOffer.endDate}
                  onChange={(e) => setNewOffer({ ...newOffer, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={2}
                  placeholder="Describe the promotional offer"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Applicable Services (comma-separated)
                </label>
                <input
                  type="text"
                  value={newOffer.applicableServices}
                  onChange={(e) => setNewOffer({ ...newOffer, applicableServices: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Haircut, Coloring, Styling"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCreateOffer}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Create Offer
              </button>
            </div>
          </div>
        )}

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{offer.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                  {offer.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Discount:</span>
                  <span className="text-lg font-bold text-purple-600">{offer.discountPercentage}% OFF</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Start:</span>
                  <span className="text-gray-900 font-medium">{formatDate(offer.startDate)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">End:</span>
                  <span className="text-gray-900 font-medium">{formatDate(offer.endDate)}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-1">Applicable Services:</p>
                <div className="flex flex-wrap gap-1">
                  {offer.applicableServices.map((service, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleDeleteOffer(offer.id)}
                className="w-full py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete Offer
              </button>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No {selectedTab !== 'all' ? selectedTab : ''} offers found.</p>
            <p className="text-gray-400 text-sm mt-2">Create your first promotional offer to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
