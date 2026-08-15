/**
 * SetupDatabase — Database schema and migrations management interface
 *
 * Features: schema visualization, migration history, table creation, index management, data seeding
 *
 * Ticket: SCRUM-900 | Branch: proto/SCRUM-892
 */

import React, { useState } from 'react'

interface Migration {
  id: string
  version: string
  name: string
  status: 'pending' | 'applied' | 'failed'
  appliedAt?: string
  description: string
}

interface DatabaseTable {
  id: string
  name: string
  columns: number
  rows: number
  indexes: number
  status: 'active' | 'creating' | 'error'
}

const MOCK_MIGRATIONS: Migration[] = [
  {
    id: 'mig-1',
    version: '001',
    name: 'create_cases_table',
    status: 'applied',
    appliedAt: '2026-08-10 10:30:00',
    description: 'Create the main cases table with core fields'
  },
  {
    id: 'mig-2',
    version: '002',
    name: 'create_clients_table',
    status: 'applied',
    appliedAt: '2026-08-10 10:31:15',
    description: 'Create clients table with contact information'
  },
  {
    id: 'mig-3',
    version: '003',
    name: 'create_documents_table',
    status: 'applied',
    appliedAt: '2026-08-10 10:32:45',
    description: 'Create documents table for case file attachments'
  },
  {
    id: 'mig-4',
    version: '004',
    name: 'add_case_status_index',
    status: 'applied',
    appliedAt: '2026-08-11 09:15:00',
    description: 'Add index on case status for faster filtering'
  },
  {
    id: 'mig-5',
    version: '005',
    name: 'create_case_notes_table',
    status: 'pending',
    description: 'Create table for case notes and activity logs'
  },
  {
    id: 'mig-6',
    version: '006',
    name: 'add_client_search_index',
    status: 'pending',
    description: 'Add full-text search index on client names'
  }
]

const MOCK_TABLES: DatabaseTable[] = [
  { id: 'tbl-1', name: 'cases', columns: 12, rows: 1247, indexes: 3, status: 'active' },
  { id: 'tbl-2', name: 'clients', columns: 8, rows: 892, indexes: 2, status: 'active' },
  { id: 'tbl-3', name: 'documents', columns: 10, rows: 3451, indexes: 4, status: 'active' },
  { id: 'tbl-4', name: 'users', columns: 9, rows: 45, indexes: 2, status: 'active' },
  { id: 'tbl-5', name: 'audit_logs', columns: 7, rows: 8923, indexes: 3, status: 'active' }
]

export default function SetupDatabase() {
  const [migrations] = useState<Migration[]>(MOCK_MIGRATIONS)
  const [tables] = useState<DatabaseTable[]>(MOCK_TABLES)
  const [activeTab, setActiveTab] = useState<'schema' | 'migrations'>('schema')
  const [selectedMigration, setSelectedMigration] = useState<string | null>(null)

  const appliedCount = migrations.filter(m => m.status === 'applied').length
  const pendingCount = migrations.filter(m => m.status === 'pending').length

  return (
    <div data-testid="setupdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Setup</h1>
          <p className="text-gray-600">
            Manage database schema, migrations, and table configurations
          </p>
          <div className="mt-4 flex gap-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{tables.length}</div>
              <div className="text-sm text-blue-700">Active Tables</div>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{appliedCount}</div>
              <div className="text-sm text-green-700">Applied Migrations</div>
            </div>
            <div className="bg-orange-50 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
              <div className="text-sm text-orange-700">Pending Migrations</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                data-testid="setupdatabase-schema-tab"
                onClick={() => setActiveTab('schema')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'schema'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Schema & Tables
              </button>
              <button
                data-testid="setupdatabase-migrations-tab"
                onClick={() => setActiveTab('migrations')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'migrations'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Migrations
              </button>
            </div>
          </div>

          {/* Schema Tab */}
          {activeTab === 'schema' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Database Tables</h2>
                <button
                  data-testid="setupdatabase-create-table"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create New Table
                </button>
              </div>

              <div data-testid="setupdatabase-tables-list" className="space-y-3">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    data-testid="setupdatabase-table-item"
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {table.name}
                        </h3>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>{table.columns} columns</span>
                          <span>{table.rows.toLocaleString()} rows</span>
                          <span>{table.indexes} indexes</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            table.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : table.status === 'creating'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {table.status}
                        </span>
                        <button
                          data-testid="setupdatabase-view-schema"
                          className="text-blue-600 hover:text-blue-700 px-3 py-1 border border-blue-600 rounded hover:bg-blue-50 transition-colors text-sm"
                        >
                          View Schema
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Actions</h3>
                <div className="flex gap-3">
                  <button
                    data-testid="setupdatabase-backup"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    Backup Database
                  </button>
                  <button
                    data-testid="setupdatabase-optimize"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    Optimize Tables
                  </button>
                  <button
                    data-testid="setupdatabase-export"
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    Export Schema
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Migrations Tab */}
          {activeTab === 'migrations' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Database Migrations</h2>
                <div className="flex gap-2">
                  <button
                    data-testid="setupdatabase-create-migration"
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    New Migration
                  </button>
                  <button
                    data-testid="setupdatabase-run-migrations"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    disabled={pendingCount === 0}
                  >
                    Run Pending ({pendingCount})
                  </button>
                </div>
              </div>

              <div data-testid="setupdatabase-migrations-list" className="space-y-3">
                {migrations.map((migration) => (
                  <div
                    key={migration.id}
                    data-testid="setupdatabase-migration-item"
                    className={`border rounded-lg p-4 transition-all ${
                      selectedMigration === migration.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMigration(migration.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            v{migration.version}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {migration.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              migration.status === 'applied'
                                ? 'bg-green-100 text-green-800'
                                : migration.status === 'pending'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {migration.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{migration.description}</p>
                        {migration.appliedAt && (
                          <p className="text-xs text-gray-500">Applied: {migration.appliedAt}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {migration.status === 'pending' && (
                          <button
                            data-testid="setupdatabase-run-single"
                            className="text-blue-600 hover:text-blue-700 px-3 py-1 border border-blue-600 rounded hover:bg-blue-50 transition-colors text-sm"
                          >
                            Run
                          </button>
                        )}
                        {migration.status === 'applied' && (
                          <button
                            data-testid="setupdatabase-rollback"
                            className="text-red-600 hover:text-red-700 px-3 py-1 border border-red-600 rounded hover:bg-red-50 transition-colors text-sm"
                          >
                            Rollback
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-1">⚠️ Migration Safety</h3>
                <p className="text-sm text-yellow-800">
                  Always backup your database before running migrations. Rollbacks may result in data loss.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Connection Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Database Connection</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="text-gray-600">Host:</label>
              <input
                data-testid="setupdatabase-host"
                type="text"
                value="localhost:5432"
                readOnly
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">Database:</label>
              <input
                data-testid="setupdatabase-database"
                type="text"
                value="legal_case_tracker"
                readOnly
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">User:</label>
              <input
                data-testid="setupdatabase-user"
                type="text"
                value="admin"
                readOnly
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="text-gray-600">Status:</label>
              <div className="mt-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                ✓ Connected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
