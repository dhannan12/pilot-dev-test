import { useState } from 'react'

interface CustomerFeedback {
  id: string
  customerName: string
  productName: string
  rating: number
  comment: string
  date: string
  category: 'product' | 'service' | 'delivery' | 'pricing'
  sentiment: 'positive' | 'neutral' | 'negative'
}

interface Campaign {
  id: string
  title: string
  description: string
  targetSegment: string
  startDate: string
  endDate: string
  status: 'draft' | 'active' | 'completed'
}

const MOCK_FEEDBACK: CustomerFeedback[] = [
  {
    id: 'fb-001',
    customerName: 'Sarah Johnson',
    productName: 'Hoppy IPA',
    rating: 5,
    comment: 'Excellent craft beer with amazing hop flavor! Would definitely recommend to friends.',
    date: '2026-08-10',
    category: 'product',
    sentiment: 'positive'
  },
  {
    id: 'fb-002',
    customerName: 'Mike Chen',
    productName: 'Dark Stout',
    rating: 3,
    comment: 'Delivery took longer than expected. Beer quality is good but service needs improvement.',
    date: '2026-08-09',
    category: 'delivery',
    sentiment: 'neutral'
  },
  {
    id: 'fb-003',
    customerName: 'Emily Rodriguez',
    productName: 'Citrus Wheat Ale',
    rating: 2,
    comment: 'Price seems too high compared to competitors. Product quality is average.',
    date: '2026-08-08',
    category: 'pricing',
    sentiment: 'negative'
  },
  {
    id: 'fb-004',
    customerName: 'David Kim',
    productName: 'Summer Lager',
    rating: 5,
    comment: 'Perfect summer beer! Customer service was outstanding. Keep up the great work!',
    date: '2026-08-07',
    category: 'service',
    sentiment: 'positive'
  },
  {
    id: 'fb-005',
    customerName: 'Lisa Anderson',
    productName: 'Belgian Blonde',
    rating: 4,
    comment: 'Great taste and smooth finish. Would love to see more variety in Belgian styles.',
    date: '2026-08-06',
    category: 'product',
    sentiment: 'positive'
  },
  {
    id: 'fb-006',
    customerName: 'Tom Wilson',
    productName: 'Amber Ale',
    rating: 2,
    comment: 'Not impressed with the packaging. Beer leaked during delivery.',
    date: '2026-08-05',
    category: 'delivery',
    sentiment: 'negative'
  },
  {
    id: 'fb-007',
    customerName: 'Rachel Green',
    productName: 'Porter Special',
    rating: 5,
    comment: 'Absolutely love this porter! Rich flavor and perfect for cold evenings.',
    date: '2026-08-04',
    category: 'product',
    sentiment: 'positive'
  }
]

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-001',
    title: 'Summer Beer Festival Promotion',
    description: 'Target customers who enjoyed summer beers with special discounts',
    targetSegment: 'Summer beer enthusiasts',
    startDate: '2026-08-15',
    endDate: '2026-09-15',
    status: 'draft'
  },
  {
    id: 'camp-002',
    title: 'Premium Craft Collection Launch',
    description: 'Promote new Belgian and specialty beers to high-rating customers',
    targetSegment: 'Premium beer lovers',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    status: 'active'
  },
  {
    id: 'camp-003',
    title: 'Service Excellence Campaign',
    description: 'Highlight improved delivery and customer service initiatives',
    targetSegment: 'Previous service complainants',
    startDate: '2026-07-01',
    endDate: '2026-07-31',
    status: 'completed'
  }
]

