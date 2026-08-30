/**
 * FeedbackIsProvided — Displays feedback after completing math exercises
 *
 * Features: exercise review, correctness indicators, detailed explanations, score tracking, color-coded feedback
 *
 * Ticket: SCRUM-1260 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

interface ExerciseFeedback {
  id: number
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  explanation: string
  pointsEarned: number
  maxPoints: number
  topic: string
}

const MOCK_FEEDBACK: ExerciseFeedback[] = [
  {
    id: 1,
    question: 'What is 7 × 8?',
    userAnswer: '56',
    correctAnswer: '56',
    isCorrect: true,
    explanation: 'Excellent! You correctly multiplied 7 by 8 to get 56.',
    pointsEarned: 10,
    maxPoints: 10,
    topic: 'Multiplication'
  },
  {
    id: 2,
    question: 'Solve: 15 + 23 = ?',
    userAnswer: '37',
    correctAnswer: '38',
    isCorrect: false,
    explanation: 'Not quite. When adding 15 + 23, remember to carry the 1 from the ones place. The correct answer is 38.',
    pointsEarned: 0,
    maxPoints: 10,
    topic: 'Addition'
  },
  {
    id: 3,
    question: 'What is 144 ÷ 12?',
    userAnswer: '12',
    correctAnswer: '12',
    isCorrect: true,
    explanation: 'Perfect! 144 divided by 12 equals 12. You can verify this by multiplying 12 × 12 = 144.',
    pointsEarned: 10,
    maxPoints: 10,
    topic: 'Division'
  },
  {
    id: 4,
    question: 'Simplify: 3/9',
    userAnswer: '1/4',
    correctAnswer: '1/3',
    isCorrect: false,
    explanation: 'Remember to find the greatest common divisor. Both 3 and 9 are divisible by 3, so 3÷3 = 1 and 9÷3 = 3, giving us 1/3.',
    pointsEarned: 0,
    maxPoints: 10,
    topic: 'Fractions'
  },
  {
    id: 5,
    question: 'What is 25% of 80?',
    userAnswer: '20',
    correctAnswer: '20',
    isCorrect: true,
    explanation: 'Great work! 25% means 1/4, and 80 ÷ 4 = 20. You can also calculate it as 0.25 × 80 = 20.',
    pointsEarned: 10,
    maxPoints: 10,
    topic: 'Percentages'
  },
  {
    id: 6,
    question: 'Solve: x + 5 = 12',
    userAnswer: '7',
    correctAnswer: '7',
    isCorrect: true,
    explanation: 'Correct! By subtracting 5 from both sides, you found that x = 7.',
    pointsEarned: 10,
    maxPoints: 10,
    topic: 'Algebra'
  },
  {
    id: 7,
    question: 'What is the area of a rectangle with length 6 and width 4?',
    userAnswer: '20',
    correctAnswer: '24',
    isCorrect: false,
    explanation: 'The area of a rectangle is length × width. So 6 × 4 = 24 square units, not 20.',
    pointsEarned: 0,
    maxPoints: 10,
    topic: 'Geometry'
  }
]

export default function FeedbackIsProvided() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const totalPoints = MOCK_FEEDBACK.reduce((sum, fb) => sum + fb.pointsEarned, 0)
  const maxTotalPoints = MOCK_FEEDBACK.reduce((sum, fb) => sum + fb.maxPoints, 0)
  const correctCount = MOCK_FEEDBACK.filter(fb => fb.isCorrect).length

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section data-testid="feedbackisprovided" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Exercise Feedback</h1>
          <div className="flex gap-6 text-lg">
            <div className="flex-1 bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <p className="text-green-700 font-semibold">Correct Answers</p>
              <p className="text-3xl font-bold text-green-800">{correctCount} / {MOCK_FEEDBACK.length}</p>
            </div>
            <div className="flex-1 bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <p className="text-blue-700 font-semibold">Total Score</p>
              <p className="text-3xl font-bold text-blue-800">{totalPoints} / {maxTotalPoints}</p>
            </div>
          </div>
        </header>

        <ul data-testid="feedbackisprovided-list" className="space-y-4">
          {MOCK_FEEDBACK.map((feedback) => (
            <li
              key={feedback.id}
              data-testid="feedbackisprovided-item"
              className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                feedback.isCorrect ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 mb-2">
                      {feedback.topic}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feedback.question}
                    </h3>
                  </div>
                  <div className={`flex items-center justify-center w-16 h-16 rounded-full ${
                    feedback.isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {feedback.isCorrect ? (
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Your Answer</p>
                    <p className={`text-lg font-bold ${
                      feedback.isCorrect ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {feedback.userAnswer}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Correct Answer</p>
                    <p className="text-lg font-bold text-green-700">
                      {feedback.correctAnswer}
                    </p>
                  </div>
                </div>

                <div className={`rounded-lg p-4 mb-4 ${
                  feedback.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`font-semibold mb-2 ${
                    feedback.isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {feedback.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  {expandedId === feedback.id && (
                    <p className="text-gray-700 leading-relaxed">
                      {feedback.explanation}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    data-testid="feedbackisprovided-toggle"
                    onClick={() => toggleExpanded(feedback.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {expandedId === feedback.id ? 'Hide Explanation' : 'Show Explanation'}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Points:</span>
                    <span className={`text-lg font-bold ${
                      feedback.isCorrect ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {feedback.pointsEarned} / {feedback.maxPoints}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6 text-center">
          <button
            data-testid="feedbackisprovided-continue"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Continue to Next Lesson
          </button>
        </div>
      </div>
    </section>
  )
}
