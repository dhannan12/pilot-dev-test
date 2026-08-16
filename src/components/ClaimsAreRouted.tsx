/**
 * ClaimsAreRouted — Displays claims routing workflow to appropriate claims adjusters
 *
 * Features: claim assignment, adjuster matching, automatic routing, workload distribution, priority handling
 *
 * Ticket: SCRUM-967 | Branch: proto/SCRUM-963
 */

import { useState } from 'react'

interface ClaimAdjuster {
  id: string
  name: string
  specialty: string
  workload: number
  maxCapacity: number
  experience: string
}

interface Claim {
  id: string
  claimNumber: string
  type: string
  amount: number
  complexity: string
  priority: string
  description: string
  status: string
  assignedTo?: string
}

const MOCK_ADJUSTERS: ClaimAdjuster[] = [
  { id: 'ADJ001', name: 'Sarah Martinez', specialty: 'Property Damage', workload: 12, maxCapacity: 20, experience: 'Senior' },
  { id: 'ADJ002', name: 'John Chen', specialty: 'Personal Injury', workload: 8, maxCapacity: 15, experience: 'Expert' },
  { id: 'ADJ003', name: 'Emily Rodriguez', specialty: 'Liability', workload: 15, maxCapacity: 20, experience: 'Senior' },
  { id: 'ADJ004', name: 'Michael Thompson', specialty: 'Property Damage', workload: 5, maxCapacity: 15, experience: 'Mid-Level' },
  { id: 'ADJ005', name: 'David Kim', specialty: 'Personal Injury', workload: 10, maxCapacity: 18, experience: 'Senior' },
  { id: 'ADJ006', name: 'Lisa Johnson', specialty: 'Comprehensive', workload: 14, maxCapacity: 25, experience: 'Expert' },
  { id: 'ADJ007', name: 'Robert Garcia', specialty: 'Liability', workload: 7, maxCapacity: 15, experience: 'Mid-Level' }
]

const MOCK_CLAIMS: Claim[] = [
  { id: 'CLM001', claimNumber: 'MVC-2026-001523', type: 'Property Damage', amount: 8500, complexity: 'Medium', priority: 'Standard', description: 'Rear-end collision with structural damage', status: 'Pending' },
  { id: 'CLM002', claimNumber: 'MVC-2026-001524', type: 'Personal Injury', amount: 45000, complexity: 'High', priority: 'Urgent', description: 'Multi-vehicle accident with injuries', status: 'Pending' },
  { id: 'CLM003', claimNumber: 'MVC-2026-001525', type: 'Liability', amount: 12000, complexity: 'Low', priority: 'Standard', description: 'Third-party property damage claim', status: 'Pending' },
  { id: 'CLM004', claimNumber: 'MVC-2026-001526', type: 'Property Damage', amount: 3200, complexity: 'Low', priority: 'Standard', description: 'Minor fender bender, paint damage', status: 'Pending' },
  { id: 'CLM005', claimNumber: 'MVC-2026-001527', type: 'Personal Injury', amount: 75000, complexity: 'High', priority: 'Critical', description: 'Severe injury claim with ongoing treatment', status: 'Pending' },
  { id: 'CLM006', claimNumber: 'MVC-2026-001528', type: 'Comprehensive', amount: 22000, complexity: 'Medium', priority: 'Standard', description: 'Weather-related damage and towing', status: 'Pending' },
  { id: 'CLM007', claimNumber: 'MVC-2026-001529', type: 'Liability', amount: 18500, complexity: 'Medium', priority: 'Urgent', description: 'Disputed fault multi-party claim', status: 'Pending' }
]

