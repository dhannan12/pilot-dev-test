/**
 * InteractiveExercisesAre — Displays age-appropriate interactive math exercises
 *
 * Features: age filtering, difficulty levels, problem types, exercise selection, visual feedback
 *
 * Ticket: SCRUM-1256 | Branch: proto/SCRUM-1254
 */

import React, { useState } from 'react'

interface Exercise {
  id: number
  title: string
  ageRange: string
  minAge: number
  maxAge: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  problemType: string
  description: string
  examples: string[]
}

const mockExercises: Exercise[] = [
  {
    id: 1,
    title: 'Simple Addition',
    ageRange: '5-7 years',
    minAge: 5,
    maxAge: 7,
    difficulty: 'Easy',
    problemType: 'Addition',
    description: 'Learn to add numbers from 1 to 10',
    examples: ['2 + 3 = ?', '5 + 4 = ?', '1 + 6 = ?']
  },
  {
    id: 2,
    title: 'Basic Subtraction',
    ageRange: '5-7 years',
    minAge: 5,
    maxAge: 7,
    difficulty: 'Easy',
    problemType: 'Subtraction',
    description: 'Practice subtracting small numbers',
    examples: ['8 - 3 = ?', '10 - 5 = ?', '7 - 2 = ?']
  },
  {
    id: 3,
    title: 'Multiplication Tables',
    ageRange: '8-10 years',
    minAge: 8,
    maxAge: 10,
    difficulty: 'Medium',
    problemType: 'Multiplication',
    description: 'Master multiplication tables from 1 to 12',
    examples: ['7 × 8 = ?', '9 × 6 = ?', '12 × 5 = ?']
  },
  {
    id: 4,
    title: 'Division Practice',
    ageRange: '8-10 years',
    minAge: 8,
    maxAge: 10,
    difficulty: 'Medium',
    problemType: 'Division',
    description: 'Learn division with remainders',
    examples: ['24 ÷ 6 = ?', '45 ÷ 9 = ?', '56 ÷ 8 = ?']
  },
  {
    id: 5,
    title: 'Fractions Basics',
    ageRange: '11-13 years',
    minAge: 11,
    maxAge: 13,
    difficulty: 'Hard',
    problemType: 'Fractions',
    description: 'Understanding and simplifying fractions',
    examples: ['1/2 + 1/4 = ?', '3/4 - 1/8 = ?', '2/3 × 3/5 = ?']
  },
  {
    id: 6,
    title: 'Word Problems',
    ageRange: '8-10 years',
    minAge: 8,
    maxAge: 10,
    difficulty: 'Medium',
    problemType: 'Word Problems',
    description: 'Solve real-world math problems',
    examples: ['If John has 5 apples and buys 3 more...', 'A train travels at 60 mph for 2 hours...']
  },
  {
    id: 7,
    title: 'Counting to 20',
    ageRange: '5-7 years',
    minAge: 5,
    maxAge: 7,
    difficulty: 'Easy',
    problemType: 'Counting',
    description: 'Practice counting objects up to 20',
    examples: ['Count the stars: ⭐⭐⭐', 'How many apples? 🍎🍎🍎🍎']
  },
  {
    id: 8,
    title: 'Algebra Introduction',
    ageRange: '11-13 years',
    minAge: 11,
    maxAge: 13,
    difficulty: 'Hard',
    problemType: 'Algebra',
    description: 'Solve simple equations with variables',
    examples: ['x + 5 = 12', '2y - 3 = 7', '3z + 4 = 13']
  }
]

export default function InteractiveExercisesAre() {
  const [selectedAge, setSelectedAge] = useState<number>(8)
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)

  const filteredExercises = mockExercises.filter(
    exercise => selectedAge >= exercise.minAge && selectedAge <= exercise.maxAge
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Hard':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div data-testid="interactiveexercisesare" className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Age-Appropriate Math Exercises
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive learning tailored to your child's age and skill level
          </p>
        </div>

        {/* Age Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <label htmlFor="age-selector" className="block text-lg font-semibold text-gray-700 mb-3">
            Select Student Age:
          </label>
          <div className="flex items-center gap-4">
            <input
              id="age-selector"
              type="range"
              min="5"
              max="13"
              value={selectedAge}
              onChange={(e) => setSelectedAge(Number(e.target.value))}
              data-testid="interactiveexercisesare-age"
              className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-2xl font-bold text-blue-600 min-w-[80px] text-center">
              {selectedAge} years
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2 px-1">
            <span>5 years</span>
            <span>13 years</span>
          </div>
        </div>

        {/* Exercise Count */}
        <div className="mb-6">
          <p className="text-lg text-gray-700">
            <span className="font-semibold text-blue-600">{filteredExercises.length}</span> exercises
            available for age {selectedAge}
          </p>
        </div>

        {/* Exercises List */}
        <div data-testid="interactiveexercisesare-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              data-testid="interactiveexercisesare-item"
              className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 ${
                selectedExercise === exercise.id ? 'border-blue-500 ring-2 ring-blue-300' : 'border-transparent'
              }`}
            >
              {/* Exercise Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                <h3 className="text-xl font-bold text-white mb-1">{exercise.title}</h3>
                <p className="text-blue-100 text-sm">{exercise.ageRange}</p>
              </div>

              {/* Exercise Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
                    {exercise.problemType}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {exercise.description}
                </p>

                {/* Examples */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Examples:</p>
                  <ul className="space-y-1">
                    {exercise.examples.slice(0, 2).map((example, idx) => (
                      <li key={idx} className="text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  data-testid="interactiveexercisesare-select"
                  onClick={() => setSelectedExercise(exercise.id)}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                    selectedExercise === exercise.id
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {selectedExercise === exercise.id ? 'Selected ✓' : 'Select Exercise'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Exercises Message */}
        {filteredExercises.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">
              No exercises available for age {selectedAge}. Try a different age range.
            </p>
          </div>
        )}

        {/* Selected Exercise Details */}
        {selectedExercise && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border-2 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Ready to Start!</h2>
              <button
                data-testid="interactiveexercisesare-clear"
                onClick={() => setSelectedExercise(null)}
                className="text-gray-500 hover:text-gray-700 font-semibold"
              >
                Clear ✕
              </button>
            </div>
            {mockExercises.find(ex => ex.id === selectedExercise) && (
              <div>
                <p className="text-gray-700 mb-4">
                  You've selected: <span className="font-bold text-blue-600">
                    {mockExercises.find(ex => ex.id === selectedExercise)?.title}
                  </span>
                </p>
                <button
                  data-testid="interactiveexercisesare-start"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Start Exercise →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
