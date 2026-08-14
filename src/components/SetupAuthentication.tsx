/**
 * SetupAuthentication — Authentication and permission-based delete operations
 *
 * Features: user login, role management, permission checks, delete operations with auth
 *
 * Ticket: SCRUM-851 | Branch: proto/SCRUM-841
 */

import { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  permissions: string[]
}

interface Task {
  id: string
  title: string
  description: string
  createdBy: string
  status: 'active' | 'deleted'
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin_user',
    email: 'admin@example.com',
    role: 'admin',
    permissions: ['create', 'read', 'update', 'delete', 'manage_users']
  },
  {
    id: '2',
    username: 'editor_john',
    email: 'john@example.com',
    role: 'editor',
    permissions: ['create', 'read', 'update', 'delete_own']
  },
  {
    id: '3',
    username: 'editor_sarah',
    email: 'sarah@example.com',
    role: 'editor',
    permissions: ['create', 'read', 'update', 'delete_own']
  },
  {
    id: '4',
    username: 'viewer_mike',
    email: 'mike@example.com',
    role: 'viewer',
    permissions: ['read']
  },
  {
    id: '5',
    username: 'viewer_lisa',
    email: 'lisa@example.com',
    role: 'viewer',
    permissions: ['read']
  }
]

const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Design authentication system',
    description: 'Create wireframes and user flows for auth',
    createdBy: '1',
    status: 'active'
  },
  {
    id: 't2',
    title: 'Implement user login',
    description: 'Build login form with validation',
    createdBy: '2',
    status: 'active'
  },
  {
    id: 't3',
    title: 'Set up role-based access',
    description: 'Configure permissions for different user roles',
    createdBy: '1',
    status: 'active'
  },
  {
    id: 't4',
    title: 'Test delete operations',
    description: 'Verify permission checks work correctly',
    createdBy: '3',
    status: 'active'
  },
  {
    id: 't5',
    title: 'Document authentication flow',
    description: 'Write technical documentation for auth system',
    createdBy: '2',
    status: 'active'
  },
  {
    id: 't6',
    title: 'Review security measures',
    description: 'Audit auth implementation for vulnerabilities',
    createdBy: '1',
    status: 'active'
  }
]

export default function SetupAuthentication() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [authMessage, setAuthMessage] = useState<string>('')

  const handleLogin = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId)
    if (user) {
      setCurrentUser(user)
      setAuthMessage(`Successfully logged in as ${user.username} (${user.role})`)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setAuthMessage('Logged out successfully')
  }

  const canDeleteTask = (task: Task): boolean => {
    if (!currentUser) return false
    
    // Admin can delete anything
    if (currentUser.permissions.includes('delete')) {
      return true
    }
    
    // Editors can delete their own tasks
    if (currentUser.permissions.includes('delete_own') && task.createdBy === currentUser.id) {
      return true
    }
    
    return false
  }

  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) {
      setAuthMessage('Task not found')
      return
    }

    if (!currentUser) {
      setAuthMessage('❌ Access denied: You must be logged in to delete tasks')
      return
    }

    if (!canDeleteTask(task)) {
      setAuthMessage(`❌ Access denied: ${currentUser.username} (${currentUser.role}) cannot delete this task`)
      return
    }

    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: 'deleted' as const } : t
    ))
    setAuthMessage(`✅ Task deleted successfully by ${currentUser.username}`)
  }

  const getTaskCreatorName = (userId: string): string => {
    const user = mockUsers.find(u => u.id === userId)
    return user ? user.username : 'Unknown'
  }

  const getRoleBadgeColor = (role: string): string => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'editor':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'viewer':
        return 'bg-gray-100 text-gray-800 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const activeTasks = tasks.filter(t => t.status === 'active')
  const deletedTasks = tasks.filter(t => t.status === 'deleted')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Authentication & Permissions
          </h1>
          <p className="text-slate-600">
            Permission-based delete operations with role management
          </p>
        </div>

        {/* Current User Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Current Session
          </h2>
          
          {currentUser ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-800">
                    {currentUser.username}
                  </p>
                  <p className="text-sm text-slate-600">{currentUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getRoleBadgeColor(currentUser.role)}`}>
                      {currentUser.role.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-slate-600 mb-4">No user logged in</p>
            </div>
          )}

          {/* Permissions Display */}
          {currentUser && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">
                Permissions:
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.permissions.map(permission => (
                  <span
                    key={permission}
                    className="text-xs px-3 py-1 bg-green-100 text-green-800 border border-green-300 rounded-full font-medium"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Login Panel */}
        {!currentUser && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Select User to Login
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockUsers.map(user => (
                <button
                  key={user.id}
                  onClick={() => handleLogin(user.id)}
                  className="p-4 border-2 border-slate-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{user.username}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">{user.email}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Auth Message */}
        {authMessage && (
          <div className={`mb-6 p-4 rounded-lg border ${
            authMessage.includes('❌') 
              ? 'bg-red-50 border-red-300 text-red-800' 
              : authMessage.includes('✅')
              ? 'bg-green-50 border-green-300 text-green-800'
              : 'bg-blue-50 border-blue-300 text-blue-800'
          }`}>
            <p className="font-medium">{authMessage}</p>
          </div>
        )}

        {/* Active Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Active Tasks ({activeTasks.length})
          </h2>
          
          {activeTasks.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No active tasks</p>
          ) : (
            <div className="space-y-3">
              {activeTasks.map(task => {
                const canDelete = currentUser ? canDeleteTask(task) : false
                const creatorName = getTaskCreatorName(task.createdBy)
                
                return (
                  <div
                    key={task.id}
                    className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 mb-1">
                          {task.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-2">
                          {task.description}
                        </p>
                        <p className="text-xs text-slate-500">
                          Created by: <span className="font-medium">{creatorName}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        disabled={!canDelete}
                        className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                          canDelete
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        title={
                          !currentUser
                            ? 'Login to delete'
                            : !canDelete
                            ? 'No permission to delete this task'
                            : 'Delete task'
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Deleted Tasks */}
        {deletedTasks.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Deleted Tasks ({deletedTasks.length})
            </h2>
            <div className="space-y-3">
              {deletedTasks.map(task => (
                <div
                  key={task.id}
                  className="p-4 border border-red-200 rounded-lg bg-red-50 opacity-60"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-700 line-through mb-1">
                        {task.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        {task.description}
                      </p>
                      <p className="text-xs text-slate-500">
                        Created by: {getTaskCreatorName(task.createdBy)}
                      </p>
                    </div>
                    <span className="ml-4 px-3 py-1 bg-red-200 text-red-800 rounded-lg text-sm font-medium">
                      DELETED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permission Legend */}
        <div className="mt-6 bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Permission Rules
          </h3>
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-purple-700">Admin:</span> Can delete any task
            </p>
            <p>
              <span className="font-semibold text-blue-700">Editor:</span> Can delete only their own tasks
            </p>
            <p>
              <span className="font-semibold text-gray-700">Viewer:</span> Cannot delete any tasks (read-only)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
