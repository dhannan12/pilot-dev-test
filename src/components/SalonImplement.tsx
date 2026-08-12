import { useState } from 'react'

interface PromotionalOffer {
  id: string
  title: string
  description: string
  discountPercent: number
  validFrom: string
  validUntil: string
  status: 'active' | 'inactive' | 'scheduled'
  applicableServices: string[]
}

const MOCK_OFFERS: PromotionalOffer[] = [
  {
    id: '1',
    title: 'Summer Special - 20% Off',
    description: 'Get 20% off on all haircuts during summer season',
    discountPercent: 20,
    validFrom: '2026-06-01',
    validUntil: '2026-08-31',
    status: 'active',
    applicableServices: ['Haircut', 'Styling']
  },
  {
    id: '2',
    title: 'New Client Welcome',
    description: 'First time clients get 15% off their first service',
    discountPercent: 15,
    validFrom: '2026-01-01',
    validUntil: '2026-12-31',
    status: 'active',
    applicableServices: ['All Services']
  },
  {
    id: '3',
    title: 'Color Treatment Package',
    description: 'Special package deal on color treatments',
    discountPercent: 25,
    validFrom: '2026-09-01',
    validUntil: '2026-09-30',
    status: 'scheduled',
    applicableServices: ['Coloring', 'Highlights']
  },
  {
    id: '4',
    title: 'Weekend Warrior',
    description: 'Saturday and Sunday appointments get 10% off',
    discountPercent: 10,
    validFrom: '2026-07-01',
    validUntil: '2026-07-31',
    status: 'inactive',
    applicableServices: ['Haircut', 'Styling', 'Coloring']
  },
  {
    id: '5',
    title: 'Loyalty Bonus',
    description: 'Returning clients with 5+ bookings get 30% off',
    discountPercent: 30,
    validFrom: '2026-01-01',
    validUntil: '2026-12-31',
    status: 'active',
    applicableServices: ['All Services']
  }
]

const SERVICE_OPTIONS = [
  'All Services',
  'Haircut',
  'Styling',
  'Coloring',
  'Highlights',
  'Treatment',
  'Wash & Blow-dry'
]

export default function SalonImplement() {
  const [offers, setOffers] = useState<PromotionalOffer[]>(MOCK_OFFERS)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountPercent: 10,
    validFrom: '',
    validUntil: '',
    applicableServices: [] as string[]
  })

  const handleCreateOffer = () => {
    if (!formData.title || !formData.validFrom || !formData.validUntil) {
      alert('Please fill in all required fields')
      return
    }

    const newOffer: PromotionalOffer = {
      id: String(Date.now()),
      title: formData.title,
      description: formData.description,
      discountPercent: formData.discountPercent,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
      status: new Date(formData.validFrom) > new Date() ? 'scheduled' : 'active',
      applicableServices: formData.applicableServices.length > 0 
        ? formData.applicableServices 
        : ['All Services']
    }

    setOffers([newOffer, ...offers])
    setFormData({
      title: '',
      description: '',
      discountPercent: 10,
      validFrom: '',
      validUntil: '',
      applicableServices: []
    })
    setShowCreateForm(false)
  }

  const toggleOfferStatus = (id: string) => {
    setOffers(offers.map(offer => {
      if (offer.id === id) {
        return {
          ...offer,
          status: offer.status === 'active' ? 'inactive' : 'active'
        }
      }
      return offer
    }))
  }

  const deleteOffer = (id: string) => {
    if (confirm('Are you sure you want to delete this promotional offer?')) {
      setOffers(offers.filter(offer => offer.id !== id))
    }
  }

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      applicableServices: prev.applicableServices.includes(service)
        ? prev.applicableServices.filter(s => s !== service)
        : [...prev.applicableServices, service]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Promotional Offers Management</h1>
              <p className="text-gray-600 mt-2">Create and manage promotional offers for your salon</p>
              <p className="text-sm text-blue-600 mt-1">
                <span className="font-semibold">Manager Access Only</span> - Only salon managers can implement promotional offers
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {showCreateForm ? 'Cancel' : '+ Create New Offer'}
            </button>
          </div>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Promotional Offer</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Summer Special - 20% Off"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the promotional offer"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount % *
                  </label>
                  <input
                    type="number"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="5"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid From *
                  </label>
                  <input
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Until *
                  </label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applicable Services
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {SERVICE_OPTIONS.map(service => (
                    <label key={service} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.applicableServices.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateOffer}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Offer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Offers List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Active & Scheduled Offers ({offers.length})
          </h2>

          {offers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">No promotional offers yet. Create your first offer!</p>
            </div>
          ) : (
            offers.map(offer => (
              <div key={offer.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          offer.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : offer.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {offer.status.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                        {offer.discountPercent}% OFF
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{offer.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 font-medium">Valid Period:</span>
                        <span className="text-gray-900 ml-2">
                          {offer.validFrom} to {offer.validUntil}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 font-medium">Applicable Services:</span>
                        <span className="text-gray-900 ml-2">
                          {offer.applicableServices.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => toggleOfferStatus(offer.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        offer.status === 'active'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {offer.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteOffer(offer.id)}
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
