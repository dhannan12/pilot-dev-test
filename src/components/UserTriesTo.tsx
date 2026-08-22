/**
 * UserTriesTo — Displays a prompt when user tries to access advanced features without completing the educational module
 *
 * Features: Educational module requirement, feature preview, module completion tracking, navigation to education, progress indication
 *
 * Ticket: SCRUM-1122 | Branch: proto/SCRUM-1115
 */

import React, { useState } from 'react'

interface AdvancedFeature {
  id: number
  title: string
  description: string
  icon: string
  requiresEducation: boolean
  moduleRequired: string
}

const MOCK_FEATURES: AdvancedFeature[] = [
  {
    id: 1,
    title: 'Advanced Analytics Dashboard',
    description: 'Deep dive into your health metrics with predictive analytics and trend forecasting',
    icon: '📊',
    requiresEducation: true,
    moduleRequired: 'Data Interpretation Basics'
  },
  {
    id: 2,
    title: 'Custom Workout Plans',
    description: 'Create personalized exercise routines based on advanced fitness principles',
    icon: '💪',
    requiresEducation: true,
    moduleRequired: 'Exercise Science Fundamentals'
  },
  {
    id: 3,
    title: 'Medication Interaction Checker',
    description: 'Analyze potential interactions between supplements and medications',
    icon: '💊',
    requiresEducation: true,
    moduleRequired: 'Health Safety Protocols'
  },
  {
    id: 4,
    title: 'Biometric Data Integration',
    description: 'Connect and interpret data from multiple wearable devices',
    icon: '⌚',
    requiresEducation: true,
    moduleRequired: 'Device Data Understanding'
  },
  {
    id: 5,
    title: 'AI Health Coach',
    description: 'Get personalized coaching based on machine learning insights',
    icon: '🤖',
    requiresEducation: true,
    moduleRequired: 'AI Insights Interpretation'
  }
]

export default function UserTriesTo() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)
  const educationProgress = 0 // User has not completed education

  const handleFeatureClick = (featureId: number) => {
    setSelectedFeature(featureId)
    setShowModal(true)
  }

  const handleStartEducation = () => {
    // Navigate to educational module
    console.log('Navigating to educational module...')
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedFeature(null)
  }

  const selectedFeatureData = selectedFeature 
    ? MOCK_FEATURES.find(f => f.id === selectedFeature)
    : null

  return (
    <div data-testid="usertriesto" className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Advanced Health Features
          </h1>
          <p className="text-gray-600">
            Unlock powerful tools to take control of your health journey
          </p>
        </div>

        {/* Education Required Alert */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6 rounded-lg shadow-sm">
          <div className="flex items-start">
            <div className="text-4xl mr-4">📚</div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-amber-800 mb-2">
                Educational Module Required
              </h2>
              <p className="text-amber-700 mb-3">
                To ensure safe and effective use of advanced features, you need to complete our educational module first. 
                This brief course covers important concepts about health data interpretation and safe feature usage.
              </p>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-amber-700 mb-1">
                  <span>Education Progress</span>
                  <span>{educationProgress}%</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-3">
                  <div 
                    className="bg-amber-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${educationProgress}%` }}
                  ></div>
                </div>
              </div>
              <button
                data-testid="usertriesto-start-education"
                onClick={handleStartEducation}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md"
              >
                Start Educational Module
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Features Preview (Locked) */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available Advanced Features (Requires Education)
          </h2>
          <ul data-testid="usertriesto-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_FEATURES.map((feature) => (
              <li
                key={feature.id}
                data-testid="usertriesto-item"
                className="bg-white rounded-lg shadow-md p-5 relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 opacity-70"
                onClick={() => handleFeatureClick(feature.id)}
              >
                <div className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <span className="mr-1">🔒</span>
                  <span>Locked</span>
                </div>
                <div className="text-center mb-3">
                  <div className="text-5xl mb-2">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {feature.description}
                  </p>
                  <div className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                    Requires: {feature.moduleRequired}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Complete the Educational Module?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🎓</div>
              <h3 className="font-semibold text-gray-800 mb-2">Learn Safely</h3>
              <p className="text-sm text-gray-600">
                Understand health concepts before using advanced tools
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🔓</div>
              <h3 className="font-semibold text-gray-800 mb-2">Unlock Features</h3>
              <p className="text-sm text-gray-600">
                Gain access to powerful health management tools
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="font-semibold text-gray-800 mb-2">Make Informed Decisions</h3>
              <p className="text-sm text-gray-600">
                Use data confidently with proper knowledge
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-2">Quick & Easy</h3>
              <p className="text-sm text-gray-600">
                Complete the module in just 15 minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Locked Feature */}
      {showModal && selectedFeatureData && (
        <div
          data-testid="usertriesto-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedFeatureData.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {selectedFeatureData.title}
              </h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl mr-2">🔒</span>
                  <span className="font-semibold text-red-800">Feature Locked</span>
                </div>
                <p className="text-red-700 text-sm">
                  This feature requires completing the educational module: 
                  <strong> {selectedFeatureData.moduleRequired}</strong>
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                {selectedFeatureData.description}
              </p>
              <p className="text-gray-500 text-sm">
                Complete the educational module to ensure you can use this feature safely and effectively.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                data-testid="usertriesto-modal-start"
                onClick={handleStartEducation}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Start Education
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
