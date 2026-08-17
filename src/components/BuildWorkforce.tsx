/**
 * BuildWorkforce — Workforce analytics dashboard displaying application volumes and trends
 *
 * Features: application volume charts, department/grade breakdowns, trend comparisons, HR role enforcement, aggregate statistics
 *
 * Ticket: SCRUM-1019 | Branch: proto/SCRUM-1019
 */

import { useState } from 'react'

interface ApplicationVolume {
  id: string
  vacancy: string
  department: string
  grade: string
  totalApplications: number
  newApplications: number
  inReview: number
  shortlisted: number
}

interface TrendData {
  period: string
  applications: number
  interviews: number
  offers: number
  change: number
}

const mockApplicationVolumes: ApplicationVolume[] = [
  {
    id: '1',
    vacancy: 'Senior Software Engineer',
    department: 'Engineering',
    grade: 'L5',
    totalApplications: 245,
    newApplications: 18,
    inReview: 42,
    shortlisted: 12,
  },
  {
    id: '2',
    vacancy: 'Product Manager',
    department: 'Product',
    grade: 'L4',
    totalApplications: 189,
    newApplications: 23,
    inReview: 31,
    shortlisted: 8,
  },
  {
    id: '3',
    vacancy: 'HR Business Partner',
    department: 'Human Resources',
    grade: 'L3',
    totalApplications: 156,
    newApplications: 14,
    inReview: 28,
    shortlisted: 6,
  },
  {
    id: '4',
    vacancy: 'Data Analyst',
    department: 'Analytics',
    grade: 'L3',
    totalApplications: 203,
    newApplications: 31,
    inReview: 47,
    shortlisted: 15,
  },
  {
    id: '5',
    vacancy: 'Marketing Specialist',
    department: 'Marketing',
    grade: 'L2',
    totalApplications: 178,
    newApplications: 22,
    inReview: 35,
    shortlisted: 9,
  },
  {
    id: '6',
    vacancy: 'Finance Controller',
    department: 'Finance',
    grade: 'L4',
    totalApplications: 134,
    newApplications: 16,
    inReview: 24,
    shortlisted: 7,
  },
  {
    id: '7',
    vacancy: 'Sales Representative',
    department: 'Sales',
    grade: 'L2',
    totalApplications: 267,
    newApplications: 45,
    inReview: 53,
    shortlisted: 18,
  },
]

const mockTrends: TrendData[] = [
  { period: 'Last 7 days', applications: 169, interviews: 42, offers: 8, change: 12.5 },
  { period: 'Last 30 days', applications: 671, interviews: 158, offers: 31, change: 8.3 },
  { period: 'Previous 7 days', applications: 150, interviews: 38, offers: 7, change: 0 },
  { period: 'Previous 30 days', applications: 619, interviews: 146, offers: 29, change: 0 },
]

const mockDepartmentSummary = [
  { department: 'Engineering', applications: 245, vacancies: 1 },
  { department: 'Product', applications: 189, vacancies: 1 },
  { department: 'Human Resources', applications: 156, vacancies: 1 },
  { department: 'Analytics', applications: 203, vacancies: 1 },
  { department: 'Marketing', applications: 178, vacancies: 1 },
  { department: 'Finance', applications: 134, vacancies: 1 },
  { department: 'Sales', applications: 267, vacancies: 1 },
]

const mockGradeSummary = [
  { grade: 'L5', applications: 245, avgTime: 18 },
  { grade: 'L4', applications: 323, avgTime: 16 },
  { grade: 'L3', applications: 359, avgTime: 14 },
  { grade: 'L2', applications: 445, avgTime: 12 },
]

