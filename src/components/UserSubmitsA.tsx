/**
 * UserSubmitsA — User submits a review for a restaurant
 *
 * Features: restaurant selection, star rating, review submission, previous reviews display, form validation
 *
 * Ticket: SCRUM-1141 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface Restaurant {
  id: number
  name: string
  cuisine: string
}

interface Review {
  id: number
  restaurantId: number
  restaurantName: string
  rating: number
  title: string
  review: string
  reviewerName: string
  date: string
}

const MOCK_RESTAURANTS: Restaurant[] = [
  { id: 1, name: 'The Hungry Wolf', cuisine: 'Irish' },
  { id: 2, name: 'Sea Breeze Bistro', cuisine: 'Seafood' },
  { id: 3, name: 'O\'Malley\'s Pub & Grill', cuisine: 'Pub Food' },
  { id: 4, name: 'Galway Bay Restaurant', cuisine: 'International' },
  { id: 5, name: 'The Celtic Kitchen', cuisine: 'Traditional Irish' },
]

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    restaurantId: 1,
    restaurantName: 'The Hungry Wolf',
    rating: 5,
    title: 'Outstanding dining experience!',
    review: 'The food was absolutely delicious and the atmosphere was cozy and welcoming. Highly recommend the lamb stew!',
    reviewerName: 'Mary O\'Connor',
    date: '2026-08-20',
  },
  {
    id: 2,
    restaurantId: 2,
    restaurantName: 'Sea Breeze Bistro',
    rating: 4,
    title: 'Fresh seafood, great views',
    review: 'Beautiful location with stunning ocean views. The fish and chips were perfectly cooked and the service was friendly.',
    reviewerName: 'Sean Murphy',
    date: '2026-08-19',
  },
  {
    id: 3,
    restaurantId: 3,
    restaurantName: 'O\'Malley\'s Pub & Grill',
    rating: 5,
    title: 'Best pub food in town!',
    review: 'Authentic Irish pub with hearty portions. The Guinness beef stew is a must-try. Live music on weekends is a bonus!',
    reviewerName: 'Bridget Kelly',
    date: '2026-08-18',
  },
  {
    id: 4,
    restaurantId: 4,
    restaurantName: 'Galway Bay Restaurant',
    rating: 4,
    title: 'Excellent international menu',
    review: 'Great variety on the menu with excellent vegetarian options. The staff were knowledgeable and attentive.',
    reviewerName: 'Patrick Byrne',
    date: '2026-08-17',
  },
  {
    id: 5,
    restaurantId: 5,
    restaurantName: 'The Celtic Kitchen',
    rating: 5,
    title: 'Authentic Irish cuisine',
    review: 'Traditional recipes passed down through generations. The boxty and colcannon were incredible. A true taste of Ireland!',
    reviewerName: 'Siobhan Walsh',
    date: '2026-08-16',
  },
]

export default function UserSubmitsA() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('')
  const [rating, setRating] = useState<number>(5)
  const [title, setTitle] = useState<string>('')
  const [reviewText, setReviewText] = useState<string>('')
  const [reviewerName, setReviewerName] = useState<string>('')
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS)
  const [submitMessage, setSubmitMessage] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedRestaurant || !title || !reviewText || !reviewerName) {
      setSubmitMessage('Please fill in all fields')
      return
    }

    const restaurant = MOCK_RESTAURANTS.find(r => r.id.toString() === selectedRestaurant)
    
    if (!restaurant) {
      setSubmitMessage('Please select a restaurant')
      return
    }

    const newReview: Review = {
      id: reviews.length + 1,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      rating,
      title,
      review: reviewText,
      reviewerName,
      date: new Date().toISOString().split('T')[0],
    }

    setReviews([newReview, ...reviews])
    setSubmitMessage('Review submitted successfully!')
    
    // Reset form
    setSelectedRestaurant('')
    setRating(5)
    setTitle('')
    setReviewText('')
    setReviewerName('')

    // Clear success message after 3 seconds
    setTimeout(() => setSubmitMessage(''), 3000)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div data-testid="usersubmitsa" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurant Reviews</h1>
        <p className="text-gray-600 mb-8">Share your dining experience with our community</p>

        {/* Review Submission Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Submit a Review</h2>
          
          {submitMessage && (
            <div className={`mb-4 p-3 rounded ${submitMessage.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Restaurant Selection */}
            <div>
              <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant *
              </label>
              <select
                id="restaurant"
                data-testid="usersubmitsa-restaurant"
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a restaurant</option>
                {MOCK_RESTAURANTS.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name} - {restaurant.cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating *
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="rating"
                  type="range"
                  min="1"
                  max="5"
                  data-testid="usersubmitsa-rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="flex-1"
                />
                <div className="flex gap-1">
                  {renderStars(rating)}
                  <span className="ml-2 text-gray-700 font-medium">{rating}/5</span>
                </div>
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Review Title *
              </label>
              <input
                id="title"
                type="text"
                data-testid="usersubmitsa-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sum up your experience"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                Your Review *
              </label>
              <textarea
                id="review"
                data-testid="usersubmitsa-review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Reviewer Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                data-testid="usersubmitsa-name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="usersubmitsa-submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Previous Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Reviews</h2>
          <div data-testid="usersubmitsa-list" className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                data-testid="usersubmitsa-item"
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{review.title}</h3>
                    <p className="text-sm text-gray-600">{review.restaurantName}</p>
                  </div>
                  <div className="text-right">
                    {renderStars(review.rating)}
                    <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.review}</p>
                <p className="text-sm text-gray-500">— {review.reviewerName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
