/**
 * CreateDatabase — Database schema and table management interface
 *
 * Features: schema creation, table definition, data type selection, constraint management, relationship visualization
 *
 * Ticket: SCRUM-1038 | Branch: proto/SCRUM-1028
 */

import React, { useState } from 'react'

interface Column {
  id: string
  name: string
  dataType: string
  nullable: boolean
  primaryKey: boolean
  unique: boolean
}

interface Table {
  id: string
  name: string
  schema: string
  columns: Column[]
  createdAt: string
}

const MOCK_TABLES: Table[] = [
  {
    id: '1',
    name: 'users',
    schema: 'public',
    columns: [
      { id: 'c1', name: 'id', dataType: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'c2', name: 'email', dataType: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: true },
      { id: 'c3', name: 'name', dataType: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: false },
      { id: 'c4', name: 'created_at', dataType: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false }
    ],
    createdAt: '2026-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'memberships',
    schema: 'public',
    columns: [
      { id: 'c5', name: 'id', dataType: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'c6', name: 'user_id', dataType: 'UUID', nullable: false, primaryKey: false, unique: false },
      { id: 'c7', name: 'plan', dataType: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: false },
      { id: 'c8', name: 'start_date', dataType: 'DATE', nullable: false, primaryKey: false, unique: false },
      { id: 'c9', name: 'end_date', dataType: 'DATE', nullable: true, primaryKey: false, unique: false }
    ],
    createdAt: '2026-01-16T09:00:00Z'
  },
  {
    id: '3',
    name: 'payments',
    schema: 'public',
    columns: [
      { id: 'c10', name: 'id', dataType: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'c11', name: 'membership_id', dataType: 'UUID', nullable: false, primaryKey: false, unique: false },
      { id: 'c12', name: 'amount', dataType: 'DECIMAL(10,2)', nullable: false, primaryKey: false, unique: false },
      { id: 'c13', name: 'payment_date', dataType: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false }
    ],
    createdAt: '2026-01-17T14:45:00Z'
  },
  {
    id: '4',
    name: 'classes',
    schema: 'public',
    columns: [
      { id: 'c14', name: 'id', dataType: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'c15', name: 'name', dataType: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: false },
      { id: 'c16', name: 'instructor', dataType: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: false },
      { id: 'c17', name: 'capacity', dataType: 'INTEGER', nullable: false, primaryKey: false, unique: false },
      { id: 'c18', name: 'schedule', dataType: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: false }
    ],
    createdAt: '2026-01-18T11:20:00Z'
  },
  {
    id: '5',
    name: 'bookings',
    schema: 'public',
    columns: [
      { id: 'c19', name: 'id', dataType: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'c20', name: 'user_id', dataType: 'UUID', nullable: false, primaryKey: false, unique: false },
      { id: 'c21', name: 'class_id', dataType: 'UUID', nullable: false, primaryKey: false, unique: false },
      { id: 'c22', name: 'booking_date', dataType: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false },
      { id: 'c23', name: 'status', dataType: 'VARCHAR(50)', nullable: false, primaryKey: false, unique: false }
    ],
    createdAt: '2026-01-19T16:00:00Z'
  }
]

const DATA_TYPES = [
  'VARCHAR(255)',
  'TEXT',
  'INTEGER',
  'BIGINT',
  'DECIMAL(10,2)',
  'BOOLEAN',
  'DATE',
  'TIMESTAMP',
  'UUID',
  'JSON'
]

