/**
 * DisplayingSailingCourses — Displays sailing courses with insufficient reviews
 *
 * Features: course listing, review status indicators, insufficient review warnings, course details, enrollment info
 *
 * Ticket: SCRUM-1236 | Branch: proto/SCRUM-1233
 */

import React from 'react'

interface SailingCourse {
  id: string
  name: string
  instructor: string
  duration: string
  level: string
  reviewCount: number
  rating: number
  price: number
  location: string
  enrolledStudents: number
}

const MOCK_SAILING_COURSES: SailingCourse[] = [
  {
    id: '1',
    name: 'Basic Sailing Fundamentals',
    instructor: 'Captain Sarah Mitchell',
    duration: '3 days',
    level: 'Beginner',
    reviewCount: 1,
    rating: 5.0,
    price: 450,
    location: 'Marina Bay',
    enrolledStudents: 8
  },
  {
    id: '2',
    name: 'Advanced Navigation & Racing',
    instructor: 'Commander Jack Thompson',
    duration: '5 days',
    level: 'Advanced',
    reviewCount: 0,
    rating: 0,
    price: 890,
    location: 'Harbor Point',
    enrolledStudents: 4
  },
  {
    id: '3',
    name: 'Coastal Cruising Certification',
    instructor: 'Captain Lisa Anderson',
    duration: '7 days',
    level: 'Intermediate',
    reviewCount: 2,
    rating: 4.5,
    price: 1200,
    location: 'Seaside Marina',
    enrolledStudents: 12
  },
  {
    id: '4',
    name: 'Youth Sailing Camp',
    instructor: 'Instructor Mike Roberts',
    duration: '2 weeks',
    level: 'Beginner',
    reviewCount: 1,
    rating: 4.0,
    price: 650,
    location: 'Youth Sailing Center',
    enrolledStudents: 15
  },
  {
    id: '5',
    name: 'Offshore Sailing Expedition',
    instructor: 'Captain Elena Rodriguez',
    duration: '10 days',
    level: 'Expert',
    reviewCount: 0,
    rating: 0,
    price: 2500,
    location: 'Ocean Gateway Marina',
    enrolledStudents: 6
  },
  {
    id: '6',
    name: 'Sailing Safety & Emergency Procedures',
    instructor: 'Captain David Chen',
    duration: '2 days',
    level: 'All Levels',
    reviewCount: 2,
    rating: 4.8,
    price: 350,
    location: 'Marina Bay',
    enrolledStudents: 20
  },
  {
    id: '7',
    name: 'Spinnaker & Advanced Sail Techniques',
    instructor: 'Instructor Maria Santos',
    duration: '4 days',
    level: 'Advanced',
    reviewCount: 1,
    rating: 5.0,
    price: 780,
    location: 'Regatta Club',
    enrolledStudents: 5
  }
]

const INSUFFICIENT_REVIEW_THRESHOLD = 3

export default function DisplayingSailingCourses() {
  const coursesWithInsufficientReviews = MOCK_SAILING_COURSES.filter(
    course => course.reviewCount < INSUFFICIENT_REVIEW_THRESHOLD
  )

  return (
    <div data-testid="displayingsailingcourses" className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sailing Courses - Review Status
          </h1>
          <p className="text-lg text-gray-600">
            Courses with insufficient reviews (less than {INSUFFICIENT_REVIEW_THRESHOLD} reviews)
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-medium">
              ⚠️ {coursesWithInsufficientReviews.length} courses need more reviews
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium">
              📚 {MOCK_SAILING_COURSES.length} total courses
            </span>
          </div>
        </div>

        <div data-testid="displayingsailingcourses-list" className="space-y-6">
          {coursesWithInsufficientReviews.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">
                All courses have sufficient reviews! 🎉
              </p>
            </div>
          ) : (
            coursesWithInsufficientReviews.map(course => (
              <div
                key={course.id}
                data-testid="displayingsailingcourses-item"
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {course.name}
                        </h2>
                        {course.reviewCount === 0 && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                            NO REVIEWS
                          </span>
                        )}
                        {course.reviewCount > 0 && course.reviewCount < INSUFFICIENT_REVIEW_THRESHOLD && (
                          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                            NEEDS MORE REVIEWS
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        Instructor: {course.instructor}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        ${course.price}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Duration
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {course.duration}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Level
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {course.level}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Location
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {course.location}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Enrolled
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {course.enrolledStudents} students
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-gray-900">
                          {course.reviewCount > 0 ? course.rating.toFixed(1) : 'N/A'}
                        </div>
                        <div>
                          <div className="text-yellow-400 text-lg">
                            {course.reviewCount > 0 ? '★'.repeat(Math.round(course.rating)) : '☆☆☆☆☆'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {course.reviewCount} {course.reviewCount === 1 ? 'review' : 'reviews'}
                          </div>
                        </div>
                      </div>
                      <div className="h-8 w-px bg-gray-300"></div>
                      <div className="text-sm text-amber-700 font-medium">
                        ⚠️ Need {INSUFFICIENT_REVIEW_THRESHOLD - course.reviewCount} more {INSUFFICIENT_REVIEW_THRESHOLD - course.reviewCount === 1 ? 'review' : 'reviews'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        data-testid="displayingsailingcourses-view"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                      >
                        View Details
                      </button>
                      <button
                        data-testid="displayingsailingcourses-enroll"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            📝 Help Us Improve
          </h3>
          <p className="text-blue-800">
            These courses need your feedback! If you've taken any of these courses, 
            please share your experience to help future sailors make informed decisions.
          </p>
        </div>
      </div>
    </div>
  )
}
