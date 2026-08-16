import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserTriesTo from './UserTriesTo'

describe('UserTriesTo', () => {
  it('renders without crashing', () => {
    render(<UserTriesTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock case data', () => {
    render(<UserTriesTo />)
    // Check for case data in the document
    expect(document.body.textContent).toContain('CASE-2024-001')
    expect(document.body.textContent).toContain('John Smith vs. ABC Corp')
    expect(document.body.textContent).toContain('Personal Injury')
  })

  it('has required data-testid attributes', () => {
    render(<UserTriesTo />)
    
    // Main wrapper
    expect(screen.getByTestId('usertriesto')).toBeTruthy()
    
    // Case selection
    expect(screen.getByTestId('usertriesto-case-select')).toBeTruthy()
    
    // List container
    expect(screen.getByTestId('usertriesto-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('usertriesto-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Action buttons
    expect(screen.getByTestId('usertriesto-save')).toBeTruthy()
    expect(screen.getByTestId('usertriesto-reset')).toBeTruthy()
  })

  it('shows validation error when saving with incomplete required documents', () => {
    render(<UserTriesTo />)
    
    const saveButton = screen.getByTestId('usertriesto-save')
    fireEvent.click(saveButton)
    
    // Should show error message
    const message = screen.getByTestId('usertriesto-message')
    expect(message).toBeTruthy()
    expect(message.textContent).toContain('Validation Error')
  })

  it('allows toggling document completion status', () => {
    render(<UserTriesTo />)
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    expect(checkboxes.length).toBeGreaterThan(0)
    
    const firstCheckbox = checkboxes[0] as HTMLInputElement
    const initialState = firstCheckbox.checked
    
    fireEvent.click(firstCheckbox)
    expect(firstCheckbox.checked).toBe(!initialState)
  })

  it('shows different cases when selecting from dropdown', () => {
    render(<UserTriesTo />)
    
    const select = screen.getByTestId('usertriesto-case-select') as HTMLSelectElement
    expect(select.options.length).toBeGreaterThanOrEqual(5)
    
    // Change to a different case
    fireEvent.change(select, { target: { value: '2' } })
    expect(select.value).toBe('2')
    expect(document.body.textContent).toContain('Estate Planning')
  })

  it('displays document checklist with required and optional items', () => {
    render(<UserTriesTo />)
    
    expect(screen.getByText(/Document Checklist/i)).toBeTruthy()
    
    // Should have both required and optional documents
    const requiredLabels = screen.getAllByText(/Required/i)
    expect(requiredLabels.length).toBeGreaterThan(0)
  })

  it('tracks save attempts', () => {
    render(<UserTriesTo />)
    
    expect(screen.getByText(/Save attempts:/i)).toBeTruthy()
    
    const saveButton = screen.getByTestId('usertriesto-save')
    fireEvent.click(saveButton)
    
    expect(screen.getByText(/Save attempts:/i).textContent).toContain('1')
  })

  it('resets state when reset button is clicked', () => {
    render(<UserTriesTo />)
    
    // Change to a different case first
    const select = screen.getByTestId('usertriesto-case-select') as HTMLSelectElement
    fireEvent.change(select, { target: { value: '2' } })
    expect(select.value).toBe('2')
    
    // Make a save attempt
    const saveButton = screen.getByTestId('usertriesto-save')
    fireEvent.click(saveButton)
    
    // Reset
    const resetButton = screen.getByTestId('usertriesto-reset')
    fireEvent.click(resetButton)
    
    // Should be back to case 1
    expect(select.value).toBe('1')
    expect(document.body.textContent).toContain('Personal Injury')
  })
})