export default function CreateDatabase() {
  const [tables, setTables] = useState<Table[]>(MOCK_TABLES)
  const [showNewTableForm, setShowNewTableForm] = useState(false)
  const [newTableName, setNewTableName] = useState('')
  const [newTableSchema, setNewTableSchema] = useState('public')
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [newColumnName, setNewColumnName] = useState('')
  const [newColumnType, setNewColumnType] = useState('VARCHAR(255)')
  const [newColumnNullable, setNewColumnNullable] = useState(false)
  const [newColumnPrimaryKey, setNewColumnPrimaryKey] = useState(false)
  const [newColumnUnique, setNewColumnUnique] = useState(false)

  const handleCreateTable = () => {
    if (!newTableName.trim()) return

    const newTable: Table = {
      id: Date.now().toString(),
      name: newTableName,
      schema: newTableSchema,
      columns: [],
      createdAt: new Date().toISOString()
    }

    setTables([...tables, newTable])
    setNewTableName('')
    setNewTableSchema('public')
    setShowNewTableForm(false)
  }

  const handleAddColumn = () => {
    if (!selectedTable || !newColumnName.trim()) return

    const newColumn: Column = {
      id: `c${Date.now()}`,
      name: newColumnName,
      dataType: newColumnType,
      nullable: newColumnNullable,
      primaryKey: newColumnPrimaryKey,
      unique: newColumnUnique
    }

    const updatedTables = tables.map(table =>
      table.id === selectedTable.id
        ? { ...table, columns: [...table.columns, newColumn] }
        : table
    )

    setTables(updatedTables)
    setSelectedTable({ ...selectedTable, columns: [...selectedTable.columns, newColumn] })
    setNewColumnName('')
    setNewColumnType('VARCHAR(255)')
    setNewColumnNullable(false)
    setNewColumnPrimaryKey(false)
    setNewColumnUnique(false)
  }

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter(table => table.id !== tableId))
    if (selectedTable?.id === tableId) {
      setSelectedTable(null)
    }
  }

  const handleDeleteColumn = (columnId: string) => {
    if (!selectedTable) return

    const updatedTables = tables.map(table =>
      table.id === selectedTable.id
        ? { ...table, columns: table.columns.filter(col => col.id !== columnId) }
        : table
    )

    setTables(updatedTables)
    setSelectedTable({
      ...selectedTable,
      columns: selectedTable.columns.filter(col => col.id !== columnId)
    })
  }

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Schema Manager</h1>
          <p className="text-gray-600">Create and manage database tables and schemas</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Tables</h2>
                <button
                  data-testid="createdatabase-create-table"
                  onClick={() => setShowNewTableForm(!showNewTableForm)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                >
                  + New
                </button>
              </div>

              {showNewTableForm && (
                <div data-testid="createdatabase-new-table-form" className="mb-4 p-4 bg-gray-50 rounded-md">
                  <input
                    data-testid="createdatabase-table-name"
                    type="text"
                    placeholder="Table name"
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    data-testid="createdatabase-schema-name"
                    type="text"
                    placeholder="Schema (default: public)"
                    value={newTableSchema}
                    onChange={(e) => setNewTableSchema(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button
                      data-testid="createdatabase-submit-table"
                      onClick={handleCreateTable}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                      Create
                    </button>
                    <button
                      data-testid="createdatabase-cancel-table"
                      onClick={() => {
                        setShowNewTableForm(false)
                        setNewTableName('')
                        setNewTableSchema('public')
                      }}
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <ul data-testid="createdatabase-list" className="space-y-2">
                {tables.map((table) => (
                  <li
                    key={table.id}
                    data-testid="createdatabase-item"
                    className={`p-3 rounded-md cursor-pointer transition ${
                      selectedTable?.id === table.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedTable(table)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{table.name}</h3>
                        <p className="text-xs text-gray-500">{table.schema} · {table.columns.length} columns</p>
                      </div>
                      <button
                        data-testid="createdatabase-delete-table"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteTable(table.id)
                        }}
                        className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {tables.length === 0 && (
                <p className="text-gray-500 text-center py-8">No tables yet. Create one to get started.</p>
              )}
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2">
            {selectedTable ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedTable.name}</h2>
                  <p className="text-sm text-gray-500">
                    Schema: {selectedTable.schema} · Created: {new Date(selectedTable.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Add Column Form */}
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Column</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      data-testid="createdatabase-column-name"
                      type="text"
                      placeholder="Column name"
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      data-testid="createdatabase-column-type"
                      value={newColumnType}
                      onChange={(e) => setNewColumnType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {DATA_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        data-testid="createdatabase-column-nullable"
                        type="checkbox"
                        checked={newColumnNullable}
                        onChange={(e) => setNewColumnNullable(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Nullable</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        data-testid="createdatabase-column-primary"
                        type="checkbox"
                        checked={newColumnPrimaryKey}
                        onChange={(e) => setNewColumnPrimaryKey(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Primary Key</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        data-testid="createdatabase-column-unique"
                        type="checkbox"
                        checked={newColumnUnique}
                        onChange={(e) => setNewColumnUnique(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Unique</span>
                    </label>
                  </div>
                  <button
                    data-testid="createdatabase-submit-column"
                    onClick={handleAddColumn}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Add Column
                  </button>
                </div>

                {/* Columns Table */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Columns</h3>
                  {selectedTable.columns.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700 border-b">Name</th>
                            <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700 border-b">Type</th>
                            <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700 border-b">Constraints</th>
                            <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700 border-b">Actions</th>
                          </tr>
                        </thead>
                        <tbody data-testid="createdatabase-columns-list">
                          {selectedTable.columns.map((column) => (
                            <tr key={column.id} data-testid="createdatabase-column-item" className="border-b hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900 font-mono">{column.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{column.dataType}</td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex flex-wrap gap-1">
                                  {column.primaryKey && (
                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">PK</span>
                                  )}
                                  {column.unique && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">UNIQUE</span>
                                  )}
                                  {!column.nullable && (
                                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">NOT NULL</span>
                                  )}
                                  {column.nullable && (
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">NULL</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <button
                                  data-testid="createdatabase-delete-column"
                                  onClick={() => handleDeleteColumn(column.id)}
                                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No columns yet. Add a column to define the table structure.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Table</h3>
                <p className="text-gray-500">Choose a table from the list to view and edit its columns</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
