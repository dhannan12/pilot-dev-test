import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BuildMatchPerformance from './BuildMatchPerformance'

describe('BuildMatchPerformance', () => {
  it('renders without crashing', () => {
    render(<BuildMatchPerformance />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main title', () => {
    render(<BuildMatchPerformance />)
    expect(screen.getByText('Match Performance Tracking')).toBeTruthy()
  })

  it('displays performance statistics summary', () => {
    render(<BuildMatchPerformance />)
    expect(screen.getByText('Total Matches')).toBeTruthy()
    expect(screen.getByText('Wins')).toBeTruthy()
    expect(screen.getByText('Losses')).toBeTruthy()
  })

  it('displays mock match data', () => {
    render(<BuildMatchPerformance />)
    expect(screen.getByText(/Carlos Martinez/)).toBeTruthy()
    expect(screen.getByText(/James Anderson/)).toBeTruthy()
    expect(screen.getByText(/Michael Chen/)).toBeTruthy()
  })

  it('displays match history section', () => {
    render(<BuildMatchPerformance />)
    expect(screen.getByText('Match History')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<BuildMatchPerformance />)
    
    // Main wrapper
    const mainWrapper = document.querySelector('[data-testid="buildmatchperformance"]')
    expect(mainWrapper).toBeTruthy()
    
    // Filter selects
    const surfaceFilter = document.querySelector('[data-testid="buildmatchperformance-surface"]')
    expect(surfaceFilter).toBeTruthy()
    
    const resultFilter = document.querySelector('[data-testid="buildmatchperformance-result"]')
    expect(resultFilter).toBeTruthy()
    
    // List container
    const listContainer = document.querySelector('[data-testid="buildmatchperformance-list"]')
    expect(listContainer).toBeTruthy()
    
    // List items
    const listItems = document.querySelectorAll('[data-testid="buildmatchperformance-item"]')
    expect(listItems.length).toBeGreaterThan(0)
  })

  it('displays surface filter with options', () => {
    render(<BuildMatchPerformance />)
    const surfaceFilter = screen.getByTestId('buildmatchperformance-surface')
    expect(surfaceFilter).toBeTruthy()
  })

  it('displays result filter with options', () => {
    render(<BuildMatchPerformance />)
    const resultFilter = screen.getByTestId('buildmatchperformance-result')
    expect(resultFilter).toBeTruthy()
  })

  it('displays serving statistics', () => {
    render(<BuildMatchPerformance />)
    expect(screen.getByText('Serving Statistics')).toBeTruthy()
    expect(screen.getByText(/Average Aces per Match/)).toBeTruthy()
    expect(screen.getByText(/Average Double Faults per Match/)).toBeTruthy()
  })

  it('displays performance by surface section', () => {
    render(<BuildMatchPerformance />)
    expect(screen.getByText('Performance by Surface')).toBeTruthy()
  })
})
