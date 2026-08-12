/**
 * Pipeline — CI/CD pipeline and deployment setup visualization
 *
 * Features: pipeline stages, build status, deployment tracking, execution history, stage details
 *
 * Ticket: SCRUM-672 | Branch: proto/SCRUM-658
 */

import React, { useState } from 'react'

interface PipelineStage {
  id: string
  name: string
  status: 'success' | 'running' | 'failed' | 'pending' | 'skipped'
  duration: string
  timestamp: string
}

interface PipelineRun {
  id: string
  runNumber: number
  branch: string
  commit: string
  author: string
  status: 'success' | 'running' | 'failed' | 'pending'
  stages: PipelineStage[]
  startedAt: string
  duration: string
}

const MOCK_PIPELINES: PipelineRun[] = [
  {
    id: 'run-001',
    runNumber: 245,
    branch: 'main',
    commit: 'a3f4b2c',
    author: 'Sarah Chen',
    status: 'success',
    startedAt: '2026-08-12 10:45:00',
    duration: '8m 32s',
    stages: [
      { id: 's1', name: 'Build', status: 'success', duration: '2m 15s', timestamp: '10:45:00' },
      { id: 's2', name: 'Test', status: 'success', duration: '3m 42s', timestamp: '10:47:15' },
      { id: 's3', name: 'Security Scan', status: 'success', duration: '1m 28s', timestamp: '10:50:57' },
      { id: 's4', name: 'Deploy Staging', status: 'success', duration: '1m 07s', timestamp: '10:52:25' }
    ]
  },
  {
    id: 'run-002',
    runNumber: 244,
    branch: 'feature/auth-upgrade',
    commit: 'b7e9d1a',
    author: 'Mike Johnson',
    status: 'running',
    startedAt: '2026-08-12 09:30:00',
    duration: '4m 18s',
    stages: [
      { id: 's1', name: 'Build', status: 'success', duration: '2m 08s', timestamp: '09:30:00' },
      { id: 's2', name: 'Test', status: 'running', duration: '2m 10s', timestamp: '09:32:08' },
      { id: 's3', name: 'Security Scan', status: 'pending', duration: '-', timestamp: '-' },
      { id: 's4', name: 'Deploy Staging', status: 'pending', duration: '-', timestamp: '-' }
    ]
  },
  {
    id: 'run-003',
    runNumber: 243,
    branch: 'main',
    commit: 'c8f2a5d',
    author: 'Emily Rodriguez',
    status: 'failed',
    startedAt: '2026-08-12 08:15:00',
    duration: '5m 20s',
    stages: [
      { id: 's1', name: 'Build', status: 'success', duration: '2m 12s', timestamp: '08:15:00' },
      { id: 's2', name: 'Test', status: 'failed', duration: '3m 08s', timestamp: '08:17:12' },
      { id: 's3', name: 'Security Scan', status: 'skipped', duration: '-', timestamp: '-' },
      { id: 's4', name: 'Deploy Staging', status: 'skipped', duration: '-', timestamp: '-' }
    ]
  },
  {
    id: 'run-004',
    runNumber: 242,
    branch: 'hotfix/security-patch',
    commit: 'd9a3c7b',
    author: 'David Kim',
    status: 'success',
    startedAt: '2026-08-11 16:45:00',
    duration: '7m 55s',
    stages: [
      { id: 's1', name: 'Build', status: 'success', duration: '2m 20s', timestamp: '16:45:00' },
      { id: 's2', name: 'Test', status: 'success', duration: '3m 30s', timestamp: '16:47:20' },
      { id: 's3', name: 'Security Scan', status: 'success', duration: '1m 25s', timestamp: '16:50:50' },
      { id: 's4', name: 'Deploy Staging', status: 'success', duration: '0m 40s', timestamp: '16:52:15' }
    ]
  },
  {
    id: 'run-005',
    runNumber: 241,
    branch: 'feature/api-v2',
    commit: 'e4b8f2c',
    author: 'Lisa Wang',
    status: 'success',
    startedAt: '2026-08-11 14:20:00',
    duration: '9m 12s',
    stages: [
      { id: 's1', name: 'Build', status: 'success', duration: '2m 35s', timestamp: '14:20:00' },
      { id: 's2', name: 'Test', status: 'success', duration: '4m 15s', timestamp: '14:22:35' },
      { id: 's3', name: 'Security Scan', status: 'success', duration: '1m 42s', timestamp: '14:26:50' },
      { id: 's4', name: 'Deploy Staging', status: 'success', duration: '0m 40s', timestamp: '14:28:32' }
    ]
  }
]

