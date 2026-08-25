/**
 * UserInputsMatch — Validates and matches user input patterns with format checking
 *
 * Features: Input validation, pattern matching, format error display, match history, real-time feedback
 *
 * Ticket: SCRUM-1201 | Branch: proto/SCRUM-1199
 */

import React, { useState } from 'react'

interface MatchResult {
  id: string
  input1: string
  input2: string
  isMatch: boolean
  isValidFormat: boolean
  timestamp: string
  errorMessage?: string
}

const mockMatchHistory: MatchResult[] = [
  {
    id: '1',
    input1: 'user@example.com',
    input2: 'user@example.com',
    isMatch: true,
    isValidFormat: true,
    timestamp: '2026-08-25 10:30:00',
  },
  {
    id: '2',
    input1: 'test@domain',
    input2: 'test@domain',
    isMatch: true,
    isValidFormat: false,
    timestamp: '2026-08-25 10:25:00',
    errorMessage: 'Invalid email format - missing domain extension',
  },
  {
    id: '3',
    input1: 'john.doe@company.com',
    input2: 'john.doe@company.org',
    isMatch: false,
    isValidFormat: true,
    timestamp: '2026-08-25 10:20:00',
  },
  {
    id: '4',
    input1: 'invalid-email',
    input2: 'invalid-email',
    isMatch: true,
    isValidFormat: false,
    timestamp: '2026-08-25 10:15:00',
    errorMessage: 'Invalid email format - missing @ symbol',
  },
  {
    id: '5',
    input1: 'admin@site.com',
    input2: 'admin@site.net',
    isMatch: false,
    isValidFormat: true,
    timestamp: '2026-08-25 10:10:00',
  },
  {
    id: '6',
    input1: '@nodomain.com',
    input2: '@nodomain.com',
    isMatch: true,
    isValidFormat: false,
    timestamp: '2026-08-25 10:05:00',
    errorMessage: 'Invalid email format - missing username',
  },
  {
    id: '7',
    input1: 'support@help.io',
    input2: 'support@help.io',
    isMatch: true,
    isValidFormat: true,
    timestamp: '2026-08-25 10:00:00',
  },
]

export default function UserInputsMatch() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [matchHistory, setMatchHistory] = useState<MatchResult[]>(mockMatchHistory)
  const [currentResult, setCurrentResult] = useState<MatchResult | null>(null)
  const [validationType, setValidationType] = useState<'email' | 'phone' | 'username'>('email')

  const validateFormat = (input: string, type: string): { isValid: boolean; error?: string } => {
    if (!input.trim()) {
      return { isValid: false, error: 'Input cannot be empty' }
    }

    switch (type) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(input)) {
          if (!input.includes('@')) {
            return { isValid: false, error: 'Invalid email format - missing @ symbol' }
          }
          if (!input.split('@')[1]?.includes('.')) {
            return { isValid: false, error: 'Invalid email format - missing domain extension' }
          }
          if (input.startsWith('@')) {
            return { isValid: false, error: 'Invalid email format - missing username' }
          }
          return { isValid: false, error: 'Invalid email format' }
        }
        return { isValid: true }
      }
      case 'phone': {
        const phoneRegex = /^\+?[\d\s-()]{10,}$/
        if (!phoneRegex.test(input)) {
          return { isValid: false, error: 'Invalid phone format - use digits, spaces, dashes, or parentheses' }
        }
        return { isValid: true }
      }
      case 'username': {
        const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
        if (!usernameRegex.test(input)) {
          if (input.length < 3) {
            return { isValid: false, error: 'Username must be at least 3 characters' }
          }
          if (input.length > 20) {
            return { isValid: false, error: 'Username must be 20 characters or less' }
          }
          return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and dashes' }
        }
        return { isValid: true }
      }
      default:
        return { isValid: true }
    }
  }

  const handleMatch = () => {
    const validation1 = validateFormat(input1, validationType)
    const validation2 = validateFormat(input2, validationType)

    const isValidFormat = validation1.isValid && validation2.isValid
    const isMatch = input1 === input2

    const result: MatchResult = {
      id: Date.now().toString(),
      input1,
      input2,
      isMatch,
      isValidFormat,
      timestamp: new Date().toLocaleString(),
      errorMessage: !isValidFormat ? (validation1.error || validation2.error) : undefined,
    }

    setCurrentResult(result)
    setMatchHistory([result, ...matchHistory])
  }

  const handleClear = () => {
    setInput1('')
    setInput2('')
    setCurrentResult(null)
  }

  const getResultBadgeClass = (result: MatchResult) => {
    if (!result.isValidFormat) {
      return 'bg-red-100 text-red-800 border-red-300'
    }
    if (result.isMatch) {
      return 'bg-green-100 text-green-800 border-green-300'
    }
    return 'bg-yellow-100 text-yellow-800 border-yellow-300'
  }

  const getResultText = (result: MatchResult) => {
    if (!result.isValidFormat) {
      return 'Invalid Format'
    }
    if (result.isMatch) {
      return 'Match ✓'
    }
    return 'No Match'
  }

  return (
    <div data-testid="userinputsmatch" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Inputs Match Validator</h1>
          <p className="text-gray-600 mb-6">
            Compare and validate user inputs for format correctness and matching values
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Validation Type
            </label>
            <select
              data-testid="userinputsmatch-validation-type"
              value={validationType}
              onChange={(e) => setValidationType(e.target.value as 'email' | 'phone' | 'username')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="email">Email Address</option>
              <option value="phone">Phone Number</option>
              <option value="username">Username</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input 1
              </label>
              <input
                data-testid="userinputsmatch-input1"
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                placeholder={`Enter first ${validationType}...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input 2
              </label>
              <input
                data-testid="userinputsmatch-input2"
                type="text"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                placeholder={`Enter second ${validationType}...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              data-testid="userinputsmatch-match"
              onClick={handleMatch}
              disabled={!input1 || !input2}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Check Match
            </button>
            <button
              data-testid="userinputsmatch-clear"
              onClick={handleClear}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>

          {currentResult && (
            <div
              data-testid="userinputsmatch-current-result"
              className={`p-6 rounded-lg border-2 ${getResultBadgeClass(currentResult)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">Current Result</h3>
                <span className="text-sm font-semibold">{getResultText(currentResult)}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex gap-4">
                  <span className="font-medium">Input 1:</span>
                  <span className="font-mono">{currentResult.input1}</span>
                </div>
                <div className="flex gap-4">
                  <span className="font-medium">Input 2:</span>
                  <span className="font-mono">{currentResult.input2}</span>
                </div>
                {currentResult.errorMessage && (
                  <div className="mt-3 p-3 bg-white rounded border border-red-200">
                    <span className="font-medium text-red-700">Error: </span>
                    <span className="text-red-600">{currentResult.errorMessage}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Match History</h2>
          <div data-testid="userinputsmatch-list" className="space-y-4">
            {matchHistory.map((result) => (
              <div
                key={result.id}
                data-testid="userinputsmatch-item"
                className={`p-5 rounded-lg border-2 ${getResultBadgeClass(result)}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-600 font-medium">{result.timestamp}</span>
                  <span className="text-sm font-bold">{getResultText(result)}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Input 1: </span>
                    <span className="font-mono">{result.input1}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Input 2: </span>
                    <span className="font-mono">{result.input2}</span>
                  </div>
                </div>
                {result.errorMessage && (
                  <div className="mt-3 p-2 bg-white rounded text-sm border">
                    <span className="font-medium text-red-700">Error: </span>
                    <span className="text-red-600">{result.errorMessage}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
