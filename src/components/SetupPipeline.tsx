import React, { useState } from 'react'

interface PipelineStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'success' | 'failed'
  duration: string
  description: string
}

interface Pipeline {
  id: string
  name: string
  branch: string
  trigger: string
  lastRun: string
  steps: PipelineStep[]
}

const MOCK_PIPELINES: Pipeline[] = [
  {
    id: 'pipeline-1',
    name: 'Production Build',
    branch: 'main',
    trigger: 'push',
    lastRun: '2026-08-12 10:30 AM',
    steps: [
      { id: 'step-1', name: 'Checkout Code', status: 'success', duration: '5s', description: 'Clone repository and checkout branch' },
      { id: 'step-2', name: 'Install Dependencies', status: 'success', duration: '45s', description: 'npm install' },
      { id: 'step-3', name: 'Run Tests', status: 'success', duration: '2m 15s', description: 'Execute unit and integration tests' },
      { id: 'step-4', name: 'Build', status: 'success', duration: '1m 30s', description: 'Build production bundle' },
      { id: 'step-5', name: 'Deploy', status: 'success', duration: '45s', description: 'Deploy to production' }
    ]
  },
  {
    id: 'pipeline-2',
    name: 'Staging Deployment',
    branch: 'develop',
    trigger: 'pull_request',
    lastRun: '2026-08-12 09:15 AM',
    steps: [
      { id: 'step-6', name: 'Checkout Code', status: 'success', duration: '4s', description: 'Clone repository and checkout branch' },
      { id: 'step-7', name: 'Install Dependencies', status: 'success', duration: '42s', description: 'npm install' },
      { id: 'step-8', name: 'Lint Code', status: 'success', duration: '20s', description: 'Run ESLint and Prettier' },
      { id: 'step-9', name: 'Run Tests', status: 'failed', duration: '1m 05s', description: 'Execute unit and integration tests' },
      { id: 'step-10', name: 'Build', status: 'pending', duration: '-', description: 'Build staging bundle' }
    ]
  },
  {
    id: 'pipeline-3',
    name: 'Security Scan',
    branch: 'main',
    trigger: 'schedule',
    lastRun: '2026-08-12 08:00 AM',
    steps: [
      { id: 'step-11', name: 'Checkout Code', status: 'success', duration: '5s', description: 'Clone repository and checkout branch' },
      { id: 'step-12', name: 'Dependency Audit', status: 'success', duration: '30s', description: 'Check for vulnerable dependencies' },
      { id: 'step-13', name: 'SAST Scan', status: 'success', duration: '3m 10s', description: 'Static application security testing' },
      { id: 'step-14', name: 'Container Scan', status: 'success', duration: '1m 45s', description: 'Scan Docker images for vulnerabilities' },
      { id: 'step-15', name: 'Generate Report', status: 'success', duration: '15s', description: 'Create security report' }
    ]
  },
  {
    id: 'pipeline-4',
    name: 'Feature Branch Build',
    branch: 'feature/user-auth',
    trigger: 'push',
    lastRun: '2026-08-12 11:45 AM',
    steps: [
      { id: 'step-16', name: 'Checkout Code', status: 'success', duration: '4s', description: 'Clone repository and checkout branch' },
      { id: 'step-17', name: 'Install Dependencies', status: 'success', duration: '40s', description: 'npm install' },
      { id: 'step-18', name: 'Type Check', status: 'running', duration: '25s', description: 'TypeScript compilation check' },
      { id: 'step-19', name: 'Run Tests', status: 'pending', duration: '-', description: 'Execute unit and integration tests' },
      { id: 'step-20', name: 'Build Preview', status: 'pending', duration: '-', description: 'Build preview environment' }
    ]
  },
  {
    id: 'pipeline-5',
    name: 'E2E Testing',
    branch: 'main',
    trigger: 'schedule',
    lastRun: '2026-08-12 07:00 AM',
    steps: [
      { id: 'step-21', name: 'Checkout Code', status: 'success', duration: '5s', description: 'Clone repository and checkout branch' },
      { id: 'step-22', name: 'Install Dependencies', status: 'success', duration: '50s', description: 'npm install and playwright install' },
      { id: 'step-23', name: 'Start Test Server', status: 'success', duration: '20s', description: 'Start application server' },
      { id: 'step-24', name: 'Run E2E Tests', status: 'success', duration: '5m 30s', description: 'Execute end-to-end tests' },
      { id: 'step-25', name: 'Upload Artifacts', status: 'success', duration: '10s', description: 'Upload screenshots and videos' }
    ]
  }
]

