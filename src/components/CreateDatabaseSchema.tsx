import React, { useState } from 'react'

const MOCK_SCHEMA = [
  {
    id: 1,
    tableName: 'restaurants',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'name', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
      { name: 'cuisine', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
      { name: 'address', type: 'TEXT', constraint: 'NULL' },
      { name: 'phone', type: 'VARCHAR(20)', constraint: 'NULL' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
    ]
  },
  {
    id: 2,
    tableName: 'menu_categories',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'restaurant_id', type: 'INT', constraint: 'NOT NULL FOREIGN KEY' },
      { name: 'name', type: 'VARCHAR(100)', constraint: 'NOT NULL' },
      { name: 'description', type: 'TEXT', constraint: 'NULL' },
      { name: 'display_order', type: 'INT', constraint: 'DEFAULT 0' }
    ]
  },
  {
    id: 3,
    tableName: 'menu_items',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'category_id', type: 'INT', constraint: 'NOT NULL FOREIGN KEY' },
      { name: 'name', type: 'VARCHAR(255)', constraint: 'NOT NULL' },
      { name: 'description', type: 'TEXT', constraint: 'NULL' },
      { name: 'price', type: 'DECIMAL(10,2)', constraint: 'NOT NULL' },
      { name: 'is_available', type: 'BOOLEAN', constraint: 'DEFAULT TRUE' },
      { name: 'allergens', type: 'JSON', constraint: 'NULL' },
      { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT CURRENT_TIMESTAMP' }
    ]
  },
  {
    id: 4,
    tableName: 'menu_item_images',
    columns: [
      { name: 'id', type: 'INT', constraint: 'PRIMARY KEY AUTO_INCREMENT' },
      { name: 'menu_item_id', type: 'INT', constraint: 'NOT NULL FOREIGN KEY' },
      { name: 'image_url', type: 'VARCHAR(500)', constraint: 'NOT NULL' },
      { name: 'alt_text', type: 'VARCHAR(255)', constraint: 'NULL' },
      { name: 'is_primary', type: 'BOOLEAN', constraint: 'DEFAULT FALSE' }
    ]
  }
]

interface Column {
  name: string
  type: string
  constraint: string
}

interface SchemaTable {
  id: number
  tableName: string
  columns: Column[]
}

export default function CreateDatabaseSchema() {
  const [expandedTable, setExpandedTable] = useState<number | null>(0)
  const [copiedSQL, setCopiedSQL] = useState(false)

  const generateSQL = (table: SchemaTable): string => {
    const columnDefs = table.columns
      .map(col => `  ${col.name} ${col.type} ${col.constraint}`)
      .join(',\n')
    return `CREATE TABLE ${table.tableName} (\n${columnDefs}\n);`
  }

  const handleCopySQL = (sql: string) => {
    navigator.clipboard.writeText(sql)
    setCopiedSQL(true)
    setTimeout(() => setCopiedSQL(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Database Schema</h1>
          <p className="text-lg text-slate-600">Italian Restaurant Menu System</p>
          <p className="text-sm text-slate-500 mt-2">SCRUM-577: Complete database schema for restaurant menu management</p>
        </div>

        {/* Schema Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Schema Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_SCHEMA.map(table => (
              <div key={table.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{table.tableName}</h3>
                <p className="text-sm text-slate-600">{table.columns.length} columns</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Schema Tables */}
        <div className="space-y-4">
          {MOCK_SCHEMA.map(table => (
            <div key={table.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Table Header */}
              <button
                onClick={() => setExpandedTable(expandedTable === table.id ? null : table.id)}
                className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between border-b border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                    {table.id}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{table.tableName}</h3>
                </div>
                <span className="text-slate-600 text-2xl">
                  {expandedTable === table.id ? '−' : '+'}
                </span>
              </button>

              {/* Table Content */}
              {expandedTable === table.id && (
                <div className="p-6">
                  {/* Columns Table */}
                  <div className="mb-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200">
                          <th className="px-4 py-3 text-left font-semibold text-slate-900">Column Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-900">Data Type</th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-900">Constraint</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.columns.map((col, idx) => (
                          <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="px-4 py-3 font-mono text-slate-900">{col.name}</td>
                            <td className="px-4 py-3 font-mono text-blue-600">{col.type}</td>
                            <td className="px-4 py-3 font-mono text-slate-600 text-xs">{col.constraint}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* SQL Preview */}
                  <div className="bg-slate-900 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase">SQL Statement</p>
                      <button
                        onClick={() => handleCopySQL(generateSQL(table))}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-colors"
                      >
                        {copiedSQL ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="text-slate-300 font-mono text-xs overflow-x-auto">
                      {generateSQL(table)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Schema Features</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Relational design with foreign keys</li>
            <li>✓ Support for allergen tracking (JSON)</li>
            <li>✓ Image management for menu items</li>
            <li>✓ Availability status tracking</li>
            <li>✓ Timestamp tracking for audit</li>
            <li>✓ Optimized for Italian restaurant menus</li>
          </ul>
        </div>
      </div>
    </div>
  )
}