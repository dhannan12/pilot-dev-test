import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DisplayingSailingCourses from './DisplayingSailingCourses'

describe('DisplayingSailingCourses', () => {
  it('renders without crashing', () => {
    render(<DisplayingSailingCourses />)
    expect(document.body).toBeTruthy()
  })

  it('displays sailing courses with insufficient reviews', () => {
    render(<DisplayingSailingCourses />)
    // Check for page title
    expect(screen.getByText(/Sailing Courses - Review Status/i)).toBeTruthy()
    // Check for courses with insufficient reviews message
    expect(screen.getByText(/courses need more reviews/i)).toBeTruthy()
  })

  it('shows course details', () => {
    render(<DisplayingSailingCourses />)
    // Check that some course names are displayed
    expect(screen.getByText(/Basic Sailing Fundamentals/i)).toBeTruthy()
    expect(screen.getByText(/Advanced Navigation & Racing/i)).toBeTruthy()
  })

  it('displays review status badges', () => {
    render(<DisplayingSailingCourses />)
    // Check for review status indicators
    const noReviewsBadges = screen.getAllByText(/NO REVIEWS/i)
    expect(noReviewsBadges.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<DisplayingSailingCourses />)
    // Verify key testids exist — Playwright QA depends on these
    expect(document.querySelector('[data-testid="displayingsailingcourses"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="displayingsailingcourses-list"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="displayingsailingcourses-item"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="displayingsailingcourses-view"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="displayingsailingcourses-enroll"]')).toBeTruthy()
  })

  it('shows action buttons for each course', () => {
    render(<DisplayingSailingCourses />)
    const viewButtons = document.querySelectorAll('[data-testid="displayingsailingcourses-view"]')
    const enrollButtons = document.querySelectorAll('[data-testid="displayingsailingcourses-enroll"]')
    expect(viewButtons.length).toBeGreaterThan(0)
    expect(enrollButtons.length).toBeGreaterThan(0)
  })

  it('displays help message for improving reviews', () => {
    render(<DisplayingSailingCourses />)
    expect(screen.getByText(/Help Us Improve/i)).toBeTruthy()
    expect(screen.getByText(/These courses need your feedback/i)).toBeTruthy()
  })
})
