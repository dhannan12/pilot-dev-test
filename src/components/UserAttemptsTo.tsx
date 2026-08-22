/**
 * UserAttemptsTo — User attempts to leave a review without a verified account
 *
 * Features: review form, account verification warning, star rating, review submission blocking, verification prompt
 *
 * Ticket: SCRUM-1147 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Business {
  id: number
  name: string
  category: string
}

const mockBusinesses: Business[] = [
  { id: 1, name: 'Connemara Coastal Tours', category: 'Tour Operator' },
  { id: 2, name: 'Wild Atlantic Cafe', category: 'Restaurant' },
  { id: 3, name: 'Kylemore Abbey Gift Shop', category: 'Shopping' },
  { id: 4, name: 'Clifden Bay Hotel', category: 'Accommodation' },
  { id: 5, name: 'Sky Road Bike Rentals', category: 'Activity' },
]

export default function UserAttemptsTo() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business>(mockBusinesses[0])
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [reviewTitle, setReviewTitle] = useState<string>('')
  const [reviewText, setReviewText] = useState<string>('')
  const [showWarning, setShowWarning] = useState<boolean>(false)

  const isAccountVerified = false // Mock: user account is not verified

  const handleSubmitAttempt = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAccountVerified) {
      setShowWarning(true)
    }
  }

  const handleVerifyAccount = () => {
    alert('Redirecting to account verification page...')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4" data-testid="userattemptsto">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Write a Review
          </h1>

          {/* Account Status Warning Banner */}
          {!isAccountVerified && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Account Not Verified</strong> - You need to verify your account before leaving a review.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Business Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Business
            </label>
            <select
              data-testid="userattemptsto-business"
              value={selectedBusiness.id}
              onChange={(e) => {
                const business = mockBusinesses.find(b => b.id === parseInt(e.target.value))
                if (business) setSelectedBusiness(business)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {mockBusinesses.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.name} ({business.category})
                </option>
              ))}
            </select>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmitAttempt}>
            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating *
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    data-testid={`userattemptsto-star-${star}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 fill-current'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'No rating selected'}
                </span>
              </div>
            </div>

            {/* Review Title */}
            <div className="mb-6">
              <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-2">
                Review Title *
              </label>
              <input
                id="review-title"
                type="text"
                data-testid="userattemptsto-title"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Sum up your experience"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={100}
              />
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                id="review-text"
                data-testid="userattemptsto-review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with others"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Warning Message on Submit Attempt */}
            {showWarning && !isAccountVerified && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">
                      Cannot Submit Review
                    </h3>
                    <p className="mt-1 text-sm text-red-700">
                      Your account must be verified before you can leave reviews. Please verify your account to continue.
                    </p>
                    <div className="mt-3">
                      <button
                        type="button"
                        data-testid="userattemptsto-verify"
                        onClick={handleVerifyAccount}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Verify Account Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                data-testid="userattemptsto-submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
              <button
                type="button"
                data-testid="userattemptsto-cancel"
                onClick={() => {
                  setRating(0)
                  setReviewTitle('')
                  setReviewText('')
                  setShowWarning(false)
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Verification Status */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Account Status</p>
                <p className="text-sm text-gray-500">
                  {isAccountVerified ? (
                    <span className="text-green-600">✓ Verified</span>
                  ) : (
                    <span className="text-yellow-600">⚠ Not Verified</span>
                  )}
                </p>
              </div>
              {!isAccountVerified && (
                <button
                  type="button"
                  data-testid="userattemptsto-verify-bottom"
                  onClick={handleVerifyAccount}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Verify Account
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-sm font-medium text-blue-900 mb-2">Why verify your account?</h2>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Leave reviews for local businesses</li>
            <li>Build trust with the community</li>
            <li>Get personalized recommendations</li>
            <li>Receive updates from your favorite places</li>
            <li>Access exclusive features and promotions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
