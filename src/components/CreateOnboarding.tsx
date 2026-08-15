/**
 * CreateOnboarding — Database schema viewer and table structure manager for onboarding system
 *
 * Features: schema visualization, table structure display, field definitions, relationship mapping, data type reference
 *
 * Ticket: SCRUM-889 | Branch: proto/SCRUM-879
 */

import React, { useState } from 'react'

interface TableField {
  id: string
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  foreignKey?: string
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
    name: 'employees',
    description: 'Core employee information and profile data',
    createdAt: '2026-08-01',
    relationships: ['onboarding_checklists', 'documents'],
    fields: [
      { id: 'e1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'e2', name: 'first_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { id: 'e3', name: 'last_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { id: 'e4', name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'e5', name: 'department_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'departments(id)' },
      { id: 'e6', name: 'hire_date', type: 'DATE', nullable: false, primaryKey: false },
      { id: 'e7', name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false, defaultValue: 'active' },
      { id: 'e8', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, defaultValue: 'NOW()' }
    ]
  },
  {
    id: '2',
    name: 'onboarding_checklists',
    description: 'Onboarding task lists and completion tracking',
    createdAt: '2026-08-01',
    relationships: ['employees', 'checklist_items'],
    fields: [
      { id: 'c1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'c2', name: 'employee_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'employees(id)' },
      { id: 'c3', name: 'title', type: 'VARCHAR(200)', nullable: false, primaryKey: false },
      { id: 'c4', name: 'description', type: 'TEXT', nullable: true, primaryKey: false },
      { id: 'c5', name: 'due_date', type: 'DATE', nullable: false, primaryKey: false },
      { id: 'c6', name: 'completed', type: 'BOOLEAN', nullable: false, primaryKey: false, defaultValue: 'false' },
      { id: 'c7', name: 'category', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { id: 'c8', name: 'updated_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, defaultValue: 'NOW()' }
    ]
  },
  {
    id: '3',
    name: 'departments',
    description: 'Organizational department structure and hierarchy',
    createdAt: '2026-08-01',
    relationships: ['employees', 'managers'],
    fields: [
      { id: 'd1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'd2', name: 'name', type: 'VARCHAR(150)', nullable: false, primaryKey: false },
      { id: 'd3', name: 'code', type: 'VARCHAR(20)', nullable: false, primaryKey: false },
      { id: 'd4', name: 'manager_id', type: 'UUID', nullable: true, primaryKey: false, foreignKey: 'employees(id)' },
      { id: 'd5', name: 'budget', type: 'DECIMAL(12,2)', nullable: true, primaryKey: false },
      { id: 'd6', name: 'active', type: 'BOOLEAN', nullable: false, primaryKey: false, defaultValue: 'true' },
      { id: 'd7', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, defaultValue: 'NOW()' }
    ]
  },
  {
    id: '4',
    name: 'documents',
    description: 'Uploaded documents and compliance files',
    createdAt: '2026-08-02',
    relationships: ['employees', 'document_types'],
    fields: [
      { id: 'doc1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'doc2', name: 'employee_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'employees(id)' },
      { id: 'doc3', name: 'file_name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'doc4', name: 'file_path', type: 'VARCHAR(500)', nullable: false, primaryKey: false },
      { id: 'doc5', name: 'file_type', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { id: 'doc6', name: 'file_size', type: 'INTEGER', nullable: false, primaryKey: false },
      { id: 'doc7', name: 'verified', type: 'BOOLEAN', nullable: false, primaryKey: false, defaultValue: 'false' },
      { id: 'doc8', name: 'uploaded_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, defaultValue: 'NOW()' }
    ]
  },
  {
    id: '5',
    name: 'training_modules',
    description: 'Training courses and completion records',
    createdAt: '2026-08-02',
    relationships: ['employees', 'training_completions'],
    fields: [
      { id: 't1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 't2', name: 'title', type: 'VARCHAR(200)', nullable: false, primaryKey: false },
      { id: 't3', name: 'description', type: 'TEXT', nullable: true, primaryKey: false },
      { id: 't4', name: 'duration_minutes', type: 'INTEGER', nullable: false, primaryKey: false },
      { id: 't5', name: 'required', type: 'BOOLEAN', nullable: false, primaryKey: false, defaultValue: 'true' },
      { id: 't6', name: 'passing_score', type: 'INTEGER', nullable: false, primaryKey: false, defaultValue: '80' },
      { id: 't7', name: 'active', type: 'BOOLEAN', nullable: false, primaryKey: false, defaultValue: 'true' },
      { id: 't8', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, defaultValue: 'NOW()' }
    ]
  },
  {
    id: '6',
    name: 'approvals',
    description: 'Manager approval workflow and status tracking',
    createdAt: '2026-08-03',
    relationships: ['employees', 'managers'],
    fields: [
      { id: 'a1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'a2', name: 'employee_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'employees(id)' },
      { id: 'a3', name: 'approver_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'employees(id)' },
      { id: 'a4', name: 'approval_type', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { id: 'a5', name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false, defaultValue: 'pending' },
      { id: 'a6', name: 'comments', type: 'TEXT', nullable: true, primaryKey: false },
      { id: 'a7', name: 'approved_at', type: 'TIMESTAMP', nullable: true, primaryKey: false },
      { id: 'a8', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, defaultValue: 'NOW()' }
    ]
  }
]

export default function CreateOnboarding() {
  const [tables] = useState<DatabaseTable[]>(MOCK_TABLES)
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(tables[0])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFieldBadgeColor = (field: TableField) => {
    if (field.primaryKey) return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    if (field.foreignKey) return 'bg-purple-100 text-purple-800 border-purple-300'
    if (!field.nullable) return 'bg-blue-100 text-blue-800 border-blue-300'
    return 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const getFieldBadgeLabel = (field: TableField) => {
    if (field.primaryKey) return 'PK'
    if (field.foreignKey) return 'FK'
    if (!field.nullable) return 'NOT NULL'
    return 'NULL'
  }

  return (
    <div data-testid="createonboarding" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Onboarding Database Schema
          </h1>
          <p className="text-gray-600 mb-4">
            Database structure and table definitions for the employee onboarding system
          </p>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              data-testid="createonboarding-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tables..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-indigo-900">{tables.length}</div>
              <div className="text-sm text-indigo-700">Total Tables</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-900">
                {tables.reduce((sum, t) => sum + t.fields.length, 0)}
              </div>
              <div className="text-sm text-green-700">Total Fields</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-900">
                {tables.reduce((sum, t) => sum + t.relationships.length, 0)}
              </div>
              <div className="text-sm text-purple-700">Relationships</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tables</h2>
              <div data-testid="createonboarding-list" className="space-y-2">
                {filteredTables.map(table => (
                  <button
                    key={table.id}
                    data-testid="createonboarding-item"
                    onClick={() => setSelectedTable(table)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedTable?.id === table.id
                        ? 'bg-indigo-100 border-2 border-indigo-500'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{table.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{table.fields.length} fields</div>
                  </button>
                ))}
              </div>

              {filteredTables.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No tables found
                </div>
              )}
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2">
            {selectedTable ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTable.name}</h2>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{selectedTable.description}</p>
                  <div className="text-sm text-gray-500">
                    Created: {new Date(selectedTable.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                {/* Relationships */}
                {selectedTable.relationships.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Relationships</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTable.relationships.map((rel, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium"
                        >
                          {rel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fields Table */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Fields</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b-2 border-gray-200">
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Field Name</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Data Type</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Constraints</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTable.fields.map((field, idx) => (
                          <tr
                            key={field.id}
                            className={`border-b border-gray-200 ${
                              idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm text-gray-900">{field.name}</span>
                                {field.primaryKey && (
                                  <span className="text-yellow-600" title="Primary Key">🔑</span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-mono text-sm text-gray-700">{field.type}</span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                <span className={`px-2 py-1 rounded text-xs font-medium border ${
                                  getFieldBadgeColor(field)
                                }`}>
                                  {getFieldBadgeLabel(field)}
                                </span>
                                {field.foreignKey && (
                                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs border border-purple-200">
                                    → {field.foreignKey}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {field.defaultValue ? (
                                <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                  {field.defaultValue}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    data-testid="createonboarding-export"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Export Schema
                  </button>
                  <button
                    data-testid="createonboarding-generate"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Generate SQL
                  </button>
                  <button
                    data-testid="createonboarding-edit"
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Edit Table
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">Select a table to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
