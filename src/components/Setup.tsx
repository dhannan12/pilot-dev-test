/**
 * Setup — CI/CD Pipeline and Deployment configuration dashboard
 *
 * Features: pipeline status overview, deployment environments, build history, configuration management, automated testing status
 *
 * Ticket: SCRUM-716 | Branch: proto/SCRUM-703
 */

import React, { useState } from 'react'

interface Pipeline {
  id: string
  name: string
  status: 'success' | 'failed' | 'running' | 'pending'
  branch: string
  lastRun: string
  duration: string
  environment: string
}

interface Deployment {
  id: string
  environment: string
  version: string
  status: 'deployed' | 'deploying' | 'failed' | 'rolled-back'
  timestamp: string
  deployedBy: string
}

interface BuildHistory {
  id: string
  buildNumber: string
  commit: string
  status: 'success' | 'failed' | 'running'
  timestamp: string
  tests: number
  coverage: string
}

const mockPipelines: Pipeline[] = [
  {
    id: '1',
    name: 'Main CI Pipeline',
    status: 'success',
    branch: 'main',
    lastRun: '2026-08-13 10:30 AM',
    duration: '5m 23s',
    environment: 'Production'
  },
  {
    id: '2',
    name: 'Development Pipeline',
    status: 'running',
    branch: 'develop',
    lastRun: '2026-08-13 11:00 AM',
    duration: '3m 12s',
    environment: 'Development'
  },
  {
    id: '3',
    name: 'Staging Pipeline',
    status: 'success',
    branch: 'staging',
    lastRun: '2026-08-13 09:45 AM',
    duration: '4m 56s',
    environment: 'Staging'
  },
  {
    id: '4',
    name: 'Feature Branch Pipeline',
    status: 'failed',
    branch: 'feature/new-ui',
    lastRun: '2026-08-13 08:15 AM',
    duration: '2m 08s',
    environment: 'Testing'
  },
  {
    id: '5',
    name: 'Hotfix Pipeline',
    status: 'pending',
    branch: 'hotfix/security-patch',
    lastRun: '2026-08-13 07:00 AM',
    duration: '6m 45s',
    environment: 'Production'
  }
]

const mockDeployments: Deployment[] = [
  {
    id: '1',
    environment: 'Production',
    version: 'v2.5.3',
    status: 'deployed',
    timestamp: '2026-08-13 10:30 AM',
    deployedBy: 'admin@company.com'
  },
  {
    id: '2',
    environment: 'Staging',
    version: 'v2.5.4-rc1',
    status: 'deployed',
    timestamp: '2026-08-13 09:45 AM',
    deployedBy: 'devops@company.com'
  },
  {
    id: '3',
    environment: 'Development',
    version: 'v2.6.0-dev',
    status: 'deploying',
    timestamp: '2026-08-13 11:00 AM',
    deployedBy: 'developer@company.com'
  },
  {
    id: '4',
    environment: 'Testing',
    version: 'v2.5.3',
    status: 'failed',
    timestamp: '2026-08-13 08:15 AM',
    deployedBy: 'tester@company.com'
  },
  {
    id: '5',
    environment: 'Production',
    version: 'v2.5.2',
    status: 'rolled-back',
    timestamp: '2026-08-12 11:30 PM',
    deployedBy: 'admin@company.com'
  }
]

