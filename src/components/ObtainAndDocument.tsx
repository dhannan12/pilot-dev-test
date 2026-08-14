/**
 * ObtainAndDocument — Product brief collection and documentation workflow
 *
 * Features: brief request form, documentation checklist, status tracking, stakeholder communication, archive management
 *
 * Ticket: SCRUM-822 | Branch: proto/SCRUM-820
 */

import React, { useState } from 'react'

interface ProductBrief {
  id: string
  ticketRef: string
  productName: string
  requestedBy: string
  requestedDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  completionPercentage: number
  stakeholders: string[]
  lastUpdated: string
}

interface DocumentationItem {
  id: string
  section: string
  description: string
  completed: boolean
  required: boolean
}

const mockBriefs: ProductBrief[] = [
  {
    id: 'brief-001',
    ticketRef: 'PROTO-BD00CA91',
    productName: 'Customer Portal Dashboard',
    requestedBy: 'Sarah Chen',
    requestedDate: '2026-08-10',
    status: 'in-progress',
    completionPercentage: 45,
    stakeholders: ['Sarah Chen', 'Mike Johnson', 'Lisa Park'],
    lastUpdated: '2026-08-14 10:30'
  },
  {
    id: 'brief-002',
    ticketRef: 'PROTO-XY45Z',
    productName: 'Mobile Payment Integration',
    requestedBy: 'Tom Wilson',
    requestedDate: '2026-08-08',
    status: 'overdue',
    completionPercentage: 20,
    stakeholders: ['Tom Wilson', 'Anna Schmidt'],
    lastUpdated: '2026-08-11 15:45'
  },
  {
    id: 'brief-003',
    ticketRef: 'PROTO-ABC123',
    productName: 'Analytics Dashboard v2',
    requestedBy: 'Emily Davis',
    requestedDate: '2026-08-12',
    status: 'pending',
    completionPercentage: 0,
    stakeholders: ['Emily Davis', 'Robert Taylor', 'Kevin Liu'],
    lastUpdated: '2026-08-12 09:00'
  },
  {
    id: 'brief-004',
    ticketRef: 'PROTO-DEF456',
    productName: 'Inventory Management System',
    requestedBy: 'David Brown',
    requestedDate: '2026-08-05',
    status: 'completed',
    completionPercentage: 100,
    stakeholders: ['David Brown', 'Jessica Wang'],
    lastUpdated: '2026-08-13 16:20'
  },
  {
    id: 'brief-005',
    ticketRef: 'PROTO-GHI789',
    productName: 'Customer Feedback Portal',
    requestedBy: 'Maria Rodriguez',
    requestedDate: '2026-08-13',
    status: 'in-progress',
    completionPercentage: 65,
    stakeholders: ['Maria Rodriguez', 'Chris Anderson', 'Amy Li'],
    lastUpdated: '2026-08-14 11:15'
  }
]

const documentationChecklist: DocumentationItem[] = [
  {
    id: 'doc-001',
    section: 'Executive Summary',
    description: 'High-level overview of product vision and goals',
    completed: true,
    required: true
  },
  {
    id: 'doc-002',
    section: 'Target Audience',
    description: 'Define user personas and target market segments',
    completed: true,
    required: true
  },
  {
    id: 'doc-003',
    section: 'Feature Requirements',
    description: 'Detailed list of must-have and nice-to-have features',
    completed: false,
    required: true
  },
  {
    id: 'doc-004',
    section: 'Technical Architecture',
    description: 'System design, technology stack, and infrastructure needs',
    completed: false,
    required: true
  },
  {
    id: 'doc-005',
    section: 'Timeline & Milestones',
    description: 'Project schedule with key deliverables and dates',
    completed: false,
    required: true
  },
  {
    id: 'doc-006',
    section: 'Budget & Resources',
    description: 'Cost estimates and resource allocation plan',
    completed: false,
    required: false
  },
  {
    id: 'doc-007',
    section: 'Success Metrics',
    description: 'KPIs and measurement criteria for project success',
    completed: false,
    required: true
  },
  {
    id: 'doc-008',
    section: 'Risk Assessment',
    description: 'Potential risks and mitigation strategies',
    completed: false,
    required: false
  }
]

