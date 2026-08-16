/**
 * CreateDatabase — Interactive database schema and table creation interface
 *
 * Features: Schema management, table creation, field definition, data type selection, relationship visualization
 *
 * Ticket: SCRUM-923 | Branch: proto/SCRUM-914
 */

import React, { useState } from 'react'

interface Field {
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
  schema: string
  fields: Field[]
}

interface Schema {
  id: string
  name: string
  description: string
  tables: number
}

// Mock data for existing schemas
const mockSchemas: Schema[] = [
  { id: '1', name: 'public', description: 'Default public schema', tables: 5 },
  { id: '2', name: 'auth', description: 'Authentication and user management', tables: 3 },
  { id: '3', name: 'inventory', description: 'Equipment and inventory tracking', tables: 8 },
  { id: '4', name: 'rentals', description: 'Rental transactions and bookings', tables: 6 },
  { id: '5', name: 'analytics', description: 'Reporting and analytics data', tables: 4 },
]

// Mock data for existing tables
const mockTables: Table[] = [
  {
    id: '1',
    name: 'users',
    schema: 'auth',
    fields: [
      { id: '1', name: 'id', type: 'uuid', nullable: false, primaryKey: true, unique: true },
      { id: '2', name: 'email', type: 'varchar', nullable: false, primaryKey: false, unique: true },
      { id: '3', name: 'created_at', type: 'timestamp', nullable: false, primaryKey: false, unique: false },
    ],
  },
  {
    id: '2',
    name: 'equipment',
    schema: 'inventory',
    fields: [
      { id: '1', name: 'id', type: 'uuid', nullable: false, primaryKey: true, unique: true },
      { id: '2', name: 'name', type: 'varchar', nullable: false, primaryKey: false, unique: false },
      { id: '3', name: 'quantity', type: 'integer', nullable: false, primaryKey: false, unique: false },
    ],
  },
]

const dataTypes = [
  'varchar',
  'text',
  'integer',
  'bigint',
  'decimal',
  'boolean',
  'timestamp',
  'date',
  'uuid',
  'jsonb',
]

