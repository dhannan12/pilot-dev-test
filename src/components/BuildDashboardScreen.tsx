/**
 * BuildDashboardScreen — Main dashboard for team task management with metrics, task lists, and team activity
 *
 * Features: task statistics, priority breakdown, team activity feed, upcoming deadlines, recent tasks
 *
 * Ticket: SCRUM-743 | Branch: proto/SCRUM-733
 */

import React from 'react'

interface Task {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'in_progress' | 'completed'
  assignee: string
  dueDate: string
}

interface Activity {
  id: string
  user: string
  action: string
  taskTitle: string
  timestamp: string
}

interface MetricCard {
  label: string
  value: number
  change: number
  trend: 'up' | 'down'
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    priority: 'high',
    status: 'in_progress',
    assignee: 'Sarah Chen',
    dueDate: '2026-08-15'
  },
  {
    id: '2',
    title: 'Design new landing page',
    priority: 'medium',
    status: 'todo',
    assignee: 'Mike Johnson',
    dueDate: '2026-08-18'
  },
  {
    id: '3',
    title: 'Fix payment gateway bug',
    priority: 'high',
    status: 'in_progress',
    assignee: 'Emily Rodriguez',
    dueDate: '2026-08-14'
  },
  {
    id: '4',
    title: 'Update documentation',
    priority: 'low',
    status: 'todo',
    assignee: 'David Lee',
    dueDate: '2026-08-20'
  },
  {
    id: '5',
    title: 'Optimize database queries',
    priority: 'medium',
    status: 'completed',
    assignee: 'Sarah Chen',
    dueDate: '2026-08-10'
  },
  {
    id: '6',
    title: 'Implement dark mode',
    priority: 'medium',
    status: 'in_progress',
    assignee: 'Mike Johnson',
    dueDate: '2026-08-17'
  },
  {
    id: '7',
    title: 'Set up CI/CD pipeline',
    priority: 'high',
    status: 'completed',
    assignee: 'Emily Rodriguez',
    dueDate: '2026-08-08'
  }
]

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    user: 'Sarah Chen',
    action: 'completed',
    taskTitle: 'Optimize database queries',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    user: 'Mike Johnson',
    action: 'started',
    taskTitle: 'Implement dark mode',
    timestamp: '3 hours ago'
  },
  {
    id: '3',
    user: 'Emily Rodriguez',
    action: 'commented on',
    taskTitle: 'Fix payment gateway bug',
    timestamp: '5 hours ago'
  },
  {
    id: '4',
    user: 'David Lee',
    action: 'created',
    taskTitle: 'Update documentation',
    timestamp: '6 hours ago'
  },
  {
    id: '5',
    user: 'Sarah Chen',
    action: 'updated priority of',
    taskTitle: 'Implement user authentication',
    timestamp: '8 hours ago'
  }
]

export default function BuildDashboardScreen() {
  const totalTasks = MOCK_TASKS.length
  const completedTasks = MOCK_TASKS.filter(t => t.status === 'completed').length
  const inProgressTasks = MOCK_TASKS.filter(t => t.status === 'in_progress').length
  const todoTasks = MOCK_TASKS.filter(t => t.status === 'todo').length
  
  const highPriorityTasks = MOCK_TASKS.filter(t => t.priority === 'high').length
  const mediumPriorityTasks = MOCK_TASKS.filter(t => t.priority === 'medium').length
  const lowPriorityTasks = MOCK_TASKS.filter(t => t.priority === 'low').length

  const metrics: MetricCard[] = [
    { label: 'Total Tasks', value: totalTasks, change: 12, trend: 'up' },
    { label: 'Completed', value: completedTasks, change: 8, trend: 'up' },
    { label: 'In Progress', value: inProgressTasks, change: 3, trend: 'up' },
    { label: 'To Do', value: todoTasks, change: 5, trend: 'down' }
  ]

  const upcomingDeadlines = MOCK_TASKS
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'todo': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`
    return `In ${diffDays} days`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your team.</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                </div>
                <div className={`flex items-center text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="font-medium">{metric.trend === 'up' ? '↑' : '↓'} {metric.change}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Priority Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Priority Breakdown</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">High Priority</span>
                <span className="text-sm font-bold text-gray-900">{highPriorityTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-red-500 h-3 rounded-full" 
                  style={{ width: `${(highPriorityTasks / totalTasks) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Medium Priority</span>
                <span className="text-sm font-bold text-gray-900">{mediumPriorityTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-yellow-500 h-3 rounded-full" 
                  style={{ width: `${(mediumPriorityTasks / totalTasks) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Low Priority</span>
                <span className="text-sm font-bold text-gray-900">{lowPriorityTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full" 
                  style={{ width: `${(lowPriorityTasks / totalTasks) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {upcomingDeadlines.map(task => (
                <div key={task.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-sm text-gray-600">{task.assignee}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${
                      formatDate(task.dueDate).includes('overdue') ? 'text-red-600' :
                      formatDate(task.dueDate) === 'Today' ? 'text-orange-600' :
                      'text-gray-900'
                    }`}>
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {MOCK_ACTIVITIES.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>
                      {' '}{activity.action}{' '}
                      <span className="font-medium">{activity.taskTitle}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Tasks</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_TASKS.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{task.assignee}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {task.dueDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
