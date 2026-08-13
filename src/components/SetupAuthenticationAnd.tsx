/**
 * SetupAuthenticationAnd — Authentication and Role-Based Access Control setup for physiotherapists
 *
 * Features: user authentication, role management, permission assignment, RBAC configuration, access control
 *
 * Ticket: SCRUM-731 | Branch: proto/SCRUM-717
 */

import { useState } from 'react'

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
}

const MOCK_PERMISSIONS: Permission[] = [
  { id: 'p1', name: 'view_patients', description: 'View patient records', category: 'Patients' },
  { id: 'p2', name: 'edit_patients', description: 'Edit patient information', category: 'Patients' },
  { id: 'p3', name: 'create_appointments', description: 'Create and schedule appointments', category: 'Appointments' },
  { id: 'p4', name: 'manage_appointments', description: 'Modify and cancel appointments', category: 'Appointments' },
  { id: 'p5', name: 'view_reports', description: 'View clinical reports', category: 'Reports' },
  { id: 'p6', name: 'create_reports', description: 'Create and edit reports', category: 'Reports' },
  { id: 'p7', name: 'manage_users', description: 'Manage user accounts', category: 'Administration' },
  { id: 'p8', name: 'configure_system', description: 'Configure system settings', category: 'Administration' },
]

const MOCK_ROLES: Role[] = [
  { id: 'r1', name: 'Senior Physiotherapist', description: 'Full clinical access with administrative privileges', permissions: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'], userCount: 3 },
  { id: 'r2', name: 'Physiotherapist', description: 'Standard clinical access for patient care', permissions: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'], userCount: 12 },
  { id: 'r3', name: 'Junior Physiotherapist', description: 'Limited access for supervised practice', permissions: ['p1', 'p3', 'p5'], userCount: 5 },
  { id: 'r4', name: 'Receptionist', description: 'Administrative support with appointment management', permissions: ['p1', 'p3', 'p4'], userCount: 4 },
  { id: 'r5', name: 'System Administrator', description: 'Full system access and configuration', permissions: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'], userCount: 2 },
]

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Dr. Sarah Mitchell', email: 'sarah.mitchell@clinic.com', role: 'Senior Physiotherapist', status: 'active', lastLogin: '2026-08-13 09:30' },
  { id: 'u2', name: 'James Thompson', email: 'james.thompson@clinic.com', role: 'Physiotherapist', status: 'active', lastLogin: '2026-08-13 08:15' },
  { id: 'u3', name: 'Emily Chen', email: 'emily.chen@clinic.com', role: 'Junior Physiotherapist', status: 'active', lastLogin: '2026-08-12 16:45' },
  { id: 'u4', name: 'Michael Roberts', email: 'michael.roberts@clinic.com', role: 'Receptionist', status: 'active', lastLogin: '2026-08-13 07:00' },
  { id: 'u5', name: 'Lisa Anderson', email: 'lisa.anderson@clinic.com', role: 'Physiotherapist', status: 'pending', lastLogin: 'Never' },
  { id: 'u6', name: 'David Park', email: 'david.park@clinic.com', role: 'System Administrator', status: 'active', lastLogin: '2026-08-13 10:00' },
]

export default function SetupAuthenticationAnd() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions'>('users')
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = MOCK_USERS.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleDetails = (roleId: string) => MOCK_ROLES.find(r => r.id === roleId)

  const getPermissionsByCategory = () => {
    const categories: Record<string, Permission[]> = {}
    MOCK_PERMISSIONS.forEach(perm => {
      if (!categories[perm.category]) {
        categories[perm.category] = []
      }
      categories[perm.category].push(perm)
    })
    return categories
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication & RBAC Setup</h1>
          <p className="text-gray-600">Manage user authentication and role-based access control for physiotherapists</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-3 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users ({MOCK_USERS.length})
              </button>
              <button
                onClick={() => setActiveTab('roles')}
                className={`px-6 py-3 border-b-2 font-medium text-sm ${
                  activeTab === 'roles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Roles ({MOCK_ROLES.length})
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`px-6 py-3 border-b-2 font-medium text-sm ${
                  activeTab === 'permissions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Permissions ({MOCK_PERMISSIONS.length})
              </button>
            </nav>
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Login</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4 text-gray-700">{user.role}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{user.lastLogin}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Create Role
                </button>
              </div>

              <div className="grid gap-4">
                {MOCK_ROLES.map(role => (
                  <div
                    key={role.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedRole === role.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{role.description}</p>
                      </div>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {role.userCount} users
                      </span>
                    </div>

                    {selectedRole === role.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Assigned Permissions:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {role.permissions.map(permId => {
                            const perm = MOCK_PERMISSIONS.find(p => p.id === permId)
                            return perm ? (
                              <div key={permId} className="flex items-center text-sm">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                <span className="text-gray-700">{perm.name}</span>
                              </div>
                            ) : null
                          })}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                            Edit Role
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                            Duplicate
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === 'permissions' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Permission Registry</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Add Permission
                </button>
              </div>

              {Object.entries(getPermissionsByCategory()).map(([category, perms]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="w-1 h-6 bg-blue-500 mr-2 rounded"></span>
                    {category}
                  </h3>
                  <div className="grid gap-3">
                    {perms.map(perm => (
                      <div key={perm.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{perm.name}</h4>
                            <p className="text-gray-600 text-sm mt-1">{perm.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                          Used in {MOCK_ROLES.filter(r => r.permissions.includes(perm.id)).length} role(s)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Overview</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{MOCK_USERS.filter(u => u.status === 'active').length}</div>
              <div className="text-sm text-gray-600 mt-1">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{MOCK_ROLES.length}</div>
              <div className="text-sm text-gray-600 mt-1">Defined Roles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{MOCK_PERMISSIONS.length}</div>
              <div className="text-sm text-gray-600 mt-1">Permissions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{MOCK_USERS.filter(u => u.status === 'pending').length}</div>
              <div className="text-sm text-gray-600 mt-1">Pending Approval</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
