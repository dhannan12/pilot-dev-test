/**
 * SetupAuthenticationAnd — Authentication and authorization middleware configuration dashboard
 *
 * Features: middleware status display, enable/disable toggles, configuration view, security settings, access control management
 *
 * Ticket: SCRUM-1220 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface AuthMiddleware {
  id: string
  name: string
  type: string
  enabled: boolean
  description: string
  priority: number
  config: {
    endpoint?: string
    tokenExpiry?: string
    refreshEnabled?: boolean
    scopes?: string[]
  }
}

const MOCK_MIDDLEWARE: AuthMiddleware[] = [
  {
    id: 'mw-1',
    name: 'JWT Authentication',
    type: 'jwt',
    enabled: true,
    description: 'JSON Web Token based authentication with RS256 signing',
    priority: 1,
    config: {
      endpoint: '/auth/jwt/verify',
      tokenExpiry: '15m',
      refreshEnabled: true,
      scopes: ['read', 'write', 'admin']
    }
  },
  {
    id: 'mw-2',
    name: 'OAuth 2.0 Provider',
    type: 'oauth',
    enabled: true,
    description: 'OAuth 2.0 authorization with third-party providers',
    priority: 2,
    config: {
      endpoint: '/auth/oauth/callback',
      tokenExpiry: '1h',
      refreshEnabled: true,
      scopes: ['profile', 'email', 'openid']
    }
  },
  {
    id: 'mw-3',
    name: 'API Key Validation',
    type: 'apikey',
    enabled: false,
    description: 'API key based authentication for service-to-service calls',
    priority: 3,
    config: {
      endpoint: '/auth/apikey/validate',
      tokenExpiry: 'never',
      refreshEnabled: false,
      scopes: ['api:read', 'api:write']
    }
  },
  {
    id: 'mw-4',
    name: 'Session Management',
    type: 'session',
    enabled: true,
    description: 'Server-side session management with Redis store',
    priority: 4,
    config: {
      endpoint: '/auth/session/verify',
      tokenExpiry: '24h',
      refreshEnabled: true,
      scopes: ['user']
    }
  },
  {
    id: 'mw-5',
    name: 'Role-Based Access Control',
    type: 'rbac',
    enabled: true,
    description: 'Role and permission based authorization middleware',
    priority: 5,
    config: {
      endpoint: '/auth/rbac/check',
      scopes: ['admin', 'editor', 'viewer', 'guest']
    }
  },
  {
    id: 'mw-6',
    name: 'Two-Factor Authentication',
    type: '2fa',
    enabled: false,
    description: 'TOTP-based two-factor authentication layer',
    priority: 6,
    config: {
      endpoint: '/auth/2fa/verify',
      tokenExpiry: '5m',
      refreshEnabled: false,
      scopes: ['2fa:required']
    }
  }
]

export default function SetupAuthenticationAnd() {
  const [middleware, setMiddleware] = useState<AuthMiddleware[]>(MOCK_MIDDLEWARE)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const toggleMiddleware = (id: string) => {
    setMiddleware(prev =>
      prev.map(mw =>
        mw.id === id ? { ...mw, enabled: !mw.enabled } : mw
      )
    )
  }

  const selectedMiddleware = middleware.find(mw => mw.id === selectedId)

  return (
    <div data-testid="setupauthenticationand" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication & Authorization Middleware
          </h1>
          <p className="text-gray-600">
            Configure and manage authentication middleware for your application
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Middleware List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Middleware Configuration
                </h2>
              </div>
              <div data-testid="setupauthenticationand-list" className="divide-y divide-gray-200">
                {middleware.map(mw => (
                  <div
                    key={mw.id}
                    data-testid="setupauthenticationand-item"
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedId(mw.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {mw.name}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            mw.enabled
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {mw.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Priority: {mw.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {mw.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {mw.config.endpoint && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {mw.config.endpoint}
                            </span>
                          )}
                          {mw.config.tokenExpiry && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              Expiry: {mw.config.tokenExpiry}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        data-testid={`setupauthenticationand-toggle-${mw.id}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleMiddleware(mw.id)
                        }}
                        className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          mw.enabled ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            mw.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              {selectedMiddleware ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Configuration Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Middleware Name
                      </label>
                      <input
                        type="text"
                        data-testid="setupauthenticationand-name"
                        value={selectedMiddleware.name}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <input
                        type="text"
                        data-testid="setupauthenticationand-type"
                        value={selectedMiddleware.type}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endpoint
                      </label>
                      <input
                        type="text"
                        data-testid="setupauthenticationand-endpoint"
                        value={selectedMiddleware.config.endpoint || 'N/A'}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        data-testid="setupauthenticationand-priority"
                        value={selectedMiddleware.priority}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(p => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedMiddleware.config.scopes && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Scopes
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedMiddleware.config.scopes.map(scope => (
                            <span
                              key={scope}
                              className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded"
                            >
                              {scope}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="pt-4 space-y-2">
                      <button
                        data-testid="setupauthenticationand-save"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Save Configuration
                      </button>
                      <button
                        data-testid="setupauthenticationand-reset"
                        className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Reset to Defaults
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <p className="mt-4 text-sm text-gray-500">
                    Select a middleware to view configuration details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Middleware</p>
                <p className="text-2xl font-bold text-gray-900">{middleware.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Enabled</p>
                <p className="text-2xl font-bold text-green-600">
                  {middleware.filter(mw => mw.enabled).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Disabled</p>
                <p className="text-2xl font-bold text-gray-600">
                  {middleware.filter(mw => !mw.enabled).length}
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <svg className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
