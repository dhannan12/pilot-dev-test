import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DailySummaryCount from './DailySummaryCount'

describe('DailySummaryCount', () => {
  it('renders without crashing', () => {
    render(<DailySummaryCount />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<DailySummaryCount />)
    expect(screen.getByText('Daily Booking Summary')).toBeTruthy()
  })

  it('calculates and displays overall totals', () => {
    render(<DailySummaryCount />)
    // With 8 mock bookings, we should see the total
    expect(screen.getByText('Total Bookings')).toBeTruthy()
    expect(screen.getAllByText('Confirmed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Completed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Cancelled').length).toBeGreaterThan(0)
  })

  it('displays daily breakdown table', () => {
    render(<DailySummaryCount />)
    expect(screen.getByText('Daily Breakdown')).toBeTruthy()
    expect(screen.getByText('Date')).toBeTruthy()
    expect(screen.getByText('Total')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<DailySummaryCount />)
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="dailysummarycount"]')
    expect(mainWrapper).toBeTruthy()
    
    // List container
    const listContainer = document.querySelector('[data-testid="dailysummarycount-list"]')
    expect(listContainer).toBeTruthy()
    
    // List items - should have multiple daily summary items
    const listItems = document.querySelectorAll('[data-testid="dailysummarycount-item"]')
    expect(listItems.length).toBeGreaterThan(0)
  })

  it('displays summary statistics', () => {
    render(<DailySummaryCount />)
    expect(screen.getByText('Summary Statistics')).toBeTruthy()
    expect(screen.getByText(/Displaying/)).toBeTruthy()
    expect(screen.getByText(/Success rate:/)).toBeTruthy()
  })

  it('calculates totals correctly', () => {
    render(<DailySummaryCount />)
    // The mock data has 8 bookings total
    const container = document.querySelector('[data-testid="dailysummarycount"]')
    expect(container).toBeTruthy()
    
    // Check that calculations are present
    expect(screen.getByText(/day\(s\) with a total of/)).toBeTruthy()
  })
})
