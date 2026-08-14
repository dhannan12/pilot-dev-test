/**
 * DefineTargetUsers — Interface for defining target user demographics and detailed user personas
 *
 * Features: persona management, demographic visualization, goal tracking, pain point analysis, user segment filtering
 *
 * Ticket: SCRUM-825 | Branch: proto/SCRUM-823
 */

import React, { useState } from 'react'

interface UserPersona {
  id: string
  name: string
  age: number
  occupation: string
  segment: string
  avatar: string
  demographics: {
    income: string
    education: string
    location: string
    familyStatus: string
  }
  goals: string[]
  painPoints: string[]
  behaviors: string[]
  technographics: {
    devices: string[]
    platforms: string[]
    techSavviness: string
  }
  quote: string
}

const mockPersonas: UserPersona[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 32,
    occupation: 'Product Manager',
    segment: 'Early Adopter',
    avatar: '👩‍💼',
    demographics: {
      income: '$85,000 - $120,000',
      education: 'Master\'s Degree',
      location: 'San Francisco, CA',
      familyStatus: 'Single'
    },
    goals: [
      'Stay ahead of tech trends',
      'Optimize team productivity',
      'Implement efficient workflows',
      'Deliver products on time'
    ],
    painPoints: [
      'Too many disconnected tools',
      'Difficult to track progress across teams',
      'Time-consuming status updates',
      'Limited visibility into blockers'
    ],
    behaviors: [
      'Checks project status multiple times daily',
      'Active on LinkedIn and tech communities',
      'Prefers video calls over emails',
      'Early morning and late evening work sessions'
    ],
    technographics: {
      devices: ['MacBook Pro', 'iPhone', 'iPad'],
      platforms: ['Slack', 'Jira', 'Figma', 'Notion'],
      techSavviness: 'Advanced'
    },
    quote: 'I need tools that work seamlessly together, not more apps to juggle.'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    age: 45,
    occupation: 'Engineering Director',
    segment: 'Decision Maker',
    avatar: '👨‍💻',
    demographics: {
      income: '$150,000 - $200,000',
      education: 'Bachelor\'s in Computer Science',
      location: 'Austin, TX',
      familyStatus: 'Married with 2 kids'
    },
    goals: [
      'Build high-performing engineering teams',
      'Reduce technical debt',
      'Improve code quality and delivery speed',
      'Retain top talent'
    ],
    painPoints: [
      'Difficult to measure team productivity objectively',
      'High context switching costs',
      'Budget constraints for tooling',
      'Resistance to change from team members'
    ],
    behaviors: [
      'Reviews metrics and dashboards weekly',
      'Attends industry conferences biannually',
      'Conducts 1-on-1s with direct reports',
      'Focuses on strategic planning'
    ],
    technographics: {
      devices: ['ThinkPad', 'Android Phone', 'Dual Monitors'],
      platforms: ['GitHub', 'Jenkins', 'DataDog', 'Confluence'],
      techSavviness: 'Expert'
    },
    quote: 'Show me the ROI and how it scales with my team size.'
  },
  {
    id: '3',
    name: 'Emily Watson',
    age: 28,
    occupation: 'UX Designer',
    segment: 'Creative Professional',
    avatar: '👩‍🎨',
    demographics: {
      income: '$65,000 - $85,000',
      education: 'Bachelor\'s in Design',
      location: 'Brooklyn, NY',
      familyStatus: 'In a relationship'
    },
    goals: [
      'Create beautiful, user-friendly designs',
      'Collaborate effectively with developers',
      'Build a strong portfolio',
      'Transition to product design role'
    ],
    painPoints: [
      'Design feedback scattered across channels',
      'Difficulty tracking design system consistency',
      'Version control challenges',
      'Limited time for user research'
    ],
    behaviors: [
      'Active on Dribbble and Behance',
      'Attends design meetups monthly',
      'Maintains personal design blog',
      'Prefers visual communication'
    ],
    technographics: {
      devices: ['MacBook Air', 'iPhone', 'Wacom Tablet'],
      platforms: ['Figma', 'Adobe Creative Suite', 'Miro', 'Notion'],
      techSavviness: 'Intermediate'
    },
    quote: 'Good design should feel intuitive, not require a manual.'
  },
  {
    id: '4',
    name: 'James Thompson',
    age: 38,
    occupation: 'Startup Founder',
    segment: 'Entrepreneur',
    avatar: '👨‍💼',
    demographics: {
      income: 'Variable (Equity-focused)',
      education: 'MBA',
      location: 'Miami, FL',
      familyStatus: 'Married with 1 kid'
    },
    goals: [
      'Scale startup to Series A',
      'Build product-market fit',
      'Optimize burn rate',
      'Attract investors and customers'
    ],
    painPoints: [
      'Limited resources and budget',
      'Wearing too many hats',
      'Difficult to prioritize features',
      'Finding reliable contractors'
    ],
    behaviors: [
      'Works 60+ hours per week',
      'Active in startup communities',
      'Constantly networking',
      'Data-driven decision making'
    ],
    technographics: {
      devices: ['MacBook Pro', 'iPhone', 'AirPods'],
      platforms: ['Slack', 'Google Workspace', 'Stripe', 'HubSpot'],
      techSavviness: 'Advanced'
    },
    quote: 'I need solutions that are affordable, scalable, and easy to implement yesterday.'
  },
  {
    id: '5',
    name: 'Priya Patel',
    age: 26,
    occupation: 'Junior Developer',
    segment: 'Emerging Professional',
    avatar: '👩‍💻',
    demographics: {
      income: '$55,000 - $70,000',
      education: 'Bachelor\'s in Computer Science',
      location: 'Seattle, WA',
      familyStatus: 'Single'
    },
    goals: [
      'Learn new technologies and frameworks',
      'Contribute to meaningful projects',
      'Get promoted to mid-level',
      'Build professional network'
    ],
    painPoints: [
      'Steep learning curve on new projects',
      'Imposter syndrome',
      'Limited mentorship opportunities',
      'Overwhelming number of tools to learn'
    ],
    behaviors: [
      'Active on Stack Overflow and GitHub',
      'Takes online courses regularly',
      'Attends hackathons',
      'Seeks feedback frequently'
    ],
    technographics: {
      devices: ['Dell XPS', 'Android Phone', 'Wireless Headphones'],
      platforms: ['VS Code', 'GitHub', 'Discord', 'YouTube'],
      techSavviness: 'Intermediate to Advanced'
    },
    quote: 'I want tools that help me learn faster and make fewer mistakes.'
  }
]

