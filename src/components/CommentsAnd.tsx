/**
 * CommentsAnd — API documentation for comments and annotations endpoints
 *
 * Features: RESTful endpoints, CRUD operations, annotation support, threading, metadata display
 *
 * Ticket: SCRUM-666 | Branch: proto/SCRUM-658
 */

import React, { useState } from 'react'

interface ApiEndpoint {
  id: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  description: string
  requestBody?: string
  responseExample: string
  status: 'active' | 'deprecated' | 'beta'
}

interface Comment {
  id: string
  documentId: string
  authorId: string
  authorName: string
  content: string
  timestamp: string
  parentId?: string
  resolved: boolean
}

interface Annotation {
  id: string
  documentId: string
  pageNumber: number
  authorId: string
  authorName: string
  content: string
  timestamp: string
  coordinates: { x: number; y: number; width: number; height: number }
  type: 'highlight' | 'note' | 'redaction' | 'stamp'
}

const mockApiEndpoints: ApiEndpoint[] = [
  {
    id: 'ep-1',
    method: 'GET',
    path: '/api/v1/documents/:docId/comments',
    description: 'Retrieve all comments for a specific document',
    responseExample: '{ "comments": [...], "total": 42, "page": 1 }',
    status: 'active'
  },
  {
    id: 'ep-2',
    method: 'POST',
    path: '/api/v1/documents/:docId/comments',
    description: 'Create a new comment on a document',
    requestBody: '{ "content": "string", "parentId": "string?" }',
    responseExample: '{ "id": "cmt-123", "status": "created", "timestamp": "2026-08-12T10:30:00Z" }',
    status: 'active'
  },
  {
    id: 'ep-3',
    method: 'GET',
    path: '/api/v1/documents/:docId/annotations',
    description: 'Retrieve all annotations for a specific document',
    responseExample: '{ "annotations": [...], "total": 28, "page": 1 }',
    status: 'active'
  },
  {
    id: 'ep-4',
    method: 'POST',
    path: '/api/v1/documents/:docId/annotations',
    description: 'Create a new annotation on a document page',
    requestBody: '{ "pageNumber": 1, "content": "string", "type": "highlight|note|redaction|stamp", "coordinates": {...} }',
    responseExample: '{ "id": "ann-456", "status": "created", "timestamp": "2026-08-12T10:35:00Z" }',
    status: 'active'
  },
  {
    id: 'ep-5',
    method: 'PATCH',
    path: '/api/v1/comments/:commentId',
    description: 'Update an existing comment (edit content or mark as resolved)',
    requestBody: '{ "content": "string?", "resolved": "boolean?" }',
    responseExample: '{ "id": "cmt-123", "status": "updated", "timestamp": "2026-08-12T10:40:00Z" }',
    status: 'active'
  },
  {
    id: 'ep-6',
    method: 'DELETE',
    path: '/api/v1/comments/:commentId',
    description: 'Delete a specific comment',
    responseExample: '{ "id": "cmt-123", "status": "deleted" }',
    status: 'active'
  },
  {
    id: 'ep-7',
    method: 'PATCH',
    path: '/api/v1/annotations/:annotationId',
    description: 'Update an existing annotation',
    requestBody: '{ "content": "string?", "coordinates": {...}? }',
    responseExample: '{ "id": "ann-456", "status": "updated", "timestamp": "2026-08-12T10:45:00Z" }',
    status: 'active'
  },
  {
    id: 'ep-8',
    method: 'DELETE',
    path: '/api/v1/annotations/:annotationId',
    description: 'Delete a specific annotation',
    responseExample: '{ "id": "ann-456", "status": "deleted" }',
    status: 'active'
  }
]

const mockComments: Comment[] = [
  {
    id: 'cmt-001',
    documentId: 'doc-123',
    authorId: 'user-001',
    authorName: 'Sarah Chen',
    content: 'This clause needs clarification regarding liability limits.',
    timestamp: '2026-08-11T09:15:00Z',
    resolved: false
  },
  {
    id: 'cmt-002',
    documentId: 'doc-123',
    authorId: 'user-002',
    authorName: 'Michael Torres',
    content: 'Agreed. I recommend we add specific dollar amounts.',
    timestamp: '2026-08-11T10:22:00Z',
    parentId: 'cmt-001',
    resolved: false
  },
  {
    id: 'cmt-003',
    documentId: 'doc-124',
    authorId: 'user-003',
    authorName: 'Emily Watson',
    content: 'The termination notice period seems too short.',
    timestamp: '2026-08-11T14:30:00Z',
    resolved: true
  },
  {
    id: 'cmt-004',
    documentId: 'doc-125',
    authorId: 'user-001',
    authorName: 'Sarah Chen',
    content: 'Payment terms look acceptable as drafted.',
    timestamp: '2026-08-12T08:00:00Z',
    resolved: true
  },
  {
    id: 'cmt-005',
    documentId: 'doc-126',
    authorId: 'user-004',
    authorName: 'David Kim',
    content: 'We need to verify the jurisdiction clause with local counsel.',
    timestamp: '2026-08-12T09:45:00Z',
    resolved: false
  }
]

