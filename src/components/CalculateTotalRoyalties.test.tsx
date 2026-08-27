import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateTotalRoyalties from './CalculateTotalRoyalties'

describe('CalculateTotalRoyalties', () => {
  it('renders without crashing', () => {
    render(<CalculateTotalRoyalties />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<CalculateTotalRoyalties />)
    
    // Check for track titles
    expect(screen.getByText('Summer Vibes')).toBeTruthy()
    expect(screen.getByText('Midnight Echo')).toBeTruthy()
    expect(screen.getByText('Digital Dreams')).toBeTruthy()
    expect(screen.getByText('Coffee Shop Blues')).toBeTruthy()
    expect(screen.getByText('Neon Nights')).toBeTruthy()
    
    // Check for header
    expect(screen.getByText('Royalty Calculator')).toBeTruthy()
    
    // Check for summary sections
    expect(screen.getByText('Total Royalties')).toBeTruthy()
    expect(screen.getByText('Total Streams')).toBeTruthy()
    expect(screen.getByText('Total Tracks')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<CalculateTotalRoyalties />)
    
    // Verify key testids exist — Playwright QA depends on these
    const mainWrapper = document.querySelector('[data-testid="calculatetotalroyalties"]')
    expect(mainWrapper).toBeTruthy()
    
    // Check list container
    const listContainer = document.querySelector('[data-testid="calculatetotalroyalties-list"]')
    expect(listContainer).toBeTruthy()
    
    // Check list items
    const listItems = document.querySelectorAll('[data-testid="calculatetotalroyalties-item"]')
    expect(listItems.length).toBeGreaterThan(0)
    
    // Check action buttons
    const refreshButton = document.querySelector('[data-testid="calculatetotalroyalties-refresh"]')
    expect(refreshButton).toBeTruthy()
    
    const exportButton = document.querySelector('[data-testid="calculatetotalroyalties-export"]')
    expect(exportButton).toBeTruthy()
  })

  it('calculates royalties correctly', () => {
    render(<CalculateTotalRoyalties />)
    
    // First track: Summer Vibes = 1,250,000 streams × $0.004 = $5,000
    expect(screen.getByText('$5,000.00')).toBeTruthy()
    
    // Check that monetary values are displayed
    const dollarSigns = document.body.textContent?.match(/\$[\d,]+\.[\d]+/g)
    expect(dollarSigns).toBeTruthy()
    expect(dollarSigns!.length).toBeGreaterThan(0)
  })
})
