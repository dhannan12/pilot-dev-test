/**
 * ParentsTopUp — Parents top up their child's lunch account with insufficient balance
 *
 * Features: account balance display, top-up amount selection, payment method choice, transaction history, low balance alerts
 *
 * Ticket: SCRUM-986 | Branch: proto/SCRUM-983
 */

import { useState } from 'react'

interface Child {
  id: string
  name: string
  grade: string
  balance: number
  lowBalanceThreshold: number
}

interface Transaction {
  id: string
  childId: string
  date: string
  amount: number
  method: string
  status: 'completed' | 'pending' | 'failed'
}

const MOCK_CHILDREN: Child[] = [
  {
    id: 'child-1',
    name: 'Emma Wilson',
    grade: 'Grade 5',
    balance: 2.50,
    lowBalanceThreshold: 10.00,
  },
  {
    id: 'child-2',
    name: 'Noah Wilson',
    grade: 'Grade 3',
    balance: 0.75,
    lowBalanceThreshold: 10.00,
  },
  {
    id: 'child-3',
    name: 'Sophia Martinez',
    grade: 'Grade 7',
    balance: 5.00,
    lowBalanceThreshold: 15.00,
  },
  {
    id: 'child-4',
    name: 'Liam Johnson',
    grade: 'Grade 4',
    balance: 1.25,
    lowBalanceThreshold: 10.00,
  },
  {
    id: 'child-5',
    name: 'Olivia Brown',
    grade: 'Grade 6',
    balance: 8.50,
    lowBalanceThreshold: 10.00,
  },
]

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    childId: 'child-1',
    date: '2026-08-15',
    amount: 20.00,
    method: 'Credit Card',
    status: 'completed',
  },
  {
    id: 'tx-2',
    childId: 'child-2',
    date: '2026-08-14',
    amount: 15.00,
    method: 'Debit Card',
    status: 'completed',
  },
  {
    id: 'tx-3',
    childId: 'child-1',
    date: '2026-08-10',
    amount: 25.00,
    method: 'Credit Card',
    status: 'completed',
  },
  {
    id: 'tx-4',
    childId: 'child-3',
    date: '2026-08-09',
    amount: 30.00,
    method: 'PayPal',
    status: 'completed',
  },
  {
    id: 'tx-5',
    childId: 'child-2',
    date: '2026-08-08',
    amount: 10.00,
    method: 'Credit Card',
    status: 'pending',
  },
]

const TOP_UP_AMOUNTS = [5, 10, 15, 20, 25, 30, 50]

const PAYMENT_METHODS = [
  { id: 'credit', name: 'Credit Card', icon: '💳' },
  { id: 'debit', name: 'Debit Card', icon: '🏦' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏛️' },
]

export default function ParentsTopUp() {
  const [selectedChild, setSelectedChild] = useState<string>(MOCK_CHILDREN[0].id)
  const [topUpAmount, setTopUpAmount] = useState<number>(10)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<string>('credit')
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  const currentChild = MOCK_CHILDREN.find((child) => child.id === selectedChild)
  const childTransactions = MOCK_TRANSACTIONS.filter((tx) => tx.childId === selectedChild)

  const hasLowBalance = currentChild
    ? currentChild.balance < currentChild.lowBalanceThreshold
    : false

  const handleTopUp = () => {
    const amount = customAmount ? parseFloat(customAmount) : topUpAmount
    if (amount > 0) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  const handleAmountSelect = (amount: number) => {
    setTopUpAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    if (value) {
      setTopUpAmount(0)
    }
  }

  return (
    <div data-testid="parentstopup" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Lunch Account Top-Up</h1>
          <p className="text-gray-600">Manage your children&apos;s lunch account balances</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Child Selection & Balance */}
          <div className="lg:col-span-1 space-y-6">
            {/* Child Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Child</h2>
              <select
                data-testid="parentstopup-child"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {MOCK_CHILDREN.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.grade})
                  </option>
                ))}
              </select>
            </div>

            {/* Current Balance */}
            {currentChild && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Balance</h2>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    ${currentChild.balance.toFixed(2)}
                  </div>
                  {hasLowBalance && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-center text-red-700">
                        <span className="text-2xl mr-2">⚠️</span>
                        <span className="font-semibold">Low Balance Alert</span>
                      </div>
                      <p className="text-sm text-red-600 mt-1">
                        Balance is below ${currentChild.lowBalanceThreshold.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Middle Column - Top Up Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Amount Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Top-Up Amount</h2>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mb-4">
                {TOP_UP_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    data-testid="parentstopup-amount"
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                      topUpAmount === amount && !customAmount
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or Enter Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                    $
                  </span>
                  <input
                    data-testid="parentstopup-custom-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    data-testid="parentstopup-payment"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === method.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{method.icon}</div>
                    <div className="text-sm font-medium text-gray-700">{method.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Child:</span>
                  <span className="font-semibold text-gray-800">{currentChild?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Current Balance:</span>
                  <span className="font-semibold text-gray-800">
                    ${currentChild?.balance.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Top-Up Amount:</span>
                  <span className="font-semibold text-blue-600">
                    ${(customAmount ? parseFloat(customAmount) || 0 : topUpAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-3 bg-blue-50 -mx-6 px-6 mt-4">
                  <span className="text-lg font-semibold text-gray-800">New Balance:</span>
                  <span className="text-lg font-bold text-blue-600">
                    $
                    {(
                      (currentChild?.balance || 0) +
                      (customAmount ? parseFloat(customAmount) || 0 : topUpAmount)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                data-testid="parentstopup-submit"
                onClick={handleTopUp}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Complete Top-Up
              </button>

              {showSuccess && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <span className="text-2xl mr-2">✓</span>
                    <span className="font-semibold">Top-up successful!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
              {childTransactions.length > 0 ? (
                <div data-testid="parentstopup-list" className="space-y-3">
                  {childTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      data-testid="parentstopup-item"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">
                          ${transaction.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString()} • {transaction.method}
                        </div>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No transactions yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
