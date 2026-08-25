/**
 * UserLooksFor — Display community engagement activities at the museum
 *
 * Features: activity listings, category filters, registration info, volunteer opportunities, contact details
 *
 * Ticket: SCRUM-1133 | Branch: proto/SCRUM-1127
 */

import React, { useState } from 'react'

interface CommunityActivity {
  id: number
  title: string
  category: 'workshop' | 'volunteer' | 'event' | 'education' | 'membership'
  description: string
  schedule: string
  location: string
  capacity?: number
  spotsAvailable?: number
  ageGroup?: string
  fee?: string
  contactEmail?: string
}

const MOCK_ACTIVITIES: CommunityActivity[] = [
  {
    id: 1,
    title: 'Heritage Storytelling Workshop',
    category: 'workshop',
    description: 'Join our weekly storytelling sessions where local historians share captivating tales of Dundalk\'s past. Learn the art of oral history preservation.',
    schedule: 'Every Saturday, 2:00 PM - 4:00 PM',
    location: 'Community Hall, Second Floor',
    capacity: 20,
    spotsAvailable: 8,
    ageGroup: 'Adults and Teens (14+)',
    fee: '€5 per session',
    contactEmail: 'storytelling@dundalkmuseum.ie'
  },
  {
    id: 2,
    title: 'Museum Volunteer Program',
    category: 'volunteer',
    description: 'Become part of our dedicated volunteer team! Assist with tours, artifact cataloging, event support, and community outreach. Training provided.',
    schedule: 'Flexible schedule, minimum 4 hours/week',
    location: 'Various museum locations',
    ageGroup: 'All ages welcome (under 16 with parent)',
    fee: 'Free',
    contactEmail: 'volunteer@dundalkmuseum.ie'
  },
  {
    id: 3,
    title: 'Family History Research Day',
    category: 'event',
    description: 'Trace your Louth roots with our genealogy experts. Access historical records, maps, and documents. Perfect for family historians and beginners.',
    schedule: 'First Sunday of each month, 10:00 AM - 4:00 PM',
    location: 'Archives Room',
    capacity: 15,
    spotsAvailable: 5,
    ageGroup: 'All ages',
    fee: 'Free with museum admission',
    contactEmail: 'archives@dundalkmuseum.ie'
  },
  {
    id: 4,
    title: 'Young Curators Club',
    category: 'education',
    description: 'Children explore museum careers through hands-on activities. Design exhibits, learn conservation, interview curators, and present projects.',
    schedule: 'Wednesdays, 4:30 PM - 6:00 PM (Term time)',
    location: 'Education Studio',
    capacity: 12,
    spotsAvailable: 3,
    ageGroup: 'Ages 8-13',
    fee: '€40 per term (10 weeks)',
    contactEmail: 'education@dundalkmuseum.ie'
  },
  {
    id: 5,
    title: 'Community Museum Membership',
    category: 'membership',
    description: 'Join our museum family! Enjoy unlimited visits, priority event booking, quarterly newsletter, 10% shop discount, and members-only previews.',
    schedule: 'Annual membership',
    location: 'Museum-wide benefits',
    ageGroup: 'Individual, Family, and Student options',
    fee: '€25 Individual / €45 Family / €15 Student',
    contactEmail: 'membership@dundalkmuseum.ie'
  },
  {
    id: 6,
    title: 'Heritage Craft Circle',
    category: 'workshop',
    description: 'Learn traditional Irish crafts from master artisans. Monthly rotating workshops include basket weaving, pottery, textile arts, and stone carving.',
    schedule: 'Second Tuesday each month, 6:00 PM - 8:30 PM',
    location: 'Craft Workshop, Ground Floor',
    capacity: 16,
    spotsAvailable: 12,
    ageGroup: 'Adults (18+)',
    fee: '€15 per workshop, materials included',
    contactEmail: 'crafts@dundalkmuseum.ie'
  },
  {
    id: 7,
    title: 'Local History Lecture Series',
    category: 'event',
    description: 'Monthly talks by historians, archaeologists, and community members. Topics cover medieval Dundalk, industrial heritage, folklore, and archaeology.',
    schedule: 'Third Thursday monthly, 7:00 PM - 8:30 PM',
    location: 'Lecture Theatre',
    capacity: 60,
    spotsAvailable: 35,
    ageGroup: 'All ages',
    fee: 'Free, donations welcome',
    contactEmail: 'lectures@dundalkmuseum.ie'
  },
  {
    id: 8,
    title: 'School Partnership Program',
    category: 'education',
    description: 'Tailored museum visits for schools with curriculum-linked activities. Includes guided tours, artifact handling, and classroom resources.',
    schedule: 'Weekdays during term time, flexible timing',
    location: 'Full museum access',
    ageGroup: 'Primary and Secondary schools',
    fee: '€3 per student',
    contactEmail: 'schools@dundalkmuseum.ie'
  }
]

const CATEGORIES = [
  { value: 'all', label: 'All Activities' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'volunteer', label: 'Volunteering' },
  { value: 'event', label: 'Events' },
  { value: 'education', label: 'Education' },
  { value: 'membership', label: 'Membership' }
]

