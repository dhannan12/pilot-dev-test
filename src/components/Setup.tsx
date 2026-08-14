/**
 * Setup — CI/CD pipeline configuration and deployment management dashboard
 *
 * Features: pipeline status, environment config, deployment history, build logs, webhook settings
 *
 * Ticket: SCRUM-840 | Branch: proto/SCRUM-828
 */

import React, { useState } from 'react'

interface Pipeline {
  id: string
  name: string
  status: 'success' | 'failed' | 'running' | 'pending'
  lastRun: string
  duration: string
  branch: string
}

interface Environment {
  id: string
  name: string
  url: string
  status: 'active' | 'inactive' | 'deploying'
  version: string
  lastDeployed: string
}

interface BuildLog {
  id: string
  timestamp: string
  message: string
  level: 'info' | 'warning' | 'error' | 'success'
}

interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  active: boolean
}

interface DeploymentHistory {
  id: string
  environment: string
  version: string
  deployedBy: string
  timestamp: string
  status: 'success' | 'failed' | 'rolled-back'
}

const MOCK_PIPELINES: Pipeline[] = [
  { id: '1', name: 'Build & Test', status: 'success', lastRun: '2026-08-14 10:30 AM', duration: '3m 24s', branch: 'main' },
  { id: '2', name: 'Deploy Staging', status: 'running', lastRun: '2026-08-14 10:35 AM', duration: '1m 45s', branch: 'develop' },
  { id: '3', name: 'Deploy Production', status: 'success', lastRun: '2026-08-14 09:15 AM', duration: '5m 12s', branch: 'main' },
  { id: '4', name: 'Security Scan', status: 'pending', lastRun: '2026-08-14 08:00 AM', duration: '2m 30s', branch: 'main' },
  { id: '5', name: 'Code Quality Check', status: 'failed', lastRun: '2026-08-14 10:20 AM', duration: '4m 05s', branch: 'feature/new-ui' },
]

const MOCK_ENVIRONMENTS: Environment[] = [
  { id: '1', name: 'Production', url: 'https://app.production.com', status: 'active', version: 'v2.4.1', lastDeployed: '2026-08-14 09:15 AM' },
  { id: '2', name: 'Staging', url: 'https://app.staging.com', status: 'deploying', version: 'v2.5.0-rc1', lastDeployed: '2026-08-14 10:35 AM' },
  { id: '3', name: 'Development', url: 'https://app.dev.com', status: 'active', version: 'v2.5.0-dev', lastDeployed: '2026-08-14 10:00 AM' },
  { id: '4', name: 'QA', url: 'https://app.qa.com', status: 'active', version: 'v2.4.2-qa', lastDeployed: '2026-08-14 08:45 AM' },
  { id: '5', name: 'Demo', url: 'https://app.demo.com', status: 'inactive', version: 'v2.3.0', lastDeployed: '2026-08-13 03:30 PM' },
]

const MOCK_BUILD_LOGS: BuildLog[] = [
  { id: '1', timestamp: '10:35:42', message: 'Starting deployment to staging environment', level: 'info' },
  { id: '2', timestamp: '10:35:45', message: 'Building Docker image...', level: 'info' },
  { id: '3', timestamp: '10:36:10', message: 'Image build completed successfully', level: 'success' },
  { id: '4', timestamp: '10:36:15', message: 'Pushing image to registry...', level: 'info' },
  { id: '5', timestamp: '10:36:50', message: 'Warning: High memory usage detected in container', level: 'warning' },
  { id: '6', timestamp: '10:37:05', message: 'Deployment in progress...', level: 'info' },
]

const MOCK_WEBHOOKS: Webhook[] = [
  { id: '1', name: 'Slack Notifications', url: 'https://hooks.slack.com/services/T00/B00/xxx', events: ['deployment.success', 'deployment.failed'], active: true },
  { id: '2', name: 'GitHub Integration', url: 'https://api.github.com/repos/org/app/dispatches', events: ['build.completed', 'test.failed'], active: true },
  { id: '3', name: 'Monitoring Service', url: 'https://monitoring.service.com/webhook', events: ['deployment.started', 'deployment.completed'], active: true },
  { id: '4', name: 'Email Alerts', url: 'https://mail.service.com/api/send', events: ['deployment.failed', 'security.alert'], active: false },
  { id: '5', name: 'PagerDuty', url: 'https://events.pagerduty.com/v2/enqueue', events: ['production.down', 'critical.error'], active: true },
]