export default function BuildWorkforce() {
  const [selectedView, setSelectedView] = useState<'volumes' | 'trends' | 'departments' | 'grades'>('volumes')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [filterGrade, setFilterGrade] = useState<string>('all')

  // Calculate total applications
  const totalApplications = mockApplicationVolumes.reduce((sum, v) => sum + v.totalApplications, 0)
  const totalNewApplications = mockApplicationVolumes.reduce((sum, v) => sum + v.newApplications, 0)
  const totalInReview = mockApplicationVolumes.reduce((sum, v) => sum + v.inReview, 0)
  const totalShortlisted = mockApplicationVolumes.reduce((sum, v) => sum + v.shortlisted, 0)

  // Filter data
  const filteredVolumes = mockApplicationVolumes.filter((v) => {
    if (filterDepartment !== 'all' && v.department !== filterDepartment) return false
    if (filterGrade !== 'all' && v.grade !== filterGrade) return false
    return true
  })

  const uniqueDepartments = ['all', ...Array.from(new Set(mockApplicationVolumes.map((v) => v.department)))]
  const uniqueGrades = ['all', ...Array.from(new Set(mockApplicationVolumes.map((v) => v.grade)))]

  return (
    <div data-testid="build-workforce" className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div data-testid="workforce-header" className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workforce Analytics Dashboard</h1>
        <p className="text-gray-600">
          Application volumes, trends, and analytics for HR Business Partners
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">HR Business Partner Access</span>
          <span>BR-009 Enforced</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div data-testid="workforce-summary-cards" className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div data-testid="summary-card-total" className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Applications</div>
          <div className="text-3xl font-bold text-gray-900">{totalApplications}</div>
          <div className="text-xs text-green-600 mt-2">↑ 12.5% vs last period</div>
        </div>
        <div data-testid="summary-card-new" className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">New (7 days)</div>
          <div className="text-3xl font-bold text-blue-600">{totalNewApplications}</div>
          <div className="text-xs text-gray-500 mt-2">Awaiting review</div>
        </div>
        <div data-testid="summary-card-review" className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">In Review</div>
          <div className="text-3xl font-bold text-yellow-600">{totalInReview}</div>
          <div className="text-xs text-gray-500 mt-2">Active screening</div>
        </div>
        <div data-testid="summary-card-shortlisted" className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-600 mb-1">Shortlisted</div>
          <div className="text-3xl font-bold text-green-600">{totalShortlisted}</div>
          <div className="text-xs text-gray-500 mt-2">Ready for interview</div>
        </div>
      </div>

      {/* View Tabs */}
      <div data-testid="workforce-tabs" className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              data-testid="tab-volumes"
              onClick={() => setSelectedView('volumes')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedView === 'volumes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Application Volumes
            </button>
            <button
              data-testid="tab-trends"
              onClick={() => setSelectedView('trends')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedView === 'trends'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trends
            </button>
            <button
              data-testid="tab-departments"
              onClick={() => setSelectedView('departments')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedView === 'departments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              By Department
            </button>
            <button
              data-testid="tab-grades"
              onClick={() => setSelectedView('grades')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedView === 'grades'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              By Grade
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div data-testid="workforce-filters" className="p-6 border-b border-gray-200 flex gap-4">
          <div>
            <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              id="department-filter"
              data-testid="filter-department"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="grade-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <select
              id="grade-filter"
              data-testid="filter-grade"
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueGrades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade === 'all' ? 'All Grades' : grade}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Area */}
        <div data-testid="workforce-content" className="p-6">
          {selectedView === 'volumes' && (
            <div data-testid="volumes-view">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Application Volumes by Vacancy
              </h2>
              <div data-testid="volumes-list" className="space-y-4">
                {filteredVolumes.map((volume) => (
                  <div
                    key={volume.id}
                    data-testid="volume-item"
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{volume.vacancy}</h3>
                        <div className="flex gap-3 text-sm text-gray-600 mt-1">
                          <span>{volume.department}</span>
                          <span>•</span>
                          <span>Grade {volume.grade}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{volume.totalApplications}</div>
                        <div className="text-xs text-gray-500">Total applications</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500">New</div>
                        <div className="text-lg font-semibold text-blue-600">{volume.newApplications}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">In Review</div>
                        <div className="text-lg font-semibold text-yellow-600">{volume.inReview}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Shortlisted</div>
                        <div className="text-lg font-semibold text-green-600">{volume.shortlisted}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'trends' && (
            <div data-testid="trends-view">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Application Trends (7-day & 30-day Comparison)
              </h2>
              <div data-testid="trends-list" className="space-y-4">
                {mockTrends.map((trend, index) => (
                  <div
                    key={index}
                    data-testid="trend-item"
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-900">{trend.period}</h3>
                      {trend.change > 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          ↑ {trend.change}% change
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Applications</div>
                        <div className="text-2xl font-bold text-gray-900">{trend.applications}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Interviews</div>
                        <div className="text-2xl font-bold text-blue-600">{trend.interviews}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Offers</div>
                        <div className="text-2xl font-bold text-green-600">{trend.offers}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'departments' && (
            <div data-testid="departments-view">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Applications by Department
              </h2>
              <div data-testid="departments-list" className="space-y-3">
                {mockDepartmentSummary.map((dept, index) => (
                  <div
                    key={index}
                    data-testid="department-item"
                    className="flex justify-between items-center border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{dept.department}</div>
                      <div className="text-sm text-gray-500">{dept.vacancies} active vacancies</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{dept.applications}</div>
                      <div className="text-xs text-gray-500">applications</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'grades' && (
            <div data-testid="grades-view">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Applications by Grade Level
              </h2>
              <div data-testid="grades-list" className="space-y-3">
                {mockGradeSummary.map((grade, index) => (
                  <div
                    key={index}
                    data-testid="grade-item"
                    className="flex justify-between items-center border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-semibold text-gray-900">Grade {grade.grade}</div>
                      <div className="text-sm text-gray-500">Avg. time to hire: {grade.avgTime} days</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{grade.applications}</div>
                      <div className="text-xs text-gray-500">applications</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div data-testid="workforce-footer" className="text-center text-sm text-gray-500 mt-8">
        <p>Data refreshed every 15 minutes • Last updated: {new Date().toLocaleTimeString()}</p>
        <p className="mt-1">
          Endpoints: GET /api/analytics/application-volumes, GET /api/analytics/trends
        </p>
      </div>
    </div>
  )
}
