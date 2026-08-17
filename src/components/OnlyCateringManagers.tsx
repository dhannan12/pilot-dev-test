/**
 * OnlyCateringManagers — Role-based access control for weekly order report generation
 *
 * Features: user role validation, weekly report generation, access control, manager dashboard, order summary view
 *
 * Ticket: SCRUM-991 | Branch: proto/SCRUM-983
 */

import { useState } from 'react'

interface User {
  id: string
  name: string
  role: 'catering_manager' | 'staff' | 'teacher' | 'admin'
  email: string
}

interface OrderReport {
  id: string
  week: string
  totalOrders: number
  totalRevenue: number
  generatedBy: string
  generatedAt: string
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Sarah Johnson', role: 'catering_manager', email: 'sarah.j@school.edu' },
  { id: '2', name: 'Mike Chen', role: 'staff', email: 'mike.c@school.edu' },
  { id: '3', name: 'Emma Wilson', role: 'teacher', email: 'emma.w@school.edu' },
  { id: '4', name: 'David Brown', role: 'catering_manager', email: 'david.b@school.edu' },
  { id: '5', name: 'Lisa Martinez', role: 'admin', email: 'lisa.m@school.edu' }
]

const MOCK_REPORTS: OrderReport[] = [
  { id: '1', week: 'Week 32 (Aug 7-11, 2026)', totalOrders: 342, totalRevenue: 4104.50, generatedBy: 'Sarah Johnson', generatedAt: '2026-08-11 14:30' },
  { id: '2', week: 'Week 31 (Jul 31-Aug 4, 2026)', totalOrders: 318, totalRevenue: 3816.00, generatedBy: 'David Brown', generatedAt: '2026-08-04 16:45' },
  { id: '3', week: 'Week 30 (Jul 24-28, 2026)', totalOrders: 295, totalRevenue: 3540.00, generatedBy: 'Sarah Johnson', generatedAt: '2026-07-28 15:20' },
  { id: '4', week: 'Week 29 (Jul 17-21, 2026)', totalOrders: 328, totalRevenue: 3936.00, generatedBy: 'David Brown', generatedAt: '2026-07-21 14:10' },
  { id: '5', week: 'Week 28 (Jul 10-14, 2026)', totalOrders: 310, totalRevenue: 3720.00, generatedBy: 'Sarah Johnson', generatedAt: '2026-07-14 16:00' }
]

export default function OnlyCateringManagers() {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0])
  const [reports, setReports] = useState<OrderReport[]>(MOCK_REPORTS)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState('Week 33 (Aug 14-18, 2026)')

  const isCateringManager = currentUser.role === 'catering_manager'

  const handleGenerateReport = () => {
    if (!isCateringManager) {
      return
    }

    setIsGenerating(true)
    
    // Simulate report generation
    setTimeout(() => {
      const newReport: OrderReport = {
        id: String(reports.length + 1),
        week: selectedWeek,
        totalOrders: Math.floor(Math.random() * 100) + 250,
        totalRevenue: (Math.floor(Math.random() * 100) + 250) * 12.0,
        generatedBy: currentUser.name,
        generatedAt: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }
      setReports([newReport, ...reports])
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div data-testid="onlycateringmanagers" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Weekly Order Reports</h1>
          
          {/* User Selector (for demo purposes) */}
          <div className="mb-4">
            <label htmlFor="user-select" className="block text-sm font-medium text-gray-700 mb-2">
              Current User (Demo):
            </label>
            <select
              id="user-select"
              data-testid="onlycateringmanagers-user"
              value={currentUser.id}
              onChange={(e) => {
                const user = MOCK_USERS.find(u => u.id === e.target.value)
                if (user) setCurrentUser(user)
              }}
              className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {MOCK_USERS.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.role.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* User Info */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Logged in as:</p>
              <p className="font-semibold text-gray-900">{currentUser.name}</p>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Role:</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                isCateringManager 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {currentUser.role.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Access Control Section */}
        {isCateringManager ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Weekly Report</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="week-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Week:
                </label>
                <select
                  id="week-select"
                  data-testid="onlycateringmanagers-week"
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isGenerating}
                >
                  <option>Week 33 (Aug 14-18, 2026)</option>
                  <option>Week 32 (Aug 7-11, 2026)</option>
                  <option>Week 31 (Jul 31-Aug 4, 2026)</option>
                  <option>Week 30 (Jul 24-28, 2026)</option>
                  <option>Week 29 (Jul 17-21, 2026)</option>
                </select>
              </div>

              <button
                data-testid="onlycateringmanagers-generate"
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isGenerating ? 'Generating Report...' : 'Generate Weekly Report'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-900 mb-2">Access Denied</h3>
                <p className="text-red-700">
                  Only catering managers can generate weekly order reports. Your current role ({currentUser.role.replace('_', ' ')}) does not have permission to access this feature.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated Reports</h2>
          
          {reports.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No reports generated yet.</p>
          ) : (
            <div data-testid="onlycateringmanagers-list" className="space-y-3">
              {reports.map(report => (
                <div
                  key={report.id}
                  data-testid="onlycateringmanagers-item"
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{report.week}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Total Orders:</span> {report.totalOrders}
                        </div>
                        <div>
                          <span className="font-medium">Revenue:</span> ${report.totalRevenue.toFixed(2)}
                        </div>
                        <div>
                          <span className="font-medium">Generated By:</span> {report.generatedBy}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span> {report.generatedAt}
                        </div>
                      </div>
                    </div>
                    <button
                      data-testid="onlycateringmanagers-download"
                      className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
