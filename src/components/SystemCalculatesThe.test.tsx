import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SystemCalculatesThe from './SystemCalculatesThe'

describe('SystemCalculatesThe', () => {
  it('renders without crashing', () => {
    render(<SystemCalculatesThe />)
    expect(document.body).toBeTruthy()
  })

  it('displays membership type selection', () => {
    render(<SystemCalculatesThe />)
    expect(screen.getByText(/Select Membership Type/i)).toBeTruthy()
    expect(screen.getByTestId('system-calculates-the-membership')).toBeTruthy()
  })

  it('displays duration options', () => {
    render(<SystemCalculatesThe />)
    expect(screen.getByText(/Select Duration/i)).toBeTruthy()
    const durationList = screen.getByTestId('system-calculates-the-duration-list')
    expect(durationList).toBeTruthy()
  })

  it('displays mock membership data', () => {
    render(<SystemCalculatesThe />)
    expect(screen.getAllByText(/Basic Membership/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Premium Membership/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Elite Membership/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Family Membership/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Student Membership/i).length).toBeGreaterThan(0)
  })

  it('calculates total fee when membership and duration selected', () => {
    render(<SystemCalculatesThe />)
    
    const select = screen.getByTestId('system-calculates-the-membership') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'basic' } })
    
    // Should show summary section
    const summary = screen.getByTestId('system-calculates-the-summary')
    expect(summary).toBeTruthy()
    
    // Should show total
    const total = screen.getByTestId('system-calculates-the-total')
    expect(total).toBeTruthy()
    expect(total.textContent).toContain('$')
  })

  it('applies discount for longer durations', () => {
    render(<SystemCalculatesThe />)
    
    // Select basic membership ($29.99/month)
    const select = screen.getByTestId('system-calculates-the-membership') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'basic' } })
    
    // Select 12 month duration (15% discount)
    const durationButtons = screen.getAllByTestId('system-calculates-the-duration-item')
    const twelveMonthButton = durationButtons.find(btn => btn.textContent?.includes('12 Months'))
    if (twelveMonthButton) {
      fireEvent.click(twelveMonthButton)
    }
    
    // Check that discount is shown
    const summary = screen.getByTestId('system-calculates-the-summary')
    expect(summary.textContent).toContain('Discount')
  })

  it('has required data-testid attributes', () => {
    render(<SystemCalculatesThe />)
    
    // Main wrapper
    expect(screen.getByTestId('system-calculates-the')).toBeTruthy()
    
    // Membership select
    expect(screen.getByTestId('system-calculates-the-membership')).toBeTruthy()
    
    // Duration list and items
    expect(screen.getByTestId('system-calculates-the-duration-list')).toBeTruthy()
    expect(screen.getAllByTestId('system-calculates-the-duration-item').length).toBeGreaterThan(0)
    
    // Action buttons
    expect(screen.getByTestId('system-calculates-the-calculate')).toBeTruthy()
    expect(screen.getByTestId('system-calculates-the-reset')).toBeTruthy()
    
    // Plans list
    expect(screen.getByTestId('system-calculates-the-plans-list')).toBeTruthy()
    expect(screen.getAllByTestId('system-calculates-the-plan-item').length).toBeGreaterThan(0)
  })

  it('resets selection when reset button clicked', () => {
    render(<SystemCalculatesThe />)
    
    // Select membership
    const select = screen.getByTestId('system-calculates-the-membership') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'premium' } })
    expect(select.value).toBe('premium')
    
    // Click reset
    const resetButton = screen.getByTestId('system-calculates-the-reset')
    fireEvent.click(resetButton)
    
    // Should be reset to empty
    expect(select.value).toBe('')
  })

  it('disables proceed button when no membership selected', () => {
    render(<SystemCalculatesThe />)
    
    const proceedButton = screen.getByTestId('system-calculates-the-calculate') as HTMLButtonElement
    expect(proceedButton.disabled).toBe(true)
  })
})
