/**
 * SetupRbac — RBAC and SSO integration configuration interface
 *
 * Features: role management, permission assignment, SSO provider setup, access control rules, user role mapping
 *
 * Ticket: SCRUM-671 | Branch: proto/SCRUM-658
 */

import React, { useState } from 'react'

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface SSOProvider {
  id: string
  name: string
  type: 'SAML' | 'OAuth2' | 'OIDC'
  status: 'active' | 'inactive' | 'pending'
  domain: string
}

interface Permission {
  id: string
  name: string
  category: string
  description: string
}

interface UserRoleMapping {
  id: string
  userName: string
  email: string
  roles: string[]
  lastLogin: string
}

const MOCK_ROLES: Role[] = [
  {
    id: 'role-1',
    name: 'Admin',
    description: 'Full system access and configuration',
    permissions: ['read', 'write', 'delete', 'configure', 'manage-users'],
    userCount: 3
  },
  {
    id: 'role-2',
    name: 'Legal Reviewer',
    description: 'Review and approve legal documents',
    permissions: ['read', 'write', 'review', 'approve'],
    userCount: 12
  },
  {
    id: 'role-3',
    name: 'Document Editor',
    description: 'Create and edit documents',
    permissions: ['read', 'write', 'create'],
    userCount: 25
  },
  {
    id: 'role-4',
    name: 'Viewer',
    description: 'Read-only access to documents',
    permissions: ['read'],
    userCount: 48
  },
  {
    id: 'role-5',
    name: 'Compliance Officer',
    description: 'Monitor compliance and generate reports',
    permissions: ['read', 'audit', 'report', 'export'],
    userCount: 7
  }
]

const MOCK_SSO_PROVIDERS: SSOProvider[] = [
  {
    id: 'sso-1',
    name: 'Okta',
    type: 'SAML',
    status: 'active',
    domain: 'company.okta.com'
  },
  {
    id: 'sso-2',
    name: 'Azure AD',
    type: 'OIDC',
    status: 'active',
    domain: 'login.microsoftonline.com'
  },
  {
    id: 'sso-3',
    name: 'Google Workspace',
    type: 'OAuth2',
    status: 'inactive',
    domain: 'accounts.google.com'
  },
  {
    id: 'sso-4',
    name: 'OneLogin',
    type: 'SAML',
    status: 'pending',
    domain: 'company.onelogin.com'
  },
  {
    id: 'sso-5',
    name: 'Auth0',
    type: 'OIDC',
    status: 'active',
    domain: 'company.auth0.com'
  }
]

const MOCK_PERMISSIONS: Permission[] = [
  {
    id: 'perm-1',
    name: 'read',
    category: 'Documents',
    description: 'View documents and metadata'
  },
  {
    id: 'perm-2',
    name: 'write',
    category: 'Documents',
    description: 'Edit and update documents'
  },
  {
    id: 'perm-3',
    name: 'delete',
    category: 'Documents',
    description: 'Delete documents'
  },
  {
    id: 'perm-4',
    name: 'approve',
    category: 'Workflow',
    description: 'Approve document changes'
  },
  {
    id: 'perm-5',
    name: 'configure',
    category: 'System',
    description: 'Configure system settings'
  },
  {
    id: 'perm-6',
    name: 'manage-users',
    category: 'Administration',
    description: 'Manage users and roles'
  },
  {
    id: 'perm-7',
    name: 'audit',
    category: 'Compliance',
    description: 'Access audit logs'
  }
]

const MOCK_USER_MAPPINGS: UserRoleMapping[] = [
  {
    id: 'map-1',
    userName: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    roles: ['Admin', 'Legal Reviewer'],
    lastLogin: '2026-08-12 09:30'
  },
  {
    id: 'map-2',
    userName: 'Michael Torres',
    email: 'michael.torres@company.com',
    roles: ['Legal Reviewer'],
    lastLogin: '2026-08-12 08:15'
  },
  {
    id: 'map-3',
    userName: 'Emma Johnson',
    email: 'emma.johnson@company.com',
    roles: ['Document Editor'],
    lastLogin: '2026-08-11 16:45'
  },
  {
    id: 'map-4',
    userName: 'David Park',
    email: 'david.park@company.com',
    roles: ['Compliance Officer', 'Legal Reviewer'],
    lastLogin: '2026-08-12 10:00'
  },
  {
    id: 'map-5',
    userName: 'Lisa Rodriguez',
    email: 'lisa.rodriguez@company.com',
    roles: ['Viewer'],
    lastLogin: '2026-08-10 14:20'
  }
]

export default function SetupRbac() {
  const [activeTab, setActiveTab] = useState<'roles' | 'sso' | 'permissions' | 'mappings'>('roles')
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  const renderRolesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Role Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create Role
        </button>
      </div>
      <div className="grid gap-4">
        {MOCK_ROLES.map((role) => (
          <div
            key={role.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedRole === role.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedRole(role.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{role.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-gray-900">{role.userCount}</div>
                <div className="text-xs text-gray-500">users</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSSOTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">SSO Providers</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Provider
        </button>
      </div>
      <div className="grid gap-4">
        {MOCK_SSO_PROVIDERS.map((provider) => (
          <div
            key={provider.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedProvider === provider.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedProvider(provider.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      provider.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : provider.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {provider.status}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Type:</span> {provider.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Domain:</span> {provider.domain}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Configure
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPermissionsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Permission Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Permission
        </button>
      </div>
      <div className="space-y-6">
        {['Documents', 'Workflow', 'System', 'Administration', 'Compliance'].map((category) => {
          const categoryPerms = MOCK_PERMISSIONS.filter((p) => p.category === category)
          if (categoryPerms.length === 0) return null
          return (
            <div key={category} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">{category}</h4>
              <div className="space-y-2">
                {categoryPerms.map((perm) => (
                  <div
                    key={perm.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{perm.name}</div>
                      <div className="text-sm text-gray-600">{perm.description}</div>
                    </div>
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderMappingsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">User Role Mappings</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Assign Role
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Roles
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Last Login
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {MOCK_USER_MAPPINGS.map((mapping) => (
              <tr key={mapping.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {mapping.userName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{mapping.email}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {mapping.roles.map((role) => (
                      <span
                        key={role}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{mapping.lastLogin}</td>
                <td className="px-4 py-3 text-sm">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">RBAC & SSO Configuration</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage roles, permissions, and SSO integration
            </p>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex gap-1 px-6">
              <button
                onClick={() => setActiveTab('roles')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'roles'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Roles
              </button>
              <button
                onClick={() => setActiveTab('sso')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'sso'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                SSO Providers
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'permissions'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Permissions
              </button>
              <button
                onClick={() => setActiveTab('mappings')}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'mappings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                User Mappings
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'roles' && renderRolesTab()}
            {activeTab === 'sso' && renderSSOTab()}
            {activeTab === 'permissions' && renderPermissionsTab()}
            {activeTab === 'mappings' && renderMappingsTab()}
          </div>
        </div>
      </div>
    </div>
  )
}
