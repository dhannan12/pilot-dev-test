/**
 * SystemCalculatesThe — Displays tasks and automatically calculates the total count
 *
 * Features: task list display, automatic counting, task status tracking, priority indicators, summary statistics
 *
 * Ticket: SCRUM-844 | Branch: proto/SCRUM-841
 */

import React from 'react';

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
}

const MOCK_TASKS: Task[] = [
  { id: 1, title: 'Implement authentication system', status: 'completed', priority: 'high', assignee: 'Alice Johnson' },
  { id: 2, title: 'Design user dashboard', status: 'in-progress', priority: 'medium', assignee: 'Bob Smith' },
  { id: 3, title: 'Write API documentation', status: 'pending', priority: 'low', assignee: 'Carol Davis' },
  { id: 4, title: 'Fix navigation bugs', status: 'in-progress', priority: 'high', assignee: 'David Wilson' },
  { id: 5, title: 'Update dependencies', status: 'pending', priority: 'medium', assignee: 'Eve Martinez' },
  { id: 6, title: 'Optimize database queries', status: 'completed', priority: 'high', assignee: 'Frank Brown' },
  { id: 7, title: 'Create user onboarding flow', status: 'pending', priority: 'medium', assignee: 'Grace Lee' },
  { id: 8, title: 'Implement dark mode', status: 'in-progress', priority: 'low', assignee: 'Henry Chen' },
];

export default function SystemCalculatesThe() {
  const totalTasks = MOCK_TASKS.length;
  const completedTasks = MOCK_TASKS.filter(task => task.status === 'completed').length;
  const inProgressTasks = MOCK_TASKS.filter(task => task.status === 'in-progress').length;
  const pendingTasks = MOCK_TASKS.filter(task => task.status === 'pending').length;

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 font-semibold';
      case 'medium':
        return 'text-yellow-600 font-medium';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management System</h1>
          <p className="text-gray-600">System automatically calculates total number of tasks</p>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="text-2xl font-bold text-purple-600">{totalTasks}</div>
            <div className="text-sm text-gray-600 mt-1">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
            <div className="text-sm text-gray-600 mt-1">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-500">
            <div className="text-2xl font-bold text-gray-600">{pendingTasks}</div>
            <div className="text-sm text-gray-600 mt-1">Pending</div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Tasks</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {MOCK_TASKS.map((task) => (
              <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">#{task.id}</span>
                      <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                      <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()} Priority
                      </span>
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Assignee:</span> {task.assignee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Summary */}
        <div className="mt-6 bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-700">
            Showing <span className="font-bold text-purple-600">{totalTasks}</span> total tasks
            {' '}({completedTasks} completed, {inProgressTasks} in progress, {pendingTasks} pending)
          </p>
        </div>
      </div>
    </div>
  );
}