export default function MarketingAnalyze() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all')
  const [showCampaignForm, setShowCampaignForm] = useState(false)
  const [userRole] = useState<'marketing_manager' | 'marketing_specialist'>('marketing_specialist')
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    targetSegment: '',
    startDate: '',
    endDate: ''
  })

  const filteredFeedback = MOCK_FEEDBACK.filter(feedback => {
    const categoryMatch = selectedCategory === 'all' || feedback.category === selectedCategory
    const sentimentMatch = selectedSentiment === 'all' || feedback.sentiment === selectedSentiment
    return categoryMatch && sentimentMatch
  })

  const sentimentStats = {
    positive: MOCK_FEEDBACK.filter(f => f.sentiment === 'positive').length,
    neutral: MOCK_FEEDBACK.filter(f => f.sentiment === 'neutral').length,
    negative: MOCK_FEEDBACK.filter(f => f.sentiment === 'negative').length
  }

  const avgRating = (MOCK_FEEDBACK.reduce((sum, f) => sum + f.rating, 0) / MOCK_FEEDBACK.length).toFixed(1)

  const handleCreateCampaign = () => {
    if (userRole !== 'marketing_specialist') {
      alert('Only marketing specialists can create promotional campaigns.')
      return
    }
    // In a real app, this would save the campaign
    setShowCampaignForm(false)
    setNewCampaign({ title: '', description: '', targetSegment: '', startDate: '', endDate: '' })
    alert('Campaign created successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Analysis Dashboard</h1>
          <p className="text-gray-600">Analyze customer feedback and create promotional campaigns</p>
          <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Role: {userRole.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Average Rating</div>
            <div className="text-3xl font-bold text-gray-900">{avgRating}</div>
            <div className="text-xs text-gray-500 mt-1">out of 5.0</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow">
            <div className="text-sm text-green-700 mb-1">Positive</div>
            <div className="text-3xl font-bold text-green-900">{sentimentStats.positive}</div>
            <div className="text-xs text-green-600 mt-1">
              {((sentimentStats.positive / MOCK_FEEDBACK.length) * 100).toFixed(0)}% of feedback
            </div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow">
            <div className="text-sm text-yellow-700 mb-1">Neutral</div>
            <div className="text-3xl font-bold text-yellow-900">{sentimentStats.neutral}</div>
            <div className="text-xs text-yellow-600 mt-1">
              {((sentimentStats.neutral / MOCK_FEEDBACK.length) * 100).toFixed(0)}% of feedback
            </div>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow">
            <div className="text-sm text-red-700 mb-1">Negative</div>
            <div className="text-3xl font-bold text-red-900">{sentimentStats.negative}</div>
            <div className="text-xs text-red-600 mt-1">
              {((sentimentStats.negative / MOCK_FEEDBACK.length) * 100).toFixed(0)}% of feedback
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="product">Product</option>
                <option value="service">Service</option>
                <option value="delivery">Delivery</option>
                <option value="pricing">Pricing</option>
              </select>
            </div>
            <div>
              <label htmlFor="sentiment-select" className="block text-sm font-medium text-gray-700 mb-2">Sentiment</label>
              <select
                id="sentiment-select"
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Feedback */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Feedback</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {filteredFeedback.map((feedback) => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">{feedback.customerName}</div>
                      <div className="text-sm text-gray-600">{feedback.productName}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          feedback.sentiment === 'positive'
                            ? 'bg-green-100 text-green-800'
                            : feedback.sentiment === 'neutral'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {feedback.sentiment}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{feedback.rating}/5</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{feedback.comment}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded">{feedback.category}</span>
                    <span>{feedback.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaigns */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Promotional Campaigns</h2>
              <button
                onClick={() => {
                  if (userRole === 'marketing_specialist') {
                    setShowCampaignForm(!showCampaignForm)
                  } else {
                    alert('Only marketing specialists can create promotional campaigns.')
                  }
                }}
                className={`px-4 py-2 rounded-lg font-medium ${
                  userRole === 'marketing_specialist'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Create Campaign
              </button>
            </div>

            {showCampaignForm && (
              <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
                <h3 className="font-semibold text-gray-900 mb-3">New Campaign</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Campaign Title"
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Description"
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <input
                    type="text"
                    placeholder="Target Segment"
                    value={newCampaign.targetSegment}
                    onChange={(e) => setNewCampaign({ ...newCampaign, targetSegment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={newCampaign.startDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={newCampaign.endDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateCampaign}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
                    >
                      Save Campaign
                    </button>
                    <button
                      onClick={() => setShowCampaignForm(false)}
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {MOCK_CAMPAIGNS.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        campaign.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : campaign.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{campaign.description}</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Target:</span> {campaign.targetSegment}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {campaign.startDate} to {campaign.endDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
