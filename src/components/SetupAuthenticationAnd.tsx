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
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-medium transition-colors ${
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
              <div className="text-slate-400 text-sm font-medium mb-2">Total Roles</div>
              <div className="text-3xl font-bold text-white">{MOCK_ROLES.length}</div>
              <div className="text-slate-500 text-xs mt-2">Role-based access control configured</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="text-slate-400 text-sm font-medium mb-2">Active Users</div>
              <div className="text-3xl font-bold text-white">{MOCK_USERS.filter(u => u.status === 'active').length}</div>
              <div className="text-slate-500 text-xs mt-2">Users with active access</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <div className="text-slate-400 text-sm font-medium mb-2">Permissions</div>
              <div className="text-3xl font-bold text-white">{MOCK_PERMISSIONS.length}</div>
              <div className="text-slate-500 text-xs mt-2">Total permission types</div>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Role Management</h2>
              <button
                onClick={() => setShowRoleForm(!showRoleForm)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {showRoleForm ? 'Cancel' : 'Add Role'}
              </button>
            </div>

            {showRoleForm && (
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Role Name</label>
                    <input
                      type="text"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      placeholder="Enter role name"
                      className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    Create Role
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {MOCK_ROLES.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  className="bg-slate-700 rounded-lg p-6 border border-slate-600 cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{role.name}</h3>
                      <p className="text-slate-400 text-sm mt-1">{role.permissions.length} permissions assigned</p>
                    </div>
                    <div className="text-slate-400 text-xl">{selectedRole === role.id ? '▼' : '▶'}</div>
                  </div>
                  {selectedRole === role.id && (
                    <div className="mt-4 pt-4 border-t border-slate-600">
                      <p className="text-slate-300 text-sm font-medium mb-3">Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((perm) => (
                          <span key={perm} className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map((user) => (
                    <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 text-white">{user.name}</td>
                      <td className="px-6 py-4 text-slate-400">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-600 text-slate-300'
                        }`}>
                          {user.status}
                        </span>
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Permission Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_PERMISSIONS.map((permission) => (
                <div key={permission.id} className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{permission.name}</h3>
                      <p className="text-slate-400 text-sm mt-2">{permission.description}</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-600">
                    <p className="text-slate-400 text-xs">Used in {Math.floor(Math.random() * 3) + 1} role(s)</p>
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