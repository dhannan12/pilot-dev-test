/**
 * CreateDatabase — Database schema manager for volunteer management system
 *
 * Features: volunteers table, shifts table, attendance tracking, reports schema, schema visualization
 *
 * Ticket: SCRUM-935 | Branch: proto/SCRUM-926
 */

import { useState } from 'react'

interface TableColumn {
  name: string
  type: string
  nullable: boolean
  primary?: boolean
  foreign?: string
}

interface DatabaseTable {
  id: string
  name: string
  description: string
  columns: TableColumn[]
  recordCount: number
}

const MOCK_TABLES: DatabaseTable[] = [
  {
    id: 'volunteers',
    name: 'volunteers',
    description: 'Volunteer contact and profile information',
    recordCount: 247,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false },
      { name: 'phone', type: 'VARCHAR(20)', nullable: true },
      { name: 'status', type: 'VARCHAR(20)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    id: 'shifts',
    name: 'shifts',
    description: 'Volunteer shift scheduling and assignments',
    recordCount: 523,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'volunteer_id', type: 'INTEGER', nullable: false, foreign: 'volunteers.id' },
      { name: 'shift_date', type: 'DATE', nullable: false },
      { name: 'start_time', type: 'TIME', nullable: false },
      { name: 'end_time', type: 'TIME', nullable: false },
      { name: 'location', type: 'VARCHAR(200)', nullable: false },
      { name: 'role', type: 'VARCHAR(100)', nullable: false },
      { name: 'status', type: 'VARCHAR(20)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    id: 'attendance',
    name: 'attendance',
    description: 'Attendance records for volunteer shifts',
    recordCount: 489,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'shift_id', type: 'INTEGER', nullable: false, foreign: 'shifts.id' },
      { name: 'volunteer_id', type: 'INTEGER', nullable: false, foreign: 'volunteers.id' },
      { name: 'check_in_time', type: 'TIMESTAMP', nullable: true },
      { name: 'check_out_time', type: 'TIMESTAMP', nullable: true },
      { name: 'hours_worked', type: 'DECIMAL(5,2)', nullable: true },
      { name: 'notes', type: 'TEXT', nullable: true },
      { name: 'status', type: 'VARCHAR(20)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    id: 'reports',
    name: 'reports',
    description: 'Generated reports and analytics',
    recordCount: 142,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'report_type', type: 'VARCHAR(50)', nullable: false },
      { name: 'title', type: 'VARCHAR(200)', nullable: false },
      { name: 'generated_by', type: 'INTEGER', nullable: false },
      { name: 'generated_at', type: 'TIMESTAMP', nullable: false },
      { name: 'start_date', type: 'DATE', nullable: true },
      { name: 'end_date', type: 'DATE', nullable: true },
      { name: 'data', type: 'JSONB', nullable: true },
      { name: 'status', type: 'VARCHAR(20)', nullable: false }
    ]
  },
  {
    id: 'audit_log',
    name: 'audit_log',
    description: 'System audit trail for all database operations',
    recordCount: 1856,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'table_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'record_id', type: 'INTEGER', nullable: false },
      { name: 'action', type: 'VARCHAR(20)', nullable: false },
      { name: 'user_id', type: 'INTEGER', nullable: true },
      { name: 'changes', type: 'JSONB', nullable: true },
      { name: 'timestamp', type: 'TIMESTAMP', nullable: false }
    ]
  }
]

export default function CreateDatabase() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showSQL, setShowSQL] = useState(false)

  const generateCreateTableSQL = (table: DatabaseTable): string => {
    const columnDefs = table.columns.map(col => {
      let def = `  ${col.name} ${col.type}`
      if (col.primary) def += ' PRIMARY KEY'
      if (!col.nullable && !col.primary) def += ' NOT NULL'
      return def
    }).join(',\n')

    const foreignKeys = table.columns
      .filter(col => col.foreign)
      .map(col => `  FOREIGN KEY (${col.name}) REFERENCES ${col.foreign}`)
      .join(',\n')

    return `CREATE TABLE ${table.name} (\n${columnDefs}${foreignKeys ? ',\n' + foreignKeys : ''}\n);`
  }

  const selectedTableData = MOCK_TABLES.find(t => t.id === selectedTable)

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Schema Manager</h1>
          <p className="text-gray-600">
            Volunteer Management System - Schema Overview
          </p>
          <div className="mt-4 flex gap-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Total Tables</div>
              <div className="text-2xl font-bold text-blue-900">{MOCK_TABLES.length}</div>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg">
              <div className="text-sm text-green-600 font-medium">Total Records</div>
              <div className="text-2xl font-bold text-green-900">
                {MOCK_TABLES.reduce((sum, t) => sum + t.recordCount, 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-purple-50 px-4 py-2 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">Foreign Keys</div>
              <div className="text-2xl font-bold text-purple-900">
                {MOCK_TABLES.reduce((sum, t) => 
                  sum + t.columns.filter(c => c.foreign).length, 0
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-4 items-center">
            <button
              data-testid="createdatabase-refresh"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Schema
            </button>
            <button
              data-testid="createdatabase-export"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Export SQL
            </button>
            <button
              data-testid="createdatabase-migrate"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Run Migrations
            </button>
            <button
              data-testid="createdatabase-toggle-sql"
              onClick={() => setShowSQL(!showSQL)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                showSQL 
                  ? 'bg-orange-600 text-white hover:bg-orange-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {showSQL ? 'Hide' : 'Show'} SQL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Database Tables</h2>
              <ul data-testid="createdatabase-list" className="space-y-2">
                {MOCK_TABLES.map((table) => (
                  <li
                    key={table.id}
                    data-testid="createdatabase-item"
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTable === table.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTable(table.id)}
                  >
                    <div className="font-semibold text-gray-900">{table.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{table.description}</div>
                    <div className="flex gap-3 mt-2 text-xs">
                      <span className="text-blue-600 font-medium">
                        {table.columns.length} columns
                      </span>
                      <span className="text-green-600 font-medium">
                        {table.recordCount} records
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2">
            {selectedTableData ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTableData.name}</h2>
                    <p className="text-gray-600 mt-1">{selectedTableData.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Records</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedTableData.recordCount.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Columns Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-4 py-2 border-b-2 border-gray-200 font-semibold text-gray-700">
                          Column
                        </th>
                        <th className="text-left px-4 py-2 border-b-2 border-gray-200 font-semibold text-gray-700">
                          Type
                        </th>
                        <th className="text-left px-4 py-2 border-b-2 border-gray-200 font-semibold text-gray-700">
                          Constraints
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTableData.columns.map((column) => (
                        <tr key={column.name} className="hover:bg-gray-50">
                          <td className="px-4 py-3 border-b border-gray-200">
                            <span className="font-mono text-sm font-medium text-gray-900">
                              {column.name}
                            </span>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200">
                            <span className="font-mono text-sm text-gray-700">
                              {column.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200">
                            <div className="flex gap-2 flex-wrap">
                              {column.primary && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                                  PRIMARY KEY
                                </span>
                              )}
                              {!column.nullable && !column.primary && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                                  NOT NULL
                                </span>
                              )}
                              {column.nullable && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                                  NULLABLE
                                </span>
                              )}
                              {column.foreign && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                                  FK → {column.foreign}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* SQL Code */}
                {showSQL && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">CREATE TABLE Statement</h3>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                      <pre className="font-mono text-sm">
                        {generateCreateTableSQL(selectedTableData)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 text-lg">
                  Select a table from the list to view its schema
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
