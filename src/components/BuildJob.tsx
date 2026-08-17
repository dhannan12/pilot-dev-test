/**
 * BuildJob — Job listing page with filters for department, location, and grade level
 *
 * Features: Multi-criteria filtering, Vacancy cards with details, Client-side filtering, Filter reset, Responsive grid layout
 *
 * Ticket: SCRUM-1020 | Branch: proto/SCRUM-1020
 */

import { useState } from 'react'

interface Vacancy {
  id: string
  title: string
  department: string
  location: string
  grade_level: string
  closing_date: string
  requirements: string[]
  description: string
}

const mockVacancies: Vacancy[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    grade_level: 'Level 5',
    closing_date: '2026-09-15',
    requirements: ['5+ years experience', 'TypeScript', 'React', 'Cloud architecture'],
    description: 'Lead development of scalable cloud-native applications using modern technologies.'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    grade_level: 'Level 4',
    closing_date: '2026-09-20',
    requirements: ['3+ years PM experience', 'Agile methodology', 'Stakeholder management'],
    description: 'Drive product strategy and roadmap for our flagship product line.'
  },
  {
    id: '3',
    title: 'Data Scientist',
    department: 'Data & Analytics',
    location: 'Remote',
    grade_level: 'Level 4',
    closing_date: '2026-09-18',
    requirements: ['PhD or Masters in relevant field', 'Python', 'Machine Learning', 'Statistical analysis'],
    description: 'Analyze complex datasets and build predictive models for business insights.'
  },
  {
    id: '4',
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    grade_level: 'Level 3',
    closing_date: '2026-09-25',
    requirements: ['3+ years UX design', 'Figma', 'User research', 'Prototyping'],
    description: 'Create intuitive user experiences for web and mobile applications.'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Austin, TX',
    grade_level: 'Level 4',
    closing_date: '2026-09-22',
    requirements: ['Kubernetes', 'CI/CD', 'AWS/GCP', 'Infrastructure as Code'],
    description: 'Manage infrastructure and deployment pipelines for scalable systems.'
  },
  {
    id: '6',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'New York, NY',
    grade_level: 'Level 5',
    closing_date: '2026-09-30',
    requirements: ['5+ years marketing experience', 'Digital marketing', 'Campaign management', 'Analytics'],
    description: 'Develop and execute marketing strategies to drive brand awareness.'
  },
  {
    id: '7',
    title: 'HR Business Partner',
    department: 'Human Resources',
    location: 'Remote',
    grade_level: 'Level 3',
    closing_date: '2026-09-28',
    requirements: ['HR certification', 'Employee relations', 'Talent management', 'Change management'],
    description: 'Partner with business leaders to develop and implement people strategies.'
  },
  {
    id: '8',
    title: 'Financial Analyst',
    department: 'Finance',
    location: 'Chicago, IL',
    grade_level: 'Level 3',
    closing_date: '2026-09-17',
    requirements: ['CPA or CFA preferred', 'Financial modeling', 'Excel', 'SQL'],
    description: 'Provide financial analysis and insights to support business decision-making.'
  }
]

export default function BuildJob() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('all')

  // Extract unique values for filters
  const departments = ['all', ...Array.from(new Set(mockVacancies.map(v => v.department)))]
  const locations = ['all', ...Array.from(new Set(mockVacancies.map(v => v.location)))]
  const gradeLevels = ['all', ...Array.from(new Set(mockVacancies.map(v => v.grade_level)))]

  // Filter vacancies based on selected criteria
  const filteredVacancies = mockVacancies.filter(vacancy => {
    const matchesDepartment = selectedDepartment === 'all' || vacancy.department === selectedDepartment
    const matchesLocation = selectedLocation === 'all' || vacancy.location === selectedLocation
    const matchesGradeLevel = selectedGradeLevel === 'all' || vacancy.grade_level === selectedGradeLevel
    return matchesDepartment && matchesLocation && matchesGradeLevel
  })

  const handleReset = () => {
    setSelectedDepartment('all')
    setSelectedLocation('all')
    setSelectedGradeLevel('all')
  }

  return (
    <div data-testid="build-job" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Internal Job Postings</h1>
          <p className="text-lg text-gray-600">Explore open positions across the organization</p>
        </header>

        {/* Filter Panel */}
        <div data-testid="build-job-filter-panel" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                id="department-filter"
                data-testid="build-job-department"
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

            <div className="flex-1 min-w-[200px]">
              <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select
                id="location-filter"
                data-testid="build-job-location"
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

            <div className="flex-1 min-w-[200px]">
              <label htmlFor="grade-level-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Grade Level
              </label>
              <select
                id="grade-level-filter"
                data-testid="build-job-grade-level"
                value={selectedGradeLevel}
                onChange={(e) => setSelectedGradeLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {gradeLevels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                data-testid="build-job-reset"
                onClick={handleReset}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredVacancies.length} of {mockVacancies.length} positions
          </div>
        </div>

        {/* Vacancy List */}
        <div data-testid="build-job-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVacancies.length > 0 ? (
            filteredVacancies.map(vacancy => (
              <div
                key={vacancy.id}
                data-testid="build-job-card"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{vacancy.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Department:</span>
                    <span>{vacancy.department}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Location:</span>
                    <span>{vacancy.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Grade Level:</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                      {vacancy.grade_level}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Closing Date:</span>
                    <span>{new Date(vacancy.closing_date).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">{vacancy.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {vacancy.requirements.map((req, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  data-testid="build-job-apply"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No positions match your filter criteria.</p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
