/**
 * ProductProvide — Product brief input form for generating structured PRDs
 *
 * Features: Multi-section form, project info capture, goals definition, requirements gathering, validation feedback
 *
 * Ticket: SCRUM-821 | Branch: proto/SCRUM-820
 */

import { useState } from 'react'

interface ProductBrief {
  projectName: string
  productManager: string
  targetDate: string
  productGoals: string
  userStories: string
  acceptanceCriteria: string
  technicalConstraints: string
  businessContext: string
}

interface SavedBrief extends ProductBrief {
  id: string
  createdAt: string
  status: 'draft' | 'submitted' | 'approved'
}

const MOCK_SAVED_BRIEFS: SavedBrief[] = [
  {
    id: 'brief-001',
    projectName: 'E-Commerce Mobile Checkout',
    productManager: 'Sarah Johnson',
    targetDate: '2026-10-15',
    productGoals: 'Streamline mobile checkout process to reduce cart abandonment by 30%',
    userStories: 'As a mobile shopper, I want to complete checkout in under 2 minutes',
    acceptanceCriteria: 'One-page checkout, saved payment methods, guest checkout option',
    technicalConstraints: 'Must integrate with Stripe API, support iOS and Android native',
    businessContext: 'Current mobile conversion rate is 1.2%, desktop is 3.5%',
    createdAt: '2026-07-15',
    status: 'approved'
  },
  {
    id: 'brief-002',
    projectName: 'Customer Dashboard Analytics',
    productManager: 'Michael Chen',
    targetDate: '2026-09-20',
    productGoals: 'Provide customers with real-time insights into their usage patterns',
    userStories: 'As a customer, I want to see my usage trends over time with visual charts',
    acceptanceCriteria: 'Daily/weekly/monthly views, export to CSV, customizable date ranges',
    technicalConstraints: 'React + TypeScript, Chart.js or D3.js, responsive design',
    businessContext: 'Feature requested by 45% of enterprise customers in recent survey',
    createdAt: '2026-07-22',
    status: 'submitted'
  },
  {
    id: 'brief-003',
    projectName: 'Multi-Language Support System',
    productManager: 'Emily Rodriguez',
    targetDate: '2026-11-01',
    productGoals: 'Expand market reach by supporting 10 additional languages',
    userStories: 'As an international user, I want to use the app in my native language',
    acceptanceCriteria: 'Support 15 languages total, RTL support, dynamic language switching',
    technicalConstraints: 'i18next library, translation management system, no page reload on switch',
    businessContext: 'International markets represent 60% growth opportunity',
    createdAt: '2026-08-01',
    status: 'draft'
  },
  {
    id: 'brief-004',
    projectName: 'AI-Powered Search Enhancement',
    productManager: 'David Kim',
    targetDate: '2026-10-30',
    productGoals: 'Improve search relevance and reduce time-to-find by 40%',
    userStories: 'As a user, I want intelligent search that understands my intent',
    acceptanceCriteria: 'Natural language queries, typo tolerance, search suggestions',
    technicalConstraints: 'OpenAI API integration, vector database, sub-200ms response time',
    businessContext: 'Search is used by 85% of users, but only 60% find what they need',
    createdAt: '2026-08-05',
    status: 'submitted'
  },
  {
    id: 'brief-005',
    projectName: 'Social Sharing Integration',
    productManager: 'Lisa Wang',
    targetDate: '2026-09-15',
    productGoals: 'Increase user acquisition through social sharing by 25%',
    userStories: 'As a user, I want to easily share my achievements on social media',
    acceptanceCriteria: 'Share to Twitter, LinkedIn, Facebook, customizable share cards',
    technicalConstraints: 'OAuth integration for each platform, image generation for cards',
    businessContext: 'Viral marketing could reduce customer acquisition cost by 40%',
    createdAt: '2026-08-10',
    status: 'draft'
  }
]

