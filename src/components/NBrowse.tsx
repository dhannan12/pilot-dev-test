/**
 * NBrowse — Browse open job roles with filtering by department, location, and grade level
 *
 * Features: department filter, location filter, grade level filter, job listing display, search/filter state management
 *
 * Ticket: SCRUM-994 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface JobRole {
  id: string
  title: string
  department: string
  location: string
  gradeLevel: string
  description: string
  postedDate: string
}

const MOCK_JOB_ROLES: JobRole[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    gradeLevel: 'L5',
    description: 'Build scalable backend systems and lead technical initiatives',
    postedDate: '2026-08-10'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    gradeLevel: 'L4',
    description: 'Drive product strategy and roadmap for internal tools',
    postedDate: '2026-08-12'
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    gradeLevel: 'L3',
    description: 'Design intuitive user experiences for enterprise applications',
    postedDate: '2026-08-14'
  },
  {
    id: '4',
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Austin, TX',
    gradeLevel: 'L3',
    description: 'Analyze business metrics and provide actionable insights',
    postedDate: '2026-08-09'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    gradeLevel: 'L4',
    description: 'Maintain CI/CD pipelines and cloud infrastructure',
    postedDate: '2026-08-11'
  },
  {
    id: '6',
    title: 'HR Business Partner',
    department: 'Human Resources',
    location: 'Chicago, IL',
    gradeLevel: 'L4',
    description: 'Partner with leadership on talent strategy and employee relations',
    postedDate: '2026-08-13'
  },
  {
    id: '7',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    gradeLevel: 'L5',
    description: 'Lead marketing campaigns and brand strategy',
    postedDate: '2026-08-15'
  },
  {
    id: '8',
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'New York, NY',
    gradeLevel: 'L3',
    description: 'Build responsive and accessible web applications',
    postedDate: '2026-08-08'
  }
]

export default function NBrowse() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('all')

  // Extract unique values for filters
  const departments = ['all', ...Array.from(new Set(MOCK_JOB_ROLES.map(job => job.department)))]
  const locations = ['all', ...Array.from(new Set(MOCK_JOB_ROLES.map(job => job.location)))]
  const gradeLevels = ['all', ...Array.from(new Set(MOCK_JOB_ROLES.map(job => job.gradeLevel)))]

  // Filter jobs based on selected criteria
  const filteredJobs = MOCK_JOB_ROLES.filter(job => {
    const departmentMatch = selectedDepartment === 'all' || job.department === selectedDepartment
    const locationMatch = selectedLocation === 'all' || job.location === selectedLocation
    const gradeLevelMatch = selectedGradeLevel === 'all' || job.gradeLevel === selectedGradeLevel
    return departmentMatch && locationMatch && gradeLevelMatch
  })

  const handleReset = () => {
    setSelectedDepartment('all')
    setSelectedLocation('all')
    setSelectedGradeLevel('all')
  }

  return (
    <div data-testid="nbrowse" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Open Roles</h1>
          <p className="text-gray-600">Find job opportunities that match your skills and career goals</p>
        </header>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter By</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Department Filter */}
            <div>
              <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                id="department-filter"
                data-testid="nbrowse-department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                id="location-filter"
                data-testid="nbrowse-location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc === 'all' ? 'All Locations' : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade Level Filter */}
            <div>
              <label htmlFor="grade-level-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Grade Level
              </label>
              <select
                id="grade-level-filter"
                data-testid="nbrowse-grade-level"
                value={selectedGradeLevel}
                onChange={(e) => setSelectedGradeLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {gradeLevels.map(grade => (
                  <option key={grade} value={grade}>
                    {grade === 'all' ? 'All Grade Levels' : grade}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end">
            <button
              data-testid="nbrowse-reset"
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredJobs.length}</span> of {MOCK_JOB_ROLES.length} open roles
          </p>
        </div>

        {/* Job Listings */}
        <div data-testid="nbrowse-list" className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div
                key={job.id}
                data-testid="nbrowse-item"
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="font-medium mr-1">Department:</span>
                        {job.department}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <span className="font-medium mr-1">Location:</span>
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <span className="font-medium mr-1">Grade:</span>
                        {job.gradeLevel}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    Posted {job.postedDate}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="flex gap-2">
                  <button
                    data-testid="nbrowse-view-details"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View Details
                  </button>
                  <button
                    data-testid="nbrowse-apply"
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 text-lg">No jobs match your selected filters.</p>
              <button
                data-testid="nbrowse-clear-filters"
                onClick={handleReset}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
