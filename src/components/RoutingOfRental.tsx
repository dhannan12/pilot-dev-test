/**
 * RoutingOfRental — Routes rental requests to appropriate depot staff members
 *
 * Features: request queue management, depot staff assignment, priority routing, status tracking, automatic distribution
 *
 * Ticket: SCRUM-920 | Branch: proto/SCRUM-914
 */

import { useState } from 'react'

interface RentalRequest {
  id: string
  customerName: string
  equipment: string
  location: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'assigned' | 'in-progress' | 'completed'
  createdAt: string
  assignedTo?: string
}

interface DepotStaff {
  id: string
  name: string
  depot: string
  availability: 'available' | 'busy' | 'offline'
  activeRequests: number
  maxCapacity: number
}

const mockRentalRequests: RentalRequest[] = [
  {
    id: 'REQ-001',
    customerName: 'John Smith',
    equipment: 'Excavator 320D',
    location: 'North Depot',
    priority: 'high',
    status: 'pending',
    createdAt: '2026-08-16T09:30:00'
  },
  {
    id: 'REQ-002',
    customerName: 'Sarah Johnson',
    equipment: 'Forklift 5000lb',
    location: 'South Depot',
    priority: 'medium',
    status: 'assigned',
    createdAt: '2026-08-16T09:45:00',
    assignedTo: 'Michael Chen'
  },
  {
    id: 'REQ-003',
    customerName: 'David Brown',
    equipment: 'Concrete Mixer',
    location: 'East Depot',
    priority: 'urgent',
    status: 'pending',
    createdAt: '2026-08-16T10:00:00'
  },
  {
    id: 'REQ-004',
    customerName: 'Emily Davis',
    equipment: 'Scaffolding Set',
    location: 'North Depot',
    priority: 'low',
    status: 'in-progress',
    createdAt: '2026-08-16T08:15:00',
    assignedTo: 'Jennifer White'
  },
  {
    id: 'REQ-005',
    customerName: 'Robert Wilson',
    equipment: 'Generator 10kW',
    location: 'West Depot',
    priority: 'medium',
    status: 'pending',
    createdAt: '2026-08-16T10:30:00'
  },
  {
    id: 'REQ-006',
    customerName: 'Lisa Anderson',
    equipment: 'Boom Lift 40ft',
    location: 'South Depot',
    priority: 'high',
    status: 'assigned',
    createdAt: '2026-08-16T11:00:00',
    assignedTo: 'Alex Rodriguez'
  },
  {
    id: 'REQ-007',
    customerName: 'Thomas Martinez',
    equipment: 'Compressor Air',
    location: 'East Depot',
    priority: 'low',
    status: 'pending',
    createdAt: '2026-08-16T11:15:00'
  }
]

const mockDepotStaff: DepotStaff[] = [
  {
    id: 'STAFF-001',
    name: 'Michael Chen',
    depot: 'South Depot',
    availability: 'busy',
    activeRequests: 3,
    maxCapacity: 5
  },
  {
    id: 'STAFF-002',
    name: 'Jennifer White',
    depot: 'North Depot',
    availability: 'busy',
    activeRequests: 2,
    maxCapacity: 5
  },
  {
    id: 'STAFF-003',
    name: 'Alex Rodriguez',
    depot: 'South Depot',
    availability: 'busy',
    activeRequests: 1,
    maxCapacity: 5
  },
  {
    id: 'STAFF-004',
    name: 'Patricia Lee',
    depot: 'East Depot',
    availability: 'available',
    activeRequests: 0,
    maxCapacity: 5
  },
  {
    id: 'STAFF-005',
    name: 'James Taylor',
    depot: 'West Depot',
    availability: 'available',
    activeRequests: 0,
    maxCapacity: 5
  },
  {
    id: 'STAFF-006',
    name: 'Maria Garcia',
    depot: 'North Depot',
    availability: 'offline',
    activeRequests: 0,
    maxCapacity: 5
  }
]

