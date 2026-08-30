/**
 * TrainingMaterialsAre — Displays available training materials for teachers
 *
 * Features: Material listing, type filtering, search, download/view actions, resource categorization
 *
 * Ticket: SCRUM-1262 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

interface TrainingMaterial {
  id: number
  title: string
  description: string
  type: 'video' | 'pdf' | 'guide' | 'worksheet' | 'presentation'
  duration: string
  category: string
  url: string
}

const MOCK_MATERIALS: TrainingMaterial[] = [
  {
    id: 1,
    title: 'Introduction to Advanced Mathematics Teaching',
    description: 'Comprehensive guide on modern teaching methodologies for advanced math concepts including algebra and geometry.',
    type: 'video',
    duration: '45 min',
    category: 'Pedagogy',
    url: '#'
  },
  {
    id: 2,
    title: 'Differentiated Instruction Strategies',
    description: 'Learn how to adapt your teaching style to meet diverse student needs and learning abilities in the classroom.',
    type: 'pdf',
    duration: '12 pages',
    category: 'Teaching Methods',
    url: '#'
  },
  {
    id: 3,
    title: 'Assessment and Evaluation Best Practices',
    description: 'Detailed framework for creating effective assessments and providing meaningful feedback to students.',
    type: 'guide',
    duration: '20 pages',
    category: 'Assessment',
    url: '#'
  },
  {
    id: 4,
    title: 'Interactive Problem-Solving Activities',
    description: 'Ready-to-use worksheets and activities to engage students in collaborative problem-solving exercises.',
    type: 'worksheet',
    duration: '8 worksheets',
    category: 'Activities',
    url: '#'
  },
  {
    id: 5,
    title: 'Technology Integration in Math Education',
    description: 'Presentation on incorporating digital tools and apps to enhance mathematics learning outcomes.',
    type: 'presentation',
    duration: '32 slides',
    category: 'Technology',
    url: '#'
  },
  {
    id: 6,
    title: 'Classroom Management for Math Teachers',
    description: 'Practical strategies for maintaining an engaging and productive learning environment during math lessons.',
    type: 'video',
    duration: '30 min',
    category: 'Management',
    url: '#'
  },
  {
    id: 7,
    title: 'Supporting Students with Math Anxiety',
    description: 'Evidence-based approaches to help students overcome fear and build confidence in mathematics.',
    type: 'guide',
    duration: '15 pages',
    category: 'Student Support',
    url: '#'
  },
  {
    id: 8,
    title: 'Curriculum Planning Template',
    description: 'Comprehensive template for planning semester-long math curriculum with learning objectives and milestones.',
    type: 'worksheet',
    duration: '5 templates',
    category: 'Planning',
    url: '#'
  }
]

export default function TrainingMaterialsAre() {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMaterials = MOCK_MATERIALS.filter(material => {
    const matchesType = selectedType === 'all' || material.type === selectedType
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥'
      case 'pdf': return '📄'
      case 'guide': return '📚'
      case 'worksheet': return '📝'
      case 'presentation': return '📊'
      default: return '📎'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-purple-100 text-purple-800'
      case 'pdf': return 'bg-red-100 text-red-800'
      case 'guide': return 'bg-blue-100 text-blue-800'
      case 'worksheet': return 'bg-green-100 text-green-800'
      case 'presentation': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="trainingmaterialsare" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Training Materials</h1>
          <p className="text-lg text-gray-600">Professional development resources for mathematics educators</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Materials
              </label>
              <input
                id="search"
                type="text"
                data-testid="trainingmaterialsare-search"
                placeholder="Search by title, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Type
              </label>
              <select
                id="type-filter"
                data-testid="trainingmaterialsare-type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="video">Videos</option>
                <option value="pdf">PDFs</option>
                <option value="guide">Guides</option>
                <option value="worksheet">Worksheets</option>
                <option value="presentation">Presentations</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredMaterials.length}</span> of{' '}
            <span className="font-semibold">{MOCK_MATERIALS.length}</span> materials
          </div>
        </div>

        {/* Materials List */}
        <div data-testid="trainingmaterialsare-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(material => (
            <div
              key={material.id}
              data-testid="trainingmaterialsare-item"
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Material Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{getTypeIcon(material.type)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(material.type)}`}>
                    {material.type.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {material.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {material.description}
                </p>

                {/* Material Metadata */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <span className="mr-1">⏱️</span>
                    <span>{material.duration}</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                    {material.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    data-testid="trainingmaterialsare-view"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    View
                  </button>
                  <button
                    data-testid="trainingmaterialsare-download"
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              data-testid="trainingmaterialsare-clear-filters"
              onClick={() => {
                setSearchQuery('')
                setSelectedType('all')
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
