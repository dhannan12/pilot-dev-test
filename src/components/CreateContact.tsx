/**
 * CreateContact — Database schema visualization for contact form and messages
 *
 * Features: Schema display, field definitions, relationship mapping, constraint validation, sample data preview
 *
 * Ticket: SCRUM-838 | Branch: proto/SCRUM-828
 */

import React, { useState } from 'react'

interface SchemaField {
  id: string
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  foreignKey?: string
  description: string
}

interface SchemaTable {
  id: string
  name: string
  description: string
  fields: SchemaField[]
  indexes: string[]
}

const MOCK_SCHEMA_TABLES: SchemaTable[] = [
  {
    id: '1',
    name: 'contacts',
    description: 'Stores contact form submissions from users',
    fields: [
      { id: 'c1', name: 'id', type: 'UUID', nullable: false, primaryKey: true, description: 'Unique contact identifier' },
      { id: 'c2', name: 'full_name', type: 'VARCHAR(255)', nullable: false, primaryKey: false, description: 'Contact full name' },
      { id: 'c3', name: 'email', type: 'VARCHAR(255)', nullable: false, primaryKey: false, description: 'Contact email address' },
      { id: 'c4', name: 'phone', type: 'VARCHAR(20)', nullable: true, primaryKey: false, description: 'Contact phone number' },
      { id: 'c5', name: 'company', type: 'VARCHAR(255)', nullable: true, primaryKey: false, description: 'Company name' },
      { id: 'c6', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, description: 'Record creation timestamp' },
      { id: 'c7', name: 'updated_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, description: 'Last update timestamp' }
    ],
    indexes: ['idx_contacts_email', 'idx_contacts_created_at']
  },
  {
    id: '2',
    name: 'messages',
    description: 'Stores message content from contact form submissions',
    fields: [
      { id: 'm1', name: 'id', type: 'UUID', nullable: false, primaryKey: true, description: 'Unique message identifier' },
      { id: 'm2', name: 'contact_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'contacts(id)', description: 'Reference to contact' },
      { id: 'm3', name: 'subject', type: 'VARCHAR(500)', nullable: false, primaryKey: false, description: 'Message subject line' },
      { id: 'm4', name: 'message_body', type: 'TEXT', nullable: false, primaryKey: false, description: 'Full message content' },
      { id: 'm5', name: 'status', type: 'VARCHAR(50)', nullable: false, primaryKey: false, description: 'Message status (new, read, replied)' },
      { id: 'm6', name: 'priority', type: 'VARCHAR(20)', nullable: false, primaryKey: false, description: 'Priority level (low, medium, high)' },
      { id: 'm7', name: 'created_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, description: 'Message timestamp' }
    ],
    indexes: ['idx_messages_contact_id', 'idx_messages_status', 'idx_messages_priority']
  },
  {
    id: '3',
    name: 'message_attachments',
    description: 'Stores file attachments associated with messages',
    fields: [
      { id: 'a1', name: 'id', type: 'UUID', nullable: false, primaryKey: true, description: 'Unique attachment identifier' },
      { id: 'a2', name: 'message_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'messages(id)', description: 'Reference to message' },
      { id: 'a3', name: 'file_name', type: 'VARCHAR(255)', nullable: false, primaryKey: false, description: 'Original file name' },
      { id: 'a4', name: 'file_path', type: 'VARCHAR(500)', nullable: false, primaryKey: false, description: 'Storage path' },
      { id: 'a5', name: 'file_size', type: 'INTEGER', nullable: false, primaryKey: false, description: 'File size in bytes' },
      { id: 'a6', name: 'mime_type', type: 'VARCHAR(100)', nullable: false, primaryKey: false, description: 'File MIME type' }
    ],
    indexes: ['idx_attachments_message_id']
  },
  {
    id: '4',
    name: 'contact_preferences',
    description: 'Stores contact communication preferences and consent',
    fields: [
      { id: 'p1', name: 'id', type: 'UUID', nullable: false, primaryKey: true, description: 'Unique preference identifier' },
      { id: 'p2', name: 'contact_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'contacts(id)', description: 'Reference to contact' },
      { id: 'p3', name: 'email_opt_in', type: 'BOOLEAN', nullable: false, primaryKey: false, description: 'Email communication consent' },
      { id: 'p4', name: 'sms_opt_in', type: 'BOOLEAN', nullable: false, primaryKey: false, description: 'SMS communication consent' },
      { id: 'p5', name: 'preferred_language', type: 'VARCHAR(10)', nullable: false, primaryKey: false, description: 'Preferred language code' },
      { id: 'p6', name: 'timezone', type: 'VARCHAR(50)', nullable: false, primaryKey: false, description: 'User timezone' }
    ],
    indexes: ['idx_preferences_contact_id']
  },
  {
    id: '5',
    name: 'message_replies',
    description: 'Stores staff replies to contact messages',
    fields: [
      { id: 'r1', name: 'id', type: 'UUID', nullable: false, primaryKey: true, description: 'Unique reply identifier' },
      { id: 'r2', name: 'message_id', type: 'UUID', nullable: false, primaryKey: false, foreignKey: 'messages(id)', description: 'Reference to original message' },
      { id: 'r3', name: 'staff_id', type: 'UUID', nullable: false, primaryKey: false, description: 'Staff member who replied' },
      { id: 'r4', name: 'reply_body', type: 'TEXT', nullable: false, primaryKey: false, description: 'Reply content' },
      { id: 'r5', name: 'sent_at', type: 'TIMESTAMP', nullable: false, primaryKey: false, description: 'Reply sent timestamp' }
    ],
    indexes: ['idx_replies_message_id', 'idx_replies_staff_id']
  }
]

export default function CreateContact() {
  const [selectedTable, setSelectedTable] = useState<string>(MOCK_SCHEMA_TABLES[0].id)
  const [showIndexes, setShowIndexes] = useState<boolean>(true)

  const currentTable = MOCK_SCHEMA_TABLES.find(table => table.id === selectedTable) || MOCK_SCHEMA_TABLES[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Contact Form Database Schema</h1>
          <p className="text-slate-600">Database structure for contact forms and message management system</p>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{MOCK_SCHEMA_TABLES.length}</div>
              <div className="text-sm text-slate-600">Tables</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {MOCK_SCHEMA_TABLES.reduce((sum, table) => sum + table.fields.length, 0)}
              </div>
              <div className="text-sm text-slate-600">Total Fields</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">
                {MOCK_SCHEMA_TABLES.reduce((sum, table) => sum + table.indexes.length, 0)}
              </div>
              <div className="text-sm text-slate-600">Indexes</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">
                {MOCK_SCHEMA_TABLES.reduce((sum, table) => 
                  sum + table.fields.filter(f => f.foreignKey).length, 0
                )}
              </div>
              <div className="text-sm text-slate-600">Foreign Keys</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Table List Sidebar */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Database Tables</h2>
              
              <div className="space-y-2">
                {MOCK_SCHEMA_TABLES.map(table => (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedTable === table.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-semibold">{table.name}</div>
                    <div className={`text-sm mt-1 ${
                      selectedTable === table.id ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {table.fields.length} fields
                    </div>
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showIndexes}
                    onChange={(e) => setShowIndexes(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Show Indexes</span>
                </label>
              </div>
            </div>
          </div>

          {/* Table Details */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentTable.name}</h2>
                <p className="text-slate-600">{currentTable.description}</p>
              </div>

              {/* Fields Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Field Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Constraints</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTable.fields.map(field => (
                      <tr key={field.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-sm text-slate-800">{field.name}</span>
                            {field.primaryKey && (
                              <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded">
                                PK
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm text-blue-600">{field.type}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {!field.nullable && (
                              <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                NOT NULL
                              </span>
                            )}
                            {field.foreignKey && (
                              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                                FK → {field.foreignKey}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">
                          {field.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Indexes */}
              {showIndexes && currentTable.indexes.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Indexes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {currentTable.indexes.map((index, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-mono text-sm text-slate-700">{index}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SQL Example */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">SQL Create Statement</h3>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-green-400 font-mono">
                    <code>{`CREATE TABLE ${currentTable.name} (
${currentTable.fields.map(f => 
  `  ${f.name} ${f.type}${!f.nullable ? ' NOT NULL' : ''}${f.primaryKey ? ' PRIMARY KEY' : ''}`
).join(',\n')}
);`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
