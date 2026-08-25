/**
 * RegisteredUserInputs — Search and filter registered users with matching results display
 *
 * Features: user search input, email filter, status filter, real-time matching results, user card display
 *
 * Ticket: SCRUM-1200 | Branch: proto/SCRUM-1199
 */

import React, { useState } from 'react'

interface RegisteredUser {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
  lastLogin: string
}

const MOCK_USERS: RegisteredUser[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    status: 'active',
    joinDate: '2024-01-15',
    lastLogin: '2024-03-20'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    status: 'active',
    joinDate: '2024-02-10',
    lastLogin: '2024-03-19'
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol.williams@example.com',
    status: 'inactive',
    joinDate: '2023-11-05',
    lastLogin: '2024-01-15'
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.brown@example.com',
    status: 'pending',
    joinDate: '2024-03-18',
    lastLogin: '2024-03-18'
  },
  {
    id: 5,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    status: 'active',
    joinDate: '2024-01-22',
    lastLogin: '2024-03-21'
  },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank.miller@example.com',
    status: 'inactive',
    joinDate: '2023-12-01',
    lastLogin: '2024-02-28'
  },
  {
    id: 7,
    name: 'Grace Wilson',
    email: 'grace.wilson@example.com',
    status: 'active',
    joinDate: '2024-02-14',
    lastLogin: '2024-03-20'
  }
]

export default function RegisteredUserInputs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [emailFilter, setEmailFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesEmail = emailFilter === '' || 
      user.email.toLowerCase().includes(emailFilter.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter

    return matchesSearch && matchesEmail && matchesStatus
  })

  const handleReset = () => {
    setSearchTerm('')
    setEmailFilter('')
    setStatusFilter('all')
  }

  return (
    <div data-testid="registereduserinputs" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Registered Users Search
          </h1>
          <p className="text-gray-600">
            Search and filter registered users to find matching results
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Search Filters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="search-name" className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name
              </label>
              <input
                id="search-name"
                type="text"
                data-testid="registereduserinputs-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="search-email" className="block text-sm font-medium text-gray-700 mb-2">
                Search by Email
              </label>
              <input
                id="search-email"
                type="text"
                data-testid="registereduserinputs-email"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                placeholder="Enter email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="filter-status" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="filter-status"
                data-testid="registereduserinputs-status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              data-testid="registereduserinputs-reset"
              onClick={handleReset}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Matching Results
            </h2>
            <span className="text-sm text-gray-600 font-medium">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            </span>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No users match your search criteria</p>
              <p className="text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <ul data-testid="registereduserinputs-list" className="space-y-4">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  data-testid="registereduserinputs-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 mb-2">{user.email}</p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>
                          <span className="font-medium">Joined:</span> {user.joinDate}
                        </span>
                        <span>
                          <span className="font-medium">Last Login:</span> {user.lastLogin}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : user.status === 'inactive'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {user.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
