/**
 * AttemptingTo — Displays permission error when non-instructor attempts to promote a course
 *
 * Features: role validation, course listing, permission denial, error messaging, action feedback
 *
 * Ticket: SCRUM-1240 | Branch: proto/SCRUM-1233
 */

import React, { useState } from 'react'

interface Course {
  id: string
  title: string
  instructor: string
  enrollmentCount: number
  isPromoted: boolean
}

const MOCK_COURSES: Course[] = [
  {
    id: 'course-001',
    title: 'Introduction to Sailing Fundamentals',
    instructor: 'Captain Sarah Mitchell',
    enrollmentCount: 124,
    isPromoted: false,
  },
  {
    id: 'course-002',
    title: 'Advanced Navigation Techniques',
    instructor: 'Commander James Harbor',
    enrollmentCount: 89,
    isPromoted: true,
  },
  {
    id: 'course-003',
    title: 'Coastal Cruising and Safety',
    instructor: 'Captain Emily Waters',
    enrollmentCount: 156,
    isPromoted: false,
  },
  {
    id: 'course-004',
    title: 'Racing Strategies and Competition',
    instructor: 'Coach Michael Storm',
    enrollmentCount: 72,
    isPromoted: false,
  },
  {
    id: 'course-005',
    title: 'Boat Maintenance and Repair',
    instructor: 'Expert Robert Anchor',
    enrollmentCount: 201,
    isPromoted: false,
  },
  {
    id: 'course-006',
    title: 'Weather Patterns for Sailors',
    instructor: 'Dr. Lisa Maritime',
    enrollmentCount: 143,
    isPromoted: true,
  },
]

export default function AttemptingTo() {
  const [attemptedCourse, setAttemptedCourse] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)
  const userRole = 'student' // Simulating a non-instructor user

  const handlePromoteAttempt = (courseId: string) => {
    setAttemptedCourse(courseId)
    setShowError(true)
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
      setShowError(false)
      setAttemptedCourse(null)
    }, 5000)
  }

  const getCourseById = (courseId: string) => {
    return MOCK_COURSES.find(course => course.id === courseId)
  }

  return (
    <div data-testid="attemptingto" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Course Management
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Current Role:</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {showError && attemptedCourse && (
          <div
            data-testid="attemptingto-error"
            className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded-r-lg shadow-md"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-red-900 mb-1">
                  Permission Denied
                </h3>
                <p className="text-red-700 mb-2">
                  You do not have permission to promote courses. Only instructors can promote courses.
                </p>
                <div className="bg-red-100 rounded p-3 mt-3">
                  <p className="text-sm text-red-800">
                    <span className="font-semibold">Attempted action:</span> Promote course "
                    {getCourseById(attemptedCourse)?.title}"
                  </p>
                  <p className="text-sm text-red-800 mt-1">
                    <span className="font-semibold">Required role:</span> Instructor
                  </p>
                  <p className="text-sm text-red-800 mt-1">
                    <span className="font-semibold">Your role:</span> {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-900 text-sm">
            <span className="font-semibold">Note:</span> As a student, you can view courses but cannot promote them. 
            Only instructors have permission to promote courses to featured status.
          </p>
        </div>

        {/* Course List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Courses
          </h2>
          
          <div data-testid="attemptingto-list" className="space-y-4">
            {MOCK_COURSES.map((course) => (
              <div
                key={course.id}
                data-testid="attemptingto-item"
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {course.title}
                      </h3>
                      {course.isPromoted && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                          PROMOTED
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">
                      <span className="font-medium">Instructor:</span> {course.instructor}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        {course.enrollmentCount} enrolled
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <button
                      data-testid="attemptingto-promote"
                      onClick={() => handlePromoteAttempt(course.id)}
                      disabled={course.isPromoted}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        course.isPromoted
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {course.isPromoted ? 'Already Promoted' : 'Promote Course'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Need to promote a course?
          </h3>
          <p className="text-gray-700 mb-2">
            Course promotion is restricted to instructors only. If you believe you should have 
            instructor access, please contact your administrator.
          </p>
          <button
            data-testid="attemptingto-contact"
            className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Contact Administrator
          </button>
        </div>
      </div>
    </div>
  )
}
