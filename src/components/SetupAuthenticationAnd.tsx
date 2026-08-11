import React, { useState } from 'react'

const MOCK_ROLES = [
  { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete', 'manage_users'] },
  { id: 2, name: 'Editor', permissions: ['read', 'write'] },
  { id: 3, name: 'Viewer', permissions: ['read'] }
]

const MOCK_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive' }
]

const MOCK_PERMISSIONS = [
  { id: 1, name: 'read', description: 'View content' },
  { id: 2, name: 'write', description: 'Create and edit content' },
  { id: 3, name: 'delete', description: 'Delete content' },
  { id: 4, name: 'manage_users', description: 'Manage user accounts' }
]

export default function SetupAuthenticationAnd() {
  const [activeTab, setActiveTab] = useState<'overview' | 'roles' | 'users' | 'permissions'>('overview')
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const [newRoleName, setNewRoleName] = useState('')
  const [showRoleForm, setShowRoleForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Authentication & RBAC Setup</h1>
          <p className="text-slate-400">Configure roles, permissions, and user access control</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'roles', label: 'Roles' },
            { id: 'users', label: 'Users' },
            { id: 'permissions', label: 'Permissions' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="text-slate-400 text-sm mb-2">Total Roles</div>
              <div className="text-3xl font-bold text-white">{MOCK_ROLES.length}</div>
              <div className="text-slate-500 text-xs mt-2">Active role configurations</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="text-slate-400 text-sm mb-2">Total Users</div>
              <div className="text-3xl font-bold text-white">{MOCK_USERS.length}</div>
              <div className="text-slate-500 text-xs mt-2">Registered users</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="text-slate-400 text-sm mb-2">Permissions</div>
              <div className="text-3xl font-bold text-white">{MOCK_PERMISSIONS.length}</div>
              <div className="text-slate-500 text-xs mt-2">Available permissions</div>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Role Management</h2>
              <button
                onClick={() => setShowRoleForm(!showRoleForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {showRoleForm ? 'Cancel' : 'Add Role'}
              </button>
            </div>

            {showRoleForm && (
              <div className="bg-slate-700 rounded-lg p-6 mb-6 border border-slate-600">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Role Name</label>
                    <input
                      type="text"
                      value={newRoleName}
                      onChange={e => setNewRoleName(e.target.value)}
                      placeholder="Enter role name"
                      className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Create Role
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {MOCK_ROLES.map(role => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  className="bg-slate-700 rounded-lg p-6 border border-slate-600 cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{role.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map(perm => (
                          <span key={perm} className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-red-400 transition-colors font-bold text-xl">
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left px-4 py-3 text-slate-300 font-semibold">Name</th>
                    <th className="text-left px-4 py-3 text-slate-300 font-semibold">Email</th>
                    <th className="text-left px-4 py-3 text-slate-300 font-semibold">Role</th>
                    <th className="text-left px-4 py-3 text-slate-300 font-semibold">Status</th>
                    <th className="text-left px-4 py-3 text-slate-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map(user => (
                    <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-4 py-3 text-white">{user.name}</td>
                      <td className="px-4 py-3 text-slate-300">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="bg-purple-900 text-purple-200 text-xs px-2 py-1 rounded">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          user.status === 'active'
                            ? 'bg-green-900 text-green-200'
                            : 'bg-red-900 text-red-200'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Permission Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_PERMISSIONS.map(permission => (
                <div key={permission.id} className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{permission.name}</h3>
                      <p className="text-slate-400 text-sm">{permission.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 rounded border-slate-500 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}