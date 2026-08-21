/**
 * ImplementRbac — Role-Based Access Control for school absence reporting
 *
 * Features: role-based permissions, user role management, permission matrix display, access control rules, audit logging
 *
 * Ticket: SCRUM-1080 | Branch: proto/SCRUM-1070
 */

import React, { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'teacher' | 'parent' | 'student' | 'staff'
}

interface Permission {
  id: string
  action: string
  resource: string
  description: string
}

interface RolePermission {
  role: string
  permissions: string[]
}

interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  timestamp: string
  result: 'allowed' | 'denied'
}

const mockUsers: User[] = [
  { id: '1', name: 'Dr. Sarah Mitchell', email: 'sarah.mitchell@school.edu', role: 'admin' },
  { id: '2', name: 'John Thompson', email: 'john.thompson@school.edu', role: 'teacher' },
  { id: '3', name: 'Maria Garcia', email: 'maria.garcia@parent.com', role: 'parent' },
  { id: '4', name: 'Emily Chen', email: 'emily.chen@student.school.edu', role: 'student' },
  { id: '5', name: 'David Wilson', email: 'david.wilson@school.edu', role: 'staff' },
  { id: '6', name: 'Robert Johnson', email: 'robert.johnson@school.edu', role: 'teacher' },
  { id: '7', name: 'Lisa Anderson', email: 'lisa.anderson@parent.com', role: 'parent' }
]

const mockPermissions: Permission[] = [
  { id: 'p1', action: 'create', resource: 'absence_report', description: 'Create absence reports' },
  { id: 'p2', action: 'read', resource: 'absence_report', description: 'View absence reports' },
  { id: 'p3', action: 'update', resource: 'absence_report', description: 'Edit absence reports' },
  { id: 'p4', action: 'delete', resource: 'absence_report', description: 'Delete absence reports' },
  { id: 'p5', action: 'approve', resource: 'absence_report', description: 'Approve/reject absence reports' },
  { id: 'p6', action: 'read', resource: 'all_reports', description: 'View all absence reports' },
  { id: 'p7', action: 'export', resource: 'absence_report', description: 'Export absence data' },
  { id: 'p8', action: 'manage', resource: 'users', description: 'Manage user roles' }
]

const mockRolePermissions: RolePermission[] = [
  { role: 'admin', permissions: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] },
  { role: 'teacher', permissions: ['p1', 'p2', 'p3', 'p5', 'p6', 'p7'] },
  { role: 'parent', permissions: ['p1', 'p2', 'p3'] },
  { role: 'student', permissions: ['p2'] },
  { role: 'staff', permissions: ['p2', 'p6', 'p7'] }
]

const mockAuditLogs: AuditLog[] = [
  { id: 'a1', userId: '1', userName: 'Dr. Sarah Mitchell', action: 'approve', resource: 'absence_report', timestamp: '2026-08-21T10:30:00', result: 'allowed' },
  { id: 'a2', userId: '3', userName: 'Maria Garcia', action: 'create', resource: 'absence_report', timestamp: '2026-08-21T09:15:00', result: 'allowed' },
  { id: 'a3', userId: '4', userName: 'Emily Chen', action: 'delete', resource: 'absence_report', timestamp: '2026-08-21T08:45:00', result: 'denied' },
  { id: 'a4', userId: '2', userName: 'John Thompson', action: 'read', resource: 'all_reports', timestamp: '2026-08-21T11:20:00', result: 'allowed' },
  { id: 'a5', userId: '5', userName: 'David Wilson', action: 'export', resource: 'absence_report', timestamp: '2026-08-21T14:00:00', result: 'allowed' },
  { id: 'a6', userId: '3', userName: 'Maria Garcia', action: 'approve', resource: 'absence_report', timestamp: '2026-08-21T13:30:00', result: 'denied' },
  { id: 'a7', userId: '6', userName: 'Robert Johnson', action: 'update', resource: 'absence_report', timestamp: '2026-08-21T12:10:00', result: 'allowed' }
]

