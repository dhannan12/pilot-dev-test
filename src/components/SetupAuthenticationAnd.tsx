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
  { id: 1, name: 'read', description: 'Read access to resources' },
  { id: 2, name: 'write', description: 'Write access to resources' },
  { id: 3, name: 'delete', description: 'Delete access to resources' },
  { id: 4, name: 'manage_users', description: 'Manage user accounts' }
]

export default function SetupAuthenticationAnd() {
  const [activeTab, setActiveTab] = useState<'roles' | 'users' | 'permissions'>('roles')
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const [newRoleName, setNewRoleName] = useState('')
  const [showAddRole, setShowAddRole] = useState(false)

  const handleAddRole = () => {
    if (newRoleName.trim()) {
      setNewRoleName('')
      setShowAddRole(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Authentication & RBAC Setup</h1>
          <p className="text-slate-400">Configure roles, users, and permissions for your application</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'roles'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Roles
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'users'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'permissions'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Permissions
          </button>
        </div>

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Role Management</h2>
              <button
                onClick={() => setShowAddRole(!showAddRole)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                {showAddRole ? 'Cancel' : 'Add Role'}
              </button>
            </div>

            {showAddRole && (
              <div className="bg-slate-700 p-6 rounded-lg space-y-4">
                <input
                  type="text"
                  placeholder="Role name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddRole}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Create Role
                </button>
              </div>
            )}

            <div className="grid gap-4">
              {MOCK_ROLES.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  className={`p-6 rounded-lg cursor-pointer transition-all ${
                    selectedRole === role.id
                      ? 'bg-blue-600 border-2 border-blue-400'
                      : 'bg-slate-700 border-2 border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{role.name}</h3>
                      <p className="text-slate-300 text-sm mt-1">Role ID: {role.id}</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-600 text-slate-200 rounded-full text-sm font-semibold">
                      {role.permissions.length} permissions
                    </span>
                  </div>
                  {selectedRole === role.id && (
                    <div className="mt-4 pt-4 border-t border-slate-500">
                      <p className="text-slate-300 font-semibold mb-2">Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((perm) => (
                          <span
                            key={perm}
                            className="px-3 py-1 bg-slate-600 text-slate-100 rounded-full text-sm"
                          >
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                Add User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Role</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map((user) => (
                    <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-slate-300">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.status === 'active'
                              ? 'bg-green-600 text-white'
                              : 'bg-red-600 text-white'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Permission Management</h2>

            <div className="grid gap-4">
              {MOCK_PERMISSIONS.map((permission) => (
                <div key={permission.id} className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white">{permission.name}</h3>
                      <p className="text-slate-400 mt-2">{permission.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-slate-600 text-slate-200 rounded-full text-sm font-semibold">
                      ID: {permission.id}
                    </span>
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