/**
 * BuildMilestoneManagement — Manage project milestones with progress tracking
 *
 * Features: milestone list, progress bars, status tracking, date management, completion metrics
 *
 * Ticket: SCRUM-745 | Branch: proto/SCRUM-733
 */

import React, { useState } from 'react'

interface Task {
  id: string
  title: string
  completed: boolean
}

interface Milestone {
  id: string
  name: string
  description: string
  startDate: string
  dueDate: string
  status: 'planned' | 'in-progress' | 'completed' | 'overdue'
  progress: number
  tasks: Task[]
  owner: string
}

const MOCK_MILESTONES: Milestone[] = [
  {
    id: 'ms-1',
    name: 'MVP Launch',
    description: 'Complete minimum viable product for initial release',
    startDate: '2026-07-01',
    dueDate: '2026-09-15',
    status: 'in-progress',
    progress: 65,
    tasks: [
      { id: 't1', title: 'User authentication', completed: true },
      { id: 't2', title: 'Core features', completed: true },
      { id: 't3', title: 'UI polish', completed: false },
      { id: 't4', title: 'Testing', completed: false },
    ],
    owner: 'Sarah Chen',
  },
  {
    id: 'ms-2',
    name: 'Beta Testing Phase',
    description: 'Gather user feedback and fix critical issues',
    startDate: '2026-09-16',
    dueDate: '2026-10-31',
    status: 'planned',
    progress: 0,
    tasks: [
      { id: 't5', title: 'Recruit beta testers', completed: false },
      { id: 't6', title: 'Set up feedback system', completed: false },
      { id: 't7', title: 'Monitor metrics', completed: false },
    ],
    owner: 'Mike Johnson',
  },
  {
    id: 'ms-3',
    name: 'Performance Optimization',
    description: 'Improve application speed and reduce load times',
    startDate: '2026-08-01',
    dueDate: '2026-08-31',
    status: 'completed',
    progress: 100,
    tasks: [
      { id: 't8', title: 'Database indexing', completed: true },
      { id: 't9', title: 'Code splitting', completed: true },
      { id: 't10', title: 'Caching strategy', completed: true },
      { id: 't11', title: 'Load testing', completed: true },
    ],
    owner: 'Alex Rivera',
  },
  {
    id: 'ms-4',
    name: 'API v2 Development',
    description: 'Build next generation API with improved features',
    startDate: '2026-09-01',
    dueDate: '2026-11-30',
    status: 'in-progress',
    progress: 45,
    tasks: [
      { id: 't12', title: 'API design', completed: true },
      { id: 't13', title: 'Endpoints implementation', completed: true },
      { id: 't14', title: 'Documentation', completed: false },
      { id: 't15', title: 'Migration guide', completed: false },
      { id: 't16', title: 'Deprecation notices', completed: false },
    ],
    owner: 'Emma Wilson',
  },
  {
    id: 'ms-5',
    name: 'Mobile App Release',
    description: 'Launch iOS and Android mobile applications',
    startDate: '2026-06-01',
    dueDate: '2026-08-15',
    status: 'overdue',
    progress: 75,
    tasks: [
      { id: 't17', title: 'React Native setup', completed: true },
      { id: 't18', title: 'iOS build', completed: true },
      { id: 't19', title: 'Android build', completed: true },
      { id: 't20', title: 'App store submission', completed: false },
    ],
    owner: 'David Park',
  },
  {
    id: 'ms-6',
    name: 'Security Audit',
    description: 'Complete comprehensive security review and fixes',
    startDate: '2026-08-10',
    dueDate: '2026-09-10',
    status: 'in-progress',
    progress: 30,
    tasks: [
      { id: 't21', title: 'Penetration testing', completed: true },
      { id: 't22', title: 'Vulnerability scanning', completed: false },
      { id: 't23', title: 'Security patches', completed: false },
      { id: 't24', title: 'Compliance check', completed: false },
    ],
    owner: 'Rachel Green',
  },
]

export default function BuildMilestoneManagement() {
  const [milestones] = useState<Milestone[]>(MOCK_MILESTONES)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null)

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'planned':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getProgressColor = (progress: number): string => {
    if (progress === 100) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress >= 25) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  const filteredMilestones = selectedStatus === 'all' 
    ? milestones 
    : milestones.filter(m => m.status === selectedStatus)

  const stats = {
    total: milestones.length,
    completed: milestones.filter(m => m.status === 'completed').length,
    inProgress: milestones.filter(m => m.status === 'in-progress').length,
    overdue: milestones.filter(m => m.status === 'overdue').length,
    avgProgress: Math.round(milestones.reduce((acc, m) => acc + m.progress, 0) / milestones.length),
  }

  const toggleMilestone = (id: string) => {
    setExpandedMilestone(expandedMilestone === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Milestone Management</h1>
          <p className="text-gray-600">Track project milestones and their progress</p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Milestones</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-sm font-medium text-gray-600 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Overdue</div>
            <div className="text-3xl font-bold text-red-600">{stats.overdue}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-sm font-medium text-gray-600 mb-1">Avg Progress</div>
            <div className="text-3xl font-bold text-purple-600">{stats.avgProgress}%</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({milestones.length})
            </button>
            <button
              onClick={() => setSelectedStatus('in-progress')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === 'in-progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              In Progress ({stats.inProgress})
            </button>
            <button
              onClick={() => setSelectedStatus('planned')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === 'planned'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Planned
            </button>
            <button
              onClick={() => setSelectedStatus('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              Completed ({stats.completed})
            </button>
            <button
              onClick={() => setSelectedStatus('overdue')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === 'overdue'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              Overdue ({stats.overdue})
            </button>
          </div>
        </div>

        {/* Milestones List */}
        <div className="space-y-4">
          {filteredMilestones.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500">No milestones found for the selected filter.</p>
            </div>
          ) : (
            filteredMilestones.map((milestone) => (
              <div key={milestone.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                {/* Milestone Header */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleMilestone(milestone.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{milestone.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            milestone.status
                          )}`}
                        >
                          {milestone.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{milestone.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Owner:</span>
                          <span>{milestone.owner}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Start:</span>
                          <span>{new Date(milestone.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Due:</span>
                          <span>{new Date(milestone.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-3xl font-bold text-gray-900">{milestone.progress}%</div>
                      <div className="text-xs text-gray-500">
                        {milestone.tasks.filter(t => t.completed).length} / {milestone.tasks.length} tasks
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getProgressColor(
                          milestone.progress
                        )}`}
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div className="text-center mt-2">
                    <span className="text-xs text-gray-400">
                      {expandedMilestone === milestone.id ? '▼ Hide tasks' : '▶ Show tasks'}
                    </span>
                  </div>
                </div>

                {/* Expanded Tasks Section */}
                {expandedMilestone === milestone.id && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Tasks</h4>
                    <div className="space-y-2">
                      {milestone.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border-2 ${
                              task.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {task.completed && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`text-sm flex-1 ${
                              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                            }`}
                          >
                            {task.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