export default function ObtainAndDocument() {
  const [selectedBrief, setSelectedBrief] = useState<ProductBrief | null>(mockBriefs[0])
  const [checklist, setChecklist] = useState<DocumentationItem[]>(documentationChecklist)
  const [activeTab, setActiveTab] = useState<'briefs' | 'checklist' | 'stakeholders'>('briefs')

  const getStatusColor = (status: ProductBrief['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const completedCount = checklist.filter(item => item.completed).length
  const totalCount = checklist.length
  const requiredCompleted = checklist.filter(item => item.required && item.completed).length
  const requiredTotal = checklist.filter(item => item.required).length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Brief Management
          </h1>
          <p className="text-gray-600">
            Obtain, document, and track product brief submissions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Brief List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Active Briefs
            </h2>
            <div className="space-y-3">
              {mockBriefs.map(brief => (
                <button
                  key={brief.id}
                  onClick={() => setSelectedBrief(brief)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedBrief?.id === brief.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-mono text-gray-500">
                      {brief.ticketRef}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                        brief.status
                      )}`}
                    >
                      {brief.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {brief.productName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Requested by {brief.requestedBy}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${brief.completionPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {brief.completionPercentage}% complete
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
            {selectedBrief ? (
              <>
                {/* Brief Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {selectedBrief.productName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Ticket: {selectedBrief.ticketRef}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded ${getStatusColor(
                        selectedBrief.status
                      )}`}
                    >
                      {selectedBrief.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Requested by:</span>
                      <p className="font-medium text-gray-900">
                        {selectedBrief.requestedBy}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Requested date:</span>
                      <p className="font-medium text-gray-900">
                        {selectedBrief.requestedDate}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Last updated:</span>
                      <p className="font-medium text-gray-900">
                        {selectedBrief.lastUpdated}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Progress:</span>
                      <p className="font-medium text-gray-900">
                        {selectedBrief.completionPercentage}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab('briefs')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'briefs'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Brief Details
                    </button>
                    <button
                      onClick={() => setActiveTab('checklist')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'checklist'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Documentation Checklist
                      <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">
                        {completedCount}/{totalCount}
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab('stakeholders')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'stakeholders'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Stakeholders
                      <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 rounded-full">
                        {selectedBrief.stakeholders.length}
                      </span>
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'briefs' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Product Brief Overview
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">
                            Status Update
                          </h4>
                          <p className="text-sm text-blue-800">
                            This product brief is currently{' '}
                            <strong>{selectedBrief.status}</strong> with{' '}
                            <strong>{selectedBrief.completionPercentage}%</strong>{' '}
                            of documentation completed.
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Next Steps
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              Complete all required documentation sections
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              Review with stakeholders for feedback
                            </li>
                            <li className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              Submit for final approval
                            </li>
                          </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            Required Sections Progress
                          </h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              {requiredCompleted} of {requiredTotal} required
                              sections completed
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {Math.round(
                                (requiredCompleted / requiredTotal) * 100
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-600 h-3 rounded-full transition-all"
                              style={{
                                width: `${
                                  (requiredCompleted / requiredTotal) * 100
                                }%`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'checklist' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Documentation Checklist
                      </h3>
                      <div className="space-y-2">
                        {checklist.map(item => (
                          <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start">
                              <button
                                onClick={() => toggleChecklistItem(item.id)}
                                className="flex-shrink-0 mr-3 mt-1"
                              >
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                    item.completed
                                      ? 'bg-blue-600 border-blue-600'
                                      : 'border-gray-300 hover:border-blue-400'
                                  }`}
                                >
                                  {item.completed && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              </button>
                              <div className="flex-grow">
                                <div className="flex items-center justify-between mb-1">
                                  <h4
                                    className={`font-medium ${
                                      item.completed
                                        ? 'text-gray-500 line-through'
                                        : 'text-gray-900'
                                    }`}
                                  >
                                    {item.section}
                                  </h4>
                                  {item.required && (
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p
                                  className={`text-sm ${
                                    item.completed
                                      ? 'text-gray-400'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'stakeholders' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Project Stakeholders
                      </h3>
                      <div className="space-y-3">
                        {selectedBrief.stakeholders.map((stakeholder, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium mr-3">
                                {stakeholder
                                  .split(' ')
                                  .map(n => n[0])
                                  .join('')}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {stakeholder}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {index === 0 ? 'Primary Contact' : 'Stakeholder'}
                                </p>
                              </div>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              Contact
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-900 mb-2">
                          Communication Reminder
                        </h4>
                        <p className="text-sm text-yellow-800">
                          Keep all stakeholders informed of progress updates and
                          milestone achievements. Schedule regular check-ins to
                          ensure alignment.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-gray-500">
                Select a brief from the list to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
