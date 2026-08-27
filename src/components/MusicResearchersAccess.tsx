/**
 * MusicResearchersAccess — Data analysis dashboard for music researchers
 *
 * Features: analysis sections, trend reports, genre statistics, researcher tools, dataset access
 *
 * Ticket: SCRUM-1228 | Branch: proto/SCRUM-1223
 */

import React, { useState } from 'react'

interface AnalysisSection {
  id: string
  name: string
  description: string
  datasets: number
  lastUpdated: string
  category: 'trends' | 'genres' | 'demographics' | 'streaming' | 'charts'
}

const mockAnalysisSections: AnalysisSection[] = [
  {
    id: 'trends-2024',
    name: 'Global Music Trends 2024',
    description: 'Comprehensive analysis of worldwide music consumption patterns and emerging trends',
    datasets: 42,
    lastUpdated: '2024-03-15',
    category: 'trends'
  },
  {
    id: 'genre-analysis',
    name: 'Genre Evolution Analysis',
    description: 'Historical and predictive analysis of genre popularity and cross-genre influences',
    datasets: 38,
    lastUpdated: '2024-03-14',
    category: 'genres'
  },
  {
    id: 'demographic-study',
    name: 'Listener Demographics Study',
    description: 'Age, location, and behavioral patterns of music listeners across platforms',
    datasets: 55,
    lastUpdated: '2024-03-13',
    category: 'demographics'
  },
  {
    id: 'streaming-metrics',
    name: 'Streaming Platform Metrics',
    description: 'Comparative analysis of streaming data across major music platforms',
    datasets: 67,
    lastUpdated: '2024-03-12',
    category: 'streaming'
  },
  {
    id: 'chart-performance',
    name: 'Chart Performance Analytics',
    description: 'Track performance metrics, chart positions, and trending patterns',
    datasets: 31,
    lastUpdated: '2024-03-11',
    category: 'charts'
  },
  {
    id: 'artist-discovery',
    name: 'Artist Discovery Patterns',
    description: 'Analysis of how listeners discover new artists and music',
    datasets: 29,
    lastUpdated: '2024-03-10',
    category: 'trends'
  },
  {
    id: 'regional-preferences',
    name: 'Regional Music Preferences',
    description: 'Geographic analysis of music taste and regional popularity',
    datasets: 44,
    lastUpdated: '2024-03-09',
    category: 'demographics'
  }
]

export default function MusicResearchersAccess() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', 'trends', 'genres', 'demographics', 'streaming', 'charts']

  const filteredSections = mockAnalysisSections.filter(section => {
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory
    const matchesSearch = section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         section.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      trends: 'bg-blue-100 text-blue-800',
      genres: 'bg-purple-100 text-purple-800',
      demographics: 'bg-green-100 text-green-800',
      streaming: 'bg-orange-100 text-orange-800',
      charts: 'bg-pink-100 text-pink-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div data-testid="musicresearchersaccess" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Music Research Data Analysis
          </h1>
          <p className="text-gray-600">
            Access comprehensive datasets and analysis tools for music industry research
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Analysis Sections
              </label>
              <input
                id="search"
                type="text"
                data-testid="musicresearchersaccess-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category"
                data-testid="musicresearchersaccess-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredSections.length} of {mockAnalysisSections.length} analysis sections
          </p>
        </div>

        {/* Analysis Sections List */}
        <div data-testid="musicresearchersaccess-list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSections.map(section => (
            <div
              key={section.id}
              data-testid="musicresearchersaccess-item"
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  {section.name}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(section.category)}`}>
                  {section.category}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {section.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{section.datasets} datasets</span>
                <span>Updated {section.lastUpdated}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  data-testid="musicresearchersaccess-view"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  View Analysis
                </button>
                <button
                  data-testid="musicresearchersaccess-download"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSections.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">
              No analysis sections found matching your criteria
            </p>
            <button
              data-testid="musicresearchersaccess-reset"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              data-testid="musicresearchersaccess-export-all"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Export All Data
            </button>
            <button
              data-testid="musicresearchersaccess-request"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Request Custom Analysis
            </button>
            <button
              data-testid="musicresearchersaccess-schedule"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Schedule Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