const MOCK_DEPLOYMENT_HISTORY: DeploymentHistory[] = [
  { id: '1', environment: 'Production', version: 'v2.4.1', deployedBy: 'Sarah Chen', timestamp: '2026-08-14 09:15 AM', status: 'success' },
  { id: '2', environment: 'Staging', version: 'v2.5.0-rc1', deployedBy: 'Mike Johnson', timestamp: '2026-08-14 10:35 AM', status: 'success' },
  { id: '3', environment: 'Development', version: 'v2.5.0-dev', deployedBy: 'Alex Kumar', timestamp: '2026-08-14 10:00 AM', status: 'success' },
  { id: '4', environment: 'Production', version: 'v2.4.0', deployedBy: 'Sarah Chen', timestamp: '2026-08-13 02:30 PM', status: 'rolled-back' },
  { id: '5', environment: 'QA', version: 'v2.4.2-qa', deployedBy: 'Emma Davis', timestamp: '2026-08-14 08:45 AM', status: 'success' },
]

export default function Setup() {
  const [activeTab, setActiveTab] = useState<'pipelines' | 'environments' | 'logs' | 'webhooks' | 'history'>('pipelines')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'running':
      case 'deploying':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'rolled-back':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'warning':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CI/CD Pipeline & Deployment</h1>
          <p className="text-gray-600">Manage your continuous integration and deployment workflows</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('pipelines')}
              className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'pipelines'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pipelines
            </button>
            <button
              onClick={() => setActiveTab('environments')}
              className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'environments'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Environments
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'logs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Build Logs
            </button>
            <button
              onClick={() => setActiveTab('webhooks')}
              className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'webhooks'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Webhooks
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Pipelines Tab */}
        {activeTab === 'pipelines' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Active Pipelines</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Run Pipeline
              </button>
            </div>
            <div className="grid gap-4">
              {MOCK_PIPELINES.map((pipeline) => (
                <div key={pipeline.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{pipeline.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pipeline.status)}`}>
                          {pipeline.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>Branch: <span className="font-medium">{pipeline.branch}</span></span>
                        <span>Last run: {pipeline.lastRun}</span>
                        <span>Duration: {pipeline.duration}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        View Logs
                      </button>
                      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Re-run
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Environments Tab */}
        {activeTab === 'environments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Deployment Environments</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Environment
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {MOCK_ENVIRONMENTS.map((env) => (
                <div key={env.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{env.name}</h3>
                      <a href={env.url} className="text-sm text-blue-600 hover:underline">{env.url}</a>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(env.status)}`}>
                      {env.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span className="font-medium text-gray-900">{env.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Deployed:</span>
                      <span className="font-medium text-gray-900">{env.lastDeployed}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Configure
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Deploy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Build Logs Tab */}
        {activeTab === 'logs' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Build Logs</h2>
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Clear Logs
              </button>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
              <div className="space-y-2">
                {MOCK_BUILD_LOGS.map((log) => (
                  <div key={log.id} className="flex items-start gap-4">
                    <span className="text-gray-500 shrink-0">{log.timestamp}</span>
                    <span className={`${getLogLevelColor(log.level)} uppercase text-xs font-bold shrink-0`}>
                      [{log.level}]
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Webhooks Tab */}
        {activeTab === 'webhooks' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Webhook Configuration</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Webhook
              </button>
            </div>
            <div className="grid gap-4">
              {MOCK_WEBHOOKS.map((webhook) => (
                <div key={webhook.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          webhook.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {webhook.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{webhook.url}</p>
                      <div className="flex flex-wrap gap-2">
                        {webhook.events.map((event, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deployment History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Deployment History</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
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
                      Deployed By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_DEPLOYMENT_HISTORY.map((deployment) => (
                    <tr key={deployment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {deployment.environment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {deployment.version}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {deployment.deployedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {deployment.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(deployment.status)}`}>
                          {deployment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
