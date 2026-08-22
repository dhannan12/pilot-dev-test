/**
 * UserSubmitsA — User submits a review for a restaurant
 *
 * Features: restaurant selection, star rating, review text, name/email input, submitted reviews display
 *
 * Ticket: SCRUM-1141 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Review {
  id: number
  restaurant: string
  rating: number
  reviewText: string
  reviewerName: string
  date: string
}

const mockReviews: Review[] = [
  {
    id: 1,
    restaurant: "The Wild Atlantic Bistro",
    rating: 5,
    reviewText: "Absolutely fantastic seafood! The oysters were fresh and the service was impeccable. Highly recommend!",
    reviewerName: "Sarah O'Connor",
    date: "2026-08-15"
  },
  {
    id: 2,
    restaurant: "Claddagh Kitchen",
    rating: 4,
    reviewText: "Great traditional Irish fare. The stew was hearty and delicious. Cozy atmosphere perfect for families.",
    reviewerName: "Michael Murphy",
    date: "2026-08-14"
  },
  {
    id: 3,
    restaurant: "The Wild Atlantic Bistro",
    rating: 5,
    reviewText: "Best dining experience in West Ireland! The fish and chips were perfectly crispy and the views are stunning.",
    reviewerName: "Emma Wilson",
    date: "2026-08-13"
  },
  {
    id: 4,
    restaurant: "Seaside Grill",
    rating: 4,
    reviewText: "Lovely spot with ocean views. The grilled salmon was cooked to perfection. Service was a bit slow but worth the wait.",
    reviewerName: "Patrick Kelly",
    date: "2026-08-12"
  },
  {
    id: 5,
    restaurant: "Claddagh Kitchen",
    rating: 3,
    reviewText: "Decent food but nothing exceptional. The portions were generous and prices reasonable.",
    reviewerName: "Aoife Brennan",
    date: "2026-08-11"
  }
]

const restaurants = [
  "The Wild Atlantic Bistro",
  "Claddagh Kitchen",
  "Seaside Grill",
  "O'Malley's Pub & Restaurant",
  "Harbor View Dining"
]

export default function UserSubmitsA() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [restaurant, setRestaurant] = useState('')
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [reviewerName, setReviewerName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!restaurant || !reviewText.trim() || !reviewerName.trim() || !email.trim()) {
      alert('Please fill in all fields')
      return
    }

    const newReview: Review = {
      id: reviews.length + 1,
      restaurant,
      rating,
      reviewText,
      reviewerName,
      date: new Date().toISOString().split('T')[0]
    }

    setReviews([newReview, ...reviews])
    setRestaurant('')
    setRating(5)
    setReviewText('')
    setReviewerName('')
    setEmail('')
    setSubmitted(true)
    
    setTimeout(() => setSubmitted(false), 3000)
  }

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ))
  }

  return (
    <section data-testid="usersubmitsa" className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Submit a Restaurant Review</h1>
        <p className="text-gray-600 mb-6">Share your dining experience with our community</p>

        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Thank you! Your review has been submitted successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700 mb-2">
              Select Restaurant *
            </label>
            <select
              id="restaurant"
              data-testid="usersubmitsa-restaurant"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Choose a restaurant...</option>
              {restaurants.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                id="rating"
                data-testid="usersubmitsa-rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-2xl">{renderStars(rating)}</span>
              <span className="text-lg font-semibold text-gray-700">{rating}/5</span>
            </div>
          </div>

          <div>
            <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
              Your Review *
            </label>
            <textarea
              id="reviewText"
              data-testid="usersubmitsa-reviewtext"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={5}
              placeholder="Tell us about your experience..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="reviewerName"
                data-testid="usersubmitsa-name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                data-testid="usersubmitsa-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            data-testid="usersubmitsa-submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Submit Review
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Reviews</h2>
        <ul data-testid="usersubmitsa-list" className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              data-testid="usersubmitsa-item"
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{review.restaurant}</h3>
                  <p className="text-sm text-gray-500">
                    by {review.reviewerName} on {review.date}
                  </p>
                </div>
                <div className="text-xl">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-700">{review.reviewText}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
