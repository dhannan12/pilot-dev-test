import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OnlyCateringManagers from './OnlyCateringManagers'

describe('OnlyCateringManagers', () => {
  it('renders without crashing', () => {
    render(<OnlyCateringManagers />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<OnlyCateringManagers />)
    // Check for component title
    expect(screen.getByText('Weekly Order Reports')).toBeTruthy()
    // Check for at least one mock report - use getAllByText since Week 32 appears in dropdown and report
    const week32Elements = screen.getAllByText(/Week 32/)
    expect(week32Elements.length).toBeGreaterThan(0)
    // Check for Sarah Johnson in report list
    const sarahElements = screen.getAllByText(/Sarah Johnson/)
    expect(sarahElements.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<OnlyCateringManagers />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="onlycateringmanagers"]')).toBeTruthy()
    
    // User selector
    expect(document.querySelector('[data-testid="onlycateringmanagers-user"]')).toBeTruthy()
    
    // Week selector
    expect(document.querySelector('[data-testid="onlycateringmanagers-week"]')).toBeTruthy()
    
    // Generate button
    expect(document.querySelector('[data-testid="onlycateringmanagers-generate"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="onlycateringmanagers-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="onlycateringmanagers-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Download button
    expect(document.querySelector('[data-testid="onlycateringmanagers-download"]')).toBeTruthy()
  })

  it('shows generate report section for catering managers', () => {
    render(<OnlyCateringManagers />)
    // Default user is catering manager - use testid for button instead of text
    expect(screen.getByTestId('onlycateringmanagers-generate')).toBeTruthy()
    expect(screen.getByTestId('onlycateringmanagers-week')).toBeTruthy()
  })

  it('shows access denied message for non-manager roles', () => {
    render(<OnlyCateringManagers />)
    
    // Switch to staff user (index 1)
    const userSelect = screen.getByTestId('onlycateringmanagers-user') as HTMLSelectElement
    fireEvent.change(userSelect, { target: { value: '2' } })
    
    // Should show access denied
    expect(screen.getByText('Access Denied')).toBeTruthy()
    expect(screen.getByText(/Only catering managers can generate weekly order reports/)).toBeTruthy()
  })

  it('allows catering managers to generate reports', async () => {
    render(<OnlyCateringManagers />)
    
    // Ensure we're a catering manager
    expect(screen.getByTestId('onlycateringmanagers-generate')).toBeTruthy()
    
    // Click generate button
    const generateBtn = screen.getByTestId('onlycateringmanagers-generate')
    fireEvent.click(generateBtn)
    
    // Button should show loading state
    expect(screen.getByText('Generating Report...')).toBeTruthy()
    
    // Wait for report to be generated
    await waitFor(() => {
      expect(screen.getByText('Generate Weekly Report')).toBeTruthy()
    }, { timeout: 2000 })
  })

  it('displays report list with multiple items', () => {
    render(<OnlyCateringManagers />)
    
    const reportItems = screen.getAllByTestId('onlycateringmanagers-item')
    expect(reportItems.length).toBeGreaterThanOrEqual(5)
  })

  it('shows user role badge', () => {
    render(<OnlyCateringManagers />)
    
    // Should show catering manager badge by default
    expect(screen.getByText('CATERING MANAGER')).toBeTruthy()
  })
})
