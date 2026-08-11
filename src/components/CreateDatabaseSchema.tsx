import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Database, Table, AlertCircle } from 'lucide-react';
import { mockDatabaseSchema, mockTableStructures, mockRelationships } from './CreateDatabaseSchema.mock';

interface TableField {
  name: string;
  type: string;
  nullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  description: string;
}

interface TableStructure {
  id: string;
  name: string;
  description: string;
  fields: TableField[];
  status: 'completed' | 'in-progress' | 'pending';
}

interface Relationship {
  id: string;
  fromTable: string;
  toTable: string;
  fromField: string;
  toField: string;
  type: 'one-to-many' | 'many-to-many' | 'one-to-one';
}

const CreateDatabaseSchema: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>(mockTableStructures[0]?.id || '');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const currentTable = mockTableStructures.find((t) => t.id === selectedTable);
  const completedTables = mockTableStructures.filter((t) => t.status === 'completed').length;
  const totalTables = mockTableStructures.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'in-progress':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Database className="w-4 h-4" />;
    }
  };

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'VARCHAR':
      case 'TEXT':
        return 'bg-purple-100 text-purple-800';
      case 'INT':
      case 'BIGINT':
        return 'bg-blue-100 text-blue-800';
      case 'DECIMAL':
        return 'bg-orange-100 text-orange-800';
      case 'DATETIME':
      case 'DATE':
        return 'bg-green-100 text-green-800';
      case 'BOOLEAN':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">Database Schema</h1>
          </div>
          <p className="text-slate-600">Italian Restaurant Menu Database - SCRUM-577</p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Schema Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(completedTables / totalTables) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                {completedTables} of {totalTables} tables
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tables List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Tables</CardTitle>
                <CardDescription>Select a table to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockTableStructures.map((table) => (
                    <button
                      key={table.id}
                      onClick={() => setSelectedTable(table.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                        selectedTable === table.id
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium text-sm">{table.name}</span>
                      <Badge className={`${getStatusColor(table.status)} border-0`}>
                        {getStatusIcon(table.status)}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="structure" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="structure">Table Structure</TabsTrigger>
                <TabsTrigger value="relationships">Relationships</TabsTrigger>
                <TabsTrigger value="schema">SQL Schema</TabsTrigger>
              </TabsList>

              {/* Table Structure Tab */}
              <TabsContent value="structure" className="space-y-4">
                {currentTable && (
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{currentTable.name}</CardTitle>
                          <CardDescription>{currentTable.description}</CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(currentTable.status)} border-0`}>
                          {getStatusIcon(currentTable.status)}
                          <span className="ml-2 capitalize">{currentTable.status}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-slate-200">
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">Field Name</th>
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">Type</th>
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">Constraints</th>
                              <th className="text-left py-3 px-4 font-semibold text-slate-700">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentTable.fields.map((field, idx) => (
                              <tr
                                key={`${currentTable.id}-${idx}`}
                                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                              >
                                <td className="py-3 px-4">
                                  <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono">
                                    {field.name}
                                  </code>
                                </td>
                                <td className="py-3 px-4">
                                  <Badge className={`${getFieldTypeColor(field.type)} border-0 font-mono text-xs`}>
                                    {field.type}
                                  </Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-1 flex-wrap">
                                    {field.isPrimaryKey && (
                                      <Badge variant="outline" className="text-xs">
                                        PK
                                      </Badge>
                                    )}
                                    {field.isForeignKey && (
                                      <Badge variant="outline" className="text-xs">
                                        FK
                                      </Badge>
                                    )}
                                    {field.nullable && (
                                      <Badge variant="outline" className="text-xs">
                                        NULL
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-600">{field.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Relationships Tab */}
              <TabsContent value="relationships" className="space-y-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Table Relationships</CardTitle>
                    <CardDescription>Relationships for Italian Restaurant Menu Database</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockRelationships.map((rel) => (
                        <div
                          key={rel.id}
                          className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <code className="bg-white px-3 py-1 rounded text-sm font-mono border border-slate-200">
                                {rel.fromTable}
                              </code>
                              <span className="text-slate-500 font-semibold">
                                {rel.type === 'one-to-many' && '1:N'}
                                {rel.type === 'many-to-many' && 'N:N'}
                                {rel.type === 'one-to-one' && '1:1'}
                              </span>
                              <code className="bg-white px-3 py-1 rounded text-sm font-mono border border-slate-200">
                                {rel.toTable}
                              </code>
                            </div>
                            <Badge variant="outline" className="text-xs capitalize">
                              {rel.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600">
                            <span className="font-mono">{rel.fromTable}.{rel.fromField}</span>
                            {' → '}
                            <span className="font-mono">{rel.toTable}.{rel.toField}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SQL Schema Tab */}
              <TabsContent value="schema" className="space-y-4">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>SQL Schema Definition</CardTitle>
                    <CardDescription>Generated SQL for {currentTable?.name || 'selected table'}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                      <pre>{mockDatabaseSchema}</pre>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        Copy SQL
                      </Button>
                      <Button variant="outline" size="sm">
                        Download Schema
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDatabaseSchema;