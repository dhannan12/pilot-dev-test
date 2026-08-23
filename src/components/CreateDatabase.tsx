/**
 * CreateDatabase — Database schema and migration management interface
 *
 * Features: schema visualization, migration history, table creation, column management, data type selection
 *
 * Ticket: SCRUM-1161 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface Column {
  id: string
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
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
  status: 'pending' | 'completed' | 'failed'
  executedAt: string
}

const MOCK_TABLES: Table[] = [
  {
    id: '1',
    name: 'users',
    columns: [
      { id: 'c1', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
      { id: 'c2', name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'c3', name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { id: 'c4', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false }
    ],
    createdAt: '2026-08-20T10:00:00Z'
  },
  {
    id: '2',
    name: 'products',
    columns: [
      { id: 'c5', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
      { id: 'c6', name: 'name', type: 'VARCHAR(200)', nullable: false, primaryKey: false },
      { id: 'c7', name: 'price', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
      { id: 'c8', name: 'description', type: 'TEXT', nullable: true, primaryKey: false }
    ],
    createdAt: '2026-08-20T11:30:00Z'
  },
  {
    id: '3',
    name: 'orders',
    columns: [
      { id: 'c9', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
      { id: 'c10', name: 'user_id', type: 'INTEGER', nullable: false, primaryKey: false },
      { id: 'c11', name: 'total', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
      { id: 'c12', name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { id: 'c13', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false }
    ],
    createdAt: '2026-08-21T09:15:00Z'
  },
  {
    id: '4',
    name: 'rewards',
    columns: [
      { id: 'c14', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
      { id: 'c15', name: 'user_id', type: 'INTEGER', nullable: false, primaryKey: false },
      { id: 'c16', name: 'points', type: 'INTEGER', nullable: false, primaryKey: false },
      { id: 'c17', name: 'tier', type: 'VARCHAR(50)', nullable: false, primaryKey: false }
    ],
    createdAt: '2026-08-21T14:00:00Z'
  },
  {
    id: '5',
    name: 'inventory',
    columns: [
      { id: 'c18', name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
      { id: 'c19', name: 'product_id', type: 'INTEGER', nullable: false, primaryKey: false },
      { id: 'c20', name: 'quantity', type: 'INTEGER', nullable: false, primaryKey: false },
      { id: 'c21', name: 'last_updated', type: 'TIMESTAMP', nullable: false, primaryKey: false }
    ],
    createdAt: '2026-08-22T08:30:00Z'
  }
]

const MOCK_MIGRATIONS: Migration[] = [
  {
    id: 'm1',
    version: '001',
    description: 'Initial schema - Create users and products tables',
    status: 'completed',
    executedAt: '2026-08-20T10:00:00Z'
  },
  {
    id: 'm2',
    version: '002',
    description: 'Add orders table with foreign key to users',
    status: 'completed',
    executedAt: '2026-08-21T09:15:00Z'
  },
  {
    id: 'm3',
    version: '003',
    description: 'Create rewards table for customer loyalty program',
    status: 'completed',
    executedAt: '2026-08-21T14:00:00Z'
  },
  {
    id: 'm4',
    version: '004',
    description: 'Add inventory tracking table',
    status: 'completed',
    executedAt: '2026-08-22T08:30:00Z'
  },
  {
    id: 'm5',
    version: '005',
    description: 'Add indexes for performance optimization',
    status: 'pending',
    executedAt: '2026-08-23T00:00:00Z'
  }
]

const DATA_TYPES = [
  'INTEGER',
  'VARCHAR(255)',
  'TEXT',
  'DECIMAL(10,2)',
  'TIMESTAMP',
  'BOOLEAN',
  'DATE'
]

export default function CreateDatabase() {
  const [tables] = useState<Table[]>(MOCK_TABLES)
  const [migrations] = useState<Migration[]>(MOCK_MIGRATIONS)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [tableName, setTableName] = useState('')
  const [columns, setColumns] = useState<Omit<Column, 'id'>[]>([
    { name: '', type: 'INTEGER', nullable: false, primaryKey: false }
  ])

  const handleAddColumn = () => {
    setColumns([...columns, { name: '', type: 'INTEGER', nullable: false, primaryKey: false }])
  }

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index))
  }

  const handleColumnChange = (index: number, field: keyof Omit<Column, 'id'>, value: string | boolean) => {
    const newColumns = [...columns]
    newColumns[index] = { ...newColumns[index], [field]: value }
    setColumns(newColumns)
  }

  const handleCreateTable = () => {
    // Mock table creation - in reality would call API
    alert(`Table "${tableName}" would be created with ${columns.length} columns`)
    setShowCreateForm(false)
    setTableName('')
    setColumns([{ name: '', type: 'INTEGER', nullable: false, primaryKey: false }])
  }

  const selectedTableData = tables.find(t => t.id === selectedTable)

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Schema Manager</h1>
          <p className="text-gray-600">Manage database tables, columns, and migrations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Tables Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Tables</h3>
            <p className="text-4xl font-bold text-blue-600">{tables.length}</p>
          </div>

          {/* Migrations Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Migrations</h3>
            <p className="text-4xl font-bold text-green-600">
              {migrations.filter(m => m.status === 'completed').length}
            </p>
          </div>

          {/* Pending Migrations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Migrations</h3>
            <p className="text-4xl font-bold text-yellow-600">
              {migrations.filter(m => m.status === 'pending').length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Tables */}
          <div>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Database Tables</h2>
                <button
                  data-testid="createdatabase-create-table"
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {showCreateForm ? 'Cancel' : 'Create Table'}
                </button>
              </div>

              {showCreateForm && (
                <div data-testid="createdatabase-form" className="p-6 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Table</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Table Name
                    </label>
                    <input
                      data-testid="createdatabase-table-name"
                      type="text"
                      value={tableName}
                      onChange={(e) => setTableName(e.target.value)}
                      placeholder="e.g., customers"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">Columns</label>
                      <button
                        data-testid="createdatabase-add-column"
                        onClick={handleAddColumn}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        + Add Column
                      </button>
                    </div>

                    <div data-testid="createdatabase-columns-list" className="space-y-3">
                      {columns.map((column, index) => (
                        <div key={index} data-testid="createdatabase-column-item" className="flex gap-2 items-start">
                          <input
                            data-testid={`createdatabase-column-name-${index}`}
                            type="text"
                            value={column.name}
                            onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                            placeholder="Column name"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                          <select
                            data-testid={`createdatabase-column-type-${index}`}
                            value={column.type}
                            onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            {DATA_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          <label className="flex items-center text-sm">
                            <input
                              data-testid={`createdatabase-column-pk-${index}`}
                              type="checkbox"
                              checked={column.primaryKey}
                              onChange={(e) => handleColumnChange(index, 'primaryKey', e.target.checked)}
                              className="mr-1"
                            />
                            PK
                          </label>
                          <label className="flex items-center text-sm">
                            <input
                              data-testid={`createdatabase-column-nullable-${index}`}
                              type="checkbox"
                              checked={column.nullable}
                              onChange={(e) => handleColumnChange(index, 'nullable', e.target.checked)}
                              className="mr-1"
                            />
                            NULL
                          </label>
                          {columns.length > 1 && (
                            <button
                              data-testid={`createdatabase-remove-column-${index}`}
                              onClick={() => handleRemoveColumn(index)}
                              className="px-2 py-2 text-red-600 hover:text-red-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    data-testid="createdatabase-submit"
                    onClick={handleCreateTable}
                    disabled={!tableName || columns.some(c => !c.name)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Create Table
                  </button>
                </div>
              )}

              <div data-testid="createdatabase-tables-list" className="p-6">
                <div className="space-y-3">
                  {tables.map(table => (
                    <div
                      key={table.id}
                      data-testid="createdatabase-table-item"
                      onClick={() => setSelectedTable(table.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition ${
                        selectedTable === table.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{table.name}</h4>
                          <p className="text-sm text-gray-600">{table.columns.length} columns</p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(table.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Details */}
            {selectedTableData && (
              <div className="bg-white rounded-lg shadow mt-6">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">
                    Table: {selectedTableData.name}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Column</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Nullable</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Key</th>
                        </tr>
                      </thead>
                      <tbody data-testid="createdatabase-columns-detail">
                        {selectedTableData.columns.map(column => (
                          <tr key={column.id} className="border-b border-gray-100">
                            <td className="py-2 px-3 font-medium">{column.name}</td>
                            <td className="py-2 px-3 text-gray-600">{column.type}</td>
                            <td className="py-2 px-3">
                              <span className={`px-2 py-1 rounded text-xs ${
                                column.nullable ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {column.nullable ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              {column.primaryKey && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                  PRIMARY
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Migrations */}
          <div>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Migration History</h2>
              </div>
              <div data-testid="createdatabase-migrations-list" className="p-6">
                <div className="space-y-4">
                  {migrations.map(migration => (
                    <div
                      key={migration.id}
                      data-testid="createdatabase-migration-item"
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-gray-900">
                            v{migration.version}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            migration.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : migration.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {migration.status}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(migration.executedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{migration.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow mt-6 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  data-testid="createdatabase-run-migrations"
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-left flex justify-between items-center"
                >
                  <span>Run Pending Migrations</span>
                  <span className="bg-white text-green-600 px-2 py-1 rounded text-sm font-semibold">
                    {migrations.filter(m => m.status === 'pending').length}
                  </span>
                </button>
                <button
                  data-testid="createdatabase-rollback"
                  className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition text-left"
                >
                  Rollback Last Migration
                </button>
                <button
                  data-testid="createdatabase-export"
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-left"
                >
                  Export Schema
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
