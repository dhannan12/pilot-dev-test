/**
 * SetupContent — Admin content moderation workflow interface
 *
 * Features: content queue, approve/reject actions, status filtering, bulk moderation, author details
 *
 * Ticket: SCRUM-1150 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface ContentItem {
  id: string
  title: string
  author: string
  type: 'blog' | 'review' | 'comment' | 'attraction' | 'event'
  content: string
  submittedDate: string
  status: 'pending' | 'approved' | 'rejected'
}

const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    title: 'Amazing Experience at Cliffs of Moher',
    author: 'Sarah O\'Connor',
    type: 'review',
    content: 'Absolutely breathtaking views! The cliffs are a must-see when visiting the west coast.',
    submittedDate: '2026-08-20',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Best Fish & Chips in Galway',
    author: 'John Murphy',
    type: 'blog',
    content: 'After trying several places, I found the best traditional fish and chips at McDonaghs.',
    submittedDate: '2026-08-19',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Aran Islands Day Trip Guide',
    author: 'Emma Walsh',
    type: 'blog',
    content: 'Complete guide to planning your day trip to the Aran Islands including ferry times and must-see spots.',
    submittedDate: '2026-08-18',
    status: 'approved'
  },
  {
    id: '4',
    title: 'Traditional Music Session at Local Pub',
    author: 'Michael Byrne',
    type: 'event',
    content: 'Join us every Thursday for authentic Irish traditional music sessions at O\'Malleys Pub.',
    submittedDate: '2026-08-17',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Connemara National Park Hiking Trail',
    author: 'Lisa Collins',
    type: 'attraction',
    content: 'Beautiful hiking trails with stunning mountain and bog landscapes. Perfect for nature lovers.',
    submittedDate: '2026-08-16',
    status: 'rejected'
  },
  {
    id: '6',
    title: 'Great atmosphere but slow service',
    author: 'David Kelly',
    type: 'comment',
    content: 'The restaurant had a wonderful ambiance but the service was quite slow during peak hours.',
    submittedDate: '2026-08-15',
    status: 'pending'
  },
  {
    id: '7',
    title: 'Wild Atlantic Way Coastal Drive',
    author: 'Rachel Brennan',
    type: 'blog',
    content: 'The most scenic coastal drive in Ireland. Tips on best stops and photo opportunities.',
    submittedDate: '2026-08-14',
    status: 'approved'
  }
]

export default function SetupContent() {
  const [content, setContent] = useState<ContentItem[]>(MOCK_CONTENT)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredContent = content.filter(item => 
    filterStatus === 'all' || item.status === filterStatus
  )

  const handleApprove = (id: string) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'approved' as const } : item
      )
    )
  }

  const handleReject = (id: string) => {
    setContent(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'rejected' as const } : item
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-100 text-blue-800'
      case 'review':
        return 'bg-purple-100 text-purple-800'
      case 'comment':
        return 'bg-gray-100 text-gray-800'
      case 'attraction':
        return 'bg-teal-100 text-teal-800'
      case 'event':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="setupcontent" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Content Moderation Workflow
          </h1>
          <p className="text-gray-600">
            Review and moderate user-generated content for the West Ireland Tourist Town website
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filter by Status</h2>
            <select
              data-testid="setupcontent-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Content</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-800">
                {content.filter(item => item.status === 'pending').length}
              </div>
              <div className="text-sm text-yellow-700">Pending Review</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-800">
                {content.filter(item => item.status === 'approved').length}
              </div>
              <div className="text-sm text-green-700">Approved</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-800">
                {content.filter(item => item.status === 'rejected').length}
              </div>
              <div className="text-sm text-red-700">Rejected</div>
            </div>
          </div>
        </div>

        <div data-testid="setupcontent-list" className="space-y-4">
          {filteredContent.map(item => (
            <div
              key={item.id}
              data-testid="setupcontent-item"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    By <span className="font-medium">{item.author}</span> • Submitted on {item.submittedDate}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-2">
                {item.content}
              </p>

              {item.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    data-testid="setupcontent-approve"
                    onClick={() => handleApprove(item.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Approve
                  </button>
                  <button
                    data-testid="setupcontent-reject"
                    onClick={() => handleReject(item.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Reject
                  </button>
                  <button
                    data-testid="setupcontent-view"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              )}

              {item.status === 'approved' && (
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Content approved and published</span>
                </div>
              )}

              {item.status === 'rejected' && (
                <div className="flex items-center gap-2 text-red-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Content rejected</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-2">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No content found</h3>
            <p className="text-gray-500">No content items match the selected filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
