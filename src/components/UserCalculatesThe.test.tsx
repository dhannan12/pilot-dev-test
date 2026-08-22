import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserCalculatesThe from './UserCalculatesThe'

describe('UserCalculatesThe', () => {
  it('renders without crashing', () => {
    render(<UserCalculatesThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main title and description', () => {
    render(<UserCalculatesThe />)
    expect(screen.getByText('Family Activity Cost Calculator')).toBeTruthy()
    expect(screen.getByText(/Plan your West Ireland adventure/i)).toBeTruthy()
  })

  it('displays all mock activities in the list', () => {
    render(<UserCalculatesThe />)
    
    // Check that activity names are displayed
    expect(screen.getByText('Cliffs of Moher Tour')).toBeTruthy()
    expect(screen.getByText('Connemara Safari')).toBeTruthy()
    expect(screen.getByText('Aran Islands Ferry & Tour')).toBeTruthy()
    expect(screen.getByText('Burren Nature Walk')).toBeTruthy()
    expect(screen.getByText('Galway Bay Cruise')).toBeTruthy()
    expect(screen.getByText('Kylemore Abbey Visit')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserCalculatesThe />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="usercalculatesthe"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="usercalculatesthe-activity"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercalculatesthe-adults"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercalculatesthe-children"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="usercalculatesthe-calculate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usercalculatesthe-reset"]')).toBeTruthy()
    
    // List container and items
    expect(document.querySelector('[data-testid="usercalculatesthe-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="usercalculatesthe-item"]').length).toBeGreaterThan(0)
  })

  it('allows selecting an activity from dropdown', () => {
    render(<UserCalculatesThe />)
    
    const select = document.querySelector('[data-testid="usercalculatesthe-activity"]') as HTMLSelectElement
    expect(select).toBeTruthy()
    
    fireEvent.change(select, { target: { value: 'cliffs-moher' } })
    expect(select.value).toBe('cliffs-moher')
  })

  it('allows changing number of adults and children', () => {
    render(<UserCalculatesThe />)
    
    const adultsInput = document.querySelector('[data-testid="usercalculatesthe-adults"]') as HTMLInputElement
    const childrenInput = document.querySelector('[data-testid="usercalculatesthe-children"]') as HTMLInputElement
    
    fireEvent.change(adultsInput, { target: { value: '3' } })
    fireEvent.change(childrenInput, { target: { value: '2' } })
    
    expect(adultsInput.value).toBe('3')
    expect(childrenInput.value).toBe('2')
  })

  it('calculates and displays cost when calculate button is clicked', () => {
    render(<UserCalculatesThe />)
    
    const select = document.querySelector('[data-testid="usercalculatesthe-activity"]') as HTMLSelectElement
    const adultsInput = document.querySelector('[data-testid="usercalculatesthe-adults"]') as HTMLInputElement
    const childrenInput = document.querySelector('[data-testid="usercalculatesthe-children"]') as HTMLInputElement
    const calculateBtn = document.querySelector('[data-testid="usercalculatesthe-calculate"]') as HTMLButtonElement
    
    // Select activity and set family size
    fireEvent.change(select, { target: { value: 'cliffs-moher' } })
    fireEvent.change(adultsInput, { target: { value: '2' } })
    fireEvent.change(childrenInput, { target: { value: '2' } })
    
    // Click calculate
    fireEvent.click(calculateBtn)
    
    // Check that results are displayed
    const results = document.querySelector('[data-testid="usercalculatesthe-results"]')
    expect(results).toBeTruthy()
  })

  it('reset button clears the form', () => {
    render(<UserCalculatesThe />)
    
    const select = document.querySelector('[data-testid="usercalculatesthe-activity"]') as HTMLSelectElement
    const resetBtn = document.querySelector('[data-testid="usercalculatesthe-reset"]') as HTMLButtonElement
    
    // Select an activity
    fireEvent.change(select, { target: { value: 'cliffs-moher' } })
    expect(select.value).toBe('cliffs-moher')
    
    // Click reset
    fireEvent.click(resetBtn)
    
    // Check that form is cleared
    expect(select.value).toBe('')
  })
})
