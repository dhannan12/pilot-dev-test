/**
 * UserNavigatesTo — Navigation component for accessing match tracking features
 *
 * Features: match tracking navigation, feature cards, quick access links, category filtering, feature descriptions
 *
 * Ticket: SCRUM-1207 | Branch: proto/SCRUM-1199
 */

import React, { useState } from 'react'

interface MatchFeature {
  id: string
  title: string
  description: string
  category: 'live' | 'history' | 'analytics' | 'planning'
  icon: string
  path: string
}

const MATCH_FEATURES: MatchFeature[] = [
  {
    id: '1',
    title: 'Live Match Tracker',
    description: 'Follow ongoing matches in real-time with live scores and updates',
    category: 'live',
    icon: '🔴',
    path: '/matches/live'
  },
  {
    id: '2',
    title: 'Match History',
    description: 'Browse past matches and review detailed results and statistics',
    category: 'history',
    icon: '📚',
    path: '/matches/history'
  },
  {
    id: '3',
    title: 'Match Statistics',
    description: 'Analyze comprehensive stats and performance metrics',
    category: 'analytics',
    icon: '📊',
    path: '/matches/statistics'
  },
  {
    id: '4',
    title: 'Match Predictions',
    description: 'View AI-powered predictions and probability analysis',
    category: 'analytics',
    icon: '🔮',
    path: '/matches/predictions'
  },
  {
    id: '5',
    title: 'Match Schedule',
    description: 'Check upcoming matches and set reminders for your favorites',
    category: 'planning',
    icon: '📅',
    path: '/matches/schedule'
  },
  {
    id: '6',
    title: 'Match Highlights',
    description: 'Watch key moments and highlights from recent matches',
    category: 'history',
    icon: '⭐',
    path: '/matches/highlights'
  },
  {
    id: '7',
    title: 'Player Performance',
    description: 'Track individual player statistics across all matches',
    category: 'analytics',
    icon: '👤',
    path: '/matches/players'
  }
]

const CATEGORIES = [
  { value: 'all', label: 'All Features' },
  { value: 'live', label: 'Live' },
  { value: 'history', label: 'History' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'planning', label: 'Planning' }
]

export default function UserNavigatesTo() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredFeatures = MATCH_FEATURES.filter(feature => {
    const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory
    const matchesSearch = feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleFeatureClick = (feature: MatchFeature) => {
    console.log(`Navigating to: ${feature.path}`)
    // In a real app, this would trigger navigation
  }

  return (
    <div data-testid="usernavigatesto" className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Match Tracking Features</h1>
          <p className="text-slate-300">Navigate to your preferred match tracking tool</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                data-testid="usernavigatesto-search"
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-slate-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                data-testid="usernavigatesto-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value} className="bg-slate-800">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div data-testid="usernavigatesto-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map(feature => (
            <div
              key={feature.id}
              data-testid="usernavigatesto-item"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-blue-500/20"
              onClick={() => handleFeatureClick(feature)}
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>

              {/* Description */}
              <p className="text-slate-300 text-sm mb-4">{feature.description}</p>

              {/* Category Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  {feature.category}
                </span>
                <button
                  data-testid="usernavigatesto-navigate"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFeatureClick(feature)
                  }}
                  className="text-sm text-blue-300 hover:text-blue-100 font-medium"
                >
                  Go →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No features match your search criteria</p>
            <button
              data-testid="usernavigatesto-clear"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">{MATCH_FEATURES.length}</div>
              <div className="text-sm text-slate-400 mt-1">Total Features</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">{filteredFeatures.length}</div>
              <div className="text-sm text-slate-400 mt-1">Showing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">
                {MATCH_FEATURES.filter(f => f.category === 'live').length}
              </div>
              <div className="text-sm text-slate-400 mt-1">Live Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">
                {MATCH_FEATURES.filter(f => f.category === 'analytics').length}
              </div>
              <div className="text-sm text-slate-400 mt-1">Analytics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
