/**
 * SetupDatabase — Database schema setup interface for health tracking
 *
 * Features: schema visualization, table creation, field management, relationship mapping, migration tracking
 *
 * Ticket: SCRUM-1124 | Branch: proto/SCRUM-1115
 */

import React, { useState } from 'react'

interface DatabaseTable {
  id: string
  name: string
  description: string
  fields: TableField[]
  status: 'pending' | 'created' | 'migrating' | 'ready'
  recordCount: number
}

interface TableField {
  id: string
  name: string
  type: string
  required: boolean
  description: string
}

const MOCK_TABLES: DatabaseTable[] = [
  {
    id: '1',
    name: 'health_metrics',
    description: 'Daily health tracking measurements',
    fields: [
      { id: 'f1', name: 'id', type: 'UUID', required: true, description: 'Primary key' },
      { id: 'f2', name: 'user_id', type: 'UUID', required: true, description: 'Foreign key to users' },
      { id: 'f3', name: 'date', type: 'DATE', required: true, description: 'Measurement date' },
      { id: 'f4', name: 'weight', type: 'DECIMAL', required: false, description: 'Weight in kg' },
      { id: 'f5', name: 'blood_pressure', type: 'VARCHAR', required: false, description: 'BP reading' },
      { id: 'f6', name: 'heart_rate', type: 'INTEGER', required: false, description: 'BPM' },
      { id: 'f7', name: 'created_at', type: 'TIMESTAMP', required: true, description: 'Record creation time' }
    ],
    status: 'ready',
    recordCount: 1247
  },
  {
    id: '2',
    name: 'users',
    description: 'User accounts and profiles',
    fields: [
      { id: 'f8', name: 'id', type: 'UUID', required: true, description: 'Primary key' },
      { id: 'f9', name: 'email', type: 'VARCHAR', required: true, description: 'User email' },
      { id: 'f10', name: 'name', type: 'VARCHAR', required: true, description: 'Full name' },
      { id: 'f11', name: 'birth_date', type: 'DATE', required: false, description: 'Date of birth' },
      { id: 'f12', name: 'created_at', type: 'TIMESTAMP', required: true, description: 'Account creation' }
    ],
    status: 'ready',
    recordCount: 342
  },
  {
    id: '3',
    name: 'activity_logs',
    description: 'Physical activity and exercise tracking',
    fields: [
      { id: 'f13', name: 'id', type: 'UUID', required: true, description: 'Primary key' },
      { id: 'f14', name: 'user_id', type: 'UUID', required: true, description: 'Foreign key to users' },
      { id: 'f15', name: 'activity_type', type: 'VARCHAR', required: true, description: 'Exercise type' },
      { id: 'f16', name: 'duration_minutes', type: 'INTEGER', required: true, description: 'Duration' },
      { id: 'f17', name: 'calories_burned', type: 'INTEGER', required: false, description: 'Estimated calories' },
      { id: 'f18', name: 'activity_date', type: 'DATE', required: true, description: 'Activity date' }
    ],
    status: 'created',
    recordCount: 856
  },
  {
    id: '4',
    name: 'medications',
    description: 'Medication tracking and reminders',
    fields: [
      { id: 'f19', name: 'id', type: 'UUID', required: true, description: 'Primary key' },
      { id: 'f20', name: 'user_id', type: 'UUID', required: true, description: 'Foreign key to users' },
      { id: 'f21', name: 'medication_name', type: 'VARCHAR', required: true, description: 'Medicine name' },
      { id: 'f22', name: 'dosage', type: 'VARCHAR', required: true, description: 'Dosage amount' },
      { id: 'f23', name: 'frequency', type: 'VARCHAR', required: true, description: 'Dosage frequency' },
      { id: 'f24', name: 'start_date', type: 'DATE', required: true, description: 'Start date' }
    ],
    status: 'migrating',
    recordCount: 0
  },
  {
    id: '5',
    name: 'appointments',
    description: 'Medical appointments and consultations',
    fields: [
      { id: 'f25', name: 'id', type: 'UUID', required: true, description: 'Primary key' },
      { id: 'f26', name: 'user_id', type: 'UUID', required: true, description: 'Foreign key to users' },
      { id: 'f27', name: 'provider_name', type: 'VARCHAR', required: true, description: 'Doctor/clinic name' },
      { id: 'f28', name: 'appointment_date', type: 'TIMESTAMP', required: true, description: 'Appointment time' },
      { id: 'f29', name: 'notes', type: 'TEXT', required: false, description: 'Appointment notes' },
      { id: 'f30', name: 'status', type: 'VARCHAR', required: true, description: 'Appointment status' }
    ],
    status: 'pending',
    recordCount: 0
  },
  {
    id: '6',
    name: 'sleep_tracking',
    description: 'Sleep quality and duration monitoring',
    fields: [
      { id: 'f31', name: 'id', type: 'UUID', required: true, description: 'Primary key' },
      { id: 'f32', name: 'user_id', type: 'UUID', required: true, description: 'Foreign key to users' },
      { id: 'f33', name: 'sleep_date', type: 'DATE', required: true, description: 'Sleep date' },
      { id: 'f34', name: 'hours_slept', type: 'DECIMAL', required: true, description: 'Total sleep hours' },
      { id: 'f35', name: 'quality_rating', type: 'INTEGER', required: false, description: 'Quality score 1-10' }
    ],
    status: 'ready',
    recordCount: 2103
  }
]

