/**
 * CreateDatabase — Database schema viewer and management for tourist platform
 *
 * Features: schema visualization, table structure display, column details, data type overview, relationship mapping
 *
 * Ticket: SCRUM-1148 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Column {
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  foreignKey?: string
}

interface DatabaseTable {
  id: string
  name: string
  description: string
  columns: Column[]
  recordCount: number
}

const MOCK_TABLES: DatabaseTable[] = [
  {
    id: 'tbl-1',
    name: 'tourists',
    description: 'Stores tourist visitor information and profiles',
    recordCount: 1250,
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'country', type: 'VARCHAR(100)', nullable: true, primaryKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: 'tbl-2',
    name: 'accommodations',
    description: 'Hotels, B&Bs, and lodging options available in the area',
    recordCount: 87,
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'type', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { name: 'price_per_night', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
      { name: 'capacity', type: 'INTEGER', nullable: false, primaryKey: false },
      { name: 'address', type: 'TEXT', nullable: false, primaryKey: false },
    ],
  },
  {
    id: 'tbl-3',
    name: 'bookings',
    description: 'Tourist booking records for accommodations and activities',
    recordCount: 3420,
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'tourist_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'tourists.id' },
      { name: 'accommodation_id', type: 'UUID', nullable: true, primaryKey: false, foreignKey: 'accommodations.id' },
      { name: 'check_in', type: 'DATE', nullable: false, primaryKey: false },
      { name: 'check_out', type: 'DATE', nullable: false, primaryKey: false },
      { name: 'total_price', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
      { name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
    ],
  },
  {
    id: 'tbl-4',
    name: 'activities',
    description: 'Tours, events, and activities available for tourists',
    recordCount: 156,
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'title', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'description', type: 'TEXT', nullable: false, primaryKey: false },
      { name: 'category', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'duration_hours', type: 'DECIMAL(4,2)', nullable: false, primaryKey: false },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
    ],
  },
  {
    id: 'tbl-5',
    name: 'reviews',
    description: 'Tourist reviews and ratings for accommodations and activities',
    recordCount: 2890,
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'tourist_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'tourists.id' },
      { name: 'entity_type', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { name: 'entity_id', type: 'UUID', nullable: false, primaryKey: false },
      { name: 'rating', type: 'INTEGER', nullable: false, primaryKey: false },
      { name: 'comment', type: 'TEXT', nullable: true, primaryKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: 'tbl-6',
    name: 'locations',
    description: 'Points of interest and geographic locations in West Ireland',
    recordCount: 234,
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'latitude', type: 'DECIMAL(10,8)', nullable: false, primaryKey: false },
      { name: 'longitude', type: 'DECIMAL(11,8)', nullable: false, primaryKey: false },
      { name: 'category', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'description', type: 'TEXT', nullable: true, primaryKey: false },
    ],
  },
]

export default function CreateDatabase() {
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTables = MOCK_TABLES.filter(
    (table) =>
      table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalRecords = MOCK_TABLES.reduce((sum, table) => sum + table.recordCount, 0)

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tourist Platform Database Schema
          </h1>
          <p className="text-gray-600">
            Database structure overview for West Ireland tourist platform
          </p>
          <div className="mt-4 flex gap-4">
            <div className="bg-blue-100 px-4 py-2 rounded-lg">
              <span className="text-sm text-blue-800 font-semibold">
                {MOCK_TABLES.length} Tables
              </span>
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-lg">
              <span className="text-sm text-green-800 font-semibold">
                {totalRecords.toLocaleString()} Total Records
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            data-testid="createdatabase-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tables..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tables List */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Tables</h2>
            <div data-testid="createdatabase-list" className="space-y-3">
              {filteredTables.map((table) => (
                <div
                  key={table.id}
                  data-testid="createdatabase-item"
                  className={`p-4 bg-white rounded-lg shadow cursor-pointer transition-all hover:shadow-md ${
                    selectedTable?.id === table.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedTable(table)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {table.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{table.description}</p>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>{table.columns.length} columns</span>
                        <span>•</span>
                        <span>{table.recordCount.toLocaleString()} records</span>
                      </div>
                    </div>
                    <button
                      data-testid="createdatabase-view"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedTable(table)
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schema Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Schema Details</h2>
            {selectedTable ? (
              <div data-testid="createdatabase-details" className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedTable.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{selectedTable.description}</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {selectedTable.columns.length} columns
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {selectedTable.recordCount.toLocaleString()} records
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Columns</h4>
                  <div className="space-y-3">
                    {selectedTable.columns.map((column, idx) => (
                      <div
                        key={idx}
                        data-testid="createdatabase-column"
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-mono text-sm font-semibold text-gray-900">
                            {column.name}
                          </span>
                          <div className="flex gap-1">
                            {column.primaryKey && (
                              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                                PK
                              </span>
                            )}
                            {column.foreignKey && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                                FK
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          <span className="font-mono">{column.type}</span>
                          {!column.nullable && (
                            <span className="ml-2 text-red-600 font-semibold">NOT NULL</span>
                          )}
                        </div>
                        {column.foreignKey && (
                          <div className="text-xs text-purple-600 mt-1">
                            → References {column.foreignKey}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    data-testid="createdatabase-export"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Export Schema
                  </button>
                  <button
                    data-testid="createdatabase-close"
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => setSelectedTable(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="text-gray-400 mb-3">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                </div>
                <p className="text-gray-600">Select a table to view its schema details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
