import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CustomerSubmitsA from './CustomerSubmitsA'

describe('CustomerSubmitsA', () => {
  it('renders without crashing', () => {
    render(<CustomerSubmitsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays the rental request form', () => {
    render(<CustomerSubmitsA />)
    expect(screen.getByText('Equipment Rental Request')).toBeTruthy()
    expect(screen.getByText(/Fill out the form below/i)).toBeTruthy()
  })

  it('displays mock equipment in the select dropdown', () => {
    render(<CustomerSubmitsA />)
    const select = screen.getByTestId('customersubmitsa-equipment') as HTMLSelectElement
    expect(select).toBeTruthy()
    // Check that equipment options are present
    expect(select.options.length).toBeGreaterThan(1)
    expect(select.textContent).toContain('Excavator CAT 320')
    expect(select.textContent).toContain('Forklift Toyota 8FD25')
  })

  it('has required data-testid attributes', () => {
    render(<CustomerSubmitsA />)
    // Main wrapper
    expect(document.querySelector('[data-testid="customersubmitsa"]')).toBeTruthy()
    // Form fields
    expect(document.querySelector('[data-testid="customersubmitsa-equipment"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="customersubmitsa-name"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="customersubmitsa-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="customersubmitsa-phone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="customersubmitsa-startdate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="customersubmitsa-enddate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="customersubmitsa-quantity"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="customersubmitsa-notes"]')).toBeTruthy()
    // Submit button
    expect(document.querySelector('[data-testid="customersubmitsa-submit"]')).toBeTruthy()
  })

  it('validates required fields on submit', () => {
    render(<CustomerSubmitsA />)
    const submitButton = screen.getByTestId('customersubmitsa-submit')
    
    fireEvent.click(submitButton)
    
    // Should show validation errors
    expect(screen.getByText(/Please select equipment/i)).toBeTruthy()
    expect(screen.getByText(/Customer name is required/i)).toBeTruthy()
    expect(screen.getByText(/Email is required/i)).toBeTruthy()
  })

  it('accepts valid form input', () => {
    render(<CustomerSubmitsA />)
    
    const equipmentSelect = screen.getByTestId('customersubmitsa-equipment') as HTMLSelectElement
    const nameInput = screen.getByTestId('customersubmitsa-name') as HTMLInputElement
    const emailInput = screen.getByTestId('customersubmitsa-email') as HTMLInputElement
    const phoneInput = screen.getByTestId('customersubmitsa-phone') as HTMLInputElement
    const startDateInput = screen.getByTestId('customersubmitsa-startdate') as HTMLInputElement
    const endDateInput = screen.getByTestId('customersubmitsa-enddate') as HTMLInputElement
    const quantityInput = screen.getByTestId('customersubmitsa-quantity') as HTMLInputElement
    
    fireEvent.change(equipmentSelect, { target: { value: 'eq1' } })
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '555-1234' } })
    fireEvent.change(startDateInput, { target: { value: '2026-09-01' } })
    fireEvent.change(endDateInput, { target: { value: '2026-09-05' } })
    fireEvent.change(quantityInput, { target: { value: '2' } })
    
    expect(equipmentSelect.value).toBe('eq1')
    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
    expect(phoneInput.value).toBe('555-1234')
  })

  it('shows success message after valid submission', () => {
    render(<CustomerSubmitsA />)
    
    // Fill in all required fields
    fireEvent.change(screen.getByTestId('customersubmitsa-equipment'), { target: { value: 'eq1' } })
    fireEvent.change(screen.getByTestId('customersubmitsa-name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByTestId('customersubmitsa-email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByTestId('customersubmitsa-phone'), { target: { value: '555-1234' } })
    fireEvent.change(screen.getByTestId('customersubmitsa-startdate'), { target: { value: '2026-09-01' } })
    fireEvent.change(screen.getByTestId('customersubmitsa-enddate'), { target: { value: '2026-09-05' } })
    
    // Submit the form
    fireEvent.click(screen.getByTestId('customersubmitsa-submit'))
    
    // Should show success message
    expect(screen.getByText(/Request Submitted!/i)).toBeTruthy()
    expect(screen.getByText(/Thank you, John Doe/i)).toBeTruthy()
  })

  it('displays price calculation when dates and equipment are selected', () => {
    render(<CustomerSubmitsA />)
    
    fireEvent.change(screen.getByTestId('customersubmitsa-equipment'), { target: { value: 'eq1' } })
    fireEvent.change(screen.getByTestId('customersubmitsa-startdate'), { target: { value: '2026-09-01' } })
    fireEvent.change(screen.getByTestId('customersubmitsa-enddate'), { target: { value: '2026-09-05' } })
    
    // Should show estimated total
    expect(screen.getByText(/Estimated Total/i)).toBeTruthy()
  })
})
