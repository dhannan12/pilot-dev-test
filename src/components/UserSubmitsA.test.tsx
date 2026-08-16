import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserSubmitsA from './UserSubmitsA'

describe('UserSubmitsA', () => {
  it('renders without crashing', () => {
    render(<UserSubmitsA />)
    expect(document.body).toBeTruthy()
  })

  it('displays the membership sign-up form with all fields', () => {
    render(<UserSubmitsA />)
    expect(screen.getByText(/Gym Membership Sign-Up/i)).toBeTruthy()
    expect(screen.getByLabelText(/First Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Last Name/i)).toBeTruthy()
    expect(screen.getByLabelText(/Email Address/i)).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-phone')).toBeTruthy()
    expect(screen.getByLabelText(/Date of Birth/i)).toBeTruthy()
    expect(screen.getByLabelText(/Select Your Plan/i)).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-emergencycontact')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-emergencyphone')).toBeTruthy()
  })

  it('displays recent membership applications', () => {
    render(<UserSubmitsA />)
    expect(screen.getByText(/Recent Membership Applications/i)).toBeTruthy()
    expect(screen.getByText('John Smith')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Mike Chen')).toBeTruthy()
    expect(screen.getByText('Emma Davis')).toBeTruthy()
    expect(screen.getByText('Alex Rodriguez')).toBeTruthy()
  })

  it('validates form fields on submit', () => {
    render(<UserSubmitsA />)
    const submitButton = screen.getByTestId('usersubmitsa-submit')
    fireEvent.click(submitButton)
    
    // Should show validation errors
    expect(screen.getByText('First name is required')).toBeTruthy()
    expect(screen.getByText('Last name is required')).toBeTruthy()
    expect(screen.getByText('Email is required')).toBeTruthy()
  })

  it('updates form fields when user types', () => {
    render(<UserSubmitsA />)
    const firstNameInput = screen.getByTestId('usersubmitsa-firstname') as HTMLInputElement
    const emailInput = screen.getByTestId('usersubmitsa-email') as HTMLInputElement
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(emailInput, { target: { value: 'john@email.com' } })
    
    expect(firstNameInput.value).toBe('John')
    expect(emailInput.value).toBe('john@email.com')
  })

  it('displays membership tier benefits when a tier is selected', () => {
    render(<UserSubmitsA />)
    const tierSelect = screen.getByTestId('usersubmitsa-membershiptier') as HTMLSelectElement
    
    fireEvent.change(tierSelect, { target: { value: 'premium' } })
    
    expect(screen.getByText(/Premium Membership Benefits/i)).toBeTruthy()
    expect(screen.getByText(/Personal training/i)).toBeTruthy()
  })

  it('resets form when reset button is clicked', () => {
    render(<UserSubmitsA />)
    const firstNameInput = screen.getByTestId('usersubmitsa-firstname') as HTMLInputElement
    const resetButton = screen.getByTestId('usersubmitsa-reset')
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    expect(firstNameInput.value).toBe('John')
    
    fireEvent.click(resetButton)
    expect(firstNameInput.value).toBe('')
  })

  it('has required data-testid attributes', () => {
    render(<UserSubmitsA />)
    
    // Main wrapper
    expect(screen.getByTestId('usersubmitsa')).toBeTruthy()
    
    // Form fields
    expect(screen.getByTestId('usersubmitsa-firstname')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-lastname')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-email')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-phone')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-dateofbirth')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-membershiptier')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-emergencycontact')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-emergencyphone')).toBeTruthy()
    
    // Buttons
    expect(screen.getByTestId('usersubmitsa-submit')).toBeTruthy()
    expect(screen.getByTestId('usersubmitsa-reset')).toBeTruthy()
    
    // List
    expect(screen.getByTestId('usersubmitsa-list')).toBeTruthy()
    
    // List items
    const items = screen.getAllByTestId('usersubmitsa-item')
    expect(items.length).toBeGreaterThan(0)
  })

  it('displays success message after valid form submission', () => {
    render(<UserSubmitsA />)
    
    // Fill in all required fields
    fireEvent.change(screen.getByTestId('usersubmitsa-firstname'), { target: { value: 'John' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-lastname'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-email'), { target: { value: 'john.doe@email.com' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-phone'), { target: { value: '+1 555-123-4567' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-dateofbirth'), { target: { value: '1990-01-01' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-membershiptier'), { target: { value: 'standard' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-emergencycontact'), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByTestId('usersubmitsa-emergencyphone'), { target: { value: '+1 555-987-6543' } })
    
    // Submit the form
    fireEvent.click(screen.getByTestId('usersubmitsa-submit'))
    
    // Check for success message
    expect(screen.getByText(/Success!/i)).toBeTruthy()
    expect(screen.getByText(/Your membership application has been submitted/i)).toBeTruthy()
  })
})
