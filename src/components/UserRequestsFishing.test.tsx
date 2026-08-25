import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserRequestsFishing from './UserRequestsFishing'

describe('UserRequestsFishing', () => {
  it('renders without crashing', () => {
    render(<UserRequestsFishing />)
    expect(document.body).toBeTruthy()
  })

  it('displays the main heading', () => {
    render(<UserRequestsFishing />)
    expect(screen.getByText(/Find Your Perfect Fishing Spot/i)).toBeTruthy()
  })

  it('has required data-testid attributes', () => {
    render(<UserRequestsFishing />)
    
    // Main wrapper
    expect(document.querySelector('[data-testid="userrequestsfishing"]')).toBeTruthy()
    
    // Form inputs
    expect(document.querySelector('[data-testid="userrequestsfishing-experience"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsfishing-type"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsfishing-location"]')).toBeTruthy()
    
    // Buttons
    expect(document.querySelector('[data-testid="userrequestsfishing-submit"]')).toBeTruthy()
    expect(document.querySelector('[data-testid="userrequestsfishing-reset"]')).toBeTruthy()
  })

  it('displays recommendations when form is submitted', () => {
    render(<UserRequestsFishing />)
    
    const submitButton = document.querySelector('[data-testid="userrequestsfishing-submit"]') as HTMLButtonElement
    fireEvent.click(submitButton)
    
    // Check that recommendations list appears
    expect(document.querySelector('[data-testid="userrequestsfishing-list"]')).toBeTruthy()
    
    // Check that items are displayed
    const items = document.querySelectorAll('[data-testid="userrequestsfishing-item"]')
    expect(items.length).toBeGreaterThan(0)
  })

  it('filters fishing spots by experience level', () => {
    render(<UserRequestsFishing />)
    
    const experienceSelect = document.querySelector('[data-testid="userrequestsfishing-experience"]') as HTMLSelectElement
    fireEvent.change(experienceSelect, { target: { value: 'Beginner' } })
    
    const submitButton = document.querySelector('[data-testid="userrequestsfishing-submit"]') as HTMLButtonElement
    fireEvent.click(submitButton)
    
    // Should show beginner-friendly spots
    expect(document.querySelector('[data-testid="userrequestsfishing-list"]')).toBeTruthy()
  })

  it('filters fishing spots by fishing type', () => {
    render(<UserRequestsFishing />)
    
    const typeSelect = document.querySelector('[data-testid="userrequestsfishing-type"]') as HTMLSelectElement
    fireEvent.change(typeSelect, { target: { value: 'Sea' } })
    
    const submitButton = document.querySelector('[data-testid="userrequestsfishing-submit"]') as HTMLButtonElement
    fireEvent.click(submitButton)
    
    // Should show sea fishing spots
    expect(document.querySelector('[data-testid="userrequestsfishing-list"]')).toBeTruthy()
  })

  it('resets form when reset button is clicked', () => {
    render(<UserRequestsFishing />)
    
    // Fill in form
    const experienceSelect = document.querySelector('[data-testid="userrequestsfishing-experience"]') as HTMLSelectElement
    fireEvent.change(experienceSelect, { target: { value: 'Beginner' } })
    
    // Submit
    const submitButton = document.querySelector('[data-testid="userrequestsfishing-submit"]') as HTMLButtonElement
    fireEvent.click(submitButton)
    
    // Reset
    const resetButton = document.querySelector('[data-testid="userrequestsfishing-reset"]') as HTMLButtonElement
    fireEvent.click(resetButton)
    
    // Check that form is reset
    expect(experienceSelect.value).toBe('')
    
    // Recommendations should be hidden
    expect(document.querySelector('[data-testid="userrequestsfishing-list"]')).toBeFalsy()
  })

  it('displays mock fishing spots data', () => {
    render(<UserRequestsFishing />)
    
    const submitButton = document.querySelector('[data-testid="userrequestsfishing-submit"]') as HTMLButtonElement
    fireEvent.click(submitButton)
    
    // Check for specific fishing spot names from mock data
    expect(screen.getByText('Lough Corrib')).toBeTruthy()
    expect(screen.getByText('Killary Harbour')).toBeTruthy()
    expect(screen.getByText('River Moy')).toBeTruthy()
  })

  it('shows informational section when recommendations are not visible', () => {
    render(<UserRequestsFishing />)
    
    expect(screen.getByText(/Why Fish in West Ireland\?/i)).toBeTruthy()
  })

  it('displays at least 5 fishing spots', () => {
    render(<UserRequestsFishing />)
    
    const submitButton = document.querySelector('[data-testid="userrequestsfishing-submit"]') as HTMLButtonElement
    fireEvent.click(submitButton)
    
    const items = document.querySelectorAll('[data-testid="userrequestsfishing-item"]')
    expect(items.length).toBeGreaterThanOrEqual(5)
  })
})