export default function Pipeline() {
  const [selectedRun, setSelectedRun] = useState<PipelineRun | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'pending':
        return 'bg-gray-100 text-gray-600 border-gray-300'
      case 'skipped':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300'
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
      case 'skipped':
        return '⊘'
      default:
        return '○'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CI/CD Pipeline</h1>
          <p className="text-gray-600">Monitor and manage your deployment pipeline</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Runs</div>
            <div className="text-2xl font-bold text-gray-900">245</div>
            <div className="text-xs text-green-600 mt-1">↑ 12% this week</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Success Rate</div>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Avg Duration</div>
            <div className="text-2xl font-bold text-blue-600">8m 24s</div>
            <div className="text-xs text-green-600 mt-1">↓ 15s faster</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Active Runs</div>
            <div className="text-2xl font-bold text-blue-600">1</div>
            <div className="text-xs text-gray-500 mt-1">In progress</div>
          </div>
        </div>

        {/* Pipeline Runs List */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Pipeline Runs</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {MOCK_PIPELINES.map((run) => (
              <div key={run.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-semibold text-gray-900">
                        #{run.runNumber}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(run.status)}`}>
                        {getStatusIcon(run.status)} {run.status.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                        {run.branch}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Commit: <span className="font-mono text-gray-900">{run.commit}</span></span>
                      <span>•</span>
                      <span>by {run.author}</span>
                      <span>•</span>
                      <span>{run.startedAt}</span>
                      <span>•</span>
                      <span className="font-medium">{run.duration}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRun(selectedRun?.id === run.id ? null : run)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  >
                    {selectedRun?.id === run.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {/* Pipeline Stages Timeline */}
                <div className="flex items-center gap-2 mb-4">
                  {run.stages.map((stage, index) => (
                    <React.Fragment key={stage.id}>
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-full h-12 rounded-lg border-2 flex items-center justify-center font-medium text-sm ${getStatusColor(stage.status)}`}
                        >
                          <span className="mr-1 text-lg">{getStatusIcon(stage.status)}</span>
                          {stage.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{stage.duration}</div>
                      </div>
                      {index < run.stages.length - 1 && (
                        <div className="text-gray-400 text-xl">→</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Expanded Details */}
                {selectedRun?.id === run.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Stage Details</h3>
                    <div className="space-y-2">
                      {run.stages.map((stage) => (
                        <div key={stage.id} className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getStatusColor(stage.status)}`}>
                              {getStatusIcon(stage.status)}
                            </span>
                            <div>
                              <div className="font-medium text-gray-900">{stage.name}</div>
                              <div className="text-xs text-gray-500">
                                {stage.timestamp !== '-' ? `Started at ${stage.timestamp}` : 'Not started'}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">{stage.duration}</div>
                            <div className={`text-xs font-medium ${stage.status === 'success' ? 'text-green-600' : stage.status === 'failed' ? 'text-red-600' : 'text-gray-500'}`}>
                              {stage.status.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                        View Logs
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
                        Retry Pipeline
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
                        Download Artifacts
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-3">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            + New Pipeline Run
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Pipeline Configuration
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            View All Runs
          </button>
        </div>
      </div>
    </div>
  )
}
