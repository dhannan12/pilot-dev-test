/**
 * SetupDatabase — Database schema management and initialization interface
 *
 * Features: View tables, Display schema details, Initialize tables, Column management, Data type visualization
 *
 * Ticket: SCRUM-1263 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

interface Column {
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  unique: boolean
}

interface Table {
  id: string
  name: string
  status: 'pending' | 'initialized' | 'active'
  columns: Column[]
  recordCount: number
}

const mockTables: Table[] = [
  {
    id: '1',
    name: 'users',
    status: 'active',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: true },
      { name: 'username', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: true },
      { name: 'password_hash', type: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false }
    ],
    recordCount: 1247
  },
  {
    id: '2',
    name: 'products',
    status: 'active',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { name: 'name', type: 'VARCHAR(200)', nullable: false, primaryKey: false, unique: false },
      { name: 'description', type: 'TEXT', nullable: true, primaryKey: false, unique: false },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false, unique: false },
      { name: 'stock_quantity', type: 'INTEGER', nullable: false, primaryKey: false, unique: false }
    ],
    recordCount: 532
  },
  {
    id: '3',
    name: 'orders',
    status: 'initialized',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { name: 'user_id', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { name: 'order_date', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false },
      { name: 'total_amount', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false, unique: false },
      { name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false, unique: false }
    ],
    recordCount: 0
  },
  {
    id: '4',
    name: 'order_items',
    status: 'initialized',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { name: 'order_id', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { name: 'product_id', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { name: 'quantity', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { name: 'unit_price', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false, unique: false }
    ],
    recordCount: 0
  },
  {
    id: '5',
    name: 'categories',
    status: 'pending',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: true },
      { name: 'description', type: 'TEXT', nullable: true, primaryKey: false, unique: false },
      { name: 'parent_id', type: 'INTEGER', nullable: true, primaryKey: false, unique: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false }
    ],
    recordCount: 0
  },
  {
    id: '6',
    name: 'sessions',
    status: 'pending',
    columns: [
      { name: 'id', type: 'VARCHAR(255)', nullable: false, primaryKey: true, unique: true },
      { name: 'user_id', type: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { name: 'token', type: 'VARCHAR(500)', nullable: false, primaryKey: false, unique: true },
      { name: 'expires_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false }
    ],
    recordCount: 0
  },
  {
    id: '7',
    name: 'audit_logs',
    status: 'pending',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true, unique: true },
      { name: 'user_id', type: 'INTEGER', nullable: true, primaryKey: false, unique: false },
      { name: 'action', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: false },
      { name: 'table_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: false },
      { name: 'timestamp', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false }
    ],
    recordCount: 0
  }
]

export default function SetupDatabase() {
  const [tables, setTables] = useState<Table[]>(mockTables)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const handleInitializeTable = (tableId: string) => {
    setTables(prev =>
      prev.map(table =>
        table.id === tableId ? { ...table, status: 'initialized' } : table
      )
    )
  }

  const handleActivateTable = (tableId: string) => {
    setTables(prev =>
      prev.map(table =>
        table.id === tableId ? { ...table, status: 'active' } : table
      )
    )
  }

  const handleInitializeAll = () => {
    setTables(prev =>
      prev.map(table => ({
        ...table,
        status: table.status === 'pending' ? 'initialized' : table.status
      }))
    )
  }

  const filteredTables = tables.filter(table => {
    if (filter === 'all') return true
    return table.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'initialized':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div data-testid="setupdatabase" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Schema Setup</h1>
          <p className="text-gray-600">Manage and initialize database tables and schemas</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
              Filter by status:
            </label>
            <select
              id="status-filter"
              data-testid="setupdatabase-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tables</option>
              <option value="active">Active</option>
              <option value="initialized">Initialized</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button
            data-testid="setupdatabase-initializeall"
            onClick={handleInitializeAll}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Initialize All Pending
          </button>
        </div>

        {/* Tables Grid */}
        <div data-testid="setupdatabase-list" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              data-testid="setupdatabase-item"
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Table Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{table.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(table.status)}`}>
                    {table.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {table.columns.length} columns · {table.recordCount} records
                </p>
              </div>

              {/* Columns List */}
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  {table.columns.map((column, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className="font-mono text-gray-900 font-medium">{column.name}</span>
                      <span className="text-gray-500">{column.type}</span>
                      {column.primaryKey && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          PK
                        </span>
                      )}
                      {column.unique && !column.primaryKey && (
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                          UNIQUE
                        </span>
                      )}
                      {!column.nullable && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                          NOT NULL
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {table.status === 'pending' && (
                    <button
                      data-testid="setupdatabase-initialize"
                      onClick={() => handleInitializeTable(table.id)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Initialize Table
                    </button>
                  )}
                  {table.status === 'initialized' && (
                    <button
                      data-testid="setupdatabase-activate"
                      onClick={() => handleActivateTable(table.id)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Activate Table
                    </button>
                  )}
                  {table.status === 'active' && (
                    <button
                      data-testid="setupdatabase-view"
                      onClick={() => setSelectedTable(table)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">{tables.length}</div>
              <div className="text-sm text-blue-600">Total Tables</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">
                {tables.filter(t => t.status === 'active').length}
              </div>
              <div className="text-sm text-green-600">Active Tables</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-700">
                {tables.filter(t => t.status === 'pending').length}
              </div>
              <div className="text-sm text-yellow-600">Pending Tables</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">
                {tables.reduce((sum, t) => sum + t.recordCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-purple-600">Total Records</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTable && (
        <div
          data-testid="setupdatabase-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTable(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTable.name}</h2>
                <button
                  data-testid="setupdatabase-close"
                  onClick={() => setSelectedTable(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Table Schema</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {selectedTable.columns.map((column, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-2 last:border-b-0">
                        <div className="font-mono font-semibold text-gray-900">{column.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Type: {column.type} · Nullable: {column.nullable ? 'Yes' : 'No'}
                          {column.primaryKey && ' · Primary Key'}
                          {column.unique && ' · Unique'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Table Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">Status:</div>
                      <div className="font-medium text-gray-900">{selectedTable.status}</div>
                      <div className="text-gray-600">Records:</div>
                      <div className="font-medium text-gray-900">{selectedTable.recordCount}</div>
                      <div className="text-gray-600">Columns:</div>
                      <div className="font-medium text-gray-900">{selectedTable.columns.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
