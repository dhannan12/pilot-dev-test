import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays the review form', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Leave a Review/i)).toBeTruthy()
    expect(screen.getByPlaceholderText(/Share your experience/i)).toBeTruthy()
  })

  it('displays mock reviews', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Sarah Murphy/i)).toBeTruthy()
    expect(screen.getByText(/James O'Connor/i)).toBeTruthy()
    expect(screen.getByText(/Emma Sullivan/i)).toBeTruthy()
    expect(screen.getByText(/David Kelly/i)).toBeTruthy()
    expect(screen.getByText(/Mary Walsh/i)).toBeTruthy()
  })

  it('shows unverified account warning', () => {
    render(<UserAttemptsTo />)
    expect(screen.getByText(/Account not verified/i)).toBeTruthy()
  })

  it('shows error message when attempting to submit without verification', () => {
    render(<UserAttemptsTo />)
    const submitButton = screen.getByTestId('userattemptsto-submit')
    fireEvent.click(submitButton)
    expect(screen.getByTestId('userattemptsto-error')).toBeTruthy()
    expect(screen.getByText(/Unable to submit review/i)).toBeTruthy()
  })

  it('allows rating selection', () => {
    render(<UserAttemptsTo />)
    const star3 = screen.getByTestId('userattemptsto-rating-3')
    fireEvent.click(star3)
    // Component should handle the click without crashing
    expect(star3).toBeTruthy()
  })

  it('allows comment input', () => {
    render(<UserAttemptsTo />)
    const textarea = screen.getByTestId('userattemptsto-comment') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Great place!' } })
    expect(textarea.value).toBe('Great place!')
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('userattemptsto')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-submit')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-comment')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-rating-1')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-rating-5')).toBeTruthy()
    expect(screen.getByTestId('userattemptsto-list')).toBeTruthy()
    expect(screen.getAllByTestId('userattemptsto-item').length).toBeGreaterThan(0)
  })
})
