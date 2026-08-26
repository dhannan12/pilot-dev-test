/**
 * SetupDatabaseSchema — Displays and manages database schema for chess tournament system
 *
 * Features: schema visualization, table details, field types, relationships, constraints
 *
 * Ticket: SCRUM-1221 | Branch: proto/SCRUM-1211
 */

import React, { useState } from 'react'

interface SchemaField {
  name: string
  type: string
  nullable: boolean
  primaryKey?: boolean
  foreignKey?: string
}

interface SchemaTable {
  id: string
  name: string
  description: string
  fields: SchemaField[]
  indexes: string[]
}

const mockSchemaData: SchemaTable[] = [
  {
    id: 'tournaments',
    name: 'tournaments',
    description: 'Main tournament information and settings',
    fields: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false },
      { name: 'start_date', type: 'TIMESTAMP', nullable: false },
      { name: 'end_date', type: 'TIMESTAMP', nullable: false },
      { name: 'format', type: 'VARCHAR(50)', nullable: false },
      { name: 'status', type: 'VARCHAR(50)', nullable: false },
      { name: 'max_players', type: 'INTEGER', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false }
    ],
    indexes: ['idx_tournaments_status', 'idx_tournaments_start_date']
  },
  {
    id: 'players',
    name: 'players',
    description: 'Player profiles and ratings',
    fields: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'username', type: 'VARCHAR(100)', nullable: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false },
      { name: 'rating', type: 'INTEGER', nullable: false },
      { name: 'country', type: 'VARCHAR(100)', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false }
    ],
    indexes: ['idx_players_username', 'idx_players_email', 'idx_players_rating']
  },
  {
    id: 'tournament_participants',
    name: 'tournament_participants',
    description: 'Links players to tournaments with registration details',
    fields: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'tournament_id', type: 'UUID', nullable: false, foreignKey: 'tournaments.id' },
      { name: 'player_id', type: 'UUID', nullable: false, foreignKey: 'players.id' },
      { name: 'seed_number', type: 'INTEGER', nullable: true },
      { name: 'registration_date', type: 'TIMESTAMP', nullable: false },
      { name: 'status', type: 'VARCHAR(50)', nullable: false }
    ],
    indexes: ['idx_participants_tournament', 'idx_participants_player', 'idx_participants_status']
  },
  {
    id: 'matches',
    name: 'matches',
    description: 'Individual matches between players in tournaments',
    fields: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'tournament_id', type: 'UUID', nullable: false, foreignKey: 'tournaments.id' },
      { name: 'white_player_id', type: 'UUID', nullable: false, foreignKey: 'players.id' },
      { name: 'black_player_id', type: 'UUID', nullable: false, foreignKey: 'players.id' },
      { name: 'round_number', type: 'INTEGER', nullable: false },
      { name: 'board_number', type: 'INTEGER', nullable: true },
      { name: 'result', type: 'VARCHAR(20)', nullable: true },
      { name: 'pgn_data', type: 'TEXT', nullable: true },
      { name: 'scheduled_at', type: 'TIMESTAMP', nullable: true },
      { name: 'completed_at', type: 'TIMESTAMP', nullable: true }
    ],
    indexes: ['idx_matches_tournament', 'idx_matches_round', 'idx_matches_players']
  },
  {
    id: 'match_results',
    name: 'match_results',
    description: 'Detailed results and statistics for completed matches',
    fields: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'match_id', type: 'UUID', nullable: false, foreignKey: 'matches.id' },
      { name: 'winner_id', type: 'UUID', nullable: true, foreignKey: 'players.id' },
      { name: 'white_score', type: 'DECIMAL(3,1)', nullable: false },
      { name: 'black_score', type: 'DECIMAL(3,1)', nullable: false },
      { name: 'move_count', type: 'INTEGER', nullable: true },
      { name: 'time_control', type: 'VARCHAR(50)', nullable: true },
      { name: 'termination_reason', type: 'VARCHAR(100)', nullable: true }
    ],
    indexes: ['idx_results_match', 'idx_results_winner']
  },
  {
    id: 'standings',
    name: 'standings',
    description: 'Current tournament standings and player rankings',
    fields: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'tournament_id', type: 'UUID', nullable: false, foreignKey: 'tournaments.id' },
      { name: 'player_id', type: 'UUID', nullable: false, foreignKey: 'players.id' },
      { name: 'rank', type: 'INTEGER', nullable: false },
      { name: 'points', type: 'DECIMAL(4,1)', nullable: false },
      { name: 'wins', type: 'INTEGER', nullable: false },
      { name: 'draws', type: 'INTEGER', nullable: false },
      { name: 'losses', type: 'INTEGER', nullable: false },
      { name: 'tiebreak_score', type: 'DECIMAL(6,2)', nullable: true },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false }
    ],
    indexes: ['idx_standings_tournament', 'idx_standings_rank', 'idx_standings_points']
  },
  {
    id: 'pairings',
    name: 'pairings',
    description: 'Algorithmic pairing data and round assignments',
    fields: [
      { name: 'id', type: 'UUID', nullable: false, primaryKey: true },
      { name: 'tournament_id', type: 'UUID', nullable: false, foreignKey: 'tournaments.id' },
      { name: 'round_number', type: 'INTEGER', nullable: false },
      { name: 'pairing_algorithm', type: 'VARCHAR(50)', nullable: false },
      { name: 'bye_player_id', type: 'UUID', nullable: true, foreignKey: 'players.id' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ],
    indexes: ['idx_pairings_tournament', 'idx_pairings_round']
  }
]

