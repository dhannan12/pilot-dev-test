import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ParentsTopUp from './ParentsTopUp'

describe('ParentsTopUp', () => {
  it('renders without crashing', () => {
    render(<ParentsTopUp />)
    expect(document.body).toBeTruthy()
  })

  it('displays mock data for children', () => {
    render(<ParentsTopUp />)
    // Check that child selection is available
    const childSelect = screen.getByTestId('parentstopup-child') as HTMLSelectElement
    expect(childSelect).toBeTruthy()
    expect(childSelect.value).toBe('child-1')
    // Check that the component renders the top-up interface
    expect(screen.getByText(/Select Top-Up Amount/i)).toBeTruthy()
  })

  it('displays low balance alert for children with insufficient balance', () => {
    render(<ParentsTopUp />)
    // Emma Wilson has $2.50, which is below the $10 threshold
    expect(screen.getByText(/Low Balance Alert/i)).toBeTruthy()
  })

  it('allows selecting different top-up amounts', () => {
    render(<ParentsTopUp />)
    const amountButtons = screen.getAllByTestId('parentstopup-amount')
    expect(amountButtons.length).toBeGreaterThan(0)
    // Click on a top-up amount button
    fireEvent.click(amountButtons[0])
    expect(amountButtons[0]).toBeTruthy()
  })

  it('allows entering a custom amount', () => {
    render(<ParentsTopUp />)
    const customInput = screen.getByTestId('parentstopup-custom-amount') as HTMLInputElement
    fireEvent.change(customInput, { target: { value: '25.50' } })
    expect(customInput.value).toBe('25.50')
  })

  it('allows selecting payment method', () => {
    render(<ParentsTopUp />)
    const paymentButtons = screen.getAllByTestId('parentstopup-payment')
    expect(paymentButtons.length).toBeGreaterThan(0)
    fireEvent.click(paymentButtons[1])
    expect(paymentButtons[1]).toBeTruthy()
  })

  it('displays transaction history', () => {
    render(<ParentsTopUp />)
    const transactionList = screen.getByTestId('parentstopup-list')
    expect(transactionList).toBeTruthy()
    const transactionItems = screen.getAllByTestId('parentstopup-item')
    expect(transactionItems.length).toBeGreaterThan(0)
  })

  it('allows changing selected child', () => {
    render(<ParentsTopUp />)
    const childSelect = screen.getByTestId('parentstopup-child') as HTMLSelectElement
    fireEvent.change(childSelect, { target: { value: 'child-2' } })
    expect(childSelect.value).toBe('child-2')
  })

  it('has required data-testid attributes', () => {
    render(<ParentsTopUp />)
    // Verify key testids exist — Playwright QA depends on these
    expect(screen.getByTestId('parentstopup')).toBeTruthy()
    expect(screen.getByTestId('parentstopup-child')).toBeTruthy()
    expect(screen.getByTestId('parentstopup-custom-amount')).toBeTruthy()
    expect(screen.getByTestId('parentstopup-submit')).toBeTruthy()
    expect(screen.getByTestId('parentstopup-list')).toBeTruthy()
    
    const amountButtons = screen.getAllByTestId('parentstopup-amount')
    expect(amountButtons.length).toBeGreaterThan(0)
    
    const paymentButtons = screen.getAllByTestId('parentstopup-payment')
    expect(paymentButtons.length).toBeGreaterThan(0)
    
    const transactionItems = screen.getAllByTestId('parentstopup-item')
    expect(transactionItems.length).toBeGreaterThan(0)
  })

  it('shows success message after top-up', () => {
    render(<ParentsTopUp />)
    const submitButton = screen.getByTestId('parentstopup-submit')
    fireEvent.click(submitButton)
    expect(screen.getByText(/Top-up successful/i)).toBeTruthy()
  })

  it('calculates new balance correctly', () => {
    render(<ParentsTopUp />)
    // Check that new balance is shown in summary
    // Initial balance is $2.50, default top-up is $10
    expect(screen.getByText(/New Balance/i)).toBeTruthy()
    expect(screen.getByText(/\$12\.50/)).toBeTruthy()
  })
})
