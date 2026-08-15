/**
 * SetupAuthentication — Authentication and RBAC configuration interface
 *
 * Features: user authentication setup, role-based access control, permission management, SSO configuration, security policies
 *
 * Ticket: SCRUM-890 | Branch: proto/SCRUM-879
 */

import { useState } from 'react'

interface AuthProvider {
  id: string
  name: string
  type: 'oauth' | 'saml' | 'ldap' | 'local'
  status: 'active' | 'inactive' | 'configuring'
  usersCount: number
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  usersCount: number
  isDefault: boolean
}

interface Permission {
  id: string
  name: string
  category: string
  description: string
}

const MOCK_AUTH_PROVIDERS: AuthProvider[] = [
  {
    id: 'ap1',
    name: 'Google OAuth',
    type: 'oauth',
    status: 'active',
    usersCount: 145
  },
  {
    id: 'ap2',
    name: 'Microsoft Azure AD',
    type: 'saml',
    status: 'active',
    usersCount: 230
  },
  {
    id: 'ap3',
    name: 'Okta SSO',
    type: 'saml',
    status: 'configuring',
    usersCount: 0
  },
  {
    id: 'ap4',
    name: 'Corporate LDAP',
    type: 'ldap',
    status: 'inactive',
    usersCount: 85
  },
  {
    id: 'ap5',
    name: 'Local Authentication',
    type: 'local',
    status: 'active',
    usersCount: 32
  }
]

const MOCK_ROLES: Role[] = [
  {
    id: 'r1',
    name: 'Administrator',
    description: 'Full system access and configuration',
    permissions: ['manage_users', 'manage_roles', 'manage_settings', 'view_all', 'edit_all'],
    usersCount: 5,
    isDefault: false
  },
  {
    id: 'r2',
    name: 'Manager',
    description: 'Department-level management and reporting',
    permissions: ['view_all', 'edit_team', 'approve_requests', 'view_reports'],
    usersCount: 23,
    isDefault: false
  },
  {
    id: 'r3',
    name: 'Employee',
    description: 'Standard employee access',
    permissions: ['view_own', 'edit_own', 'submit_requests'],
    usersCount: 387,
    isDefault: true
  },
  {
    id: 'r4',
    name: 'HR Staff',
    description: 'Human resources team access',
    permissions: ['view_all', 'edit_employee_data', 'manage_onboarding', 'view_reports'],
    usersCount: 12,
    isDefault: false
  },
  {
    id: 'r5',
    name: 'Guest',
    description: 'Limited read-only access',
    permissions: ['view_public'],
    usersCount: 8,
    isDefault: false
  }
]

const MOCK_PERMISSIONS: Permission[] = [
  {
    id: 'p1',
    name: 'manage_users',
    category: 'User Management',
    description: 'Create, edit, and delete user accounts'
  },
  {
    id: 'p2',
    name: 'manage_roles',
    category: 'User Management',
    description: 'Create and modify role definitions'
  },
  {
    id: 'p3',
    name: 'manage_settings',
    category: 'System',
    description: 'Configure system-wide settings'
  },
  {
    id: 'p4',
    name: 'view_all',
    category: 'Data Access',
    description: 'View all data across organization'
  },
  {
    id: 'p5',
    name: 'edit_all',
    category: 'Data Access',
    description: 'Edit all data across organization'
  },
  {
    id: 'p6',
    name: 'view_reports',
    category: 'Reporting',
    description: 'Access analytics and reports'
  },
  {
    id: 'p7',
    name: 'approve_requests',
    category: 'Workflow',
    description: 'Approve or reject workflow requests'
  }
]

