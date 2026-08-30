import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FeedbackIsProvided from './FeedbackIsProvided'

describe('FeedbackIsProvided', () => {
  it('renders without crashing', () => {
    render(<FeedbackIsProvided />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock exercise feedback data', () => {
    render(<FeedbackIsProvided />)
    expect(screen.getByText(/Exercise Feedback/i)).toBeTruthy()
    expect(screen.getByText(/What is 7 × 8\?/i)).toBeTruthy()
    expect(screen.getByText(/Solve: 15 \+ 23 = \?/i)).toBeTruthy()
    expect(screen.getByText(/What is 144 ÷ 12\?/i)).toBeTruthy()
  })

  it('shows correct and incorrect answer indicators', () => {
    render(<FeedbackIsProvided />)
    expect(screen.getByText(/Correct Answers/i)).toBeTruthy()
    expect(screen.getByText(/Total Score/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<FeedbackIsProvided />)
    // Main wrapper
    expect(document.querySelector('[data-testid="feedbackisprovided"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="feedbackisprovided-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="feedbackisprovided-item"]')
    expect(items.length).toBeGreaterThan(0)
    // Toggle button
    expect(document.querySelector('[data-testid="feedbackisprovided-toggle"]')).toBeTruthy()
    // Continue button
    expect(document.querySelector('[data-testid="feedbackisprovided-continue"]')).toBeTruthy()
  })

  it('displays user answers and correct answers', () => {
    render(<FeedbackIsProvided />)
    const yourAnswerElements = screen.getAllByText(/Your Answer/i)
    expect(yourAnswerElements.length).toBeGreaterThan(0)
    const correctAnswerElements = screen.getAllByText(/Correct Answer/i)
    expect(correctAnswerElements.length).toBeGreaterThan(0)
  })

  it('shows topic categories for exercises', () => {
    render(<FeedbackIsProvided />)
    expect(screen.getByText(/Multiplication/i)).toBeTruthy()
    expect(screen.getByText(/Addition/i)).toBeTruthy()
    expect(screen.getByText(/Division/i)).toBeTruthy()
  })
})
