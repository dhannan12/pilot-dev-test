import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import VisitorAccesses from './VisitorAccesses'

describe('VisitorAccesses', () => {
  it('renders without crashing', () => {
    render(<VisitorAccesses />)
    expect(document.body).toBeTruthy()
  })

  it('displays welcome message', () => {
    render(<VisitorAccesses />)
    expect(screen.getByText(/Welcome to Our Coffee Shop/i)).toBeTruthy()
  })

  it('displays all feature cards with mock data', () => {
    render(<VisitorAccesses />)
    // Check that at least 5 feature cards are rendered
    expect(screen.getByText('Explore Our Menu')).toBeTruthy()
    expect(screen.getByText('Join Rewards Program')).toBeTruthy()
    expect(screen.getByText('Find Locations')).toBeTruthy()
    expect(screen.getByText('Order Online')).toBeTruthy()
    expect(screen.getByText('Special Events')).toBeTruthy()
  })

  it('displays quick stats section', () => {
    render(<VisitorAccesses />)
    expect(screen.getByText('50+')).toBeTruthy()
    expect(screen.getByText('100K+')).toBeTruthy()
    expect(screen.getByText('1M+')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<VisitorAccesses />)
    
    // Main wrapper
    const mainSection = document.querySelector('[data-testid="visitoraccesses"]')
    expect(mainSection).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="visitoraccesses-get-started"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-learn-more"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-subscribe"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-create-account"]')).toBeTruthy()
    
    // Email input
    expect(document.querySelector('[data-testid="visitoraccesses-email"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="visitoraccesses-list"]')).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="visitoraccesses-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
    
    // Stats
    expect(document.querySelector('[data-testid="visitoraccesses-stat-locations"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-stat-members"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="visitoraccesses-stat-drinks"]')).toBeTruthy()
  })

  it('has action buttons for each feature', () => {
    render(<VisitorAccesses />)
    
    // Check that action buttons exist for each feature (IDs 1-5)
    for (let i = 1; i <= 5; i++) {
      expect(document.querySelector(`[data-testid="visitoraccesses-action-${i}"]`)).toBeTruthy()
    }
  })
})
