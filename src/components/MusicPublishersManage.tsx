/**
 * MusicPublishersManage — Manages music publishers, rights, and distribution
 *
 * Features: publisher listing, rights management, territory tracking, distribution channels, revenue splits
 *
 * Ticket: SCRUM-1224 | Branch: proto/SCRUM-1223
 */

import React, { useState } from 'react'

interface Publisher {
  id: string
  name: string
  contact: string
  email: string
  territory: string[]
  rightsType: string
  distributionChannel: string[]
  revenueShare: number
  songsManaged: number
  status: 'Active' | 'Pending' | 'Inactive'
}

const MOCK_PUBLISHERS: Publisher[] = [
  {
    id: 'PUB-001',
    name: 'Universal Music Publishing Group',
    contact: 'Sarah Mitchell',
    email: 'sarah.mitchell@umpg.com',
    territory: ['North America', 'Europe', 'Asia'],
    rightsType: 'Mechanical & Performance',
    distributionChannel: ['Streaming', 'Physical', 'Sync'],
    revenueShare: 15,
    songsManaged: 1247,
    status: 'Active'
  },
  {
    id: 'PUB-002',
    name: 'Sony Music Publishing',
    contact: 'Michael Chen',
    email: 'mchen@sonymusicpub.com',
    territory: ['Worldwide'],
    rightsType: 'Full Rights',
    distributionChannel: ['Streaming', 'Digital Download', 'Physical', 'Broadcast'],
    revenueShare: 20,
    songsManaged: 2156,
    status: 'Active'
  },
  {
    id: 'PUB-003',
    name: 'Warner Chappell Music',
    contact: 'Emma Rodriguez',
    email: 'erodriguez@warnerchappell.com',
    territory: ['North America', 'Latin America'],
    rightsType: 'Performance Rights',
    distributionChannel: ['Streaming', 'Radio', 'TV'],
    revenueShare: 12,
    songsManaged: 892,
    status: 'Active'
  },
  {
    id: 'PUB-004',
    name: 'BMG Rights Management',
    contact: 'David Thompson',
    email: 'dthompson@bmg.com',
    territory: ['Europe', 'UK'],
    rightsType: 'Mechanical Rights',
    distributionChannel: ['Streaming', 'Physical'],
    revenueShare: 18,
    songsManaged: 634,
    status: 'Pending'
  },
  {
    id: 'PUB-005',
    name: 'Kobalt Music Publishing',
    contact: 'Lisa Anderson',
    email: 'landerson@kobaltmusic.com',
    territory: ['Worldwide'],
    rightsType: 'Mechanical & Performance',
    distributionChannel: ['Streaming', 'Digital Download', 'Sync'],
    revenueShare: 10,
    songsManaged: 1523,
    status: 'Active'
  },
  {
    id: 'PUB-006',
    name: 'Concord Music Publishing',
    contact: 'James Wilson',
    email: 'jwilson@concordmusic.com',
    territory: ['North America'],
    rightsType: 'Sync Rights',
    distributionChannel: ['Film', 'TV', 'Advertising'],
    revenueShare: 25,
    songsManaged: 456,
    status: 'Active'
  }
]

export default function MusicPublishersManage() {
  const [publishers, setPublishers] = useState<Publisher[]>(MOCK_PUBLISHERS)
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState<boolean>(false)

  const filteredPublishers = publishers.filter(pub => {
    const matchesStatus = filterStatus === 'all' || pub.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesSearch = pub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.contact.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleViewDetails = (publisher: Publisher) => {
    setSelectedPublisher(publisher)
  }

  const handleCloseDetails = () => {
    setSelectedPublisher(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="musicpublishersmanage" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Music Publishers Management</h1>
          <p className="text-gray-600">Manage publisher rights, territories, and distribution channels</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                data-testid="musicpublishersmanage-search"
                placeholder="Search publishers by name or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                data-testid="musicpublishersmanage-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                data-testid="musicpublishersmanage-add"
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Publisher
              </button>
            </div>
          </div>
        </div>

        {/* Add Form (conditional) */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-2 border-blue-200">
            <h2 className="text-xl font-semibold mb-4">Add New Publisher</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                data-testid="musicpublishersmanage-name"
                placeholder="Publisher Name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                data-testid="musicpublishersmanage-contact"
                placeholder="Contact Person"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                data-testid="musicpublishersmanage-email"
                placeholder="Email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                data-testid="musicpublishersmanage-territory"
                placeholder="Territory (comma-separated)"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                data-testid="musicpublishersmanage-rightstype"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Rights Type</option>
                <option value="mechanical">Mechanical Rights</option>
                <option value="performance">Performance Rights</option>
                <option value="mechanical-performance">Mechanical & Performance</option>
                <option value="sync">Sync Rights</option>
                <option value="full">Full Rights</option>
              </select>
              <input
                type="number"
                data-testid="musicpublishersmanage-revenueshare"
                placeholder="Revenue Share %"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                data-testid="musicpublishersmanage-save"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Publisher
              </button>
              <button
                data-testid="musicpublishersmanage-cancel"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Publishers List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publisher</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Territory</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rights Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Share</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Songs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody data-testid="musicpublishersmanage-list" className="bg-white divide-y divide-gray-200">
                {filteredPublishers.map((publisher) => (
                  <tr key={publisher.id} data-testid="musicpublishersmanage-item" className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{publisher.name}</div>
                      <div className="text-sm text-gray-500">{publisher.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{publisher.contact}</div>
                      <div className="text-sm text-gray-500">{publisher.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {publisher.territory.slice(0, 2).join(', ')}
                        {publisher.territory.length > 2 && ` +${publisher.territory.length - 2}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {publisher.rightsType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {publisher.revenueShare}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {publisher.songsManaged}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(publisher.status)}`}>
                        {publisher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        data-testid="musicpublishersmanage-view"
                        onClick={() => handleViewDetails(publisher)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <button
                        data-testid="musicpublishersmanage-edit"
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        data-testid="musicpublishersmanage-delete"
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500">Total Publishers</div>
            <div className="text-2xl font-bold text-gray-900">{publishers.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500">Active Publishers</div>
            <div className="text-2xl font-bold text-green-600">
              {publishers.filter(p => p.status === 'Active').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500">Total Songs Managed</div>
            <div className="text-2xl font-bold text-blue-600">
              {publishers.reduce((acc, p) => acc + p.songsManaged, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500">Avg Revenue Share</div>
            <div className="text-2xl font-bold text-purple-600">
              {(publishers.reduce((acc, p) => acc + p.revenueShare, 0) / publishers.length).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Publisher Details Modal */}
        {selectedPublisher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div data-testid="musicpublishersmanage-modal" className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPublisher.name}</h2>
                  <button
                    data-testid="musicpublishersmanage-close"
                    onClick={handleCloseDetails}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Publisher ID</h3>
                    <p className="text-gray-900">{selectedPublisher.id}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                    <p className="text-gray-900">{selectedPublisher.contact}</p>
                    <p className="text-gray-600">{selectedPublisher.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Territory Coverage</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPublisher.territory.map((t, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Rights Type</h3>
                    <p className="text-gray-900">{selectedPublisher.rightsType}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Distribution Channels</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPublisher.distributionChannel.map((channel, i) => (
                        <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Revenue Share</h3>
                      <p className="text-2xl font-bold text-gray-900">{selectedPublisher.revenueShare}%</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Songs Managed</h3>
                      <p className="text-2xl font-bold text-gray-900">{selectedPublisher.songsManaged}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusColor(selectedPublisher.status)}`}>
                      {selectedPublisher.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
