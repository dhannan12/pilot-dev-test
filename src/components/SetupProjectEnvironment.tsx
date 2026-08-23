/**
 * SetupProjectEnvironment — Project environment and CI/CD pipeline configuration dashboard
 *
 * Features: environment setup steps, pipeline status monitoring, config validation, deployment targets, build history
 *
 * Ticket: SCRUM-1162 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface EnvironmentConfig {
  id: string
  name: string
  key: string
  value: string
  isSecure: boolean
}

interface PipelineStep {
  id: string
  name: string
  status: 'success' | 'running' | 'pending' | 'failed'
  duration: string
}

interface BuildHistory {
  id: string
  buildNumber: string
  branch: string
  status: 'success' | 'failed'
  timestamp: string
  duration: string
}

interface DeploymentTarget {
  id: string
  environment: string
  url: string
  status: 'active' | 'inactive'
  lastDeployed: string
}

const mockEnvironmentConfigs: EnvironmentConfig[] = [
  { id: '1', name: 'Database URL', key: 'DATABASE_URL', value: 'postgresql://localhost:5432/coffee_shop', isSecure: true },
  { id: '2', name: 'API Key', key: 'API_KEY', value: '••••••••••••', isSecure: true },
  { id: '3', name: 'Node Environment', key: 'NODE_ENV', value: 'production', isSecure: false },
  { id: '4', name: 'Port', key: 'PORT', value: '3000', isSecure: false },
  { id: '5', name: 'JWT Secret', key: 'JWT_SECRET', value: '••••••••••••', isSecure: true },
  { id: '6', name: 'Stripe Key', key: 'STRIPE_PUBLIC_KEY', value: 'pk_test_••••••••••••', isSecure: true },
  { id: '7', name: 'Email Service', key: 'EMAIL_SERVICE', value: 'sendgrid', isSecure: false }
]

const mockPipelineSteps: PipelineStep[] = [
  { id: '1', name: 'Install Dependencies', status: 'success', duration: '45s' },
  { id: '2', name: 'Run Linters', status: 'success', duration: '12s' },
  { id: '3', name: 'Build Application', status: 'success', duration: '2m 34s' },
  { id: '4', name: 'Run Tests', status: 'success', duration: '1m 18s' },
  { id: '5', name: 'Deploy to Staging', status: 'running', duration: '1m 02s' },
  { id: '6', name: 'Integration Tests', status: 'pending', duration: '-' },
  { id: '7', name: 'Deploy to Production', status: 'pending', duration: '-' }
]

const mockBuildHistory: BuildHistory[] = [
  { id: '1', buildNumber: '#147', branch: 'main', status: 'success', timestamp: '2 hours ago', duration: '4m 32s' },
  { id: '2', buildNumber: '#146', branch: 'feat/rewards', status: 'success', timestamp: '5 hours ago', duration: '4m 18s' },
  { id: '3', buildNumber: '#145', branch: 'main', status: 'failed', timestamp: '8 hours ago', duration: '2m 12s' },
  { id: '4', buildNumber: '#144', branch: 'fix/payment', status: 'success', timestamp: '1 day ago', duration: '4m 45s' },
  { id: '5', buildNumber: '#143', branch: 'main', status: 'success', timestamp: '1 day ago', duration: '4m 28s' },
  { id: '6', buildNumber: '#142', branch: 'feat/loyalty', status: 'success', timestamp: '2 days ago', duration: '4m 55s' }
]

const mockDeploymentTargets: DeploymentTarget[] = [
  { id: '1', environment: 'Development', url: 'https://dev.coffeeshop.com', status: 'active', lastDeployed: '1 hour ago' },
  { id: '2', environment: 'Staging', url: 'https://staging.coffeeshop.com', status: 'active', lastDeployed: '2 hours ago' },
  { id: '3', environment: 'QA', url: 'https://qa.coffeeshop.com', status: 'active', lastDeployed: '3 hours ago' },
  { id: '4', environment: 'Production', url: 'https://coffeeshop.com', status: 'active', lastDeployed: '1 day ago' },
  { id: '5', environment: 'Preview', url: 'https://preview.coffeeshop.com', status: 'inactive', lastDeployed: '3 days ago' }
]

export default function SetupProjectEnvironment() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'config' | 'deployments' | 'builds'>('pipeline')
  const [showSecure, setShowSecure] = useState(false)

  return (
    <div data-testid="setupprojectenvironment" className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Project Environment & CI/CD</h1>
          <p className="text-gray-600">Configure and monitor your development pipeline</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-4">
          <div className="flex space-x-4">
            <button
              data-testid="setupprojectenvironment-pipeline-tab"
              onClick={() => setActiveTab('pipeline')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'pipeline'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pipeline Status
            </button>
            <button
              data-testid="setupprojectenvironment-config-tab"
              onClick={() => setActiveTab('config')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'config'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Environment Config
            </button>
            <button
              data-testid="setupprojectenvironment-deployments-tab"
              onClick={() => setActiveTab('deployments')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'deployments'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Deployments
            </button>
            <button
              data-testid="setupprojectenvironment-builds-tab"
              onClick={() => setActiveTab('builds')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === 'builds'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Build History
            </button>
          </div>
        </div>

        {/* Pipeline Status Tab */}
        {activeTab === 'pipeline' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Current Pipeline</h2>
              <button
                data-testid="setupprojectenvironment-run-pipeline"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                Run Pipeline
              </button>
            </div>
            <ul data-testid="setupprojectenvironment-pipeline-list" className="space-y-4">
              {mockPipelineSteps.map((step) => (
                <li
                  key={step.id}
                  data-testid="setupprojectenvironment-pipeline-item"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        step.status === 'success'
                          ? 'bg-green-500'
                          : step.status === 'running'
                          ? 'bg-blue-500 animate-pulse'
                          : step.status === 'failed'
                          ? 'bg-red-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className="font-semibold text-gray-900">{step.name}</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-gray-600">{step.duration}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        step.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : step.status === 'running'
                          ? 'bg-blue-100 text-blue-800'
                          : step.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Environment Config Tab */}
        {activeTab === 'config' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Environment Variables</h2>
              <div className="flex space-x-3">
                <button
                  data-testid="setupprojectenvironment-toggle-secure"
                  onClick={() => setShowSecure(!showSecure)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
                >
                  {showSecure ? 'Hide' : 'Show'} Secure Values
                </button>
                <button
                  data-testid="setupprojectenvironment-add-config"
                  className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
                >
                  Add Variable
                </button>
              </div>
            </div>
            <ul data-testid="setupprojectenvironment-config-list" className="space-y-3">
              {mockEnvironmentConfigs.map((config) => (
                <li
                  key={config.id}
                  data-testid="setupprojectenvironment-config-item"
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-gray-900">{config.name}</span>
                        {config.isSecure && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-semibold">
                            Secure
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">{config.key}</span>
                        <span className="mx-2">=</span>
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                          {config.isSecure && !showSecure ? '••••••••••••' : config.value}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        data-testid="setupprojectenvironment-edit-config"
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        data-testid="setupprojectenvironment-delete-config"
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Deployments Tab */}
        {activeTab === 'deployments' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Deployment Targets</h2>
              <button
                data-testid="setupprojectenvironment-add-target"
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
              >
                Add Target
              </button>
            </div>
            <ul data-testid="setupprojectenvironment-deployments-list" className="space-y-4">
              {mockDeploymentTargets.map((target) => (
                <li
                  key={target.id}
                  data-testid="setupprojectenvironment-deployment-item"
                  className="p-5 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{target.environment}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            target.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {target.status}
                        </span>
                      </div>
                      <p className="text-sm text-blue-600 mb-2 font-mono">{target.url}</p>
                      <p className="text-sm text-gray-600">Last deployed: {target.lastDeployed}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        data-testid="setupprojectenvironment-deploy-target"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-semibold"
                      >
                        Deploy
                      </button>
                      <button
                        data-testid="setupprojectenvironment-configure-target"
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-semibold"
                      >
                        Configure
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Build History Tab */}
        {activeTab === 'builds' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Builds</h2>
              <button
                data-testid="setupprojectenvironment-clear-history"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
              >
                Clear History
              </button>
            </div>
            <ul data-testid="setupprojectenvironment-builds-list" className="space-y-3">
              {mockBuildHistory.map((build) => (
                <li
                  key={build.id}
                  data-testid="setupprojectenvironment-build-item"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        build.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="font-bold text-gray-900 font-mono">{build.buildNumber}</span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-mono">
                      {build.branch}
                    </span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-gray-600 text-sm">{build.timestamp}</span>
                    <span className="text-gray-600 text-sm">{build.duration}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        build.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {build.status}
                    </span>
                    <button
                      data-testid="setupprojectenvironment-view-build"
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-semibold"
                    >
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
