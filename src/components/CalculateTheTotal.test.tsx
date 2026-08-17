import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalculateTheTotal from './CalculateTheTotal'

describe('CalculateTheTotal', () => {
  it('renders without crashing', () => {
    render(<CalculateTheTotal />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<CalculateTheTotal />)
    expect(screen.getByText(/Lunch Account Calculator/i)).toBeTruthy()
  })

  it('displays mock student data', () => {
    render(<CalculateTheTotal />)
    // Check for at least one student name in the dropdown
    expect(screen.getByText(/Emma Wilson/i)).toBeTruthy()
  })

  it('shows current balance for selected student', () => {
    render(<CalculateTheTotal />)
    // Should display a balance amount
    const balanceElements = screen.getAllByText(/\$\d+\.\d{2}/)
    expect(balanceElements.length).toBeGreaterThan(0)
  })

  it('displays transaction history', () => {
    render(<CalculateTheTotal />)
    // Check for transaction list
    const list = document.querySelector('[data-testid="calculate-the-total-list"]')
    expect(list).toBeTruthy()
    const items = document.querySelectorAll('[data-testid="calculate-the-total-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('has required data-testid attributes', () => {
    render(<CalculateTheTotal />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="calculate-the-total"]')).toBeTruthy()
    
    // Student selector
    expect(document.querySelector('[data-testid="calculate-the-total-student"]')).toBeTruthy()
    
    // Amount input
    expect(document.querySelector('[data-testid="calculate-the-total-amount"]')).toBeTruthy()
    
    // Calculate button
    expect(document.querySelector('[data-testid="calculate-the-total-calculate"]')).toBeTruthy()
    
    // Reset button
    expect(document.querySelector('[data-testid="calculate-the-total-reset"]')).toBeTruthy()
    
    // Transaction list
    expect(document.querySelector('[data-testid="calculate-the-total-list"]')).toBeTruthy()
    
    // Transaction items
    const items = document.querySelectorAll('[data-testid="calculate-the-total-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('allows user to input top-up amount', () => {
    render(<CalculateTheTotal />)
    const input = document.querySelector('[data-testid="calculate-the-total-amount"]') as HTMLInputElement
    expect(input).toBeTruthy()
    
    fireEvent.change(input, { target: { value: '20.00' } })
    expect(input.value).toBe('20.00')
  })

  it('calculates new total when calculate button is clicked', () => {
    render(<CalculateTheTotal />)
    const input = document.querySelector('[data-testid="calculate-the-total-amount"]') as HTMLInputElement
    const calculateBtn = document.querySelector('[data-testid="calculate-the-total-calculate"]') as HTMLButtonElement
    
    fireEvent.change(input, { target: { value: '20.00' } })
    fireEvent.click(calculateBtn)
    
    // Check for "New Total" text or calculation result
    expect(screen.getByText(/New Total/i)).toBeTruthy()
  })

  it('shows apply button after calculation', () => {
    render(<CalculateTheTotal />)
    const input = document.querySelector('[data-testid="calculate-the-total-amount"]') as HTMLInputElement
    const calculateBtn = document.querySelector('[data-testid="calculate-the-total-calculate"]') as HTMLButtonElement
    
    fireEvent.change(input, { target: { value: '15.50' } })
    fireEvent.click(calculateBtn)
    
    const applyBtn = document.querySelector('[data-testid="calculate-the-total-apply"]')
    expect(applyBtn).toBeTruthy()
  })

  it('resets form when reset button is clicked', () => {
    render(<CalculateTheTotal />)
    const input = document.querySelector('[data-testid="calculate-the-total-amount"]') as HTMLInputElement
    const resetBtn = document.querySelector('[data-testid="calculate-the-total-reset"]') as HTMLButtonElement
    
    fireEvent.change(input, { target: { value: '25.00' } })
    expect(input.value).toBe('25.00')
    
    fireEvent.click(resetBtn)
    expect(input.value).toBe('')
  })

  it('changes student when dropdown selection changes', () => {
    render(<CalculateTheTotal />)
    const select = document.querySelector('[data-testid="calculate-the-total-student"]') as HTMLSelectElement
    
    // Get initial selected student
    const initialValue = select.value
    
    // Find a different option
    const options = Array.from(select.options)
    const differentOption = options.find(opt => opt.value !== initialValue)
    
    if (differentOption) {
      fireEvent.change(select, { target: { value: differentOption.value } })
      expect(select.value).toBe(differentOption.value)
    }
  })
})
