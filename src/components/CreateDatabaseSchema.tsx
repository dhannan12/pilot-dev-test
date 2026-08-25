/**
 * CreateDatabaseSchema — Database schema designer for TennisApp
 *
 * Features: table management, field definition, relationship mapping, data type selection, schema visualization
 *
 * Ticket: SCRUM-1195 | Branch: proto/SCRUM-1186
 */

import React, { useState } from 'react'

interface Field {
  id: string
  name: string
  type: string
  required: boolean
  unique: boolean
}

interface Table {
  id: string
  name: string
  fields: Field[]
  relationships: string[]
}

const MOCK_TABLES: Table[] = [
  {
    id: 'table-1',
    name: 'Users',
    fields: [
      { id: 'f1', name: 'id', type: 'UUID', required: true, unique: true },
      { id: 'f2', name: 'email', type: 'VARCHAR(255)', required: true, unique: true },
      { id: 'f3', name: 'username', type: 'VARCHAR(100)', required: true, unique: true },
      { id: 'f4', name: 'skill_level', type: 'INTEGER', required: true, unique: false },
      { id: 'f5', name: 'created_at', type: 'TIMESTAMP', required: true, unique: false }
    ],
    relationships: ['Matches', 'Bookings']
  },
  {
    id: 'table-2',
    name: 'Courts',
    fields: [
      { id: 'f6', name: 'id', type: 'UUID', required: true, unique: true },
      { id: 'f7', name: 'name', type: 'VARCHAR(100)', required: true, unique: false },
      { id: 'f8', name: 'surface_type', type: 'VARCHAR(50)', required: true, unique: false },
      { id: 'f9', name: 'is_indoor', type: 'BOOLEAN', required: true, unique: false },
      { id: 'f10', name: 'hourly_rate', type: 'DECIMAL(10,2)', required: true, unique: false }
    ],
    relationships: ['Bookings']
  },
  {
    id: 'table-3',
    name: 'Bookings',
    fields: [
      { id: 'f11', name: 'id', type: 'UUID', required: true, unique: true },
      { id: 'f12', name: 'user_id', type: 'UUID', required: true, unique: false },
      { id: 'f13', name: 'court_id', type: 'UUID', required: true, unique: false },
      { id: 'f14', name: 'start_time', type: 'TIMESTAMP', required: true, unique: false },
      { id: 'f15', name: 'end_time', type: 'TIMESTAMP', required: true, unique: false },
      { id: 'f16', name: 'status', type: 'VARCHAR(50)', required: true, unique: false }
    ],
    relationships: ['Users', 'Courts']
  },
  {
    id: 'table-4',
    name: 'Matches',
    fields: [
      { id: 'f17', name: 'id', type: 'UUID', required: true, unique: true },
      { id: 'f18', name: 'player1_id', type: 'UUID', required: true, unique: false },
      { id: 'f19', name: 'player2_id', type: 'UUID', required: true, unique: false },
      { id: 'f20', name: 'booking_id', type: 'UUID', required: true, unique: false },
      { id: 'f21', name: 'score', type: 'VARCHAR(100)', required: false, unique: false },
      { id: 'f22', name: 'winner_id', type: 'UUID', required: false, unique: false }
    ],
    relationships: ['Users', 'Bookings']
  },
  {
    id: 'table-5',
    name: 'Tournaments',
    fields: [
      { id: 'f23', name: 'id', type: 'UUID', required: true, unique: true },
      { id: 'f24', name: 'name', type: 'VARCHAR(200)', required: true, unique: false },
      { id: 'f25', name: 'start_date', type: 'DATE', required: true, unique: false },
      { id: 'f26', name: 'end_date', type: 'DATE', required: true, unique: false },
      { id: 'f27', name: 'max_participants', type: 'INTEGER', required: true, unique: false },
      { id: 'f28', name: 'entry_fee', type: 'DECIMAL(10,2)', required: true, unique: false }
    ],
    relationships: ['Matches', 'Users']
  }
]

const DATA_TYPES = [
  'UUID',
  'VARCHAR(50)',
  'VARCHAR(100)',
  'VARCHAR(255)',
  'INTEGER',
  'BIGINT',
  'DECIMAL(10,2)',
  'BOOLEAN',
  'TIMESTAMP',
  'DATE',
  'TEXT',
  'JSON'
]