export default function SetupDatabase() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showFields, setShowFields] = useState<boolean>(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'created':
        return 'bg-blue-100 text-blue-800'
      case 'migrating':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const selectedTableData = MOCK_TABLES.find(t => t.id === selectedTable)

  return (
    <div data-testid="setupdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Database Schema Setup
          </h1>
          <p className="text-gray-600">
            Health tracking database configuration and management
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Database Tables
              </h2>
              <ul data-testid="setupdatabase-list" className="space-y-2">
                {MOCK_TABLES.map((table) => (
                  <li
                    key={table.id}
                    data-testid="setupdatabase-item"
                    onClick={() => {
                      setSelectedTable(table.id)
                      setShowFields(false)
                    }}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedTable === table.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">
                        {table.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          table.status
                        )}`}
                      >
                        {table.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {table.recordCount.toLocaleString()} records
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  data-testid="setupdatabase-create-table"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create New Table
                </button>
              </div>
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2">
            {selectedTableData ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                      {selectedTableData.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedTableData.description}
                    </p>
                  </div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${getStatusColor(
                      selectedTableData.status
                    )}`}
                  >
                    {selectedTableData.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Fields</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedTableData.fields.length}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Records</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedTableData.recordCount.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Required</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {
                        selectedTableData.fields.filter((f) => f.required)
                          .length
                      }
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <button
                    data-testid="setupdatabase-toggle-fields"
                    onClick={() => setShowFields(!showFields)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {showFields ? '▼' : '▶'} {showFields ? 'Hide' : 'Show'}{' '}
                    Field Details ({selectedTableData.fields.length})
                  </button>
                </div>

                {showFields && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Field Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Required
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedTableData.fields.map((field) => (
                          <tr key={field.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              {field.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                                {field.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {field.required ? (
                                <span className="text-red-600 font-medium">
                                  ✓ Yes
                                </span>
                              ) : (
                                <span className="text-gray-400">No</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {field.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    data-testid="setupdatabase-migrate"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Run Migration
                  </button>
                  <button
                    data-testid="setupdatabase-export"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Export Schema
                  </button>
                  <button
                    data-testid="setupdatabase-delete"
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium"
                  >
                    Delete Table
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
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
                      d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 4v16M15 4v16"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Table Selected
                </h3>
                <p className="text-gray-600">
                  Select a table from the list to view its schema details
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">Total Tables</div>
            <div className="text-3xl font-bold text-gray-900">
              {MOCK_TABLES.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">Ready</div>
            <div className="text-3xl font-bold text-green-600">
              {MOCK_TABLES.filter((t) => t.status === 'ready').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">In Progress</div>
            <div className="text-3xl font-bold text-yellow-600">
              {
                MOCK_TABLES.filter(
                  (t) => t.status === 'migrating' || t.status === 'created'
                ).length
              }
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">Total Records</div>
            <div className="text-3xl font-bold text-gray-900">
              {MOCK_TABLES.reduce((sum, t) => sum + t.recordCount, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