export default function ClaimsAreRouted() {
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS)
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)
  const [routingMode, setRoutingMode] = useState<'auto' | 'manual'>('auto')

  const getRecommendedAdjuster = (claim: Claim): ClaimAdjuster | null => {
    // Filter adjusters by specialty match
    let candidates = MOCK_ADJUSTERS.filter(adj => 
      adj.specialty === claim.type || adj.specialty === 'Comprehensive'
    )

    // If no exact match, use comprehensive adjusters
    if (candidates.length === 0) {
      candidates = MOCK_ADJUSTERS.filter(adj => adj.specialty === 'Comprehensive')
    }

    // Sort by workload (prefer less busy adjusters)
    candidates.sort((a, b) => {
      const aCapacity = (a.workload / a.maxCapacity)
      const bCapacity = (b.workload / b.maxCapacity)
      
      // For high complexity, prefer expert adjusters
      if (claim.complexity === 'High') {
        if (a.experience === 'Expert' && b.experience !== 'Expert') return -1
        if (b.experience === 'Expert' && a.experience !== 'Expert') return 1
      }
      
      return aCapacity - bCapacity
    })

    return candidates.length > 0 ? candidates[0] : null
  }

  const handleAutomaticRouting = (claimId: string) => {
    const claim = claims.find(c => c.id === claimId)
    if (!claim) return

    const adjuster = getRecommendedAdjuster(claim)
    if (adjuster) {
      setClaims(claims.map(c => 
        c.id === claimId 
          ? { ...c, status: 'Assigned', assignedTo: adjuster.name }
          : c
      ))
    }
  }

  const handleManualRouting = (claimId: string, adjusterId: string) => {
    const adjuster = MOCK_ADJUSTERS.find(a => a.id === adjusterId)
    if (adjuster) {
      setClaims(claims.map(c => 
        c.id === claimId 
          ? { ...c, status: 'Assigned', assignedTo: adjuster.name }
          : c
      ))
    }
    setSelectedClaim(null)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300'
      case 'Urgent': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'Standard': return 'bg-blue-100 text-blue-800 border-blue-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'High': return 'bg-purple-100 text-purple-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const pendingClaims = claims.filter(c => c.status === 'Pending')
  const assignedClaims = claims.filter(c => c.status === 'Assigned')

  return (
    <div data-testid="claimsarerouted" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Claims Routing System</h1>
          <p className="text-gray-600">Automatically route claims to appropriate adjusters based on specialty, workload, and complexity</p>
          
          <div className="mt-4 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                data-testid="claimsarerouted-mode-auto"
                name="routingMode"
                value="auto"
                checked={routingMode === 'auto'}
                onChange={() => setRoutingMode('auto')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">Automatic Routing</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                data-testid="claimsarerouted-mode-manual"
                name="routingMode"
                value="manual"
                checked={routingMode === 'manual'}
                onChange={() => setRoutingMode('manual')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">Manual Assignment</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Adjuster Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Available Adjusters</h2>
            <div data-testid="claimsarerouted-adjuster-list" className="space-y-3">
              {MOCK_ADJUSTERS.map((adjuster) => {
                const capacityPercent = (adjuster.workload / adjuster.maxCapacity) * 100
                const capacityColor = capacityPercent > 80 ? 'bg-red-500' : capacityPercent > 60 ? 'bg-yellow-500' : 'bg-green-500'
                
                return (
                  <div key={adjuster.id} data-testid="claimsarerouted-adjuster-item" className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{adjuster.name}</h3>
                        <p className="text-sm text-gray-600">{adjuster.specialty}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{adjuster.experience}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Workload</span>
                        <span>{adjuster.workload} / {adjuster.maxCapacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${capacityColor} h-2 rounded-full transition-all`}
                          style={{ width: `${capacityPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pending Claims */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Pending Claims ({pendingClaims.length})
            </h2>
            <div data-testid="claimsarerouted-pending-list" className="space-y-3">
              {pendingClaims.map((claim) => {
                const recommendedAdjuster = getRecommendedAdjuster(claim)
                const isSelected = selectedClaim === claim.id
                
                return (
                  <div 
                    key={claim.id} 
                    data-testid="claimsarerouted-claim-item"
                    className={`border rounded-lg p-4 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{claim.claimNumber}</h3>
                        <p className="text-xs text-gray-600">{claim.type}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(claim.priority)}`}>
                        {claim.priority}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">{claim.description}</p>
                    
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        ${claim.amount.toLocaleString()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getComplexityColor(claim.complexity)}`}>
                        {claim.complexity}
                      </span>
                    </div>

                    {recommendedAdjuster && (
                      <div className="bg-green-50 border border-green-200 rounded p-2 mb-2">
                        <p className="text-xs text-green-800 font-medium">
                          Recommended: {recommendedAdjuster.name}
                        </p>
                        <p className="text-xs text-green-600">
                          {recommendedAdjuster.specialty} • {recommendedAdjuster.experience}
                        </p>
                      </div>
                    )}

                    {routingMode === 'auto' ? (
                      <button
                        data-testid="claimsarerouted-route-button"
                        onClick={() => handleAutomaticRouting(claim.id)}
                        className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Auto-Route to {recommendedAdjuster?.name || 'Adjuster'}
                      </button>
                    ) : (
                      <>
                        {isSelected ? (
                          <div className="space-y-2">
                            <select
                              data-testid="claimsarerouted-adjuster-select"
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                              onChange={(e) => handleManualRouting(claim.id, e.target.value)}
                            >
                              <option value="">Select Adjuster...</option>
                              {MOCK_ADJUSTERS.map(adj => (
                                <option key={adj.id} value={adj.id}>
                                  {adj.name} ({adj.specialty})
                                </option>
                              ))}
                            </select>
                            <button
                              data-testid="claimsarerouted-cancel-button"
                              onClick={() => setSelectedClaim(null)}
                              className="w-full bg-gray-200 text-gray-700 text-sm py-2 rounded hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            data-testid="claimsarerouted-assign-button"
                            onClick={() => setSelectedClaim(claim.id)}
                            className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition-colors"
                          >
                            Assign Manually
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Assigned Claims */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Assigned Claims ({assignedClaims.length})
            </h2>
            <div data-testid="claimsarerouted-assigned-list" className="space-y-3">
              {assignedClaims.map((claim) => (
                <div 
                  key={claim.id} 
                  data-testid="claimsarerouted-assigned-item"
                  className="border border-green-200 bg-green-50 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{claim.claimNumber}</h3>
                      <p className="text-xs text-gray-600">{claim.type}</p>
                    </div>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                      Assigned
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{claim.description}</p>
                  
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs bg-white text-gray-700 px-2 py-1 rounded border border-gray-300">
                      ${claim.amount.toLocaleString()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getComplexityColor(claim.complexity)}`}>
                      {claim.complexity}
                    </span>
                  </div>

                  <div className="bg-white border border-green-300 rounded p-2">
                    <p className="text-xs text-gray-600 font-medium">Assigned to:</p>
                    <p className="text-sm text-gray-900 font-semibold">{claim.assignedTo}</p>
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
