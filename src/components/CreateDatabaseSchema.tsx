/**
 * CreateDatabaseSchema — Database schema visualization for dental clinic system
 *
 * Features: table definitions, column types, relationships, constraints, indexing
 *
 * Ticket: SCRUM-756 | Branch: proto/SCRUM-747
 */

import React, { useState } from 'react';

interface Column {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey?: boolean;
  foreignKey?: string;
  unique?: boolean;
  defaultValue?: string;
}

interface Table {
  id: string;
  name: string;
  description: string;
  columns: Column[];
  indexes: string[];
}

const MOCK_SCHEMA: Table[] = [
  {
    id: 'patients',
    name: 'patients',
    description: 'Patient records and contact information',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, unique: true },
      { name: 'phone', type: 'VARCHAR(20)', nullable: false },
      { name: 'date_of_birth', type: 'DATE', nullable: false },
      { name: 'address', type: 'TEXT', nullable: true },
      { name: 'insurance_provider', type: 'VARCHAR(100)', nullable: true },
      { name: 'insurance_policy_number', type: 'VARCHAR(50)', nullable: true },
      { name: 'emergency_contact_name', type: 'VARCHAR(100)', nullable: true },
      { name: 'emergency_contact_phone', type: 'VARCHAR(20)', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
    ],
    indexes: ['idx_patients_email', 'idx_patients_phone', 'idx_patients_last_name'],
  },
  {
    id: 'dentists',
    name: 'dentists',
    description: 'Dental practitioners and their specializations',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, unique: true },
      { name: 'phone', type: 'VARCHAR(20)', nullable: false },
      { name: 'specialization', type: 'VARCHAR(100)', nullable: false },
      { name: 'license_number', type: 'VARCHAR(50)', nullable: false, unique: true },
      { name: 'years_of_experience', type: 'INTEGER', nullable: false },
      { name: 'bio', type: 'TEXT', nullable: true },
      { name: 'available_days', type: 'VARCHAR(50)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
    ],
    indexes: ['idx_dentists_email', 'idx_dentists_license_number', 'idx_dentists_specialization'],
  },
  {
    id: 'appointments',
    name: 'appointments',
    description: 'Scheduled appointments between patients and dentists',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'patient_id', type: 'UUID', nullable: false, foreignKey: 'patients(id)' },
      { name: 'dentist_id', type: 'UUID', nullable: false, foreignKey: 'dentists(id)' },
      { name: 'appointment_date', type: 'DATE', nullable: false },
      { name: 'appointment_time', type: 'TIME', nullable: false },
      { name: 'duration_minutes', type: 'INTEGER', nullable: false, defaultValue: '30' },
      { name: 'appointment_type', type: 'VARCHAR(50)', nullable: false },
      { name: 'status', type: 'VARCHAR(20)', nullable: false, defaultValue: "'scheduled'" },
      { name: 'notes', type: 'TEXT', nullable: true },
      { name: 'reminder_sent', type: 'BOOLEAN', nullable: false, defaultValue: 'false' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
    ],
    indexes: [
      'idx_appointments_patient_id',
      'idx_appointments_dentist_id',
      'idx_appointments_date',
      'idx_appointments_status',
    ],
  },
  {
    id: 'treatments',
    name: 'treatments',
    description: 'Available dental treatments and procedures',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(100)', nullable: false },
      { name: 'description', type: 'TEXT', nullable: false },
      { name: 'category', type: 'VARCHAR(50)', nullable: false },
      { name: 'duration_minutes', type: 'INTEGER', nullable: false },
      { name: 'base_price', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'requires_anesthesia', type: 'BOOLEAN', nullable: false, defaultValue: 'false' },
      { name: 'prerequisites', type: 'TEXT', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
    ],
    indexes: ['idx_treatments_category', 'idx_treatments_name'],
  },
  {
    id: 'patient_treatments',
    name: 'patient_treatments',
    description: 'Record of treatments performed on patients',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'patient_id', type: 'UUID', nullable: false, foreignKey: 'patients(id)' },
      { name: 'dentist_id', type: 'UUID', nullable: false, foreignKey: 'dentists(id)' },
      { name: 'treatment_id', type: 'UUID', nullable: false, foreignKey: 'treatments(id)' },
      { name: 'appointment_id', type: 'UUID', nullable: false, foreignKey: 'appointments(id)' },
      { name: 'treatment_date', type: 'DATE', nullable: false },
      { name: 'tooth_number', type: 'VARCHAR(10)', nullable: true },
      { name: 'notes', type: 'TEXT', nullable: true },
      { name: 'complications', type: 'TEXT', nullable: true },
      { name: 'follow_up_required', type: 'BOOLEAN', nullable: false, defaultValue: 'false' },
      { name: 'follow_up_date', type: 'DATE', nullable: true },
      { name: 'amount_charged', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
    ],
    indexes: [
      'idx_patient_treatments_patient_id',
      'idx_patient_treatments_dentist_id',
      'idx_patient_treatments_treatment_id',
      'idx_patient_treatments_appointment_id',
    ],
  },
  {
    id: 'medical_history',
    name: 'medical_history',
    description: 'Patient medical history and conditions',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'patient_id', type: 'UUID', nullable: false, foreignKey: 'patients(id)' },
      { name: 'condition', type: 'VARCHAR(200)', nullable: false },
      { name: 'diagnosed_date', type: 'DATE', nullable: true },
      { name: 'current_medication', type: 'TEXT', nullable: true },
      { name: 'allergies', type: 'TEXT', nullable: true },
      { name: 'notes', type: 'TEXT', nullable: true },
      { name: 'is_active', type: 'BOOLEAN', nullable: false, defaultValue: 'true' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
    ],
    indexes: ['idx_medical_history_patient_id', 'idx_medical_history_is_active'],
  },
  {
    id: 'billing',
    name: 'billing',
    description: 'Billing and payment records',
    columns: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'patient_id', type: 'UUID', nullable: false, foreignKey: 'patients(id)' },
      { name: 'appointment_id', type: 'UUID', nullable: true, foreignKey: 'appointments(id)' },
      { name: 'total_amount', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'amount_paid', type: 'DECIMAL(10,2)', nullable: false, defaultValue: '0.00' },
      { name: 'amount_due', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'payment_method', type: 'VARCHAR(50)', nullable: true },
      { name: 'payment_status', type: 'VARCHAR(20)', nullable: false, defaultValue: "'pending'" },
      { name: 'invoice_number', type: 'VARCHAR(50)', nullable: false, unique: true },
      { name: 'invoice_date', type: 'DATE', nullable: false },
      { name: 'due_date', type: 'DATE', nullable: false },
      { name: 'notes', type: 'TEXT', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, defaultValue: 'NOW()' },
    ],
    indexes: [
      'idx_billing_patient_id',
      'idx_billing_invoice_number',
      'idx_billing_payment_status',
      'idx_billing_due_date',
    ],
  },
];

