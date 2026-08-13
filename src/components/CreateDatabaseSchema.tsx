/**
 * CreateDatabaseSchema — Database schema designer and viewer for TaskApp
 *
 * Features: table definitions, field management, relationship visualization, SQL preview, schema validation
 *
 * Ticket: SCRUM-742 | Branch: proto/SCRUM-733
 */

import React, { useState } from 'react'

interface Field {
  id: string
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  foreignKey?: string
}

interface Table {
  id: string
  name: string
  fields: Field[]
  description: string
}

const MOCK_TABLES: Table[] = [
  {
    id: 'table-1',
    name: 'users',
    description: 'User accounts and authentication',
    fields: [
      { id: 'f1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f2', name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'f3', name: 'username', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { id: 'f4', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
      { id: 'f5', name: 'updated_at', type: 'TIMESTAMP', nullable: true, primaryKey: false },
    ],
  },
  {
    id: 'table-2',
    name: 'tasks',
    description: 'Task management and tracking',
    fields: [
      { id: 'f6', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f7', name: 'title', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { id: 'f8', name: 'description', type: 'TEXT', nullable: true, primaryKey: false },
      { id: 'f9', name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { id: 'f10', name: 'user_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'users.id' },
      { id: 'f11', name: 'due_date', type: 'TIMESTAMP', nullable: true, primaryKey: false },
      { id: 'f12', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: 'table-3',
    name: 'teams',
    description: 'Team organization and membership',
    fields: [
      { id: 'f13', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f14', name: 'name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { id: 'f15', name: 'description', type: 'TEXT', nullable: true, primaryKey: false },
      { id: 'f16', name: 'owner_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'users.id' },
      { id: 'f17', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: 'table-4',
    name: 'team_members',
    description: 'Many-to-many relationship between teams and users',
    fields: [
      { id: 'f18', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f19', name: 'team_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'teams.id' },
      { id: 'f20', name: 'user_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'users.id' },
      { id: 'f21', name: 'role', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { id: 'f22', name: 'joined_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: 'table-5',
    name: 'comments',
    description: 'Task comments and discussions',
    fields: [
      { id: 'f23', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { id: 'f24', name: 'task_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'tasks.id' },
      { id: 'f25', name: 'user_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'users.id' },
      { id: 'f26', name: 'content', type: 'TEXT', nullable: false, primaryKey: false },
      { id: 'f27', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
]

export default function CreateDatabaseSchema() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(MOCK_TABLES[0])
  const [showSQL, setShowSQL] = useState(false)

  const generateSQL = (table: Table): string => {
    const fields = table.fields
      .map((f) => {
        const parts = [
          `  ${f.name}`,
          f.type,
          f.nullable ? 'NULL' : 'NOT NULL',
          f.primaryKey ? 'PRIMARY KEY' : '',
        ].filter(Boolean)
        return parts.join(' ')
      })
      .join(',\n')

    const foreignKeys = table.fields
      .filter((f) => f.foreignKey)
      .map((f) => `  FOREIGN KEY (${f.name}) REFERENCES ${f.foreignKey}`)
      .join(',\n')

    const allConstraints = foreignKeys ? `,\n${foreignKeys}` : ''

    return `CREATE TABLE ${table.name} (\n${fields}${allConstraints}\n);`
  }

  const getTableStats = (table: Table) => {
    const primaryKeys = table.fields.filter((f) => f.primaryKey).length
    const foreignKeys = table.fields.filter((f) => f.foreignKey).length
    const nullableFields = table.fields.filter((f) => f.nullable).length

    return { primaryKeys, foreignKeys, nullableFields, totalFields: table.fields.length }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">TaskApp Database Schema</h1>
          <p className="text-slate-600">Design and manage your database structure</p>
        </div>

        {/* Schema Overview */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Schema Overview</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-blue-600 text-sm font-medium mb-1">Total Tables</div>
              <div className="text-3xl font-bold text-blue-900">{MOCK_TABLES.length}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-green-600 text-sm font-medium mb-1">Total Fields</div>
              <div className="text-3xl font-bold text-green-900">
                {MOCK_TABLES.reduce((sum, t) => sum + t.fields.length, 0)}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-purple-600 text-sm font-medium mb-1">Relationships</div>
              <div className="text-3xl font-bold text-purple-900">
                {MOCK_TABLES.reduce(
                  (sum, t) => sum + t.fields.filter((f) => f.foreignKey).length,
                  0
                )}
              </div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="text-amber-600 text-sm font-medium mb-1">Primary Keys</div>
              <div className="text-3xl font-bold text-amber-900">
                {MOCK_TABLES.reduce(
                  (sum, t) => sum + t.fields.filter((f) => f.primaryKey).length,
                  0
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Table List */}
          <div className="col-span-1 bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">Tables</h2>
            </div>
            <div className="p-2">
              {MOCK_TABLES.map((table) => {
                const stats = getTableStats(table)
                const isSelected = selectedTable?.id === table.id

                return (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                      isSelected
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-semibold text-slate-900 mb-1">{table.name}</div>
                    <div className="text-xs text-slate-500 mb-2">{table.description}</div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-slate-200 px-2 py-0.5 rounded">
                        {stats.totalFields} fields
                      </span>
                      {stats.foreignKeys > 0 && (
                        <span className="bg-purple-200 px-2 py-0.5 rounded text-purple-800">
                          {stats.foreignKeys} FK
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Table Details */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm border border-slate-200">
            {selectedTable ? (
              <>
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">{selectedTable.name}</h2>
                    <p className="text-sm text-slate-600">{selectedTable.description}</p>
                  </div>
                  <button
                    onClick={() => setShowSQL(!showSQL)}
                    className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
                  >
                    {showSQL ? 'Show Fields' : 'Show SQL'}
                  </button>
                </div>

                {showSQL ? (
                  <div className="p-4">
                    <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm font-mono whitespace-pre">
                        {generateSQL(selectedTable)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-3 text-sm font-semibold text-slate-700">
                              Field Name
                            </th>
                            <th className="text-left py-2 px-3 text-sm font-semibold text-slate-700">
                              Type
                            </th>
                            <th className="text-left py-2 px-3 text-sm font-semibold text-slate-700">
                              Constraints
                            </th>
                            <th className="text-left py-2 px-3 text-sm font-semibold text-slate-700">
                              Foreign Key
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTable.fields.map((field) => (
                            <tr
                              key={field.id}
                              className="border-b border-slate-100 hover:bg-slate-50"
                            >
                              <td className="py-3 px-3">
                                <span className="font-mono text-sm text-slate-900">
                                  {field.name}
                                </span>
                                {field.primaryKey && (
                                  <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                                    PK
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-3">
                                <span className="font-mono text-sm text-blue-600">
                                  {field.type}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span
                                  className={`text-xs px-2 py-0.5 rounded ${
                                    field.nullable
                                      ? 'bg-slate-100 text-slate-600'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {field.nullable ? 'NULL' : 'NOT NULL'}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                {field.foreignKey ? (
                                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-mono">
                                    {field.foreignKey}
                                  </span>
                                ) : (
                                  <span className="text-slate-400 text-xs">—</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-8 text-center text-slate-500">
                Select a table to view its schema
              </div>
            )}
          </div>
        </div>

        {/* Relationships Diagram */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Table Relationships</h2>
          <div className="grid grid-cols-5 gap-4">
            {MOCK_TABLES.map((table) => {
              const stats = getTableStats(table)
              return (
                <div
                  key={table.id}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-300"
                >
                  <div className="font-semibold text-blue-900 mb-1">{table.name}</div>
                  <div className="text-xs text-blue-700 space-y-1">
                    <div>Fields: {stats.totalFields}</div>
                    {stats.foreignKeys > 0 && (
                      <div className="font-medium">→ {stats.foreignKeys} relations</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
