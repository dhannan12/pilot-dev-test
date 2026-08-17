import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSubmitsMembership from './UserSubmitsMembership'

describe('UserSubmitsMembership', () => {
  it('renders without crashing', () => {
    render(<UserSubmitsMembership />)
    expect(document.body).toBeTruthy()
  })

  it('displays the membership sign-up form', () => {
    render(<UserSubmitsMembership />)
    expect(screen.getByText(/Gym Membership Sign-Up/i)).toBeTruthy()
    expect(screen.getByText(/Personal Information/i)).toBeTruthy()
    expect(screen.getByText(/Select Membership Tier/i)).toBeTruthy()
  })

  it('displays all membership tiers in the select', () => {
    render(<UserSubmitsMembership />)
    const select = screen.getByTestId('usersubmitsmembership-membershiptier') as HTMLSelectElement
    expect(select).toBeTruthy()
    
    // Check that we have the placeholder and 5 tiers
    const options = select.querySelectorAll('option')
    expect(options.length).toBe(6) // 1 placeholder + 5 membership tiers
  })

  it('has required data-testid attributes', () => {
    render(<UserSubmitsMembership />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="usersubmitsmembership"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="usersubmitsmembership-firstname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-lastname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-phone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-membershiptier"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-emergencycontact"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-emergencyphone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-address"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-city"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-state"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-zipcode"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-paymentmethod"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="usersubmitsmembership-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-cancel"]')).toBeTruthy()
  })

  it('shows benefits when a membership tier is selected', () => {
    render(<UserSubmitsMembership />)
    
    const select = screen.getByTestId('usersubmitsmembership-membershiptier') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'premium' } })
    
    // Should show benefits section
    expect(screen.getByText(/Premium Benefits:/i)).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="usersubmitsmembership-item"]').length).toBeGreaterThan(0)
  })

  it('shows payment card fields when Credit Card or Debit Card is selected', () => {
    render(<UserSubmitsMembership />)
    
    const paymentSelect = screen.getByTestId('usersubmitsmembership-paymentmethod') as HTMLSelectElement
    fireEvent.change(paymentSelect, { target: { value: 'Credit Card' } })
    
    // Card fields should appear
    expect(document.querySelector('[data-testid="usersubmitsmembership-cardnumber"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-expirydate"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-cvv"]')).toBeTruthy()
  })

  it('validates required fields on submit', () => {
    render(<UserSubmitsMembership />)
    
    const submitButton = screen.getByTestId('usersubmitsmembership-submit')
    fireEvent.click(submitButton)
    
    // Should show error messages
    expect(screen.getByText(/First name is required/i)).toBeTruthy()
    expect(screen.getByText(/Last name is required/i)).toBeTruthy()
    expect(screen.getByText(/Email is required/i)).toBeTruthy()
  })

  it('shows success page after valid form submission', () => {
    render(<UserSubmitsMembership />)
    
    // Fill in all required fields
    fireEvent.change(screen.getByTestId('usersubmitsmembership-firstname'), { target: { value: 'John' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-lastname'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-phone'), { target: { value: '555-1234' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-membershiptier'), { target: { value: 'basic' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-emergencycontact'), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-emergencyphone'), { target: { value: '555-5678' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-address'), { target: { value: '123 Main St' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-city'), { target: { value: 'Springfield' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-state'), { target: { value: 'IL' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-zipcode'), { target: { value: '62701' } })
    fireEvent.change(screen.getByTestId('usersubmitsmembership-paymentmethod'), { target: { value: 'Cash' } })
    
    fireEvent.click(screen.getByTestId('usersubmitsmembership-submit'))
    
    // Should show success message
    expect(screen.getByText(/Welcome to the Gym!/i)).toBeTruthy()
    expect(screen.getByText(/Your membership has been successfully submitted/i)).toBeTruthy()
    expect(document.querySelector('[data-testid="usersubmitsmembership-reset"]')).toBeTruthy()
  })

  it('resets the form when cancel is clicked', () => {
    render(<UserSubmitsMembership />)
    
    // Fill a field
    const firstNameInput = screen.getByTestId('usersubmitsmembership-firstname') as HTMLInputElement
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    expect(firstNameInput.value).toBe('John')
    
    // Click cancel
    fireEvent.click(screen.getByTestId('usersubmitsmembership-cancel'))
    
    // Field should be cleared
    expect(firstNameInput.value).toBe('')
  })
})
