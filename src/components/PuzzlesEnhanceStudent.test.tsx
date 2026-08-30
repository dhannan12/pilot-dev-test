import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PuzzlesEnhanceStudent from './PuzzlesEnhanceStudent'

describe('PuzzlesEnhanceStudent', () => {
  it('renders without crashing', () => {
    render(<PuzzlesEnhanceStudent />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<PuzzlesEnhanceStudent />)
    expect(screen.getByText(/Math Puzzle Challenge/i)).toBeTruthy()
  })

  it('displays mock puzzle data', () => {
    render(<PuzzlesEnhanceStudent />)
    expect(screen.getByText(/Number Pattern Detective/i)).toBeTruthy()
    expect(screen.getByText(/Fraction Pizza Party/i)).toBeTruthy()
    expect(screen.getByText(/Geometry Shape Builder/i)).toBeTruthy()
  })

  it('shows stats with completed puzzles and points', () => {
    render(<PuzzlesEnhanceStudent />)
    expect(screen.getByText(/Puzzles Completed/i)).toBeTruthy()
    expect(screen.getByText(/Points Earned/i)).toBeTruthy()
    expect(screen.getByText(/Total Puzzles/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<PuzzlesEnhanceStudent />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="puzzlesenhancestudent"]')).toBeTruthy()
    
    // Filter selects
    expect(document.querySelector('[data-testid="puzzlesenhancestudent-difficulty"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="puzzlesenhancestudent-category"]')).toBeTruthy()
    
    // Reset button
    expect(document.querySelector('[data-testid="puzzlesenhancestudent-reset"]')).toBeTruthy()
    
    // List container
    expect(document.querySelector('[data-testid="puzzlesenhancestudent-list"]')).toBeTruthy()
    
    // List items
    const items = document.querySelectorAll('[data-testid="puzzlesenhancestudent-item"]')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons (start or replay)
    const startButtons = document.querySelectorAll('[data-testid="puzzlesenhancestudent-start"]')
    const replayButtons = document.querySelectorAll('[data-testid="puzzlesenhancestudent-replay"]')
    expect(startButtons.length + replayButtons.length).toBeGreaterThan(0)
  })

  it('displays difficulty and category filters', () => {
    render(<PuzzlesEnhanceStudent />)
    expect(screen.getByText(/Difficulty Level/i)).toBeTruthy()
    expect(screen.getByText(/Category/i)).toBeTruthy()
  })

  it('shows multiple puzzle items', () => {
    render(<PuzzlesEnhanceStudent />)
    const items = document.querySelectorAll('[data-testid="puzzlesenhancestudent-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
