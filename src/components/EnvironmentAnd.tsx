/**
 * EnvironmentAnd — Environment and project configuration setup component
 *
 * Features: environment selection, configuration display, project settings, variable management, deployment status
 *
 * Ticket: SCRUM-1276 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface Environment {
  id: string
  name: string
  type: 'development' | 'staging' | 'production'
  status: 'active' | 'inactive' | 'maintenance'
  url: string
  lastDeployed: string
}

interface ConfigVariable {
  id: string
  key: string
  value: string
  environment: string
  isSecret: boolean
}

const mockEnvironments: Environment[] = [
  {
    id: '1',
    name: 'Development',
    type: 'development',
    status: 'active',
    url: 'https://dev.sportsclub.local',
    lastDeployed: '2026-08-30 10:30'
  },
  {
    id: '2',
    name: 'Staging',
    type: 'staging',
    status: 'active',
    url: 'https://staging.sportsclub.com',
    lastDeployed: '2026-08-29 14:15'
  },
  {
    id: '3',
    name: 'Production',
    type: 'production',
    status: 'active',
    url: 'https://sportsclub.com',
    lastDeployed: '2026-08-28 09:00'
  },
  {
    id: '4',
    name: 'Testing',
    type: 'development',
    status: 'inactive',
    url: 'https://test.sportsclub.local',
    lastDeployed: '2026-08-25 16:45'
  },
  {
    id: '5',
    name: 'QA Environment',
    type: 'staging',
    status: 'maintenance',
    url: 'https://qa.sportsclub.com',
    lastDeployed: '2026-08-27 11:20'
  }
]

const mockConfigVariables: ConfigVariable[] = [
  {
    id: '1',
    key: 'API_BASE_URL',
    value: 'https://api.sportsclub.com',
    environment: 'production',
    isSecret: false
  },
  {
    id: '2',
    key: 'DATABASE_URL',
    value: '••••••••••••',
    environment: 'production',
    isSecret: true
  },
  {
    id: '3',
    key: 'STRIPE_PUBLIC_KEY',
    value: 'pk_test_abc123',
    environment: 'development',
    isSecret: false
  },
  {
    id: '4',
    key: 'STRIPE_SECRET_KEY',
    value: '••••••••••••',
    environment: 'development',
    isSecret: true
  },
  {
    id: '5',
    key: 'REDIS_HOST',
    value: 'redis.sportsclub.local',
    environment: 'staging',
    isSecret: false
  },
  {
    id: '6',
    key: 'JWT_SECRET',
    value: '••••••••••••',
    environment: 'staging',
    isSecret: true
  },
  {
    id: '7',
    key: 'MAX_UPLOAD_SIZE',
    value: '10485760',
    environment: 'production',
    isSecret: false
  }
]

export default function EnvironmentAnd() {
  const [selectedEnv, setSelectedEnv] = useState<string>('production')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showSecrets, setShowSecrets] = useState<boolean>(false)

  const filteredVariables = mockConfigVariables.filter(
    (variable) =>
      variable.environment === selectedEnv &&
      (variable.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        variable.value.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'production':
        return 'border-red-500 bg-red-50'
      case 'staging':
        return 'border-yellow-500 bg-yellow-50'
      case 'development':
        return 'border-blue-500 bg-blue-50'
      default:
        return 'border-gray-500 bg-gray-50'
    }
  }

  return (
    <div data-testid="environmentand" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Environment & Project Configuration
          </h1>
          <p className="text-gray-600">
            Manage your application environments and configuration variables
          </p>
        </div>

        {/* Environment Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Environments</h2>
          <div
            data-testid="environmentand-list"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {mockEnvironments.map((env) => (
              <div
                key={env.id}
                data-testid="environmentand-item"
                className={`border-l-4 ${getTypeColor(env.type)} p-4 rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md ${
                  selectedEnv === env.type ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedEnv(env.type)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{env.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      env.status
                    )}`}
                  >
                    {env.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{env.url}</p>
                <p className="text-xs text-gray-500">
                  Last deployed: {env.lastDeployed}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Variables Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Configuration Variables
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({selectedEnv})
              </span>
            </h2>
            <button
              data-testid="environmentand-add"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Variable
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-4 flex gap-4">
            <input
              type="text"
              data-testid="environmentand-search"
              placeholder="Search variables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              data-testid="environmentand-environment"
              value={selectedEnv}
              onChange={(e) => setSelectedEnv(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
            <button
              data-testid="environmentand-toggle-secrets"
              onClick={() => setShowSecrets(!showSecrets)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showSecrets
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {showSecrets ? 'Hide Secrets' : 'Show Secrets'}
            </button>
          </div>

          {/* Variables List */}
          <div className="space-y-2">
            {filteredVariables.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No configuration variables found for this environment
              </div>
            ) : (
              filteredVariables.map((variable) => (
                <div
                  key={variable.id}
                  data-testid="environmentand-variable"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-gray-900">
                        {variable.key}
                      </span>
                      {variable.isSecret && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Secret
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-sm text-gray-600">
                      {variable.isSecret && !showSecrets
                        ? variable.value
                        : variable.value.replace(/•/g, 'x')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      data-testid="environmentand-edit"
                      className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      data-testid="environmentand-delete"
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3 justify-end">
            <button
              data-testid="environmentand-export"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Export Config
            </button>
            <button
              data-testid="environmentand-import"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Import Config
            </button>
            <button
              data-testid="environmentand-save"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
