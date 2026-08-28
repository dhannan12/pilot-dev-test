/**
 * SetupDatabase — Database schema setup and migration tool for ClothesShop
 *
 * Features: schema visualization, table creation, migration status, column details, setup controls
 *
 * Ticket: SCRUM-1251 | Branch: proto/SCRUM-1242
 */

import React, { useState } from 'react'

interface Column {
  name: string
  type: string
  nullable: boolean
  primaryKey?: boolean
  foreignKey?: string
}

interface Table {
  id: string
  name: string
  description: string
  columns: Column[]
  status: 'pending' | 'creating' | 'created' | 'error'
}

const mockDatabaseSchema: Table[] = [
  {
    id: 't1',
    name: 'products',
    description: 'Clothing items and accessories',
    status: 'pending',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false },
      { name: 'description', type: 'TEXT', nullable: true },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'category_id', type: 'UUID', nullable: false, foreignKey: 'categories.id' },
      { name: 'sku', type: 'VARCHAR(50)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    id: 't2',
    name: 'categories',
    description: 'Product categories (shirts, pants, accessories, etc.)',
    status: 'pending',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(100)', nullable: false },
      { name: 'slug', type: 'VARCHAR(100)', nullable: false },
      { name: 'parent_id', type: 'UUID', nullable: true, foreignKey: 'categories.id' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    id: 't3',
    name: 'inventory',
    description: 'Stock levels and sizes for each product',
    status: 'pending',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'product_id', type: 'UUID', nullable: false, foreignKey: 'products.id' },
      { name: 'size', type: 'VARCHAR(10)', nullable: false },
      { name: 'color', type: 'VARCHAR(50)', nullable: false },
      { name: 'quantity', type: 'INTEGER', nullable: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    id: 't4',
    name: 'customers',
    description: 'Registered customer accounts',
    status: 'pending',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'email', type: 'VARCHAR(255)', nullable: false },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'phone', type: 'VARCHAR(20)', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    id: 't5',
    name: 'orders',
    description: 'Customer orders and checkout information',
    status: 'pending',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'customer_id', type: 'UUID', nullable: false, foreignKey: 'customers.id' },
      { name: 'order_number', type: 'VARCHAR(50)', nullable: false },
      { name: 'status', type: 'VARCHAR(20)', nullable: false },
      { name: 'total', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    id: 't6',
    name: 'order_items',
    description: 'Individual items within each order',
    status: 'pending',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'order_id', type: 'UUID', nullable: false, foreignKey: 'orders.id' },
      { name: 'product_id', type: 'UUID', nullable: false, foreignKey: 'products.id' },
      { name: 'inventory_id', type: 'UUID', nullable: false, foreignKey: 'inventory.id' },
      { name: 'quantity', type: 'INTEGER', nullable: false },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false }
    ]
  }
]

export default function SetupDatabase() {
  const [tables, setTables] = useState<Table[]>(mockDatabaseSchema)
  const [isSetupRunning, setIsSetupRunning] = useState(false)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  const handleInitializeDatabase = () => {
    setIsSetupRunning(true)
    setTables(tables.map(t => ({ ...t, status: 'pending' })))

    // Simulate table creation
    tables.forEach((table, index) => {
      setTimeout(() => {
        setTables(prev =>
          prev.map(t =>
            t.id === table.id ? { ...t, status: 'creating' } : t
          )
        )
        setTimeout(() => {
          setTables(prev =>
            prev.map(t =>
              t.id === table.id ? { ...t, status: 'created' } : t
            )
          )
          if (index === tables.length - 1) {
            setIsSetupRunning(false)
          }
        }, 800)
      }, index * 1000)
    })
  }

  const handleResetDatabase = () => {
    setTables(tables.map(t => ({ ...t, status: 'pending' })))
    setIsSetupRunning(false)
  }

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'pending':
        return 'text-gray-500 bg-gray-100'
      case 'creating':
        return 'text-blue-600 bg-blue-100'
      case 'created':
        return 'text-green-600 bg-green-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-500 bg-gray-100'
    }
  }

  const getStatusIcon = (status: Table['status']) => {
    switch (status) {
      case 'pending':
        return '○'
      case 'creating':
        return '◐'
      case 'created':
        return '✓'
      case 'error':
        return '✗'
      default:
        return '○'
    }
  }

  const createdCount = tables.filter(t => t.status === 'created').length
  const totalCount = tables.length

  return (
    <div data-testid="setupdatabase" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ClothesShop Database Setup
          </h1>
          <p className="text-gray-600">
            Initialize and configure the database schema for the ClothesShop application
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Database Migration
              </h2>
              <p className="text-sm text-gray-600">
                {isSetupRunning
                  ? `Creating tables... ${createdCount}/${totalCount}`
                  : createdCount === totalCount && createdCount > 0
                  ? 'All tables created successfully'
                  : 'Ready to initialize database schema'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                data-testid="setupdatabase-reset"
                onClick={handleResetDatabase}
                disabled={isSetupRunning}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Reset
              </button>
              <button
                data-testid="setupdatabase-initialize"
                onClick={handleInitializeDatabase}
                disabled={isSetupRunning}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isSetupRunning ? 'Initializing...' : 'Initialize Database'}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isSetupRunning && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(createdCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tables List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              Database Tables ({tables.length})
            </h3>
          </div>
          <div data-testid="setupdatabase-list" className="divide-y divide-gray-200">
            {tables.map(table => (
              <div
                key={table.id}
                data-testid="setupdatabase-item"
                className="p-6 hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-2xl font-mono ${
                        table.status === 'creating' ? 'animate-spin' : ''
                      }`}
                    >
                      {getStatusIcon(table.status)}
                    </span>
                    <div>
                      <h4 className="text-lg font-mono font-bold text-gray-900">
                        {table.name}
                      </h4>
                      <p className="text-sm text-gray-600">{table.description}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      table.status
                    )}`}
                  >
                    {table.status.toUpperCase()}
                  </span>
                </div>

                {/* Columns Table */}
                <div className="ml-11">
                  <button
                    data-testid="setupdatabase-toggle"
                    onClick={() =>
                      setSelectedTable(selectedTable === table.id ? null : table.id)
                    }
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium mb-2"
                  >
                    {selectedTable === table.id ? '▼' : '▶'} View columns ({table.columns.length})
                  </button>

                  {selectedTable === table.id && (
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">
                              Column
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">
                              Type
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">
                              Constraints
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {table.columns.map((column, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-4 py-2 font-mono text-gray-900">
                                {column.name}
                              </td>
                              <td className="px-4 py-2 font-mono text-gray-600">
                                {column.type}
                              </td>
                              <td className="px-4 py-2 text-gray-600">
                                <div className="flex gap-2 flex-wrap">
                                  {column.primaryKey && (
                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                      PRIMARY KEY
                                    </span>
                                  )}
                                  {column.foreignKey && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                      FK → {column.foreignKey}
                                    </span>
                                  )}
                                  {!column.nullable && (
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                      NOT NULL
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Schema Overview:</strong> This database schema supports a full-featured
            clothing e-commerce application with product management, inventory tracking,
            customer accounts, and order processing.
          </p>
        </div>
      </div>
    </div>
  )
}
