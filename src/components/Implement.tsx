/**
 * Implement — Role-based access control for Internal Job Postings Portal
 *
 * Features: role selection, permission display, access level indicators, role-based UI elements, permission matrix
 *
 * Ticket: SCRUM-1001 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

type UserRole = 'Employee' | 'Hiring Manager' | 'HR Partner' | 'Workforce Planning'

interface Permission {
  id: string
  name: string
  description: string
  roles: UserRole[]
}

interface RoleInfo {
  role: UserRole
  description: string
  level: number
  color: string
}

// Mock data: Role definitions
const ROLE_DEFINITIONS: RoleInfo[] = [
  {
    role: 'Employee',
    description: 'Standard employee with basic job search access',
    level: 1,
    color: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    role: 'Hiring Manager',
    description: 'Can post jobs and manage applications for their team',
    level: 2,
    color: 'bg-green-100 text-green-800 border-green-300'
  },
  {
    role: 'HR Partner',
    description: 'Full access to job postings and application management',
    level: 3,
    color: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  {
    role: 'Workforce Planning',
    description: 'Strategic oversight and analytics for workforce planning',
    level: 4,
    color: 'bg-orange-100 text-orange-800 border-orange-300'
  }
]

// Mock data: System permissions
const PERMISSIONS: Permission[] = [
  {
    id: 'perm-1',
    name: 'View Job Postings',
    description: 'Browse and search internal job opportunities',
    roles: ['Employee', 'Hiring Manager', 'HR Partner', 'Workforce Planning']
  },
  {
    id: 'perm-2',
    name: 'Apply to Jobs',
    description: 'Submit applications for internal positions',
    roles: ['Employee', 'Hiring Manager', 'HR Partner', 'Workforce Planning']
  },
  {
    id: 'perm-3',
    name: 'Create Job Postings',
    description: 'Post new job openings for your department',
    roles: ['Hiring Manager', 'HR Partner', 'Workforce Planning']
  },
  {
    id: 'perm-4',
    name: 'Review Applications',
    description: 'Access and evaluate candidate applications',
    roles: ['Hiring Manager', 'HR Partner', 'Workforce Planning']
  },
  {
    id: 'perm-5',
    name: 'Manage All Postings',
    description: 'Edit or remove any job posting across all departments',
    roles: ['HR Partner', 'Workforce Planning']
  },
  {
    id: 'perm-6',
    name: 'View Analytics Dashboard',
    description: 'Access hiring metrics and workforce planning data',
    roles: ['HR Partner', 'Workforce Planning']
  },
  {
    id: 'perm-7',
    name: 'Configure RBAC Settings',
    description: 'Modify role permissions and access control rules',
    roles: ['Workforce Planning']
  },
  {
    id: 'perm-8',
    name: 'Export Reports',
    description: 'Generate and download compliance and audit reports',
    roles: ['Workforce Planning']
  }
]

export default function Implement() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('Employee')
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false)

  const currentRoleInfo = ROLE_DEFINITIONS.find(r => r.role === selectedRole)
  const allowedPermissions = PERMISSIONS.filter(p => p.roles.includes(selectedRole))

  const hasAccess = (permission: Permission): boolean => {
    return permission.roles.includes(selectedRole)
  }

  return (
    <div data-testid="implement" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Role-Based Access Control
          </h1>
          <p className="text-gray-600">
            Internal Job Postings Portal - Authentication & Authorization System
          </p>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label htmlFor="role-select" className="block text-sm font-semibold text-gray-700 mb-3">
            Select Your Role
          </label>
          <select
            id="role-select"
            data-testid="implement-role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          >
            {ROLE_DEFINITIONS.map((role) => (
              <option key={role.role} value={role.role}>
                {role.role} (Level {role.level})
              </option>
            ))}
          </select>

          {/* Current Role Info */}
          {currentRoleInfo && (
            <div className={`mt-4 p-4 rounded-lg border-2 ${currentRoleInfo.color}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{currentRoleInfo.role}</h3>
                  <p className="text-sm mt-1">{currentRoleInfo.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">Level {currentRoleInfo.level}</div>
                  <div className="text-xs">Access Level</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              data-testid="implement-view-permissions"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View My Permissions
            </button>
            <button
              data-testid="implement-toggle-matrix"
              onClick={() => setShowPermissionMatrix(!showPermissionMatrix)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              {showPermissionMatrix ? 'Hide' : 'Show'} Permission Matrix
            </button>
            <button
              data-testid="implement-test-access"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Test Access Level
            </button>
          </div>
        </div>

        {/* Allowed Permissions for Current Role */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Your Permissions ({allowedPermissions.length})
          </h2>
          <div data-testid="implement-list" className="space-y-3">
            {allowedPermissions.map((permission) => (
              <div
                key={permission.id}
                data-testid="implement-item"
                className="flex items-start p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg"
              >
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-semibold text-gray-900">{permission.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permission Matrix */}
        {showPermissionMatrix && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Permission Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                      Permission
                    </th>
                    {ROLE_DEFINITIONS.map((role) => (
                      <th
                        key={role.role}
                        className="border border-gray-300 px-4 py-3 text-center font-semibold text-sm"
                      >
                        {role.role}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map((permission, idx) => (
                    <tr key={permission.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="font-medium text-gray-900">{permission.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{permission.description}</div>
                      </td>
                      {ROLE_DEFINITIONS.map((role) => (
                        <td key={role.role} className="border border-gray-300 px-4 py-3 text-center">
                          {permission.roles.includes(role.role) ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500 rounded-full">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Access Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Access Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-3xl font-bold text-blue-700">{allowedPermissions.length}</div>
              <div className="text-sm text-blue-600 mt-1">Active Permissions</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-3xl font-bold text-purple-700">{currentRoleInfo?.level}</div>
              <div className="text-sm text-purple-600 mt-1">Access Level</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-3xl font-bold text-green-700">{PERMISSIONS.length}</div>
              <div className="text-sm text-green-600 mt-1">Total Permissions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
