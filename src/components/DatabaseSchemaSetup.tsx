/**
 * DatabaseSchemaSetup — Database schema setup and visualization for claims management
 *
 * Features: schema visualization, table definitions, relationship mapping, migration tracking, validation status
 *
 * Ticket: SCRUM-877 | Branch: proto/SCRUM-868
 */

import { useState } from 'react'

interface Table {
  id: string
  name: string
  description: string
  columns: Column[]
  status: 'created' | 'pending' | 'migrating' | 'error'
  relationships: string[]
}

interface Column {
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  foreignKey?: string
}

const MOCK_TABLES: Table[] = [
  {
    id: 'tbl-1',
    name: 'claims',
    description: 'Main claims table storing all claim records',
    status: 'created',
    relationships: ['claimants', 'adjusters', 'documents'],
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'claim_number', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { name: 'claimant_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'claimants.id' },
      { name: 'adjuster_id', type: 'UUID', nullable: true, primaryKey: false, foreignKey: 'adjusters.id' },
      { name: 'status', type: 'VARCHAR(20)', nullable: false, primaryKey: false },
      { name: 'claim_date', type: 'TIMESTAMP', nullable: false, primaryKey: false },
      { name: 'amount', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, primaryKey: false }
    ]
  },
  {
    id: 'tbl-2',
    name: 'claimants',
    description: 'Claimant information and contact details',
    status: 'created',
    relationships: ['claims'],
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'phone', type: 'VARCHAR(20)', nullable: true, primaryKey: false },
      { name: 'address', type: 'TEXT', nullable: true, primaryKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false }
    ]
  },
  {
    id: 'tbl-3',
    name: 'adjusters',
    description: 'Claims adjusters and their assignments',
    status: 'created',
    relationships: ['claims'],
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'license_number', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { name: 'specialization', type: 'VARCHAR(100)', nullable: true, primaryKey: false },
      { name: 'active', type: 'BOOLEAN', nullable: false, primaryKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false }
    ]
  },
  {
    id: 'tbl-4',
    name: 'documents',
    description: 'Document attachments linked to claims',
    status: 'pending',
    relationships: ['claims'],
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'claim_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'claims.id' },
      { name: 'file_name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'file_type', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { name: 'file_size', type: 'INTEGER', nullable: false, primaryKey: false },
      { name: 'storage_path', type: 'TEXT', nullable: false, primaryKey: false },
      { name: 'uploaded_at', type: 'TIMESTAMP', nullable: false, primaryKey: false }
    ]
  },
  {
    id: 'tbl-5',
    name: 'claim_notes',
    description: 'Notes and comments on claim records',
    status: 'pending',
    relationships: ['claims', 'adjusters'],
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'claim_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'claims.id' },
      { name: 'adjuster_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'adjusters.id' },
      { name: 'note_text', type: 'TEXT', nullable: false, primaryKey: false },
      { name: 'note_type', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false }
    ]
  },
  {
    id: 'tbl-6',
    name: 'audit_log',
    description: 'Audit trail for all database changes',
    status: 'migrating',
    relationships: [],
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'table_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'record_id', type: 'UUID', nullable: false, primaryKey: false },
      { name: 'action', type: 'VARCHAR(20)', nullable: false, primaryKey: false },
      { name: 'user_id', type: 'UUID', nullable: true, primaryKey: false },
      { name: 'changes', type: 'JSONB', nullable: true, primaryKey: false },
      { name: 'timestamp', type: 'TIMESTAMP', nullable: false, primaryKey: false }
    ]
  }
]

export default function DatabaseSchemaSetup() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredTables = filterStatus === 'all' 
    ? MOCK_TABLES 
    : MOCK_TABLES.filter(table => table.status === filterStatus)

  const statusColors = {
    created: 'bg-green-100 text-green-800 border-green-300',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    migrating: 'bg-blue-100 text-blue-800 border-blue-300',
    error: 'bg-red-100 text-red-800 border-red-300'
  }

  const getStatusCount = (status: string) => 
    MOCK_TABLES.filter(t => t.status === status).length

  return (
    <div data-testid="database-schema-setup" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Database Schema Setup
          </h1>
          <p className="text-gray-600">
            Claims Management System - Schema Configuration & Migration Status
          </p>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-gray-900">{getStatusCount('created')}</div>
            <div className="text-sm text-gray-600">Created</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="text-2xl font-bold text-gray-900">{getStatusCount('pending')}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-gray-900">{getStatusCount('migrating')}</div>
            <div className="text-sm text-gray-600">Migrating</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="text-2xl font-bold text-gray-900">{getStatusCount('error')}</div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Filter by status:</label>
              <select
                data-testid="database-schema-setup-status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Tables ({MOCK_TABLES.length})</option>
                <option value="created">Created ({getStatusCount('created')})</option>
                <option value="pending">Pending ({getStatusCount('pending')})</option>
                <option value="migrating">Migrating ({getStatusCount('migrating')})</option>
                <option value="error">Error ({getStatusCount('error')})</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                data-testid="database-schema-setup-validate"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Validate Schema
              </button>
              <button
                data-testid="database-schema-setup-migrate"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Run Migrations
              </button>
              <button
                data-testid="database-schema-setup-export"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Export SQL
              </button>
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Table List */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Tables</h2>
            <div data-testid="database-schema-setup-list" className="space-y-3">
              {filteredTables.map((table) => (
                <div
                  key={table.id}
                  data-testid="database-schema-setup-item"
                  onClick={() => setSelectedTable(table)}
                  className={`bg-white rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
                    selectedTable?.id === table.id ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {table.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {table.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[table.status]}`}>
                      {table.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{table.columns.length} columns</span>
                    <span>•</span>
                    <span>{table.relationships.length} relationships</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Table Details</h2>
            {selectedTable ? (
              <div data-testid="database-schema-setup-details" className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedTable.name}
                      </h3>
                      <p className="text-gray-600">{selectedTable.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[selectedTable.status]}`}>
                      {selectedTable.status}
                    </span>
                  </div>

                  {selectedTable.relationships.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Relationships:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTable.relationships.map((rel) => (
                          <span
                            key={rel}
                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                          >
                            {rel}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Columns ({selectedTable.columns.length}):</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedTable.columns.map((column) => (
                      <div
                        key={column.name}
                        className="p-3 bg-gray-50 rounded border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="font-mono text-sm font-semibold text-gray-900">
                            {column.name}
                          </div>
                          <div className="flex gap-1">
                            {column.primaryKey && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                PK
                              </span>
                            )}
                            {column.foreignKey && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                                FK
                              </span>
                            )}
                            {!column.nullable && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                                NOT NULL
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 font-mono">{column.type}</div>
                        {column.foreignKey && (
                          <div className="text-xs text-purple-600 mt-1">
                            → {column.foreignKey}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    data-testid="database-schema-setup-view-sql"
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    View CREATE TABLE SQL
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  Select a table to view its schema details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
