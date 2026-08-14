/**
 * UserAttempts — Displays unauthorized access attempts by non-admin users
 *
 * Features: Access log display, timestamp tracking, user identification, attempt reason, security monitoring
 *
 * Ticket: SCRUM-832 | Branch: proto/SCRUM-828
 */

import React from 'react';

interface AccessAttempt {
  id: string;
  userId: string;
  username: string;
  email: string;
  attemptedResource: string;
  timestamp: string;
  ipAddress: string;
  reason: string;
  userRole: string;
}

const MOCK_ATTEMPTS: AccessAttempt[] = [
  {
    id: 'att-001',
    userId: 'usr-1234',
    username: 'john_doe',
    email: 'john.doe@example.com',
    attemptedResource: '/admin/inbox',
    timestamp: '2026-08-14T10:23:45Z',
    ipAddress: '192.168.1.105',
    reason: 'Insufficient permissions',
    userRole: 'user'
  },
  {
    id: 'att-002',
    userId: 'usr-5678',
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    attemptedResource: '/admin/inbox',
    timestamp: '2026-08-14T09:15:22Z',
    ipAddress: '192.168.1.142',
    reason: 'Insufficient permissions',
    userRole: 'user'
  },
  {
    id: 'att-003',
    userId: 'usr-9012',
    username: 'mike_wilson',
    email: 'mike.wilson@example.com',
    attemptedResource: '/admin/inbox',
    timestamp: '2026-08-14T08:47:33Z',
    ipAddress: '192.168.1.88',
    reason: 'Insufficient permissions',
    userRole: 'guest'
  },
  {
    id: 'att-004',
    userId: 'usr-3456',
    username: 'sarah_jones',
    email: 'sarah.jones@example.com',
    attemptedResource: '/admin/inbox',
    timestamp: '2026-08-13T16:32:10Z',
    ipAddress: '192.168.1.201',
    reason: 'Insufficient permissions',
    userRole: 'user'
  },
  {
    id: 'att-005',
    userId: 'usr-7890',
    username: 'robert_brown',
    email: 'robert.brown@example.com',
    attemptedResource: '/admin/inbox',
    timestamp: '2026-08-13T14:28:55Z',
    ipAddress: '192.168.1.156',
    reason: 'Insufficient permissions',
    userRole: 'user'
  },
  {
    id: 'att-006',
    userId: 'usr-2468',
    username: 'emily_davis',
    email: 'emily.davis@example.com',
    attemptedResource: '/admin/inbox',
    timestamp: '2026-08-13T11:05:18Z',
    ipAddress: '192.168.1.73',
    reason: 'Insufficient permissions',
    userRole: 'user'
  },
  {
    id: 'att-007',
    userId: 'usr-1357',
    username: 'david_miller',
    email: 'david.miller@example.com',
    attemptedResource: '/admin/inbox',
    timestamp: '2026-08-12T17:44:29Z',
    ipAddress: '192.168.1.199',
    reason: 'Insufficient permissions',
    userRole: 'guest'
  }
];

export default function UserAttempts() {
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadgeColor = (role: string): string => {
    switch (role) {
      case 'admin':
        return 'bg-green-100 text-green-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      case 'guest':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Unauthorized Access Attempts
              </h1>
              <p className="text-gray-600 mt-1">
                Security log of non-admin users attempting to access the admin inbox
              </p>
            </div>
            <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-200">
              <p className="text-sm text-gray-600">Total Attempts</p>
              <p className="text-2xl font-bold text-red-600">{MOCK_ATTEMPTS.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Attempted Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_ATTEMPTS.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {attempt.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {attempt.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(attempt.userRole)}`}>
                        {attempt.userRole}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded">
                        {attempt.attemptedResource}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatTimestamp(attempt.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-600">
                        {attempt.ipAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded bg-red-100 text-red-800">
                        {attempt.reason}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Security Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  All unauthorized access attempts are logged and monitored. 
                  Users attempting to access restricted areas without proper permissions 
                  will be denied and their attempts recorded for security purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
