/**
 * SetupProjectStructure — Displays project folder structure and CI/CD pipeline configuration
 *
 * Features: folder tree view, CI/CD stages, pipeline status, configuration display, project scaffolding
 *
 * Ticket: SCRUM-1232 | Branch: proto/SCRUM-1223
 */

import React, { useState } from 'react'

interface FolderItem {
  id: string
  name: string
  type: 'folder' | 'file'
  path: string
  indent: number
}

interface PipelineStage {
  id: string
  name: string
  status: 'success' | 'running' | 'pending' | 'failed'
  duration: string
  description: string
}

const mockProjectStructure: FolderItem[] = [
  { id: '1', name: 'src', type: 'folder', path: '/src', indent: 0 },
  { id: '2', name: 'components', type: 'folder', path: '/src/components', indent: 1 },
  { id: '3', name: 'App.tsx', type: 'file', path: '/src/components/App.tsx', indent: 2 },
  { id: '4', name: 'Header.tsx', type: 'file', path: '/src/components/Header.tsx', indent: 2 },
  { id: '5', name: 'utils', type: 'folder', path: '/src/utils', indent: 1 },
  { id: '6', name: 'helpers.ts', type: 'file', path: '/src/utils/helpers.ts', indent: 2 },
  { id: '7', name: 'api.ts', type: 'file', path: '/src/utils/api.ts', indent: 2 },
  { id: '8', name: 'public', type: 'folder', path: '/public', indent: 0 },
  { id: '9', name: 'index.html', type: 'file', path: '/public/index.html', indent: 1 },
  { id: '10', name: 'assets', type: 'folder', path: '/public/assets', indent: 1 },
  { id: '11', name: 'tests', type: 'folder', path: '/tests', indent: 0 },
  { id: '12', name: 'unit', type: 'folder', path: '/tests/unit', indent: 1 },
  { id: '13', name: 'integration', type: 'folder', path: '/tests/integration', indent: 1 },
  { id: '14', name: 'package.json', type: 'file', path: '/package.json', indent: 0 },
  { id: '15', name: 'tsconfig.json', type: 'file', path: '/tsconfig.json', indent: 0 },
  { id: '16', name: 'vite.config.ts', type: 'file', path: '/vite.config.ts', indent: 0 },
  { id: '17', name: '.github', type: 'folder', path: '/.github', indent: 0 },
  { id: '18', name: 'workflows', type: 'folder', path: '/.github/workflows', indent: 1 },
  { id: '19', name: 'ci.yml', type: 'file', path: '/.github/workflows/ci.yml', indent: 2 },
  { id: '20', name: 'deploy.yml', type: 'file', path: '/.github/workflows/deploy.yml', indent: 2 },
]

const mockPipelineStages: PipelineStage[] = [
  {
    id: 'stage1',
    name: 'Install Dependencies',
    status: 'success',
    duration: '45s',
    description: 'npm install - Installing project dependencies',
  },
  {
    id: 'stage2',
    name: 'Lint & Type Check',
    status: 'success',
    duration: '23s',
    description: 'Running ESLint and TypeScript compiler',
  },
  {
    id: 'stage3',
    name: 'Unit Tests',
    status: 'running',
    duration: '1m 12s',
    description: 'Running Jest/Vitest test suites',
  },
  {
    id: 'stage4',
    name: 'Build',
    status: 'pending',
    duration: '-',
    description: 'Building production bundle with Vite',
  },
  {
    id: 'stage5',
    name: 'Deploy',
    status: 'pending',
    duration: '-',
    description: 'Deploying to production environment',
  },
]