export default function SetupDatabaseSchema() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTables = mockSchemaData.filter(
    table =>
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(selectedTable === tableId ? null : tableId)
  }

  const selectedTableData = mockSchemaData.find(t => t.id === selectedTable)

  return (
    <div data-testid="setupdatabaseschema" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tournament Database Schema
          </h1>
          <p className="text-gray-600">
            Complete database schema for chess tournament management system
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            data-testid="setupdatabaseschema-search"
            type="text"
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{mockSchemaData.length}</div>
            <div className="text-gray-600 text-sm">Total Tables</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {mockSchemaData.reduce((sum, t) => sum + t.fields.length, 0)}
            </div>
            <div className="text-gray-600 text-sm">Total Fields</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {mockSchemaData.reduce((sum, t) => sum + t.indexes.length, 0)}
            </div>
            <div className="text-gray-600 text-sm">Total Indexes</div>
          </div>
        </div>

        {/* Tables List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Schema Tables</h2>
          </div>
          
          <div data-testid="setupdatabaseschema-list" className="divide-y divide-gray-200">
            {filteredTables.map((table) => (
              <div key={table.id} data-testid="setupdatabaseschema-item" className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 font-mono">
                        {table.name}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {table.fields.length} fields
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {table.indexes.length} indexes
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{table.description}</p>
                  </div>
                  <button
                    data-testid="setupdatabaseschema-toggle"
                    onClick={() => handleTableSelect(table.id)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {selectedTable === table.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedTable === table.id && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    {/* Fields */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Fields:</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Field Name</th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Type</th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Nullable</th>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Constraints</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {table.fields.map((field) => (
                              <tr key={field.name}>
                                <td className="px-4 py-2 text-sm font-mono text-gray-900">{field.name}</td>
                                <td className="px-4 py-2 text-sm font-mono text-gray-700">{field.type}</td>
                                <td className="px-4 py-2 text-sm">
                                  <span className={`px-2 py-1 rounded text-xs ${field.nullable ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                    {field.nullable ? 'NULL' : 'NOT NULL'}
                                  </span>
                                </td>
                                <td className="px-4 py-2 text-sm">
                                  <div className="flex gap-1 flex-wrap">
                                    {field.primaryKey && (
                                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                                        PRIMARY KEY
                                      </span>
                                    )}
                                    {field.foreignKey && (
                                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-mono">
                                        FK → {field.foreignKey}
                                      </span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Indexes */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Indexes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {table.indexes.map((index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-mono"
                          >
                            {index}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            data-testid="setupdatabaseschema-export"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Export Schema
          </button>
          <button
            data-testid="setupdatabaseschema-validate"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Validate Schema
          </button>
          <button
            data-testid="setupdatabaseschema-migrate"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Generate Migration
          </button>
        </div>
      </div>
    </div>
  )
}
