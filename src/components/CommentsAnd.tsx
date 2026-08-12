/**
 * CommentsAnd — Comments and annotations UI for document review
 *
 * Features: threaded comments, annotation highlighting, user avatars, timestamp display, reply functionality
 *
 * Ticket: SCRUM-670 | Branch: proto/SCRUM-658
 */

import React, { useState } from 'react'

interface Annotation {
  id: string
  documentId: string
  pageNumber: number
  position: { x: number; y: number }
  selectedText: string
  comment: string
  author: string
  authorInitials: string
  authorColor: string
  timestamp: string
  replies: Reply[]
  status: 'open' | 'resolved' | 'archived'
}

interface Reply {
  id: string
  comment: string
  author: string
  authorInitials: string
  timestamp: string
}

const MOCK_ANNOTATIONS: Annotation[] = [
  {
    id: 'ann-1',
    documentId: 'doc-2023-001',
    pageNumber: 3,
    position: { x: 120, y: 340 },
    selectedText: 'This clause may present compliance issues under GDPR Article 6',
    comment: 'We need to revise this section to align with current data protection regulations. The language is too vague.',
    author: 'Sarah Chen',
    authorInitials: 'SC',
    authorColor: 'bg-blue-500',
    timestamp: '2026-08-10 14:23',
    status: 'open',
    replies: [
      {
        id: 'rep-1',
        comment: 'Agreed. I suggest we reference the specific GDPR article and add explicit consent requirements.',
        author: 'Michael Torres',
        authorInitials: 'MT',
        timestamp: '2026-08-10 15:10'
      },
      {
        id: 'rep-2',
        comment: 'I will draft the revised language and share by EOD tomorrow.',
        author: 'Sarah Chen',
        authorInitials: 'SC',
        timestamp: '2026-08-10 16:45'
      }
    ]
  },
  {
    id: 'ann-2',
    documentId: 'doc-2023-001',
    pageNumber: 5,
    position: { x: 200, y: 180 },
    selectedText: 'The termination clause allows for immediate cancellation without notice',
    comment: 'This is too aggressive. Industry standard requires 30-day notice period. Client may push back.',
    author: 'James Wilson',
    authorInitials: 'JW',
    authorColor: 'bg-green-500',
    timestamp: '2026-08-11 09:15',
    status: 'open',
    replies: [
      {
        id: 'rep-3',
        comment: 'Checked with the client - they are open to 30-day notice period. Proceed with revision.',
        author: 'Emily Rodriguez',
        authorInitials: 'ER',
        timestamp: '2026-08-11 11:30'
      }
    ]
  },
  {
    id: 'ann-3',
    documentId: 'doc-2023-001',
    pageNumber: 7,
    position: { x: 150, y: 420 },
    selectedText: 'Limitation of liability is capped at $50,000',
    comment: 'This cap seems low given the contract value of $2M. Recommend increasing to at least $500K.',
    author: 'David Kim',
    authorInitials: 'DK',
    authorColor: 'bg-purple-500',
    timestamp: '2026-08-11 13:45',
    status: 'resolved',
    replies: [
      {
        id: 'rep-4',
        comment: 'Updated to $500K after client negotiation. Both parties agreed.',
        author: 'David Kim',
        authorInitials: 'DK',
        timestamp: '2026-08-12 10:20'
      }
    ]
  },
  {
    id: 'ann-4',
    documentId: 'doc-2023-002',
    pageNumber: 2,
    position: { x: 180, y: 250 },
    selectedText: 'Force majeure provisions do not include pandemic or epidemic events',
    comment: 'Post-COVID, we should explicitly include pandemic scenarios in force majeure. This is now standard practice.',
    author: 'Rachel Patel',
    authorInitials: 'RP',
    authorColor: 'bg-pink-500',
    timestamp: '2026-08-12 08:30',
    status: 'open',
    replies: []
  },
  {
    id: 'ann-5',
    documentId: 'doc-2023-002',
    pageNumber: 9,
    position: { x: 220, y: 310 },
    selectedText: 'Intellectual property rights transfer upon final payment',
    comment: 'Confirmed this aligns with our standard IP transfer policy. No changes needed.',
    author: 'Tom Anderson',
    authorInitials: 'TA',
    authorColor: 'bg-orange-500',
    timestamp: '2026-08-12 09:00',
    status: 'resolved',
    replies: [
      {
        id: 'rep-5',
        comment: 'Great, marking as resolved.',
        author: 'Sarah Chen',
        authorInitials: 'SC',
        timestamp: '2026-08-12 09:15'
      }
    ]
  }
]

