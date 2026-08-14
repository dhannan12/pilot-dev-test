/**
 * ClarifyProductRequirements — Stakeholder requirement clarification workflow
 *
 * Features: requirement status tracking, stakeholder assignment, priority management, comment threads, progress visualization
 *
 * Ticket: SCRUM-824 | Branch: proto/SCRUM-823
 */

import React, { useState } from 'react'

interface Requirement {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-review' | 'clarified' | 'blocked'
  priority: 'high' | 'medium' | 'low'
  stakeholder: string
  comments: number
  lastUpdated: string
}

const mockRequirements: Requirement[] = [
  {
    id: 'REQ-001',
    title: 'User authentication flow',
    description: 'Define single sign-on requirements and multi-factor authentication strategy',
    status: 'in-review',
    priority: 'high',
    stakeholder: 'Sarah Chen (Product)',
    comments: 8,
    lastUpdated: '2026-08-13'
  },
  {
    id: 'REQ-002',
    title: 'Data retention policy',
    description: 'Clarify how long user data should be stored and backup frequency',
    status: 'pending',
    priority: 'high',
    stakeholder: 'Michael Torres (Legal)',
    comments: 3,
    lastUpdated: '2026-08-12'
  },
  {
    id: 'REQ-003',
    title: 'Mobile responsiveness scope',
    description: 'Define breakpoints and supported mobile devices for initial launch',
    status: 'clarified',
    priority: 'medium',
    stakeholder: 'Emma Liu (Design)',
    comments: 12,
    lastUpdated: '2026-08-11'
  },
  {
    id: 'REQ-004',
    title: 'Third-party API integrations',
    description: 'List all external services to integrate and SLA requirements',
    status: 'blocked',
    priority: 'high',
    stakeholder: 'David Park (Engineering)',
    comments: 5,
    lastUpdated: '2026-08-10'
  },
  {
    id: 'REQ-005',
    title: 'Performance benchmarks',
    description: 'Set target load times, throughput, and concurrent user limits',
    status: 'in-review',
    priority: 'medium',
    stakeholder: 'Rachel Kim (Product)',
    comments: 6,
    lastUpdated: '2026-08-09'
  },
  {
    id: 'REQ-006',
    title: 'Accessibility standards',
    description: 'Define WCAG compliance level and screen reader support requirements',
    status: 'pending',
    priority: 'low',
    stakeholder: 'James Wilson (Compliance)',
    comments: 2,
    lastUpdated: '2026-08-08'
  },
  {
    id: 'REQ-007',
    title: 'Internationalization scope',
    description: 'Identify supported languages and localization requirements for launch',
    status: 'clarified',
    priority: 'low',
    stakeholder: 'Anna Schmidt (Product)',
    comments: 9,
    lastUpdated: '2026-08-07'
  }
]

export default function ClarifyProductRequirements() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-review' | 'clarified' | 'blocked'>('all')
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(null)

  const filteredRequirements = filter === 'all' 
    ? mockRequirements 
    : mockRequirements.filter(req => req.status === filter)

  const getStatusColor = (status: Requirement['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'in-review': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'clarified': return 'bg-green-100 text-green-800 border-green-300'
      case 'blocked': return 'bg-red-100 text-red-800 border-red-300'
    }
  }

  const getPriorityColor = (priority: Requirement['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 font-semibold'
      case 'medium': return 'text-orange-600 font-medium'
      case 'low': return 'text-gray-600'
    }
  }

  const statusCounts = {
    all: mockRequirements.length,
    pending: mockRequirements.filter(r => r.status === 'pending').length,
    'in-review': mockRequirements.filter(r => r.status === 'in-review').length,
    clarified: mockRequirements.filter(r => r.status === 'clarified').length,
    blocked: mockRequirements.filter(r => r.status === 'blocked').length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Requirements Clarification
          </h1>
          <p className="text-gray-600">
            Collaborate with stakeholders to clarify and finalize product requirements
          </p>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filter === 'all' 
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white border-gray-200 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl font-bold">{statusCounts.all}</div>
            <div className="text-sm mt-1">All Requirements</div>
          </button>
          
          <button
            onClick={() => setFilter('pending')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filter === 'pending' 
                ? 'bg-yellow-500 text-white border-yellow-500' 
                : 'bg-white border-gray-200 hover:border-yellow-400'
            }`}
          >
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
            <div className="text-sm mt-1">Pending</div>
          </button>

          <button
            onClick={() => setFilter('in-review')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filter === 'in-review' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white border-gray-200 hover:border-blue-400'
            }`}
          >
            <div className="text-2xl font-bold">{statusCounts['in-review']}</div>
            <div className="text-sm mt-1">In Review</div>
          </button>

          <button
            onClick={() => setFilter('clarified')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filter === 'clarified' 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white border-gray-200 hover:border-green-400'
            }`}
          >
            <div className="text-2xl font-bold">{statusCounts.clarified}</div>
            <div className="text-sm mt-1">Clarified</div>
          </button>

          <button
            onClick={() => setFilter('blocked')}
            className={`p-4 rounded-lg border-2 transition-all ${
              filter === 'blocked' 
                ? 'bg-red-500 text-white border-red-500' 
                : 'bg-white border-gray-200 hover:border-red-400'
            }`}
          >
            <div className="text-2xl font-bold">{statusCounts.blocked}</div>
            <div className="text-sm mt-1">Blocked</div>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Overall Progress</h3>
            <span className="text-sm text-gray-600">
              {statusCounts.clarified} of {statusCounts.all} clarified ({Math.round((statusCounts.clarified / statusCounts.all) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(statusCounts.clarified / statusCounts.all) * 100}%` }}
            />
          </div>
        </div>

        {/* Requirements List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {filter === 'all' ? 'All Requirements' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Requirements`}
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredRequirements.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedReq(req)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-gray-500">{req.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                      <span className={`text-xs uppercase ${getPriorityColor(req.priority)}`}>
                        {req.priority} priority
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {req.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {req.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {req.stakeholder}
                      </span>
                      
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {req.comments} comments
                      </span>
                      
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Updated {req.lastUpdated}
                      </span>
                    </div>
                  </div>
                  
                  <button className="ml-4 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredRequirements.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No requirements found</h3>
            <p className="text-gray-600">Try selecting a different filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
