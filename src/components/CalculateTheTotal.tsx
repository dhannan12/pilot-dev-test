/**
 * CalculateTheTotal — Calculate student lunch account total after top-up
 *
 * Features: account balance display, top-up amount input, total calculation, transaction history, real-time updates
 *
 * Ticket: SCRUM-987 | Branch: proto/SCRUM-983
 */

import { useState } from 'react'

interface Transaction {
  id: string
  date: string
  type: 'top-up' | 'purchase' | 'initial'
  amount: number
  description: string
  balanceAfter: number
}

interface Student {
  id: string
  name: string
  currentBalance: number
  transactions: Transaction[]
}

const MOCK_STUDENTS: Student[] = [
  {
    id: 'S001',
    name: 'Emma Wilson',
    currentBalance: 25.50,
    transactions: [
      { id: 'T001', date: '2026-08-15', type: 'initial', amount: 50.00, description: 'Initial deposit', balanceAfter: 50.00 },
      { id: 'T002', date: '2026-08-15', type: 'purchase', amount: -12.50, description: 'Lunch - Pizza & Drink', balanceAfter: 37.50 },
      { id: 'T003', date: '2026-08-16', type: 'purchase', amount: -12.00, description: 'Lunch - Sandwich Meal', balanceAfter: 25.50 }
    ]
  },
  {
    id: 'S002',
    name: 'Oliver Smith',
    currentBalance: 18.75,
    transactions: [
      { id: 'T004', date: '2026-08-14', type: 'initial', amount: 40.00, description: 'Initial deposit', balanceAfter: 40.00 },
      { id: 'T005', date: '2026-08-14', type: 'purchase', amount: -11.25, description: 'Lunch - Pasta', balanceAfter: 28.75 },
      { id: 'T006', date: '2026-08-15', type: 'purchase', amount: -10.00, description: 'Lunch - Salad Bowl', balanceAfter: 18.75 }
    ]
  },
  {
    id: 'S003',
    name: 'Sophia Johnson',
    currentBalance: 42.00,
    transactions: [
      { id: 'T007', date: '2026-08-13', type: 'initial', amount: 60.00, description: 'Initial deposit', balanceAfter: 60.00 },
      { id: 'T008', date: '2026-08-14', type: 'purchase', amount: -13.50, description: 'Lunch - Burger Combo', balanceAfter: 46.50 },
      { id: 'T009', date: '2026-08-16', type: 'purchase', amount: -4.50, description: 'Snack - Fruit Cup', balanceAfter: 42.00 }
    ]
  },
  {
    id: 'S004',
    name: 'Liam Brown',
    currentBalance: 8.25,
    transactions: [
      { id: 'T010', date: '2026-08-12', type: 'initial', amount: 30.00, description: 'Initial deposit', balanceAfter: 30.00 },
      { id: 'T011', date: '2026-08-13', type: 'purchase', amount: -11.75, description: 'Lunch - Chicken Wrap', balanceAfter: 18.25 },
      { id: 'T012', date: '2026-08-15', type: 'purchase', amount: -10.00, description: 'Lunch - Fish & Chips', balanceAfter: 8.25 }
    ]
  },
  {
    id: 'S005',
    name: 'Ava Martinez',
    currentBalance: 55.80,
    transactions: [
      { id: 'T013', date: '2026-08-10', type: 'initial', amount: 75.00, description: 'Initial deposit', balanceAfter: 75.00 },
      { id: 'T014', date: '2026-08-12', type: 'purchase', amount: -12.20, description: 'Lunch - Sushi Box', balanceAfter: 62.80 },
      { id: 'T015', date: '2026-08-14', type: 'purchase', amount: -7.00, description: 'Breakfast - Toast & Juice', balanceAfter: 55.80 }
    ]
  }
]

