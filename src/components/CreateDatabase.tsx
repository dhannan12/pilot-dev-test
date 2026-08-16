/**
 * CreateDatabase — Database schema designer and manager for gym membership portal
 *
 * Features: schema visualization, table management, relationship mapping, field editor, SQL preview
 *
 * Ticket: SCRUM-961 | Branch: proto/SCRUM-951
 */

import { useState } from 'react'

interface DatabaseTable {
  id: string
  name: string
  description: string
  fields: TableField[]
  recordCount: number
}

interface TableField {
  id: string
  name: string
  type: string
  required: boolean
  unique: boolean
}

const MOCK_TABLES: DatabaseTable[] = [
  {
    id: '1',
    name: 'members',
    description: 'Gym member profiles and contact information',
    recordCount: 1247,
    fields: [
      { id: 'f1', name: 'id', type: 'INTEGER', required: true, unique: true },
      { id: 'f2', name: 'email', type: 'VARCHAR(255)', required: true, unique: true },
      { id: 'f3', name: 'full_name', type: 'VARCHAR(200)', required: true, unique: false },
      { id: 'f4', name: 'phone', type: 'VARCHAR(20)', required: false, unique: false },
      { id: 'f5', name: 'join_date', type: 'DATE', required: true, unique: false },
    ]
  },
  {
    id: '2',
    name: 'memberships',
    description: 'Membership plans and subscription tiers',
    recordCount: 523,
    fields: [
      { id: 'f6', name: 'id', type: 'INTEGER', required: true, unique: true },
      { id: 'f7', name: 'member_id', type: 'INTEGER', required: true, unique: false },
      { id: 'f8', name: 'plan_type', type: 'VARCHAR(50)', required: true, unique: false },
      { id: 'f9', name: 'start_date', type: 'DATE', required: true, unique: false },
      { id: 'f10', name: 'end_date', type: 'DATE', required: false, unique: false },
      { id: 'f11', name: 'status', type: 'VARCHAR(20)', required: true, unique: false },
    ]
  },
  {
    id: '3',
    name: 'classes',
    description: 'Gym classes and training sessions',
    recordCount: 89,
    fields: [
      { id: 'f12', name: 'id', type: 'INTEGER', required: true, unique: true },
      { id: 'f13', name: 'name', type: 'VARCHAR(100)', required: true, unique: false },
      { id: 'f14', name: 'instructor', type: 'VARCHAR(100)', required: true, unique: false },
      { id: 'f15', name: 'capacity', type: 'INTEGER', required: true, unique: false },
      { id: 'f16', name: 'duration_minutes', type: 'INTEGER', required: true, unique: false },
    ]
  },
  {
    id: '4',
    name: 'bookings',
    description: 'Class bookings and reservations',
    recordCount: 3421,
    fields: [
      { id: 'f17', name: 'id', type: 'INTEGER', required: true, unique: true },
      { id: 'f18', name: 'member_id', type: 'INTEGER', required: true, unique: false },
      { id: 'f19', name: 'class_id', type: 'INTEGER', required: true, unique: false },
      { id: 'f20', name: 'booking_date', type: 'TIMESTAMP', required: true, unique: false },
      { id: 'f21', name: 'status', type: 'VARCHAR(20)', required: true, unique: false },
    ]
  },
  {
    id: '5',
    name: 'payments',
    description: 'Payment transactions and billing history',
    recordCount: 2156,
    fields: [
      { id: 'f22', name: 'id', type: 'INTEGER', required: true, unique: true },
      { id: 'f23', name: 'member_id', type: 'INTEGER', required: true, unique: false },
      { id: 'f24', name: 'amount', type: 'DECIMAL(10,2)', required: true, unique: false },
      { id: 'f25', name: 'payment_date', type: 'TIMESTAMP', required: true, unique: false },
      { id: 'f26', name: 'method', type: 'VARCHAR(50)', required: true, unique: false },
      { id: 'f27', name: 'status', type: 'VARCHAR(20)', required: true, unique: false },
    ]
  },
]

