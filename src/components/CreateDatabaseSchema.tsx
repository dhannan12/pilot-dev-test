import { useState } from 'react'

interface TableSchema {
  id: string
  name: string
  description: string
  columns: ColumnDefinition[]
  createdAt: string
}

interface ColumnDefinition {
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  foreignKey?: string
}

const MOCK_SCHEMAS: TableSchema[] = [
  {
    id: '1',
    name: 'beverages',
    description: 'Core beverage products table',
    createdAt: '2026-08-01',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'type', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'alcohol_content', type: 'DECIMAL(4,2)', nullable: true, primaryKey: false },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
      { name: 'stock_quantity', type: 'INTEGER', nullable: false, primaryKey: false },
      { name: 'brewery_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'breweries.id' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: '2',
    name: 'breweries',
    description: 'Beverage company/brewery information',
    createdAt: '2026-08-01',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'location', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'founded_year', type: 'INTEGER', nullable: true, primaryKey: false },
      { name: 'description', type: 'TEXT', nullable: true, primaryKey: false },
      { name: 'contact_email', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: '3',
    name: 'orders',
    description: 'Customer orders for beverages',
    createdAt: '2026-08-02',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'customer_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'customers.id' },
      { name: 'order_date', type: 'TIMESTAMP', nullable: false, primaryKey: false },
      { name: 'total_amount', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
      { name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false },
      { name: 'delivery_address', type: 'TEXT', nullable: false, primaryKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
  {
    id: '4',
    name: 'order_items',
    description: 'Individual items within orders',
    createdAt: '2026-08-02',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'order_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'orders.id' },
      { name: 'beverage_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'beverages.id' },
      { name: 'quantity', type: 'INTEGER', nullable: false, primaryKey: false },
      { name: 'unit_price', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
      { name: 'subtotal', type: 'DECIMAL(10,2)', nullable: false, primaryKey: false },
    ],
  },
  {
    id: '5',
    name: 'customers',
    description: 'Customer account information',
    createdAt: '2026-08-01',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false, primaryKey: false },
      { name: 'phone', type: 'VARCHAR(20)', nullable: true, primaryKey: false },
      { name: 'age_verified', type: 'BOOLEAN', nullable: false, primaryKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false },
    ],
  },
]

export default function CreateDatabaseSchema() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const selectedSchema = selectedTable
    ? MOCK_SCHEMAS.find(s => s.id === selectedTable)
    : null

  const filteredSchemas = MOCK_SCHEMAS.filter(
    schema =>
      schema.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schema.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const generateDDL = (schema: TableSchema): string => {
    const columns = schema.columns
      .map(col => {
        let def = `  ${col.name} ${col.type}`
        if (!col.nullable) def += ' NOT NULL'
        if (col.primaryKey) def += ' PRIMARY KEY'
        return def
      })
      .join(',\n')

    const foreignKeys = schema.columns
      .filter(col => col.foreignKey)
      .map(col => `  FOREIGN KEY (${col.name}) REFERENCES ${col.foreignKey}`)
      .join(',\n')

    return `CREATE TABLE ${schema.name} (\n${columns}${foreignKeys ? ',\n' + foreignKeys : ''}\n);`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            Database Schema Designer
          </h1>
          <p className="text-lg text-amber-700">
            Beverage Company Database Architecture
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-400 focus:outline-none text-gray-800"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tables List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-4">
                Database Tables ({filteredSchemas.length})
              </h2>
              <div className="space-y-3">
                {filteredSchemas.map((schema) => (
                  <button
                    key={schema.id}
                    onClick={() => setSelectedTable(schema.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedTable === schema.id
                        ? 'bg-amber-100 border-2 border-amber-400'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="font-semibold text-amber-900 mb-1">
                      {schema.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {schema.description}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {schema.columns.length} columns
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Schema Details */}
          <div className="lg:col-span-2">
            {selectedSchema ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-amber-900 mb-2">
                    {selectedSchema.name}
                  </h2>
                  <p className="text-gray-600 mb-1">
                    {selectedSchema.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Created: {selectedSchema.createdAt}
                  </p>
                </div>

                {/* Columns Table */}
                <div className="mb-6 overflow-x-auto">
                  <h3 className="text-lg font-semibold text-amber-900 mb-3">
                    Columns
                  </h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-amber-100">
                        <th className="border border-amber-200 px-4 py-2 text-left text-amber-900">
                          Name
                        </th>
                        <th className="border border-amber-200 px-4 py-2 text-left text-amber-900">
                          Type
                        </th>
                        <th className="border border-amber-200 px-4 py-2 text-center text-amber-900">
                          Nullable
                        </th>
                        <th className="border border-amber-200 px-4 py-2 text-center text-amber-900">
                          Key
                        </th>
                        <th className="border border-amber-200 px-4 py-2 text-left text-amber-900">
                          References
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSchema.columns.map((column, idx) => (
                        <tr key={idx} className="hover:bg-amber-50">
                          <td className="border border-amber-200 px-4 py-2 font-mono text-sm">
                            {column.name}
                          </td>
                          <td className="border border-amber-200 px-4 py-2 font-mono text-sm text-blue-600">
                            {column.type}
                          </td>
                          <td className="border border-amber-200 px-4 py-2 text-center">
                            {column.nullable ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <span className="text-red-600">✗</span>
                            )}
                          </td>
                          <td className="border border-amber-200 px-4 py-2 text-center">
                            {column.primaryKey && (
                              <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                                PK
                              </span>
                            )}
                            {column.foreignKey && (
                              <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                                FK
                              </span>
                            )}
                          </td>
                          <td className="border border-amber-200 px-4 py-2 text-sm text-gray-600">
                            {column.foreignKey || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* DDL Code */}
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-3">
                    SQL DDL
                  </h3>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    {generateDDL(selectedSchema)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">🗄️</div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Select a Table
                </h3>
                <p className="text-gray-600">
                  Choose a table from the list to view its schema details and
                  SQL DDL
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-amber-900">
              {MOCK_SCHEMAS.length}
            </div>
            <div className="text-gray-600 mt-1">Total Tables</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-amber-900">
              {MOCK_SCHEMAS.reduce((sum, s) => sum + s.columns.length, 0)}
            </div>
            <div className="text-gray-600 mt-1">Total Columns</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-amber-900">
              {MOCK_SCHEMAS.reduce(
                (sum, s) =>
                  sum + s.columns.filter(c => c.foreignKey).length,
                0
              )}
            </div>
            <div className="text-gray-600 mt-1">Foreign Keys</div>
          </div>
        </div>
      </div>
    </div>
  )
}
