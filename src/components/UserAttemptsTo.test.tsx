import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserAttemptsTo from './UserAttemptsTo'

describe('UserAttemptsTo', () => {
  it('renders without crashing', () => {
    render(<UserAttemptsTo />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data', () => {
    render(<UserAttemptsTo />)
    
    // Check for user name
    expect(screen.getByText(/Sarah Johnson/i)).toBeTruthy()
    
    // Check for rewards
    expect(screen.getByText('Free Coffee')).toBeTruthy()
    expect(screen.getByText('Free Pastry')).toBeTruthy()
    expect(screen.getByText('Free Sandwich')).toBeTruthy()
    expect(screen.getByText('Premium Latte')).toBeTruthy()
    expect(screen.getByText('Coffee Bundle')).toBeTruthy()
    
    // Check that purchase count is displayed
    expect(screen.getByTestId('userattemptsto-purchase-count')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserAttemptsTo />)
    
    // Verify main wrapper
    expect(screen.getByTestId('userattemptsto')).toBeTruthy()
    
    // Verify purchase count display
    expect(screen.getByTestId('userattemptsto-purchase-count')).toBeTruthy()
    
    // Verify list container
    expect(screen.getByTestId('userattemptsto-list')).toBeTruthy()
    
    // Verify list items
    const items = screen.getAllByTestId('userattemptsto-item')
    expect(items.length).toBeGreaterThan(0)
    
    // Verify redeem buttons
    const redeemButtons = screen.getAllByTestId('userattemptsto-redeem')
    expect(redeemButtons.length).toBeGreaterThan(0)
  })

  it('shows error message when attempting to redeem with insufficient purchases', () => {
    render(<UserAttemptsTo />)
    
    // Find a redeem button and click it
    const redeemButtons = screen.getAllByTestId('userattemptsto-redeem')
    fireEvent.click(redeemButtons[0])
    
    // Check if error message appears
    const errorElement = screen.queryByTestId('userattemptsto-error')
    expect(errorElement).toBeTruthy()
    
    // Should contain "Cannot redeem" or similar text
    expect(errorElement?.textContent).toContain('Cannot redeem')
  })

  it('displays user purchase count', () => {
    render(<UserAttemptsTo />)
    
    const purchaseCount = screen.getByTestId('userattemptsto-purchase-count')
    expect(purchaseCount.textContent).toBe('3')
  })

  it('can clear error message', () => {
    render(<UserAttemptsTo />)
    
    // Trigger an error
    const redeemButtons = screen.getAllByTestId('userattemptsto-redeem')
    fireEvent.click(redeemButtons[0])
    
    // Error should be visible
    expect(screen.getByTestId('userattemptsto-error')).toBeTruthy()
    
    // Clear the error
    const clearButton = screen.getByTestId('userattemptsto-clear-error')
    fireEvent.click(clearButton)
    
    // Error should be gone
    expect(screen.queryByTestId('userattemptsto-error')).toBeFalsy()
  })

  it('displays required purchases for each reward', () => {
    render(<UserAttemptsTo />)
    
    // Should show required purchase counts - use getAllByText since some numbers appear in multiple places
    expect(screen.getAllByText(/5 purchases/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/8 purchases/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/10 purchases/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/12 purchases/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/15 purchases/i).length).toBeGreaterThan(0)
  })
})
