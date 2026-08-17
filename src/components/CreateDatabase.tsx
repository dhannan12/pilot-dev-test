/**
 * CreateDatabase — Database schema visualization with 5 normalized tables
 *
 * Features: Interactive schema viewer, foreign key relationships, index visualization, status enum displays, table structure details
 *
 * Ticket: SCRUM-1013 | Branch: proto/SCRUM-1013
 */

import { useState } from 'react'

interface Column {
  name: string
  type: string
  nullable: boolean
  isPrimaryKey?: boolean
  isForeignKey?: boolean
  references?: string
}

interface Index {
  name: string
  columns: string[]
  type: 'primary' | 'foreign_key' | 'index'
}

interface Table {
  id: string
  name: string
  description: string
  columns: Column[]
  indexes: Index[]
}

const mockTables: Table[] = [
  {
    id: 'employees',
    name: 'employees',
    description: 'Employee records with authentication reference',
    columns: [
      { name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true },
      { name: 'user_auth_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: 'user_auth(id)' },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false },
      { name: 'department', type: 'VARCHAR(100)', nullable: true },
      { name: 'position', type: 'VARCHAR(100)', nullable: true },
      { name: 'hire_date', type: 'DATE', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false }
    ],
    indexes: [
      { name: 'pk_employees', columns: ['id'], type: 'primary' },
      { name: 'fk_employees_user_auth', columns: ['user_auth_id'], type: 'foreign_key' },
      { name: 'idx_employees_email', columns: ['email'], type: 'index' }
    ]
  },
  {
    id: 'vacancies',
    name: 'vacancies',
    description: 'Job vacancy postings with posting manager reference',
    columns: [
      { name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true },
      { name: 'posting_manager_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: 'employees(id)' },
      { name: 'title', type: 'VARCHAR(200)', nullable: false },
      { name: 'description', type: 'TEXT', nullable: false },
      { name: 'department', type: 'VARCHAR(100)', nullable: false },
      { name: 'location', type: 'VARCHAR(200)', nullable: true },
      { name: 'status', type: 'ENUM(\'open\', \'closed\', \'filled\')', nullable: false },
      { name: 'posted_date', type: 'DATE', nullable: false },
      { name: 'close_date', type: 'DATE', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false }
    ],
    indexes: [
      { name: 'pk_vacancies', columns: ['id'], type: 'primary' },
      { name: 'fk_vacancies_posting_manager', columns: ['posting_manager_id'], type: 'foreign_key' },
      { name: 'idx_vacancies_status', columns: ['status'], type: 'index' }
    ]
  },
  {
    id: 'expressions_of_interest',
    name: 'expressions_of_interest',
    description: 'Employee applications for vacancies',
    columns: [
      { name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true },
      { name: 'employee_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: 'employees(id)' },
      { name: 'vacancy_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: 'vacancies(id)' },
      { name: 'cover_letter', type: 'TEXT', nullable: true },
      { name: 'status', type: 'ENUM(\'submitted\', \'under_review\', \'shortlisted\', \'rejected\', \'accepted\')', nullable: false },
      { name: 'submitted_date', type: 'TIMESTAMP', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false }
    ],
    indexes: [
      { name: 'pk_expressions_of_interest', columns: ['id'], type: 'primary' },
      { name: 'fk_eoi_employee', columns: ['employee_id'], type: 'foreign_key' },
      { name: 'fk_eoi_vacancy', columns: ['vacancy_id'], type: 'foreign_key' },
      { name: 'idx_eoi_status', columns: ['status'], type: 'index' }
    ]
  },
  {
    id: 'application_status_tracking',
    name: 'application_status_tracking',
    description: 'Status change history for expressions of interest',
    columns: [
      { name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true },
      { name: 'expression_of_interest_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: 'expressions_of_interest(id)' },
      { name: 'previous_status', type: 'VARCHAR(50)', nullable: true },
      { name: 'new_status', type: 'VARCHAR(50)', nullable: false },
      { name: 'changed_by_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: 'employees(id)' },
      { name: 'notes', type: 'TEXT', nullable: true },
      { name: 'changed_at', type: 'TIMESTAMP', nullable: false }
    ],
    indexes: [
      { name: 'pk_application_status_tracking', columns: ['id'], type: 'primary' },
      { name: 'fk_ast_expression_of_interest', columns: ['expression_of_interest_id'], type: 'foreign_key' },
      { name: 'fk_ast_changed_by', columns: ['changed_by_id'], type: 'foreign_key' },
      { name: 'idx_ast_changed_at', columns: ['changed_at'], type: 'index' }
    ]
  },
  {
    id: 'notifications',
    name: 'notifications',
    description: 'Employee notifications for application updates',
    columns: [
      { name: 'id', type: 'SERIAL', nullable: false, isPrimaryKey: true },
      { name: 'employee_id', type: 'INTEGER', nullable: false, isForeignKey: true, references: 'employees(id)' },
      { name: 'title', type: 'VARCHAR(200)', nullable: false },
      { name: 'message', type: 'TEXT', nullable: false },
      { name: 'type', type: 'ENUM(\'info\', \'success\', \'warning\', \'error\')', nullable: false },
      { name: 'is_read', type: 'BOOLEAN', nullable: false },
      { name: 'related_eoi_id', type: 'INTEGER', nullable: true, isForeignKey: true, references: 'expressions_of_interest(id)' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ],
    indexes: [
      { name: 'pk_notifications', columns: ['id'], type: 'primary' },
      { name: 'fk_notifications_employee', columns: ['employee_id'], type: 'foreign_key' },
      { name: 'fk_notifications_eoi', columns: ['related_eoi_id'], type: 'foreign_key' },
      { name: 'idx_notifications_is_read', columns: ['is_read'], type: 'index' },
      { name: 'idx_notifications_type', columns: ['type'], type: 'index' }
    ]
  }
]

export default function CreateDatabase() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showIndexes, setShowIndexes] = useState(true)

  const selectedTableData = selectedTable 
    ? mockTables.find(t => t.id === selectedTable) 
    : null

  return (
    <div data-testid="create-database" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Database Schema Viewer
          </h1>
          <p className="text-gray-600">
            5 normalized tables with foreign key relationships and indexed columns
          </p>
        </header>

        {/* Controls */}
        <div className="mb-6 flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              data-testid="create-database-show-indexes"
              checked={showIndexes}
              onChange={(e) => setShowIndexes(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">Show Indexes</span>
          </label>
          <button
            data-testid="create-database-clear-selection"
            onClick={() => setSelectedTable(null)}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Clear Selection
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Tables</h2>
              <ul data-testid="create-database-table-list" className="space-y-2">
                {mockTables.map((table) => (
                  <li key={table.id}>
                    <button
                      data-testid={`create-database-table-${table.id}`}
                      onClick={() => setSelectedTable(table.id)}
                      className={`w-full text-left px-4 py-3 rounded transition-colors ${
                        selectedTable === table.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium">{table.name}</div>
                      <div className={`text-sm ${
                        selectedTable === table.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {table.columns.length} columns
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2">
            {selectedTableData ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedTableData.name}
                  </h2>
                  <p className="text-gray-600">{selectedTableData.description}</p>
                </div>

                {/* Columns */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Columns</h3>
                  <div data-testid="create-database-columns" className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Name</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Type</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Nullable</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Constraints</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTableData.columns.map((col, idx) => (
                          <tr 
                            key={idx} 
                            data-testid="create-database-column-row"
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-2 px-3 font-mono text-gray-900">{col.name}</td>
                            <td className="py-2 px-3 text-gray-600">{col.type}</td>
                            <td className="py-2 px-3">
                              <span className={`px-2 py-1 rounded text-xs ${
                                col.nullable 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {col.nullable ? 'NULL' : 'NOT NULL'}
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex gap-1 flex-wrap">
                                {col.isPrimaryKey && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                    PK
                                  </span>
                                )}
                                {col.isForeignKey && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                                    FK → {col.references}
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

                {/* Indexes */}
                {showIndexes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Indexes</h3>
                    <ul data-testid="create-database-indexes" className="space-y-2">
                      {selectedTableData.indexes.map((index, idx) => (
                        <li 
                          key={idx}
                          data-testid="create-database-index-item"
                          className="bg-gray-50 p-3 rounded border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-mono text-sm text-gray-900">{index.name}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              index.type === 'primary' 
                                ? 'bg-blue-100 text-blue-800'
                                : index.type === 'foreign_key'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {index.type.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Columns: {index.columns.join(', ')}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <p className="text-gray-600">Select a table to view its schema</p>
              </div>
            )}
          </div>
        </div>

        {/* Schema Summary */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Schema Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div data-testid="create-database-summary-tables" className="bg-blue-50 p-4 rounded">
              <div className="text-2xl font-bold text-blue-900">{mockTables.length}</div>
              <div className="text-sm text-blue-700">Total Tables</div>
            </div>
            <div data-testid="create-database-summary-relationships" className="bg-purple-50 p-4 rounded">
              <div className="text-2xl font-bold text-purple-900">
                {mockTables.reduce((acc, t) => acc + t.columns.filter(c => c.isForeignKey).length, 0)}
              </div>
              <div className="text-sm text-purple-700">Foreign Key Relationships</div>
            </div>
            <div data-testid="create-database-summary-indexes" className="bg-green-50 p-4 rounded">
              <div className="text-2xl font-bold text-green-900">
                {mockTables.reduce((acc, t) => acc + t.indexes.length, 0)}
              </div>
              <div className="text-sm text-green-700">Total Indexes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
