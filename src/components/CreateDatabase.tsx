/**
 * CreateDatabase — Visual database schema for Chinese restaurant takeaway system
 *
 * Features: menu items schema, orders schema, users schema, promotions schema, relationship visualization
 *
 * Ticket: SCRUM-1066 | Branch: proto/SCRUM-1056
 */

import React, { useState } from 'react'

interface TableColumn {
  name: string
  type: string
  constraints: string
}

interface DatabaseTable {
  id: string
  name: string
  description: string
  columns: TableColumn[]
}

const MOCK_TABLES: DatabaseTable[] = [
  {
    id: 'menu',
    name: 'menu_items',
    description: 'Restaurant menu items and dishes',
    columns: [
      { name: 'id', type: 'INT', constraints: 'PRIMARY KEY, AUTO_INCREMENT' },
      { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
      { name: 'name_chinese', type: 'VARCHAR(255)', constraints: 'NULL' },
      { name: 'description', type: 'TEXT', constraints: 'NULL' },
      { name: 'category', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
      { name: 'price', type: 'DECIMAL(10,2)', constraints: 'NOT NULL' },
      { name: 'image_url', type: 'VARCHAR(500)', constraints: 'NULL' },
      { name: 'is_spicy', type: 'BOOLEAN', constraints: 'DEFAULT FALSE' },
      { name: 'is_vegetarian', type: 'BOOLEAN', constraints: 'DEFAULT FALSE' },
      { name: 'is_available', type: 'BOOLEAN', constraints: 'DEFAULT TRUE' },
      { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP', constraints: 'ON UPDATE CURRENT_TIMESTAMP' }
    ]
  },
  {
    id: 'orders',
    name: 'orders',
    description: 'Customer orders and order details',
    columns: [
      { name: 'id', type: 'INT', constraints: 'PRIMARY KEY, AUTO_INCREMENT' },
      { name: 'user_id', type: 'INT', constraints: 'FOREIGN KEY REFERENCES users(id)' },
      { name: 'order_number', type: 'VARCHAR(50)', constraints: 'UNIQUE, NOT NULL' },
      { name: 'total_amount', type: 'DECIMAL(10,2)', constraints: 'NOT NULL' },
      { name: 'status', type: 'ENUM', constraints: 'pending, confirmed, preparing, ready, delivered, cancelled' },
      { name: 'payment_method', type: 'VARCHAR(50)', constraints: 'NOT NULL' },
      { name: 'payment_status', type: 'ENUM', constraints: 'pending, completed, failed, refunded' },
      { name: 'delivery_address', type: 'TEXT', constraints: 'NULL' },
      { name: 'delivery_time', type: 'DATETIME', constraints: 'NULL' },
      { name: 'special_instructions', type: 'TEXT', constraints: 'NULL' },
      { name: 'promotion_id', type: 'INT', constraints: 'FOREIGN KEY REFERENCES promotions(id), NULL' },
      { name: 'discount_amount', type: 'DECIMAL(10,2)', constraints: 'DEFAULT 0' },
      { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP', constraints: 'ON UPDATE CURRENT_TIMESTAMP' }
    ]
  },
  {
    id: 'order_items',
    name: 'order_items',
    description: 'Individual items within each order',
    columns: [
      { name: 'id', type: 'INT', constraints: 'PRIMARY KEY, AUTO_INCREMENT' },
      { name: 'order_id', type: 'INT', constraints: 'FOREIGN KEY REFERENCES orders(id)' },
      { name: 'menu_item_id', type: 'INT', constraints: 'FOREIGN KEY REFERENCES menu_items(id)' },
      { name: 'quantity', type: 'INT', constraints: 'NOT NULL, DEFAULT 1' },
      { name: 'unit_price', type: 'DECIMAL(10,2)', constraints: 'NOT NULL' },
      { name: 'subtotal', type: 'DECIMAL(10,2)', constraints: 'NOT NULL' },
      { name: 'special_requests', type: 'TEXT', constraints: 'NULL' },
      { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP' }
    ]
  },
  {
    id: 'users',
    name: 'users',
    description: 'Customer accounts and authentication',
    columns: [
      { name: 'id', type: 'INT', constraints: 'PRIMARY KEY, AUTO_INCREMENT' },
      { name: 'email', type: 'VARCHAR(255)', constraints: 'UNIQUE, NOT NULL' },
      { name: 'password_hash', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
      { name: 'first_name', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
      { name: 'last_name', type: 'VARCHAR(100)', constraints: 'NOT NULL' },
      { name: 'phone', type: 'VARCHAR(20)', constraints: 'NULL' },
      { name: 'default_address', type: 'TEXT', constraints: 'NULL' },
      { name: 'is_verified', type: 'BOOLEAN', constraints: 'DEFAULT FALSE' },
      { name: 'is_active', type: 'BOOLEAN', constraints: 'DEFAULT TRUE' },
      { name: 'loyalty_points', type: 'INT', constraints: 'DEFAULT 0' },
      { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP', constraints: 'ON UPDATE CURRENT_TIMESTAMP' },
      { name: 'last_login', type: 'TIMESTAMP', constraints: 'NULL' }
    ]
  },
  {
    id: 'promotions',
    name: 'promotions',
    description: 'Promotional offers and discount codes',
    columns: [
      { name: 'id', type: 'INT', constraints: 'PRIMARY KEY, AUTO_INCREMENT' },
      { name: 'code', type: 'VARCHAR(50)', constraints: 'UNIQUE, NOT NULL' },
      { name: 'description', type: 'TEXT', constraints: 'NULL' },
      { name: 'discount_type', type: 'ENUM', constraints: 'percentage, fixed_amount, free_delivery' },
      { name: 'discount_value', type: 'DECIMAL(10,2)', constraints: 'NOT NULL' },
      { name: 'min_order_amount', type: 'DECIMAL(10,2)', constraints: 'DEFAULT 0' },
      { name: 'max_uses', type: 'INT', constraints: 'NULL' },
      { name: 'current_uses', type: 'INT', constraints: 'DEFAULT 0' },
      { name: 'is_active', type: 'BOOLEAN', constraints: 'DEFAULT TRUE' },
      { name: 'valid_from', type: 'DATETIME', constraints: 'NOT NULL' },
      { name: 'valid_until', type: 'DATETIME', constraints: 'NOT NULL' },
      { name: 'created_at', type: 'TIMESTAMP', constraints: 'DEFAULT CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP', constraints: 'ON UPDATE CURRENT_TIMESTAMP' }
    ]
  }
]

export default function CreateDatabase() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showSQL, setShowSQL] = useState(false)

  const generateCreateTableSQL = (table: DatabaseTable): string => {
    let sql = `CREATE TABLE ${table.name} (\n`
    sql += table.columns.map(col => `  ${col.name} ${col.type} ${col.constraints}`).join(',\n')
    sql += '\n);'
    return sql
  }

  return (
    <div data-testid="createdatabase" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Database Schema Design
          </h1>
          <p className="text-slate-600 mb-4">
            Chinese Restaurant Takeaway System - Core Tables
          </p>
          <div className="flex gap-4">
            <button
              data-testid="createdatabase-toggle-sql"
              onClick={() => setShowSQL(!showSQL)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showSQL ? 'Hide SQL' : 'Show SQL'}
            </button>
            <button
              data-testid="createdatabase-reset"
              onClick={() => setSelectedTable(null)}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
            >
              Reset Selection
            </button>
          </div>
        </div>

        {/* Schema Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <span className="text-green-600 text-xl font-bold">M</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Menu Items</h3>
            <p className="text-slate-600 text-sm">
              Dishes, categories, pricing, and availability
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <span className="text-blue-600 text-xl font-bold">O</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Orders System</h3>
            <p className="text-slate-600 text-sm">
              Order tracking, items, status, and delivery
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <span className="text-purple-600 text-xl font-bold">U</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Users & Promos</h3>
            <p className="text-slate-600 text-sm">
              Customer accounts, authentication, and discounts
            </p>
          </div>
        </div>

        {/* Tables List */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Database Tables</h2>
          <div data-testid="createdatabase-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_TABLES.map((table) => (
              <button
                key={table.id}
                data-testid="createdatabase-item"
                onClick={() => setSelectedTable(table.id)}
                className={`p-4 rounded-lg border-2 text-left transition ${
                  selectedTable === table.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <h3 className="font-semibold text-slate-800 mb-1">{table.name}</h3>
                <p className="text-sm text-slate-600 mb-2">{table.description}</p>
                <span className="text-xs text-slate-500">{table.columns.length} columns</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table Details */}
        {selectedTable && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            {MOCK_TABLES.filter(t => t.id === selectedTable).map((table) => (
              <div key={table.id}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{table.name}</h2>
                    <p className="text-slate-600">{table.description}</p>
                  </div>
                  <button
                    data-testid="createdatabase-close"
                    onClick={() => setSelectedTable(null)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                  >
                    Close
                  </button>
                </div>

                {/* Columns Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="text-left p-3 border-b-2 border-slate-300 font-semibold text-slate-700">
                          Column Name
                        </th>
                        <th className="text-left p-3 border-b-2 border-slate-300 font-semibold text-slate-700">
                          Data Type
                        </th>
                        <th className="text-left p-3 border-b-2 border-slate-300 font-semibold text-slate-700">
                          Constraints
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((column, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 border-b border-slate-200 font-mono text-sm text-slate-800">
                            {column.name}
                          </td>
                          <td className="p-3 border-b border-slate-200 font-mono text-sm text-blue-600">
                            {column.type}
                          </td>
                          <td className="p-3 border-b border-slate-200 font-mono text-xs text-slate-600">
                            {column.constraints}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* SQL Generator */}
                {showSQL && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">CREATE TABLE Statement</h3>
                    <pre
                      data-testid="createdatabase-sql"
                      className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono"
                    >
                      {generateCreateTableSQL(table)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Relationships */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Table Relationships</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <span className="font-semibold text-slate-800">orders</span>
              <span className="text-slate-500">→</span>
              <span className="font-semibold text-slate-800">users</span>
              <span className="text-sm text-slate-600">(user_id references users.id)</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <span className="font-semibold text-slate-800">order_items</span>
              <span className="text-slate-500">→</span>
              <span className="font-semibold text-slate-800">orders</span>
              <span className="text-sm text-slate-600">(order_id references orders.id)</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <span className="font-semibold text-slate-800">order_items</span>
              <span className="text-slate-500">→</span>
              <span className="font-semibold text-slate-800">menu_items</span>
              <span className="text-sm text-slate-600">(menu_item_id references menu_items.id)</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <span className="font-semibold text-slate-800">orders</span>
              <span className="text-slate-500">→</span>
              <span className="font-semibold text-slate-800">promotions</span>
              <span className="text-sm text-slate-600">(promotion_id references promotions.id)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
