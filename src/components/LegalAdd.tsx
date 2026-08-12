/**
 * LegalAdd — Add comments and annotations to specific sections of legal documents
 *
 * Features: section selection, comment threading, annotation highlighting, feedback management, version tracking
 *
 * Ticket: SCRUM-660 | Branch: proto/SCRUM-658
 */

import { useState } from 'react'

interface DocumentSection {
  id: string
  title: string
  content: string
  paragraph: number
}

interface Annotation {
  id: string
  sectionId: string
  authorName: string
  authorEmail: string
  comment: string
  highlightedText: string
  timestamp: string
  status: 'pending' | 'resolved' | 'in-review'
  replies: Reply[]
}

interface Reply {
  id: string
  authorName: string
  comment: string
  timestamp: string
}

const mockDocumentSections: DocumentSection[] = [
  {
    id: 'sec-1',
    title: 'Executive Summary',
    content: 'This agreement establishes the terms and conditions for the provision of software services between the parties. The service provider agrees to deliver cloud-based solutions according to the specifications outlined in Appendix A.',
    paragraph: 1
  },
  {
    id: 'sec-2',
    title: 'Scope of Services',
    content: 'The service provider shall provide software development, maintenance, and support services. All services will be delivered remotely unless otherwise specified in writing by both parties.',
    paragraph: 2
  },
  {
    id: 'sec-3',
    title: 'Payment Terms',
    content: 'Client agrees to pay service provider within thirty (30) days of invoice date. Late payments shall incur interest at a rate of 1.5% per month or the maximum rate permitted by law, whichever is lower.',
    paragraph: 3
  },
  {
    id: 'sec-4',
    title: 'Intellectual Property Rights',
    content: 'All intellectual property created during the term of this agreement shall be owned by the client upon full payment. The service provider retains rights to pre-existing materials and general methodologies.',
    paragraph: 4
  },
  {
    id: 'sec-5',
    title: 'Confidentiality',
    content: 'Both parties agree to maintain confidentiality of proprietary information disclosed during the term of this agreement. This obligation shall survive termination of the agreement for a period of five (5) years.',
    paragraph: 5
  },
  {
    id: 'sec-6',
    title: 'Termination Clause',
    content: 'Either party may terminate this agreement with sixty (60) days written notice. In case of material breach, the non-breaching party may terminate immediately upon written notice.',
    paragraph: 6
  },
  {
    id: 'sec-7',
    title: 'Limitation of Liability',
    content: 'Service provider\'s total liability shall not exceed the total fees paid under this agreement in the twelve (12) months preceding the claim. Neither party shall be liable for consequential or indirect damages.',
    paragraph: 7
  }
]

const mockAnnotations: Annotation[] = [
  {
    id: 'ann-1',
    sectionId: 'sec-3',
    authorName: 'Sarah Johnson',
    authorEmail: 'sarah.johnson@legalfirm.com',
    comment: 'The 30-day payment term may be too long for our cash flow requirements. Recommend reducing to 15 days net.',
    highlightedText: 'within thirty (30) days',
    timestamp: '2026-08-10T10:30:00Z',
    status: 'pending',
    replies: [
      {
        id: 'rep-1',
        authorName: 'Michael Chen',
        comment: 'Industry standard is typically 30 days. We could offer early payment discount instead.',
        timestamp: '2026-08-10T14:20:00Z'
      }
    ]
  },
  {
    id: 'ann-2',
    sectionId: 'sec-4',
    authorName: 'David Martinez',
    authorEmail: 'david.martinez@legalfirm.com',
    comment: 'Need to clarify what constitutes "pre-existing materials" to avoid disputes. Suggest adding definition section.',
    highlightedText: 'pre-existing materials',
    timestamp: '2026-08-11T09:15:00Z',
    status: 'in-review',
    replies: []
  },
  {
    id: 'ann-3',
    sectionId: 'sec-6',
    authorName: 'Emily Roberts',
    authorEmail: 'emily.roberts@legalfirm.com',
    comment: 'Sixty days notice period is reasonable. However, we should define what constitutes "material breach" more specifically.',
    highlightedText: 'material breach',
    timestamp: '2026-08-11T11:45:00Z',
    status: 'pending',
    replies: []
  },
  {
    id: 'ann-4',
    sectionId: 'sec-7',
    authorName: 'Sarah Johnson',
    authorEmail: 'sarah.johnson@legalfirm.com',
    comment: 'Limitation of liability clause is acceptable. Confirm this aligns with our standard risk assessment framework.',
    highlightedText: 'total liability shall not exceed',
    timestamp: '2026-08-12T08:00:00Z',
    status: 'resolved',
    replies: [
      {
        id: 'rep-2',
        authorName: 'Risk Assessment Team',
        comment: 'Reviewed and approved. This meets our risk tolerance levels.',
        timestamp: '2026-08-12T09:30:00Z'
      }
    ]
  },
  {
    id: 'ann-5',
    sectionId: 'sec-5',
    authorName: 'David Martinez',
    authorEmail: 'david.martinez@legalfirm.com',
    comment: 'Five year confidentiality period is standard. Ensure all team members are aware of this obligation.',
    highlightedText: 'five (5) years',
    timestamp: '2026-08-11T16:20:00Z',
    status: 'resolved',
    replies: []
  }
]

