/**
 * SubmitTenant — Online tenant application submission form with maintenance request tracking
 *
 * Features: Application form, maintenance request submission, property address validation, issue description input, submission history
 *
 * Ticket: SCRUM-707 | Branch: proto/SCRUM-703
 */

import { useState } from 'react'

interface MaintenanceRequest {
  id: string
  tenantName: string
  propertyAddress: string
  issueDescription: string
  status: 'Pending' | 'In Progress' | 'Completed'
  dateSubmitted: string
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
}

const MOCK_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'REQ-001',
    tenantName: 'John Smith',
    propertyAddress: '123 Oak Street, Apt 4B, Springfield, MA 01101',
    issueDescription: 'Kitchen sink is leaking under the cabinet. Water damage visible on cabinet floor.',
    status: 'In Progress',
    dateSubmitted: '2026-08-10',
    priority: 'High'
  },
  {
    id: 'REQ-002',
    tenantName: 'Sarah Johnson',
    propertyAddress: '456 Maple Avenue, Unit 2, Boston, MA 02101',
    issueDescription: 'Central heating system not working. Temperature drops below 60°F at night.',
    status: 'Completed',
    dateSubmitted: '2026-08-08',
    priority: 'Urgent'
  },
  {
    id: 'REQ-003',
    tenantName: 'Michael Chen',
    propertyAddress: '789 Pine Road, Suite 12, Cambridge, MA 02138',
    issueDescription: 'Bedroom window does not lock properly. Security concern.',
    status: 'Pending',
    dateSubmitted: '2026-08-12',
    priority: 'Medium'
  },
  {
    id: 'REQ-004',
    tenantName: 'Emily Davis',
    propertyAddress: '321 Elm Boulevard, Apt 7A, Worcester, MA 01608',
    issueDescription: 'Bathroom ceiling has water stains and potential mold growth.',
    status: 'In Progress',
    dateSubmitted: '2026-08-11',
    priority: 'High'
  },
  {
    id: 'REQ-005',
    tenantName: 'David Martinez',
    propertyAddress: '654 Birch Lane, Unit 3C, Lowell, MA 01850',
    issueDescription: 'Front door lock is stiff and difficult to turn. Key gets stuck occasionally.',
    status: 'Pending',
    dateSubmitted: '2026-08-13',
    priority: 'Low'
  }
]

export default function SubmitTenant() {
  const [tenantName, setTenantName] = useState('')
  const [propertyAddress, setPropertyAddress] = useState('')
  const [issueDescription, setIssueDescription] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Urgent'>('Medium')
  const [requests, setRequests] = useState<MaintenanceRequest[]>(MOCK_REQUESTS)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!tenantName.trim() || !propertyAddress.trim() || !issueDescription.trim()) {
      return
    }

    const newRequest: MaintenanceRequest = {
      id: `REQ-${String(requests.length + 1).padStart(3, '0')}`,
      tenantName: tenantName.trim(),
      propertyAddress: propertyAddress.trim(),
      issueDescription: issueDescription.trim(),
      status: 'Pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
      priority
    }

    setRequests([newRequest, ...requests])
    setTenantName('')
    setPropertyAddress('')
    setIssueDescription('')
    setPriority('Medium')
    setShowSuccess(true)
    
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800'
      case 'High':
        return 'bg-orange-100 text-orange-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tenant Application Portal</h1>
          <p className="text-gray-600">Submit maintenance requests and track your applications online</p>
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">✓ Maintenance request submitted successfully!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Submission Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Maintenance Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700 mb-1">
                  Tenant Name *
                </label>
                <input
                  type="text"
                  id="tenantName"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Address *
                </label>
                <input
                  type="text"
                  id="propertyAddress"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full property address including unit number"
                  required
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority Level
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High' | 'Urgent')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Description *
                </label>
                <textarea
                  id="issueDescription"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the maintenance issue in detail..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Request Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-800">
                    {requests.filter(r => r.status === 'Pending').length}
                  </p>
                  <p className="text-sm text-yellow-700">Pending</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-800">
                    {requests.filter(r => r.status === 'In Progress').length}
                  </p>
                  <p className="text-sm text-blue-700">In Progress</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-800">
                    {requests.filter(r => r.status === 'Completed').length}
                  </p>
                  <p className="text-sm text-green-700">Completed</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-gray-800">{requests.length}</p>
                  <p className="text-sm text-gray-700">Total Requests</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Information</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>All fields marked with * are required</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Include your complete property address and unit number</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Urgent requests are prioritized for same-day response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>You will receive email updates on your request status</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Request History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Maintenance Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Request ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tenant</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Property Address</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Issue</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{request.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{request.tenantName}</td>
                    <td className="py-3 px-4 text-sm text-gray-700 max-w-xs truncate" title={request.propertyAddress}>
                      {request.propertyAddress}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 max-w-md truncate" title={request.issueDescription}>
                      {request.issueDescription}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{request.dateSubmitted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
