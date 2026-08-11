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
  const [activeTab, setActiveTab] = useState('overview')
  const [roles, setRoles] = useState(MOCK_ROLES)
  const [users, setUsers] = useState(MOCK_USERS)
  const [newRoleName, setNewRoleName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const handleAddRole = () => {
    if (newRoleName.trim()) {
      const newRole = {
        id: Math.max(...roles.map(r => r.id), 0) + 1,
        name: newRoleName,
        permissions: selectedPermissions
      }
      setRoles([...roles, newRole])
      setNewRoleName('')
      setSelectedPermissions([])
    }
  }

  const handleTogglePermission = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    )
  }

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter(r => r.id !== id))
  }

  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Authentication & RBAC Setup</h1>
          <p className="text-slate-600">Configure roles, permissions, and user access control</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          {['overview', 'roles', 'users', 'permissions'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <h3 className="text-slate-600 text-sm font-semibold mb-2">Total Roles</h3>
              <p className="text-3xl font-bold text-slate-900">{roles.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <h3 className="text-slate-600 text-sm font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-slate-900">{users.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <h3 className="text-slate-600 text-sm font-semibold mb-2">Total Permissions</h3>
              <p className="text-3xl font-bold text-slate-900">{MOCK_PERMISSIONS.length}</p>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Create New Role</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Role Name</label>
                  <input
                    type="text"
                    value={newRoleName}
                    onChange={e => setNewRoleName(e.target.value)}
                    placeholder="Enter role name"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Permissions</label>
                  <div className="space-y-2">
                    {MOCK_PERMISSIONS.map(perm => (
                      <label key={perm.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(perm.name)}
                          onChange={() => handleTogglePermission(perm.name)}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-slate-700">{perm.name}</span>
                        <span className="text-slate-500 text-sm">({perm.description})</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleAddRole}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Create Role
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">Existing Roles</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {roles.map(role => (
                  <div key={role.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-900">{role.name}</h3>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map(perm => (
                        <span key={perm} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-900 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleUserStatus(user.id)}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_PERMISSIONS.map(perm => (
              <div key={perm.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{perm.name}</h3>
                <p className="text-slate-600 mb-4">{perm.description}</p>
                <div className="text-sm text-slate-500">
                  Used by {roles.filter(r => r.permissions.includes(perm.name)).length} role(s)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}