export default function RoutingOfRental() {
  const [requests, setRequests] = useState<RentalRequest[]>(mockRentalRequests)
  const [staff, setStaff] = useState<DepotStaff[]>(mockDepotStaff)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-700 bg-red-100 border-red-300'
      case 'high':
        return 'text-orange-700 bg-orange-100 border-orange-300'
      case 'medium':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300'
      case 'low':
        return 'text-green-700 bg-green-100 border-green-300'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-blue-700 bg-blue-100 border-blue-300'
      case 'assigned':
        return 'text-purple-700 bg-purple-100 border-purple-300'
      case 'in-progress':
        return 'text-indigo-700 bg-indigo-100 border-indigo-300'
      case 'completed':
        return 'text-green-700 bg-green-100 border-green-300'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'text-green-700 bg-green-100 border-green-300'
      case 'busy':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300'
      case 'offline':
        return 'text-gray-700 bg-gray-100 border-gray-300'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300'
    }
  }

  const handleAssignRequest = () => {
    if (!selectedRequest || !selectedStaff) return

    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === selectedRequest
          ? { ...req, status: 'assigned' as const, assignedTo: staff.find(s => s.id === selectedStaff)?.name }
          : req
      )
    )

    setStaff(prevStaff =>
      prevStaff.map(s =>
        s.id === selectedStaff
          ? { ...s, activeRequests: s.activeRequests + 1, availability: s.activeRequests + 1 >= s.maxCapacity ? 'busy' as const : s.availability }
          : s
      )
    )

    setSelectedRequest(null)
    setSelectedStaff('')
  }

  const handleAutoRoute = (requestId: string) => {
    const request = requests.find(req => req.id === requestId)
    if (!request) return

    // Find available staff at the same depot
    const availableStaff = staff
      .filter(s => s.depot === request.location && s.availability === 'available' && s.activeRequests < s.maxCapacity)
      .sort((a, b) => a.activeRequests - b.activeRequests)

    if (availableStaff.length > 0) {
      const assignedStaff = availableStaff[0]

      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === requestId
            ? { ...req, status: 'assigned' as const, assignedTo: assignedStaff.name }
            : req
        )
      )

      setStaff(prevStaff =>
        prevStaff.map(s =>
          s.id === assignedStaff.id
            ? { ...s, activeRequests: s.activeRequests + 1, availability: s.activeRequests + 1 >= s.maxCapacity ? 'busy' as const : s.availability }
            : s
        )
      )
    }
  }

  const filteredRequests = requests.filter(req => {
    if (filterStatus !== 'all' && req.status !== filterStatus) return false
    if (filterPriority !== 'all' && req.priority !== filterPriority) return false
    return true
  })

  const pendingCount = requests.filter(r => r.status === 'pending').length
  const assignedCount = requests.filter(r => r.status === 'assigned').length
  const availableStaffCount = staff.filter(s => s.availability === 'available').length

  return (
    <div data-testid="routingofrental" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rental Request Routing</h1>
          <p className="text-gray-600">Route rental requests to depot staff efficiently</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Pending Requests</div>
            <div className="text-3xl font-bold text-blue-600">{pendingCount}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Assigned Today</div>
            <div className="text-3xl font-bold text-purple-600">{assignedCount}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Available Staff</div>
            <div className="text-3xl font-bold text-green-600">{availableStaffCount}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rental Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Rental Requests</h2>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-3">
                  <select
                    data-testid="routingofrental-filter-status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  <select
                    data-testid="routingofrental-filter-priority"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Priority</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div data-testid="routingofrental-list" className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    data-testid="routingofrental-item"
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      selectedRequest === request.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">{request.id}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                            {request.priority.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div><strong>Customer:</strong> {request.customerName}</div>
                          <div><strong>Equipment:</strong> {request.equipment}</div>
                          <div><strong>Location:</strong> {request.location}</div>
                          <div><strong>Created:</strong> {new Date(request.createdAt).toLocaleString()}</div>
                          {request.assignedTo && (
                            <div><strong>Assigned to:</strong> {request.assignedTo}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        {request.status === 'pending' && (
                          <>
                            <button
                              data-testid="routingofrental-select"
                              onClick={() => setSelectedRequest(request.id)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                            >
                              Select
                            </button>
                            <button
                              data-testid="routingofrental-autoroute"
                              onClick={() => handleAutoRoute(request.id)}
                              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                            >
                              Auto-Route
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Depot Staff */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow border border-gray-200 sticky top-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Depot Staff</h2>
              </div>

              <div data-testid="routingofrental-staff-list" className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                {staff.map((member) => (
                  <div
                    key={member.id}
                    data-testid="routingofrental-staff-item"
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedStaff === member.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                    }`}
                    onClick={() => selectedRequest && setSelectedStaff(member.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getAvailabilityColor(member.availability)}`}>
                        {member.availability}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Depot:</strong> {member.depot}</div>
                      <div><strong>Active:</strong> {member.activeRequests} / {member.maxCapacity}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full ${
                            member.activeRequests >= member.maxCapacity
                              ? 'bg-red-600'
                              : member.activeRequests > member.maxCapacity / 2
                              ? 'bg-yellow-600'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${(member.activeRequests / member.maxCapacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Assignment Action */}
              {selectedRequest && selectedStaff && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <button
                    data-testid="routingofrental-assign"
                    onClick={handleAssignRequest}
                    className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Assign Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