export default function CreateDatabaseSchema() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');

  const getColumnBadgeColor = (column: Column): string => {
    if (column.primaryKey) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (column.foreignKey) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (column.unique) return 'bg-purple-100 text-purple-800 border-purple-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getColumnIcon = (column: Column): string => {
    if (column.primaryKey) return '🔑';
    if (column.foreignKey) return '🔗';
    if (column.unique) return '⭐';
    return '📊';
  };

  const selectedTableData = selectedTable
    ? MOCK_SCHEMA.find((t) => t.id === selectedTable)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dental Clinic Database Schema
              </h1>
              <p className="text-gray-600">
                Comprehensive database design for patient management and appointments
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('detail')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'detail'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Detail View
              </button>
            </div>
          </div>

          {/* Schema Statistics */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-900">{MOCK_SCHEMA.length}</div>
              <div className="text-sm text-blue-700">Total Tables</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-900">
                {MOCK_SCHEMA.reduce((sum, t) => sum + t.columns.length, 0)}
              </div>
              <div className="text-sm text-green-700">Total Columns</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-900">
                {MOCK_SCHEMA.reduce(
                  (sum, t) => sum + t.columns.filter((c) => c.foreignKey).length,
                  0
                )}
              </div>
              <div className="text-sm text-purple-700">Foreign Keys</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="text-2xl font-bold text-orange-900">
                {MOCK_SCHEMA.reduce((sum, t) => sum + t.indexes.length, 0)}
              </div>
              <div className="text-sm text-orange-700">Total Indexes</div>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SCHEMA.map((table) => (
              <div
                key={table.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-400"
                onClick={() => {
                  setSelectedTable(table.id);
                  setViewMode('detail');
                }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
                  <h3 className="text-lg font-bold mb-1">{table.name}</h3>
                  <p className="text-sm text-blue-100">{table.description}</p>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Columns:</span>
                      <span className="font-semibold text-gray-900">{table.columns.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Indexes:</span>
                      <span className="font-semibold text-gray-900">{table.indexes.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Primary Key:</span>
                      <span className="font-semibold text-gray-900">
                        {table.columns.find((c) => c.primaryKey)?.name || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Foreign Keys:</span>
                      <span className="font-semibold text-gray-900">
                        {table.columns.filter((c) => c.foreignKey).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail View */}
        {viewMode === 'detail' && (
          <div className="space-y-6">
            {/* Table Selector */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Table
              </label>
              <select
                value={selectedTable || ''}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a table...</option>
                {MOCK_SCHEMA.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name} ({table.columns.length} columns)
                  </option>
                ))}
              </select>
            </div>

            {/* Table Details */}
            {selectedTableData && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedTableData.name}</h2>
                  <p className="text-blue-100">{selectedTableData.description}</p>
                </div>

                {/* Columns Table */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Columns</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-300">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Column
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Nullable
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Constraints
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Default
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedTableData.columns.map((column, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{getColumnIcon(column)}</span>
                                <span className="font-medium text-gray-900">{column.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800">
                                {column.type}
                              </code>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  column.nullable
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {column.nullable ? 'YES' : 'NO'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {column.primaryKey && (
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-300">
                                    PRIMARY KEY
                                  </span>
                                )}
                                {column.foreignKey && (
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-300">
                                    FK → {column.foreignKey}
                                  </span>
                                )}
                                {column.unique && (
                                  <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 border border-purple-300">
                                    UNIQUE
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {column.defaultValue ? (
                                <code className="bg-blue-50 px-2 py-1 rounded text-xs text-blue-900">
                                  {column.defaultValue}
                                </code>
                              ) : (
                                <span className="text-gray-400 text-sm">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Indexes */}
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Indexes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedTableData.indexes.map((index, idx) => (
                      <div
                        key={idx}
                        className="bg-orange-50 border border-orange-200 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-orange-600">🔍</span>
                          <code className="text-sm font-medium text-orange-900">{index}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
