/**
 * HiringTrack — Candidate recruitment pipeline tracker for hiring managers
 *
 * Features: multi-stage pipeline view, candidate cards, status filtering, progress tracking, pipeline metrics
 *
 * Ticket: SCRUM-1009 | Branch: proto/SCRUM-1009
 */

import { useState } from 'react'

interface Candidate {
  id: number
  name: string
  position: string
  appliedDate: string
  stage: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'
  email: string
  phone: string
  experience: string
  skills: string[]
}

const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Senior Frontend Developer',
    appliedDate: '2026-08-10',
    stage: 'interview',
    email: 'sarah.j@email.com',
    phone: '+1-555-0101',
    experience: '6 years',
    skills: ['React', 'TypeScript', 'Node.js']
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Backend Engineer',
    appliedDate: '2026-08-12',
    stage: 'screening',
    email: 'mchen@email.com',
    phone: '+1-555-0102',
    experience: '4 years',
    skills: ['Python', 'Django', 'PostgreSQL']
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'UX Designer',
    appliedDate: '2026-08-08',
    stage: 'offer',
    email: 'emily.r@email.com',
    phone: '+1-555-0103',
    experience: '5 years',
    skills: ['Figma', 'User Research', 'Prototyping']
  },
  {
    id: 4,
    name: 'David Kim',
    position: 'DevOps Engineer',
    appliedDate: '2026-08-15',
    stage: 'applied',
    email: 'dkim@email.com',
    phone: '+1-555-0104',
    experience: '7 years',
    skills: ['Kubernetes', 'AWS', 'Terraform']
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    position: 'Product Manager',
    appliedDate: '2026-08-05',
    stage: 'hired',
    email: 'jmartinez@email.com',
    phone: '+1-555-0105',
    experience: '8 years',
    skills: ['Product Strategy', 'Agile', 'Analytics']
  },
  {
    id: 6,
    name: 'Robert Taylor',
    position: 'Senior Frontend Developer',
    appliedDate: '2026-08-14',
    stage: 'screening',
    email: 'rtaylor@email.com',
    phone: '+1-555-0106',
    experience: '5 years',
    skills: ['Vue.js', 'JavaScript', 'CSS']
  },
  {
    id: 7,
    name: 'Amanda White',
    position: 'Data Scientist',
    appliedDate: '2026-08-09',
    stage: 'interview',
    email: 'awhite@email.com',
    phone: '+1-555-0107',
    experience: '3 years',
    skills: ['Python', 'Machine Learning', 'SQL']
  },
  {
    id: 8,
    name: 'Christopher Lee',
    position: 'Backend Engineer',
    appliedDate: '2026-08-11',
    stage: 'rejected',
    email: 'clee@email.com',
    phone: '+1-555-0108',
    experience: '2 years',
    skills: ['Java', 'Spring Boot', 'MySQL']
  }
]

const stages = [
  { key: 'applied', label: 'Applied', color: 'bg-gray-100 border-gray-300' },
  { key: 'screening', label: 'Screening', color: 'bg-blue-100 border-blue-300' },
  { key: 'interview', label: 'Interview', color: 'bg-purple-100 border-purple-300' },
  { key: 'offer', label: 'Offer', color: 'bg-yellow-100 border-yellow-300' },
  { key: 'hired', label: 'Hired', color: 'bg-green-100 border-green-300' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-100 border-red-300' }
] as const

export default function HiringTrack() {
  const [selectedStage, setSelectedStage] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesStage = selectedStage === 'all' || candidate.stage === selectedStage
    const matchesSearch = searchQuery === '' || 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStage && matchesSearch
  })

  const getCandidatesByStage = (stageKey: string) => {
    return mockCandidates.filter(c => c.stage === stageKey)
  }

  const getStageColor = (stage: string) => {
    const stageConfig = stages.find(s => s.key === stage)
    return stageConfig?.color || 'bg-gray-100 border-gray-300'
  }

  return (
    <div data-testid="hiring-track" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recruitment Pipeline
          </h1>
          <p className="text-gray-600">
            Track and manage candidates throughout the hiring process
          </p>
        </div>

        {/* Metrics Dashboard */}
        <div data-testid="hiring-track-metrics" className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {stages.map(stage => {
            const count = getCandidatesByStage(stage.key).length
            return (
              <div
                key={stage.key}
                data-testid={`hiring-track-metric-${stage.key}`}
                className={`p-4 rounded-lg border-2 ${stage.color}`}
              >
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-700">{stage.label}</div>
              </div>
            )
          })}
        </div>

        {/* Filters */}
        <div data-testid="hiring-track-filters" className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Candidates
              </label>
              <input
                id="search"
                type="text"
                data-testid="hiring-track-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or position..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="stage-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Stage
              </label>
              <select
                id="stage-filter"
                data-testid="hiring-track-stage-filter"
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Stages</option>
                {stages.map(stage => (
                  <option key={stage.key} value={stage.key}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredCandidates.length}</span> candidate(s)
          </p>
        </div>

        {/* Candidates List */}
        <div data-testid="hiring-track-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No candidates found matching your criteria
            </div>
          ) : (
            filteredCandidates.map(candidate => (
              <div
                key={candidate.id}
                data-testid="hiring-track-candidate-card"
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Candidate Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {candidate.position}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border-2 ${getStageColor(candidate.stage)}`}
                  >
                    {stages.find(s => s.key === candidate.stage)?.label}
                  </span>
                </div>

                {/* Candidate Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Applied:</span>
                    <span>{new Date(candidate.appliedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Experience:</span>
                    <span>{candidate.experience}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Email:</span>
                    <span className="truncate">{candidate.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Phone:</span>
                    <span>{candidate.phone}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    data-testid="hiring-track-view-details"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    data-testid="hiring-track-update-status"
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
