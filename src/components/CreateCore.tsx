/**
 * CreateCore — Database table management interface for documents and versions
 *
 * Features: table schema display, version tracking, document metadata, SQL preview, table relationships
 *
 * Ticket: SCRUM-663 | Branch: proto/SCRUM-658
 */

import { useState } from 'react'

interface TableColumn {
  id: string
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  foreignKey?: string
}

interface TableSchema {
  id: string
  name: string
  description: string
  columns: TableColumn[]
  createdAt: string
}

interface DocumentVersion {
  id: string
  documentId: string
  versionNumber: number
  status: string
  createdBy: string
  createdAt: string
}

const MOCK_DOCUMENT_TABLE: TableSchema = {
  id: 'tbl_doc_001',
  name: 'documents',
  description: 'Core documents table for storing legal document metadata',
  createdAt: '2026-08-01T10:00:00Z',
  columns: [
    { id: 'col_1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
    { id: 'col_2', name: 'title', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
    { id: 'col_3', name: 'document_type', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
    { id: 'col_4', name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
    { id: 'col_5', name: 'owner_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'users.id' },
    { id: 'col_6', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    { id: 'col_7', name: 'updated_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
  ],
}

const MOCK_VERSION_TABLE: TableSchema = {
  id: 'tbl_ver_001',
  name: 'document_versions',
  description: 'Version tracking table for document revisions',
  createdAt: '2026-08-01T10:05:00Z',
  columns: [
    { id: 'col_v1', name: 'id', type: 'UUID', nullable: false, primaryKey: true },
    { id: 'col_v2', name: 'document_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'documents.id' },
    { id: 'col_v3', name: 'version_number', type: 'INTEGER', nullable: false, primaryKey: false },
    { id: 'col_v4', name: 'content', type: 'TEXT', nullable: true, primaryKey: false },
    { id: 'col_v5', name: 'changes_summary', type: 'TEXT', nullable: true, primaryKey: false },
    { id: 'col_v6', name: 'created_by', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'users.id' },
    { id: 'col_v7', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
  ],
}

const MOCK_TABLES: TableSchema[] = [MOCK_DOCUMENT_TABLE, MOCK_VERSION_TABLE]

const MOCK_VERSIONS: DocumentVersion[] = [
  {
    id: 'ver_001',
    documentId: 'doc_001',
    versionNumber: 1,
    status: 'published',
    createdBy: 'Alice Johnson',
    createdAt: '2026-08-01T14:30:00Z',
  },
  {
    id: 'ver_002',
    documentId: 'doc_001',
    versionNumber: 2,
    status: 'draft',
    createdBy: 'Bob Smith',
    createdAt: '2026-08-05T09:15:00Z',
  },
  {
    id: 'ver_003',
    documentId: 'doc_002',
    versionNumber: 1,
    status: 'published',
    createdBy: 'Carol Davis',
    createdAt: '2026-08-07T11:00:00Z',
  },
  {
    id: 'ver_004',
    documentId: 'doc_002',
    versionNumber: 2,
    status: 'published',
    createdBy: 'David Wilson',
    createdAt: '2026-08-08T16:45:00Z',
  },
  {
    id: 'ver_005',
    documentId: 'doc_003',
    versionNumber: 1,
    status: 'draft',
    createdBy: 'Eve Martinez',
    createdAt: '2026-08-10T13:20:00Z',
  },
]

export default function CreateCore() {
  const [selectedTable, setSelectedTable] = useState<TableSchema | null>(MOCK_TABLES[0])
  const [showSqlPreview, setShowSqlPreview] = useState(false)

  const generateCreateTableSql = (table: TableSchema): string => {
    const columnDefinitions = table.columns.map((col) => {
      let def = `  ${col.name} ${col.type}`
      if (col.primaryKey) def += ' PRIMARY KEY'
      if (!col.nullable) def += ' NOT NULL'
      return def
    }).join(',\n')

    return `CREATE TABLE ${table.name} (\n${columnDefinitions}\n);`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Core Document & Version Tables</h1>
          <p className="text-gray-600">Database schema management for the LegalReview Document Management System</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Database Tables</h2>
              <div className="space-y-2">
                {MOCK_TABLES.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      selectedTable?.id === table.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{table.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{table.columns.length} columns</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Version Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Versions</span>
                    <span className="font-medium text-gray-900">{MOCK_VERSIONS.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Published</span>
                    <span className="font-medium text-green-600">
                      {MOCK_VERSIONS.filter((v) => v.status === 'published').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Draft</span>
                    <span className="font-medium text-yellow-600">
                      {MOCK_VERSIONS.filter((v) => v.status === 'draft').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2">
            {selectedTable ? (
              <div className="space-y-6">
                {/* Schema Info */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedTable.name}</h2>
                      <p className="text-gray-600 mt-1">{selectedTable.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Created: {new Date(selectedTable.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSqlPreview(!showSqlPreview)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      {showSqlPreview ? 'Hide SQL' : 'Show SQL'}
                    </button>
                  </div>

                  {showSqlPreview && (
                    <div className="mb-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-green-400 font-mono">
                        {generateCreateTableSql(selectedTable)}
                      </pre>
                    </div>
                  )}

                  {/* Columns Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Column Name</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Data Type</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Constraints</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Foreign Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTable.columns.map((column) => (
                          <tr key={column.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <span className="font-medium text-gray-900">{column.name}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-gray-600 font-mono">{column.type}</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                {column.primaryKey && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                                    PRIMARY KEY
                                  </span>
                                )}
                                {!column.nullable && (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">
                                    NOT NULL
                                  </span>
                                )}
                                {column.nullable && !column.primaryKey && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">
                                    NULLABLE
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {column.foreignKey ? (
                                <span className="text-sm text-blue-600 font-mono">{column.foreignKey}</span>
                              ) : (
                                <span className="text-sm text-gray-400">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Version History */}
                {selectedTable.name === 'document_versions' && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Version Records</h3>
                    <div className="space-y-3">
                      {MOCK_VERSIONS.map((version) => (
                        <div
                          key={version.id}
                          className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="font-semibold text-gray-900">Version {version.versionNumber}</span>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${
                                    version.status === 'published'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}
                                >
                                  {version.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">Document ID: {version.documentId}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Created by {version.createdBy} on {new Date(version.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <span className="text-xs text-gray-400 font-mono">{version.id}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                Select a table to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