export default function SetupAuthentication() {
  const [activeTab, setActiveTab] = useState<'providers' | 'roles' | 'permissions'>('providers')
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showNewProviderForm, setShowNewProviderForm] = useState(false)
  const [showNewRoleForm, setShowNewRoleForm] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'configuring':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'oauth':
        return 'bg-blue-100 text-blue-800'
      case 'saml':
        return 'bg-purple-100 text-purple-800'
      case 'ldap':
        return 'bg-indigo-100 text-indigo-800'
      case 'local':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="setupauthentication" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication & RBAC</h1>
          <p className="text-gray-600">Configure authentication providers and role-based access control</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                data-testid="setupauthentication-tab-providers"
                onClick={() => setActiveTab('providers')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'providers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Authentication Providers
              </button>
              <button
                data-testid="setupauthentication-tab-roles"
                onClick={() => setActiveTab('roles')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'roles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Roles & Permissions
              </button>
              <button
                data-testid="setupauthentication-tab-permissions"
                onClick={() => setActiveTab('permissions')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'permissions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Permission Matrix
              </button>
            </nav>
          </div>
        </div>

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Authentication Providers</h2>
                <p className="text-sm text-gray-600 mt-1">Manage SSO and authentication methods</p>
              </div>
              <button
                data-testid="setupauthentication-add-provider"
                onClick={() => setShowNewProviderForm(!showNewProviderForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Provider
              </button>
            </div>

            {showNewProviderForm && (
              <div data-testid="setupauthentication-provider-form" className="bg-white rounded-lg shadow-sm p-6 border-2 border-blue-200">
                <h3 className="text-lg font-semibold mb-4">New Authentication Provider</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider Name</label>
                    <input
                      data-testid="setupauthentication-provider-name"
                      type="text"
                      placeholder="e.g., Company SSO"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provider Type</label>
                    <select
                      data-testid="setupauthentication-provider-type"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="oauth">OAuth 2.0</option>
                      <option value="saml">SAML 2.0</option>
                      <option value="ldap">LDAP</option>
                      <option value="local">Local</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                    <input
                      data-testid="setupauthentication-provider-clientid"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
                    <input
                      data-testid="setupauthentication-provider-secret"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    data-testid="setupauthentication-save-provider"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Provider
                  </button>
                  <button
                    data-testid="setupauthentication-cancel-provider"
                    onClick={() => setShowNewProviderForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div data-testid="setupauthentication-providers-list" className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Users
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_AUTH_PROVIDERS.map((provider) => (
                    <tr key={provider.id} data-testid="setupauthentication-provider-item">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{provider.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(provider.type)}`}>
                          {provider.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(provider.status)}`}>
                          {provider.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {provider.usersCount} users
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <button
                          data-testid="setupauthentication-edit-provider"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          data-testid="setupauthentication-test-provider"
                          className="text-green-600 hover:text-green-800"
                        >
                          Test
                        </button>
                        <button
                          data-testid="setupauthentication-delete-provider"
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Roles & Permissions</h2>
                <p className="text-sm text-gray-600 mt-1">Define user roles and their access levels</p>
              </div>
              <button
                data-testid="setupauthentication-add-role"
                onClick={() => setShowNewRoleForm(!showNewRoleForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Role
              </button>
            </div>

            {showNewRoleForm && (
              <div data-testid="setupauthentication-role-form" className="bg-white rounded-lg shadow-sm p-6 border-2 border-blue-200">
                <h3 className="text-lg font-semibold mb-4">New Role</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                    <input
                      data-testid="setupauthentication-role-name"
                      type="text"
                      placeholder="e.g., Team Lead"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      data-testid="setupauthentication-role-description"
                      placeholder="Describe the role's responsibilities"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        data-testid="setupauthentication-role-default"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Set as default role for new users</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    data-testid="setupauthentication-save-role"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Role
                  </button>
                  <button
                    data-testid="setupauthentication-cancel-role"
                    onClick={() => setShowNewRoleForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div data-testid="setupauthentication-roles-list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_ROLES.map((role) => (
                <div
                  key={role.id}
                  data-testid="setupauthentication-role-item"
                  className={`bg-white rounded-lg shadow-sm p-6 border-2 transition-all cursor-pointer ${
                    selectedRole === role.id ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        {role.name}
                        {role.isDefault && (
                          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">Default</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Permissions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.map((perm) => (
                          <span key={perm} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{role.usersCount}</span> users assigned
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <button
                      data-testid="setupauthentication-edit-role"
                      className="flex-1 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit
                    </button>
                    <button
                      data-testid="setupauthentication-duplicate-role"
                      className="flex-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Duplicate
                    </button>
                    <button
                      data-testid="setupauthentication-delete-role"
                      className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Permission Matrix</h2>
              <p className="text-sm text-gray-600 mt-1">View and manage system permissions by category</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {Array.from(new Set(MOCK_PERMISSIONS.map(p => p.category))).map((category) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
                    <div data-testid="setupauthentication-permissions-list" className="space-y-2">
                      {MOCK_PERMISSIONS.filter(p => p.category === category).map((permission) => (
                        <div
                          key={permission.id}
                          data-testid="setupauthentication-permission-item"
                          className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="font-mono text-sm font-medium text-gray-900">{permission.name}</div>
                            <div className="text-sm text-gray-600 mt-1">{permission.description}</div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              data-testid="setupauthentication-edit-permission"
                              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                            >
                              Edit
                            </button>
                            <button
                              data-testid="setupauthentication-delete-permission"
                              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  data-testid="setupauthentication-add-permission"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add New Permission
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Enforce Multi-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Require all users to enable MFA</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  data-testid="setupauthentication-mfa-toggle"
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Session Timeout</h3>
                <p className="text-sm text-gray-600">Automatically log out inactive users</p>
              </div>
              <select
                data-testid="setupauthentication-session-timeout"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Password Policy</h3>
                <p className="text-sm text-gray-600">Minimum password requirements</p>
              </div>
              <select
                data-testid="setupauthentication-password-policy"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="basic">Basic (8 characters)</option>
                <option value="medium">Medium (10 characters, mixed case)</option>
                <option value="strong">Strong (12 characters, special chars)</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button
              data-testid="setupauthentication-save-security"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Security Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
