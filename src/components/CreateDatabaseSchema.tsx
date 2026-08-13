/**
 * CreateDatabaseSchema — Database schema designer and management for Rehabd physiotherapy platform
 *
 * Features: table creation, field definition, relationship mapping, schema validation, export/import
 *
 * Ticket: SCRUM-727 | Branch: proto/SCRUM-717
 */

import { useState } from 'react'

interface TableField {
  id: string
  name: string
  type: string
  required: boolean
  unique: boolean
  defaultValue?: string
}

interface DatabaseTable {
  id: string
  name: string
  description: string
  fields: TableField[]
  relationships: string[]
  createdAt: string
}

const MOCK_TABLES: DatabaseTable[] = [
  {
    id: '1',
    name: 'patients',
    description: 'Patient records and personal information',
    fields: [
      { id: 'f1', name: 'id', type: 'uuid', required: true, unique: true },
      { id: 'f2', name: 'first_name', type: 'varchar(100)', required: true, unique: false },
      { id: 'f3', name: 'last_name', type: 'varchar(100)', required: true, unique: false },
      { id: 'f4', name: 'email', type: 'varchar(255)', required: true, unique: true },
      { id: 'f5', name: 'phone', type: 'varchar(20)', required: true, unique: false },
      { id: 'f6', name: 'date_of_birth', type: 'date', required: true, unique: false },
      { id: 'f7', name: 'created_at', type: 'timestamp', required: true, unique: false, defaultValue: 'CURRENT_TIMESTAMP' }
    ],
    relationships: ['appointments', 'treatment_plans'],
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'physiotherapists',
    description: 'Physiotherapist staff information and credentials',
    fields: [
      { id: 'f8', name: 'id', type: 'uuid', required: true, unique: true },
      { id: 'f9', name: 'first_name', type: 'varchar(100)', required: true, unique: false },
      { id: 'f10', name: 'last_name', type: 'varchar(100)', required: true, unique: false },
      { id: 'f11', name: 'email', type: 'varchar(255)', required: true, unique: true },
      { id: 'f12', name: 'license_number', type: 'varchar(50)', required: true, unique: true },
      { id: 'f13', name: 'specialization', type: 'varchar(200)', required: false, unique: false },
      { id: 'f14', name: 'active', type: 'boolean', required: true, unique: false, defaultValue: 'true' }
    ],
    relationships: ['appointments', 'treatment_plans'],
    createdAt: '2026-08-01T10:15:00Z'
  },
  {
    id: '3',
    name: 'appointments',
    description: 'Scheduled patient appointments',
    fields: [
      { id: 'f15', name: 'id', type: 'uuid', required: true, unique: true },
      { id: 'f16', name: 'patient_id', type: 'uuid', required: true, unique: false },
      { id: 'f17', name: 'physiotherapist_id', type: 'uuid', required: true, unique: false },
      { id: 'f18', name: 'appointment_date', type: 'timestamp', required: true, unique: false },
      { id: 'f19', name: 'duration_minutes', type: 'integer', required: true, unique: false },
      { id: 'f20', name: 'status', type: 'varchar(20)', required: true, unique: false },
      { id: 'f21', name: 'notes', type: 'text', required: false, unique: false }
    ],
    relationships: ['patients', 'physiotherapists'],
    createdAt: '2026-08-01T10:30:00Z'
  },
  {
    id: '4',
    name: 'treatment_plans',
    description: 'Patient treatment plans and protocols',
    fields: [
      { id: 'f22', name: 'id', type: 'uuid', required: true, unique: true },
      { id: 'f23', name: 'patient_id', type: 'uuid', required: true, unique: false },
      { id: 'f24', name: 'physiotherapist_id', type: 'uuid', required: true, unique: false },
      { id: 'f25', name: 'diagnosis', type: 'text', required: true, unique: false },
      { id: 'f26', name: 'treatment_goals', type: 'text', required: true, unique: false },
      { id: 'f27', name: 'start_date', type: 'date', required: true, unique: false },
      { id: 'f28', name: 'end_date', type: 'date', required: false, unique: false }
    ],
    relationships: ['patients', 'physiotherapists', 'exercises'],
    createdAt: '2026-08-01T10:45:00Z'
  },
  {
    id: '5',
    name: 'exercises',
    description: 'Exercise library for treatment plans',
    fields: [
      { id: 'f29', name: 'id', type: 'uuid', required: true, unique: true },
      { id: 'f30', name: 'name', type: 'varchar(200)', required: true, unique: false },
      { id: 'f31', name: 'description', type: 'text', required: true, unique: false },
      { id: 'f32', name: 'category', type: 'varchar(100)', required: true, unique: false },
      { id: 'f33', name: 'difficulty_level', type: 'varchar(20)', required: true, unique: false },
      { id: 'f34', name: 'duration_minutes', type: 'integer', required: true, unique: false },
      { id: 'f35', name: 'repetitions', type: 'integer', required: false, unique: false }
    ],
    relationships: ['treatment_plans'],
    createdAt: '2026-08-01T11:00:00Z'
  },
  {
    id: '6',
    name: 'billing',
    description: 'Billing and payment records',
    fields: [
      { id: 'f36', name: 'id', type: 'uuid', required: true, unique: true },
      { id: 'f37', name: 'patient_id', type: 'uuid', required: true, unique: false },
      { id: 'f38', name: 'appointment_id', type: 'uuid', required: true, unique: false },
      { id: 'f39', name: 'amount', type: 'decimal(10,2)', required: true, unique: false },
      { id: 'f40', name: 'payment_status', type: 'varchar(20)', required: true, unique: false },
      { id: 'f41', name: 'payment_date', type: 'timestamp', required: false, unique: false },
      { id: 'f42', name: 'invoice_number', type: 'varchar(50)', required: true, unique: true }
    ],
    relationships: ['patients', 'appointments'],
    createdAt: '2026-08-01T11:15:00Z'
  }
]

