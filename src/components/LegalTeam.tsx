/**
 * LegalTeam — Routes documents through multi-stage approval workflows with stakeholder review tracking
 *
 * Features: approval workflow routing, sequential stakeholder review, status tracking, document assignment, workflow history
 *
 * Ticket: SCRUM-661 | Branch: proto/SCRUM-658
 */

import { useState } from 'react'

interface Stakeholder {
  id: string
  name: string
  role: string
  email: string
}

interface ApprovalStage {
  id: string
  order: number
  stakeholderId: string
  status: 'pending' | 'approved' | 'rejected' | 'in-review'
  reviewedAt?: string
  comments?: string
}

interface Document {
  id: string
  title: string
  type: string
  submittedBy: string
  submittedAt: string
  currentStage: number
  totalStages: number
  status: 'pending' | 'in-progress' | 'approved' | 'rejected'
  approvalStages: ApprovalStage[]
}

const MOCK_STAKEHOLDERS: Stakeholder[] = [
  { id: 's1', name: 'Sarah Mitchell', role: 'Senior Legal Counsel', email: 'sarah.mitchell@company.com' },
  { id: 's2', name: 'David Chen', role: 'Compliance Officer', email: 'david.chen@company.com' },
  { id: 's3', name: 'Emily Rodriguez', role: 'Chief Legal Officer', email: 'emily.rodriguez@company.com' },
  { id: 's4', name: 'Michael Thompson', role: 'Contract Specialist', email: 'michael.thompson@company.com' },
  { id: 's5', name: 'Jennifer Park', role: 'Risk Management Lead', email: 'jennifer.park@company.com' },
  { id: 's6', name: 'Robert Williams', role: 'Legal Operations Manager', email: 'robert.williams@company.com' },
  { id: 's7', name: 'Amanda Foster', role: 'Regulatory Affairs Director', email: 'amanda.foster@company.com' }
]