export default function CreateDatabase() {
  const [activeTab, setActiveTab] = useState<'schemas' | 'tables'>('schemas')
  const [showSchemaForm, setShowSchemaForm] = useState(false)
  const [showTableForm, setShowTableForm] = useState(false)
  const [schemas] = useState<Schema[]>(mockSchemas)
  const [tables] = useState<Table[]>(mockTables)

  // Schema form state
  const [schemaName, setSchemaName] = useState('')
  const [schemaDescription, setSchemaDescription] = useState('')

  // Table form state
  const [tableName, setTableName] = useState('')
  const [selectedSchema, setSelectedSchema] = useState('public')
  const [fields, setFields] = useState<Field[]>([
    { id: '1', name: 'id', type: 'uuid', nullable: false, primaryKey: true, unique: true },
  ])

  const handleAddField = () => {
    const newField: Field = {
      id: Date.now().toString(),
      name: '',
      type: 'varchar',
      nullable: true,
      primaryKey: false,
      unique: false,
    }
    setFields([...fields, newField])
  }

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id))
  }

  const handleFieldChange = (id: string, key: keyof Field, value: any) => {
    setFields(
      fields.map((f) => (f.id === id ? { ...f, [key]: value } : f))
    )
  }

  const handleCreateSchema = () => {
    console.log('Creating schema:', { schemaName, schemaDescription })
    setSchemaName('')
    setSchemaDescription('')
    setShowSchemaForm(false)
  }

  const handleCreateTable = () => {
    console.log('Creating table:', { tableName, selectedSchema, fields })
    setTableName('')
    setSelectedSchema('public')
    setFields([{ id: '1', name: 'id', type: 'uuid', nullable: false, primaryKey: true, unique: true }])
    setShowTableForm(false)
  }

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Management</h1>
          <p className="text-gray-600">Create and manage database schemas and tables</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              data-testid="createdatabase-schemas-tab"
              onClick={() => setActiveTab('schemas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'schemas'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Schemas
            </button>
            <button
              data-testid="createdatabase-tables-tab"
              onClick={() => setActiveTab('tables')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tables'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tables
            </button>
          </nav>
        </div>

        {/* Schemas Tab */}
        {activeTab === 'schemas' && (
          <div>
            <div className="mb-6">
              <button
                data-testid="createdatabase-new-schema"
                onClick={() => setShowSchemaForm(!showSchemaForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showSchemaForm ? 'Cancel' : 'New Schema'}
              </button>
            </div>

            {/* Schema Form */}
            {showSchemaForm && (
              <div
                data-testid="createdatabase-schema-form"
                className="bg-white rounded-lg shadow-md p-6 mb-6"
              >
                <h2 className="text-xl font-semibold mb-4">Create New Schema</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schema Name
                    </label>
                    <input
                      data-testid="createdatabase-schema-name"
                      type="text"
                      value={schemaName}
                      onChange={(e) => setSchemaName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., inventory, auth, analytics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      data-testid="createdatabase-schema-description"
                      value={schemaDescription}
                      onChange={(e) => setSchemaDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Describe the purpose of this schema..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      data-testid="createdatabase-schema-submit"
                      onClick={handleCreateSchema}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Create Schema
                    </button>
                    <button
                      data-testid="createdatabase-schema-cancel"
                      onClick={() => setShowSchemaForm(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Schemas List */}
            <div data-testid="createdatabase-schema-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schemas.map((schema) => (
                <div
                  key={schema.id}
                  data-testid="createdatabase-schema-item"
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{schema.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {schema.tables} tables
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{schema.description}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      data-testid="createdatabase-schema-view"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      View Tables
                    </button>
                    <button
                      data-testid="createdatabase-schema-delete"
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tables Tab */}
        {activeTab === 'tables' && (
          <div>
            <div className="mb-6">
              <button
                data-testid="createdatabase-new-table"
                onClick={() => setShowTableForm(!showTableForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showTableForm ? 'Cancel' : 'New Table'}
              </button>
            </div>

            {/* Table Form */}
            {showTableForm && (
              <div
                data-testid="createdatabase-table-form"
                className="bg-white rounded-lg shadow-md p-6 mb-6"
              >
                <h2 className="text-xl font-semibold mb-4">Create New Table</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Table Name
                      </label>
                      <input
                        data-testid="createdatabase-table-name"
                        type="text"
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., users, products, orders"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Schema
                      </label>
                      <select
                        data-testid="createdatabase-table-schema"
                        value={selectedSchema}
                        onChange={(e) => setSelectedSchema(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {schemas.map((schema) => (
                          <option key={schema.id} value={schema.name}>
                            {schema.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Fields Section */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-700">Fields</label>
                      <button
                        data-testid="createdatabase-add-field"
                        onClick={handleAddField}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add Field
                      </button>
                    </div>

                    <div data-testid="createdatabase-fields-list" className="space-y-3">
                      {fields.map((field) => (
                        <div
                          key={field.id}
                          data-testid="createdatabase-field-item"
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-3">
                              <input
                                data-testid="createdatabase-field-name"
                                type="text"
                                value={field.name}
                                onChange={(e) => handleFieldChange(field.id, 'name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Field name"
                              />
                            </div>
                            <div className="col-span-2">
                              <select
                                data-testid="createdatabase-field-type"
                                value={field.type}
                                onChange={(e) => handleFieldChange(field.id, 'type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              >
                                {dataTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-span-5 flex items-center gap-3 text-sm">
                              <label className="flex items-center gap-1">
                                <input
                                  data-testid="createdatabase-field-nullable"
                                  type="checkbox"
                                  checked={field.nullable}
                                  onChange={(e) =>
                                    handleFieldChange(field.id, 'nullable', e.target.checked)
                                  }
                                  className="rounded"
                                />
                                <span>Nullable</span>
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  data-testid="createdatabase-field-primary"
                                  type="checkbox"
                                  checked={field.primaryKey}
                                  onChange={(e) =>
                                    handleFieldChange(field.id, 'primaryKey', e.target.checked)
                                  }
                                  className="rounded"
                                />
                                <span>PK</span>
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  data-testid="createdatabase-field-unique"
                                  type="checkbox"
                                  checked={field.unique}
                                  onChange={(e) =>
                                    handleFieldChange(field.id, 'unique', e.target.checked)
                                  }
                                  className="rounded"
                                />
                                <span>Unique</span>
                              </label>
                            </div>
                            <div className="col-span-2 flex items-center justify-end">
                              <button
                                data-testid="createdatabase-field-remove"
                                onClick={() => handleRemoveField(field.id)}
                                disabled={fields.length === 1}
                                className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      data-testid="createdatabase-table-submit"
                      onClick={handleCreateTable}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Create Table
                    </button>
                    <button
                      data-testid="createdatabase-table-cancel"
                      onClick={() => setShowTableForm(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tables List */}
            <div data-testid="createdatabase-table-list" className="space-y-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  data-testid="createdatabase-table-item"
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{table.name}</h3>
                      <p className="text-sm text-gray-500">Schema: {table.schema}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        data-testid="createdatabase-table-edit"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        data-testid="createdatabase-table-delete"
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium text-gray-700">
                            Field Name
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-700">Type</th>
                          <th className="px-4 py-2 text-left font-medium text-gray-700">
                            Constraints
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.fields.map((field) => (
                          <tr key={field.id} className="border-t border-gray-200">
                            <td className="px-4 py-2">{field.name}</td>
                            <td className="px-4 py-2">{field.type}</td>
                            <td className="px-4 py-2">
                              <div className="flex gap-2">
                                {field.primaryKey && (
                                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                    PK
                                  </span>
                                )}
                                {field.unique && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    UNIQUE
                                  </span>
                                )}
                                {!field.nullable && (
                                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                    NOT NULL
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
