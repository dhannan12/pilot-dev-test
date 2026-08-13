/**
 * SetupPipeline — CI/CD pipeline configuration and deployment dashboard
 *
 * Features: pipeline status monitoring, deployment history, build logs, environment configs, automated testing results
 *
 * Ticket: SCRUM-761 | Branch: proto/SCRUM-747
 */

import React, { useState } from 'react'

interface Pipeline {
  id: string
  name: string
  status: 'success' | 'failed' | 'running' | 'pending'
  branch: string
  commit: string
  author: string
  duration: string
  timestamp: string
  environment: 'development' | 'staging' | 'production'
  tests: {
    passed: number
    failed: number
    total: number
  }
}

interface Deployment {
  id: string
  pipelineId: string
  environment: string
  version: string
  status: 'deployed' | 'rolling-back' | 'failed'
  deployedAt: string
  deployedBy: string
}

const MOCK_PIPELINES: Pipeline[] = [
  {
    id: 'pipe-001',
    name: 'Build & Test - Main',
    status: 'success',
    branch: 'main',
    commit: 'a3f2c1d',
    author: 'John Doe',
    duration: '3m 45s',
    timestamp: '2026-08-13 10:30:00',
    environment: 'production',
    tests: { passed: 124, failed: 0, total: 124 }
  },
  {
    id: 'pipe-002',
    name: 'Build & Test - Feature',
    status: 'running',
    branch: 'feature/user-auth',
    commit: 'b7e4f9a',
    author: 'Jane Smith',
    duration: '2m 12s',
    timestamp: '2026-08-13 10:45:00',
    environment: 'staging',
    tests: { passed: 98, failed: 2, total: 100 }
  },
  {
    id: 'pipe-003',
    name: 'Deploy - Staging',
    status: 'success',
    branch: 'develop',
    commit: 'c9d1e2f',
    author: 'Bob Johnson',
    duration: '5m 20s',
    timestamp: '2026-08-13 09:15:00',
    environment: 'staging',
    tests: { passed: 115, failed: 0, total: 115 }
  },
  {
    id: 'pipe-004',
    name: 'Build & Test - Hotfix',
    status: 'failed',
    branch: 'hotfix/security-patch',
    commit: 'd2a8b5c',
    author: 'Alice Brown',
    duration: '1m 55s',
    timestamp: '2026-08-13 08:50:00',
    environment: 'development',
    tests: { passed: 89, failed: 6, total: 95 }
  },
  {
    id: 'pipe-005',
    name: 'Build & Test - Release',
    status: 'pending',
    branch: 'release/v2.1.0',
    commit: 'e5f3c7d',
    author: 'Charlie Wilson',
    duration: '--',
    timestamp: '2026-08-13 11:00:00',
    environment: 'production',
    tests: { passed: 0, failed: 0, total: 110 }
  }
]

const MOCK_DEPLOYMENTS: Deployment[] = [
  {
    id: 'dep-001',
    pipelineId: 'pipe-001',
    environment: 'production',
    version: 'v2.0.5',
    status: 'deployed',
    deployedAt: '2026-08-13 10:35:00',
    deployedBy: 'John Doe'
  },
  {
    id: 'dep-002',
    pipelineId: 'pipe-003',
    environment: 'staging',
    version: 'v2.1.0-rc.3',
    status: 'deployed',
    deployedAt: '2026-08-13 09:20:00',
    deployedBy: 'Bob Johnson'
  },
  {
    id: 'dep-003',
    pipelineId: 'pipe-004',
    environment: 'development',
    version: 'v2.0.6-dev',
    status: 'failed',
    deployedAt: '2026-08-13 08:55:00',
    deployedBy: 'Alice Brown'
  },
  {
    id: 'dep-004',
    pipelineId: 'pipe-001',
    environment: 'production',
    version: 'v2.0.4',
    status: 'deployed',
    deployedAt: '2026-08-12 14:20:00',
    deployedBy: 'John Doe'
  },
  {
    id: 'dep-005',
    pipelineId: 'pipe-003',
    environment: 'staging',
    version: 'v2.1.0-rc.2',
    status: 'deployed',
    deployedAt: '2026-08-12 11:30:00',
    deployedBy: 'Jane Smith'
  }
]

