/**
 * CreateRest — REST API endpoint management dashboard for job discovery, applications, and status tracking
 *
 * Features: endpoint creation, HTTP method configuration, request/response schema management, endpoint testing, status monitoring
 *
 * Ticket: SCRUM-1003 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface Endpoint {
  id: string
  name: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  description: string
  category: 'Jobs' | 'Applications' | 'Status'
  status: 'Active' | 'Testing' | 'Inactive'
  requestSchema: string
  responseSchema: string
  createdAt: string
}

const MOCK_ENDPOINTS: Endpoint[] = [
  {
    id: '1',
    name: 'List Job Postings',
    method: 'GET',
    path: '/api/v1/jobs',
    description: 'Retrieve all available job postings with filters',
    category: 'Jobs',
    status: 'Active',
    requestSchema: '{ query: { department?, location?, type? } }',
    responseSchema: '{ jobs: Job[], total: number, page: number }',
    createdAt: '2026-08-10'
  },
  {
    id: '2',
    name: 'Get Job Details',
    method: 'GET',
    path: '/api/v1/jobs/:id',
    description: 'Fetch detailed information for a specific job posting',
    category: 'Jobs',
    status: 'Active',
    requestSchema: '{ params: { id: string } }',
    responseSchema: '{ job: Job, requirements: string[], benefits: string[] }',
    createdAt: '2026-08-10'
  },
  {
    id: '3',
    name: 'Submit Application',
    method: 'POST',
    path: '/api/v1/applications',
    description: 'Submit a new job application with documents',
    category: 'Applications',
    status: 'Active',
    requestSchema: '{ jobId: string, userId: string, resume: File, coverLetter: string }',
    responseSchema: '{ applicationId: string, status: string, submittedAt: string }',
    createdAt: '2026-08-11'
  },
  {
    id: '4',
    name: 'Update Application',
    method: 'PATCH',
    path: '/api/v1/applications/:id',
    description: 'Update an existing application with additional information',
    category: 'Applications',
    status: 'Active',
    requestSchema: '{ params: { id: string }, body: { coverLetter?, resume? } }',
    responseSchema: '{ application: Application, updatedAt: string }',
    createdAt: '2026-08-12'
  },
  {
    id: '5',
    name: 'Get Application Status',
    method: 'GET',
    path: '/api/v1/applications/:id/status',
    description: 'Check the current status and timeline of an application',
    category: 'Status',
    status: 'Active',
    requestSchema: '{ params: { id: string } }',
    responseSchema: '{ status: string, timeline: Event[], lastUpdate: string }',
    createdAt: '2026-08-12'
  },
  {
    id: '6',
    name: 'Update Application Status',
    method: 'PUT',
    path: '/api/v1/applications/:id/status',
    description: 'Update the status of an application (admin only)',
    category: 'Status',
    status: 'Testing',
    requestSchema: '{ params: { id: string }, body: { status: string, notes: string } }',
    responseSchema: '{ application: Application, statusHistory: Event[] }',
    createdAt: '2026-08-13'
  },
  {
    id: '7',
    name: 'Delete Application',
    method: 'DELETE',
    path: '/api/v1/applications/:id',
    description: 'Withdraw or delete an application',
    category: 'Applications',
    status: 'Testing',
    requestSchema: '{ params: { id: string }, body: { reason?: string } }',
    responseSchema: '{ success: boolean, message: string }',
    createdAt: '2026-08-14'
  },
  {
    id: '8',
    name: 'Batch Application Status',
    method: 'POST',
    path: '/api/v1/applications/status/batch',
    description: 'Get status for multiple applications at once',
    category: 'Status',
    status: 'Inactive',
    requestSchema: '{ applicationIds: string[] }',
    responseSchema: '{ statuses: { [id: string]: Status } }',
    createdAt: '2026-08-15'
  }
]

const METHOD_COLORS = {
  GET: 'bg-green-100 text-green-800',
  POST: 'bg-blue-100 text-blue-800',
  PUT: 'bg-yellow-100 text-yellow-800',
  PATCH: 'bg-purple-100 text-purple-800',
  DELETE: 'bg-red-100 text-red-800'
}

const STATUS_COLORS = {
  Active: 'bg-green-100 text-green-800',
  Testing: 'bg-yellow-100 text-yellow-800',
  Inactive: 'bg-gray-100 text-gray-800'
}

export default function CreateRest() {
  const [endpoints] = useState<Endpoint[]>(MOCK_ENDPOINTS)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredEndpoints = selectedCategory === 'All'
    ? endpoints
    : endpoints.filter(e => e.category === selectedCategory)

  return (
    <div data-testid="createrest" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            REST API Endpoints
          </h1>
          <p className="text-gray-600">
            Manage endpoints for job discovery, applications, and status tracking
          </p>
        </div>

        {/* Actions and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                data-testid="createrest-filter-all"
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({endpoints.length})
              </button>
              <button
                data-testid="createrest-filter-jobs"
                onClick={() => setSelectedCategory('Jobs')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'Jobs'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Jobs ({endpoints.filter(e => e.category === 'Jobs').length})
              </button>
              <button
                data-testid="createrest-filter-applications"
                onClick={() => setSelectedCategory('Applications')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'Applications'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Applications ({endpoints.filter(e => e.category === 'Applications').length})
              </button>
              <button
                data-testid="createrest-filter-status"
                onClick={() => setSelectedCategory('Status')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'Status'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Status ({endpoints.filter(e => e.category === 'Status').length})
              </button>
            </div>
            <button
              data-testid="createrest-create"
              onClick={() => setShowCreateForm(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              + Create Endpoint
            </button>
          </div>
        </div>

        {/* Create Form Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div data-testid="createrest-modal" className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Endpoint</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endpoint Name
                  </label>
                  <input
                    data-testid="createrest-name"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., List Job Postings"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    HTTP Method
                  </label>
                  <select
                    data-testid="createrest-method"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>PATCH</option>
                    <option>DELETE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endpoint Path
                  </label>
                  <input
                    data-testid="createrest-path"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/api/v1/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    data-testid="createrest-description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe what this endpoint does..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    data-testid="createrest-category"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Jobs</option>
                    <option>Applications</option>
                    <option>Status</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Request Schema
                  </label>
                  <textarea
                    data-testid="createrest-request-schema"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    rows={3}
                    placeholder='{ "param": "type" }'
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Response Schema
                  </label>
                  <textarea
                    data-testid="createrest-response-schema"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    rows={3}
                    placeholder='{ "result": "type" }'
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  data-testid="createrest-submit"
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Endpoint
                </button>
                <button
                  data-testid="createrest-cancel"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Endpoints List */}
        <div data-testid="createrest-list" className="space-y-4">
          {filteredEndpoints.map((endpoint) => (
            <div
              key={endpoint.id}
              data-testid="createrest-item"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${METHOD_COLORS[endpoint.method]}`}>
                    {endpoint.method}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {endpoint.name}
                    </h3>
                    <code className="text-sm text-gray-600 font-mono">
                      {endpoint.path}
                    </code>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${STATUS_COLORS[endpoint.status]}`}>
                    {endpoint.status}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                    {endpoint.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{endpoint.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs font-semibold text-gray-500 mb-1">REQUEST SCHEMA</div>
                  <code className="text-xs text-gray-700 font-mono break-all">
                    {endpoint.requestSchema}
                  </code>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs font-semibold text-gray-500 mb-1">RESPONSE SCHEMA</div>
                  <code className="text-xs text-gray-700 font-mono break-all">
                    {endpoint.responseSchema}
                  </code>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Created: {endpoint.createdAt}
                </div>
                <div className="flex gap-2">
                  <button
                    data-testid="createrest-test"
                    onClick={() => setSelectedEndpoint(endpoint)}
                    className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    Test
                  </button>
                  <button
                    data-testid="createrest-edit"
                    className="px-4 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    data-testid="createrest-delete"
                    className="px-4 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEndpoints.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">No endpoints found for this category</p>
          </div>
        )}

        {/* Test Panel */}
        {selectedEndpoint && (
          <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border-2 border-blue-500 p-4 w-96 z-40">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Test Endpoint</h3>
              <button
                data-testid="createrest-close-test"
                onClick={() => setSelectedEndpoint(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${METHOD_COLORS[selectedEndpoint.method]}`}>
                  {selectedEndpoint.method}
                </span>
                <code className="ml-2 text-gray-600 text-xs">{selectedEndpoint.path}</code>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-xs text-gray-500 mb-1">Request</div>
                <code className="text-xs text-gray-700">{selectedEndpoint.requestSchema}</code>
              </div>
              <button
                data-testid="createrest-execute-test"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Execute Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