export default function SetupProjectStructure() {
  const [selectedTab, setSelectedTab] = useState<'structure' | 'pipeline'>('structure')

  const getStatusColor = (status: PipelineStage['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-500'
      case 'running':
        return 'bg-blue-500 animate-pulse'
      case 'failed':
        return 'bg-red-500'
      case 'pending':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusText = (status: PipelineStage['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-700'
      case 'running':
        return 'text-blue-700'
      case 'failed':
        return 'text-red-700'
      case 'pending':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div data-testid="setup-project-structure" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Project Setup & CI/CD Pipeline
          </h1>
          <p className="text-gray-600">
            View your project structure and monitor CI/CD pipeline execution
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              data-testid="setup-project-structure-tab-structure"
              onClick={() => setSelectedTab('structure')}
              className={`px-6 py-3 font-medium transition-colors ${
                selectedTab === 'structure'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Project Structure
            </button>
            <button
              data-testid="setup-project-structure-tab-pipeline"
              onClick={() => setSelectedTab('pipeline')}
              className={`px-6 py-3 font-medium transition-colors ${
                selectedTab === 'pipeline'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              CI/CD Pipeline
            </button>
          </div>

          <div className="p-6">
            {selectedTab === 'structure' && (
              <div data-testid="setup-project-structure-structure-view">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Folder Structure
                  </h2>
                  <button
                    data-testid="setup-project-structure-refresh"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Refresh
                  </button>
                </div>

                <div data-testid="setup-project-structure-list" className="space-y-1 font-mono text-sm">
                  {mockProjectStructure.map((item) => (
                    <div
                      key={item.id}
                      data-testid="setup-project-structure-item"
                      className="flex items-center py-1 hover:bg-gray-50 rounded"
                      style={{ paddingLeft: `${item.indent * 24}px` }}
                    >
                      {item.type === 'folder' ? (
                        <span className="text-blue-600 mr-2">📁</span>
                      ) : (
                        <span className="text-gray-500 mr-2">📄</span>
                      )}
                      <span className={item.type === 'folder' ? 'font-semibold text-gray-900' : 'text-gray-700'}>
                        {item.name}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">{item.path}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Structure Summary</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Total items: {mockProjectStructure.length}</li>
                    <li>
                      • Folders: {mockProjectStructure.filter((i) => i.type === 'folder').length}
                    </li>
                    <li>
                      • Files: {mockProjectStructure.filter((i) => i.type === 'file').length}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {selectedTab === 'pipeline' && (
              <div data-testid="setup-project-structure-pipeline-view">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    CI/CD Pipeline Status
                  </h2>
                  <button
                    data-testid="setup-project-structure-run-pipeline"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Run Pipeline
                  </button>
                </div>

                <div data-testid="setup-project-structure-pipeline-list" className="space-y-4">
                  {mockPipelineStages.map((stage, index) => (
                    <div
                      key={stage.id}
                      data-testid="setup-project-structure-pipeline-item"
                      className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div
                            className={`w-10 h-10 rounded-full ${getStatusColor(
                              stage.status
                            )} flex items-center justify-center text-white font-bold`}
                          >
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{stage.name}</h3>
                            <span className={`text-sm font-medium ${getStatusText(stage.status)}`}>
                              {stage.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{stage.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-4">⏱️ Duration: {stage.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">Pipeline Overview</h3>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-700">
                        {mockPipelineStages.filter((s) => s.status === 'success').length}
                      </div>
                      <div className="text-xs text-green-700">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700">
                        {mockPipelineStages.filter((s) => s.status === 'running').length}
                      </div>
                      <div className="text-xs text-blue-700">Running</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-700">
                        {mockPipelineStages.filter((s) => s.status === 'pending').length}
                      </div>
                      <div className="text-xs text-gray-700">Pending</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-700">
                        {mockPipelineStages.filter((s) => s.status === 'failed').length}
                      </div>
                      <div className="text-xs text-red-700">Failed</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              data-testid="setup-project-structure-scaffold"
              className="px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Scaffold Project
            </button>
            <button
              data-testid="setup-project-structure-configure"
              className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Configure CI/CD
            </button>
            <button
              data-testid="setup-project-structure-export"
              className="px-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Export Config
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
