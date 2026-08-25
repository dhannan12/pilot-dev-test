/**
 * UserAttemptsTo — User attempts to leave a review without a verified account
 *
 * Features: review form, star rating, account verification check, error messaging, existing reviews display
 *
 * Ticket: SCRUM-1147 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Review {
  id: number
  author: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: 'Sarah Murphy',
    rating: 5,
    comment: 'Absolutely loved the Wild Atlantic Way tour! Our guide was knowledgeable and the scenery was breathtaking.',
    date: '2026-08-20',
    verified: true
  },
  {
    id: 2,
    author: 'James O\'Connor',
    rating: 4,
    comment: 'Great experience visiting the Cliffs of Moher. The weather was perfect and the local pub recommendations were spot on!',
    date: '2026-08-18',
    verified: true
  },
  {
    id: 3,
    author: 'Emma Sullivan',
    rating: 5,
    comment: 'The traditional music session in the village was incredible. Such a warm welcome from the locals!',
    date: '2026-08-15',
    verified: true
  },
  {
    id: 4,
    author: 'David Kelly',
    rating: 5,
    comment: 'Best seafood chowder I\'ve ever had at the harbor restaurant. Highly recommend the boat tours too!',
    date: '2026-08-12',
    verified: true
  },
  {
    id: 5,
    author: 'Mary Walsh',
    rating: 4,
    comment: 'Beautiful coastal walks and friendly locals. The heritage center was very informative about the area\'s history.',
    date: '2026-08-10',
    verified: true
  }
]

const MOCK_USER = {
  name: 'John Doe',
  isVerified: false
}

export default function UserAttemptsTo() {
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)
  const [hoveredRating, setHoveredRating] = useState<number>(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!MOCK_USER.isVerified) {
      setShowError(true)
    }
  }

  const renderStars = (count: number, filled: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-2xl ${i < count ? (filled ? 'text-yellow-400' : 'text-yellow-400') : 'text-gray-300'}`}
      >
        ★
      </span>
    ))
  }

  return (
    <div data-testid="userattemptsto" className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">West Ireland Reviews</h1>
        <p className="text-gray-600 mb-8">Share your experience visiting our beautiful region</p>

        {/* Review Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Leave a Review</h2>
          
          {!MOCK_USER.isVerified && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Account not verified:</span> You need to verify your account to leave reviews.
              </p>
            </div>
          )}

          {showError && (
            <div data-testid="userattemptsto-error" className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-sm text-red-800">
                <span className="font-semibold">Unable to submit review:</span> Please verify your account first. Check your email for a verification link.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    data-testid={`userattemptsto-rating-${star}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="text-3xl focus:outline-none transition-colors"
                  >
                    <span className={star <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                id="comment"
                data-testid="userattemptsto-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your experience visiting West Ireland..."
              />
            </div>

            <button
              type="submit"
              data-testid="userattemptsto-submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Existing Reviews */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Reviews</h2>
          <div data-testid="userattemptsto-list" className="space-y-4">
            {MOCK_REVIEWS.map((review) => (
              <div
                key={review.id}
                data-testid="userattemptsto-item"
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{review.author}</h3>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex">
                    {renderStars(review.rating, true)}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
