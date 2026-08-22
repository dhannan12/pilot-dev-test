import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserChecksProgress from './UserChecksProgress'

describe('UserChecksProgress', () => {
  it('renders without crashing', () => {
    render(<UserChecksProgress />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock wellness goals data', () => {
    render(<UserChecksProgress />)
    expect(screen.getByText('Daily Steps')).toBeTruthy()
    expect(screen.getByText('Water Intake')).toBeTruthy()
    expect(screen.getByText('Sleep Hours')).toBeTruthy()
    expect(screen.getByText('Meditation Minutes')).toBeTruthy()
    expect(screen.getByText('Vegetables Servings')).toBeTruthy()
  })

  it('displays summary statistics', () => {
    render(<UserChecksProgress />)
    expect(screen.getByText('Total Goals')).toBeTruthy()
    expect(screen.getByText('Completed')).toBeTruthy()
    expect(screen.getByText('Average Progress')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserChecksProgress />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userchecksprogress"]')).toBeTruthy()
    
    // Category filter
    expect(document.querySelector('[data-testid="userchecksprogress-category"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="userchecksprogress-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="userchecksprogress-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(document.querySelector('[data-testid="userchecksprogress-update"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userchecksprogress-addgoal"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userchecksprogress-export"]')).toBeTruthy()
  })

  it('displays progress percentages', () => {
    render(<UserChecksProgress />)
    // Check for percentage indicators
    const percentageElements = document.querySelectorAll('.bg-green-500, .bg-yellow-500, .bg-red-500')
    expect(percentageElements.length).toBeGreaterThan(0)
  })

  it('displays category filter dropdown', () => {
    render(<UserChecksProgress />)
    const categorySelect = screen.getByTestId('userchecksprogress-category')
    expect(categorySelect).toBeTruthy()
    expect(screen.getByText('All Categories')).toBeTruthy()
  })

  it('shows action buttons', () => {
    render(<UserChecksProgress />)
    expect(screen.getByTestId('userchecksprogress-addgoal')).toBeTruthy()
    expect(screen.getByTestId('userchecksprogress-export')).toBeTruthy()
  })
})
