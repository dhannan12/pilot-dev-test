/**
 * UserTriesTo — Displays a prompt when user tries to access personalized insights without setting a wellness goal
 *
 * Features: Goal setup prompt, insights preview, navigation to goal setup, visual feedback, motivational messaging
 *
 * Ticket: SCRUM-1118 | Branch: proto/SCRUM-1115
 */

import React, { useState } from 'react'

interface InsightPreview {
  id: number
  title: string
  description: string
  icon: string
  requiresGoal: boolean
}

const MOCK_INSIGHTS: InsightPreview[] = [
  {
    id: 1,
    title: 'Sleep Quality Analysis',
    description: 'Personalized recommendations based on your sleep patterns and wellness goals',
    icon: '😴',
    requiresGoal: true
  },
  {
    id: 2,
    title: 'Activity Trends',
    description: 'Track your progress towards fitness goals with detailed activity insights',
    icon: '🏃',
    requiresGoal: true
  },
  {
    id: 3,
    title: 'Nutrition Balance',
    description: 'Custom meal suggestions aligned with your health and wellness objectives',
    icon: '🥗',
    requiresGoal: true
  },
  {
    id: 4,
    title: 'Stress Management',
    description: 'Mindfulness tips and stress tracking based on your wellness priorities',
    icon: '🧘',
    requiresGoal: true
  },
  {
    id: 5,
    title: 'Health Score',
    description: 'Comprehensive wellness score calculated from your goals and daily activities',
    icon: '💯',
    requiresGoal: true
  }
]

export default function UserTriesTo() {
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const handleInsightClick = (insightId: number) => {
    setSelectedInsight(insightId)
    setShowModal(true)
  }

  const handleSetupGoal = () => {
    // Navigate to goal setup page
    console.log('Navigating to goal setup...')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedInsight(null)
  }

  return (
    <div data-testid="usertriesto" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Personalized Health Insights
          </h1>
          <p className="text-gray-600">
            Unlock customized wellness recommendations tailored to your goals
          </p>
        </div>

        {/* No Goal Set Alert */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6 rounded-lg shadow-sm">
          <div className="flex items-start">
            <div className="text-4xl mr-4">⚠️</div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">
                Wellness Goal Not Set
              </h2>
              <p className="text-yellow-700 mb-4">
                To access personalized insights and recommendations, you need to set up your wellness goals first. 
                This helps us tailor our suggestions to your unique health journey.
              </p>
              <button
                data-testid="usertriesto-setup-goal"
                onClick={handleSetupGoal}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md"
              >
                Set Up Your Wellness Goal
              </button>
            </div>
          </div>
        </div>

        {/* Insights Preview (Locked) */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available Insights (Requires Goal Setup)
          </h2>
          <ul data-testid="usertriesto-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_INSIGHTS.map((insight) => (
              <li
                key={insight.id}
                data-testid="usertriesto-item"
                className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 opacity-75"
                onClick={() => handleInsightClick(insight.id)}
              >
                <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                  🔒 Locked
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{insight.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {insight.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Set a Wellness Goal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-2">Personalized Tracking</h3>
              <p className="text-sm text-gray-600">
                Get insights specific to your health objectives
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-800 mb-2">Progress Monitoring</h3>
              <p className="text-sm text-gray-600">
                Track your journey with meaningful metrics
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">💡</div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Recommendations</h3>
              <p className="text-sm text-gray-600">
                Receive AI-powered suggestions for your goals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Locked Insight */}
      {showModal && (
        <div
          data-testid="usertriesto-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Insight Locked
              </h3>
              <p className="text-gray-600">
                This insight requires you to set up your wellness goal first. 
                Set your goal now to unlock personalized recommendations.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                data-testid="usertriesto-modal-setup"
                onClick={handleSetupGoal}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Set Up Goal
              </button>
              <button
                data-testid="usertriesto-modal-close"
                onClick={handleCloseModal}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