export default function ProductProvide() {
  const [brief, setBrief] = useState<ProductBrief>({
    projectName: '',
    productManager: '',
    targetDate: '',
    productGoals: '',
    userStories: '',
    acceptanceCriteria: '',
    technicalConstraints: '',
    businessContext: ''
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create')

  const handleChange = (field: keyof ProductBrief, value: string) => {
    setBrief(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!brief.projectName.trim()) {
      newErrors.projectName = 'Project name is required'
    }
    if (!brief.productManager.trim()) {
      newErrors.productManager = 'Product manager name is required'
    }
    if (!brief.targetDate) {
      newErrors.targetDate = 'Target date is required'
    }
    if (!brief.productGoals.trim()) {
      newErrors.productGoals = 'Product goals are required'
    }
    if (!brief.userStories.trim()) {
      newErrors.userStories = 'User stories are required'
    }
    if (!brief.acceptanceCriteria.trim()) {
      newErrors.acceptanceCriteria = 'Acceptance criteria are required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setBrief({
          projectName: '',
          productManager: '',
          targetDate: '',
          productGoals: '',
          userStories: '',
          acceptanceCriteria: '',
          technicalConstraints: '',
          businessContext: ''
        })
      }, 3000)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'submitted':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Product Brief Submission
            </h1>
            <p className="text-gray-600">
              Provide a complete product brief to generate a structured PRD with accurate requirements
            </p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('create')}
                className={`pb-3 px-4 font-medium transition-colors ${
                  activeTab === 'create'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Create Brief
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`pb-3 px-4 font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Brief History
              </button>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              <p className="font-medium">✓ Product brief submitted successfully!</p>
              <p className="text-sm mt-1">Your PRD is being generated and will be available shortly.</p>
            </div>
          )}

          {/* Create Brief Tab */}
          {activeTab === 'create' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Information Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Project Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={brief.projectName}
                      onChange={(e) => handleChange('projectName', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.projectName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter project name"
                    />
                    {errors.projectName && (
                      <p className="text-red-600 text-sm mt-1">{errors.projectName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Manager *
                    </label>
                    <input
                      type="text"
                      value={brief.productManager}
                      onChange={(e) => handleChange('productManager', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.productManager ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.productManager && (
                      <p className="text-red-600 text-sm mt-1">{errors.productManager}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Launch Date *
                    </label>
                    <input
                      type="date"
                      value={brief.targetDate}
                      onChange={(e) => handleChange('targetDate', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.targetDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.targetDate && (
                      <p className="text-red-600 text-sm mt-1">{errors.targetDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Goals Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Product Goals
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are the primary goals of this product? *
                  </label>
                  <textarea
                    value={brief.productGoals}
                    onChange={(e) => handleChange('productGoals', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.productGoals ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe the key objectives and success metrics..."
                  />
                  {errors.productGoals && (
                    <p className="text-red-600 text-sm mt-1">{errors.productGoals}</p>
                  )}
                </div>
              </div>

              {/* Requirements Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Requirements
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Stories *
                    </label>
                    <textarea
                      value={brief.userStories}
                      onChange={(e) => handleChange('userStories', e.target.value)}
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.userStories ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="As a [user type], I want to [action], so that [benefit]..."
                    />
                    {errors.userStories && (
                      <p className="text-red-600 text-sm mt-1">{errors.userStories}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Acceptance Criteria *
                    </label>
                    <textarea
                      value={brief.acceptanceCriteria}
                      onChange={(e) => handleChange('acceptanceCriteria', e.target.value)}
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.acceptanceCriteria ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="List specific criteria that must be met for completion..."
                    />
                    {errors.acceptanceCriteria && (
                      <p className="text-red-600 text-sm mt-1">{errors.acceptanceCriteria}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technical Constraints (Optional)
                    </label>
                    <textarea
                      value={brief.technicalConstraints}
                      onChange={(e) => handleChange('technicalConstraints', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any technical limitations or requirements..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Context (Optional)
                    </label>
                    <textarea
                      value={brief.businessContext}
                      onChange={(e) => handleChange('businessContext', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Background information, market research, business rationale..."
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setBrief({
                      projectName: '',
                      productManager: '',
                      targetDate: '',
                      productGoals: '',
                      userStories: '',
                      acceptanceCriteria: '',
                      technicalConstraints: '',
                      businessContext: ''
                    })
                    setErrors({})
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Brief
                </button>
              </div>
            </form>
          )}

          {/* Brief History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Previous Briefs
                </h2>
                <span className="text-sm text-gray-600">
                  {MOCK_SAVED_BRIEFS.length} briefs
                </span>
              </div>

              {MOCK_SAVED_BRIEFS.map((savedBrief) => (
                <div
                  key={savedBrief.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {savedBrief.projectName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        by {savedBrief.productManager} • {savedBrief.createdAt}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(savedBrief.status)}`}>
                      {savedBrief.status.charAt(0).toUpperCase() + savedBrief.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Target Date:</span>
                      <span className="text-gray-600 ml-2">{savedBrief.targetDate}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Goals:</span>
                      <p className="text-gray-600 mt-1">{savedBrief.productGoals}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">User Stories:</span>
                      <p className="text-gray-600 mt-1">{savedBrief.userStories}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Full Brief
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Generated PRD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
