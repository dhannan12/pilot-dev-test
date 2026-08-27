/**
 * SubmittingAnEvent — Event submission form that allows creating events with or without dates
 *
 * Features: event creation form, optional date field, category selection, event preview list, validation feedback
 *
 * Ticket: SCRUM-1239 | Branch: proto/SCRUM-1233
 */

import React, { useState } from 'react'

interface Event {
  id: string
  name: string
  description: string
  location: string
  date?: string
  time: string
  category: string
  submittedAt: string
}

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Community Meetup',
    description: 'Monthly community gathering for networking',
    location: 'Central Park',
    date: '2026-09-15',
    time: '14:00',
    category: 'Social',
    submittedAt: '2026-08-20T10:30:00Z'
  },
  {
    id: '2',
    name: 'Open Mic Night',
    description: 'Weekly open mic for performers',
    location: 'The Blue Note',
    time: '19:00',
    category: 'Entertainment',
    submittedAt: '2026-08-21T15:45:00Z'
  },
  {
    id: '3',
    name: 'Tech Workshop',
    description: 'Learn about the latest web technologies',
    location: 'Innovation Hub',
    date: '2026-09-22',
    time: '10:00',
    category: 'Education',
    submittedAt: '2026-08-22T09:15:00Z'
  },
  {
    id: '4',
    name: 'Farmer\'s Market',
    description: 'Fresh produce and local crafts',
    location: 'Town Square',
    time: '08:00',
    category: 'Community',
    submittedAt: '2026-08-23T07:00:00Z'
  },
  {
    id: '5',
    name: 'Art Exhibition',
    description: 'Contemporary art showcase',
    location: 'City Gallery',
    date: '2026-10-01',
    time: '18:00',
    category: 'Arts',
    submittedAt: '2026-08-24T14:20:00Z'
  },
  {
    id: '6',
    name: 'Yoga Classes',
    description: 'Drop-in yoga sessions for all levels',
    location: 'Wellness Center',
    time: '06:30',
    category: 'Health',
    submittedAt: '2026-08-25T11:00:00Z'
  }
]

const CATEGORIES = ['Social', 'Entertainment', 'Education', 'Community', 'Arts', 'Health', 'Sports', 'Business']

export default function SubmittingAnEvent() {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: 'Social'
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }
    if (!formData.time.trim()) {
      newErrors.time = 'Time is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      location: formData.location,
      date: formData.date || undefined,
      time: formData.time,
      category: formData.category,
      submittedAt: new Date().toISOString()
    }

    setEvents(prev => [newEvent, ...prev])
    setFormData({
      name: '',
      description: '',
      location: '',
      date: '',
      time: '',
      category: 'Social'
    })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      date: '',
      time: '',
      category: 'Social'
    })
    setErrors({})
  }

  return (
    <div data-testid="submittinganevent" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit an Event</h1>
        <p className="text-gray-600 mb-8">Create and submit events with or without specific dates</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Submission Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Event Details</h2>
            
            {showSuccess && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                Event submitted successfully!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    data-testid="submittinganevent-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter event name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    data-testid="submittinganevent-description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your event"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    data-testid="submittinganevent-location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Event location"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    data-testid="submittinganevent-date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Leave blank for recurring or date-flexible events</p>
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    data-testid="submittinganevent-time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.time ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    data-testid="submittinganevent-category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  data-testid="submittinganevent-submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit Event
                </button>
                <button
                  type="button"
                  data-testid="submittinganevent-reset"
                  onClick={handleReset}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Submitted Events</h2>
            <div data-testid="submittinganevent-list" className="space-y-4 max-h-[600px] overflow-y-auto">
              {events.map(event => (
                <div
                  key={event.id}
                  data-testid="submittinganevent-item"
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{event.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">🕐</span>
                      <span>{event.time}</span>
                      {event.date && <span className="ml-2">• {event.date}</span>}
                      {!event.date && <span className="ml-2 text-amber-600">• No specific date</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
