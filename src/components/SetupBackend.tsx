/**
 * SetupBackend — API endpoint configuration and management interface
 *
 * Features: endpoint listing, status monitoring, method filtering, endpoint creation form, health check display
 *
 * Ticket: SCRUM-1253 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface APIEndpoint {
  id: string
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  description: string
  status: 'active' | 'inactive' | 'maintenance'
  responseTime: number
  lastChecked: string
}

const MOCK_ENDPOINTS: APIEndpoint[] = [
  {
    id: '1',
    path: '/api/products',
    method: 'GET',
    description: 'Retrieve all clothing products',
    status: 'active',
    responseTime: 145,
    lastChecked: '2026-08-28 10:30:00'
  },
  {
    id: '2',
    path: '/api/products',
    method: 'POST',
    description: 'Create new product listing',
    status: 'active',
    responseTime: 230,
    lastChecked: '2026-08-28 10:28:15'
  },
  {
    id: '3',
    path: '/api/products/:id',
    method: 'PUT',
    description: 'Update existing product details',
    status: 'active',
    responseTime: 180,
    lastChecked: '2026-08-28 10:25:42'
  },
  {
    id: '4',
    path: '/api/orders',
    method: 'GET',
    description: 'Retrieve customer orders',
    status: 'active',
    responseTime: 165,
    lastChecked: '2026-08-28 10:29:30'
  },
  {
    id: '5',
    path: '/api/orders',
    method: 'POST',
    description: 'Create new customer order',
    status: 'active',
    responseTime: 210,
    lastChecked: '2026-08-28 10:27:00'
  },
  {
    id: '6',
    path: '/api/inventory',
    method: 'GET',
    description: 'Check stock levels and inventory',
    status: 'maintenance',
    responseTime: 320,
    lastChecked: '2026-08-28 09:45:10'
  },
  {
    id: '7',
    path: '/api/customers/:id',
    method: 'GET',
    description: 'Retrieve customer profile data',
    status: 'active',
    responseTime: 120,
    lastChecked: '2026-08-28 10:30:15'
  },
  {
    id: '8',
    path: '/api/cart',
    method: 'POST',
    description: 'Add items to shopping cart',
    status: 'active',
    responseTime: 95,
    lastChecked: '2026-08-28 10:29:50'
  }
]

export default function SetupBackend() {
  const [selectedMethod, setSelectedMethod] = useState<string>('all')
  const [newEndpointPath, setNewEndpointPath] = useState('')
  const [newEndpointMethod, setNewEndpointMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET')
  const [newEndpointDescription, setNewEndpointDescription] = useState('')

  const filteredEndpoints = selectedMethod === 'all'
    ? MOCK_ENDPOINTS
    : MOCK_ENDPOINTS.filter(e => e.method === selectedMethod)

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800'
      case 'POST': return 'bg-green-100 text-green-800'
      case 'PUT': return 'bg-yellow-100 text-yellow-800'
      case 'DELETE': return 'bg-red-100 text-red-800'
      case 'PATCH': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-400'
      case 'maintenance': return 'bg-orange-500'
      default: return 'bg-gray-400'
    }
  }

  const handleAddEndpoint = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock implementation - in real app would call API
    alert(`Endpoint ${newEndpointMethod} ${newEndpointPath} added successfully!`)
    setNewEndpointPath('')
    setNewEndpointDescription('')
  }

  return (
    <div data-testid="setupbackend" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Backend API Configuration
          </h1>
          <p className="text-gray-600">
            Manage and monitor your ClothesShop API endpoints
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">{MOCK_ENDPOINTS.length}</div>
            <div className="text-sm text-gray-600">Total Endpoints</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {MOCK_ENDPOINTS.filter(e => e.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-orange-600">
              {MOCK_ENDPOINTS.filter(e => e.status === 'maintenance').length}
            </div>
            <div className="text-sm text-gray-600">Maintenance</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(MOCK_ENDPOINTS.reduce((acc, e) => acc + e.responseTime, 0) / MOCK_ENDPOINTS.length)}ms
            </div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
        </div>

        {/* Add New Endpoint Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add New Endpoint
          </h2>
          <form onSubmit={handleAddEndpoint} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Method
                </label>
                <select
                  data-testid="setupbackend-method"
                  value={newEndpointMethod}
                  onChange={(e) => setNewEndpointMethod(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endpoint Path
                </label>
                <input
                  data-testid="setupbackend-path"
                  type="text"
                  value={newEndpointPath}
                  onChange={(e) => setNewEndpointPath(e.target.value)}
                  placeholder="/api/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  data-testid="setupbackend-description"
                  type="text"
                  value={newEndpointDescription}
                  onChange={(e) => setNewEndpointDescription(e.target.value)}
                  placeholder="Endpoint description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              data-testid="setupbackend-submit"
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Endpoint
            </button>
          </form>
        </div>

        {/* Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Filter by Method:
            </label>
            <select
              data-testid="setupbackend-filter"
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Methods</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
        </div>

        {/* Endpoints List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              API Endpoints ({filteredEndpoints.length})
            </h2>
          </div>
          <div data-testid="setupbackend-list" className="divide-y divide-gray-200">
            {filteredEndpoints.map((endpoint) => (
              <div
                key={endpoint.id}
                data-testid="setupbackend-item"
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {endpoint.path}
                      </code>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(endpoint.status)}`}></div>
                        <span className="text-xs text-gray-600 capitalize">
                          {endpoint.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {endpoint.description}
                    </p>
                    <div className="flex items-center space-x-6 text-xs text-gray-500">
                      <span>Response Time: {endpoint.responseTime}ms</span>
                      <span>Last Checked: {endpoint.lastChecked}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      data-testid="setupbackend-test"
                      className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                    >
                      Test
                    </button>
                    <button
                      data-testid="setupbackend-edit"
                      className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      data-testid="setupbackend-delete"
                      className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
