import { useState } from 'react'

interface Table {
  id: string
  name: string
  columns: Column[]
  description: string
}

interface Column {
  name: string
  type: string
  nullable: boolean
  isPrimaryKey: boolean
  isForeignKey: boolean
  references?: string
}

const MOCK_TABLES: Table[] = [
  {
    id: 'customers',
    name: 'customers',
    description: 'Store customer information',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true, isForeignKey: false },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'phone', type: 'VARCHAR(20)', nullable: true, isPrimaryKey: false, isForeignKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, isPrimaryKey: false, isForeignKey: false },
    ],
  },
  {
    id: 'stylists',
    name: 'stylists',
    description: 'Store stylist/staff information',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true, isForeignKey: false },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'specialty', type: 'VARCHAR(100)', nullable: true, isPrimaryKey: false, isForeignKey: false },
      { name: 'rating', type: 'DECIMAL(3,2)', nullable: true, isPrimaryKey: false, isForeignKey: false },
      { name: 'is_active', type: 'BOOLEAN', nullable: false, isPrimaryKey: false, isForeignKey: false },
    ],
  },
  {
    id: 'services',
    name: 'services',
    description: 'Store available salon services',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true, isForeignKey: false },
      { name: 'name', type: 'VARCHAR(200)', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'description', type: 'TEXT', nullable: true, isPrimaryKey: false, isForeignKey: false },
      { name: 'duration_minutes', type: 'INTEGER', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'category', type: 'VARCHAR(50)', nullable: true, isPrimaryKey: false, isForeignKey: false },
    ],
  },
  {
    id: 'appointments',
    name: 'appointments',
    description: 'Store booking appointments',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true, isForeignKey: false },
      { name: 'customer_id', type: 'INTEGER', nullable: false, isPrimaryKey: false, isForeignKey: true, references: 'customers(id)' },
      { name: 'stylist_id', type: 'INTEGER', nullable: false, isPrimaryKey: false, isForeignKey: true, references: 'stylists(id)' },
      { name: 'service_id', type: 'INTEGER', nullable: false, isPrimaryKey: false, isForeignKey: true, references: 'services(id)' },
      { name: 'appointment_date', type: 'DATE', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'start_time', type: 'TIME', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'end_time', type: 'TIME', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'status', type: 'VARCHAR(20)', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'notes', type: 'TEXT', nullable: true, isPrimaryKey: false, isForeignKey: false },
    ],
  },
  {
    id: 'reviews',
    name: 'reviews',
    description: 'Store customer reviews and ratings',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, isPrimaryKey: true, isForeignKey: false },
      { name: 'appointment_id', type: 'INTEGER', nullable: false, isPrimaryKey: false, isForeignKey: true, references: 'appointments(id)' },
      { name: 'rating', type: 'INTEGER', nullable: false, isPrimaryKey: false, isForeignKey: false },
      { name: 'comment', type: 'TEXT', nullable: true, isPrimaryKey: false, isForeignKey: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, isPrimaryKey: false, isForeignKey: false },
    ],
  },
]

export default function CreateDatabaseSchema() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  const getTableById = (id: string): Table | undefined => {
    return MOCK_TABLES.find((table) => table.id === id)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            HairSaloon Database Schema
          </h1>
          <p className="text-gray-600">
            View and explore the database schema for the HairSaloon online booking system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Tables ({MOCK_TABLES.length})
              </h2>
              <div className="space-y-2">
                {MOCK_TABLES.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedTable === table.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">{table.name}</div>
                    <div
                      className={`text-sm ${
                        selectedTable === table.id ? 'text-indigo-100' : 'text-gray-500'
                      }`}
                    >
                      {table.columns.length} columns
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-2">
            {selectedTable ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                {(() => {
                  const table = getTableById(selectedTable)
                  if (!table) return <div>Table not found</div>

                  return (
                    <>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {table.name}
                        </h2>
                        <p className="text-gray-600">{table.description}</p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b-2 border-gray-300">
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                Column Name
                              </th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                Data Type
                              </th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                                Constraints
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {table.columns.map((column, index) => (
                              <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50"
                              >
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm">
                                      {column.name}
                                    </span>
                                    {column.isPrimaryKey && (
                                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                        PK
                                      </span>
                                    )}
                                    {column.isForeignKey && (
                                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        FK
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="font-mono text-sm text-gray-700">
                                    {column.type}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-wrap gap-2">
                                    {!column.nullable && (
                                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                        NOT NULL
                                      </span>
                                    )}
                                    {column.nullable && (
                                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        NULLABLE
                                      </span>
                                    )}
                                    {column.references && (
                                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                                        → {column.references}
                                      </span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Quick Stats
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-indigo-600">
                              {table.columns.length}
                            </div>
                            <div className="text-sm text-gray-600">Total Columns</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-yellow-600">
                              {table.columns.filter((c) => c.isPrimaryKey).length}
                            </div>
                            <div className="text-sm text-gray-600">Primary Keys</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600">
                              {table.columns.filter((c) => c.isForeignKey).length}
                            </div>
                            <div className="text-sm text-gray-600">Foreign Keys</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-red-600">
                              {table.columns.filter((c) => !c.nullable).length}
                            </div>
                            <div className="text-sm text-gray-600">Required Fields</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-24 h-24 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Select a Table
                </h3>
                <p className="text-gray-500">
                  Choose a table from the list to view its schema details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
