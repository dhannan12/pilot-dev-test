/**
 * Setup — CI/CD pipeline configuration and management interface
 *
 * Features: pipeline stages, build status, deployment environments, configuration settings, action logs
 *
 * Ticket: SCRUM-852 | Branch: proto/SCRUM-841
 */

import React, { useState } from 'react'

interface PipelineStage {
  id: string
  name: string
  status: 'pending' | 'running' | 'success' | 'failed'
  duration: string
  timestamp: string
}

interface Environment {
  id: string
  name: string
  url: string
  status: 'active' | 'inactive'
  lastDeployed: string
}

interface BuildLog {
  id: string
  message: string
  timestamp: string
  level: 'info' | 'warning' | 'error'
}

const MOCK_PIPELINE_STAGES: PipelineStage[] = [
  { id: '1', name: 'Build', status: 'success', duration: '2m 15s', timestamp: '2026-08-14 10:30:00' },
  { id: '2', name: 'Test', status: 'success', duration: '1m 45s', timestamp: '2026-08-14 10:32:15' },
  { id: '3', name: 'Security Scan', status: 'running', duration: '0m 30s', timestamp: '2026-08-14 10:34:00' },
  { id: '4', name: 'Deploy to Staging', status: 'pending', duration: '0m 0s', timestamp: '' },
  { id: '5', name: 'Deploy to Production', status: 'pending', duration: '0m 0s', timestamp: '' },
]

const MOCK_ENVIRONMENTS: Environment[] = [
  { id: '1', name: 'Development', url: 'https://dev.example.com', status: 'active', lastDeployed: '2026-08-14 09:15:00' },
  { id: '2', name: 'Staging', url: 'https://staging.example.com', status: 'active', lastDeployed: '2026-08-14 08:30:00' },
  { id: '3', name: 'Production', url: 'https://example.com', status: 'active', lastDeployed: '2026-08-13 16:00:00' },
  { id: '4', name: 'QA', url: 'https://qa.example.com', status: 'active', lastDeployed: '2026-08-14 07:45:00' },
  { id: '5', name: 'Demo', url: 'https://demo.example.com', status: 'inactive', lastDeployed: '2026-08-12 14:20:00' },
]

const MOCK_BUILD_LOGS: BuildLog[] = [
  { id: '1', message: 'Pipeline started for branch proto/SCRUM-841', timestamp: '10:30:00', level: 'info' },
  { id: '2', message: 'Building Docker image...', timestamp: '10:30:15', level: 'info' },
  { id: '3', message: 'Running unit tests...', timestamp: '10:32:15', level: 'info' },
  { id: '4', message: 'All tests passed (47/47)', timestamp: '10:33:45', level: 'info' },
  { id: '5', message: 'Starting security scan...', timestamp: '10:34:00', level: 'info' },
  { id: '6', message: 'Warning: Deprecated dependency detected', timestamp: '10:34:15', level: 'warning' },
]

export default function Setup() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'environments' | 'logs'>('pipeline')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'running':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
      case 'error':
        return 'bg-red-100 text-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✓'
      case 'running':
        return '⟳'
      case 'failed':
        return '✗'
      case 'pending':
        return '○'
      default:
        return '○'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CI/CD Pipeline Setup</h1>
          <p className="text-gray-600">Configure and monitor your continuous integration and deployment pipeline</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Builds</div>
            <div className="text-3xl font-bold text-gray-900">1,247</div>
            <div className="text-xs text-green-600 mt-1">↑ 12% this week</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Success Rate</div>
            <div className="text-3xl font-bold text-gray-900">94.2%</div>
            <div className="text-xs text-green-600 mt-1">↑ 2.1% from last month</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Avg Build Time</div>
            <div className="text-3xl font-bold text-gray-900">4m 12s</div>
            <div className="text-xs text-red-600 mt-1">↑ 15s slower</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Active Environments</div>
            <div className="text-3xl font-bold text-gray-900">4</div>
            <div className="text-xs text-gray-600 mt-1">1 inactive</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('pipeline')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'pipeline'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pipeline Stages
              </button>
              <button
                onClick={() => setActiveTab('environments')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'environments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Environments
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'logs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Build Logs
              </button>
            </nav>
          </div>

          {/* Pipeline Stages Tab */}
          {activeTab === 'pipeline' && (
            <div className="p-6">
              <div className="space-y-4">
                {MOCK_PIPELINE_STAGES.map((stage, index) => (
                  <div key={stage.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center flex-1">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{stage.name}</h3>
                        {stage.timestamp && (
                          <p className="text-sm text-gray-500">Started: {stage.timestamp}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right mr-6">
                      <div className="text-sm font-medium text-gray-900">{stage.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stage.status)}`}>
                        <span className="mr-1">{getStatusIcon(stage.status)}</span>
                        {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancel Pipeline
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Retry Failed Stages
                </button>
              </div>
            </div>
          )}

          {/* Environments Tab */}
          {activeTab === 'environments' && (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {MOCK_ENVIRONMENTS.map((env) => (
                  <div key={env.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">{env.name}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(env.status)}`}>
                          {env.status.charAt(0).toUpperCase() + env.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-blue-600 hover:underline mb-1">{env.url}</p>
                      <p className="text-xs text-gray-500">Last deployed: {env.lastDeployed}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        Configure
                      </button>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                        Deploy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  + Add Environment
                </button>
              </div>
            </div>
          )}

          {/* Build Logs Tab */}
          {activeTab === 'logs' && (
            <div className="p-6">
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                {MOCK_BUILD_LOGS.map((log) => (
                  <div key={log.id} className="flex items-start mb-2">
                    <span className="text-gray-500 mr-3">[{log.timestamp}]</span>
                    <span className={`mr-3 font-semibold ${
                      log.level === 'error' ? 'text-red-400' :
                      log.level === 'warning' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
                <div className="flex items-start">
                  <span className="text-gray-500 mr-3">[10:34:30]</span>
                  <span className="text-green-400 mr-3 font-semibold">INFO</span>
                  <span className="text-gray-300">Scanning dependencies... <span className="animate-pulse">▋</span></span>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Download Logs
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Clear Console
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pipeline Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trigger Branch
              </label>
              <input
                type="text"
                value="proto/SCRUM-841"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Build Timeout
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                <option>10 minutes</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>60 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Email
              </label>
              <input
                type="email"
                placeholder="team@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-deploy to
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900">
                <option>None (Manual)</option>
                <option>Development</option>
                <option>Staging</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