export default function SetupPipeline() {
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(MOCK_PIPELINES[0])
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set())

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✓'
      case 'failed':
        return '✗'
      case 'running':
        return '⟳'
      case 'pending':
        return '○'
      default:
        return '○'
    }
  }

  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev)
      if (newSet.has(stepId)) {
        newSet.delete(stepId)
      } else {
        newSet.add(stepId)
      }
      return newSet
    })
  }

  const getOverallStatus = (pipeline: Pipeline) => {
    if (pipeline.steps.some(step => step.status === 'failed')) return 'failed'
    if (pipeline.steps.some(step => step.status === 'running')) return 'running'
    if (pipeline.steps.every(step => step.status === 'success')) return 'success'
    return 'pending'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CI/CD Pipeline Setup</h1>
          <p className="text-gray-600">Configure and monitor your continuous integration and deployment pipelines</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pipelines</h2>
              <div className="space-y-3">
                {MOCK_PIPELINES.map(pipeline => {
                  const overallStatus = getOverallStatus(pipeline)
                  return (
                    <button
                      key={pipeline.id}
                      onClick={() => setSelectedPipeline(pipeline)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedPipeline?.id === pipeline.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{pipeline.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(overallStatus)}`}>
                          {getStatusIcon(overallStatus)} {overallStatus}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Branch:</span>
                          <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{pipeline.branch}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Trigger:</span>
                          <span>{pipeline.trigger}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Last run: {pipeline.lastRun}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Pipeline Details */}
          <div className="lg:col-span-2">
            {selectedPipeline ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPipeline.name}</h2>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Run Pipeline
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-600 mb-1">Branch</div>
                      <div className="font-mono font-semibold text-gray-900">{selectedPipeline.branch}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-600 mb-1">Trigger</div>
                      <div className="font-semibold text-gray-900 capitalize">{selectedPipeline.trigger.replace('_', ' ')}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-gray-600 mb-1">Last Run</div>
                      <div className="font-semibold text-gray-900">{selectedPipeline.lastRun}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Steps</h3>
                  <div className="space-y-3">
                    {selectedPipeline.steps.map((step, index) => (
                      <div key={step.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleStepExpansion(step.id)}
                          className="w-full p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-semibold text-gray-700">
                                {index + 1}
                              </div>
                              <div className="text-left">
                                <h4 className="font-semibold text-gray-900">{step.name}</h4>
                                <div className="text-sm text-gray-600 mt-1">Duration: {step.duration}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-sm px-3 py-1 rounded-full border font-medium ${getStatusColor(step.status)}`}>
                                {getStatusIcon(step.status)} {step.status}
                              </span>
                              <span className="text-gray-400">
                                {expandedSteps.has(step.id) ? '▼' : '▶'}
                              </span>
                            </div>
                          </div>
                        </button>
                        {expandedSteps.has(step.id) && (
                          <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                            <p className="text-sm text-gray-700">{step.description}</p>
                            <div className="mt-3 flex gap-2">
                              <button className="text-xs px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                View Logs
                              </button>
                              <button className="text-xs px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                Retry Step
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Pipeline Configuration</h3>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`name: ${selectedPipeline.name}
on:
  ${selectedPipeline.trigger}: 
    branches: [${selectedPipeline.branch}]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:${selectedPipeline.steps.map((step, i) => `
      - name: ${step.name}
        run: # ${step.description}`).join('')}`}</pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">
                Select a pipeline to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
