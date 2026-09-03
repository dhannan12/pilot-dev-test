/**
 * CreateDatabase — Interactive database schema viewer for hair salon booking system
 *
 * Features: table visualization, relationship mapping, field details, schema validation, SQL preview
 *
 * Ticket: SCRUM-1296 | Branch: proto/SCRUM-1288
 */

import React, { useState } from 'react'

interface TableField {
  id: string
  name: string
  type: string
  nullable: boolean
  primaryKey?: boolean
  foreignKey?: string
}

interface TableSchema {
  id: string
  name: string
  description: string
  fields: TableField[]
  color: string
}

interface Relationship {
  id: string
  from: string
  to: string
  type: string
}

const MOCK_TABLES: TableSchema[] = [
  {
    id: 'customers',
    name: 'customers',
    description: 'Customer account information',
    color: 'bg-blue-100 border-blue-400',
    fields: [
      { id: 'c1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'c2', name: 'name', type: 'VARCHAR(255)', nullable: false },
      { id: 'c3', name: 'email', type: 'VARCHAR(255)', nullable: false },
      { id: 'c4', name: 'phone', type: 'VARCHAR(20)', nullable: false },
      { id: 'c5', name: 'created_at', type: 'TIMESTAMP', nullable: false },
    ],
  },
  {
    id: 'stylists',
    name: 'stylists',
    description: 'Stylist profiles and availability',
    color: 'bg-purple-100 border-purple-400',
    fields: [
      { id: 's1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 's2', name: 'name', type: 'VARCHAR(255)', nullable: false },
      { id: 's3', name: 'specialty', type: 'VARCHAR(100)', nullable: true },
      { id: 's4', name: 'rating', type: 'DECIMAL(3,2)', nullable: true },
      { id: 's5', name: 'active', type: 'BOOLEAN', nullable: false },
    ],
  },
  {
    id: 'services',
    name: 'services',
    description: 'Available salon services',
    color: 'bg-green-100 border-green-400',
    fields: [
      { id: 'sv1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'sv2', name: 'name', type: 'VARCHAR(255)', nullable: false },
      { id: 'sv3', name: 'description', type: 'TEXT', nullable: true },
      { id: 'sv4', name: 'duration_minutes', type: 'INTEGER', nullable: false },
      { id: 'sv5', name: 'price', type: 'DECIMAL(10,2)', nullable: false },
    ],
  },
  {
    id: 'appointments',
    name: 'appointments',
    description: 'Booking appointments',
    color: 'bg-yellow-100 border-yellow-400',
    fields: [
      { id: 'a1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'a2', name: 'customer_id', type: 'UUID', nullable: false, foreignKey: 'customers.id' },
      { id: 'a3', name: 'stylist_id', type: 'UUID', nullable: false, foreignKey: 'stylists.id' },
      { id: 'a4', name: 'service_id', type: 'UUID', nullable: false, foreignKey: 'services.id' },
      { id: 'a5', name: 'appointment_date', type: 'DATE', nullable: false },
      { id: 'a6', name: 'start_time', type: 'TIME', nullable: false },
      { id: 'a7', name: 'status', type: 'VARCHAR(50)', nullable: false },
    ],
  },
  {
    id: 'notifications',
    name: 'notifications',
    description: 'Customer notification history',
    color: 'bg-pink-100 border-pink-400',
    fields: [
      { id: 'n1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'n2', name: 'appointment_id', type: 'UUID', nullable: false, foreignKey: 'appointments.id' },
      { id: 'n3', name: 'type', type: 'VARCHAR(50)', nullable: false },
      { id: 'n4', name: 'message', type: 'TEXT', nullable: false },
      { id: 'n5', name: 'sent_at', type: 'TIMESTAMP', nullable: false },
    ],
  },
]

const MOCK_RELATIONSHIPS: Relationship[] = [
  { id: 'r1', from: 'appointments', to: 'customers', type: 'many-to-one' },
  { id: 'r2', from: 'appointments', to: 'stylists', type: 'many-to-one' },
  { id: 'r3', from: 'appointments', to: 'services', type: 'many-to-one' },
  { id: 'r4', from: 'notifications', to: 'appointments', type: 'many-to-one' },
]

export default function CreateDatabase() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showSQL, setShowSQL] = useState(false)
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid'>('idle')

  const handleValidateSchema = () => {
    setValidationStatus('validating')
    setTimeout(() => {
      setValidationStatus('valid')
    }, 1000)
  }

  const generateSQL = (table: TableSchema): string => {
    const fields = table.fields.map((field) => {
      let sql = `  ${field.name} ${field.type}`
      if (field.primaryKey) sql += ' PRIMARY KEY'
      if (!field.nullable) sql += ' NOT NULL'
      return sql
    }).join(',\n')

    return `CREATE TABLE ${table.name} (\n${fields}\n);`
  }

  const selectedTableData = selectedTable
    ? MOCK_TABLES.find((t) => t.id === selectedTable)
    : null

  const getRelationshipsForTable = (tableId: string) => {
    return MOCK_RELATIONSHIPS.filter(
      (rel) => rel.from === tableId || rel.to === tableId
    )
  }

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Database Schema Designer
          </h1>
          <p className="text-gray-600">
            Hair Salon Booking System - Interactive Schema Viewer
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center gap-4">
          <button
            data-testid="createdatabase-validate"
            onClick={handleValidateSchema}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {validationStatus === 'validating' ? 'Validating...' : 'Validate Schema'}
          </button>
          <button
            data-testid="createdatabase-toggle-sql"
            onClick={() => setShowSQL(!showSQL)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {showSQL ? 'Hide SQL' : 'Show SQL'}
          </button>
          <button
            data-testid="createdatabase-export"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export Schema
          </button>
          {validationStatus === 'valid' && (
            <div className="ml-auto flex items-center gap-2 text-green-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Schema Valid</span>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Database Tables ({MOCK_TABLES.length})
              </h2>
              <div data-testid="createdatabase-list" className="space-y-4">
                {MOCK_TABLES.map((table) => (
                  <div
                    key={table.id}
                    data-testid="createdatabase-item"
                    onClick={() => setSelectedTable(table.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      table.color
                    } ${
                      selectedTable === table.id
                        ? 'ring-2 ring-offset-2 ring-blue-500'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {table.name}
                        </h3>
                        <p className="text-sm text-gray-600">{table.description}</p>
                      </div>
                      <span className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700 border">
                        {table.fields.length} fields
                      </span>
                    </div>
                    <div className="space-y-1">
                      {table.fields.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          {field.primaryKey && (
                            <span className="px-1.5 py-0.5 bg-yellow-400 text-yellow-900 rounded text-xs font-bold">
                              PK
                            </span>
                          )}
                          {field.foreignKey && (
                            <span className="px-1.5 py-0.5 bg-purple-400 text-purple-900 rounded text-xs font-bold">
                              FK
                            </span>
                          )}
                          <span className="font-mono font-medium text-gray-800">
                            {field.name}
                          </span>
                          <span className="text-gray-500">{field.type}</span>
                          {!field.nullable && (
                            <span className="text-red-600 text-xs">NOT NULL</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {getRelationshipsForTable(table.id).length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-300">
                        <p className="text-xs text-gray-600">
                          <strong>Relationships:</strong>{' '}
                          {getRelationshipsForTable(table.id)
                            .map((rel) =>
                              rel.from === table.id
                                ? `→ ${rel.to}`
                                : `← ${rel.from}`
                            )
                            .join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedTableData ? 'Table Details' : 'Schema Overview'}
              </h2>
              {selectedTableData ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {selectedTableData.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedTableData.description}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Statistics</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Total Fields:</span>
                        <span className="font-medium">{selectedTableData.fields.length}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Primary Keys:</span>
                        <span className="font-medium">
                          {selectedTableData.fields.filter((f) => f.primaryKey).length}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Foreign Keys:</span>
                        <span className="font-medium">
                          {selectedTableData.fields.filter((f) => f.foreignKey).length}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Nullable Fields:</span>
                        <span className="font-medium">
                          {selectedTableData.fields.filter((f) => f.nullable).length}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Relationships</h4>
                    <ul className="space-y-2 text-sm">
                      {getRelationshipsForTable(selectedTableData.id).map((rel) => (
                        <li key={rel.id} className="text-gray-700">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            {rel.from === selectedTableData.id
                              ? `→ ${rel.to}`
                              : `← ${rel.from}`}
                          </span>
                          <span className="ml-2 text-gray-500">({rel.type})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    data-testid="createdatabase-clear-selection"
                    onClick={() => setSelectedTable(null)}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p className="mb-3">Click on a table to view detailed information.</p>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Total Tables:</span>
                        <span className="font-medium">{MOCK_TABLES.length}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Total Relationships:</span>
                        <span className="font-medium">{MOCK_RELATIONSHIPS.length}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Total Fields:</span>
                        <span className="font-medium">
                          {MOCK_TABLES.reduce((sum, t) => sum + t.fields.length, 0)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SQL Preview */}
        {showSQL && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              SQL Schema Preview
            </h2>
            <div data-testid="createdatabase-sql-output" className="space-y-4">
              {MOCK_TABLES.map((table) => (
                <div key={table.id} className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-bold text-sm text-gray-700 mb-2">
                    {table.name.toUpperCase()}
                  </h3>
                  <pre className="text-xs font-mono text-gray-800 overflow-x-auto">
                    {generateSQL(table)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
