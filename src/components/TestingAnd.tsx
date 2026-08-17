/**
 * TestingAnd — Testing and deployment setup dashboard for managing test configurations and deployment pipelines
 *
 * Features: test suite management, deployment environment configuration, test coverage display, pipeline status monitoring, deployment history
 *
 * Ticket: SCRUM-1004 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface TestSuite {
  id: string
  name: string
  type: 'unit' | 'integration' | 'e2e'
  coverage: number
  lastRun: string
  status: 'passing' | 'failing' | 'pending'
  tests: number
  failed: number
}

interface DeploymentEnvironment {
  id: string
  name: string
  status: 'active' | 'inactive' | 'deploying'
  lastDeployment: string
  version: string
  health: 'healthy' | 'warning' | 'critical'
}

const MOCK_TEST_SUITES: TestSuite[] = [
  {
    id: '1',
    name: 'Unit Tests',
    type: 'unit',
    coverage: 87,
    lastRun: '2026-08-17 10:30',
    status: 'passing',
    tests: 342,
    failed: 0
  },
  {
    id: '2',
    name: 'Integration Tests',
    type: 'integration',
    coverage: 72,
    lastRun: '2026-08-17 10:15',
    status: 'passing',
    tests: 156,
    failed: 0
  },
  {
    id: '3',
    name: 'E2E Tests',
    type: 'e2e',
    coverage: 65,
    lastRun: '2026-08-17 09:45',
    status: 'failing',
    tests: 89,
    failed: 3
  },
  {
    id: '4',
    name: 'API Tests',
    type: 'integration',
    coverage: 91,
    lastRun: '2026-08-17 10:00',
    status: 'passing',
    tests: 234,
    failed: 0
  },
  {
    id: '5',
    name: 'Component Tests',
    type: 'unit',
    coverage: 78,
    lastRun: '2026-08-17 09:30',
    status: 'pending',
    tests: 178,
    failed: 0
  }
]

const MOCK_ENVIRONMENTS: DeploymentEnvironment[] = [
  {
    id: '1',
    name: 'Production',
    status: 'active',
    lastDeployment: '2026-08-16 14:30',
    version: 'v2.4.1',
    health: 'healthy'
  },
  {
    id: '2',
    name: 'Staging',
    status: 'active',
    lastDeployment: '2026-08-17 08:15',
    version: 'v2.5.0-rc1',
    health: 'healthy'
  },
  {
    id: '3',
    name: 'QA',
    status: 'deploying',
    lastDeployment: '2026-08-17 11:00',
    version: 'v2.5.0-rc2',
    health: 'warning'
  },
  {
    id: '4',
    name: 'Development',
    status: 'active',
    lastDeployment: '2026-08-17 10:45',
    version: 'v2.5.0-dev',
    health: 'healthy'
  },
  {
    id: '5',
    name: 'Preview',
    status: 'inactive',
    lastDeployment: '2026-08-15 16:20',
    version: 'v2.4.0',
    health: 'critical'
  }
]

export default function TestingAnd() {
  const [selectedTab, setSelectedTab] = useState<'tests' | 'deployments'>('tests')
  const [selectedTestType, setSelectedTestType] = useState<string>('all')

  const filteredTestSuites = selectedTestType === 'all'
    ? MOCK_TEST_SUITES
    : MOCK_TEST_SUITES.filter(suite => suite.type === selectedTestType)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passing':
      case 'healthy':
      case 'active':
        return 'text-green-600 bg-green-50'
      case 'failing':
      case 'critical':
        return 'text-red-600 bg-red-50'
      case 'pending':
      case 'warning':
      case 'deploying':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const totalCoverage = Math.round(
    MOCK_TEST_SUITES.reduce((sum, suite) => sum + suite.coverage, 0) / MOCK_TEST_SUITES.length
  )

  const passingTests = MOCK_TEST_SUITES.filter(suite => suite.status === 'passing').length
  const failingTests = MOCK_TEST_SUITES.filter(suite => suite.status === 'failing').length

  return (
    <div data-testid="testingand" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Testing & Deployment Setup</h1>
          <p className="text-gray-600">Manage test configurations and deployment pipelines</p>
        </header>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">Average Coverage</p>
            <p className="text-3xl font-bold text-blue-600">{totalCoverage}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">Passing Tests</p>
            <p className="text-3xl font-bold text-green-600">{passingTests}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">Failing Tests</p>
            <p className="text-3xl font-bold text-red-600">{failingTests}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600 mb-1">Active Environments</p>
            <p className="text-3xl font-bold text-gray-900">
              {MOCK_ENVIRONMENTS.filter(env => env.status === 'active').length}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200">
            <button
              data-testid="testingand-tab-tests"
              onClick={() => setSelectedTab('tests')}
              className={`px-6 py-3 text-sm font-medium focus:outline-none transition-colors ${
                selectedTab === 'tests'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Test Suites
            </button>
            <button
              data-testid="testingand-tab-deployments"
              onClick={() => setSelectedTab('deployments')}
              className={`px-6 py-3 text-sm font-medium focus:outline-none transition-colors ${
                selectedTab === 'deployments'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Deployment Environments
            </button>
          </div>

          {/* Test Suites Tab */}
          {selectedTab === 'tests' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="test-type-filter" className="text-sm font-medium text-gray-700">
                    Filter by type:
                  </label>
                  <select
                    id="test-type-filter"
                    data-testid="testingand-test-type"
                    value={selectedTestType}
                    onChange={(e) => setSelectedTestType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="unit">Unit Tests</option>
                    <option value="integration">Integration Tests</option>
                    <option value="e2e">E2E Tests</option>
                  </select>
                </div>
                <button
                  data-testid="testingand-run-all"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Run All Tests
                </button>
              </div>

              <div data-testid="testingand-list" className="space-y-3">
                {filteredTestSuites.map(suite => (
                  <div
                    key={suite.id}
                    data-testid="testingand-item"
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{suite.name}</h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              suite.status
                            )}`}
                          >
                            {suite.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>Type: <span className="font-medium">{suite.type}</span></span>
                          <span>Tests: <span className="font-medium">{suite.tests}</span></span>
                          {suite.failed > 0 && (
                            <span className="text-red-600">Failed: <span className="font-medium">{suite.failed}</span></span>
                          )}
                          <span>Coverage: <span className="font-medium">{suite.coverage}%</span></span>
                          <span>Last Run: <span className="font-medium">{suite.lastRun}</span></span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          data-testid="testingand-run"
                          className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Run
                        </button>
                        <button
                          data-testid="testingand-configure"
                          className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${suite.coverage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deployment Environments Tab */}
          {selectedTab === 'deployments' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Deployment Environments</h2>
                <button
                  data-testid="testingand-add-environment"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Add Environment
                </button>
              </div>

              <div data-testid="testingand-environment-list" className="space-y-3">
                {MOCK_ENVIRONMENTS.map(env => (
                  <div
                    key={env.id}
                    data-testid="testingand-environment-item"
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{env.name}</h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              env.status
                            )}`}
                          >
                            {env.status}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              env.health
                            )}`}
                          >
                            {env.health}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>Version: <span className="font-medium">{env.version}</span></span>
                          <span>Last Deployment: <span className="font-medium">{env.lastDeployment}</span></span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          data-testid="testingand-deploy"
                          className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Deploy
                        </button>
                        <button
                          data-testid="testingand-settings"
                          className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                          Settings
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              data-testid="testingand-generate-report"
              className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Generate Test Report
            </button>
            <button
              data-testid="testingand-rollback"
              className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Rollback Deployment
            </button>
            <button
              data-testid="testingand-view-logs"
              className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              View Deployment Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
