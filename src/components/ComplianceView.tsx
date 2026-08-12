/**
 * ComplianceView — Complete audit trail viewer for document reviews
 *
 * Features: audit history display, regulatory compliance tracking, document review status, timestamp tracking, reviewer identification
 *
 * Ticket: SCRUM-662 | Branch: proto/SCRUM-658
 */

import React, { useState } from 'react'

interface AuditEntry {
  id: string
  documentId: string
  documentName: string
  action: string
  reviewer: string
  reviewerRole: string
  timestamp: string
  status: 'approved' | 'rejected' | 'pending' | 'revision'
  notes: string
  complianceFramework: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

const MOCK_AUDIT_TRAIL: AuditEntry[] = [
  {
    id: 'AUD-001',
    documentId: 'DOC-2024-1201',
    documentName: 'Q4 Financial Disclosure Statement',
    action: 'Final Review Completed',
    reviewer: 'Sarah Chen',
    reviewerRole: 'Senior Compliance Officer',
    timestamp: '2024-03-15T14:23:00Z',
    status: 'approved',
    notes: 'All SEC requirements met. GAAP compliance verified. Ready for submission.',
    complianceFramework: 'SEC Regulation S-K',
    riskLevel: 'low'
  },
  {
    id: 'AUD-002',
    documentId: 'DOC-2024-1185',
    documentName: 'Data Processing Agreement - EU Client',
    action: 'GDPR Compliance Review',
    reviewer: 'Michael Rodriguez',
    reviewerRole: 'Privacy Compliance Lead',
    timestamp: '2024-03-14T09:47:00Z',
    status: 'revision',
    notes: 'Clauses 7.3 and 9.1 require updates to meet Article 28 GDPR requirements. Data retention policy needs clarification.',
    complianceFramework: 'GDPR Article 28',
    riskLevel: 'high'
  },
  {
    id: 'AUD-003',
    documentId: 'DOC-2024-1192',
    documentName: 'Medical Device Safety Protocol v3.2',
    action: 'FDA Pre-submission Review',
    reviewer: 'Dr. Emily Watson',
    reviewerRole: 'Regulatory Affairs Director',
    timestamp: '2024-03-13T16:15:00Z',
    status: 'approved',
    notes: 'Complies with 21 CFR Part 820. Clinical trial data properly documented. Adverse event reporting procedures adequate.',
    complianceFramework: 'FDA 21 CFR Part 820',
    riskLevel: 'medium'
  },
  {
    id: 'AUD-004',
    documentId: 'DOC-2024-1178',
    documentName: 'Anti-Money Laundering Policy Update',
    action: 'FinCEN Compliance Audit',
    reviewer: 'James Liu',
    reviewerRole: 'Financial Crimes Compliance Officer',
    timestamp: '2024-03-12T11:30:00Z',
    status: 'rejected',
    notes: 'Customer due diligence procedures insufficient. Beneficial ownership identification requirements not adequately addressed per CDD Rule.',
    complianceFramework: 'Bank Secrecy Act / FinCEN CDD',
    riskLevel: 'critical'
  },
  {
    id: 'AUD-005',
    documentId: 'DOC-2024-1203',
    documentName: 'Environmental Impact Assessment - Site B',
    action: 'EPA Compliance Verification',
    reviewer: 'Amanda Foster',
    reviewerRole: 'Environmental Compliance Manager',
    timestamp: '2024-03-11T13:52:00Z',
    status: 'approved',
    notes: 'All NEPA requirements satisfied. Air quality monitoring plan approved. Wastewater management meets Clean Water Act standards.',
    complianceFramework: 'EPA NEPA / Clean Water Act',
    riskLevel: 'low'
  },
  {
    id: 'AUD-006',
    documentId: 'DOC-2024-1196',
    documentName: 'Employee Data Handling Procedures',
    action: 'SOC 2 Type II Audit Review',
    reviewer: 'Kevin Park',
    reviewerRole: 'Information Security Auditor',
    timestamp: '2024-03-10T10:20:00Z',
    status: 'pending',
    notes: 'Under review for SOC 2 Trust Services Criteria. Access control procedures being evaluated. Additional evidence requested for CC6.1 controls.',
    complianceFramework: 'SOC 2 Type II',
    riskLevel: 'medium'
  },
  {
    id: 'AUD-007',
    documentId: 'DOC-2024-1189',
    documentName: 'Export Control Classification Request',
    action: 'ITAR Compliance Assessment',
    reviewer: 'Patricia Morrison',
    reviewerRole: 'Trade Compliance Specialist',
    timestamp: '2024-03-09T15:40:00Z',
    status: 'approved',
    notes: 'ECCN classification confirmed. No ITAR-controlled technical data present. Export license not required for Category 5 Part 2 items.',
    complianceFramework: 'ITAR / EAR',
    riskLevel: 'medium'
  }
]

export default function ComplianceView() {
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterRisk, setFilterRisk] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredAuditTrail = MOCK_AUDIT_TRAIL.filter(entry => {
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus
    const matchesRisk = filterRisk === 'all' || entry.riskLevel === filterRisk
    const matchesSearch = searchTerm === '' || 
      entry.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.complianceFramework.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesRisk && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'revision': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-blue-100 text-blue-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const statusCounts = {
    approved: MOCK_AUDIT_TRAIL.filter(e => e.status === 'approved').length,
    pending: MOCK_AUDIT_TRAIL.filter(e => e.status === 'pending').length,
    revision: MOCK_AUDIT_TRAIL.filter(e => e.status === 'revision').length,
    rejected: MOCK_AUDIT_TRAIL.filter(e => e.status === 'rejected').length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Compliance Audit Trail
          </h1>
          <p className="text-gray-600">
            Complete audit history of document reviews for regulatory compliance
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">✓</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⏱</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Needs Revision</p>
                <p className="text-2xl font-bold text-orange-600">{statusCounts.revision}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xl">✎</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-xl">✕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="Search documents, reviewers, frameworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Status Filter
              </label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="revision">Needs Revision</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="risk-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Risk Level Filter
              </label>
              <select
                id="risk-filter"
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audit Trail Entries */}
        <div className="space-y-4">
          {filteredAuditTrail.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No audit entries match your filters</p>
            </div>
          ) : (
            filteredAuditTrail.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {entry.documentName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(entry.status)}`}>
                        {entry.status.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(entry.riskLevel)}`}>
                        {entry.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {entry.documentId}
                      </span>
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {entry.id}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {formatTimestamp(entry.timestamp)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Action</p>
                    <p className="text-sm text-gray-900">{entry.action}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Compliance Framework</p>
                    <p className="text-sm text-gray-900 font-mono">{entry.complianceFramework}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Reviewer</p>
                    <p className="text-sm text-gray-900">{entry.reviewer}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Role</p>
                    <p className="text-sm text-gray-900">{entry.reviewerRole}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Review Notes</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {entry.notes}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Export Footer */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredAuditTrail.length} of {MOCK_AUDIT_TRAIL.length} audit entries
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Export Compliance Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
