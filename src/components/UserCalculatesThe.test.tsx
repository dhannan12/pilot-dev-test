import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserCalculatesThe from './UserCalculatesThe'

describe('UserCalculatesThe', () => {
  it('renders without crashing', () => {
    render(<UserCalculatesThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays the component title', () => {
    render(<UserCalculatesThe />)
    expect(screen.getByText('Family Activity Cost Calculator')).toBeTruthy()
  })

  it('displays mock activities in the list', () => {
    render(<UserCalculatesThe />)
    expect(screen.getByText('Connemara National Park Tour')).toBeTruthy()
    expect(screen.getByText('Cliffs of Moher Day Trip')).toBeTruthy()
    expect(screen.getByText('Traditional Irish Music Session')).toBeTruthy()
    expect(screen.getByText('Boat Tour of Galway Bay')).toBeTruthy()
    expect(screen.getByText('Aran Islands Ferry & Tour')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserCalculatesThe />)
    
    // Main wrapper
    expect(screen.getByTestId('usercalculatesthe')).toBeTruthy()
    
    // Input fields
    expect(screen.getByTestId('usercalculatesthe-activity')).toBeTruthy()
    expect(screen.getByTestId('usercalculatesthe-adults')).toBeTruthy()
    expect(screen.getByTestId('usercalculatesthe-children')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('usercalculatesthe-calculate')).toBeTruthy()
    expect(screen.getByTestId('usercalculatesthe-reset')).toBeTruthy()
    
    // List elements
    expect(screen.getByTestId('usercalculatesthe-list')).toBeTruthy()
    const items = screen.getAllByTestId('usercalculatesthe-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('calculates cost correctly for adults and children', () => {
    render(<UserCalculatesThe />)
    
    // Select an activity (Connemara National Park Tour - Adult: €15, Child: €8)
    const activitySelect = screen.getByTestId('usercalculatesthe-activity') as HTMLSelectElement
    fireEvent.change(activitySelect, { target: { value: '1' } })
    
    // Enter 2 adults
    const adultsInput = screen.getByTestId('usercalculatesthe-adults') as HTMLInputElement
    fireEvent.change(adultsInput, { target: { value: '2' } })
    
    // Enter 3 children
    const childrenInput = screen.getByTestId('usercalculatesthe-children') as HTMLInputElement
    fireEvent.change(childrenInput, { target: { value: '3' } })
    
    // Click calculate
    const calculateButton = screen.getByTestId('usercalculatesthe-calculate')
    fireEvent.click(calculateButton)
    
    // Expected cost: 2 * 15 + 3 * 8 = 30 + 24 = 54
    expect(screen.getByText('€54.00')).toBeTruthy()
  })

  it('shows cost breakdown when calculated', () => {
    render(<UserCalculatesThe />)
    
    const activitySelect = screen.getByTestId('usercalculatesthe-activity') as HTMLSelectElement
    fireEvent.change(activitySelect, { target: { value: '2' } })
    
    const adultsInput = screen.getByTestId('usercalculatesthe-adults') as HTMLInputElement
    fireEvent.change(adultsInput, { target: { value: '1' } })
    
    const calculateButton = screen.getByTestId('usercalculatesthe-calculate')
    fireEvent.click(calculateButton)
    
    expect(screen.getByTestId('usercalculatesthe-result')).toBeTruthy()
    expect(screen.getByText('Cost Breakdown')).toBeTruthy()
  })

  it('resets the form when reset button is clicked', () => {
    render(<UserCalculatesThe />)
    
    const activitySelect = screen.getByTestId('usercalculatesthe-activity') as HTMLSelectElement
    fireEvent.change(activitySelect, { target: { value: '1' } })
    
    const adultsInput = screen.getByTestId('usercalculatesthe-adults') as HTMLInputElement
    fireEvent.change(adultsInput, { target: { value: '2' } })
    
    const resetButton = screen.getByTestId('usercalculatesthe-reset')
    fireEvent.click(resetButton)
    
    expect(activitySelect.value).toBe('')
    expect(adultsInput.value).toBe('0')
  })

  it('disables calculate button when no activity selected', () => {
    render(<UserCalculatesThe />)
    
    const calculateButton = screen.getByTestId('usercalculatesthe-calculate') as HTMLButtonElement
    expect(calculateButton.disabled).toBe(true)
  })

  it('allows clicking on activity cards to select them', () => {
    render(<UserCalculatesThe />)
    
    const activityItems = screen.getAllByTestId('usercalculatesthe-item')
    fireEvent.click(activityItems[0])
    
    const activitySelect = screen.getByTestId('usercalculatesthe-activity') as HTMLSelectElement
    expect(activitySelect.value).toBe('1')
  })
})
