/**
 * NBrowse — Browse open job roles with filters for department, location, and grade level
 *
 * Features: Multi-criteria filtering, Real-time search results, Role cards with key details, Filter reset capability, Responsive design
 *
 * Ticket: SCRUM-1006 | Branch: proto/SCRUM-1006
 */

import { useState } from 'react'

interface Role {
  id: string
  title: string
  department: string
  location: string
  gradeLevel: string
  description: string
  postedDate: string
  applicationDeadline: string
}

const mockRoles: Role[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    gradeLevel: 'Level 5',
    description: 'Lead development of cloud-native applications using modern technologies.',
    postedDate: '2026-08-10',
    applicationDeadline: '2026-09-10'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    gradeLevel: 'Level 4',
    description: 'Drive product strategy and roadmap for our flagship product line.',
    postedDate: '2026-08-12',
    applicationDeadline: '2026-09-12'
  },
  {
    id: '3',
    title: 'Data Scientist',
    department: 'Data',
    location: 'Remote',
    gradeLevel: 'Level 4',
    description: 'Analyze complex datasets and build predictive models for business insights.',
    postedDate: '2026-08-14',
    applicationDeadline: '2026-09-14'
  },
  {
    id: '4',
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    gradeLevel: 'Level 3',
    description: 'Create intuitive user experiences for web and mobile applications.',
    postedDate: '2026-08-15',
    applicationDeadline: '2026-09-15'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Austin, TX',
    gradeLevel: 'Level 4',
    description: 'Manage infrastructure and deployment pipelines for scalable systems.',
    postedDate: '2026-08-11',
    applicationDeadline: '2026-09-11'
  },
  {
    id: '6',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'New York, NY',
    gradeLevel: 'Level 5',
    description: 'Develop and execute marketing strategies to drive brand awareness.',
    postedDate: '2026-08-13',
    applicationDeadline: '2026-09-13'
  },
  {
    id: '7',
    title: 'HR Business Partner',
    department: 'Human Resources',
    location: 'Remote',
    gradeLevel: 'Level 4',
    description: 'Partner with business leaders to align HR strategies with business goals.',
    postedDate: '2026-08-09',
    applicationDeadline: '2026-09-09'
  },
  {
    id: '8',
    title: 'Financial Analyst',
    department: 'Finance',
    location: 'Chicago, IL',
    gradeLevel: 'Level 3',
    description: 'Provide financial analysis and insights to support business decisions.',
    postedDate: '2026-08-16',
    applicationDeadline: '2026-09-16'
  }
]

export default function NBrowse() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('all')

  // Extract unique values for filters
  const departments = ['all', ...Array.from(new Set(mockRoles.map(role => role.department)))]
  const locations = ['all', ...Array.from(new Set(mockRoles.map(role => role.location)))]
  const gradeLevels = ['all', ...Array.from(new Set(mockRoles.map(role => role.gradeLevel)))]

  // Filter roles based on selected criteria
  const filteredRoles = mockRoles.filter(role => {
    const matchesDepartment = selectedDepartment === 'all' || role.department === selectedDepartment
    const matchesLocation = selectedLocation === 'all' || role.location === selectedLocation
    const matchesGradeLevel = selectedGradeLevel === 'all' || role.gradeLevel === selectedGradeLevel
    return matchesDepartment && matchesLocation && matchesGradeLevel
  })

  const handleReset = () => {
    setSelectedDepartment('all')
    setSelectedLocation('all')
    setSelectedGradeLevel('all')
  }

  return (
    <div data-testid="nbrowse" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Open Roles</h1>
          <p className="text-gray-600">Find job opportunities that match your qualifications</p>
        </div>

        {/* Filters Section */}
        <div data-testid="nbrowse-filters" className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Department Filter */}
            <div>
              <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                id="department-filter"
                data-testid="nbrowse-department-filter"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                data-testid="nbrowse-location-filter"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                data-testid="nbrowse-grade-filter"
                value={selectedGradeLevel}
                onChange={(e) => setSelectedGradeLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p data-testid="nbrowse-results-count" className="text-gray-600">
            Showing <span className="font-semibold">{filteredRoles.length}</span> of <span className="font-semibold">{mockRoles.length}</span> open roles
          </p>
        </div>

        {/* Roles List */}
        <div data-testid="nbrowse-roles-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.length > 0 ? (
            filteredRoles.map(role => (
              <div
                key={role.id}
                data-testid="nbrowse-role-card"
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium w-24">Department:</span>
                    <span>{role.department}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium w-24">Location:</span>
                    <span>{role.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium w-24">Grade Level:</span>
                    <span>{role.gradeLevel}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{role.description}</p>

                <div className="text-xs text-gray-500 mb-4">
                  <p>Posted: {new Date(role.postedDate).toLocaleDateString()}</p>
                  <p>Deadline: {new Date(role.applicationDeadline).toLocaleDateString()}</p>
                </div>

                <button
                  data-testid="nbrowse-apply-button"
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <div data-testid="nbrowse-no-results" className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No roles match your selected filters.</p>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
