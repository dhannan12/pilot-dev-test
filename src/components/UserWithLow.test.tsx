import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserWithLow from './UserWithLow'

describe('UserWithLow', () => {
  it('renders without crashing', () => {
    render(<UserWithLow />)
    expect(document.body).toBeTruthy()
  })

  it('displays main heading and instructions', () => {
    render(<UserWithLow />)
    expect(screen.getByText('Coffee Origin Information')).toBeTruthy()
    expect(screen.getByText('Learn where our coffees come from')).toBeTruthy()
  })

  it('displays mock coffee data', () => {
    render(<UserWithLow />)
    expect(screen.getByText('Morning Blend')).toBeTruthy()
    expect(screen.getByText('Dark Roast Supreme')).toBeTruthy()
    expect(screen.getByText('Smooth Sunrise')).toBeTruthy()
    expect(screen.getByText('Island Paradise')).toBeTruthy()
    expect(screen.getByText('Classic Medium')).toBeTruthy()
    expect(screen.getByText('Espresso Special')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserWithLow />)
    // Main wrapper
    expect(document.querySelector('[data-testid="userwithlow"]')).toBeTruthy()
    // List container
    expect(document.querySelector('[data-testid="userwithlow-list"]')).toBeTruthy()
    // List items
    expect(document.querySelectorAll('[data-testid="userwithlow-item"]').length).toBe(6)
    // Buttons
    expect(document.querySelector('[data-testid="userwithlow-help-toggle"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="userwithlow-view-details"]').length).toBe(6)
  })

  it('shows help panel when help button is clicked', () => {
    render(<UserWithLow />)
    const helpButton = screen.getByTestId('userwithlow-help-toggle')
    
    // Initially help should not be visible
    expect(screen.queryByTestId('userwithlow-help-panel')).toBeFalsy()
    
    // Click to show help
    fireEvent.click(helpButton)
    expect(screen.getByTestId('userwithlow-help-panel')).toBeTruthy()
    expect(screen.getByText('How to Use This Page')).toBeTruthy()
  })

  it('shows coffee details when view details button is clicked', () => {
    render(<UserWithLow />)
    const viewButtons = screen.getAllByTestId('userwithlow-view-details')
    
    // Click first coffee's view details button
    fireEvent.click(viewButtons[0])
    
    // Detail panel should appear
    const detailPanel = screen.getByTestId('userwithlow-detail-panel')
    expect(detailPanel).toBeTruthy()
    expect(screen.getByTestId('userwithlow-close-detail')).toBeTruthy()
    // Check for unique detail content
    expect(screen.getByText('Yirgacheffe')).toBeTruthy()
    expect(screen.getByText('Smooth and bright coffee from the birthplace of coffee.')).toBeTruthy()
  })

  it('closes detail panel when close button is clicked', () => {
    render(<UserWithLow />)
    const viewButtons = screen.getAllByTestId('userwithlow-view-details')
    
    // Open details
    fireEvent.click(viewButtons[0])
    expect(screen.getByTestId('userwithlow-detail-panel')).toBeTruthy()
    
    // Close details
    const closeButton = screen.getByTestId('userwithlow-close-detail')
    fireEvent.click(closeButton)
    expect(screen.queryByTestId('userwithlow-detail-panel')).toBeFalsy()
  })

  it('displays all coffee origin information', () => {
    render(<UserWithLow />)
    expect(screen.getByText(/Ethiopian Highlands/)).toBeTruthy()
    expect(screen.getByText(/Colombian Mountains/)).toBeTruthy()
    expect(screen.getByText(/Brazilian Valleys/)).toBeTruthy()
    expect(screen.getByText(/Hawaiian Slopes/)).toBeTruthy()
    expect(screen.getByText(/Costa Rican Hills/)).toBeTruthy()
  })
})