export default function UserLooksFor() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedActivity, setSelectedActivity] = useState<CommunityActivity | null>(null)

  const filteredActivities = selectedCategory === 'all' 
    ? MOCK_ACTIVITIES
    : MOCK_ACTIVITIES.filter(activity => activity.category === selectedCategory)

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      workshop: 'bg-blue-100 text-blue-800',
      volunteer: 'bg-green-100 text-green-800',
      event: 'bg-purple-100 text-purple-800',
      education: 'bg-orange-100 text-orange-800',
      membership: 'bg-pink-100 text-pink-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const handleLearnMore = (activity: CommunityActivity) => {
    setSelectedActivity(activity)
  }

  const handleCloseModal = () => {
    setSelectedActivity(null)
  }

  const handleRegister = (activity: CommunityActivity) => {
    // In a real app, this would open a registration form or redirect
    alert(`Registration for "${activity.title}" will open soon. Contact: ${activity.contactEmail}`)
  }

  return (
    <div data-testid="userlooksfor" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Engagement Activities
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us in exploring, learning, and preserving our shared heritage. 
            From workshops to volunteer opportunities, there's something for everyone at Dundalk Museum.
          </p>
        </header>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-3">
            Filter by Category
          </label>
          <select
            id="category-filter"
            data-testid="userlooksfor-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Showing {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
          </p>
        </div>

        {/* Activities List */}
        <div data-testid="userlooksfor-list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.map(activity => (
            <article
              key={activity.id}
              data-testid="userlooksfor-item"
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-900 flex-1">
                  {activity.title}
                </h2>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getCategoryBadgeColor(activity.category)}`}>
                  {activity.category}
                </span>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {activity.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-start">
                  <span className="font-medium mr-2">📅</span>
                  <span>{activity.schedule}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium mr-2">📍</span>
                  <span>{activity.location}</span>
                </div>
                {activity.ageGroup && (
                  <div className="flex items-start">
                    <span className="font-medium mr-2">👥</span>
                    <span>{activity.ageGroup}</span>
                  </div>
                )}
                <div className="flex items-start">
                  <span className="font-medium mr-2">💰</span>
                  <span className="font-semibold">{activity.fee}</span>
                </div>
              </div>

              {activity.capacity && activity.spotsAvailable !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Availability</span>
                    <span className="font-medium text-gray-900">
                      {activity.spotsAvailable} / {activity.capacity} spots
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        activity.spotsAvailable < 5 ? 'bg-red-500' : 
                        activity.spotsAvailable < 10 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${(activity.spotsAvailable / activity.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  data-testid="userlooksfor-learn-more"
                  onClick={() => handleLearnMore(activity)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Learn More
                </button>
                {activity.category !== 'membership' && (
                  <button
                    data-testid="userlooksfor-register"
                    onClick={() => handleRegister(activity)}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Register
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No activities found in this category.</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-gray-700 mb-6">
            Our community engagement team is here to help you find the perfect activity.
          </p>
          <button
            data-testid="userlooksfor-contact"
            onClick={() => window.location.href = 'mailto:community@dundalkmuseum.ie'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Contact Community Team
          </button>
        </div>
      </div>

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div
          data-testid="userlooksfor-modal"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-900 flex-1">
                {selectedActivity.title}
              </h2>
              <button
                data-testid="userlooksfor-close"
                onClick={handleCloseModal}
                className="ml-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-6 ${getCategoryBadgeColor(selectedActivity.category)}`}>
              {selectedActivity.category}
            </span>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedActivity.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Details</h3>
                <dl className="space-y-2">
                  <div className="flex">
                    <dt className="font-medium text-gray-600 w-32">Schedule:</dt>
                    <dd className="text-gray-900">{selectedActivity.schedule}</dd>
                  </div>
                  <div className="flex">
                    <dt className="font-medium text-gray-600 w-32">Location:</dt>
                    <dd className="text-gray-900">{selectedActivity.location}</dd>
                  </div>
                  {selectedActivity.ageGroup && (
                    <div className="flex">
                      <dt className="font-medium text-gray-600 w-32">Age Group:</dt>
                      <dd className="text-gray-900">{selectedActivity.ageGroup}</dd>
                    </div>
                  )}
                  <div className="flex">
                    <dt className="font-medium text-gray-600 w-32">Fee:</dt>
                    <dd className="text-gray-900 font-semibold">{selectedActivity.fee}</dd>
                  </div>
                  {selectedActivity.capacity && (
                    <div className="flex">
                      <dt className="font-medium text-gray-600 w-32">Capacity:</dt>
                      <dd className="text-gray-900">
                        {selectedActivity.spotsAvailable} spots available of {selectedActivity.capacity}
                      </dd>
                    </div>
                  )}
                  <div className="flex">
                    <dt className="font-medium text-gray-600 w-32">Contact:</dt>
                    <dd className="text-blue-600">{selectedActivity.contactEmail}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  data-testid="userlooksfor-modal-register"
                  onClick={() => handleRegister(selectedActivity)}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Register Now
                </button>
                <button
                  data-testid="userlooksfor-modal-close"
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