export default function ImplementRbac() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'permissions' | 'users' | 'audit'>('permissions')

  const getRolePermissions = (role: string): string[] => {
    const rolePerms = mockRolePermissions.find(rp => rp.role === role)
    return rolePerms ? rolePerms.permissions : []
  }

  const hasPermission = (user: User, permissionId: string): boolean => {
    const userPermissions = getRolePermissions(user.role)
    return userPermissions.includes(permissionId)
  }

  const getRoleBadgeColor = (role: string): string => {
    const colors: Record<string, string> = {
      admin: 'bg-purple-100 text-purple-800',
      teacher: 'bg-blue-100 text-blue-800',
      parent: 'bg-green-100 text-green-800',
      student: 'bg-yellow-100 text-yellow-800',
      staff: 'bg-gray-100 text-gray-800'
    }
    return colors[role] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div data-testid="implementrbac" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Role-Based Access Control
          </h1>
          <p className="text-gray-600">
            Manage permissions and access control for absence reporting system
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                data-testid="implementrbac-tab-permissions"
                onClick={() => setActiveTab('permissions')}
                className={`px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'permissions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Permission Matrix
              </button>
              <button
                data-testid="implementrbac-tab-users"
                onClick={() => setActiveTab('users')}
                className={`px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                User Roles
              </button>
              <button
                data-testid="implementrbac-tab-audit"
                onClick={() => setActiveTab('audit')}
                className={`px-6 py-3 font-medium text-sm border-b-2 ${
                  activeTab === 'audit'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Audit Log
              </button>
            </nav>
          </div>
        </div>

        {/* Permission Matrix Tab */}
        {activeTab === 'permissions' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Permission Matrix</h2>
            <p className="text-sm text-gray-600 mb-6">
              View which roles have access to specific actions and resources
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permission
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Teacher
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parent
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff
                    </th>
                  </tr>
                </thead>
                <tbody data-testid="implementrbac-list" className="bg-white divide-y divide-gray-200">
                  {mockPermissions.map(permission => (
                    <tr key={permission.id} data-testid="implementrbac-item">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {permission.action.toUpperCase()} {permission.resource}
                        </div>
                        <div className="text-sm text-gray-500">{permission.description}</div>
                      </td>
                      {['admin', 'teacher', 'parent', 'student', 'staff'].map(role => {
                        const rolePerms = getRolePermissions(role)
                        const hasAccess = rolePerms.includes(permission.id)
                        return (
                          <td key={role} className="px-6 py-4 whitespace-nowrap text-center">
                            {hasAccess ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 rounded-full">
                                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Roles Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                <p className="text-sm text-gray-600 mt-1">
                  View and manage user role assignments
                </p>
              </div>
              <button
                data-testid="implementrbac-add-user"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add User
              </button>
            </div>

            <div data-testid="implementrbac-user-list" className="space-y-4">
              {mockUsers.map(user => (
                <div
                  key={user.id}
                  data-testid="implementrbac-user-item"
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role.toUpperCase()}
                      </span>
                      <button
                        data-testid="implementrbac-view-permissions"
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        View Permissions
                      </button>
                      <button
                        data-testid="implementrbac-edit-role"
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 font-medium"
                      >
                        Edit Role
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected User Permissions */}
            {selectedUser && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Permissions for {selectedUser.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockPermissions.map(permission => {
                    const hasAccess = hasPermission(selectedUser, permission.id)
                    return (
                      <div
                        key={permission.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          hasAccess ? 'bg-green-50' : 'bg-gray-50'
                        }`}
                      >
                        {hasAccess ? (
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {permission.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {permission.action} • {permission.resource}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Audit Log Tab */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Audit Log</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Track all access attempts and permission checks
                </p>
              </div>
              <button
                data-testid="implementrbac-export-logs"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Export Logs
              </button>
            </div>

            <div data-testid="implementrbac-audit-list" className="space-y-3">
              {mockAuditLogs.map(log => (
                <div
                  key={log.id}
                  data-testid="implementrbac-audit-item"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      log.result === 'allowed' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {log.result === 'allowed' ? (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {log.userName} attempted to <span className="font-semibold">{log.action}</span> {log.resource}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    log.result === 'allowed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {log.result.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
