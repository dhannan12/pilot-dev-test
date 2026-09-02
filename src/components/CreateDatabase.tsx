/**
 * CreateDatabase — Database schema and migrations management interface
 *
 * Features: schema visualization, migration history, migration execution, table management, status tracking
 *
 * Ticket: SCRUM-1285 | Branch: proto/SCRUM-1277
 */

import React, { useState } from 'react'

interface Migration {
  id: number
  name: string
  status: 'pending' | 'applied' | 'failed'
  createdAt: string
  appliedAt?: string
  description: string
}

interface SchemaTable {
  id: number
  name: string
  columns: number
  rows: number
  size: string
  lastModified: string
}

const mockMigrations: Migration[] = [
  {
    id: 1,
    name: '001_create_users_table',
    status: 'applied',
    createdAt: '2026-08-15 10:00:00',
    appliedAt: '2026-08-15 10:01:23',
    description: 'Creates users table with authentication fields',
  },
  {
    id: 2,
    name: '002_create_appointments_table',
    status: 'applied',
    createdAt: '2026-08-16 14:30:00',
    appliedAt: '2026-08-16 14:32:45',
    description: 'Creates appointments table with foreign keys to users',
  },
  {
    id: 3,
    name: '003_add_user_roles',
    status: 'applied',
    createdAt: '2026-08-18 09:15:00',
    appliedAt: '2026-08-18 09:16:12',
    description: 'Adds role column to users table',
  },
  {
    id: 4,
    name: '004_create_services_table',
    status: 'pending',
    createdAt: '2026-08-20 11:45:00',
    description: 'Creates services table for tradesperson offerings',
  },
  {
    id: 5,
    name: '005_add_payment_fields',
    status: 'pending',
    createdAt: '2026-08-22 16:20:00',
    description: 'Adds payment processing fields to appointments',
  },
]

const mockTables: SchemaTable[] = [
  {
    id: 1,
    name: 'users',
    columns: 12,
    rows: 1543,
    size: '2.4 MB',
    lastModified: '2026-08-18 09:16:12',
  },
  {
    id: 2,
    name: 'appointments',
    columns: 15,
    rows: 892,
    size: '1.8 MB',
    lastModified: '2026-08-16 14:32:45',
  },
  {
    id: 3,
    name: 'sessions',
    columns: 8,
    rows: 4521,
    size: '3.2 MB',
    lastModified: '2026-08-20 18:45:33',
  },
  {
    id: 4,
    name: 'audit_log',
    columns: 10,
    rows: 12456,
    size: '8.7 MB',
    lastModified: '2026-08-22 23:12:08',
  },
  {
    id: 5,
    name: 'notifications',
    columns: 9,
    rows: 3214,
    size: '1.5 MB',
    lastModified: '2026-08-21 15:30:22',
  },
]

export default function CreateDatabase() {
  const [selectedTab, setSelectedTab] = useState<'migrations' | 'schema'>('migrations')
  const [newMigrationName, setNewMigrationName] = useState('')
  const [newMigrationDesc, setNewMigrationDesc] = useState('')

  const handleCreateMigration = () => {
    if (newMigrationName && newMigrationDesc) {
      alert(`Migration "${newMigrationName}" created successfully`)
      setNewMigrationName('')
      setNewMigrationDesc('')
    }
  }

  const handleRunMigration = (migrationName: string) => {
    alert(`Running migration: ${migrationName}`)
  }

  const handleRollback = (migrationName: string) => {
    alert(`Rolling back migration: ${migrationName}`)
  }

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Management</h1>
          <p className="text-gray-600">Manage database schema and migrations</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              data-testid="createdatabase-migrations-tab"
              onClick={() => setSelectedTab('migrations')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'migrations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Migrations
            </button>
            <button
              data-testid="createdatabase-schema-tab"
              onClick={() => setSelectedTab('schema')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === 'schema'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Schema
            </button>
          </div>
        </div>

        {/* Migrations Tab */}
        {selectedTab === 'migrations' && (
          <div>
            {/* Create New Migration Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Create New Migration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Migration Name
                  </label>
                  <input
                    data-testid="createdatabase-migration-name"
                    type="text"
                    value={newMigrationName}
                    onChange={(e) => setNewMigrationName(e.target.value)}
                    placeholder="e.g., 006_add_new_feature"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    data-testid="createdatabase-migration-description"
                    type="text"
                    value={newMigrationDesc}
                    onChange={(e) => setNewMigrationDesc(e.target.value)}
                    placeholder="Brief description of changes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                data-testid="createdatabase-create-migration"
                onClick={handleCreateMigration}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Migration
              </button>
            </div>

            {/* Migration History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Migration History</h2>
              <div data-testid="createdatabase-list" className="space-y-3">
                {mockMigrations.map((migration) => (
                  <div
                    key={migration.id}
                    data-testid="createdatabase-item"
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-mono text-sm font-semibold text-gray-900">
                            {migration.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              migration.status === 'applied'
                                ? 'bg-green-100 text-green-800'
                                : migration.status === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {migration.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{migration.description}</p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span>Created: {migration.createdAt}</span>
                          {migration.appliedAt && <span>Applied: {migration.appliedAt}</span>}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {migration.status === 'pending' && (
                          <button
                            data-testid="createdatabase-run"
                            onClick={() => handleRunMigration(migration.name)}
                            className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          >
                            Run
                          </button>
                        )}
                        {migration.status === 'applied' && (
                          <button
                            data-testid="createdatabase-rollback"
                            onClick={() => handleRollback(migration.name)}
                            className="px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
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
          </div>
        )}

        {/* Schema Tab */}
        {selectedTab === 'schema' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Database Schema</h2>
              <button
                data-testid="createdatabase-refresh-schema"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Refresh Schema
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
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
                      Last Modified
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody data-testid="createdatabase-schema-list" className="divide-y divide-gray-200">
                  {mockTables.map((table) => (
                    <tr
                      key={table.id}
                      data-testid="createdatabase-schema-item"
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm font-mono font-medium text-gray-900">
                        {table.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{table.columns}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {table.rows.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{table.size}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{table.lastModified}</td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          data-testid="createdatabase-view-table"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Migrations</div>
            <div className="text-2xl font-bold text-gray-900">{mockMigrations.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500 mb-1">Applied</div>
            <div className="text-2xl font-bold text-green-600">
              {mockMigrations.filter((m) => m.status === 'applied').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm font-medium text-gray-500 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {mockMigrations.filter((m) => m.status === 'pending').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