export default function LegalAdd() {
  const [sections] = useState<DocumentSection[]>(mockDocumentSections)
  const [annotations, setAnnotations] = useState<Annotation[]>(mockAnnotations)
  const [selectedSectionId, setSelectedSectionId] = useState<string>('')
  const [newComment, setNewComment] = useState<string>('')
  const [highlightedText, setHighlightedText] = useState<string>('')
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string>('')
  const [replyText, setReplyText] = useState<string>('')

  const selectedSection = sections.find(s => s.id === selectedSectionId)
  const sectionAnnotations = annotations.filter(a => a.sectionId === selectedSectionId)
  const selectedAnnotation = annotations.find(a => a.id === selectedAnnotationId)

  const handleAddAnnotation = () => {
    if (!selectedSectionId || !newComment.trim()) {
      return
    }

    const newAnnotation: Annotation = {
      id: `ann-${Date.now()}`,
      sectionId: selectedSectionId,
      authorName: 'Current User',
      authorEmail: 'current.user@legalfirm.com',
      comment: newComment,
      highlightedText: highlightedText || '',
      timestamp: new Date().toISOString(),
      status: 'pending',
      replies: []
    }

    setAnnotations([...annotations, newAnnotation])
    setNewComment('')
    setHighlightedText('')
  }

  const handleAddReply = () => {
    if (!selectedAnnotationId || !replyText.trim()) {
      return
    }

    const newReply: Reply = {
      id: `rep-${Date.now()}`,
      authorName: 'Current User',
      comment: replyText,
      timestamp: new Date().toISOString()
    }

    setAnnotations(annotations.map(ann => 
      ann.id === selectedAnnotationId
        ? { ...ann, replies: [...ann.replies, newReply] }
        : ann
    ))
    setReplyText('')
  }

  const handleStatusChange = (annotationId: string, newStatus: 'pending' | 'resolved' | 'in-review') => {
    setAnnotations(annotations.map(ann =>
      ann.id === annotationId ? { ...ann, status: newStatus } : ann
    ))
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'in-review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Document Review</h1>
          <p className="text-gray-600">Add comments and annotations without modifying the original document</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Sections Panel */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Document Sections</h2>
            <div className="space-y-2">
              {sections.map((section) => {
                const sectionAnnotationCount = annotations.filter(a => a.sectionId === section.id).length
                return (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSectionId(section.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedSectionId === section.id
                        ? 'bg-blue-50 border-blue-500'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">§{section.paragraph}</div>
                        <div className="text-sm text-gray-700 mt-1">{section.title}</div>
                      </div>
                      {sectionAnnotationCount > 0 && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          {sectionAnnotationCount}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Main Content Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Section Display */}
            {selectedSection && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-500">§{selectedSection.paragraph}</span>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedSection.title}</h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{selectedSection.content}</p>
                </div>

                {/* Add New Annotation Form */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Annotation</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Highlighted Text (optional)
                      </label>
                      <input
                        type="text"
                        value={highlightedText}
                        onChange={(e) => setHighlightedText(e.target.value)}
                        placeholder="Select specific text to reference..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comment *
                      </label>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add your legal review comment..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      onClick={handleAddAnnotation}
                      disabled={!newComment.trim()}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Add Annotation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Annotations */}
            {selectedSection && sectionAnnotations.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Annotations ({sectionAnnotations.length})
                </h3>
                <div className="space-y-4">
                  {sectionAnnotations.map((annotation) => (
                    <div key={annotation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-900">{annotation.authorName}</div>
                          <div className="text-xs text-gray-500">{annotation.authorEmail}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(annotation.status)}`}>
                            {annotation.status}
                          </span>
                          <select
                            value={annotation.status}
                            onChange={(e) => handleStatusChange(annotation.id, e.target.value as any)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-review">In Review</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                      </div>
                      
                      {annotation.highlightedText && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 px-3 py-2 mb-2">
                          <span className="text-sm text-gray-700">"{annotation.highlightedText}"</span>
                        </div>
                      )}
                      
                      <p className="text-gray-700 mb-2">{annotation.comment}</p>
                      <div className="text-xs text-gray-500 mb-3">{formatDate(annotation.timestamp)}</div>

                      {/* Replies */}
                      {annotation.replies.length > 0 && (
                        <div className="ml-6 space-y-2 border-l-2 border-gray-200 pl-4">
                          {annotation.replies.map((reply) => (
                            <div key={reply.id} className="bg-gray-50 rounded p-3">
                              <div className="font-medium text-sm text-gray-900">{reply.authorName}</div>
                              <p className="text-sm text-gray-700 mt-1">{reply.comment}</p>
                              <div className="text-xs text-gray-500 mt-1">{formatDate(reply.timestamp)}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Form */}
                      {selectedAnnotationId === annotation.id ? (
                        <div className="ml-6 mt-3 border-l-2 border-blue-300 pl-4">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={handleAddReply}
                              disabled={!replyText.trim()}
                              className="bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700 disabled:bg-gray-300"
                            >
                              Reply
                            </button>
                            <button
                              onClick={() => {
                                setSelectedAnnotationId('')
                                setReplyText('')
                              }}
                              className="bg-gray-200 text-gray-700 py-1 px-3 rounded text-sm hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedAnnotationId(annotation.id)}
                          className="ml-6 mt-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          Reply
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!selectedSection && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Section Selected</h3>
                <p className="text-gray-600">Select a document section to view and add annotations</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
