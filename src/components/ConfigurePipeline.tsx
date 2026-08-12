import React, { useState } from 'react'

interface PipelineStage {
  id: string
  name: string
  status: 'pending' | 'running' | 'success' | 'failed'
  duration: string
}

interface Environment {
  id: string
  name: string
  type: 'development' | 'staging' | 'production'
  status: 'active' | 'inactive'
  lastDeployed: string
  url: string
}

const mockPipelineStages: PipelineStage[] = [
  { id: '1', name: 'Build', status: 'success', duration: '2m 15s' },
  { id: '2', name: 'Test', status: 'success', duration: '1m 43s' },
  { id: '3', name: 'Security Scan', status: 'running', duration: '0m 32s' },
  { id: '4', name: 'Deploy to Staging', status: 'pending', duration: '--' },
  { id: '5', name: 'Deploy to Production', status: 'pending', duration: '--' },
]

const mockEnvironments: Environment[] = [
  {
    id: '1',
    name: 'Development',
    type: 'development',
    status: 'active',
    lastDeployed: '2026-08-12 09:30 AM',
    url: 'https://dev.hairsaloon.com',
  },
  {
    id: '2',
    name: 'Staging',
    type: 'staging',
    status: 'active',
    lastDeployed: '2026-08-12 08:15 AM',
    url: 'https://staging.hairsaloon.com',
  },
  {
    id: '3',
    name: 'Production',
    type: 'production',
    status: 'active',
    lastDeployed: '2026-08-11 06:00 PM',
    url: 'https://www.hairsaloon.com',
  },
  {
    id: '4',
    name: 'QA',
    type: 'staging',
    status: 'active',
    lastDeployed: '2026-08-12 07:45 AM',
    url: 'https://qa.hairsaloon.com',
  },
  {
    id: '5',
    name: 'Demo',
    type: 'staging',
    status: 'inactive',
    lastDeployed: '2026-08-10 03:20 PM',
    url: 'https://demo.hairsaloon.com',
  },
]

export default function ConfigurePipeline() {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('1')
  const [autoDeployEnabled, setAutoDeployEnabled] = useState<boolean>(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'running':
        return 'bg-blue-500 animate-pulse'
      case 'failed':
        return 'bg-red-500'
      case 'pending':
        return 'bg-gray-300'
      default:
        return 'bg-gray-400'
    }
  }

  const getEnvironmentBadgeColor = (type: string) => {
    switch (type) {
      case 'production':
        return 'bg-red-100 text-red-800'
      case 'staging':
        return 'bg-yellow-100 text-yellow-800'
      case 'development':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CI/CD Pipeline Configuration
          </h1>
          <p className="text-gray-600">
            Configure and monitor your deployment pipeline and environments
          </p>
        </div>

        {/* Pipeline Stages */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Pipeline Stages
          </h2>
          <div className="space-y-4">
            {mockPipelineStages.map((stage, index) => (
              <div key={stage.id} className="flex items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full ${getStatusColor(
                      stage.status
                    )} flex items-center justify-center text-white font-semibold`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{stage.name}</h3>
                    <p className="text-sm text-gray-500">
                      Duration: {stage.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        stage.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : stage.status === 'running'
                          ? 'bg-blue-100 text-blue-800'
                          : stage.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {stage.status.charAt(0).toUpperCase() +
                        stage.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environments */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Environments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockEnvironments.map((env) => (
              <div
                key={env.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedEnvironment === env.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedEnvironment(env.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{env.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getEnvironmentBadgeColor(
                      env.type
                    )}`}
                  >
                    {env.type}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        env.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    ></span>
                    <span className="text-sm text-gray-600">
                      {env.status.charAt(0).toUpperCase() + env.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Last deployed: {env.lastDeployed}
                  </p>
                  <a
                    href={env.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline block truncate"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {env.url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Options */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Pipeline Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">
                  Auto-Deploy to Staging
                </h3>
                <p className="text-sm text-gray-600">
                  Automatically deploy successful builds to staging environment
                </p>
              </div>
              <button
                onClick={() => setAutoDeployEnabled(!autoDeployEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoDeployEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoDeployEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">
                  Run Tests in Parallel
                </h3>
                <p className="text-sm text-gray-600">
                  Speed up test execution by running them in parallel
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">
                  Notify on Failure
                </h3>
                <p className="text-sm text-gray-600">
                  Send notifications when pipeline stages fail
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Save Configuration
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
