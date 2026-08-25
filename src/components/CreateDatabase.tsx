/**
 * CreateDatabase — Database schema and migrations management interface
 *
 * Features: schema visualization, table creation, migration tracking, column management, migration execution
 *
 * Ticket: SCRUM-1208 | Branch: proto/SCRUM-1199
 */

import React, { useState } from 'react'

interface Column {
  id: string
  name: string
  type: string
  nullable: boolean
  isPrimaryKey: boolean
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
  name: string
  status: 'pending' | 'applied' | 'failed'
  appliedAt?: string
  description: string
}

// Mock data for existing tables
const MOCK_TABLES: Table[] = [
  {
    id: 't1',
    name: 'users',
    columns: [
      { id: 'c1', name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
      { id: 'c2', name: 'email', type: 'VARCHAR(255)', nullable: false, isPrimaryKey: false },
      { id: 'c3', name: 'username', type: 'VARCHAR(100)', nullable: false, isPrimaryKey: false },
      { id: 'c4', name: 'created_at', type: 'TIMESTAMP', nullable: false, isPrimaryKey: false },
    ],
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 't2',
    name: 'products',
    columns: [
      { id: 'c5', name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
      { id: 'c6', name: 'name', type: 'VARCHAR(200)', nullable: false, isPrimaryKey: false },
      { id: 'c7', name: 'price', type: 'DECIMAL(10,2)', nullable: false, isPrimaryKey: false },
      { id: 'c8', name: 'stock', type: 'INTEGER', nullable: true, isPrimaryKey: false },
    ],
    createdAt: '2024-01-20T14:15:00Z',
  },
  {
    id: 't3',
    name: 'orders',
    columns: [
      { id: 'c9', name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
      { id: 'c10', name: 'user_id', type: 'INTEGER', nullable: false, isPrimaryKey: false },
      { id: 'c11', name: 'total', type: 'DECIMAL(10,2)', nullable: false, isPrimaryKey: false },
      { id: 'c12', name: 'status', type: 'VARCHAR(50)', nullable: false, isPrimaryKey: false },
    ],
    createdAt: '2024-01-25T09:00:00Z',
  },
  {
    id: 't4',
    name: 'reviews',
    columns: [
      { id: 'c13', name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true },
      { id: 'c14', name: 'product_id', type: 'INTEGER', nullable: false, isPrimaryKey: false },
      { id: 'c15', name: 'user_id', type: 'INTEGER', nullable: false, isPrimaryKey: false },
      { id: 'c16', name: 'rating', type: 'INTEGER', nullable: false, isPrimaryKey: false },
      { id: 'c17', name: 'comment', type: 'TEXT', nullable: true, isPrimaryKey: false },
    ],
    createdAt: '2024-02-01T16:45:00Z',
  },
  {
    id: 't5',
    name: 'sessions',
    columns: [
      { id: 'c18', name: 'id', type: 'VARCHAR(255)', nullable: false, isPrimaryKey: true },
      { id: 'c19', name: 'user_id', type: 'INTEGER', nullable: false, isPrimaryKey: false },
      { id: 'c20', name: 'expires_at', type: 'TIMESTAMP', nullable: false, isPrimaryKey: false },
    ],
    createdAt: '2024-02-05T11:20:00Z',
  },
]

// Mock data for migrations
const MOCK_MIGRATIONS: Migration[] = [
  {
    id: 'm1',
    version: '001',
    name: 'create_users_table',
    status: 'applied',
    appliedAt: '2024-01-15T10:30:00Z',
    description: 'Initial users table creation with email and username fields',
  },
  {
    id: 'm2',
    version: '002',
    name: 'create_products_table',
    status: 'applied',
    appliedAt: '2024-01-20T14:15:00Z',
    description: 'Products table with pricing and inventory tracking',
  },
  {
    id: 'm3',
    version: '003',
    name: 'create_orders_table',
    status: 'applied',
    appliedAt: '2024-01-25T09:00:00Z',
    description: 'Orders table with user relationship and status tracking',
  },
  {
    id: 'm4',
    version: '004',
    name: 'create_reviews_table',
    status: 'applied',
    appliedAt: '2024-02-01T16:45:00Z',
    description: 'Reviews table for product ratings and comments',
  },
  {
    id: 'm5',
    version: '005',
    name: 'create_sessions_table',
    status: 'applied',
    appliedAt: '2024-02-05T11:20:00Z',
    description: 'Sessions table for user authentication management',
  },
  {
    id: 'm6',
    version: '006',
    name: 'add_index_users_email',
    status: 'pending',
    description: 'Add index on users.email for faster lookups',
  },
  {
    id: 'm7',
    version: '007',
    name: 'add_products_category',
    status: 'pending',
    description: 'Add category column to products table',
  },
]

export default function CreateDatabase() {
  const [tables] = useState<Table[]>(MOCK_TABLES)
  const [migrations] = useState<Migration[]>(MOCK_MIGRATIONS)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [activeTab, setActiveTab] = useState<'schema' | 'migrations'>('schema')
  const [newTableName, setNewTableName] = useState('')
  const [newColumnName, setNewColumnName] = useState('')
  const [newColumnType, setNewColumnType] = useState('VARCHAR(255)')

  const handleCreateTable = () => {
    if (newTableName.trim()) {
      alert(`Creating table: ${newTableName}`)
      setNewTableName('')
    }
  }

  const handleAddColumn = () => {
    if (newColumnName.trim() && selectedTable) {
      alert(`Adding column ${newColumnName} (${newColumnType}) to ${selectedTable.name}`)
      setNewColumnName('')
    }
  }

  const handleRunMigration = (migrationId: string) => {
    const migration = migrations.find(m => m.id === migrationId)
    if (migration) {
      alert(`Running migration: ${migration.name}`)
    }
  }

  const handleRollbackMigration = (migrationId: string) => {
    const migration = migrations.find(m => m.id === migrationId)
    if (migration) {
      alert(`Rolling back migration: ${migration.name}`)
    }
  }

  return (
    <div data-testid="create-database" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Database Schema & Migrations</h1>
          <p className="mt-2 text-gray-600">Manage your database schema and track migrations</p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              data-testid="create-database-tab-schema"
              onClick={() => setActiveTab('schema')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'schema'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Schema
            </button>
            <button
              data-testid="create-database-tab-migrations"
              onClick={() => setActiveTab('migrations')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'migrations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Migrations
            </button>
          </nav>
        </div>

        {/* Schema Tab */}
        {activeTab === 'schema' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tables List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tables</h2>
                
                {/* Create New Table Form */}
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Create New Table</h3>
                  <input
                    data-testid="create-database-table-name"
                    type="text"
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    placeholder="Table name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 text-sm"
                  />
                  <button
                    data-testid="create-database-create-table"
                    onClick={handleCreateTable}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                  >
                    Create Table
                  </button>
                </div>

                {/* Tables List */}
                <div data-testid="create-database-tables-list" className="space-y-2">
                  {tables.map((table) => (
                    <div
                      key={table.id}
                      data-testid="create-database-table-item"
                      onClick={() => setSelectedTable(table)}
                      className={`p-3 rounded cursor-pointer transition-colors ${
                        selectedTable?.id === table.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{table.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {table.columns.length} columns
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Details */}
            <div className="lg:col-span-2">
              {selectedTable ? (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">{selectedTable.name}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Created: {new Date(selectedTable.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      data-testid="create-database-drop-table"
                      onClick={() => alert(`Drop table: ${selectedTable.name}`)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                    >
                      Drop Table
                    </button>
                  </div>

                  {/* Add Column Form */}
                  <div className="mb-6 p-4 bg-gray-50 rounded">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Add Column</h3>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        data-testid="create-database-column-name"
                        type="text"
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                        placeholder="Column name"
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <select
                        data-testid="create-database-column-type"
                        value={newColumnType}
                        onChange={(e) => setNewColumnType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="VARCHAR(255)">VARCHAR(255)</option>
                        <option value="INTEGER">INTEGER</option>
                        <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                        <option value="TEXT">TEXT</option>
                        <option value="TIMESTAMP">TIMESTAMP</option>
                        <option value="BOOLEAN">BOOLEAN</option>
                      </select>
                    </div>
                    <button
                      data-testid="create-database-add-column"
                      onClick={handleAddColumn}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm font-medium"
                    >
                      Add Column
                    </button>
                  </div>

                  {/* Columns Table */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Columns</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nullable</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Primary Key</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody data-testid="create-database-columns-list" className="bg-white divide-y divide-gray-200">
                          {selectedTable.columns.map((column) => (
                            <tr key={column.id} data-testid="create-database-column-item">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{column.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{column.type}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={`px-2 py-1 rounded text-xs ${column.nullable ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {column.nullable ? 'Yes' : 'No'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {column.isPrimaryKey && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">PK</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <button
                                  data-testid="create-database-delete-column"
                                  onClick={() => alert(`Delete column: ${column.name}`)}
                                  className="text-red-600 hover:text-red-800 text-xs font-medium"
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
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Migration History</h2>
                <button
                  data-testid="create-database-create-migration"
                  onClick={() => alert('Create new migration')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  Create Migration
                </button>
              </div>

              <div data-testid="create-database-migrations-list" className="space-y-4">
                {migrations.map((migration) => (
                  <div
                    key={migration.id}
                    data-testid="create-database-migration-item"
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            v{migration.version}
                          </span>
                          <h3 className="text-lg font-medium text-gray-900">{migration.name}</h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              migration.status === 'applied'
                                ? 'bg-green-100 text-green-800'
                                : migration.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {migration.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{migration.description}</p>
                        {migration.appliedAt && (
                          <p className="text-xs text-gray-500">
                            Applied: {new Date(migration.appliedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {migration.status === 'pending' && (
                          <button
                            data-testid="create-database-run-migration"
                            onClick={() => handleRunMigration(migration.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          >
                            Run
                          </button>
                        )}
                        {migration.status === 'applied' && (
                          <button
                            data-testid="create-database-rollback-migration"
                            onClick={() => handleRollbackMigration(migration.id)}
                            className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
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
      </div>
    </div>
  )
}
