/**
 * UserWants — Display milestone completion percentage based on completed tasks
 *
 * Features: milestone progress tracking, completion percentage calculation, task status visualization, progress bars, milestone listing
 *
 * Ticket: SCRUM-738 | Branch: proto/SCRUM-733
 */

import React from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  milestoneId: string;
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
}

const MOCK_MILESTONES: Milestone[] = [
  {
    id: 'milestone-1',
    name: 'Q1 Product Launch',
    description: 'Complete all features for Q1 product release',
    dueDate: '2026-03-31'
  },
  {
    id: 'milestone-2',
    name: 'Backend Infrastructure',
    description: 'Set up scalable backend infrastructure',
    dueDate: '2026-02-28'
  },
  {
    id: 'milestone-3',
    name: 'User Authentication',
    description: 'Implement secure user authentication system',
    dueDate: '2026-02-15'
  },
  {
    id: 'milestone-4',
    name: 'Mobile Responsiveness',
    description: 'Ensure all features work on mobile devices',
    dueDate: '2026-04-15'
  },
  {
    id: 'milestone-5',
    name: 'Performance Optimization',
    description: 'Optimize application performance and load times',
    dueDate: '2026-05-30'
  }
];

const MOCK_TASKS: Task[] = [
  // Milestone 1 tasks (60% complete - 3/5)
  { id: 'task-1', title: 'Design landing page', completed: true, milestoneId: 'milestone-1' },
  { id: 'task-2', title: 'Build product catalog', completed: true, milestoneId: 'milestone-1' },
  { id: 'task-3', title: 'Implement checkout flow', completed: false, milestoneId: 'milestone-1' },
  { id: 'task-4', title: 'Add payment gateway', completed: true, milestoneId: 'milestone-1' },
  { id: 'task-5', title: 'Set up analytics', completed: false, milestoneId: 'milestone-1' },
  
  // Milestone 2 tasks (100% complete - 4/4)
  { id: 'task-6', title: 'Configure database', completed: true, milestoneId: 'milestone-2' },
  { id: 'task-7', title: 'Set up API endpoints', completed: true, milestoneId: 'milestone-2' },
  { id: 'task-8', title: 'Implement caching', completed: true, milestoneId: 'milestone-2' },
  { id: 'task-9', title: 'Deploy to staging', completed: true, milestoneId: 'milestone-2' },
  
  // Milestone 3 tasks (66.67% complete - 4/6)
  { id: 'task-10', title: 'OAuth integration', completed: true, milestoneId: 'milestone-3' },
  { id: 'task-11', title: 'JWT token management', completed: true, milestoneId: 'milestone-3' },
  { id: 'task-12', title: 'Password reset flow', completed: false, milestoneId: 'milestone-3' },
  { id: 'task-13', title: 'Two-factor authentication', completed: false, milestoneId: 'milestone-3' },
  { id: 'task-14', title: 'Session management', completed: true, milestoneId: 'milestone-3' },
  { id: 'task-15', title: 'User profile setup', completed: true, milestoneId: 'milestone-3' },
  
  // Milestone 4 tasks (25% complete - 1/4)
  { id: 'task-16', title: 'Responsive grid layout', completed: true, milestoneId: 'milestone-4' },
  { id: 'task-17', title: 'Mobile navigation', completed: false, milestoneId: 'milestone-4' },
  { id: 'task-18', title: 'Touch gestures', completed: false, milestoneId: 'milestone-4' },
  { id: 'task-19', title: 'Cross-browser testing', completed: false, milestoneId: 'milestone-4' },
  
  // Milestone 5 tasks (0% complete - 0/5)
  { id: 'task-20', title: 'Code splitting', completed: false, milestoneId: 'milestone-5' },
  { id: 'task-21', title: 'Image optimization', completed: false, milestoneId: 'milestone-5' },
  { id: 'task-22', title: 'Lazy loading', completed: false, milestoneId: 'milestone-5' },
  { id: 'task-23', title: 'Bundle size reduction', completed: false, milestoneId: 'milestone-5' },
  { id: 'task-24', title: 'Performance monitoring', completed: false, milestoneId: 'milestone-5' }
];

export default function UserWants() {
  const calculateCompletion = (milestoneId: string): number => {
    const milestoneTasks = MOCK_TASKS.filter(task => task.milestoneId === milestoneId);
    if (milestoneTasks.length === 0) return 0;
    
    const completedTasks = milestoneTasks.filter(task => task.completed).length;
    return Math.round((completedTasks / milestoneTasks.length) * 100);
  };

  const getCompletionColor = (percentage: number): string => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getTasksForMilestone = (milestoneId: string) => {
    return MOCK_TASKS.filter(task => task.milestoneId === milestoneId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Milestone Progress Tracker</h1>
          <p className="text-gray-600">Track completion percentage of milestones based on completed tasks</p>
        </div>

        <div className="space-y-6">
          {MOCK_MILESTONES.map((milestone) => {
            const completionPercentage = calculateCompletion(milestone.id);
            const tasks = getTasksForMilestone(milestone.id);
            const completedTasks = tasks.filter(t => t.completed).length;
            const totalTasks = tasks.length;
            const colorClass = getCompletionColor(completionPercentage);

            return (
              <div key={milestone.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{milestone.name}</h2>
                    <p className="text-gray-600 mb-2">{milestone.description}</p>
                    <p className="text-sm text-gray-500">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="ml-4 flex flex-col items-end">
                    <div className="text-4xl font-bold text-gray-900">{completionPercentage}%</div>
                    <div className="text-sm text-gray-500 mt-1">{completedTasks} / {totalTasks} tasks</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                  <div 
                    className={`h-full ${colorClass} transition-all duration-500 flex items-center justify-center text-white text-xs font-semibold`}
                    style={{ width: `${completionPercentage}%` }}
                  >
                    {completionPercentage > 10 && `${completionPercentage}%`}
                  </div>
                </div>

                {/* Task List */}
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Tasks:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tasks.map((task) => (
                      <div 
                        key={task.id}
                        className={`flex items-center p-2 rounded ${task.completed ? 'bg-green-50' : 'bg-gray-50'}`}
                      >
                        <div className={`w-5 h-5 rounded mr-3 flex items-center justify-center flex-shrink-0 ${
                          task.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {task.completed && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm ${task.completed ? 'text-gray-700 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Statistics */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Progress Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{MOCK_MILESTONES.length}</div>
              <div className="text-sm text-gray-600 mt-1">Total Milestones</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {MOCK_MILESTONES.filter(m => calculateCompletion(m.id) === 100).length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Completed Milestones</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">
                {Math.round(MOCK_MILESTONES.reduce((sum, m) => sum + calculateCompletion(m.id), 0) / MOCK_MILESTONES.length)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Average Completion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
