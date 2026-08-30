/**
 * CreateDatabase — Database schema and migration management interface
 *
 * Features: table schema viewer, column definitions, migration history, data type display, constraint management
 *
 * Ticket: SCRUM-1275 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface Column {
  id: string
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  unique: boolean
}

interface Table {
  id: string
  name: string
  columns: Column[]
  createdAt: string
}

interface Migration {
  id: string
  version: string
  description: string
  appliedAt: string
  status: 'applied' | 'pending' | 'failed'
}

const MOCK_TABLES: Table[] = [
  {
    id: '1',
    name: 'users',
    createdAt: '2026-08-01T10:00:00Z',
    columns: [
      { id: '1', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { id: '2', name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: true },
      { id: '3', name: 'username', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: true },
      { id: '4', name: 'password_hash', type: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: false },
      { id: '5', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false },
    ]
  },
  {
    id: '2',
    name: 'members',
    createdAt: '2026-08-05T14:30:00Z',
    columns: [
      { id: '6', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { id: '7', name: 'user_id', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { id: '8', name: 'membership_type', type: 'VARCHAR(50)', nullable: false, primaryKey: false, unique: false },
      { id: '9', name: 'start_date', type: 'DATE', nullable: false, primaryKey: false, unique: false },
      { id: '10', name: 'end_date', type: 'DATE', nullable: true, primaryKey: false, unique: false },
    ]
  },
  {
    id: '3',
    name: 'bookings',
    createdAt: '2026-08-10T09:15:00Z',
    columns: [
      { id: '11', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { id: '12', name: 'member_id', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { id: '13', name: 'facility_id', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { id: '14', name: 'booking_date', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false },
      { id: '15', name: 'duration_minutes', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { id: '16', name: 'status', type: 'VARCHAR(20)', nullable: false, primaryKey: false, unique: false },
    ]
  },
  {
    id: '4',
    name: 'facilities',
    createdAt: '2026-08-12T11:00:00Z',
    columns: [
      { id: '17', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { id: '18', name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: false },
      { id: '19', name: 'type', type: 'VARCHAR(50)', nullable: false, primaryKey: false, unique: false },
      { id: '20', name: 'capacity', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { id: '21', name: 'hourly_rate', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false, unique: false },
    ]
  },
  {
    id: '5',
    name: 'payments',
    createdAt: '2026-08-15T16:45:00Z',
    columns: [
      { id: '22', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { id: '23', name: 'member_id', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { id: '24', name: 'amount', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false, unique: false },
      { id: '25', name: 'payment_method', type: 'VARCHAR(50)', nullable: false, primaryKey: false, unique: false },
      { id: '26', name: 'transaction_date', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false },
      { id: '27', name: 'status', type: 'VARCHAR(20)', nullable: false, primaryKey: false, unique: false },
    ]
  },
  {
    id: '6',
    name: 'coaches',
    createdAt: '2026-08-18T13:20:00Z',
    columns: [
      { id: '28', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { id: '29', name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: false },
      { id: '30', name: 'specialty', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: false },
      { id: '31', name: 'hourly_rate', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false, unique: false },
      { id: '32', name: 'availability', type: 'TEXT', nullable: true, primaryKey: false, unique: false },
    ]
  }
]

const MOCK_MIGRATIONS: Migration[] = [
  {
    id: '1',
    version: '001',
    description: 'Create users table',
    appliedAt: '2026-08-01T10:00:00Z',
    status: 'applied'
  },
  {
    id: '2',
    version: '002',
    description: 'Create members table with foreign key to users',
    appliedAt: '2026-08-05T14:30:00Z',
    status: 'applied'
  },
  {
    id: '3',
    version: '003',
    description: 'Create facilities table',
    appliedAt: '2026-08-12T11:00:00Z',
    status: 'applied'
  },
  {
    id: '4',
    version: '004',
    description: 'Create bookings table with foreign keys',
    appliedAt: '2026-08-10T09:15:00Z',
    status: 'applied'
  },
  {
    id: '5',
    version: '005',
    description: 'Create payments table',
    appliedAt: '2026-08-15T16:45:00Z',
    status: 'applied'
  },
  {
    id: '6',
    version: '006',
    description: 'Create coaches table',
    appliedAt: '2026-08-18T13:20:00Z',
    status: 'applied'
  },
  {
    id: '7',
    version: '007',
    description: 'Add indexes for performance optimization',
    appliedAt: '2026-08-20T10:00:00Z',
    status: 'applied'
  },
  {
    id: '8',
    version: '008',
    description: 'Add cascade delete constraints',
    appliedAt: '',
    status: 'pending'
  }
]

export default function CreateDatabase() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(MOCK_TABLES[0])
  const [activeTab, setActiveTab] = useState<'tables' | 'migrations'>('tables')

  const getStatusColor = (status: Migration['status']) => {
    switch (status) {
      case 'applied':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Schema Manager</h1>
          <p className="text-gray-600">View and manage database tables, schemas, and migrations</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              data-testid="createdatabase-tab-tables"
              onClick={() => setActiveTab('tables')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tables'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tables & Schema ({MOCK_TABLES.length})
            </button>
            <button
              data-testid="createdatabase-tab-migrations"
              onClick={() => setActiveTab('migrations')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'migrations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Migrations ({MOCK_MIGRATIONS.length})
            </button>
          </nav>
        </div>

        {/* Tables Tab */}
        {activeTab === 'tables' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Table List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Database Tables</h2>
                </div>
                <ul data-testid="createdatabase-list" className="divide-y divide-gray-200">
                  {MOCK_TABLES.map((table) => (
                    <li key={table.id} data-testid="createdatabase-item">
                      <button
                        data-testid={`createdatabase-select-${table.name}`}
                        onClick={() => setSelectedTable(table)}
                        className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                          selectedTable?.id === table.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="font-medium text-gray-900">{table.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {table.columns.length} columns
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Created: {new Date(table.createdAt).toLocaleDateString()}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Table Schema Details */}
            <div className="lg:col-span-2">
              {selectedTable ? (
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTable.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Table schema with {selectedTable.columns.length} columns
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Column Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Constraints
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedTable.columns.map((column) => (
                            <tr key={column.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="font-medium text-gray-900">{column.name}</span>
                                  {column.primaryKey && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                      PK
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900 font-mono">{column.type}</span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {!column.nullable && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                      NOT NULL
                                    </span>
                                  )}
                                  {column.unique && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                      UNIQUE
                                    </span>
                                  )}
                                  {column.nullable && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                      NULLABLE
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <p className="text-gray-500">Select a table to view its schema</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Migrations Tab */}
        {activeTab === 'migrations' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Migration History</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Database schema version control and migration tracking
                </p>
              </div>
              <button
                data-testid="createdatabase-create-migration"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Migration
              </button>
            </div>
            <div className="p-6">
              <ul data-testid="createdatabase-migrations-list" className="space-y-4">
                {MOCK_MIGRATIONS.map((migration) => (
                  <li
                    key={migration.id}
                    data-testid="createdatabase-migration-item"
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono font-semibold text-gray-900">
                            v{migration.version}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(migration.status)}`}>
                            {migration.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-900 font-medium mt-2">{migration.description}</p>
                        {migration.appliedAt && (
                          <p className="text-sm text-gray-500 mt-1">
                            Applied: {new Date(migration.appliedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          data-testid={`createdatabase-view-migration-${migration.version}`}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          View
                        </button>
                        {migration.status === 'pending' && (
                          <button
                            data-testid={`createdatabase-apply-migration-${migration.version}`}
                            className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded transition-colors"
                          >
                            Apply
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
