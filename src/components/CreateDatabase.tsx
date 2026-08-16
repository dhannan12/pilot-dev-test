/**
 * CreateDatabase — Database schema and migrations management interface
 *
 * Features: Schema creation, migration tracking, table management, version control, deployment status
 *
 * Ticket: SCRUM-948 | Branch: proto/SCRUM-938
 */

import React, { useState } from 'react'

interface Migration {
  id: string
  version: string
  name: string
  status: 'pending' | 'applied' | 'failed'
  createdAt: string
  appliedAt?: string
  description: string
}

interface TableSchema {
  id: string
  name: string
  columns: number
  rows: number
  size: string
  status: 'active' | 'migrating' | 'error'
}

const mockMigrations: Migration[] = [
  {
    id: '1',
    version: '001',
    name: 'create_students_table',
    status: 'applied',
    createdAt: '2026-08-01T10:00:00Z',
    appliedAt: '2026-08-01T10:05:00Z',
    description: 'Initial students table with basic fields'
  },
  {
    id: '2',
    version: '002',
    name: 'create_absences_table',
    status: 'applied',
    createdAt: '2026-08-02T14:30:00Z',
    appliedAt: '2026-08-02T14:32:00Z',
    description: 'Absences tracking table with foreign key to students'
  },
  {
    id: '3',
    version: '003',
    name: 'create_teachers_table',
    status: 'applied',
    createdAt: '2026-08-03T09:15:00Z',
    appliedAt: '2026-08-03T09:17:00Z',
    description: 'Teachers table with role and department fields'
  },
  {
    id: '4',
    version: '004',
    name: 'add_notifications_table',
    status: 'applied',
    createdAt: '2026-08-05T11:20:00Z',
    appliedAt: '2026-08-05T11:22:00Z',
    description: 'Notifications system for absence alerts'
  },
  {
    id: '5',
    version: '005',
    name: 'add_audit_logs_table',
    status: 'pending',
    createdAt: '2026-08-10T16:45:00Z',
    description: 'Audit logs for tracking system changes'
  },
  {
    id: '6',
    version: '006',
    name: 'add_reports_table',
    status: 'pending',
    createdAt: '2026-08-12T13:00:00Z',
    description: 'Reports generation and storage table'
  }
]

const mockTables: TableSchema[] = [
  {
    id: '1',
    name: 'students',
    columns: 8,
    rows: 1247,
    size: '2.4 MB',
    status: 'active'
  },
  {
    id: '2',
    name: 'absences',
    columns: 12,
    rows: 3891,
    size: '8.7 MB',
    status: 'active'
  },
  {
    id: '3',
    name: 'teachers',
    columns: 10,
    rows: 156,
    size: '0.8 MB',
    status: 'active'
  },
  {
    id: '4',
    name: 'notifications',
    columns: 7,
    rows: 5642,
    size: '12.3 MB',
    status: 'active'
  },
  {
    id: '5',
    name: 'classes',
    columns: 6,
    rows: 89,
    size: '0.3 MB',
    status: 'active'
  }
]

export default function CreateDatabase() {
  const [migrations] = useState<Migration[]>(mockMigrations)
  const [tables] = useState<TableSchema[]>(mockTables)
  const [selectedTab, setSelectedTab] = useState<'migrations' | 'tables'>('migrations')
  const [newMigrationName, setNewMigrationName] = useState('')
  const [newMigrationDescription, setNewMigrationDescription] = useState('')

  const pendingMigrations = migrations.filter(m => m.status === 'pending').length
  const appliedMigrations = migrations.filter(m => m.status === 'applied').length

  const handleCreateMigration = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock creation - in real app would create migration file
    console.log('Creating migration:', newMigrationName, newMigrationDescription)
    setNewMigrationName('')
    setNewMigrationDescription('')
  }

  const handleRunMigration = (migrationId: string) => {
    console.log('Running migration:', migrationId)
    // Mock migration execution
  }

  const handleRollbackMigration = (migrationId: string) => {
    console.log('Rolling back migration:', migrationId)
    // Mock rollback
  }

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Database Schema & Migrations
          </h1>
          <p className="text-gray-600">
            Manage database schema, create migrations, and monitor table status
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-700">{tables.length}</div>
              <div className="text-sm text-blue-600">Total Tables</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-700">{appliedMigrations}</div>
              <div className="text-sm text-green-600">Applied Migrations</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-700">{pendingMigrations}</div>
              <div className="text-sm text-yellow-600">Pending Migrations</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-700">24.5 MB</div>
              <div className="text-sm text-purple-600">Total Size</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                data-testid="createdatabase-tab-migrations"
                onClick={() => setSelectedTab('migrations')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'migrations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Migrations ({migrations.length})
              </button>
              <button
                data-testid="createdatabase-tab-tables"
                onClick={() => setSelectedTab('tables')}
                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                  selectedTab === 'tables'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tables ({tables.length})
              </button>
            </nav>
          </div>

          {/* Migrations Tab */}
          {selectedTab === 'migrations' && (
            <div className="p-6">
              {/* Create New Migration Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Create New Migration
                </h3>
                <form onSubmit={handleCreateMigration} className="space-y-4">
                  <div>
                    <label
                      htmlFor="migration-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Migration Name
                    </label>
                    <input
                      id="migration-name"
                      data-testid="createdatabase-migration-name"
                      type="text"
                      value={newMigrationName}
                      onChange={(e) => setNewMigrationName(e.target.value)}
                      placeholder="e.g., add_user_roles_table"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="migration-description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="migration-description"
                      data-testid="createdatabase-migration-description"
                      value={newMigrationDescription}
                      onChange={(e) => setNewMigrationDescription(e.target.value)}
                      placeholder="Describe what this migration does..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    data-testid="createdatabase-create-migration"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create Migration
                  </button>
                </form>
              </div>

              {/* Migrations List */}
              <div className="space-y-3" data-testid="createdatabase-migrations-list">
                {migrations.map((migration) => (
                  <div
                    key={migration.id}
                    data-testid="createdatabase-migration-item"
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-semibold text-gray-700">
                            v{migration.version}
                          </span>
                          <span className="font-medium text-gray-900">
                            {migration.name}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              migration.status === 'applied'
                                ? 'bg-green-100 text-green-700'
                                : migration.status === 'failed'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {migration.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {migration.description}
                        </p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>Created: {new Date(migration.createdAt).toLocaleString()}</span>
                          {migration.appliedAt && (
                            <span>Applied: {new Date(migration.appliedAt).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {migration.status === 'pending' && (
                          <button
                            data-testid="createdatabase-run-migration"
                            onClick={() => handleRunMigration(migration.id)}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          >
                            Run
                          </button>
                        )}
                        {migration.status === 'applied' && (
                          <button
                            data-testid="createdatabase-rollback-migration"
                            onClick={() => handleRollbackMigration(migration.id)}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            Rollback
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tables Tab */}
          {selectedTab === 'tables' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="createdatabase-tables-list">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Table Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Columns
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rows
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tables.map((table) => (
                      <tr
                        key={table.id}
                        data-testid="createdatabase-table-item"
                        className="hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-mono text-sm font-medium text-gray-900">
                            {table.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {table.columns}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {table.rows.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {table.size}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              table.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : table.status === 'migrating'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {table.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <button
                            data-testid="createdatabase-view-schema"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View Schema
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              data-testid="createdatabase-run-pending"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <span>▶</span>
              Run All Pending Migrations
            </button>
            <button
              data-testid="createdatabase-backup"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <span>💾</span>
              Backup Database
            </button>
            <button
              data-testid="createdatabase-export-schema"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <span>📄</span>
              Export Schema
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
