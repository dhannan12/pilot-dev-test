/**
 * AdminApprovesNew — Admin interface for approving new member registrations
 *
 * Features: pending registration list, member details display, approve/reject actions, status tracking, search filter
 *
 * Ticket: SCRUM-1266 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface PendingMember {
  id: string
  name: string
  email: string
  phone: string
  membershipType: string
  appliedDate: string
  status: 'pending' | 'approved' | 'rejected'
}

const MOCK_PENDING_MEMBERS: PendingMember[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '555-0101',
    membershipType: 'Premium',
    appliedDate: '2026-08-28',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '555-0102',
    membershipType: 'Standard',
    appliedDate: '2026-08-27',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '555-0103',
    membershipType: 'Premium',
    appliedDate: '2026-08-26',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '555-0104',
    membershipType: 'Basic',
    appliedDate: '2026-08-25',
    status: 'pending'
  },
  {
    id: '5',
    name: 'David Thompson',
    email: 'dthompson@email.com',
    phone: '555-0105',
    membershipType: 'Standard',
    appliedDate: '2026-08-24',
    status: 'pending'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '555-0106',
    membershipType: 'Premium',
    appliedDate: '2026-08-23',
    status: 'pending'
  }
]

export default function AdminApprovesNew() {
  const [members, setMembers] = useState<PendingMember[]>(MOCK_PENDING_MEMBERS)
  const [searchTerm, setSearchTerm] = useState('')

  const handleApprove = (id: string) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, status: 'approved' as const } : member
      )
    )
  }

  const handleReject = (id: string) => {
    setMembers(prev =>
      prev.map(member =>
        member.id === id ? { ...member, status: 'rejected' as const } : member
      )
    )
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pendingCount = members.filter(m => m.status === 'pending').length
  const approvedCount = members.filter(m => m.status === 'approved').length
  const rejectedCount = members.filter(m => m.status === 'rejected').length

  return (
    <section data-testid="adminapprovesnew" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Member Registration Approvals
          </h1>
          <p className="text-gray-600">
            Review and approve new member registrations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-yellow-800 text-sm font-medium">Pending</div>
            <div className="text-3xl font-bold text-yellow-900">{pendingCount}</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-green-800 text-sm font-medium">Approved</div>
            <div className="text-3xl font-bold text-green-900">{approvedCount}</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800 text-sm font-medium">Rejected</div>
            <div className="text-3xl font-bold text-red-900">{rejectedCount}</div>
          </div>
        </div>

        {/* Search Filter */}
        <div className="mb-6">
          <input
            type="text"
            data-testid="adminapprovesnew-search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Members List */}
        <div data-testid="adminapprovesnew-list" className="space-y-4">
          {filteredMembers.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              No members found
            </div>
          ) : (
            filteredMembers.map((member) => (
              <div
                key={member.id}
                data-testid="adminapprovesnew-item"
                className={`bg-white rounded-lg shadow p-6 transition-all ${
                  member.status === 'approved'
                    ? 'border-l-4 border-green-500 bg-green-50'
                    : member.status === 'rejected'
                    ? 'border-l-4 border-red-500 bg-red-50'
                    : 'border-l-4 border-yellow-500'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Member Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : member.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Email:</span>
                        <span className="text-gray-900">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Phone:</span>
                        <span className="text-gray-900">{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Membership:</span>
                        <span className="text-gray-900 font-semibold">
                          {member.membershipType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Applied:</span>
                        <span className="text-gray-900">{member.appliedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {member.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        data-testid="adminapprovesnew-approve"
                        onClick={() => handleApprove(member.id)}
                        className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Approve
                      </button>
                      <button
                        data-testid="adminapprovesnew-reject"
                        onClick={() => handleReject(member.id)}
                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {member.status === 'approved' && (
                    <div className="text-green-700 font-semibold flex items-center gap-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Approved
                    </div>
                  )}

                  {member.status === 'rejected' && (
                    <div className="text-red-700 font-semibold flex items-center gap-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Rejected
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