const mockAnnotations: Annotation[] = [
  {
    id: 'ann-001',
    documentId: 'doc-123',
    pageNumber: 3,
    authorId: 'user-001',
    authorName: 'Sarah Chen',
    content: 'Important: Review with financial team',
    timestamp: '2026-08-11T09:20:00Z',
    coordinates: { x: 120, y: 450, width: 280, height: 50 },
    type: 'highlight'
  },
  {
    id: 'ann-002',
    documentId: 'doc-123',
    pageNumber: 5,
    authorId: 'user-002',
    authorName: 'Michael Torres',
    content: 'Potential IP conflict here',
    timestamp: '2026-08-11T11:00:00Z',
    coordinates: { x: 80, y: 200, width: 350, height: 80 },
    type: 'note'
  },
  {
    id: 'ann-003',
    documentId: 'doc-124',
    pageNumber: 2,
    authorId: 'user-003',
    authorName: 'Emily Watson',
    content: '[REDACTED - Confidential]',
    timestamp: '2026-08-11T15:15:00Z',
    coordinates: { x: 150, y: 300, width: 200, height: 30 },
    type: 'redaction'
  },
  {
    id: 'ann-004',
    documentId: 'doc-125',
    pageNumber: 8,
    authorId: 'user-001',
    authorName: 'Sarah Chen',
    content: 'APPROVED',
    timestamp: '2026-08-12T08:05:00Z',
    coordinates: { x: 400, y: 100, width: 100, height: 40 },
    type: 'stamp'
  },
  {
    id: 'ann-005',
    documentId: 'doc-126',
    pageNumber: 1,
    authorId: 'user-004',
    authorName: 'David Kim',
    content: 'Cross-reference with Section 12.4',
    timestamp: '2026-08-12T09:50:00Z',
    coordinates: { x: 200, y: 500, width: 250, height: 60 },
    type: 'note'
  }
]

export default function CommentsAnd() {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'comments' | 'annotations'>('endpoints')
  const [selectedMethod, setSelectedMethod] = useState<string>('ALL')

  const filteredEndpoints = selectedMethod === 'ALL'
    ? mockApiEndpoints
    : mockApiEndpoints.filter(ep => ep.method === selectedMethod)

  const getMethodColor = (method: string): string => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-700'
      case 'POST': return 'bg-green-100 text-green-700'
      case 'PUT': return 'bg-yellow-100 text-yellow-700'
      case 'PATCH': return 'bg-orange-100 text-orange-700'
      case 'DELETE': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'deprecated': return 'bg-red-100 text-red-700'
      case 'beta': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getAnnotationTypeColor = (type: string): string => {
    switch (type) {
      case 'highlight': return 'bg-yellow-100 text-yellow-800'
      case 'note': return 'bg-blue-100 text-blue-800'
      case 'redaction': return 'bg-red-100 text-red-800'
      case 'stamp': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Comments & Annotations API
          </h1>
          <p className="text-gray-600">
            RESTful endpoints for managing document comments, threaded discussions, and page annotations
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('endpoints')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'endpoints'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              API Endpoints
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'comments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sample Comments
            </button>
            <button
              onClick={() => setActiveTab('annotations')}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'annotations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sample Annotations
            </button>
          </nav>
        </div>

        {/* API Endpoints Tab */}
        {activeTab === 'endpoints' && (
          <div>
            <div className="mb-6 flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by method:</label>
              <div className="flex space-x-2">
                {['ALL', 'GET', 'POST', 'PATCH', 'DELETE'].map(method => (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      selectedMethod === method
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredEndpoints.map(endpoint => (
                <div key={endpoint.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-gray-800">{endpoint.path}</code>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                      {endpoint.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{endpoint.description}</p>
                  
                  {endpoint.requestBody && (
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-600 mb-1">Request Body:</h4>
                      <pre className="bg-gray-50 p-2 rounded text-xs font-mono text-gray-800 overflow-x-auto">
                        {endpoint.requestBody}
                      </pre>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 mb-1">Response Example:</h4>
                    <pre className="bg-gray-50 p-2 rounded text-xs font-mono text-gray-800 overflow-x-auto">
                      {endpoint.responseExample}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Total Comments:</strong> {mockComments.length} | 
                <strong className="ml-3">Resolved:</strong> {mockComments.filter(c => c.resolved).length} | 
                <strong className="ml-3">Pending:</strong> {mockComments.filter(c => !c.resolved).length}
              </p>
            </div>

            {mockComments.map(comment => (
              <div
                key={comment.id}
                className={`bg-white rounded-lg shadow-sm border p-5 ${
                  comment.parentId ? 'ml-8 border-l-4 border-l-blue-300' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {comment.authorName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{comment.authorName}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()} • Doc: {comment.documentId}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      comment.resolved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {comment.resolved ? 'Resolved' : 'Pending'}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                
                {comment.parentId && (
                  <div className="mt-2 text-xs text-blue-600">
                    ↳ Reply to comment {comment.parentId}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Annotations Tab */}
        {activeTab === 'annotations' && (
          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-purple-800">
                <strong>Total Annotations:</strong> {mockAnnotations.length} | 
                <strong className="ml-3">Types:</strong> Highlight ({mockAnnotations.filter(a => a.type === 'highlight').length}), 
                Note ({mockAnnotations.filter(a => a.type === 'note').length}), 
                Redaction ({mockAnnotations.filter(a => a.type === 'redaction').length}), 
                Stamp ({mockAnnotations.filter(a => a.type === 'stamp').length})
              </p>
            </div>

            {mockAnnotations.map(annotation => (
              <div key={annotation.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {annotation.authorName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{annotation.authorName}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(annotation.timestamp).toLocaleString()} • Doc: {annotation.documentId} • Page {annotation.pageNumber}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getAnnotationTypeColor(annotation.type)}`}>
                    {annotation.type}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{annotation.content}</p>
                
                <div className="bg-gray-50 rounded p-3 text-xs font-mono text-gray-600">
                  <div className="grid grid-cols-2 gap-2">
                    <div><span className="font-semibold">X:</span> {annotation.coordinates.x}px</div>
                    <div><span className="font-semibold">Y:</span> {annotation.coordinates.y}px</div>
                    <div><span className="font-semibold">Width:</span> {annotation.coordinates.width}px</div>
                    <div><span className="font-semibold">Height:</span> {annotation.coordinates.height}px</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
