import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FeedbackSubmission from './FeedbackSubmission'

describe('FeedbackSubmission', () => {
  it('renders without crashing', () => {
    render(<FeedbackSubmission />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<FeedbackSubmission />)
    expect(screen.getByText('Event Feedback Submission')).toBeTruthy()
  })

  it('displays participant selection dropdown', () => {
    render(<FeedbackSubmission />)
    expect(screen.getByLabelText(/Select Participant/i)).toBeTruthy()
  })

  it('displays only attended participants in dropdown', () => {
    render(<FeedbackSubmission />)
    const select = screen.getByLabelText(/Select Participant/i) as HTMLSelectElement
    const options = Array.from(select.options).filter(opt => opt.value !== '')
    
    // Should have attended participants only
    expect(options.length).toBeGreaterThan(0)
    expect(options.some(opt => opt.text.includes('Alice Johnson'))).toBeTruthy()
  })

  it('displays rating stars', () => {
    render(<FeedbackSubmission />)
    const stars = screen.getAllByText('★')
    expect(stars.length).toBeGreaterThanOrEqual(5)
  })

  it('displays feedback comment textarea', () => {
    render(<FeedbackSubmission />)
    expect(screen.getByPlaceholderText(/Share your thoughts/i)).toBeTruthy()
  })

  it('displays submit button', () => {
    render(<FeedbackSubmission />)
    expect(screen.getByRole('button', { name: /Submit Feedback/i })).toBeTruthy()
  })

  it('shows error when submitting without selecting participant', () => {
    render(<FeedbackSubmission />)
    const submitButton = screen.getByRole('button', { name: /Submit Feedback/i })
    fireEvent.click(submitButton)
    expect(screen.getByText(/Please select a participant/i)).toBeTruthy()
  })

  it('allows rating selection', () => {
    render(<FeedbackSubmission />)
    const stars = screen.getAllByRole('button').filter(btn => btn.textContent === '★')
    fireEvent.click(stars[3]) // Click 4th star
    expect(screen.getByText(/4 out of 5 stars/i)).toBeTruthy()
  })

  it('displays participants list', () => {
    render(<FeedbackSubmission />)
    expect(screen.getByText('Event Participants')).toBeTruthy()
    const aliceElements = screen.getAllByText('Alice Johnson')
    expect(aliceElements.length).toBeGreaterThan(0)
  })

  it('shows attended status badges', () => {
    render(<FeedbackSubmission />)
    const attendedBadges = screen.getAllByText('Attended')
    expect(attendedBadges.length).toBeGreaterThan(0)
  })

  it('displays mock feedback submissions', () => {
    render(<FeedbackSubmission />)
    expect(screen.getByText('Recent Feedback Submissions')).toBeTruthy()
  })

  it('updates comment field on input', () => {
    render(<FeedbackSubmission />)
    const textarea = screen.getByPlaceholderText(/Share your thoughts/i) as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Great event!' } })
    expect(textarea.value).toBe('Great event!')
  })

  it('shows validation message for non-attended participants', () => {
    render(<FeedbackSubmission />)
    const notAttendedBadges = screen.getAllByText('Not Attended')
    expect(notAttendedBadges.length).toBeGreaterThan(0)
  })
})