const mockBuildHistory: BuildHistory[] = [
  {
    id: '1',
    buildNumber: '#1245',
    commit: 'a3f5c21',
    status: 'success',
    timestamp: '2026-08-13 10:30 AM',
    tests: 1523,
    coverage: '87.5%'
  },
  {
    id: '2',
    buildNumber: '#1244',
    commit: 'b7e2d89',
    status: 'success',
    timestamp: '2026-08-13 09:45 AM',
    tests: 1520,
    coverage: '86.8%'
  },
  {
    id: '3',
    buildNumber: '#1243',
    commit: 'c9a1f34',
    status: 'running',
    timestamp: '2026-08-13 11:00 AM',
    tests: 1521,
    coverage: '87.1%'
  },
  {
    id: '4',
    buildNumber: '#1242',
    commit: 'd5b8e77',
    status: 'failed',
    timestamp: '2026-08-13 08:15 AM',
    tests: 1518,
    coverage: '85.3%'
  },
  {
    id: '5',
    buildNumber: '#1241',
    commit: 'e2c4f91',
    status: 'success',
    timestamp: '2026-08-13 07:00 AM',
    tests: 1519,
    coverage: '86.5%'
  }
]

export default function Setup() {
  const [activeTab, setActiveTab] = useState<'pipelines' | 'deployments' | 'builds'>('pipelines')

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'success':
      case 'deployed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'running':
      case 'deploying':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      case 'rolled-back':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CI/CD Setup & Deployment</h1>
          <p className="text-gray-600">Manage your continuous integration and deployment pipelines</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-2">Active Pipelines</div>
            <div className="text-3xl font-bold text-gray-900">5</div>
            <div className="text-sm text-green-600 mt-2">3 successful</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-2">Deployments Today</div>
            <div className="text-3xl font-bold text-gray-900">5</div>
            <div className="text-sm text-blue-600 mt-2">1 in progress</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-2">Test Coverage</div>
            <div className="text-3xl font-bold text-gray-900">87%</div>
            <div className="text-sm text-green-600 mt-2">+2% this week</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-2">Failed Builds</div>
            <div className="text-3xl font-bold text-gray-900">1</div>
            <div className="text-sm text-red-600 mt-2">Needs attention</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('pipelines')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'pipelines'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pipelines
              </button>
              <button
                onClick={() => setActiveTab('deployments')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'deployments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Deployments
              </button>
              <button
                onClick={() => setActiveTab('builds')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'builds'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Build History
              </button>
            </div>
          </div>

          {/* Pipelines Tab */}
          {activeTab === 'pipelines' && (
            <div className="p-6">
              <div className="space-y-4">
                {mockPipelines.map((pipeline) => (
                  <div key={pipeline.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">{pipeline.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pipeline.status)}`}>
                            {pipeline.status}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center space-x-6 text-sm text-gray-600">
                          <span>Branch: <span className="font-medium">{pipeline.branch}</span></span>
                          <span>Environment: <span className="font-medium">{pipeline.environment}</span></span>
                          <span>Duration: {pipeline.duration}</span>
                          <span>Last run: {pipeline.lastRun}</span>
                        </div>
                      </div>
                      <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                        Run Pipeline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deployments Tab */}
          {activeTab === 'deployments' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
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
                        Timestamp
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
                    {mockDeployments.map((deployment) => (
                      <tr key={deployment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{deployment.environment}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{deployment.version}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deployment.status)}`}>
                            {deployment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deployment.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deployment.deployedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
                            Rollback
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Build History Tab */}
          {activeTab === 'builds' && (
            <div className="p-6">
              <div className="space-y-4">
                {mockBuildHistory.map((build) => (
                  <div key={build.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl font-bold text-gray-700">{build.buildNumber}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(build.status)}`}>
                              {build.status}
                            </span>
                            <span className="text-sm text-gray-600">Commit: <span className="font-mono font-medium">{build.commit}</span></span>
                          </div>
                          <div className="mt-1 flex items-center space-x-6 text-sm text-gray-600">
                            <span>Tests: <span className="font-medium">{build.tests}</span></span>
                            <span>Coverage: <span className="font-medium">{build.coverage}</span></span>
                            <span>{build.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                          View Logs
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                          Rebuild
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Configuration Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pipeline Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Automated Tests</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Run unit tests on every commit</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Run integration tests before deployment</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Run end-to-end tests on staging</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Deployment Options</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Auto-deploy to development</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Auto-deploy to staging</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Require approval for production</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