export default function CreateDatabaseSchema() {
  const [tables, setTables] = useState<Table[]>(MOCK_TABLES)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [newTableName, setNewTableName] = useState('')
  const [newFieldName, setNewFieldName] = useState('')
  const [newFieldType, setNewFieldType] = useState('VARCHAR(100)')
  const [showAddTable, setShowAddTable] = useState(false)

  const handleAddTable = () => {
    if (!newTableName.trim()) return
    
    const newTable: Table = {
      id: `table-${Date.now()}`,
      name: newTableName,
      fields: [
        { id: `f-${Date.now()}`, name: 'id', type: 'UUID', required: true, unique: true }
      ],
      relationships: []
    }
    
    setTables([...tables, newTable])
    setNewTableName('')
    setShowAddTable(false)
  }

  const handleAddField = () => {
    if (!selectedTable || !newFieldName.trim()) return
    
    const updatedTables = tables.map(table => {
      if (table.id === selectedTable) {
        const newField: Field = {
          id: `f-${Date.now()}`,
          name: newFieldName,
          type: newFieldType,
          required: false,
          unique: false
        }
        return { ...table, fields: [...table.fields, newField] }
      }
      return table
    })
    
    setTables(updatedTables)
    setNewFieldName('')
  }

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter(t => t.id !== tableId))
    if (selectedTable === tableId) {
      setSelectedTable(null)
    }
  }

  const handleDeleteField = (tableId: string, fieldId: string) => {
    const updatedTables = tables.map(table => {
      if (table.id === tableId) {
        return { ...table, fields: table.fields.filter(f => f.id !== fieldId) }
      }
      return table
    })
    setTables(updatedTables)
  }

  const selectedTableData = tables.find(t => t.id === selectedTable)

  return (
    <div data-testid="createdatabaseschema" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">TennisApp Database Schema</h1>
          <p className="text-slate-600">Design and manage your database tables, fields, and relationships</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Tables</h2>
              <button
                data-testid="createdatabaseschema-add-table"
                onClick={() => setShowAddTable(!showAddTable)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                + Add
              </button>
            </div>

            {showAddTable && (
              <div data-testid="createdatabaseschema-add-table-form" className="mb-4 p-3 bg-slate-50 rounded-lg">
                <input
                  data-testid="createdatabaseschema-new-table-name"
                  type="text"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  placeholder="Table name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-2 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    data-testid="createdatabaseschema-save-table"
                    onClick={handleAddTable}
                    className="flex-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                  >
                    Save
                  </button>
                  <button
                    data-testid="createdatabaseschema-cancel-table"
                    onClick={() => setShowAddTable(false)}
                    className="flex-1 px-3 py-1 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <ul data-testid="createdatabaseschema-tables-list" className="space-y-2">
              {tables.map(table => (
                <li
                  key={table.id}
                  data-testid="createdatabaseschema-table-item"
                  className={`p-3 rounded-lg border-2 cursor-pointer transition ${
                    selectedTable === table.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                  onClick={() => setSelectedTable(table.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">{table.name}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {table.fields.length} fields · {table.relationships.length} relations
                      </div>
                    </div>
                    <button
                      data-testid="createdatabaseschema-delete-table"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteTable(table.id)
                      }}
                      className="text-red-600 hover:text-red-800 text-xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {selectedTableData ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{selectedTableData.name}</h2>
                  <div className="text-sm text-slate-600">
                    Table ID: {selectedTableData.id}
                  </div>
                  {selectedTableData.relationships.length > 0 && (
                    <div className="mt-2 text-sm text-slate-600">
                      <span className="font-medium">Relationships:</span> {selectedTableData.relationships.join(', ')}
                    </div>
                  )}
                </div>

                {/* Add Field Form */}
                <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Add New Field</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      data-testid="createdatabaseschema-field-name"
                      type="text"
                      value={newFieldName}
                      onChange={(e) => setNewFieldName(e.target.value)}
                      placeholder="Field name"
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                    <select
                      data-testid="createdatabaseschema-field-type"
                      value={newFieldType}
                      onChange={(e) => setNewFieldType(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    >
                      {DATA_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    data-testid="createdatabaseschema-add-field"
                    onClick={handleAddField}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Add Field
                  </button>
                </div>

                {/* Fields List */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Fields</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-slate-200">
                          <th className="text-left py-2 px-3 text-sm font-semibold text-slate-700">Name</th>
                          <th className="text-left py-2 px-3 text-sm font-semibold text-slate-700">Type</th>
                          <th className="text-center py-2 px-3 text-sm font-semibold text-slate-700">Required</th>
                          <th className="text-center py-2 px-3 text-sm font-semibold text-slate-700">Unique</th>
                          <th className="text-center py-2 px-3 text-sm font-semibold text-slate-700">Action</th>
                        </tr>
                      </thead>
                      <tbody data-testid="createdatabaseschema-fields-list">
                        {selectedTableData.fields.map(field => (
                          <tr
                            key={field.id}
                            data-testid="createdatabaseschema-field-item"
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="py-3 px-3 text-sm font-mono text-slate-900">{field.name}</td>
                            <td className="py-3 px-3 text-sm text-slate-600">{field.type}</td>
                            <td className="py-3 px-3 text-center">
                              {field.required ? (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                                  Required
                                </span>
                              ) : (
                                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                                  Optional
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center">
                              {field.unique ? (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                  Unique
                                </span>
                              ) : (
                                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                                  —
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                data-testid="createdatabaseschema-delete-field"
                                onClick={() => handleDeleteField(selectedTableData.id, field.id)}
                                className="text-red-600 hover:text-red-800 text-xl font-bold"
                              >
                                ×
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
              <div className="flex items-center justify-center h-64 text-slate-400">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  <p className="text-lg">Select a table to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Schema Summary */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Schema Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{tables.length}</div>
              <div className="text-sm text-slate-600 mt-1">Total Tables</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {tables.reduce((sum, t) => sum + t.fields.length, 0)}
              </div>
              <div className="text-sm text-slate-600 mt-1">Total Fields</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {tables.reduce((sum, t) => sum + t.relationships.length, 0)}
              </div>
              <div className="text-sm text-slate-600 mt-1">Total Relations</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">
                {tables.reduce((sum, t) => sum + t.fields.filter(f => f.unique).length, 0)}
              </div>
              <div className="text-sm text-slate-600 mt-1">Unique Constraints</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
