/**
 * PuzzlesEnhanceStudent — Interactive math puzzle component for student engagement
 *
 * Features: puzzle browsing, difficulty levels, category filters, progress tracking, puzzle launching
 *
 * Ticket: SCRUM-1257 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

interface Puzzle {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  points: number
  completed: boolean
  icon: string
}

const MOCK_PUZZLES: Puzzle[] = [
  {
    id: 'p1',
    title: 'Number Pattern Detective',
    description: 'Find the missing numbers in the sequence and discover the pattern!',
    category: 'Patterns',
    difficulty: 'Easy',
    points: 50,
    completed: true,
    icon: '🔢'
  },
  {
    id: 'p2',
    title: 'Fraction Pizza Party',
    description: 'Slice pizzas into fractions and solve delicious math problems.',
    category: 'Fractions',
    difficulty: 'Medium',
    points: 100,
    completed: false,
    icon: '🍕'
  },
  {
    id: 'p3',
    title: 'Geometry Shape Builder',
    description: 'Build complex shapes from basic geometric forms and calculate areas.',
    category: 'Geometry',
    difficulty: 'Hard',
    points: 150,
    completed: false,
    icon: '📐'
  },
  {
    id: 'p4',
    title: 'Multiplication Race',
    description: 'Race against the clock to solve multiplication problems!',
    category: 'Multiplication',
    difficulty: 'Easy',
    points: 75,
    completed: true,
    icon: '⚡'
  },
  {
    id: 'p5',
    title: 'Word Problem Adventure',
    description: 'Solve real-world math problems through an exciting story adventure.',
    category: 'Word Problems',
    difficulty: 'Medium',
    points: 120,
    completed: false,
    icon: '📚'
  },
  {
    id: 'p6',
    title: 'Algebra Equation Master',
    description: 'Balance equations and solve for unknown variables in this challenge.',
    category: 'Algebra',
    difficulty: 'Hard',
    points: 200,
    completed: false,
    icon: '🎯'
  },
  {
    id: 'p7',
    title: 'Mental Math Sprint',
    description: 'Quick calculation challenges to sharpen your mental math skills.',
    category: 'Mental Math',
    difficulty: 'Easy',
    points: 60,
    completed: false,
    icon: '🧠'
  }
]

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 text-green-800 border-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Hard: 'bg-red-100 text-red-800 border-red-300'
}

export default function PuzzlesEnhanceStudent() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(MOCK_PUZZLES.map(p => p.category)))]
  const difficulties = ['All', 'Easy', 'Medium', 'Hard']

  const filteredPuzzles = MOCK_PUZZLES.filter(puzzle => {
    const matchesDifficulty = selectedDifficulty === 'All' || puzzle.difficulty === selectedDifficulty
    const matchesCategory = selectedCategory === 'All' || puzzle.category === selectedCategory
    return matchesDifficulty && matchesCategory
  })

  const completedCount = MOCK_PUZZLES.filter(p => p.completed).length
  const totalPoints = MOCK_PUZZLES.filter(p => p.completed).reduce((sum, p) => sum + p.points, 0)

  return (
    <div data-testid="puzzlesenhancestudent" className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            🧩 Math Puzzle Challenge
          </h1>
          <p className="text-gray-600 text-lg">
            Boost your math skills with fun, engaging puzzles!
          </p>
          
          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <div className="text-3xl font-bold text-purple-700">{completedCount}</div>
              <div className="text-sm text-purple-600 font-medium">Puzzles Completed</div>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-700">{totalPoints}</div>
              <div className="text-sm text-blue-600 font-medium">Points Earned</div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-lg p-4 border-2 border-green-200">
              <div className="text-3xl font-bold text-green-700">{MOCK_PUZZLES.length}</div>
              <div className="text-sm text-green-600 font-medium">Total Puzzles</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Puzzles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="difficulty-select" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                id="difficulty-select"
                data-testid="puzzlesenhancestudent-difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 bg-white"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category-select"
                data-testid="puzzlesenhancestudent-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            data-testid="puzzlesenhancestudent-reset"
            onClick={() => {
              setSelectedDifficulty('All')
              setSelectedCategory('All')
            }}
            className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Reset Filters
          </button>
        </div>

        {/* Puzzles Grid */}
        <div data-testid="puzzlesenhancestudent-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPuzzles.map(puzzle => (
            <div
              key={puzzle.id}
              data-testid="puzzlesenhancestudent-item"
              className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                puzzle.completed ? 'border-green-300' : 'border-gray-200'
              }`}
            >
              <div className={`h-3 ${puzzle.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-5xl">{puzzle.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${DIFFICULTY_COLORS[puzzle.difficulty]}`}>
                    {puzzle.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {puzzle.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {puzzle.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {puzzle.category}
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {puzzle.points} pts
                  </span>
                </div>

                {puzzle.completed ? (
                  <button
                    data-testid="puzzlesenhancestudent-replay"
                    className="w-full py-3 bg-green-100 text-green-700 rounded-lg font-bold border-2 border-green-300 hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>✓</span>
                    Replay Puzzle
                  </button>
                ) : (
                  <button
                    data-testid="puzzlesenhancestudent-start"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Start Puzzle
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPuzzles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Puzzles Found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more puzzles.</p>
          </div>
        )}
      </div>
    </div>
  )
}
