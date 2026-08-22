import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserTriesTo from './UserTriesTo'

describe('UserTriesTo', () => {
  it('renders without crashing', () => {
    render(<UserTriesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays educational module requirement alert', () => {
    render(<UserTriesTo />)
    expect(screen.getByText(/Educational Module Required/i)).toBeTruthy()
    expect(screen.getByText(/complete our educational module first/i)).toBeTruthy()
  })

  it('displays mock advanced features', () => {
    render(<UserTriesTo />)
    expect(screen.getByText(/Advanced Analytics Dashboard/i)).toBeTruthy()
    expect(screen.getByText(/Custom Workout Plans/i)).toBeTruthy()
    expect(screen.getByText(/Medication Interaction Checker/i)).toBeTruthy()
    expect(screen.getByText(/Biometric Data Integration/i)).toBeTruthy()
    expect(screen.getByText(/AI Health Coach/i)).toBeTruthy()
  })

  it('shows education progress bar at 0%', () => {
    render(<UserTriesTo />)
    expect(screen.getByText(/Education Progress/i)).toBeTruthy()
    expect(screen.getByText(/0%/i)).toBeTruthy()
  })

  it('displays benefits of completing education', () => {
    render(<UserTriesTo />)
    expect(screen.getByText(/Why Complete the Educational Module/i)).toBeTruthy()
    expect(screen.getByText(/Learn Safely/i)).toBeTruthy()
    expect(screen.getByText(/Unlock Features/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserTriesTo />)
    // Main wrapper
    expect(document.querySelector('[data-testid="usertriesto"]')).toBeTruthy()
    // Start education button
    expect(document.querySelector('[data-testid="usertriesto-start-education"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="usertriesto-list"]')).toBeTruthy()
    // List items
    const items = document.querySelectorAll('[data-testid="usertriesto-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays locked feature indicators', () => {
    render(<UserTriesTo />)
    const lockedBadges = screen.getAllByText(/Locked/i)
    expect(lockedBadges.length).toBeGreaterThan(0)
  })

  it('shows module requirements for each feature', () => {
    render(<UserTriesTo />)
    expect(screen.getByText(/Data Interpretation Basics/i)).toBeTruthy()
    expect(screen.getByText(/Exercise Science Fundamentals/i)).toBeTruthy()
    expect(screen.getByText(/Health Safety Protocols/i)).toBeTruthy()
  })
})