const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'd1',
    title: 'Enterprise Software License Agreement',
    type: 'Contract',
    submittedBy: 'John Smith',
    submittedAt: '2026-08-10 09:30',
    currentStage: 2,
    totalStages: 3,
    status: 'in-progress',
    approvalStages: [
      { id: 'a1', order: 1, stakeholderId: 's4', status: 'approved', reviewedAt: '2026-08-10 14:20', comments: 'Terms look good, minor edits made' },
      { id: 'a2', order: 2, stakeholderId: 's1', status: 'in-review', comments: '' },
      { id: 'a3', order: 3, stakeholderId: 's3', status: 'pending', comments: '' }
    ]
  },
  {
    id: 'd2',
    title: 'Data Processing Agreement - GDPR Compliance',
    type: 'Compliance',
    submittedBy: 'Lisa Anderson',
    submittedAt: '2026-08-09 11:15',
    currentStage: 3,
    totalStages: 4,
    status: 'in-progress',
    approvalStages: [
      { id: 'a4', order: 1, stakeholderId: 's2', status: 'approved', reviewedAt: '2026-08-09 15:45', comments: 'GDPR requirements satisfied' },
      { id: 'a5', order: 2, stakeholderId: 's5', status: 'approved', reviewedAt: '2026-08-10 09:10', comments: 'Risk assessment complete' },
      { id: 'a6', order: 3, stakeholderId: 's7', status: 'in-review', comments: '' },
      { id: 'a7', order: 4, stakeholderId: 's3', status: 'pending', comments: '' }
    ]
  },
  {
    id: 'd3',
    title: 'Non-Disclosure Agreement - Vendor Partnership',
    type: 'NDA',
    submittedBy: 'Mark Johnson',
    submittedAt: '2026-08-12 08:00',
    currentStage: 1,
    totalStages: 2,
    status: 'in-progress',
    approvalStages: [
      { id: 'a8', order: 1, stakeholderId: 's1', status: 'in-review', comments: '' },
      { id: 'a9', order: 2, stakeholderId: 's6', status: 'pending', comments: '' }
    ]
  },
  {
    id: 'd4',
    title: 'Employment Agreement - Executive Level',
    type: 'HR Contract',
    submittedBy: 'Rachel Green',
    submittedAt: '2026-08-08 14:30',
    currentStage: 3,
    totalStages: 3,
    status: 'approved',
    approvalStages: [
      { id: 'a10', order: 1, stakeholderId: 's4', status: 'approved', reviewedAt: '2026-08-08 16:45', comments: 'Contract terms aligned with policy' },
      { id: 'a11', order: 2, stakeholderId: 's1', status: 'approved', reviewedAt: '2026-08-09 10:20', comments: 'Legal review complete' },
      { id: 'a12', order: 3, stakeholderId: 's3', status: 'approved', reviewedAt: '2026-08-10 11:00', comments: 'Final approval granted' }
    ]
  },
  {
    id: 'd5',
    title: 'Intellectual Property Assignment Agreement',
    type: 'IP Agreement',
    submittedBy: 'Thomas Wilson',
    submittedAt: '2026-08-11 10:45',
    currentStage: 1,
    totalStages: 3,
    status: 'in-progress',
    approvalStages: [
      { id: 'a13', order: 1, stakeholderId: 's4', status: 'in-review', comments: '' },
      { id: 'a14', order: 2, stakeholderId: 's1', status: 'pending', comments: '' },
      { id: 'a15', order: 3, stakeholderId: 's3', status: 'pending', comments: '' }
    ]
  },
  {
    id: 'd6',
    title: 'Service Level Agreement - Cloud Infrastructure',
    type: 'SLA',
    submittedBy: 'Patricia Davis',
    submittedAt: '2026-08-07 13:20',
    currentStage: 2,
    totalStages: 2,
    status: 'rejected',
    approvalStages: [
      { id: 'a16', order: 1, stakeholderId: 's4', status: 'approved', reviewedAt: '2026-08-08 09:30', comments: 'Standard terms acceptable' },
      { id: 'a17', order: 2, stakeholderId: 's1', status: 'rejected', reviewedAt: '2026-08-09 14:15', comments: 'Liability clauses need revision' }
    ]
  },
  {
    id: 'd7',
    title: 'Master Services Agreement - Consulting Partner',
    type: 'Contract',
    submittedBy: 'Kevin Brown',
    submittedAt: '2026-08-12 07:15',
    currentStage: 0,
    totalStages: 4,
    status: 'pending',
    approvalStages: [
      { id: 'a18', order: 1, stakeholderId: 's4', status: 'pending', comments: '' },
      { id: 'a19', order: 2, stakeholderId: 's1', status: 'pending', comments: '' },
      { id: 'a20', order: 3, stakeholderId: 's6', status: 'pending', comments: '' },
      { id: 'a21', order: 4, stakeholderId: 's3', status: 'pending', comments: '' }
    ]
  }
]

