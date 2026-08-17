/**
 * CreateDatabase — Database schema creation interface for job postings system
 *
 * Features: schema viewer, table management, field definitions, relationship mapping, SQL generation
 *
 * Ticket: SCRUM-1000 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface TableSchema {
  id: string
  name: string
  fields: Field[]
  status: 'draft' | 'created' | 'migrated'
}

interface Field {
  id: string
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  unique: boolean
}

const MOCK_TABLES: TableSchema[] = [
  {
    id: '1',
    name: 'job_postings',
    status: 'created',
    fields: [
      { id: 'f1', name: 'id', type: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'f2', name: 'title', type: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: false },
      { id: 'f3', name: 'description', type: 'TEXT', nullable: false, primaryKey: false, unique: false },
      { id: 'f4', name: 'department_id', type: 'UUID', nullable: false, primaryKey: false, unique: false },
      { id: 'f5', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false },
    ],
  },
  {
    id: '2',
    name: 'departments',
    status: 'created',
    fields: [
      { id: 'f6', name: 'id', type: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'f7', name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: true },
      { id: 'f8', name: 'description', type: 'TEXT', nullable: true, primaryKey: false, unique: false },
      { id: 'f9', name: 'manager_id', type: 'UUID', nullable: true, primaryKey: false, unique: false },
    ],
  },
  {
    id: '3',
    name: 'applications',
    status: 'created',
    fields: [
      { id: 'f10', name: 'id', type: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'f11', name: 'job_posting_id', type: 'UUID', nullable: false, primaryKey: false, unique: false },
      { id: 'f12', name: 'employee_id', type: 'UUID', nullable: false, primaryKey: false, unique: false },
      { id: 'f13', name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false, unique: false },
      { id: 'f14', name: 'submitted_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, unique: false },
    ],
  },
  {
    id: '4',
    name: 'employees',
    status: 'created',
    fields: [
      { id: 'f15', name: 'id', type: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'f16', name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false, unique: true },
      { id: 'f17', name: 'first_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: false },
      { id: 'f18', name: 'last_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false, unique: false },
      { id: 'f19', name: 'department_id', type: 'UUID', nullable: true, primaryKey: false, unique: false },
    ],
  },
  {
    id: '5',
    name: 'job_requirements',
    status: 'draft',
    fields: [
      { id: 'f20', name: 'id', type: 'UUID', nullable: false, primaryKey: true, unique: true },
      { id: 'f21', name: 'job_posting_id', type: 'UUID', nullable: false, primaryKey: false, unique: false },
      { id: 'f22', name: 'requirement', type: 'TEXT', nullable: false, primaryKey: false, unique: false },
      { id: 'f23', name: 'required', type: 'BOOLEAN', nullable: false, primaryKey: false, unique: false },
    ],
  },
]

const FIELD_TYPES = [
  'UUID',
  'VARCHAR(50)',
  'VARCHAR(100)',
  'VARCHAR(255)',
  'TEXT',
  'INTEGER',
  'BIGINT',
  'BOOLEAN',
  'TIMESTAMP',
  'DATE',
  'JSON',
]

export default function CreateDatabase() {
  const [tables, setTables] = useState<TableSchema[]>(MOCK_TABLES)
  const [selectedTable, setSelectedTable] = useState<string | null>(tables[0]?.id || null)
  const [showNewTableForm, setShowNewTableForm] = useState(false)
  const [newTableName, setNewTableName] = useState('')
  const [showSQLPreview, setShowSQLPreview] = useState(false)

  const selectedTableData = tables.find((t) => t.id === selectedTable)

  const handleCreateTable = () => {
    if (!newTableName.trim()) return

    const newTable: TableSchema = {
      id: `${Date.now()}`,
      name: newTableName.toLowerCase().replace(/\s+/g, '_'),
      status: 'draft',
      fields: [
        {
          id: `f${Date.now()}`,
          name: 'id',
          type: 'UUID',
          nullable: false,
          primaryKey: true,
          unique: true,
        },
      ],
    }

    setTables([...tables, newTable])
    setSelectedTable(newTable.id)
    setNewTableName('')
    setShowNewTableForm(false)
  }

  const handleAddField = () => {
    if (!selectedTable) return

    setTables(
      tables.map((table) => {
        if (table.id === selectedTable) {
          const newField: Field = {
            id: `f${Date.now()}`,
            name: 'new_field',
            type: 'VARCHAR(100)',
            nullable: true,
            primaryKey: false,
            unique: false,
          }
          return { ...table, fields: [...table.fields, newField] }
        }
        return table
      })
    )
  }

  const handleDeleteField = (fieldId: string) => {
    if (!selectedTable) return

    setTables(
      tables.map((table) => {
        if (table.id === selectedTable) {
          return { ...table, fields: table.fields.filter((f) => f.id !== fieldId) }
        }
        return table
      })
    )
  }

  const handleUpdateField = (fieldId: string, updates: Partial<Field>) => {
    if (!selectedTable) return

    setTables(
      tables.map((table) => {
        if (table.id === selectedTable) {
          return {
            ...table,
            fields: table.fields.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)),
          }
        }
        return table
      })
    )
  }

  const handleMigrateTable = () => {
    if (!selectedTable) return

    setTables(
      tables.map((table) =>
        table.id === selectedTable ? { ...table, status: 'migrated' } : table
      )
    )
  }

  const generateSQL = (table: TableSchema): string => {
    const fieldDefinitions = table.fields.map((field) => {
      let def = `  ${field.name} ${field.type}`
      if (field.primaryKey) def += ' PRIMARY KEY'
      if (!field.nullable) def += ' NOT NULL'
      if (field.unique && !field.primaryKey) def += ' UNIQUE'
      return def
    })

    return `CREATE TABLE ${table.name} (\n${fieldDefinitions.join(',\n')}\n);`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'created':
        return 'bg-blue-100 text-blue-800'
      case 'migrated':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Schema Manager</h1>
          <p className="text-gray-600">
            Create and manage database tables for the job postings system
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Tables List Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Tables</h2>
                <button
                  data-testid="createdatabase-new-table"
                  onClick={() => setShowNewTableForm(!showNewTableForm)}
                  className="px-2 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  + New
                </button>
              </div>

              {showNewTableForm && (
                <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
                  <input
                    data-testid="createdatabase-table-name"
                    type="text"
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    placeholder="Table name"
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2 text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      data-testid="createdatabase-create-table"
                      onClick={handleCreateTable}
                      className="flex-1 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Create
                    </button>
                    <button
                      data-testid="createdatabase-cancel-table"
                      onClick={() => {
                        setShowNewTableForm(false)
                        setNewTableName('')
                      }}
                      className="flex-1 px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div data-testid="createdatabase-list" className="space-y-2">
                {tables.map((table) => (
                  <button
                    key={table.id}
                    data-testid="createdatabase-item"
                    onClick={() => setSelectedTable(table.id)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedTable === table.id
                        ? 'bg-indigo-50 border border-indigo-200'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{table.name}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{table.fields.length} fields</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${getStatusColor(
                          table.status
                        )}`}
                      >
                        {table.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {selectedTableData ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedTableData.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedTableData.fields.length} fields defined
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        data-testid="createdatabase-preview-sql"
                        onClick={() => setShowSQLPreview(!showSQLPreview)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        {showSQLPreview ? 'Hide SQL' : 'Preview SQL'}
                      </button>
                      {selectedTableData.status !== 'migrated' && (
                        <button
                          data-testid="createdatabase-migrate"
                          onClick={handleMigrateTable}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Migrate Table
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* SQL Preview */}
                {showSQLPreview && (
                  <div className="px-6 py-4 bg-gray-900 border-b border-gray-200">
                    <pre
                      data-testid="createdatabase-sql-preview"
                      className="text-green-400 text-sm font-mono overflow-x-auto"
                    >
                      {generateSQL(selectedTableData)}
                    </pre>
                  </div>
                )}

                {/* Fields Table */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Fields</h3>
                    <button
                      data-testid="createdatabase-add-field"
                      onClick={handleAddField}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Add Field
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Field Name
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Type
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                            Primary Key
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                            Nullable
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                            Unique
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody data-testid="createdatabase-fields-list">
                        {selectedTableData.fields.map((field) => (
                          <tr
                            key={field.id}
                            data-testid="createdatabase-field-item"
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              <input
                                data-testid="createdatabase-field-name"
                                type="text"
                                value={field.name}
                                onChange={(e) =>
                                  handleUpdateField(field.id, { name: e.target.value })
                                }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <select
                                data-testid="createdatabase-field-type"
                                value={field.type}
                                onChange={(e) =>
                                  handleUpdateField(field.id, { type: e.target.value })
                                }
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              >
                                {FIELD_TYPES.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <input
                                data-testid="createdatabase-field-pk"
                                type="checkbox"
                                checked={field.primaryKey}
                                onChange={(e) =>
                                  handleUpdateField(field.id, {
                                    primaryKey: e.target.checked,
                                  })
                                }
                                className="w-4 h-4"
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <input
                                data-testid="createdatabase-field-nullable"
                                type="checkbox"
                                checked={field.nullable}
                                onChange={(e) =>
                                  handleUpdateField(field.id, {
                                    nullable: e.target.checked,
                                  })
                                }
                                className="w-4 h-4"
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <input
                                data-testid="createdatabase-field-unique"
                                type="checkbox"
                                checked={field.unique}
                                onChange={(e) =>
                                  handleUpdateField(field.id, { unique: e.target.checked })
                                }
                                className="w-4 h-4"
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                data-testid="createdatabase-delete-field"
                                onClick={() => handleDeleteField(field.id)}
                                disabled={field.primaryKey}
                                className={`px-3 py-1 text-sm rounded ${
                                  field.primaryKey
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <p className="text-gray-500">Select a table to view and edit its schema</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
