/**
 * TeamManagerManages — Team roster management interface for coaches and managers
 *
 * Features: view team roster, add new players, remove players, edit player details, track positions and jersey numbers
 *
 * Ticket: SCRUM-1271 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface TeamMember {
  id: number
  name: string
  position: string
  jerseyNumber: number
  email: string
  status: 'active' | 'injured' | 'benched'
}

const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: 'Alex Rodriguez', position: 'Forward', jerseyNumber: 10, email: 'alex.r@team.com', status: 'active' },
  { id: 2, name: 'Jamie Chen', position: 'Midfielder', jerseyNumber: 7, email: 'jamie.c@team.com', status: 'active' },
  { id: 3, name: 'Sam Taylor', position: 'Defender', jerseyNumber: 5, email: 'sam.t@team.com', status: 'injured' },
  { id: 4, name: 'Morgan Blake', position: 'Goalkeeper', jerseyNumber: 1, email: 'morgan.b@team.com', status: 'active' },
  { id: 5, name: 'Casey Johnson', position: 'Forward', jerseyNumber: 11, email: 'casey.j@team.com', status: 'benched' },
  { id: 6, name: 'Jordan Lee', position: 'Midfielder', jerseyNumber: 8, email: 'jordan.l@team.com', status: 'active' },
  { id: 7, name: 'Riley Kim', position: 'Defender', jerseyNumber: 3, email: 'riley.k@team.com', status: 'active' }
]

export default function TeamManagerManages() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    position: 'Forward',
    jerseyNumber: '',
    email: '',
    status: 'active' as 'active' | 'injured' | 'benched'
  })

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    const newMember: TeamMember = {
      id: Math.max(...teamMembers.map(m => m.id), 0) + 1,
      name: formData.name,
      position: formData.position,
      jerseyNumber: parseInt(formData.jerseyNumber),
      email: formData.email,
      status: formData.status
    }
    setTeamMembers([...teamMembers, newMember])
    setFormData({ name: '', position: 'Forward', jerseyNumber: '', email: '', status: 'active' })
    setShowAddForm(false)
  }

  const handleRemoveMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id))
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingId(member.id)
    setFormData({
      name: member.name,
      position: member.position,
      jerseyNumber: member.jerseyNumber.toString(),
      email: member.email,
      status: member.status
    })
  }

  const handleUpdateMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId !== null) {
      setTeamMembers(teamMembers.map(member =>
        member.id === editingId
          ? {
              ...member,
              name: formData.name,
              position: formData.position,
              jerseyNumber: parseInt(formData.jerseyNumber),
              email: formData.email,
              status: formData.status
            }
          : member
      ))
      setEditingId(null)
      setFormData({ name: '', position: 'Forward', jerseyNumber: '', email: '', status: 'active' })
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ name: '', position: 'Forward', jerseyNumber: '', email: '', status: 'active' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'injured':
        return 'bg-red-100 text-red-800'
      case 'benched':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="teammanagermanages" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Roster Management</h1>
            <p className="text-gray-600 mt-2">Manage your team members and their details</p>
          </div>
          {!showAddForm && !editingId && (
            <button
              data-testid="teammanagermanages-add"
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Team Member
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingId !== null) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingId !== null ? 'Edit Team Member' : 'Add New Team Member'}
            </h2>
            <form onSubmit={editingId !== null ? handleUpdateMember : handleAddMember}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    data-testid="teammanagermanages-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    data-testid="teammanagermanages-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <select
                    data-testid="teammanagermanages-position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Forward</option>
                    <option>Midfielder</option>
                    <option>Defender</option>
                    <option>Goalkeeper</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jersey Number
                  </label>
                  <input
                    data-testid="teammanagermanages-jerseynumber"
                    type="number"
                    value={formData.jerseyNumber}
                    onChange={(e) => setFormData({ ...formData, jerseyNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="99"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    data-testid="teammanagermanages-status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'injured' | 'benched' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="injured">Injured</option>
                    <option value="benched">Benched</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  data-testid="teammanagermanages-submit"
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingId !== null ? 'Update Member' : 'Add Member'}
                </button>
                <button
                  data-testid="teammanagermanages-cancel"
                  type="button"
                  onClick={() => {
                    if (editingId !== null) {
                      handleCancelEdit()
                    } else {
                      setShowAddForm(false)
                      setFormData({ name: '', position: 'Forward', jerseyNumber: '', email: '', status: 'active' })
                    }
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Team Roster Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Current Roster ({teamMembers.length} members)
            </h2>
          </div>
          <div data-testid="teammanagermanages-list" className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Jersey #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamMembers.map((member) => (
                  <tr key={member.id} data-testid="teammanagermanages-item" className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white font-bold rounded-full">
                        {member.jerseyNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{member.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{member.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          data-testid="teammanagermanages-edit"
                          onClick={() => handleEditMember(member)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          data-testid="teammanagermanages-remove"
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {teamMembers.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-500">
              No team members yet. Add your first team member to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
