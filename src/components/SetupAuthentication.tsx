/**
 * SetupAuthentication — Authentication and role-based access control configuration
 *
 * Features: auth provider selection, role management, permission mapping, user assignment, security settings
 *
 * Ticket: SCRUM-1264 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

interface AuthProvider {
  id: string
  name: string
  enabled: boolean
  type: string
}

interface Role {
  id: string
  name: string
  permissions: string[]
  color: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
}

const mockAuthProviders: AuthProvider[] = [
  { id: '1', name: 'Email/Password', enabled: true, type: 'local' },
  { id: '2', name: 'Google OAuth', enabled: true, type: 'oauth' },
  { id: '3', name: 'Microsoft Azure AD', enabled: false, type: 'saml' },
  { id: '4', name: 'GitHub', enabled: true, type: 'oauth' },
  { id: '5', name: 'LDAP', enabled: false, type: 'ldap' },
]

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
    color: 'red',
  },
  {
    id: '2',
    name: 'Teacher',
    permissions: ['read', 'write', 'grade_assignments', 'view_students'],
    color: 'blue',
  },
  {
    id: '3',
    name: 'Student',
    permissions: ['read', 'submit_assignments', 'view_grades'],
    color: 'green',
  },
  {
    id: '4',
    name: 'Parent',
    permissions: ['read', 'view_student_progress'],
    color: 'purple',
  },
  {
    id: '5',
    name: 'Guest',
    permissions: ['read'],
    color: 'gray',
  },
]

const mockUsers: User[] = [
  { id: '1', name: 'Sarah Admin', email: 'sarah@school.edu', role: 'Admin', status: 'active' },
  { id: '2', name: 'John Teacher', email: 'john.t@school.edu', role: 'Teacher', status: 'active' },
  { id: '3', name: 'Emma Student', email: 'emma.s@student.edu', role: 'Student', status: 'active' },
  { id: '4', name: 'Bob Parent', email: 'bob.p@parent.com', role: 'Parent', status: 'active' },
  { id: '5', name: 'Alice Teacher', email: 'alice.t@school.edu', role: 'Teacher', status: 'active' },
  { id: '6', name: 'Charlie Student', email: 'charlie.s@student.edu', role: 'Student', status: 'inactive' },
  { id: '7', name: 'Diana Guest', email: 'diana.g@guest.com', role: 'Guest', status: 'active' },
]

export default function SetupAuthentication() {
  const [selectedTab, setSelectedTab] = useState<'providers' | 'roles' | 'users'>('providers')
  const [providers, setProviders] = useState<AuthProvider[]>(mockAuthProviders)
  const [newRoleName, setNewRoleName] = useState('')

  const toggleProvider = (id: string) => {
    setProviders(
      providers.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    )
  }

  return (
    <section data-testid="setupauthentication" className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication & RBAC Setup</h1>
          <p className="text-gray-600">Configure authentication providers and role-based access control</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200">
          <button
            data-testid="setupauthentication-tab-providers"
            onClick={() => setSelectedTab('providers')}
            className={`px-6 py-3 font-medium transition-colors ${
              selectedTab === 'providers'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Auth Providers
          </button>
          <button
            data-testid="setupauthentication-tab-roles"
            onClick={() => setSelectedTab('roles')}
            className={`px-6 py-3 font-medium transition-colors ${
              selectedTab === 'roles'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Roles & Permissions
          </button>
          <button
            data-testid="setupauthentication-tab-users"
            onClick={() => setSelectedTab('users')}
            className={`px-6 py-3 font-medium transition-colors ${
              selectedTab === 'users'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            User Assignment
          </button>
        </div>

        {/* Auth Providers Tab */}
        {selectedTab === 'providers' && (
          <div data-testid="setupauthentication-providers">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Providers</h2>
              <p className="text-gray-600 text-sm">Enable or disable authentication methods for your application</p>
            </div>
            <div data-testid="setupauthentication-provider-list" className="space-y-3">
              {providers.map((provider) => (
                <div
                  key={provider.id}
                  data-testid="setupauthentication-provider-item"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        provider.enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900">{provider.name}</p>
                      <p className="text-sm text-gray-500">Type: {provider.type}</p>
                    </div>
                  </div>
                  <button
                    data-testid={`setupauthentication-toggle-${provider.id}`}
                    onClick={() => toggleProvider(provider.id)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      provider.enabled
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {provider.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
            <button
              data-testid="setupauthentication-add-provider"
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Custom Provider
            </button>
          </div>
        )}

        {/* Roles & Permissions Tab */}
        {selectedTab === 'roles' && (
          <div data-testid="setupauthentication-roles">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Roles & Permissions</h2>
              <p className="text-gray-600 text-sm">Manage user roles and their associated permissions</p>
            </div>
            <div data-testid="setupauthentication-role-list" className="space-y-4 mb-6">
              {mockRoles.map((role) => (
                <div
                  key={role.id}
                  data-testid="setupauthentication-role-item"
                  className="p-5 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`w-8 h-8 rounded-full bg-${role.color}-500 flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {role.name[0]}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-lg">{role.name}</h3>
                    </div>
                    <button
                      data-testid={`setupauthentication-edit-role-${role.id}`}
                      className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <input
                data-testid="setupauthentication-new-role-name"
                type="text"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="New role name..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                data-testid="setupauthentication-create-role"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Role
              </button>
            </div>
          </div>
        )}

        {/* User Assignment Tab */}
        {selectedTab === 'users' && (
          <div data-testid="setupauthentication-users">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">User Role Assignment</h2>
              <p className="text-gray-600 text-sm">Assign roles to users and manage access</p>
            </div>
            <div className="mb-4">
              <input
                data-testid="setupauthentication-search-users"
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div data-testid="setupauthentication-user-list" className="space-y-2">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  data-testid="setupauthentication-user-item"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      data-testid={`setupauthentication-user-role-${user.id}`}
                      defaultValue={user.role}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      {mockRoles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              data-testid="setupauthentication-invite-user"
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Invite User
            </button>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            data-testid="setupauthentication-cancel"
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            data-testid="setupauthentication-save"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </section>
  )
}