export default function CreateDatabase() {
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(null)
  const [showSQLPreview, setShowSQLPreview] = useState(false)
  const [newTableName, setNewTableName] = useState('')
  const [newFieldName, setNewFieldName] = useState('')
  const [newFieldType, setNewFieldType] = useState('VARCHAR(255)')

  const generateCreateTableSQL = (table: DatabaseTable): string => {
    const fields = table.fields.map(field => {
      let sql = `  ${field.name} ${field.type}`
      if (field.required) sql += ' NOT NULL'
      if (field.unique) sql += ' UNIQUE'
      return sql
    }).join(',\n')
    
    return `CREATE TABLE ${table.name} (\n${fields}\n);`
  }

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Schema Manager</h1>
          <p className="text-gray-600">Gym Membership Portal - Database Design</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Total Tables</div>
            <div className="text-2xl font-bold text-blue-600">{MOCK_TABLES.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Total Records</div>
            <div className="text-2xl font-bold text-green-600">
              {MOCK_TABLES.reduce((sum, t) => sum + t.recordCount, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Total Fields</div>
            <div className="text-2xl font-bold text-purple-600">
              {MOCK_TABLES.reduce((sum, t) => sum + t.fields.length, 0)}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Schema Status</div>
            <div className="text-2xl font-bold text-gray-900">Active</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tables List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Tables</h2>
                
                {/* Add New Table Form */}
                <div className="space-y-3 mb-4">
                  <input
                    data-testid="createdatabase-table-name"
                    type="text"
                    placeholder="New table name..."
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    data-testid="createdatabase-add-table"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                  >
                    + Add Table
                  </button>
                </div>
              </div>

              <div data-testid="createdatabase-list" className="p-4 space-y-2 max-h-96 overflow-y-auto">
                {MOCK_TABLES.map((table) => (
                  <div
                    key={table.id}
                    data-testid="createdatabase-item"
                    onClick={() => setSelectedTable(table)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTable?.id === table.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">{table.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{table.description}</div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{table.fields.length} fields</span>
                      <span>{table.recordCount.toLocaleString()} records</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2">
            {selectedTable ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedTable.name}</h2>
                      <p className="text-gray-600">{selectedTable.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        data-testid="createdatabase-view-sql"
                        onClick={() => setShowSQLPreview(!showSQLPreview)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
                      >
                        {showSQLPreview ? 'Hide SQL' : 'View SQL'}
                      </button>
                      <button
                        data-testid="createdatabase-delete-table"
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                      >
                        Delete Table
                      </button>
                    </div>
                  </div>

                  {/* SQL Preview */}
                  {showSQLPreview && (
                    <div className="mb-4 p-4 bg-gray-900 rounded-md overflow-x-auto">
                      <pre className="text-sm text-green-400 font-mono whitespace-pre">
                        {generateCreateTableSQL(selectedTable)}
                      </pre>
                    </div>
                  )}

                  {/* Add New Field Form */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900">Add New Field</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        data-testid="createdatabase-field-name"
                        type="text"
                        placeholder="Field name"
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        data-testid="createdatabase-field-type"
                        value={newFieldType}
                        onChange={(e) => setNewFieldType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="VARCHAR(255)">VARCHAR(255)</option>
                        <option value="INTEGER">INTEGER</option>
                        <option value="DATE">DATE</option>
                        <option value="TIMESTAMP">TIMESTAMP</option>
                        <option value="BOOLEAN">BOOLEAN</option>
                        <option value="TEXT">TEXT</option>
                        <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                      </select>
                    </div>
                    <button
                      data-testid="createdatabase-add-field"
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                    >
                      + Add Field
                    </button>
                  </div>
                </div>

                {/* Fields Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Field Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Data Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Required
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Unique
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedTable.fields.map((field) => (
                        <tr key={field.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {field.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">
                              {field.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {field.required ? (
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                                NOT NULL
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                NULLABLE
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {field.unique ? (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                                UNIQUE
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              <button
                                data-testid="createdatabase-edit-field"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Edit
                              </button>
                              <button
                                data-testid="createdatabase-delete-field"
                                className="text-red-600 hover:text-red-800 font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Actions */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex gap-3">
                    <button
                      data-testid="createdatabase-export-schema"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                    >
                      Export Schema
                    </button>
                    <button
                      data-testid="createdatabase-migrate"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium"
                    >
                      Run Migration
                    </button>
                    <button
                      data-testid="createdatabase-backup"
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm font-medium"
                    >
                      Backup Table
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Table Selected</h3>
                <p className="text-gray-500">Select a table from the list to view and edit its schema</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
