/**
 * CreateTasks — Display and manage tasks database table schema
 *
 * Features: schema visualization, field types, constraints display, table metadata, SQL preview
 *
 * Ticket: SCRUM-850 | Branch: proto/SCRUM-841
 */

import React, { useState } from 'react';

interface TableField {
  id: string;
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  defaultValue?: string;
  description: string;
}

interface TableSchema {
  tableName: string;
  fields: TableField[];
  indexes: string[];
  createdAt: string;
}

const MOCK_TASKS_SCHEMA: TableSchema = {
  tableName: 'tasks',
  fields: [
    {
      id: '1',
      name: 'id',
      type: 'INTEGER',
      nullable: false,
      primaryKey: true,
      description: 'Primary key, auto-incrementing task ID'
    },
    {
      id: '2',
      name: 'title',
      type: 'VARCHAR(255)',
      nullable: false,
      primaryKey: false,
      description: 'Task title or name'
    },
    {
      id: '3',
      name: 'description',
      type: 'TEXT',
      nullable: true,
      primaryKey: false,
      description: 'Detailed task description'
    },
    {
      id: '4',
      name: 'status',
      type: 'VARCHAR(50)',
      nullable: false,
      primaryKey: false,
      defaultValue: 'pending',
      description: 'Task status (pending, in_progress, completed)'
    },
    {
      id: '5',
      name: 'priority',
      type: 'INTEGER',
      nullable: false,
      primaryKey: false,
      defaultValue: '0',
      description: 'Task priority (0=low, 1=medium, 2=high)'
    },
    {
      id: '6',
      name: 'assigned_to',
      type: 'INTEGER',
      nullable: true,
      primaryKey: false,
      description: 'Foreign key to users table'
    },
    {
      id: '7',
      name: 'due_date',
      type: 'TIMESTAMP',
      nullable: true,
      primaryKey: false,
      description: 'Task due date'
    },
    {
      id: '8',
      name: 'created_at',
      type: 'TIMESTAMP',
      nullable: false,
      primaryKey: false,
      defaultValue: 'CURRENT_TIMESTAMP',
      description: 'Record creation timestamp'
    },
    {
      id: '9',
      name: 'updated_at',
      type: 'TIMESTAMP',
      nullable: false,
      primaryKey: false,
      defaultValue: 'CURRENT_TIMESTAMP',
      description: 'Record last update timestamp'
    }
  ],
  indexes: [
    'PRIMARY KEY (id)',
    'INDEX idx_status (status)',
    'INDEX idx_assigned_to (assigned_to)',
    'INDEX idx_due_date (due_date)',
    'FOREIGN KEY (assigned_to) REFERENCES users(id)'
  ],
  createdAt: '2026-08-14'
};

export default function CreateTasks() {
  const [showSQL, setShowSQL] = useState(false);

  const generateSQL = () => {
    const fields = MOCK_TASKS_SCHEMA.fields.map(field => {
      let line = `  ${field.name} ${field.type}`;
      if (!field.nullable) line += ' NOT NULL';
      if (field.defaultValue) line += ` DEFAULT ${field.defaultValue}`;
      return line;
    }).join(',\n');

    return `CREATE TABLE ${MOCK_TASKS_SCHEMA.tableName} (\n${fields}\n);\n\n-- Indexes\n${MOCK_TASKS_SCHEMA.indexes.map(idx => `ALTER TABLE ${MOCK_TASKS_SCHEMA.tableName} ADD ${idx};`).join('\n')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tasks Table Schema
              </h1>
              <p className="text-gray-600">
                Database schema definition for the tasks table
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Table Name</div>
              <div className="text-xl font-mono font-bold text-blue-600">
                {MOCK_TASKS_SCHEMA.tableName}
              </div>
            </div>
          </div>
        </div>

        {/* Schema Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Total Fields</div>
            <div className="text-2xl font-bold text-gray-900">
              {MOCK_TASKS_SCHEMA.fields.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Indexes</div>
            <div className="text-2xl font-bold text-gray-900">
              {MOCK_TASKS_SCHEMA.indexes.length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Created</div>
            <div className="text-2xl font-bold text-gray-900">
              {MOCK_TASKS_SCHEMA.createdAt}
            </div>
          </div>
        </div>

        {/* Fields Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Table Fields</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Field Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Nullable
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Primary Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Default
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {MOCK_TASKS_SCHEMA.fields.map((field) => (
                  <tr key={field.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-medium text-gray-900">
                        {field.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-mono rounded">
                        {field.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.nullable ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.primaryKey ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                          PK
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {field.defaultValue ? (
                        <span className="font-mono text-xs text-gray-700">
                          {field.defaultValue}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {field.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Indexes Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-green-600 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Indexes & Constraints</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-2">
              {MOCK_TASKS_SCHEMA.indexes.map((index, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-mono text-sm text-gray-800 bg-gray-50 px-3 py-2 rounded flex-1">
                    {index}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SQL Preview */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">SQL Script</h2>
            <button
              onClick={() => setShowSQL(!showSQL)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors"
            >
              {showSQL ? 'Hide' : 'Show'} SQL
            </button>
          </div>
          {showSQL && (
            <div className="p-6 bg-gray-900">
              <pre className="text-green-400 font-mono text-sm overflow-x-auto whitespace-pre">
                {generateSQL()}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