export default function CommentsAnd() {
  const [annotations, setAnnotations] = useState<Annotation[]>(MOCK_ANNOTATIONS)
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null)
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({})
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'resolved' | 'archived'>('all')

  const filteredAnnotations = annotations.filter(ann => 
    filterStatus === 'all' ? true : ann.status === filterStatus
  )

  const handleAddReply = (annotationId: string) => {
    const text = replyText[annotationId]?.trim()
    if (!text) return

    setAnnotations(prev => prev.map(ann => {
      if (ann.id === annotationId) {
        const newReply: Reply = {
          id: `rep-${Date.now()}`,
          comment: text,
          author: 'Current User',
          authorInitials: 'CU',
          timestamp: new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
        return { ...ann, replies: [...ann.replies, newReply] }
      }
      return ann
    }))

    setReplyText(prev => ({ ...prev, [annotationId]: '' }))
  }

  const handleToggleStatus = (annotationId: string) => {
    setAnnotations(prev => prev.map(ann => {
      if (ann.id === annotationId) {
        return { 
          ...ann, 
          status: ann.status === 'open' ? 'resolved' : 'open'
        }
      }
      return ann
    }))
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Comments & Annotations</h1>
              <p className="text-gray-600 mt-1">Review and manage document annotations</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({annotations.length})
              </button>
              <button
                onClick={() => setFilterStatus('open')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'open'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Open ({annotations.filter(a => a.status === 'open').length})
              </button>
              <button
                onClick={() => setFilterStatus('resolved')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'resolved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Resolved ({annotations.filter(a => a.status === 'resolved').length})
              </button>
            </div>
          </div>
        </div>

        {/* Annotations List */}
        <div className="space-y-4">
          {filteredAnnotations.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">No annotations found for this filter</p>
            </div>
          ) : (
            filteredAnnotations.map(annotation => (
              <div
                key={annotation.id}
                className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
                  selectedAnnotation === annotation.id
                    ? 'border-blue-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="p-6">
                  {/* Annotation Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`${annotation.authorColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold`}>
                        {annotation.authorInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{annotation.author}</span>
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-500 text-sm">{annotation.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            Document: {annotation.documentId} • Page {annotation.pageNumber}
                          </span>
                          <span className={`px-2 py-0.5 text-xs font-medium border rounded-full ${getStatusBadgeClass(annotation.status)}`}>
                            {annotation.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAnnotation(
                        selectedAnnotation === annotation.id ? null : annotation.id
                      )}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      {selectedAnnotation === annotation.id ? 'Collapse' : 'Expand'}
                    </button>
                  </div>

                  {/* Selected Text */}
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded">
                    <p className="text-sm text-gray-700 italic">"{annotation.selectedText}"</p>
                  </div>

                  {/* Main Comment */}
                  <div className="mb-4">
                    <p className="text-gray-800">{annotation.comment}</p>
                  </div>

                  {/* Replies Section */}
                  {selectedAnnotation === annotation.id && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      {annotation.replies.length > 0 && (
                        <div className="space-y-3 mb-4">
                          <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Replies ({annotation.replies.length})
                          </h3>
                          {annotation.replies.map(reply => (
                            <div key={reply.id} className="flex gap-3 pl-4 border-l-2 border-gray-200">
                              <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                {reply.authorInitials}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900 text-sm">{reply.author}</span>
                                  <span className="text-gray-400 text-xs">•</span>
                                  <span className="text-gray-500 text-xs">{reply.timestamp}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{reply.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      <div className="flex gap-3">
                        <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          CU
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={replyText[annotation.id] || ''}
                            onChange={(e) => setReplyText(prev => ({ ...prev, [annotation.id]: e.target.value }))}
                            placeholder="Add a reply..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            rows={2}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleAddReply(annotation.id)}
                              disabled={!replyText[annotation.id]?.trim()}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-sm"
                            >
                              Reply
                            </button>
                            <button
                              onClick={() => handleToggleStatus(annotation.id)}
                              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                                annotation.status === 'open'
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              }`}
                            >
                              Mark as {annotation.status === 'open' ? 'Resolved' : 'Open'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
