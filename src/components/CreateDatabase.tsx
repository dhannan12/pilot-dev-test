/**
 * CreateDatabase — Database schema management interface for tourist platform
 *
 * Features: schema visualization, table definitions, field types, relationships, data modeling
 *
 * Ticket: SCRUM-1148 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Field {
  id: string
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
}

interface Table {
  id: string
  name: string
  description: string
  fields: Field[]
}

const mockTables: Table[] = [
  {
    id: '1',
    name: 'attractions',
    description: 'Tourist attractions and points of interest',
    fields: [
      { id: 'f1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f2', name: 'name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'f3', name: 'description', type: 'TEXT', nullable: true, primaryKey: false },
      { id: 'f4', name: 'category', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { id: 'f5', name: 'latitude', type: 'DECIMAL(10,8)', nullable: false, primaryKey: false },
      { id: 'f6', name: 'longitude', type: 'DECIMAL(11,8)', nullable: false, primaryKey: false },
      { id: 'f7', name: 'rating', type: 'DECIMAL(3,2)', nullable: true, primaryKey: false },
      { id: 'f8', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: '2',
    name: 'accommodations',
    description: 'Hotels, B&Bs, and vacation rentals',
    fields: [
      { id: 'f9', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f10', name: 'name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'f11', name: 'type', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { id: 'f12', name: 'address', type: 'TEXT', nullable: false, primaryKey: false },
      { id: 'f13', name: 'price_per_night', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
      { id: 'f14', name: 'capacity', type: 'INTEGER', nullable: false, primaryKey: false },
      { id: 'f15', name: 'amenities', type: 'JSONB', nullable: true, primaryKey: false },
      { id: 'f16', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: '3',
    name: 'restaurants',
    description: 'Dining establishments and cafes',
    fields: [
      { id: 'f17', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f18', name: 'name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'f19', name: 'cuisine_type', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { id: 'f20', name: 'price_range', type: 'VARCHAR(20)', nullable: false, primaryKey: false },
      { id: 'f21', name: 'phone', type: 'VARCHAR(20)', nullable: true, primaryKey: false },
      { id: 'f22', name: 'opening_hours', type: 'JSONB', nullable: true, primaryKey: false },
      { id: 'f23', name: 'rating', type: 'DECIMAL(3,2)', nullable: true, primaryKey: false },
      { id: 'f24', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: '4',
    name: 'events',
    description: 'Local events and festivals',
    fields: [
      { id: 'f25', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f26', name: 'title', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'f27', name: 'description', type: 'TEXT', nullable: true, primaryKey: false },
      { id: 'f28', name: 'start_date', type: 'TIMESTAMP', nullable: false, primaryKey: false },
      { id: 'f29', name: 'end_date', type: 'TIMESTAMP', nullable: false, primaryKey: false },
      { id: 'f30', name: 'location', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'f31', name: 'ticket_price', type: 'DECIMAL(10,2)', nullable: true, primaryKey: false },
      { id: 'f32', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: '5',
    name: 'reviews',
    description: 'User reviews and ratings',
    fields: [
      { id: 'f33', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f34', name: 'user_id', type: 'UUID', nullable: false, primaryKey: false },
      { id: 'f35', name: 'entity_type', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { id: 'f36', name: 'entity_id', type: 'UUID', nullable: false, primaryKey: false },
      { id: 'f37', name: 'rating', type: 'INTEGER', nullable: false, primaryKey: false },
      { id: 'f38', name: 'comment', type: 'TEXT', nullable: true, primaryKey: false },
      { id: 'f39', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
]

export default function CreateDatabase() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'visual'>('list')

  const currentTable = selectedTable
    ? mockTables.find((t) => t.id === selectedTable)
    : null

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Database Schema
          </h1>
          <p className="text-gray-600">
            West Ireland Tourist Platform - Database Architecture
          </p>
          <div className="mt-4 flex gap-3">
            <button
              data-testid="createdatabase-view-list"
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              List View
            </button>
            <button
              data-testid="createdatabase-view-visual"
              onClick={() => setViewMode('visual')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'visual'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Visual Diagram
            </button>
          </div>
        </div>

        {/* Schema Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-blue-600">
              {mockTables.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Tables</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-green-600">
              {mockTables.reduce((acc, t) => acc + t.fields.length, 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Fields</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-purple-600">PostgreSQL</div>
            <div className="text-sm text-gray-600 mt-1">Database Engine</div>
          </div>
        </div>

        {viewMode === 'list' ? (
          /* List View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tables List */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tables
              </h2>
              <div data-testid="createdatabase-list" className="space-y-3">
                {mockTables.map((table) => (
                  <div
                    key={table.id}
                    data-testid="createdatabase-item"
                    onClick={() => setSelectedTable(table.id)}
                    className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedTable === table.id
                        ? 'ring-2 ring-blue-500'
                        : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-mono font-semibold text-gray-900">
                          {table.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {table.description}
                        </p>
                        <div className="flex gap-3 mt-2 text-xs text-gray-500">
                          <span>{table.fields.length} fields</span>
                          <span>•</span>
                          <span>
                            {table.fields.filter((f) => f.primaryKey).length} PK
                          </span>
                        </div>
                      </div>
                      <button
                        data-testid="createdatabase-select"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Detail */}
            <div>
              {currentTable ? (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Table: {currentTable.name}
                  </h2>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-800 text-white px-4 py-3">
                      <h3 className="font-mono font-semibold">
                        {currentTable.name}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">
                        {currentTable.description}
                      </p>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {currentTable.fields.map((field) => (
                        <div
                          key={field.id}
                          className="px-4 py-3 hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {field.primaryKey && (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                  PK
                                </span>
                              )}
                              <span className="font-mono font-medium text-gray-900">
                                {field.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 font-mono">
                                {field.type}
                              </span>
                              {field.nullable ? (
                                <span className="text-xs text-gray-400">
                                  NULL
                                </span>
                              ) : (
                                <span className="text-xs text-red-600 font-medium">
                                  NOT NULL
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    data-testid="createdatabase-close"
                    onClick={() => setSelectedTable(null)}
                    className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Close Detail
                  </button>
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-gray-400 text-lg">
                    Select a table to view its schema
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Visual Diagram View */
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Entity Relationship Diagram
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTables.map((table) => (
                <div
                  key={table.id}
                  data-testid="createdatabase-card"
                  className="border-2 border-gray-300 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
                >
                  <div className="bg-gray-800 text-white px-4 py-3">
                    <h3 className="font-mono font-bold text-sm">
                      {table.name}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {table.fields.slice(0, 5).map((field) => (
                      <div key={field.id} className="px-4 py-2 bg-white">
                        <div className="flex items-center gap-2 text-xs">
                          {field.primaryKey && (
                            <span className="text-yellow-600 font-bold">
                              🔑
                            </span>
                          )}
                          <span className="font-mono text-gray-900">
                            {field.name}
                          </span>
                          <span className="text-gray-500">:</span>
                          <span className="text-gray-600">{field.type}</span>
                        </div>
                      </div>
                    ))}
                    {table.fields.length > 5 && (
                      <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center">
                        +{table.fields.length - 5} more fields
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                Relationships:
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• reviews.user_id → users.id (Foreign Key)</li>
                <li>
                  • reviews.entity_id → attractions/restaurants/accommodations
                  (Polymorphic)
                </li>
                <li>• All tables indexed on created_at for performance</li>
                <li>• JSONB fields for flexible schema extensions</li>
              </ul>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Schema Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              data-testid="createdatabase-export"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Export SQL
            </button>
            <button
              data-testid="createdatabase-migrate"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Run Migrations
            </button>
            <button
              data-testid="createdatabase-validate"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              Validate Schema
            </button>
            <button
              data-testid="createdatabase-reset"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
            >
              Reset Database
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