export default function SetupPipeline() {
  const [selectedTab, setSelectedTab] = useState<'pipelines' | 'deployments'>('pipelines')
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'deployed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'running':
      case 'rolling-back':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production':
        return 'bg-purple-100 text-purple-800'
      case 'staging':
        return 'bg-yellow-100 text-yellow-800'
      case 'development':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CI/CD Pipeline Dashboard</h1>
          <p className="text-gray-600">Monitor build pipelines, deployments, and test results</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Pipelines</div>
            <div className="text-3xl font-bold text-gray-900">{MOCK_PIPELINES.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Successful</div>
            <div className="text-3xl font-bold text-green-600">
              {MOCK_PIPELINES.filter(p => p.status === 'success').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Running</div>
            <div className="text-3xl font-bold text-blue-600">
              {MOCK_PIPELINES.filter(p => p.status === 'running').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Failed</div>
            <div className="text-3xl font-bold text-red-600">
              {MOCK_PIPELINES.filter(p => p.status === 'failed').length}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setSelectedTab('pipelines')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'pipelines'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pipelines
              </button>
              <button
                onClick={() => setSelectedTab('deployments')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === 'deployments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Deployments
              </button>
            </div>
          </div>

          {/* Pipelines Tab */}
          {selectedTab === 'pipelines' && (
            <div className="p-6">
              <div className="space-y-4">
                {MOCK_PIPELINES.map((pipeline) => (
                  <div
                    key={pipeline.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedPipeline(pipeline)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{pipeline.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            pipeline.status
                          )}`}
                        >
                          {pipeline.status.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEnvironmentColor(pipeline.environment)}`}>
                          {pipeline.environment}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">{pipeline.duration}</div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Branch:</span>
                        <span className="ml-2 font-medium text-gray-900">{pipeline.branch}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Commit:</span>
                        <span className="ml-2 font-mono text-gray-900">{pipeline.commit}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Author:</span>
                        <span className="ml-2 text-gray-900">{pipeline.author}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <span className="ml-2 text-gray-900">{pipeline.timestamp}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-600">Tests:</span>
                        <span className="ml-2 text-green-600 font-medium">{pipeline.tests.passed} passed</span>
                        {pipeline.tests.failed > 0 && (
                          <span className="ml-2 text-red-600 font-medium">{pipeline.tests.failed} failed</span>
                        )}
                        <span className="ml-2 text-gray-500">/ {pipeline.tests.total} total</span>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(pipeline.tests.passed / pipeline.tests.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deployments Tab */}
          {selectedTab === 'deployments' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Environment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Version
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deployed At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deployed By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {MOCK_DEPLOYMENTS.map((deployment) => (
                      <tr key={deployment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEnvironmentColor(deployment.environment)}`}>
                            {deployment.environment}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-900">{deployment.version}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              deployment.status
                            )}`}
                          >
                            {deployment.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {deployment.deployedAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {deployment.deployedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">
                            View Logs
                          </button>
                          {deployment.status === 'deployed' && (
                            <button className="text-red-600 hover:text-red-800 font-medium">
                              Rollback
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Pipeline Details Modal */}
        {selectedPipeline && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPipeline.name}</h2>
                  <button
                    onClick={() => setSelectedPipeline(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Status</div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        selectedPipeline.status
                      )}`}
                    >
                      {selectedPipeline.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Duration</div>
                    <div className="text-lg font-semibold text-gray-900">{selectedPipeline.duration}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Branch</div>
                    <div className="text-lg font-semibold text-gray-900">{selectedPipeline.branch}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Commit</div>
                    <div className="text-lg font-mono font-semibold text-gray-900">{selectedPipeline.commit}</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-2">Build Log</div>
                  <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded overflow-x-auto">
                    <div>Starting build for {selectedPipeline.branch}...</div>
                    <div>Installing dependencies... ✓</div>
                    <div>Running tests... {selectedPipeline.tests.passed}/{selectedPipeline.tests.total} passed</div>
                    <div>Building application... ✓</div>
                    <div>Creating artifacts... ✓</div>
                    <div className={selectedPipeline.status === 'success' ? 'text-green-400' : 'text-red-400'}>
                      Build {selectedPipeline.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
