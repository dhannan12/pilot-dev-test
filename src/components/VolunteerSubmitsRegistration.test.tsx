import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import VolunteerSubmitsRegistration from './VolunteerSubmitsRegistration'

describe('VolunteerSubmitsRegistration', () => {
  it('renders without crashing', () => {
    render(<VolunteerSubmitsRegistration />)
    expect(document.body).toBeTruthy()
  })

  it('displays the registration form with all required fields', () => {
    render(<VolunteerSubmitsRegistration />)
    
    expect(screen.getByText('Volunteer Registration')).toBeTruthy()
    expect(screen.getByText('Personal Information')).toBeTruthy()
    expect(screen.getByText('Address')).toBeTruthy()
    expect(screen.getByText('Skills & Interests *')).toBeTruthy()
    expect(screen.getByText('Availability')).toBeTruthy()
    expect(screen.getByText('Emergency Contact')).toBeTruthy()
  })

  it('displays mock registration data', () => {
    render(<VolunteerSubmitsRegistration />)
    
    expect(screen.getByText('Recent Registrations')).toBeTruthy()
    expect(screen.getByText('Sarah Johnson')).toBeTruthy()
    expect(screen.getByText('Michael Chen')).toBeTruthy()
    expect(screen.getByText('Emily Rodriguez')).toBeTruthy()
    expect(screen.getByText('David Thompson')).toBeTruthy()
    expect(screen.getByText('Jessica Martinez')).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<VolunteerSubmitsRegistration />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="volunteersubmitsregistration"]')).toBeTruthy()
    
    // Form fields
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-firstname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-lastname"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-email"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-phone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-address"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-city"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-state"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-zipcode"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-dateofbirth"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-availability"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-emergencycontact"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-emergencyphone"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-terms"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-reset"]')).toBeTruthy()
    
    // List
    expect(document.querySelector('[data-testid="volunteersubmitsregistration-list"]')).toBeTruthy()
    expect(document.querySelectorAll('[data-testid="volunteersubmitsregistration-item"]').length).toBe(5)
  })

  it('validates required fields on submit', () => {
    render(<VolunteerSubmitsRegistration />)
    
    const submitButton = document.querySelector('[data-testid="volunteersubmitsregistration-submit"]') as HTMLButtonElement
    fireEvent.click(submitButton)
    
    // Should show validation errors
    expect(screen.getByText('First name is required')).toBeTruthy()
    expect(screen.getByText('Last name is required')).toBeTruthy()
    expect(screen.getByText('Email is required')).toBeTruthy()
  })

  it('allows user to fill out and submit the form', () => {
    render(<VolunteerSubmitsRegistration />)
    
    // Fill out form fields
    const firstNameInput = document.querySelector('[data-testid="volunteersubmitsregistration-firstname"]') as HTMLInputElement
    const lastNameInput = document.querySelector('[data-testid="volunteersubmitsregistration-lastname"]') as HTMLInputElement
    const emailInput = document.querySelector('[data-testid="volunteersubmitsregistration-email"]') as HTMLInputElement
    const phoneInput = document.querySelector('[data-testid="volunteersubmitsregistration-phone"]') as HTMLInputElement
    const addressInput = document.querySelector('[data-testid="volunteersubmitsregistration-address"]') as HTMLInputElement
    const cityInput = document.querySelector('[data-testid="volunteersubmitsregistration-city"]') as HTMLInputElement
    const stateInput = document.querySelector('[data-testid="volunteersubmitsregistration-state"]') as HTMLInputElement
    const zipInput = document.querySelector('[data-testid="volunteersubmitsregistration-zipcode"]') as HTMLInputElement
    const dobInput = document.querySelector('[data-testid="volunteersubmitsregistration-dateofbirth"]') as HTMLInputElement
    const availabilitySelect = document.querySelector('[data-testid="volunteersubmitsregistration-availability"]') as HTMLSelectElement
    const emergencyContactInput = document.querySelector('[data-testid="volunteersubmitsregistration-emergencycontact"]') as HTMLInputElement
    const emergencyPhoneInput = document.querySelector('[data-testid="volunteersubmitsregistration-emergencyphone"]') as HTMLInputElement
    const termsCheckbox = document.querySelector('[data-testid="volunteersubmitsregistration-terms"]') as HTMLInputElement
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@email.com' } })
    fireEvent.change(phoneInput, { target: { value: '555-1234' } })
    fireEvent.change(addressInput, { target: { value: '123 Test St' } })
    fireEvent.change(cityInput, { target: { value: 'Testville' } })
    fireEvent.change(stateInput, { target: { value: 'CA' } })
    fireEvent.change(zipInput, { target: { value: '90210' } })
    fireEvent.change(dobInput, { target: { value: '1990-01-01' } })
    fireEvent.change(availabilitySelect, { target: { value: 'Weekends' } })
    fireEvent.change(emergencyContactInput, { target: { value: 'Jane Doe' } })
    fireEvent.change(emergencyPhoneInput, { target: { value: '555-5678' } })
    
    // Select a skill
    const skillCheckboxes = document.querySelectorAll('[data-testid="volunteersubmitsregistration-skill-option"] input[type="checkbox"]')
    fireEvent.click(skillCheckboxes[0])
    
    fireEvent.click(termsCheckbox)
    
    expect(firstNameInput.value).toBe('John')
    expect(termsCheckbox.checked).toBe(true)
  })

  it('resets form when reset button is clicked', () => {
    render(<VolunteerSubmitsRegistration />)
    
    const firstNameInput = document.querySelector('[data-testid="volunteersubmitsregistration-firstname"]') as HTMLInputElement
    const resetButton = document.querySelector('[data-testid="volunteersubmitsregistration-reset"]') as HTMLButtonElement
    
    fireEvent.change(firstNameInput, { target: { value: 'Test' } })
    expect(firstNameInput.value).toBe('Test')
    
    fireEvent.click(resetButton)
    expect(firstNameInput.value).toBe('')
  })
})
