import { useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'stylist' | 'customer'
  isActive: boolean
  lastLogin: string
}

interface Permission {
  id: string
  name: string
  description: string
  roles: string[]
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@hairsaloon.com',
    name: 'Admin User',
    role: 'admin',
    isActive: true,
    lastLogin: '2026-08-12 09:30'
  },
  {
    id: '2',
    email: 'sarah.stylist@hairsaloon.com',
    name: 'Sarah Johnson',
    role: 'stylist',
    isActive: true,
    lastLogin: '2026-08-12 08:15'
  },
  {
    id: '3',
    email: 'mike.stylist@hairsaloon.com',
    name: 'Mike Thompson',
    role: 'stylist',
    isActive: true,
    lastLogin: '2026-08-11 17:45'
  },
  {
    id: '4',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'customer',
    isActive: true,
    lastLogin: '2026-08-10 14:20'
  },
  {
    id: '5',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'customer',
    isActive: false,
    lastLogin: '2026-07-28 11:00'
  }
]

const MOCK_PERMISSIONS: Permission[] = [
  {
    id: 'p1',
    name: 'Manage Bookings',
    description: 'Create, edit, and cancel bookings',
    roles: ['admin', 'stylist']
  },
  {
    id: 'p2',
    name: 'View Reports',
    description: 'Access business reports and analytics',
    roles: ['admin']
  },
  {
    id: 'p3',
    name: 'Manage Users',
    description: 'Create and manage user accounts',
    roles: ['admin']
  },
  {
    id: 'p4',
    name: 'Update Profile',
    description: 'Edit own profile and preferences',
    roles: ['admin', 'stylist', 'customer']
  },
  {
    id: 'p5',
    name: 'View Schedule',
    description: 'View appointment schedules',
    roles: ['admin', 'stylist', 'customer']
  }
]

export default function SetUpAuthentication() {
  const [selectedTab, setSelectedTab] = useState<'users' | 'permissions' | 'roles'>('users')
  const [selectedRole, setSelectedRole] = useState<string>('all')

  const filteredUsers = selectedRole === 'all' 
    ? MOCK_USERS 
    : MOCK_USERS.filter(user => user.role === selectedRole)

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'stylist':
        return 'bg-blue-100 text-blue-800'
      case 'customer':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication & Authorization System
          </h1>
          <p className="text-gray-600">
            Manage users, roles, and permissions for your hair salon booking system
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setSelectedTab('users')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'users'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users ({MOCK_USERS.length})
              </button>
              <button
                onClick={() => setSelectedTab('permissions')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'permissions'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Permissions ({MOCK_PERMISSIONS.length})
              </button>
              <button
                onClick={() => setSelectedTab('roles')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'roles'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Roles
              </button>
            </nav>
          </div>

          {/* Users Tab */}
          {selectedTab === 'users' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRole('all')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedRole === 'all'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Users
                  </button>
                  <button
                    onClick={() => setSelectedRole('admin')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedRole === 'admin'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Admins
                  </button>
                  <button
                    onClick={() => setSelectedRole('stylist')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedRole === 'stylist'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Stylists
                  </button>
                  <button
                    onClick={() => setSelectedRole('customer')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedRole === 'customer'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Customers
                  </button>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                  + Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-medium">
                                {user.name.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-purple-600 hover:text-purple-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {selectedTab === 'permissions' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Permission Management</h2>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                  + Add Permission
                </button>
              </div>

              <div className="grid gap-4">
                {MOCK_PERMISSIONS.map(permission => (
                  <div key={permission.id} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {permission.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {permission.description}
                        </p>
                        <div className="flex gap-2">
                          <span className="text-xs text-gray-500 font-medium">Assigned to:</span>
                          {permission.roles.map(role => (
                            <span key={role} className={`px-2 py-1 text-xs font-semibold rounded ${getRoleBadgeColor(role)}`}>
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded transition-colors">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {selectedTab === 'roles' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Role Management</h2>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                  + Add Role
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Admin Role */}
                <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
                  <div className="h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">A</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Admin</h3>
                  <p className="text-sm text-gray-600 mb-4">Full system access and control</p>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-700">
                      <span className="font-semibold">Users:</span> {MOCK_USERS.filter(u => u.role === 'admin').length}
                    </div>
                    <div className="text-xs text-gray-700">
                      <span className="font-semibold">Permissions:</span> All
                    </div>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-white border border-purple-300 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-100 transition-colors">
                    Manage
                  </button>
                </div>

                {/* Stylist Role */}
                <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                  <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">S</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Stylist</h3>
                  <p className="text-sm text-gray-600 mb-4">Manage bookings and schedule</p>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-700">
                      <span className="font-semibold">Users:</span> {MOCK_USERS.filter(u => u.role === 'stylist').length}
                    </div>
                    <div className="text-xs text-gray-700">
                      <span className="font-semibold">Permissions:</span> {MOCK_PERMISSIONS.filter(p => p.roles.includes('stylist')).length}
                    </div>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                    Manage
                  </button>
                </div>

                {/* Customer Role */}
                <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                  <div className="h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">C</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Customer</h3>
                  <p className="text-sm text-gray-600 mb-4">Book and manage appointments</p>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-700">
                      <span className="font-semibold">Users:</span> {MOCK_USERS.filter(u => u.role === 'customer').length}
                    </div>
                    <div className="text-xs text-gray-700">
                      <span className="font-semibold">Permissions:</span> {MOCK_PERMISSIONS.filter(p => p.roles.includes('customer')).length}
                    </div>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-white border border-green-300 text-green-700 rounded-md text-sm font-medium hover:bg-green-100 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Users</div>
            <div className="text-3xl font-bold text-gray-900">{MOCK_USERS.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Active Users</div>
            <div className="text-3xl font-bold text-green-600">
              {MOCK_USERS.filter(u => u.isActive).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Roles</div>
            <div className="text-3xl font-bold text-gray-900">3</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Permissions</div>
            <div className="text-3xl font-bold text-gray-900">{MOCK_PERMISSIONS.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