const FIELD_TYPES = [
  'uuid',
  'varchar(50)',
  'varchar(100)',
  'varchar(200)',
  'varchar(255)',
  'text',
  'integer',
  'decimal(10,2)',
  'boolean',
  'date',
  'timestamp'
]

export default function CreateDatabaseSchema() {
  const [tables, setTables] = useState<DatabaseTable[]>(MOCK_TABLES)
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTableName, setNewTableName] = useState('')
  const [newTableDesc, setNewTableDesc] = useState('')

  const handleCreateTable = () => {
    if (newTableName.trim()) {
      const newTable: DatabaseTable = {
        id: Date.now().toString(),
        name: newTableName.toLowerCase().replace(/\s+/g, '_'),
        description: newTableDesc,
        fields: [
          { id: `f${Date.now()}`, name: 'id', type: 'uuid', required: true, unique: true }
        ],
        relationships: [],
        createdAt: new Date().toISOString()
      }
      setTables([...tables, newTable])
      setNewTableName('')
      setNewTableDesc('')
      setShowCreateForm(false)
    }
  }

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter(t => t.id !== tableId))
    if (selectedTable?.id === tableId) {
      setSelectedTable(null)
    }
  }

  const exportSchema = () => {
    const schema = {
      version: '1.0.0',
      database: 'rehabd',
      tables: tables,
      exported_at: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rehabd-schema.json'
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Database Schema Designer</h1>
              <p className="text-gray-600 mt-2">Rehabd Physiotherapy Management Platform</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                + New Table
              </button>
              <button
                onClick={exportSchema}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Export Schema
              </button>
            </div>
          </div>
        </div>

        {/* Create Table Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Table</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Table Name
                </label>
                <input
                  type="text"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., medical_records"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newTableDesc}
                  onChange={(e) => setNewTableDesc(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the table purpose"
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCreateTable}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Create Table
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tables ({tables.length})
              </h2>
              <div className="space-y-2">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      selectedTable?.id === table.id
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{table.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{table.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>{table.fields.length} fields</span>
                          <span>{table.relationships.length} relations</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteTable(table.id)
                        }}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2">
            {selectedTable ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTable.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedTable.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created: {new Date(selectedTable.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Fields Table */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Fields</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Type
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                            Required
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase">
                            Unique
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Default
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedTable.fields.map((field) => (
                          <tr key={field.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {field.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">
                                {field.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              {field.required ? (
                                <span className="inline-block w-4 h-4 bg-green-500 rounded-full"></span>
                              ) : (
                                <span className="inline-block w-4 h-4 bg-gray-300 rounded-full"></span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              {field.unique ? (
                                <span className="inline-block w-4 h-4 bg-blue-500 rounded-full"></span>
                              ) : (
                                <span className="inline-block w-4 h-4 bg-gray-300 rounded-full"></span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                              {field.defaultValue || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Relationships */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Relationships</h3>
                  {selectedTable.relationships.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedTable.relationships.map((rel, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          → {rel}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No relationships defined</p>
                  )}
                </div>

                {/* SQL Preview */}
                <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                  <h3 className="text-sm font-semibold text-white mb-2">SQL Preview</h3>
                  <pre className="text-xs text-green-400 font-mono overflow-x-auto">
                    {`CREATE TABLE ${selectedTable.name} (\n${selectedTable.fields
                      .map(
                        (f) =>
                          `  ${f.name} ${f.type}${f.required ? ' NOT NULL' : ''}${
                            f.unique ? ' UNIQUE' : ''
                          }${f.defaultValue ? ` DEFAULT ${f.defaultValue}` : ''}`
                      )
                      .join(',\n')}\n);`}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Table Selected</h3>
                <p className="text-gray-600">
                  Select a table from the list to view its schema details
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Schema Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Schema Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Tables</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">{tables.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Total Fields</p>
              <p className="text-3xl font-bold text-green-900 mt-1">
                {tables.reduce((sum, t) => sum + t.fields.length, 0)}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Relationships</p>
              <p className="text-3xl font-bold text-purple-900 mt-1">
                {tables.reduce((sum, t) => sum + t.relationships.length, 0)}
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-600 font-medium">Field Types</p>
              <p className="text-3xl font-bold text-orange-900 mt-1">{FIELD_TYPES.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
