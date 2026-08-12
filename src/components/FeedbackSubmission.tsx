/**
 * FeedbackSubmission — Feedback submission form for event participants with validation
 *
 * Features: participant verification, feedback form, rating system, submission validation, participant list display
 *
 * Ticket: SCRUM-679 | Branch: proto/SCRUM-674
 */

import { useState } from 'react'

interface EventParticipant {
  id: string
  name: string
  email: string
  eventId: string
  eventName: string
  attended: boolean
}

interface FeedbackSubmission {
  id: string
  participantId: string
  eventId: string
  rating: number
  comment: string
  submittedAt: string
}

const mockParticipants: EventParticipant[] = [
  {
    id: 'P001',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    eventId: 'EVT001',
    eventName: 'Team Building Workshop',
    attended: true
  },
  {
    id: 'P002',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    eventId: 'EVT001',
    eventName: 'Team Building Workshop',
    attended: true
  },
  {
    id: 'P003',
    name: 'Carol Davis',
    email: 'carol.davis@example.com',
    eventId: 'EVT001',
    eventName: 'Team Building Workshop',
    attended: false
  },
  {
    id: 'P004',
    name: 'David Lee',
    email: 'david.lee@example.com',
    eventId: 'EVT002',
    eventName: 'Annual Conference 2026',
    attended: true
  },
  {
    id: 'P005',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    eventId: 'EVT002',
    eventName: 'Annual Conference 2026',
    attended: true
  },
  {
    id: 'P006',
    name: 'Frank Martinez',
    email: 'frank.martinez@example.com',
    eventId: 'EVT003',
    eventName: 'Product Launch Event',
    attended: true
  },
  {
    id: 'P007',
    name: 'Grace Taylor',
    email: 'grace.taylor@example.com',
    eventId: 'EVT003',
    eventName: 'Product Launch Event',
    attended: false
  }
]

const mockSubmissions: FeedbackSubmission[] = [
  {
    id: 'FB001',
    participantId: 'P001',
    eventId: 'EVT001',
    rating: 5,
    comment: 'Excellent workshop! Very engaging and informative.',
    submittedAt: '2026-08-10T14:30:00Z'
  },
  {
    id: 'FB002',
    participantId: 'P004',
    eventId: 'EVT002',
    rating: 4,
    comment: 'Great conference with valuable networking opportunities.',
    submittedAt: '2026-08-11T09:15:00Z'
  }
]

export default function FeedbackSubmission() {
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>(mockSubmissions)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const selectedParticipant = mockParticipants.find(p => p.id === selectedParticipantId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!selectedParticipantId) {
      setErrorMessage('Please select a participant')
      return
    }

    const participant = mockParticipants.find(p => p.id === selectedParticipantId)
    
    if (!participant) {
      setErrorMessage('Invalid participant selected')
      return
    }

    if (!participant.attended) {
      setErrorMessage('Only participants who attended the event can submit feedback')
      return
    }

    if (rating === 0) {
      setErrorMessage('Please provide a rating')
      return
    }

    if (comment.trim().length === 0) {
      setErrorMessage('Please provide a comment')
      return
    }

    // Check if already submitted
    const existingSubmission = submissions.find(
      s => s.participantId === selectedParticipantId && s.eventId === participant.eventId
    )

    if (existingSubmission) {
      setErrorMessage('Feedback has already been submitted for this event')
      return
    }

    // Create new submission
    const newSubmission: FeedbackSubmission = {
      id: `FB${String(submissions.length + 1).padStart(3, '0')}`,
      participantId: selectedParticipantId,
      eventId: participant.eventId,
      rating,
      comment: comment.trim(),
      submittedAt: new Date().toISOString()
    }

    setSubmissions([...submissions, newSubmission])
    setSuccessMessage('Feedback submitted successfully!')
    
    // Reset form
    setSelectedParticipantId('')
    setRating(0)
    setComment('')
  }

  const attendedParticipants = mockParticipants.filter(p => p.attended)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Event Feedback Submission</h1>
          <p className="text-gray-600 mb-6">
            Only participants who attended the event can submit feedback
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Participant Selection */}
            <div>
              <label htmlFor="participant" className="block text-sm font-medium text-gray-700 mb-2">
                Select Participant *
              </label>
              <select
                id="participant"
                value={selectedParticipantId}
                onChange={(e) => setSelectedParticipantId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Select a participant --</option>
                {attendedParticipants.map((participant) => (
                  <option key={participant.id} value={participant.id}>
                    {participant.name} - {participant.eventName}
                  </option>
                ))}
              </select>
              {selectedParticipant && (
                <p className="mt-2 text-sm text-gray-600">
                  Event: {selectedParticipant.eventName}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-12 h-12 text-2xl rounded-lg transition-colors ${
                      rating >= star
                        ? 'bg-yellow-400 text-white'
                        : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {rating} out of 5 stars
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Comment *
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your thoughts about the event..."
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Participants List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Event Participants</h2>
          <div className="space-y-3">
            {mockParticipants.map((participant) => {
              const hasSubmitted = submissions.some(
                s => s.participantId === participant.id && s.eventId === participant.eventId
              )
              
              return (
                <div
                  key={participant.id}
                  className={`p-4 rounded-lg border ${
                    participant.attended
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{participant.name}</h3>
                      <p className="text-sm text-gray-600">{participant.email}</p>
                      <p className="text-sm text-gray-600">{participant.eventName}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          participant.attended
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {participant.attended ? 'Attended' : 'Not Attended'}
                      </span>
                      {participant.attended && hasSubmitted && (
                        <div className="mt-1">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Feedback Submitted
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Submitted Feedback List */}
        {submissions.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Feedback Submissions</h2>
            <div className="space-y-4">
              {submissions.map((submission) => {
                const participant = mockParticipants.find(p => p.id === submission.participantId)
                return (
                  <div key={submission.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{participant?.name}</h3>
                        <p className="text-sm text-gray-600">{participant?.eventName}</p>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${
                              submission.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{submission.comment}</p>
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