export default function LegalTeam() {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const getStakeholder = (id: string): Stakeholder | undefined => {
    return MOCK_STAKEHOLDERS.find(s => s.id === id)
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getStageStatusColor = (status: string): string => {
    switch (status) {
      case 'approved':
        return 'text-green-600'
      case 'rejected':
        return 'text-red-600'
      case 'in-review':
        return 'text-yellow-600'
      case 'pending':
        return 'text-gray-400'
      default:
        return 'text-gray-400'
    }
  }

  const filteredDocuments = documents.filter(doc => {
    if (filterStatus === 'all') return true
    return doc.status === filterStatus
  })

  const handleApprove = (documentId: string, stageId: string) => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id === documentId) {
          const updatedStages = doc.approvalStages.map(stage => 
            stage.id === stageId 
              ? { ...stage, status: 'approved' as const, reviewedAt: new Date().toISOString().slice(0, 16).replace('T', ' '), comments: 'Approved by reviewer' }
              : stage
          )
          const currentStageIndex = updatedStages.findIndex(s => s.status === 'in-review')
          const newCurrentStage = currentStageIndex + 1
          const allApproved = updatedStages.every(s => s.status === 'approved')
          
          return {
            ...doc,
            approvalStages: updatedStages,
            currentStage: allApproved ? doc.totalStages : newCurrentStage,
            status: allApproved ? 'approved' as const : 'in-progress' as const
          }
        }
        return doc
      })
    )
    
    if (selectedDocument && selectedDocument.id === documentId) {
      const updatedDoc = documents.find(d => d.id === documentId)
      if (updatedDoc) setSelectedDocument(updatedDoc)
    }
  }

  const handleReject = (documentId: string, stageId: string) => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id === documentId) {
          const updatedStages = doc.approvalStages.map(stage => 
            stage.id === stageId 
              ? { ...stage, status: 'rejected' as const, reviewedAt: new Date().toISOString().slice(0, 16).replace('T', ' '), comments: 'Rejected - requires revision' }
              : stage
          )
          
          return {
            ...doc,
            approvalStages: updatedStages,
            status: 'rejected' as const
          }
        }
        return doc
      })
    )
    
    if (selectedDocument && selectedDocument.id === documentId) {
      const updatedDoc = documents.find(d => d.id === documentId)
      if (updatedDoc) setSelectedDocument(updatedDoc)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Team Workflow Management</h1>
          <p className="text-gray-600">Route documents through approval workflows with sequential stakeholder review</p>
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            All Documents
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('in-progress')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === 'approved' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterStatus === 'rejected' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Rejected
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Documents ({filteredDocuments.length})</h2>
            {filteredDocuments.map(doc => (
              <div
                key={doc.id}
                className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  selectedDocument?.id === doc.id ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDocument(doc)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{doc.title}</h3>
                    <p className="text-sm text-gray-500">{doc.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <span>Submitted by {doc.submittedBy}</span>
                  <span className="text-gray-400">•</span>
                  <span>{doc.submittedAt}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(doc.currentStage / doc.totalStages) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {doc.currentStage}/{doc.totalStages}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div>
            {selectedDocument ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Approval Workflow</h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedDocument.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <span className="font-medium">Type:</span>
                    <span>{selectedDocument.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <span className="font-medium">Submitted by:</span>
                    <span>{selectedDocument.submittedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Submitted at:</span>
                    <span>{selectedDocument.submittedAt}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">Review Stages</h4>
                  {selectedDocument.approvalStages.map((stage, index) => {
                    const stakeholder = getStakeholder(stage.stakeholderId)
                    const isActive = stage.status === 'in-review'
                    
                    return (
                      <div key={stage.id} className={`border-l-4 pl-4 py-3 ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                              stage.status === 'approved' ? 'bg-green-500 text-white' :
                              stage.status === 'rejected' ? 'bg-red-500 text-white' :
                              stage.status === 'in-review' ? 'bg-yellow-500 text-white' :
                              'bg-gray-300 text-gray-600'
                            }`}>
                              {stage.order}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{stakeholder?.name}</p>
                              <p className="text-sm text-gray-600">{stakeholder?.role}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(stage.status)}`}>
                            {stage.status}
                          </span>
                        </div>

                        {stage.reviewedAt && (
                          <div className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Reviewed:</span> {stage.reviewedAt}
                          </div>
                        )}

                        {stage.comments && (
                          <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                            <span className="font-medium">Comments:</span> {stage.comments}
                          </div>
                        )}

                        {isActive && (
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleApprove(selectedDocument.id, stage.id)
                              }}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleReject(selectedDocument.id, stage.id)
                              }}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">Select a document to view its approval workflow</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Stakeholder Directory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_STAKEHOLDERS.map(stakeholder => (
              <div key={stakeholder.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900">{stakeholder.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{stakeholder.role}</p>
                <p className="text-xs text-gray-500">{stakeholder.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
