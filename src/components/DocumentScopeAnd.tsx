/**
 * DocumentScopeAnd — Displays project scope and constraints documentation
 *
 * Features: scope visualization, constraint listing, timeline display, deliverable tracking, stakeholder info
 *
 * Ticket: SCRUM-826 | Branch: proto/SCRUM-823
 */

import React from 'react';

interface ScopeItem {
  id: string;
  title: string;
  description: string;
  status: 'in-scope' | 'out-of-scope' | 'deferred';
  priority: 'high' | 'medium' | 'low';
}

interface Constraint {
  id: string;
  category: 'technical' | 'budget' | 'timeline' | 'resource' | 'regulatory';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

const SCOPE_ITEMS: ScopeItem[] = [
  {
    id: 'scope-1',
    title: 'User Authentication System',
    description: 'Implement secure login, registration, and password recovery with OAuth2 integration',
    status: 'in-scope',
    priority: 'high'
  },
  {
    id: 'scope-2',
    title: 'Real-time Dashboard',
    description: 'Interactive dashboard with live data updates and customizable widgets',
    status: 'in-scope',
    priority: 'high'
  },
  {
    id: 'scope-3',
    title: 'Mobile Native Apps',
    description: 'iOS and Android native applications for mobile users',
    status: 'out-of-scope',
    priority: 'medium'
  },
  {
    id: 'scope-4',
    title: 'Advanced Analytics',
    description: 'Machine learning-powered predictive analytics and reporting tools',
    status: 'deferred',
    priority: 'medium'
  },
  {
    id: 'scope-5',
    title: 'API Integration Layer',
    description: 'RESTful API with comprehensive documentation and third-party integrations',
    status: 'in-scope',
    priority: 'high'
  },
  {
    id: 'scope-6',
    title: 'Offline Mode Support',
    description: 'Full application functionality without internet connectivity',
    status: 'out-of-scope',
    priority: 'low'
  },
  {
    id: 'scope-7',
    title: 'Email Notification System',
    description: 'Automated email alerts and digest notifications for key events',
    status: 'in-scope',
    priority: 'medium'
  }
];

const CONSTRAINTS: Constraint[] = [
  {
    id: 'const-1',
    category: 'timeline',
    title: 'Project Delivery Deadline',
    description: 'MVP must be delivered by Q4 2026, limiting scope to essential features only',
    impact: 'high'
  },
  {
    id: 'const-2',
    category: 'budget',
    title: 'Development Budget Cap',
    description: 'Total development budget limited to $500,000 including infrastructure costs',
    impact: 'high'
  },
  {
    id: 'const-3',
    category: 'technical',
    title: 'Legacy System Integration',
    description: 'Must integrate with existing SQL Server 2016 database without major schema changes',
    impact: 'medium'
  },
  {
    id: 'const-4',
    category: 'regulatory',
    title: 'GDPR Compliance Required',
    description: 'All data handling must comply with EU GDPR regulations and data protection standards',
    impact: 'high'
  },
  {
    id: 'const-5',
    category: 'resource',
    title: 'Team Size Limitation',
    description: 'Development team limited to 5 full-time engineers due to hiring constraints',
    impact: 'medium'
  },
  {
    id: 'const-6',
    category: 'technical',
    title: 'Browser Support Requirements',
    description: 'Must support IE11+ and all modern browsers, limiting use of latest web APIs',
    impact: 'medium'
  }
];

export default function DocumentScopeAnd() {
  const getStatusColor = (status: ScopeItem['status']) => {
    switch (status) {
      case 'in-scope':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'out-of-scope':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'deferred':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 font-semibold';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category: Constraint['category']) => {
    switch (category) {
      case 'technical':
        return '⚙️';
      case 'budget':
        return '💰';
      case 'timeline':
        return '⏰';
      case 'resource':
        return '👥';
      case 'regulatory':
        return '📋';
    }
  };

  const inScopeCount = SCOPE_ITEMS.filter(item => item.status === 'in-scope').length;
  const outOfScopeCount = SCOPE_ITEMS.filter(item => item.status === 'out-of-scope').length;
  const deferredCount = SCOPE_ITEMS.filter(item => item.status === 'deferred').length;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Project Scope & Constraints
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive documentation of project boundaries and limitations
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-gray-900">{SCOPE_ITEMS.length}</div>
            <div className="text-sm text-gray-600 mt-1">Total Scope Items</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
            <div className="text-3xl font-bold text-green-700">{inScopeCount}</div>
            <div className="text-sm text-green-700 mt-1">In Scope</div>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-sm border border-red-200">
            <div className="text-3xl font-bold text-red-700">{outOfScopeCount}</div>
            <div className="text-sm text-red-700 mt-1">Out of Scope</div>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg shadow-sm border border-orange-200">
            <div className="text-3xl font-bold text-orange-700">{CONSTRAINTS.length}</div>
            <div className="text-sm text-orange-700 mt-1">Active Constraints</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scope Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                Project Scope
              </h2>
              <p className="text-gray-600 mb-6">
                Features and deliverables included in the project plan
              </p>

              <div className="space-y-4">
                {SCOPE_ITEMS.map(item => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 flex-1">
                        {item.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(item.priority)}`}>
                        {item.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center">
                      <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Constraints Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">⚠️</span>
                Project Constraints
              </h2>
              <p className="text-gray-600 mb-6">
                Limitations and restrictions affecting project execution
              </p>

              <div className="space-y-4">
                {CONSTRAINTS.map(constraint => (
                  <div
                    key={constraint.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-xl">{getCategoryIcon(constraint.category)}</span>
                        <h3 className="font-semibold text-gray-900">
                          {constraint.title}
                        </h3>
                      </div>
                      <span className={`text-xs ${getImpactColor(constraint.impact)}`}>
                        {constraint.impact.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {constraint.description}
                    </p>
                    <div className="flex items-center">
                      <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                        {constraint.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This scope document is subject to change based on stakeholder feedback 
            and emerging requirements. All changes must go through the formal change control process.
          </p>
        </div>
      </div>
    </div>
  );
}
