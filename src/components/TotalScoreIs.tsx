/**
 * TotalScoreIs — Calculates and displays the total score from a list of scored items
 *
 * Features: score calculation, item display, score breakdown, real-time total updates, score validation
 *
 * Ticket: SCRUM-1259 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

interface ScoreItem {
  id: number
  name: string
  score: number
  maxScore: number
}

const MOCK_SCORE_ITEMS: ScoreItem[] = [
  { id: 1, name: 'Addition Problems', score: 18, maxScore: 20 },
  { id: 2, name: 'Subtraction Problems', score: 15, maxScore: 20 },
  { id: 3, name: 'Multiplication Problems', score: 17, maxScore: 20 },
  { id: 4, name: 'Division Problems', score: 14, maxScore: 20 },
  { id: 5, name: 'Word Problems', score: 19, maxScore: 20 },
  { id: 6, name: 'Geometry Problems', score: 16, maxScore: 20 },
  { id: 7, name: 'Fractions', score: 18, maxScore: 20 }
]

export default function TotalScoreIs() {
  const [scoreItems, setScoreItems] = useState<ScoreItem[]>(MOCK_SCORE_ITEMS)

  const calculateTotalScore = (): number => {
    return scoreItems.reduce((total, item) => total + item.score, 0)
  }

  const calculateMaxTotalScore = (): number => {
    return scoreItems.reduce((total, item) => total + item.maxScore, 0)
  }

  const calculatePercentage = (): number => {
    const total = calculateTotalScore()
    const maxTotal = calculateMaxTotalScore()
    return maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0
  }

  const handleScoreUpdate = (id: number, newScore: number) => {
    setScoreItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, score: Math.min(Math.max(0, newScore), item.maxScore) }
          : item
      )
    )
  }

  const handleReset = () => {
    setScoreItems(MOCK_SCORE_ITEMS)
  }

  const totalScore = calculateTotalScore()
  const maxTotalScore = calculateMaxTotalScore()
  const percentage = calculatePercentage()

  return (
    <div data-testid="totalscoreis" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Score Calculator</h1>
          <p className="text-gray-600 mb-6">Track your math quiz performance</p>

          {/* Total Score Display */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Total Score</p>
                <p data-testid="totalscoreis-total" className="text-5xl font-bold mt-2">
                  {totalScore} / {maxTotalScore}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium opacity-90">Percentage</p>
                <p data-testid="totalscoreis-percentage" className="text-5xl font-bold mt-2">
                  {percentage}%
                </p>
              </div>
            </div>
          </div>

          {/* Score Items List */}
          <div data-testid="totalscoreis-list" className="space-y-4 mb-6">
            {scoreItems.map((item) => (
              <div
                key={item.id}
                data-testid="totalscoreis-item"
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <span className="text-sm font-medium text-gray-600">
                    Max: {item.maxScore}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    data-testid={`totalscoreis-score-${item.id}`}
                    value={item.score}
                    onChange={(e) => handleScoreUpdate(item.id, parseInt(e.target.value) || 0)}
                    min={0}
                    max={item.maxScore}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full transition-all duration-300"
                      style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-12 text-right">
                    {Math.round((item.score / item.maxScore) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              data-testid="totalscoreis-reset"
              onClick={handleReset}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
            >
              Reset Scores
            </button>
            <button
              data-testid="totalscoreis-clear"
              onClick={() => setScoreItems(scoreItems.map(item => ({ ...item, score: 0 })))}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Clear All Scores
            </button>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Items</p>
                <p data-testid="totalscoreis-item-count" className="text-2xl font-bold text-gray-800">
                  {scoreItems.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Score</p>
                <p data-testid="totalscoreis-average" className="text-2xl font-bold text-gray-800">
                  {scoreItems.length > 0 ? Math.round(totalScore / scoreItems.length) : 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Grade</p>
                <p data-testid="totalscoreis-grade" className="text-2xl font-bold text-gray-800">
                  {percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