export default function DefineTargetUsers() {
  const [selectedSegment, setSelectedSegment] = useState<string>('All')
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null)

  const segments = ['All', ...Array.from(new Set(mockPersonas.map(p => p.segment)))]

  const filteredPersonas = selectedSegment === 'All'
    ? mockPersonas
    : mockPersonas.filter(p => p.segment === selectedSegment)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Target Users & Personas
          </h1>
          <p className="text-gray-600">
            Define and understand your target audience through detailed user personas
          </p>
        </div>

        {/* Segment Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {segments.map(segment => (
            <button
              key={segment}
              onClick={() => setSelectedSegment(segment)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSegment === segment
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {segment}
            </button>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {filteredPersonas.length}
            </div>
            <div className="text-sm text-gray-600">Total Personas</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {segments.length - 1}
            </div>
            <div className="text-sm text-gray-600">User Segments</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {Math.round(filteredPersonas.reduce((sum, p) => sum + p.age, 0) / filteredPersonas.length)}
            </div>
            <div className="text-sm text-gray-600">Avg Age</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {filteredPersonas.reduce((sum, p) => sum + p.goals.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Goals</div>
          </div>
        </div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPersonas.map(persona => (
            <div
              key={persona.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedPersona(persona)}
            >
              {/* Persona Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{persona.avatar}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {persona.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {persona.occupation}, {persona.age}
                    </p>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {persona.segment}
                    </span>
                  </div>
                </div>
              </div>

              {/* Demographics */}
              <div className="p-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Demographics</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Income:</span>
                    <div className="text-gray-900 font-medium">{persona.demographics.income}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Education:</span>
                    <div className="text-gray-900 font-medium">{persona.demographics.education}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <div className="text-gray-900 font-medium">{persona.demographics.location}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <div className="text-gray-900 font-medium">{persona.demographics.familyStatus}</div>
                  </div>
                </div>
              </div>

              {/* Goals */}
              <div className="p-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Goals</h4>
                <ul className="space-y-2">
                  {persona.goals.slice(0, 3).map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pain Points */}
              <div className="p-6 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Pain Points</h4>
                <ul className="space-y-2">
                  {persona.painPoints.slice(0, 3).map((pain, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <div className="p-6 bg-gray-50">
                <p className="text-sm italic text-gray-700">
                  "{persona.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal */}
        {selectedPersona && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPersona(null)}
          >
            <div 
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedPersona.avatar}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedPersona.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedPersona.occupation}, {selectedPersona.age}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPersona(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* All Goals */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">All Goals</h3>
                  <ul className="space-y-2">
                    {selectedPersona.goals.map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* All Pain Points */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">All Pain Points</h3>
                  <ul className="space-y-2">
                    {selectedPersona.painPoints.map((pain, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Behaviors */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Behaviors</h3>
                  <ul className="space-y-2">
                    {selectedPersona.behaviors.map((behavior, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>{behavior}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technographics */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Technographics</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Devices:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPersona.technographics.devices.map((device, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {device}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Platforms:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPersona.technographics.platforms.map((platform, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Tech Savviness:</span>
                      <div className="text-gray-900 font-medium mt-1">
                        {selectedPersona.technographics.techSavviness}
                      </div>
                    </div>
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