export default function CalculateTheTotal() {
  const [selectedStudent, setSelectedStudent] = useState<Student>(MOCK_STUDENTS[0])
  const [topUpAmount, setTopUpAmount] = useState<string>('')
  const [calculatedTotal, setCalculatedTotal] = useState<number | null>(null)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const handleCalculate = () => {
    const amount = parseFloat(topUpAmount)
    if (!isNaN(amount) && amount > 0) {
      const newTotal = selectedStudent.currentBalance + amount
      setCalculatedTotal(newTotal)
    }
  }

  const handleApplyTopUp = () => {
    const amount = parseFloat(topUpAmount)
    if (!isNaN(amount) && amount > 0 && calculatedTotal !== null) {
      const newTransaction: Transaction = {
        id: `T${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: 'top-up',
        amount: amount,
        description: `Top-up - $${amount.toFixed(2)}`,
        balanceAfter: calculatedTotal
      }

      const updatedStudent = {
        ...selectedStudent,
        currentBalance: calculatedTotal,
        transactions: [...selectedStudent.transactions, newTransaction]
      }

      setSelectedStudent(updatedStudent)
      setTopUpAmount('')
      setCalculatedTotal(null)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const handleReset = () => {
    setTopUpAmount('')
    setCalculatedTotal(null)
    setShowSuccess(false)
  }

  const getBalanceColor = (balance: number) => {
    if (balance < 10) return 'text-red-600'
    if (balance < 25) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'top-up':
      case 'initial':
        return 'text-green-600'
      case 'purchase':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div data-testid="calculate-the-total" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Lunch Account Calculator</h1>
          <p className="text-gray-600 mb-6">Calculate your total balance after top-up</p>

          {/* Student Selection */}
          <div className="mb-6">
            <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Student
            </label>
            <select
              id="student-select"
              data-testid="calculate-the-total-student"
              value={selectedStudent.id}
              onChange={(e) => {
                const student = MOCK_STUDENTS.find(s => s.id === e.target.value)
                if (student) {
                  setSelectedStudent(student)
                  handleReset()
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {MOCK_STUDENTS.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} - ${student.currentBalance.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Current Balance Display */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-6 border border-indigo-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Current Balance</p>
                <p className={`text-4xl font-bold ${getBalanceColor(selectedStudent.currentBalance)}`}>
                  ${selectedStudent.currentBalance.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600 mb-1">Student ID</p>
                <p className="text-lg font-semibold text-gray-700">{selectedStudent.id}</p>
              </div>
            </div>
          </div>

          {/* Top-up Calculator */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Calculate Top-up</h2>
            
            <div className="mb-4">
              <label htmlFor="topup-amount" className="block text-sm font-medium text-gray-700 mb-2">
                Top-up Amount ($)
              </label>
              <input
                id="topup-amount"
                data-testid="calculate-the-total-amount"
                type="number"
                step="0.01"
                min="0"
                value={topUpAmount}
                onChange={(e) => {
                  setTopUpAmount(e.target.value)
                  setCalculatedTotal(null)
                }}
                placeholder="Enter amount to add"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex gap-3 mb-4">
              <button
                data-testid="calculate-the-total-calculate"
                onClick={handleCalculate}
                disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Calculate Total
              </button>
              <button
                data-testid="calculate-the-total-reset"
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>

            {/* Calculation Result */}
            {calculatedTotal !== null && (
              <div className="bg-white rounded-lg p-6 border-2 border-indigo-300 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Balance</p>
                    <p className="text-xl font-semibold text-gray-700">
                      ${selectedStudent.currentBalance.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">+</div>
                  <div>
                    <p className="text-sm text-gray-600">Top-up Amount</p>
                    <p className="text-xl font-semibold text-green-600">
                      ${parseFloat(topUpAmount).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-gray-400">=</div>
                  <div>
                    <p className="text-sm text-gray-600">New Total</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      ${calculatedTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  data-testid="calculate-the-total-apply"
                  onClick={handleApplyTopUp}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Apply Top-up
                </button>
              </div>
            )}
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Top-up applied successfully! New balance: ${selectedStudent.currentBalance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Transaction History */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h2>
            <div data-testid="calculate-the-total-list" className="space-y-3">
              {selectedStudent.transactions.slice().reverse().map((transaction) => (
                <div
                  key={transaction.id}
                  data-testid="calculate-the-total-item"
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-sm font-semibold uppercase ${getTransactionTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </span>
                        <span className="text-sm text-gray-500">{transaction.date}</span>
                      </div>
                      <p className="text-gray-700 font-medium">{transaction.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className={`text-lg font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Balance: ${transaction.balanceAfter.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
            <p className="text-2xl font-bold text-indigo-600">{selectedStudent.transactions.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Top-ups</p>
            <p className="text-2xl font-bold text-green-600">
              ${selectedStudent.transactions
                .filter(t => t.type === 'top-up' || t.type === 'initial')
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-red-600">
              ${Math.abs(selectedStudent.transactions
                .filter(t => t.type === 'purchase')
                .reduce((sum, t) => sum + t.amount, 0))
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
